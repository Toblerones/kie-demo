package cn.tobs.drools.controller;

import cn.tobs.drools.fact.RuleProcessedResult;
import cn.tobs.drools.model.Person;
import cn.tobs.drools.model.Rule;
import cn.tobs.drools.service.DroolsRulesServiceImpl;
import org.kie.api.runtime.KieSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RequestMapping("/drools")
@RestController
public class DroolsController {

    @Autowired
    DroolsRulesServiceImpl rulesService;

    @ResponseBody
    @RequestMapping("/engine/run-rules")
    public String runRules(@RequestBody Person person){

        System.out.println("Incoming message = [" + person.toString() + "]");
        KieSession kieSession = rulesService.kieContainer.newKieSession();

        RuleProcessedResult result = new RuleProcessedResult();
        kieSession.insert(person);
        kieSession.insert(result);
        int ruleFiredCount = kieSession.fireAllRules();
        kieSession.destroy();
        System.out.println(ruleFiredCount + " rules are fired");

        if(result.isPass()){
            System.out.println("Pass");
        } else {
            System.out.println("Fail");
        }

        return result.toString();
    }

    @RequestMapping("/engine/update-rules")
    public void updateRules(@RequestBody Rule rule) throws IOException {
        System.out.println("Incoming message = [" + rule.toString() + "]");
        rulesService.updateRule(rule);
    }

    @RequestMapping("/engine/rules")
    public void checkRules() {
        rulesService.checkRules();
    }
}
