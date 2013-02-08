/***
 * Colección de capas. 
 * 
 * Gestiona una lista de capas, con una cola de añadido y otra de eliminado.
 * 
 */
var LayerList = Class.extend({
    layerList:[],
    layersToRemove:[],
    queueList: [],
    tools:null,
    init:function(tools){
        this.tools = tools;  
    },
    count:function(){
        return this.layerList.length;  
    },
    getList:function(){
        return this.layerList;
    },
    getItemByIdx:function(idx){
        return this.layerList[idx];
    },
    getItem:function(sId){
        if (typeof sId === 'string') {
            var nObjectCount = 0;
            var oCurrentGameObject = null;
            var objListLength = this.layerList.length;
            for (nObjectCount = 0; nObjectCount < objListLength; nObjectCount += 1) {
                oCurrentGameObject = this.layerList[nObjectCount];
                if (oCurrentGameObject.__id === sId) {
                    return oCurrentGameObject;
                }
            }
        }
        return null;
    },
    addItem:function(sObjectId,object){
        //añade el objeto pasado
        var exists = this.getItem(sObjectId);
        if (exists === null) { 
            object.__id = sObjectId;
            this.layerList.push(object);
            if(this.tools.game.status === STATUS_RUNNING){
                //Si el juego esta en ejecución se inicia
                if(object['callObjectMethods']){
                    object.callObjectMethods("start", this.tools);
                }
            }
        }else{
            //si la capa ya existe las combina.
            if(exists.mergeWith){
                exists.mergeWith(object);
            }
        }
    },
    getItemIdx:function(sId){
        if (typeof sObjectId === 'string') {
            var nObjectCount = 0;
            var oCurrentGameObject = null;
            var objListLength = this.count();
            for (nObjectCount = 0; nObjectCount < objListLength; nObjectCount += 1) {
                oCurrentGameObject = this.getItemByIdx(nObjectCount);
                if (oCurrentGameObject.__id === sId) {
                    return nObjectCount;
                }
            }
        }
        return null;
    },
    removeItem:function(sId){
        if (typeof sId === 'string') {
            var oCurrentGameObject = null;
            var nObjectCount = 0;
            var nGameObjectsLength = this.count();
 
            for (nObjectCount = 0; nObjectCount < nGameObjectsLength; nObjectCount += 1) {
                oCurrentGameObject = this.getItemByIdx(nObjectCount);
                if (oCurrentGameObject.__id === sId) {
                    this.layersToRemove.push(nObjectCount);
                }
            }
        }
    },
    clearRemoveds:function(){
        //Elimina los objetos presentes en el array de objetos para eliminar
        //del array principal de capas
        var nRemoveLength = this.layersToRemove.length;
        
        var nCount = 0;
        var nCurrentObject = 0;
 
        for (nCount = 0; nCount < nRemoveLength; nCount += 1) {
              nCurrentObject = this.layersToRemove[nCount];
              //this.layerList.splice(nCurrentObject, 1);
              delete this.layerList[nCurrentObject];
        }
        this.layerList = cleanArray(this.layerList);
        this.layersToRemove = [];
        
        //Recorre las capas, en caso de existir, buscando objetos en la collección
        // de removibles y los elimina
        var oCurrentGameObject = null;
        var nObjectCount = 0;
        var nGameObjectsLength = this.layerList.length;
        for (nObjectCount = 0; nObjectCount < nGameObjectsLength; nObjectCount += 1) {
            oCurrentGameObject = this.layerList[nObjectCount];
            if(oCurrentGameObject.objsToRemove){
                nRemoveLength = oCurrentGameObject.objsToRemove.length;
                nCount = 0;
                nCurrentObject = 0;

                for (nCount = 0; nCount < nRemoveLength; nCount += 1) {
                      nCurrentObject = oCurrentGameObject.objsToRemove[nCount];
                      //oCurrentGameObject.objList.splice(nCurrentObject, 1);
                      delete oCurrentGameObject.objList[nCurrentObject];
                }
                oCurrentGameObject.objList = cleanArray(oCurrentGameObject.objList);
                oCurrentGameObject.objsToRemove = [];
            }
        }
    },
    sort:function(sortFn){
        this.layerList.sort(sortFn);
    },
    addToQueue:function(sObjectId,object){
        if (typeof object === 'object') { 
            object.__id = sObjectId;
            this.queueList.push(object);
        }
    },
    processQueue: function(){
        //Añade los objetos existentes el la cola a la coleción principal
        var nQueueLength = this.queueList.length;
        var nCount = 0;
        var nCurrentObject = 0;
        if(nQueueLength === 0) return;
        for (nCount = 0; nCount < nQueueLength; nCount += 1) {
              nCurrentObject = this.queueList[nCount];
              //Añade los obj al array principal
              this.layerList.push(nCurrentObject);
              //ejecuta su método start en caso de disponer de el
              if(nCurrentObject['start']){
                  //Ejecuta su método start si lo tienen
                  nCurrentObject['start']();
              }else if(nCurrentObject['callObjectMethods']){
                  nCurrentObject['callObjectMethods']('start',this.tools);
              }
        }
        this.queueList = [];
    },
    clearLandscape: function(){
        var count = 0;
        var len = this.count();
        var currObj = null;
        for (count = 0; count < len; count += 1){
            currObj = this.getItemByIdx(count);
            if(currObj instanceof LandscapeLayer || currObj.__id !== 'objects'){
                this.removeItem(currObj.__id);
            }else if(currObj instanceof ObjectLayer){
                var subcount= 0;
                var sublen = currObj.objList.length;
                var subObj = null;
                for(subcount = 0;subcount < sublen;subcount += 1){
                      subObj = currObj.objList[subcount];
                      if(!subObj instanceof FirstPlayer){
                          currObj.removeObject(subObj.__id);
                      }
                }
            }
        }
    }
})


