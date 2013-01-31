var DebugModule = IModule.extend({
    dbgContainer: null,
    loadModule: function(tools){
        this.tools = tools;
        tools.messageContainer.listen(["#dbgObjInfo#"], this.getObjectInfo, this);
        $('body').append('<div id="dbg_container">Testing Dbg:</div>');
        this.dbgContainer = $('#dbg_container');
    },
    getObjectInfo: function(notification){
        var obj = this.tools.game.getObject('objects').getObject(notification.data);
        var txt = "<div id='"+notification.data+"'>";
        for (var myKey in obj){
            if(Object.prototype.toString.call(obj[myKey]) !== '[object Function]'){
                txt += ("obj["+myKey +"] = "+obj[myKey]) + "<br/>";
            }
        }
        txt +='</div>';
        $('#dbg_container').children('#'+notification.data).remove();
        this.dbgContainer.append(txt);
    },
    
})


