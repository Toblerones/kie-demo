package cn.tobs.drools.model;

public class Person {

    private String dataNumber;
    private String customerName;
    private Integer age;
    private Integer income;

    public String getDataNumber() {
        return dataNumber;
    }

    public void setDataNumber(String dataNumber) {
        this.dataNumber = dataNumber;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public Integer getIncome() {
        return income;
    }

    public void setIncome(Integer income) {
        this.income = income;
    }

    @Override
    public String toString() {
        return "Person{" +
                "dataNumber='" + dataNumber + '\'' +
                ", customerName='" + customerName + '\'' +
                ", age=" + age +
                ", income=" + income +
                '}';
    }
}
