package cn.tobs.drools.fact;

public class RuleProcessedResult {
    public boolean isPass() {
        return pass;
    }

    public void setPass(boolean pass) {
        this.pass = pass;
    }

    private boolean pass = false;

    @Override
    public String toString() {
        return "RuleProcessedResult{" +
                "pass=" + pass +
                '}';
    }
}
