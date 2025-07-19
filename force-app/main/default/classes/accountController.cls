public with sharing class accountController {
    //if you are performing a get operation in which you are just getting some data, it's always good to use, cacheable=True.
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccountList() {
        return [SELECT Id, Name, Type, Industry, Phone FROM Account LIMIT 5];
    }

    @AuraEnabled(cacheable=true)
    public static List<Account> filterAccountType(string type) {
        return [SELECT Id, Name, Type, Industry, Phone FROM Account where Type=:type LIMIT 5];
    }

    @AuraEnabled(cacheable=true)
    public static List<Account> findAccounts(string searchKey) {
        String key = '%' + searchKey + '%';
        return [SELECT Id, Name, Type, Industry, Phone FROM Account where Name LIKE : key limit 5];   
    }

    @AuraEnabled(cacheable=true)
    public static List<Contact> getContactList() {
        return [SELECT Id, FirstName, LastName, Email FROM Contact LIMIT 10];
    }
}