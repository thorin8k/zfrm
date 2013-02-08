/**
 * @Author Thorin8k
 * 
 * Implementación del patrón de dibujo Buffer en un canvas.
 * 
 */

var CanvasExt = Class.extend({
    main : null,
    mainContext : null,
    buffer : null,
    bufferContext : null,
    canvasText: null,
    init: function(canvasId){
        this.main = document.getElementById(canvasId);
        if (this.main !== null) {
            this.mainContext = this.main.getContext('2d');
            this.buffer = document.createElement('canvas');
            this.buffer.width = this.main.width;
            this.buffer.height = this.main.height;
            this.bufferContext = this.buffer.getContext('2d');
            this.canvasText = new CanvasText();
            this.canvasText.config({
                canvas: this.buffer,
                context: this.bufferContext,
                fontSize: '14px',
                fontWeight: 'normal',
                fontColor: 'red',
                lineHeight: "22"
            });
            
        }
    }
});


