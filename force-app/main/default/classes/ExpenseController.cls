public with sharing class ExpenseController {

    @AuraEnabled(cacheable=true)    //Since we are not performing DML operations, we can cache the result
    public static List<AggregateResult> getExpensesGroupByType(Date startDate, Date endDate) {
        return [SELECT Expense_Type__c, SUM(Expense_Amount__c) TotalAmount FROM Expense__c WHERE Expense_Date__c >= :startDate 
        AND Expense_Date__c <= :endDate WITH USER_MODE GROUP BY Expense_Type__c];
    }
}