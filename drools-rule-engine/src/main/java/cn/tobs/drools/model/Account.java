package cn.tobs.drools.model;

import java.math.BigDecimal;

public class Account {
    private BigDecimal balance;
    private String productType;
    private BigDecimal creditLimit;
    private String status;

    @Override
    public String toString() {
        return "Account{" +
                "balance=" + balance +
                ", productType='" + productType + '\'' +
                ", creditLimit=" + creditLimit +
                ", status='" + status + '\'' +
                '}';
    }

    public BigDecimal getBalance() {
        return balance;
    }

    public void setBalance(BigDecimal balance) {
        this.balance = balance;
    }

    public String getProductType() {
        return productType;
    }

    public void setProductType(String productType) {
        this.productType = productType;
    }

    public BigDecimal getCreditLimit() {
        return creditLimit;
    }

    public void setCreditLimit(BigDecimal creditLimit) {
        this.creditLimit = creditLimit;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
