trigger OpportunityAutomation on Opportunity (before insert, after insert, before update, after update) {
    switch on Trigger.operationType {
        // Call the handler class to process before insert or update logic

        //When an Opprtunity is marked as "Closed Won", update the StageName to "Onboard a Contract"
        //Update the next steps on Opportunity to "Onboard a Contract"
        when BEFORE_INSERT, BEFORE_UPDATE{
            // List<Opportunity> opps = Trigger.new;       //This will return a list of oppportunity
            // Opportunity opp = opps[0];  //It will return the first opportunity in the list only

            // Loop through each Opportunity in the trigger context and update the NextStep field if the StageName is 'Closed Won'
            for(Opportunity opp : Trigger.new){
                if(opp.StageName == 'Closed Won') {
                    opp.NextStep = 'Onboard a Contract';
                }
            }
            
            

        }
        when AFTER_INSERT, AFTER_UPDATE {
            // Call the handler class to process after insert or update logic

            // Create follow-up tasks for the sales team to engage with the customer, schedule a Welcome Call,
            // and send a Thank You email to the customer.
            // List<Opportunity> opps = Trigger.new;       //This will return a list of oppportunity
            // Opportunity opp = opps[0];

            // Loop through each Opportunity in the trigger context
            for(Opportunity opp : Trigger.new){

                List<Task> tasks = new List<Task>();
                // Check if the Opportunity's StageName is 'Closed Won'
                if(opp.StageName == 'Closed Won'){
                    // Create follow-up tasks for the sales team
                    Task engageWithCustomer = new Task();
                    engageWithCustomer.WhatId = opp.Id;
                    engageWithCustomer.Subject = 'Engage with Customer';
                    tasks.add(engageWithCustomer);
                    //insert engageWithCustomer;  //If we insert here, it may hit the governor limits if there are too many opportunities


                    // Schedule a Welcome Call and send a Thank You email to the customer
                    Task welcomeCall = new Task();
                    welcomeCall.WhatId = opp.Id;
                    welcomeCall.Subject = 'Schedule a Welcome Call';
                    //insert welcomeCall;
                    tasks.add(welcomeCall);

                    Task thankyouEmail = new Task();
                    thankyouEmail.WhatId = opp.Id;
                    thankyouEmail.Subject = 'Send a Thank You Email';
                    //insert thankyouEmail;
                    tasks.add(thankyouEmail);
                }
            }
            // Insert all tasks at once to avoid hitting governor limits
            if(!tasks.isEmpty()) {
                insert tasks;
            }
        }

    }
}