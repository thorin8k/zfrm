var ObjectLayer = Class.extend({
    z:0,
    objList : [],
    objsToRemove: [],
    init: function(objs){
        this.objList = [];
        if(objs !== null && objs !== undefined){
            this.objList = objs;
        }
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
    }
});


