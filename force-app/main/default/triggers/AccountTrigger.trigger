//Scenario: Whenever an after update trigger is executed on Account record, update a field named
//          'Last_After_Update_Execution_Time' on account with current Time

trigger AccountTrigger on Account (after update) {
    // List<Account> accountsToUpdate = new List<Account>();

    switch on Trigger.operationType {
        when  AFTER_UPDATE{

            //It is a good practice to write the login in the handler class

            //// Loop through each Account in the trigger context
            // for(Account acc : Trigger.new){
            //         Account newAcc = new Account(Id = acc.Id);
            //         newAcc.Last_After_Update_Execution_Time__c = DateTime.now();
            //         accountsToUpdate.add(newAcc);
            //     }

                //We will now call the method of the handler class here
                if(!AccountTriggerHandler.hasAfterUpdateAlreadyExecuted){
                    // Check if the after update logic has already been executed
                    AccountTriggerHandler.hasAfterUpdateAlreadyExecuted = true;
                    //Call the handler method to process after update logic, this will ensure that the logic is executed 
                    //only once per transaction
                    new AccountTriggerHandler().afterUpdateHandler(Trigger.new);
                    
                }
                
            }    
        }

        // // Update all accounts at once to avoid hitting governor limits
        // if(!accountsToUpdate.isEmpty()) {
        //     update accountsToUpdate;
        // }

}
