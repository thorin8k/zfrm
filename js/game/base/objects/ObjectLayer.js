var ObjectLayer = Class.extend({
    z:0,
    objList : [],
    objsToRemove: [],
    tools:null,
    init: function(objs){
        this.objList = [];
        if(objs !== null && objs !== undefined){
            this.objList = objs;
        }
    },
    prestart:function(tools){
        this.tools = tools;
    },
    getObject: function(sObjectId){
        if (typeof sObjectId === 'string') {
            var oCurrentGameObject = null;
            var nObjectCount = 0;
            var objLength = this.objList.length;
            for (nObjectCount = 0; nObjectCount < objLength; nObjectCount += 1) {
                oCurrentGameObject = this.objList[nObjectCount];
                if (oCurrentGameObject.__id === sObjectId) {
                    return oCurrentGameObject;
                }
            }
        }
        return null;
    },
    addObject: function(sObjectId,object){
        //añade el objeto pasado
        if (typeof object === 'object') { 
            object.__id = sObjectId;
            this.objList.push(object);
        }
    },
    removeObject:function(sObjectId){
        if (typeof sObjectId === 'string') {
            var oCurrentGameObject = null;
            var nObjectCount = 0;
            var nGameObjectsLength = this.objList.length;
 
            for (nObjectCount = 0; nObjectCount < nGameObjectsLength; nObjectCount += 1) {
                oCurrentGameObject = this.objList[nObjectCount];
                if (oCurrentGameObject.__id === sObjectId) {
                    this.objsToRemove.push(nObjectCount);
                    //FIXME tools null?
//                    this.tools.game.messageContainer.speak({
//                        message : "#objRemoved#",
//                        data : sObjectId
//                    });
                }
            }
        }
    },    
    callObjectMethods: function(methodName,args){
        var oCurrentGameObject = null;
        var nObjectCount = 0;
        var nGameObjectsLength = this.objList.length;
 
        for (nObjectCount = 0; nObjectCount < nGameObjectsLength; nObjectCount += 1) {
            oCurrentGameObject = this.objList[nObjectCount];
            if (oCurrentGameObject[methodName]) {
                oCurrentGameObject[methodName](args);
            }
        }
    },
    mergeWith: function(obj){
        //Combinar capas solo afectará a las siguientes propiedades
        //x,y,z
        for(var key in obj.objList){
            var exists = this.getObject(obj.objList[key].__id);
            if(exists === null){
                this.addObject(obj.objList[key].__id, obj.objList[key]);
            }else{
                exists.x = obj.objList[key].x;
                exists.y = obj.objList[key].y;
                exists.z = obj.objList[key].z;
                exists.speed = obj.objList[key].speed;
                exists.gravity = obj.objList[key].gravity;
                //TODO: More properties?
            }
            
        }
        
    }
});


