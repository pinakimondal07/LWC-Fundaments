public with sharing class CaseTriggerHandler {

    //We don't need the entire list of parent cases to update, we just need the Ids of the parent cases
    public static Set<Id> parentCasesIdsToUpdate;
    //Since this is static value so it will keep the value until the transaction is completed and we don't want to keep updating 
    //the same record so it is better to define its falue inside the methods and start from the scratch

    public static void afterInsertHandler(List<Case> cases){
        parentCasesIdsToUpdate = new Set<Id>();
        // Initialize the list to hold parent case IDs
        for(Case cas : cases){
            // Calculate the total resolution days for each case
            if(cas.Resolution_Days__c != null){
                // Get parent case and update the Total_Resolution_Days__c
                parentCasesIdsToUpdate.add(cas.Parent_Case__c); //now have the parent case Ids that needs to be updated
            }
        }
        //Calculate the child cases total resolution days

        // //If there are parent cases to update, we need to aggregate the total resolution days
        // if(!parentCasesIdsToUpdate.isEmpty()){
        //     parentCasesToUpdate = new List<Case>();
        //     AggregateResult[] casesWithResulutionDays = [ 
        //         SELECT Parent_Case__c, sum(Total_Resolution_Days__c) totalDays 
        //         FROM Case 
        //         GROUP BY Parent_Case__c];

        //     for(AggregateResult ar: casesWithResulutionDays){
        //         //List of Parent Case to Update
        //         Id parentId = (Id)ar.get('Parent_Case__c');     //Typecasting an object to Id 
        //         Decimal totalDays = (Decimal)ar.get('totalDays');
        //         // Create a new Case object to update the parent's Total_Resolution_Days__c
        //         parentCasesToUpdate.add(new Case(Id = parentId, Total_Resolution_Days__c = totalDays));
        //     }
        //     if(!parentCasesToUpdate.isEmpty()){
        //         // Update the parent cases with the new Total_Resolution_Days__c
        //         update parentCasesToUpdate;
        //     }
        // }

        /// Moving the logic to a helper class and then calling the method afterwards
        CasesTriggerHandlerHelper.updateTotalResolutionDaysOnParentCases(parentCasesIdsToUpdate);
        
    }

    public static void afterUpdateHandler(List<Case> cases, Map<Id, Case> oldCasesMap){
        parentCasesIdsToUpdate = new Set<Id>();
        for (Case cas : cases){
            Case oldCaseVersion = oldCasesMap.get(cas.Id);
            //We should also check that on the update does the Resolution_Days__c field is being updated or not
            if(cas.Resolution_Days__c != null && cas.Resolution_Days__c != oldCaseVersion.Resolution_Days__c){
                //If it's being updated, we need to recalculate the parent's total resolution days
                if(cas.Parent_Case__c != null){
                    // Get parent case and update the Total_Resolution_Days__c
                    parentCasesIdsToUpdate.add(cas.Parent_Case__c); //now have the parent case Ids that needs to be updated
                }
            }
            if(cas.Parent_Case__c != oldCaseVersion.Parent_Case__c){
                //If the child case is re-paranted(means updated as Parent), we need to recalculate the parent's total resolution days
                if(cas.Parent_Case__c != null){
                    // Get parent case and update the Total_Resolution_Days__c
                    parentCasesIdsToUpdate.add(cas.Parent_Case__c); //now have the parent case Ids that needs to be updated
                }
                if(oldCaseVersion.Parent_Case__c != null){
                    // Get parent case and update the Total_Resolution_Days__c
                    parentCasesIdsToUpdate.add(oldCaseVersion.Parent_Case__c); //now have the parent case Ids that needs to be updated
                }
            }
        }
        CasesTriggerHandlerHelper.updateTotalResolutionDaysOnParentCases(parentCasesIdsToUpdate);
    }

    public static void afterDeleteHandler(List<Case> cases){
        parentCasesIdsToUpdate = new Set<Id>();
        for(Case cas : cases){
            // Calculate the total resolution days for each case
            if(cas.Resolution_Days__c != null){
                // Get parent case and update the Total_Resolution_Days__c
                parentCasesIdsToUpdate.add(cas.Parent_Case__c); //now have the parent case Ids that needs to be updated
            }
        }
        CasesTriggerHandlerHelper.updateTotalResolutionDaysOnParentCases(parentCasesIdsToUpdate);
    }

    public static void afterUndeleteHandler(List<Case> cases){
        parentCasesIdsToUpdate = new Set<Id>();
        for(Case cas : cases){
            // Calculate the total resolution days for each case
            if(cas.Resolution_Days__c != null){
                // Get parent case and update the Total_Resolution_Days__c
                parentCasesIdsToUpdate.add(cas.Parent_Case__c); //now have the parent case Ids that needs to be updated
            }
        }
        CasesTriggerHandlerHelper.updateTotalResolutionDaysOnParentCases(parentCasesIdsToUpdate);
    }
    
}