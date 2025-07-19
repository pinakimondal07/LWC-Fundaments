({
    onLoad : function(component) {
        var myPageRef = component.get("v.pageReference")
        //This pageReference is only available when you have implemented Lightning column isURLAddressable in the cmp file.
        var id = myPageRef.state.c__id
        component.set("v.id",id)
    }
})