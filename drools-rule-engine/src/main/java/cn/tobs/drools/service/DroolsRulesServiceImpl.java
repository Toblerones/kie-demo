package cn.tobs.drools.service;

import cn.tobs.drools.fact.RuleProcessedResult;
import cn.tobs.drools.model.Person;
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
import org.kie.api.runtime.KieSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.LinkedList;
import java.util.List;

@Service
public class DroolsRulesServiceImpl {

    public static KieContainer kieContainer;

    @Autowired
    KieBase kieBase;

    @Autowired
    private DreRuleRepository dreRuleRepository;

    public RuleProcessedResult runRule(Person person) {
        KieSession kieSession = kieContainer.newKieSession();

        RuleProcessedResult result = new RuleProcessedResult();
        kieSession.insert(person);
        kieSession.insert(result);
        int ruleFiredCount = kieSession.fireAllRules();
        kieSession.destroy();
        System.out.println(ruleFiredCount + " rules are fired");

        return result;
    }

    public void updateRule(Rule rule) {


        System.out.println("Loading Rule from database by key[" + rule.getRuleKey() + "]....");
        DreRule dreRule = dreRuleRepository.findByKey(rule.getRuleKey());
        if (dreRule == null) {
            System.out.println("Cannot find key[" + rule.getRuleKey() + "]. It's new Rule.");
            dreRule = new DreRule();
        }
        dreRule.setContent(rule.getRule());
        dreRule.setKey(rule.getRuleKey());
        dreRule.setCreateTime(String.valueOf(System.currentTimeMillis()));
        dreRuleRepository.save(dreRule);
        System.out.println("Finished update.");

        reloadRulesFromDb();
    }

    public List<Rule> checkRules(){
        List<DreRule> dreRules = dreRuleRepository.findAll();
        List<Rule> rules = new LinkedList<>();
        for (DreRule dreRule : dreRules) {
            Rule rule = new Rule();
            rule.setRuleKey(dreRule.getKey());
            rule.setRule(dreRule.getContent());
            rules.add(rule);
        }
        reloadRulesFromDb();
        return rules;
    }

    public Rule checkRuleByKey(String key){
        System.out.println("Loading Rule from database by key[" + key + "]....");
        DreRule dreRule = dreRuleRepository.findByKey(key);
        if(dreRule == null){
            System.out.println("Fail to loading Rule from database by key[" + key + "]....");
            return new Rule();
        }

        System.out.println("Find rule key[" + key + "]....");
        System.out.println("....Rule content Start....");
        System.out.println(dreRule.getContent());
        System.out.println("....Rule content End....");

        Rule rule = new Rule();
        rule.setRuleKey(key);
        rule.setRule(dreRule.getContent());

        return rule;
    }

    public void reloadRulesFromDb(){
        Collection<KiePackage> packages = kieBase.getKiePackages();
        int nRules=0;
        for( KiePackage pack: packages ){
            nRules += pack.getRules().size();
        }
        System.out.println("Before process number of rules : " + nRules);

        System.out.println("Loading Rule from database....");
        List<DreRule> dreRules = dreRuleRepository.findAll();
        System.out.println(dreRules.size() + " rule(s) is retrieved from database");

        long startTime = System.currentTimeMillis();
        KieServices ks = KieServices.Factory.get();
        KieRepository kr = ks.getRepository();
        KieFileSystem kfs = ks.newKieFileSystem();

        for (DreRule dreRule : dreRules){
            System.out.println(dreRule.toString());

            String drl = dreRule.getContent();
            String key = dreRule.getKey();
            kfs.write("src/main/resources/rules/" + key + ".drl", drl);
        }
        KieBuilder kb = ks.newKieBuilder(kfs);

        kb.buildAll();
        if (kb.getResults().hasMessages(Message.Level.ERROR)) {
            throw new RuntimeException("Build Errors:\n" + kb.getResults().toString());
        }
        long endTime = System.currentTimeMillis();
        System.out.println("Time to build rules : " + (endTime - startTime)  + " ms" );
        startTime = System.currentTimeMillis();
        this.kieContainer = ks.newKieContainer(kr.getDefaultReleaseId());

        endTime = System.currentTimeMillis();
        System.out.println("Time to load container: " + (endTime - startTime)  + " ms" );

        packages = kieBase.getKiePackages();
        for( KiePackage pack: packages ){
            nRules += pack.getRules().size();
        }
        System.out.println("After process, number of rules : " + nRules);
    }

}
