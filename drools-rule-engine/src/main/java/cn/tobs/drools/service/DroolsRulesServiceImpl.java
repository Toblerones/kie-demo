package cn.tobs.drools.service;

import cn.tobs.drools.model.Rule;
import cn.tobs.drools.repository.DreRuleRepository;
import cn.tobs.drools.repository.dao.DreRule;
import org.kie.api.KieBase;
import org.kie.api.KieServices;
import org.kie.api.builder.KieBuilder;
import org.kie.api.builder.KieFileSystem;
import org.kie.api.builder.KieRepository;
import org.kie.api.builder.Message;
import org.kie.api.definition.KiePackage;
import org.kie.api.runtime.KieContainer;
import org.kie.internal.io.ResourceFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.core.io.support.ResourcePatternResolver;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Collection;
import java.util.List;

@Service
public class DroolsRulesServiceImpl {

    public static KieContainer kieContainer;
    private static final String RULES_PATH = "rules/";

    @Autowired
    KieBase kieBase;

    @Autowired
    private DreRuleRepository dreRuleRepository;

    public void updateRule(Rule rule) throws IOException {
        Collection<KiePackage> packages = kieBase.getKiePackages();
        int nRules=0;
        for( KiePackage pack: packages ){
            nRules += pack.getRules().size();
        }
        System.out.println("Before process number of rules : " + nRules);

        long startTime = System.currentTimeMillis();
        KieServices ks = KieServices.Factory.get();
        KieRepository kr = ks.getRepository();
        KieFileSystem kfs = ks.newKieFileSystem();

        String drl=rule.getRule();
        kfs.write("src/main/resources/rules/" + rule.getRuleKey() + ".drl", drl);

        KieBuilder kb = ks.newKieBuilder(kfs);

        kb.buildAll();
        if (kb.getResults().hasMessages(Message.Level.ERROR)) {
            throw new RuntimeException("Build Errors:\n" + kb.getResults().toString());
        }
        long endTime = System.currentTimeMillis();
        System.out.println("Time to build rules : " + (endTime - startTime)  + " ms" );
        startTime = System.currentTimeMillis();
        this.kieContainer = ks.newKieContainer(kr.getDefaultReleaseId());
//        this.kieContainer.updateToVersion(kr.getDefaultReleaseId());
        endTime = System.currentTimeMillis();
        System.out.println("Time to load container: " + (endTime - startTime)  + " ms" );
//        this.kieContainer=kieContainer;

        packages = kieBase.getKiePackages();
        for( KiePackage pack: packages ){
            nRules += pack.getRules().size();
        }
        System.out.println("After process, number of rules : " + nRules);
    }

    public void checkRules(){
        List<DreRule> dreRules = dreRuleRepository.findAll();

        for (DreRule drerule : dreRules){
            System.out.println(drerule.toString());
        }

    }

}
