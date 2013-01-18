var Text = IClickable.extend({
    text : '',
    init:function(text){
        this.text = text;
    },
    draw : function(canvas) {

        canvas.canvasText.drawText({
            text:this.text,
            x: this.x,
            y: this.y
        });

    }
});


