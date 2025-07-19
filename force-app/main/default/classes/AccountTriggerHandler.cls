public with sharing class AccountTriggerHandler {
    //This is a helper class for handling Account trigger events.

    //Recurcursive Trigger Problem: This will solve the problem of the trigger firing multiple times infinitely
    //by using a static variable to check if the after update logic has already been executed or not
    public static boolean hasAfterUpdateAlreadyExecuted = false;
    // This list will hold the accounts to be updated after the trigger execution to avoid hitting governor limits
    List<Account> accountsToUpdate = new List<Account>();

    public void afterUpdateHandler(List<Account> accounts) {
        // This method is called after an Account record is updated.
        // You can add your logic here to handle the after update event.
        
        for(Account acc : accounts){
            Account newAcc = new Account(Id = acc.Id);
            newAcc.Last_After_Update_Execution_Time__c = DateTime.now();
            accountsToUpdate.add(newAcc);
        }
        // Update all accounts at once to avoid hitting governor limits
        if(!accountsToUpdate.isEmpty()) {
            update accountsToUpdate;
        }
    }
}