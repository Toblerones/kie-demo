package cn.tobs.drools.controller;

import cn.tobs.drools.fact.RuleProcessedResult;
import cn.tobs.drools.model.Person;
import cn.tobs.drools.model.Rule;
import cn.tobs.drools.service.DroolsRulesServiceImpl;
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
    public ResponseEntity<RuleProcessedResult> runRules(@RequestBody Person person){
        System.out.println("Incoming message = [" + person.toString() + "]");
        return new ResponseEntity<>(rulesService.runRule(person), HttpStatus.OK);
    }

    @RequestMapping(value = "/engine/rule", method = RequestMethod.POST)
    public ResponseEntity<List<Rule>> updateRules(@RequestBody Rule rule) throws IOException {
        System.out.println("Incoming message = [" + rule.toString() + "]");
        rulesService.updateRule(rule);
        return new ResponseEntity<>(rulesService.checkRules(), HttpStatus.OK);
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
    public ResponseEntity reloadDbRules() {
        rulesService.reloadRulesFromDb();
        return ResponseEntity.ok().build();
    }

}
