var Text = IObject.extend({
    text : '',
    x: 100,
    y:10,
    fontColor: 'red',
    fontSize: '14px',
    fontWeight: "normal",
    init:function(text){
        this.text = text;
    },
    draw : function(canvas) {
        canvas.canvasText.config({
            canvas: canvas.buffer,
            context: canvas.bufferContext,
            fontSize: this.fontSize,
            fontWeight: this.fontWeight,
            fontColor: this.fontColor,
            lineHeight: "22"
        });
        canvas.canvasText.drawText({
            text:this.text,
            x: this.x,
            y: this.y
            
        });

    }
});


