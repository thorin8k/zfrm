/**
 * @Author Thorin8k
 * 
 * Clase Game. 
 * 
 * Framework de gestión de juegos con canvas y html5.
 *  
 */
var Game = Class.extend({
    oCanvas: null,
    objectList: [],
    moduleList: [],
    objectsToRemoveList: [],
    messageContainer: null,
    moduleTools: null,
    imageManager : null,
    status: STATUS_STOPPED,
    animFrame: null,
    settings: {
        fps: 60
        
    },
    
    init: function(canvas){
        this.imageManager = new ImageManager();
        this.oCanvas = new CanvasExt(canvas);
        this.messageContainer = new MessageContainer();
    },   
    setSettings:function(settings){
        this.settings = settings;
    },
    addObject: function(sObjectId,object){
        //añade el objeto pasado
        if (typeof object === 'object') { 
            object.__id = sObjectId;
            this.objectList.push(object);
        }
    },
    removeObject:function(sObjectId){
        if (typeof sObjectId === 'string') {
            var oCurrentGameObject = null;
            var nObjectCount = 0;
            var nGameObjectsLength = this.objectList.length;
 
            for (nObjectCount = 0; nObjectCount < nGameObjectsLength; nObjectCount += 1) {
                oCurrentGameObject = this.objectList[nObjectCount];
                if (oCurrentGameObject.__id === sObjectId) {
                    this.objectsToRemoveList.push(nObjectCount);
                }
            }
        }
    },
    getObject: function(sObjectId){
        if (typeof sObjectId === 'string') {
            var oCurrentGameObject = null;
            var objListLength = this.objectList.length;
            for (nObjectCount = 0; nObjectCount < objListLength; nObjectCount += 1) {
                oCurrentGameObject = this.objectList[nObjectCount];
                if (oCurrentGameObject.__id === sObjectId) {
                    return oCurrentGameObject;
                }
            }
        }
        return null;
    },
    addModule: function(moduleId,moduleObj){
        //añade el objeto pasado
        if (typeof moduleObj === 'object') { 
            moduleObj.__id = moduleId;
            this.moduleList.push(moduleObj);
        }
    },
    getModule: function(moduleId){
        if (typeof moduleId === 'string') {
            var oCurrentModule = null;

            for (nObjectCount = 0; nObjectCount < this.objectList.length; nObjectCount += 1) {
                oCurrentModule = this.moduleList[nObjectCount];
                if (oCurrentModule !== null && oCurrentModule !== undefined && oCurrentModule.__id === moduleId) {
                    return oCurrentModule;
                }
            }
        }
        return null;
    },
    executionKey: function(event){
        //Llamamos al método de todos los objetos del juego que implementen 
        //este tipo de evento
        var sEventType = event.type;
 
        if (event.keyCode !== 17 && event.keyCode !== 116) {
            event.preventDefault();
        }
 
        this.callObjectMethods(sEventType, event);
    },
    startGame:function(){
        var game = this;
        this.imageManager.load(function(){ 
            game.preStart();
            // Notificar a los modulos el evento Start
            game.messageContainer.speak({
                message : "#start#",
                data : null
            });
            //launch the start method to the objects
            game.callObjectMethods("start", game.moduleTools);
            //Bucle principal de juego
            game.status = STATUS_RUNNING;
            game.gameLogic();
        });
    },    
    pauseGame: function(){
        this.status = STATUS_IDDLE;
        cancelAnimationFrame(this.animFrame);
    },
    resumeGame: function(){
        this.status = STATUS_RUNNING;
        this.gameLogic();
    },
    changeViewPort: function(x,y){
        this.callObjectMethods('changeViewPort',{x:x,y:y});
    },
    /* -----------  Private Methods ------------ */
    preStart: function(){
        this.moduleTools = new ModuleTools(this);
        var module;
        var nObjectCount = 0;
        var nGameObjectsLength = this.moduleList.length;
        for (nObjectCount = 0; nObjectCount < nGameObjectsLength; nObjectCount += 1) {
            module = this.moduleList[nObjectCount];
            if (typeof module !== 'undefined') {
                module.loadModule(this.moduleTools);
            }
        }
    },  
    callObjectMethods:function(methodName,args){
        //Recorre todos los objetos del juego buscando aquellos que tengan el metodo pasado
        //ejecutandolo al encontrarlos.
        var oCurrentGameObject = null;
        var nObjectCount = 0;
        var nGameObjectsLength = this.objectList.length;
 
        for (nObjectCount = 0; nObjectCount < nGameObjectsLength; nObjectCount += 1) {
            oCurrentGameObject = this.objectList[nObjectCount];
            if (oCurrentGameObject[methodName]) {
                oCurrentGameObject[methodName](args);
            }else if(oCurrentGameObject['callObjectMethods']){
                oCurrentGameObject['callObjectMethods'](methodName,args);
            }
        }
    }, 
    gameLogic: function(){
        //Lógica principal del juego
        this.executionRemove();
        this.messageContainer.speak({
            message : "#checkCollisions#",
            data : null
        });
        this.executionUpdate();
        this.executionDraw();
        
        //Al final de la ejecución volvemos a llamar al request animation Frame
        var self = this; //Reasignación por error en set interval en la referencia this
        this.animFrame = requestAnimationFrame(function(){self.gameLogic();});
    },
    
    executionRemove: function(){
        //Elimina los objetos presentes en el array de objetos para eliminar
        //del array principal de objetos
        var nRemoveLength = this.objectsToRemoveList.length;
        var nCount = 0;
        var nCurrentObject = 0;
 
        for (nCount = 0; nCount < nRemoveLength; nCount += 1) {
              nCurrentObject = this.objectsToRemoveList[nCount];
              this.objectList.splice(nCurrentObject, 1);
        }
        this.objectsToRemoveList = [];
        //Recorre las capas, en caso de existir, buscando objetos en la collección
        // de removibles y los elimina
        var oCurrentGameObject = null;
        var nObjectCount = 0;
        var nGameObjectsLength = this.objectList.length;
        for (nObjectCount = 0; nObjectCount < nGameObjectsLength; nObjectCount += 1) {
            oCurrentGameObject = this.objectList[nObjectCount];
            if(oCurrentGameObject.objsToRemove){
                nRemoveLength = oCurrentGameObject.objsToRemove.length;
                nCount = 0;
                nCurrentObject = 0;

                for (nCount = 0; nCount < nRemoveLength; nCount += 1) {
                      nCurrentObject = oCurrentGameObject.objsToRemove[nCount];
                      oCurrentGameObject.objList.splice(nCurrentObject, 1);
                }
                oCurrentGameObject.objsToRemove = [];
            }
        }
    },
    executionUpdate: function(){
        //llama al método update de los objetos de juego
       this.callObjectMethods("update", this.oCanvas);
       //Reordenamos los objetos en el eje Z.
       this.objectList.sort(function(oObjA, oObjB) {
               return oObjA.z - oObjB.z;
       });
    },
    executionDraw: function(){
        // Limpiamos el área de dibujo de nuestro buffer.
        this.oCanvas.bufferContext.clearRect(0, 0, this.oCanvas.buffer.width, this.oCanvas.buffer.height);
        
        // Llamámos el método "draw" de todos los objetos del juego.
        this.callObjectMethods("draw", this.oCanvas);
        // Notificar a los modulos el evento draw
        this.messageContainer.speak({
            message : "#draw#",
            data : null
        });

        // Limpiamos el área de dibujo de nuestro canvas principal.
        this.oCanvas.mainContext.clearRect(0, 0, this.oCanvas.main.width, this.oCanvas.main.height);
        // Finalmente, dibujamos el buffer en nuestro canvas principal.
        this.oCanvas.mainContext.drawImage(this.oCanvas.buffer, 0, 0);
    }
    /* ----------- Fin Private Methods ------------ */
         
});

