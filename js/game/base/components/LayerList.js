/***
 * Colección de capas.
 *
 * Gestiona una lista de capas, con una cola de añadido y otra de eliminado.
 *
 */
var LayerList = Class.extend({
    layerList: [],
    layersToRemove: [],
    queueList: [],
    tools: null,
    init: function (tools) {
        this.tools = tools;
    },
    count: function () {
        return this.layerList.length;
    },
    getList: function () {
        return this.layerList;
    },
    getItemByIdx: function (idx) {
        return this.layerList[idx];
    },
    getItem: function (sId) {
        if (typeof sId === 'string') {
            var nObjectCount = 0,
                currentLayer = null,
                objListLength = this.layerList.length;
            while (nObjectCount < objListLength) {
                currentLayer = this.layerList[nObjectCount];
                if (currentLayer.__id === sId) {
                    return currentLayer;
                }
                nObjectCount++;
            }
        }
        return null;
    },
    addItem: function (sObjectId, object) {
        //añade el objeto pasado
        var exists = this.getItem(sObjectId);
        if (exists === null) {
            object.__id = sObjectId;
            this.layerList.push(object);
            if (this.tools.game.status === STATUS_RUNNING) {
                //Si el juego esta en ejecución se inicia
                if (object['callObjectMethods']) {
                    object.callObjectMethods("start", this.tools);
                }
            }
        } else {
            //si la capa ya existe las combina.
            if (exists.mergeWith) {
                exists.mergeWith(object);
            }
        }
    },
    getItemIdx: function (sId) {
        if (typeof sObjectId === 'string') {
            var nObjectCount = 0,
                currentLayer = null,
                objListLength = this.count();

            while (nObjectCount < objListLength) {
                currentLayer = this.getItemByIdx(nObjectCount);
                if (currentLayer.__id === sId) {
                    return nObjectCount;
                }
                nObjectCount++;
            }
        }
        return null;
    },
    removeItem: function (sId) {
        if (typeof sId === 'string') {
            var currentLayer = null,
                nObjectCount = 0,
                nGameObjectsLength = this.count();

            while (nObjectCount < nGameObjectsLength) {
                currentLayer = this.getItemByIdx(nObjectCount);
                if (currentLayer.__id === sId) {
                    this.layersToRemove.push(sId);
                }
                nObjectCount++;
            }
        }
    },
    clearRemoveds: function () {
        //Recorre las capas, en caso de existir, buscando objetos en la collección
        // de removibles y los elimina
        var currentLayer = null,
            currObj = null,
            nLayerCount = 0,
            layerListLength = this.layerList.length;

        while (nLayerCount < layerListLength) {
            currentLayer = this.layerList[nLayerCount];
            if (currentLayer.objsToRemove && currentLayer.objsToRemove.length !== 0) {
                nRemoveLength = currentLayer.objsToRemove.length;
                nCount = 0;

                while (nCount < nRemoveLength) {
                    currObj = currentLayer.objsToRemove[nCount];
                    for(var i = 0; i < currentLayer.objList.length; i++){
                        if(currentLayer.objList[i].__id === currObj){
                            console.log("Removing:"+currObj);
                            currentLayer.objList.splice(i, 1);
                        }
                    }
                    nCount++;
                }
                currentLayer.objList = cleanArray(currentLayer.objList);
                currentLayer.objsToRemove = [];
            }
            nLayerCount++;
        }

        //Elimina los objetos presentes en el array de objetos para eliminar
        //del array principal de capas
        var nRemoveLength = this.layersToRemove.length,
            nCount = 0,
            layToRemove = 0;
        if (nRemoveLength !== 0) {
            while (nCount < nRemoveLength) {
                layToRemove = this.layersToRemove[nCount];
                for(var i = 0; i < this.layerList.length; i++){
                    if(this.layerList[i].__id === layToRemove){
                        console.log("Removing:"+layToRemove);
                        this.layerList.splice(i, 1);
                    }
                }
                nCount++;
            }
            this.layerList = cleanArray(this.layerList);
            this.layersToRemove = [];
        }
    },
    sort: function (sortFn) {
        this.layerList.sort(sortFn);
    },
    addToQueue: function (sObjectId, object) {
        if (typeof object === 'object') {
            object.__id = sObjectId;
            this.queueList.push(object);
        }
    },
    processQueue: function () {
        //Añade los objetos existentes el la cola a la coleción principal
        var nQueueLength = this.queueList.length,
            nCount = 0,
            currentLayer = 0;
        if (nQueueLength === 0) return;

        while (nCount < nQueueLength) {
            currentLayer = this.queueList[nCount];
            //Añade los obj al array principal
            this.layerList.push(currentLayer);
            //ejecuta su método start en caso de disponer de el
            if (currentLayer['start']) {
                //Ejecuta su método start si lo tienen
                currentLayer['start'](this.tools);
            } else if (currentLayer['callObjectMethods']) {
                currentLayer['callObjectMethods']('start', this.tools);
            }
            nCount++;
        }
        this.queueList = [];
    },
    clearLandscape: function () {
        var count = 0,
            len = this.count(),
            currObj = null;

        while (count < len) {
            currObj = this.getItemByIdx(count);

            if (currObj instanceof LandscapeLayer) {
                this.removeItem(currObj.__id);
            } else if (currObj instanceof ObjectLayer) {
                var subcount = 0;
                var sublen = currObj.objList.length;
                for (subcount = 0; subcount < sublen; subcount += 1) {
                    var subObj = currObj.objList[subcount];
                    if (!(subObj.persistent)) {
                        currObj.removeObject(subObj.__id);
                    }
                }
            }
            count++;
        }

    }
})


