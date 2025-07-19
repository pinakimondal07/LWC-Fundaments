public with sharing class CasesTriggerHandlerHelper {

    public static List<Case> parentCasesToUpdate;

    public static void updateTotalResolutionDaysOnParentCases(Set<Id> parentCasesIdsToUpdate) {
        parentCasesToUpdate = new List<Case>();
        // Initialize the list to hold parent case IDs

        //If there are parent cases to update, we need to aggregate the total resolution days
        if(!parentCasesIdsToUpdate.isEmpty()){
            parentCasesToUpdate = new List<Case>();
            //Using Aggregated query we can get upto 2000 records at a time
            AggregateResult[] casesWithResolutionDays = [ 
                SELECT Parent_Case__c, SUM(Resolution_Days__c) totalDays 
                FROM Case 
                WHERE Parent_Case__c IN :parentCasesIdsToUpdate
                GROUP BY Parent_Case__c];

            for(AggregateResult ar: casesWithResolutionDays){
                //List of Parent Case to Update
                Id parentId = (Id)ar.get('Parent_Case__c');     //Typecasting an object to Id 
                Decimal totalDays = (Decimal)ar.get('totalDays');
                // Create a new Case object to update the parent's Total_Resolution_Days__c
                parentCasesToUpdate.add(new Case(Id = parentId, Total_Resolution_Days__c = totalDays));
            }
            if(!parentCasesToUpdate.isEmpty()){
                // Update the parent cases with the new Total_Resolution_Days__c
                update parentCasesToUpdate;
            }
        }
    }

    //To handle the limitaltion of Aggregate query
    public static void updateTotalResolutionDaysOnParentCasesUsingInnerQuery(et<Id> parentCaseIdsToUpdate){
        parentCasesToUpdate = new List<Case>();
        if (parentCaseIdsToUpdate.size() > 0) {
            parentCasesToUpdate = new List<Case>();

            for (Case parentCase : [
                SELECT
                    Id,
                    Total_Resolution_Days__c,
                    (SELECT Id, Resolution_Days__c FROM Cases__r)
                FROM Case
                WHERE Id IN :parentCaseIdsToUpdate
            ]) {
                Decimal totalDays = 0;

                for (Case childCase : parentCase.Cases__r) {
                    totalDays += childCase.Resolution_Days__c;
                }

                parentCasesToUpdate.add(
                    new Case(
                        Id = parentCase.Id,
                        Total_Resolution_Days__c = totalDays
                    )
                );
            }

            if (parentCasesToUpdate.size() > 0) {
                update parentCasesToUpdate;
            }
        }
    }
}