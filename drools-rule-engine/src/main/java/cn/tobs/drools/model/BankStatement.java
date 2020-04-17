package cn.tobs.drools.model;

public class BankStatement {

    private Account account;

    private boolean isExpired;

    @Override
    public String toString() {
        return "BankStatement{" +
                "account=" + account +
                ", isExpired=" + isExpired +
                '}';
    }

    public Account getAccount() {
        return account;
    }

    public void setAccount(Account account) {
        this.account = account;
    }

    public boolean isExpired() {
        return isExpired;
    }

    public void setExpired(boolean expired) {
        isExpired = expired;
    }
}
