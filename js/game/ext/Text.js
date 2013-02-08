var Text = Object.extend({
    text : '',
    x: 100,
    y:10,
    fontColor: 'red',
    fontSize: '14px',
    fontWeight: "normal",
    init:function(text){
        this.text = text;
    },
    start:function(tools){
        
        this._super = tools;
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

    },
    toString:function(){
        var test = this._super();
        var result = "";
        result += test;
        result += "fontColor:"+this.fontColor+'</br>';
        result += "fontSize:"+this.fontSize+'</br>';
        result += "fontWeight:"+this.fontWeight+'</br>';
        result += "text:"+this.text+'</br>';
        return  result;
    }
});


