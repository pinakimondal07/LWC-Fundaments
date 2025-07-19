public with sharing class LearnIntegrationInApex {
    public static void makeCallout(){
        // This method demonstrates how to make a callout in Apex.
        // Note: Callouts can only be made from asynchronous contexts or with the @future annotation.
        // Ensure that the callout is made in a context that allows it, such as a @future method or a Queueable class.
        // Example of making a callout to an external API

        Http http = new Http(); //To send a request Http object will be required
        HttpRequest request = new HttpRequest();
        request.setEndpoint('callout:Global_Warming_Named_Cred/api/temperature-api'); //Calling the Named Credential
        request.setMethod('GET');
        HttpResponse res = http.send(request);

        if(res.getStatusCode() == 200) {
            // Process the response if the callout was successful
            System.debug('Make a Callout to External System: ' + res.getBody());
        } else {
            // Handle errors
            System.debug('Callout failed with status code: ' + res.getStatusCode());
        }
    }

    //If your Url is added in the Named Credentials you no need to add the add the Url in the Remote Site Settings
}