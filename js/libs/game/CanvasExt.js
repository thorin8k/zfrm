/**
 * Implementación del patrón de dibujo Buffer en un canvas.
 * 
 */

var CanvasExt = Class.extend({
    main : null,
    mainContext : null,
    buffer : null,
    bufferContext : null,
    init: function(canvasId){
        this.main = document.getElementById(canvasId);
        if (this.main !== null) {
            this.mainContext = this.main.getContext('2d');
            this.buffer = document.createElement('canvas');
            this.buffer.width = this.main.width;
            this.buffer.height = this.main.height;
            this.bufferContext = this.buffer.getContext('2d');
        }
    }
});


