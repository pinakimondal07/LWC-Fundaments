({
    handleMessage : function(component, message) {
        //Component is just the instance of this particular aura component and message is the message that is coming from 
        //another component whoever publishing the message.
        if (message != null && message.getParam("lmsData") != null) {
            component.set("v.messageReceived", message.getParam("lmsData").value)
        }

    },

    inputHandler : function(component, event){
        console.log(event.target.value)
        component.set("v.messageValue",event.target.value)
    },

    publishMessage: function(component){
        let msg = component.get("v.messageValue")
        let message = {
            //lmsData - field property that we're going to use for sending the message
            lmsData:{
                value:msg
            }
        }

        component.find("SampleMessageChannel").publish(message)
        //component.find("SampleMessageChannel") - instance of the message channel
    }

})