// Our company's Salesforce system manages customer support cases. Each case can have multiple related child © cases. 
//The company wants to implement a feature that automatically calculates and updates the total resolution days for parent 
//cases based on the resolution days of their related child cases. Additionally, we want to ensure that any changes made 
//to child cases are accurately reflected in the parent case's resolution time.

// Example:
// Parent Case (P-001) has three child cases:
// Child Case 1 (C-801) with Resolution Days_c = 5
// Child Case 2 (C-002) with Resolution Days_c = 3
// Child Case 3 (C-003) with Resolution Days_c = 2
// If a fourth child case (C-004) is added with a Resolution Days_c = 4, the parent case's
// Total_Resolution_Days__c should update to 14.

// Questions to ask:
// How many level deep this hierarchy can go? - 1 level deep
// Can resolution days be updated manually? - No, read only field
// When does the resolution days field update? — On case status update to resolved 
// Can a case be created in’ resolved status directly? - Yes

trigger CaseTrigger on Case (after insert, after update, after delete, after undelete) {
    switch on Trigger.operationType {
        when AFTER_INSERT{
            CaseTriggerHandler.afterInsertHandler(Trigger.new);
        }
        when AFTER_UPDATE{
            CaseTriggerHandler.afterUpdateHandler(Trigger.new, Trigger.oldMap);
        }
        when AFTER_DELETE{
            CaseTriggerHandler.afterDeleteHandler(Trigger.old);
        }
        when AFTER_UNDELETE{
            CaseTriggerHandler.afterUndeleteHandler(Trigger.new);
        }
    }
}