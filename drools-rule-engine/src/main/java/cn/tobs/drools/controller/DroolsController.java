package cn.tobs.drools.controller;

import cn.tobs.drools.fact.RuleProcessedResult;
import cn.tobs.drools.model.Person;
import cn.tobs.drools.model.Rule;
import cn.tobs.drools.service.DroolsRulesServiceImpl;
import org.jpmml.model.annotations.Required;
import org.kie.api.runtime.KieSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RequestMapping("/drools")
@RestController
public class DroolsController {

    @Autowired
    DroolsRulesServiceImpl rulesService;

    @ResponseBody
    @RequestMapping("/engine/run-rules")
    public String runRules(@RequestBody Person person){

        System.out.println("Incoming message = [" + person.toString() + "]");

        if(rulesService.runRule(person)){
            System.out.println("Pass");
            return "Pass";
        } else {
            System.out.println("Fail");
            return "Fail";
        }
    }

    @RequestMapping(value = "/engine/rule", method = RequestMethod.POST)
    public void updateRules(@RequestBody Rule rule) throws IOException {
        System.out.println("Incoming message = [" + rule.toString() + "]");
        rulesService.updateRule(rule);
    }

    @RequestMapping(value = "/engine/rules", method = RequestMethod.GET)
    public ResponseEntity<List<Rule>> checkRules() {
        return new ResponseEntity<>(rulesService.checkRules(), HttpStatus.OK);
    }

    @RequestMapping(value = "/engine/rule", method = RequestMethod.GET)
    public ResponseEntity<Rule> checkRule(@RequestParam String key){
        System.out.println("Incoming message [key]= [" + key + "]");
        Rule rule = rulesService.checkRuleByKey(key);

        return new ResponseEntity<>(rule, HttpStatus.OK);
    }

    @RequestMapping("/engine/reload-db-rules")
    public void reloadDbRules() {
        rulesService.reloadRulesFromDb();
    }


}
