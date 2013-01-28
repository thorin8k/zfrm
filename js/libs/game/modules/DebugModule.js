var DebugModule = IModule.extend({
    loadModule: function(tools){
        this.tools = tools;
        tools.messageContainer.listen(["#dbgObjInfo#"], this.getObjectInfo, this);
    },
    getObjectInfo: function(notification){
        var obj = this.tools.game.getObject('objects').getObject(notification.data);
        console.log(obj);
    }
    
})


