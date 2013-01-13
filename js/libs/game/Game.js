/**
 * @Author Iago.s
 * 
 * Clase Game. 
 * 
 * Framework de gestión de juegos con canvas y html5.
 *  
 */
var Game = Class.extend({
    oCanvas: null,
    objectList: [],
    objectsToRemoveList: [],
    gmFps: null,
    
    init: function(canvas){
        this.oCanvas = new CanvasExt(canvas);
    },    
    setFps : function (nNewFps) {
        if (typeof nNewFps === 'number') {
            this.gmFps = nNewFps;
        }
    },
    addGameObject: function(sObjectId,object){
        //añade el objeto pasado
        if (typeof object === 'object') { 
            object.__id = sObjectId;
            this.objectList.push(object);
        }
    },
    removeGameObject: function(sObjectId){
        //Elimina el objeto con el id pasado del array de objetos de juego
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
    executionKey: function(event){
        //Llamamos al método de todos los objetos del juego que implementen 
        //este tipo de evento
        var sEventType = event.type;
        var nKeyCode = event.keyCode;
 
        if (nKeyCode !== 17 && nKeyCode !== 116) {
            event.preventDefault();
        }
 
        this.callObjectMethods(sEventType, nKeyCode);
    },
    startGame:function(){
        //Bucle principal de juego
        var self = this; //Reasignación por error en set interval en la referencia this
        setInterval(function(){self.gameLogic();}, 1000 / this.gmFps); 
    },    
    
    /* -----------  Private Methods ------------ */
    
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
            }
        }
    }, 
    gameLogic: function(){
        //Lógica principal del juego
        this.executionRemove();
        this.executionUpdate();
        this.executionDraw();
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

        // Limpiamos el área de dibujo de nuestro canvas principal.
        this.oCanvas.mainContext.clearRect(0, 0, this.oCanvas.main.width, this.oCanvas.main.height);
        // Finalmente, dibujamos el buffer en nuestro canvas principal.
        this.oCanvas.mainContext.drawImage(this.oCanvas.buffer, 0, 0);
    },
    /* ----------- Fin Private Methods ------------ */
         
});

