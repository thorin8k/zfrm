/**
 * Clase generada partiendo del proyecto cyan. Se ha modificado para que 
 * soporte la carga de mapas json.
 * 
 * @author Thorin8k
 */
 var AssetManager = Class.extend({
    // Número de imágenes cargadas correctamente.
    successCount: 0,
    // Número de imágenes cargadas erróneamente.
    errorCount: 0,
    // Listado de imágenes disponibles.
    ImageCollection: {},
    //Maps
    MapCollection: {},
    // Listado de imágenes en cola de espera.
    assetQueue: [],
    init:function(){},
    load: function(callback,loadingScreen) {
        // Comprobamos que haya alguna imagen en la lista de descarga.
        if (this.assetQueue.length === 0) {
            callback();
        }
        for (var i = 0; i < this.assetQueue.length; i++) {
            
            var id = this.assetQueue[i].id,
            path = this.assetQueue[i].path,
            type = this.assetQueue[i].type;
            
            switch(type){
                case "image":
                    this.loadImage(callback,loadingScreen,id,path);
                    break;
                case "map":
                    this.loadMap(callback,loadingScreen,id,path);
                    break;
            }
        }        
    },
    /**
     * Añade una imagen a la lista de descarga.
     */
    addAsset : function(type,id,path) {
        this.assetQueue.push({id: id, path: path,type: type});
    },
    loadImage:function(callback,loadingScreen,id,path){
        var img = new Image();
        var self = this;
        // Creamos un listener "load" con su callback correspondiente.
        img.addEventListener("load", function() {
            // Incrementamos el valor del contador de cargas satisfactorias.
            self.successCount += 1;
            loadingScreen.setValue(self.getProgress());
            // Comprobamos si hemos terminado con la carga de todos los
            // elementos en cola dentro.
            if (self.isDone()) {
                // Llamamos la función callback.
                callback();
            }
        }, false);
        // Creamos un listener "error" con su callback correspondiente.
        img.addEventListener("error", function() {
            // Incrementamos el valor del contador de cargas erróneas.
            self.errorCount += 1;
            if (self.isDone()) {
                callback();
            }
        }, false);
        // Establecemos el atributo "src" de la imagen actual.
        img.src = path;
        // Guardamos la imagen en nuestra colección.
        this.ImageCollection[id] = img;
    },
    loadMap:function(callback,loadingScreen,id,path){
        var self = this;
        
        $.getJSON(path, function(data) {
            // Incrementamos el valor del contador de cargas satisfactorias.
            self.successCount += 1;
            loadingScreen.setValue(self.getProgress());
            // Comprobamos si hemos terminado con la carga de todos los
            // elementos en cola dentro.
            if (self.isDone()) {
                // Llamamos la función callback.
                callback();
            }

            self.MapCollection[id] = data;
        });
    },
    /**
     * Devuelve el % del progreso de carga actual.
     */
    getProgress : function() {
        var progress = ((this.successCount + this.errorCount)*300)/this.assetQueue.length;
        return progress;
    },
    /**
     * Devuelve true o false dependiendo de si se han cargado todas las imágenes
     * de la lista de descarga.
     */
    isDone : function() {
        return (this.assetQueue.length == (this.successCount + this.errorCount));
    },
    /**
     * Resetea la lista de descarga y las variables implicadas.
     */
    resetQueue : function () {
        this.assetQueue = [];
        this.successCount = 0;
        this.errorCount = 0;
    }
});
