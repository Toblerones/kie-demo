package cn.tobs.drools.model;

public class Rule {

    private String ruleKey;
    private String rule;

    public String getRuleKey() {
        return ruleKey;
    }

    public void setRuleKey(String ruleKey) {
        this.ruleKey = ruleKey;
    }

    public String getRule() {
        return rule;
    }

    public void setRule(String rule) {
        this.rule = rule;
    }

    @Override
    public String toString() {
        return "Rule{" +
                "ruleKey='" + ruleKey + '\'' +
                ", rule='" + rule + '\'' +
                '}';
    }
}
