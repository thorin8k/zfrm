/**
 * @Author Thorin8k
 * 
 * Clase Game. 
 * 
 * Framework de gestión de juegos con canvas y html5.
 *  
 */
var Game = Class.extend({
    //objeto canvas, gestión de buffer
    oCanvas: null,
    //listado de capas
    layerList: [],
    //listado de modulos
    moduleList: [],
    //listado de capas a remover
    layersToRemoveList: [],
    //cola de añadidos
    layersToAddList: [],
    //observer
    messageContainer: null,
    //tools necesarias para los obj o modulos
    moduleTools: null,
    //precargador de imagenes
    imageManager : null,
    //estado 
    status: STATUS_STOPPED,
    //bucle de ejecución (requestAnimFrame)
    animFrame: null,
    //opciones
    settings: {
        debug:true,
        drawCollisionRects:false
    },
    //Constructor
    init: function(canvas){
        this.imageManager = new ImageManager();
        this.oCanvas = new CanvasExt(canvas);
        this.messageContainer = new MessageContainer();
        this.addLayer('loadingScreen',new LoadingScreen());
    },
    //setter
    setSettings:function(settings){
        this.settings = settings;
    },
    updOrSetSetting:function(key,value){
        this.settings[key]= value;
        this.moduleTools.settings = this.settings;
    },
    //agregador de capas
    addLayer: function(sObjectId,object){
        //añade el objeto pasado
        if (typeof object === 'object') { 
            object.__id = sObjectId;
            this.layerList.push(object);
            if(this.status === STATUS_RUNNING){
                //Si el juego esta en ejecución se inicia
                if(object['callObjectMethods']){
                    object.callObjectMethods("start", this.moduleTools);
                }
            }
        }
    },
    //añade la capa pasada al array de objetos por remover
    removeLayer:function(sObjectId){
        if (typeof sObjectId === 'string') {
            var oCurrentGameObject = null;
            var nObjectCount = 0;
            var nGameObjectsLength = this.layerList.length;
 
            for (nObjectCount = 0; nObjectCount < nGameObjectsLength; nObjectCount += 1) {
                oCurrentGameObject = this.layerList[nObjectCount];
                if (oCurrentGameObject.__id === sObjectId) {
                    this.layersToRemoveList.push(nObjectCount);
                }
            }
        }
    },
    //obtiene una capa por nombre
    getLayer: function(sObjectId){
        if (typeof sObjectId === 'string') {
            var oCurrentGameObject = null;
            var objListLength = this.layerList.length;
            for (nObjectCount = 0; nObjectCount < objListLength; nObjectCount += 1) {
                oCurrentGameObject = this.layerList[nObjectCount];
                if (oCurrentGameObject.__id === sObjectId) {
                    return oCurrentGameObject;
                }
            }
        }
        return null;
    },
    //añade el módulo pasado
    addModule: function(moduleId,moduleObj){
        //añade el objeto pasado
        if (typeof moduleObj === 'object') { 
            moduleObj.__id = moduleId;
            this.moduleList.push(moduleObj);
        }
    },
    //obtiene un módulo
    getModule: function(moduleId){
        if (typeof moduleId === 'string') {
            var oCurrentModule = null;

            for (nObjectCount = 0; nObjectCount < this.moduleList.length; nObjectCount += 1) {
                oCurrentModule = this.moduleList[nObjectCount];
                if (oCurrentModule !== null && oCurrentModule !== undefined && oCurrentModule.__id === moduleId) {
                    return oCurrentModule;
                }
            }
        }
        return null;
    },
    //TODO: método para descargar un módulo
    //forma de implementar los eventos de teclado y ratón
    executionKey: function(event){
        //Llamamos al método de todos los objetos del juego que implementen 
        //este tipo de evento
        var sEventType = event.type;
 
        if (event.keyCode !== 17 && event.keyCode !== 116) {
            event.preventDefault();
        }
 
        this.callObjectMethods(sEventType, event);
    },
    //Inicio del juego
    startGame:function(){
        var game = this;
        game.preStart();
        //Bucle principal de juego
        game.gameLogic();
        //función callback cuando se cargan todas las imagenes.
        this.imageManager.load(function(){ 
            
            // Notificar a los modulos el evento Start
            game.messageContainer.speak({
                message : "#start#",
                data : null
            });
            //launch the start method to the objects
            game.callObjectMethods("start", game.moduleTools);
            game.status = STATUS_RUNNING;
            
            game.removeLayer('loadingScreen');
        },this.getLayer('loadingScreen'));
    },
    //Pone el juego en estado iddle y para la ejecución
    pauseGame: function(){
        this.status = STATUS_IDDLE;
        //TODO: no parar la ejecución y poner un menu parando los objetos?
        cancelAnimationFrame(this.animFrame);
    },
    //Vuelve el juego al estado running y reinicia la ejecución
    resumeGame: function(){
        this.status = STATUS_RUNNING;
        this.gameLogic();
    },
    //llama a change viewport de las capas
    changeViewPort: function(x,y){
        //TODO : Implementar esto en la capa de collisionables
        this.callObjectMethods('changeViewPort',{x:x,y:y});
    },
    /* -----------  Private Methods ------------ */
    //Precarga de los módulos
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
    //realiza una llamada en cascada a los métodos pasados.
    callObjectMethods:function(methodName,args){
        //Recorre todos los objetos del juego buscando aquellos que tengan el metodo pasado
        //ejecutandolo al encontrarlos.
        var oCurrentGameObject = null;
        var nObjectCount = 0;
        var nGameObjectsLength = this.layerList.length;
 
        for (nObjectCount = 0; nObjectCount < nGameObjectsLength; nObjectCount += 1) {
            oCurrentGameObject = this.layerList[nObjectCount];
            if (oCurrentGameObject[methodName]) {
                oCurrentGameObject[methodName](args);
            }else if(oCurrentGameObject['callObjectMethods']){
                //Si la capa en cuestión implementa este método se ejecuta también
                oCurrentGameObject['callObjectMethods'](methodName,args);
            }
        }
    }, 
    //Lógica de ejecución
    gameLogic: function(){
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
        //del array principal de capas
        var nRemoveLength = this.layersToRemoveList.length;
        var nCount = 0;
        var nCurrentObject = 0;
 
        for (nCount = 0; nCount < nRemoveLength; nCount += 1) {
              nCurrentObject = this.layersToRemoveList[nCount];
              this.layerList.splice(nCurrentObject, 1);
        }
        this.layersToRemoveList = [];
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
                      oCurrentGameObject.objList.splice(nCurrentObject, 1);
                }
                oCurrentGameObject.objsToRemove = [];
            }
        }
    },
    executionAddFromQeue: function(){
        //Añade los objetos existentes el la cola a la coleción principal
        var nRemoveLength = this.layersToAddList.length;
        var nCount = 0;
        var nCurrentObject = 0;
 
        for (nCount = 0; nCount < nRemoveLength; nCount += 1) {
              nCurrentObject = this.layersToAddList[nCount];
              this.layerList.push(nCurrentObject);
              if(nCurrentObject['start']){
                  //Ejecuta su método start si lo tienen
                  nCurrentObject['start']();
              }
        }
        this.layersToAddList = [];
    },
    executionUpdate: function(){
        //llama al método update de los objetos de juego
       this.callObjectMethods("update", this.oCanvas);
       //Reordenamos los objetos en el eje Z.
       this.layerList.sort(function(oObjA, oObjB) {
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

