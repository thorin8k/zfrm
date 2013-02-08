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
    actualMap: "",
    //opciones
    settings: {
        debug:true,
        drawCollisionRects:false
    },
    //Constructor
    init: function(canvas){
        
        this.imageManager = new AssetManager();
        this.oCanvas = new CanvasExt(canvas);
        this.messageContainer = new MessageContainer();
        this.moduleTools = new ModuleTools(this);
        this.layerList = new LayerList(this.moduleTools);
        //pantalla de carga mientras se descargan los mapas e imagenes
        this.addLayer('loadingScreen',new LoadingScreen());
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
            var oCurrentModule = null, 
            nObjectCount = 0,
            moduleLength = this.moduleList.length;
            
            
            for (nObjectCount = 0; nObjectCount < moduleLength; nObjectCount += 1) {
                oCurrentModule = this.moduleList[nObjectCount];
                if (oCurrentModule !== null && oCurrentModule !== undefined && oCurrentModule.__id === moduleId) {
                    return oCurrentModule;
                }
            }
        }
        return null;
    },
    //TODO: método para descargar un módulo (descargar todos sus listeners)
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
            //eliminar layer de carga
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
        this.callObjectMethods('changeViewPort',{x:x,y:y});
    },
    /* -----------  Private Methods ------------ */
    //Precarga de los módulos
    preStart: function(){
        var module;
        var nObjectCount = 0;
        var nGameObjectsLength = this.moduleList.length;
        
        for (nObjectCount = 0; nObjectCount < nGameObjectsLength; nObjectCount += 1) {
            module = this.moduleList[nObjectCount];
            if (typeof module !== 'undefined') {
                module.loadModule(this.moduleTools);
            }
        }
        
        // Notificar a los modulos el evento preStart
        this.messageContainer.speak({
            message : "#prestart#",
            data : null
        });
        //launch the prestart method to the objects
        this.callObjectMethods("prestart", this.moduleTools);
    },
    //realiza una llamada en cascada a los métodos pasados.
    callObjectMethods:function(methodName,args){
        //Recorre todos los objetos del juego buscando aquellos que tengan el metodo pasado
        //ejecutandolo al encontrarlos.
        var oCurrentGameObject = null;
        var nObjectCount = 0;
        var nGameObjectsLength = this.layerList.count();
 
        for (nObjectCount = 0; nObjectCount < nGameObjectsLength; nObjectCount += 1) {
            oCurrentGameObject = this.layerList.getItemByIdx(nObjectCount);
            if (oCurrentGameObject[methodName]) {
                oCurrentGameObject[methodName](args);
            }
            if(oCurrentGameObject['callObjectMethods']){
                //Si la capa en cuestión implementa este método se ejecuta también
                oCurrentGameObject['callObjectMethods'](methodName,args);
            }
        }
    }, 
    //Lógica de ejecución
    gameLogic: function(){
        //Procesar la cola de elimación
        this.executionRemove();
        //añadir los objetos en la cola a la ejecución principal
        this.executionAddFromQueue();
        //Procesar colisiones
        this.messageContainer.speak({
            message : "#checkCollisions#",
            data : null
        });
        //Actualizar objetos
        this.executionUpdate();
        //Dibujar
        this.executionDraw();
        
        //Al final de la ejecución volvemos a llamar al request animation Frame
        var self = this; //Reasignación por error en set interval en la referencia this
        this.animFrame = requestAnimationFrame(function(){self.gameLogic();});
    },
    
    executionRemove: function(){
        //Elimina los objetos presentes en el array de objetos para eliminar
        //del array principal de capas
        this.layerList.clearRemoveds();
    },
    executionAddFromQueue: function(){
        if(this.status === STATUS_RUNNING){
            this.layerList.processQueue();
        }
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
    },
    /* ----------- Fin Private Methods ------------ */
    /* ---- WRAPPERS -----*/
    setSettings:function(settings){
        this.settings = settings;
    },
    updOrSetSetting:function(key,value){
        this.settings[key]= value;
        this.moduleTools.settings = this.settings;
    },
    addLayer: function(sObjectId,object){
        this.layerList.addItem(sObjectId,object);
    },
    addLayerToQueue: function(sObjectId,object){
        this.layerList.addToQueue(sObjectId,object);
    },
    removeLayer:function(sObjectId){
        this.layerList.removeItem(sObjectId);
    },
    getLayer: function(sObjectId){
        return this.layerList.getItem(sObjectId);
    },
    clearLandscape: function(){
        this.layerList.clearLandscape();
    }
    /* ---- FIN WRAPPERS -----*/
});

