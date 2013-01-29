/**
 * Función importada del proyecto cyan
 */
 ImageManager = IModule.extend({
    // Número de imágenes cargadas correctamente.
    successCount: 0,
    // Número de imágenes cargadas erróneamente.
    errorCount: 0,
    // Listado de imágenes disponibles.
    ImageCollection: {},
    // Listado de imágenes en cola de espera.
    ImageList: [],
 
    loadModule: function(tools) {
        // Comprobamos que haya alguna imagen en la lista de descarga.
        if (this.ImageList.length === 0) {
            callback();
        }
        for (var i = 0; i < this.ImageList.length; i++) {
            // Guardamos la instancia del objeto para poder acceder a ella
            // desde el callback de los listeners.
            var ImageManager = this,
            // Creamos una nueva instancia del objeto Image.
            img = new Image(),
            id = this.ImageList[i].id,
            path = this.ImageList[i].path;
 
            // Creamos un listener "load" con su callback correspondiente.
            img.addEventListener("load", function() {
                // Incrementamos el valor del contador de cargas satisfactorias.
                ImageManager.successCount += 1;
                // Comprobamos si hemos terminado con la carga de todos los
                // elementos en cola dentro.
                if (ImageManager.isDone()) {
                    // Llamamos la función callback.
                    //callback();
                }
            }, false);
            // Creamos un listener "error" con su callback correspondiente.
            img.addEventListener("error", function() {
                // Incrementamos el valor del contador de cargas erróneas.
                ImageManager.errorCount += 1;
                if (ImageManager.isDone()) {
                    //callback();
                }
            }, false);
            // Establecemos el atributo "src" de la imagen actual.
            img.src = path;
            // Guardamos la imagen en nuestra colección.
            this.ImageCollection[id] = img;
        }
    },
    /**
     * Añade una imagen a la lista de descarga.
     */
    addImage : function(id,path) {
        this.ImageList.push({id: id, path: path});
    },
    /**
     * Devuelve una imagen de la colección.
     */
    getImage : function(id) {
        return this.ImageCollection[id];
    },
    /**
     * Devuelve el % del progreso de carga actual.
     */
    getProgress : function() {
        return ((this.successCount + this.errorCount)*100)/this.ImageList.length;
    },
    /**
     * Devuelve true o false dependiendo de si se han cargado todas las imágenes
     * de la lista de descarga.
     */
    isDone : function() {
        return (this.ImageList.length == (this.successCount + this.errorCount));
    },
    /**
     * Resetea la lista de descarga y las variables implicadas.
     */
    resetQueue : function () {
        this.ImageList = [];
        this.successCount = 0;
        this.errorCount = 0;
    }
});