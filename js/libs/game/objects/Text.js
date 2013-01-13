var Text = Class.extend({
    text : '',
    x: 15,
    y: 15,
    destx: 0,
    desty: 0,
    speed: 1,
    moving: false,
    init:function(text){
        this.text = text;
    },
    update:function(){
        if(this.moving == true){
            //FIXME
            if(this.x != this.destx){
                this.x +=this.speed;
            }
            if(this.y != this.desty){
                this.y +=this.speed;
            }
            if(this.x == this.destx && this.y == this.desty){
                this.desty = 0;
                this.destx = 0;
                this.moving = false;
            }
        }
    },
    draw : function(canvas) {

        canvas.canvasText.drawText({
            text:this.text,
            x: this.x,
            y: this.y
        });

    },
    click: function(evt){
        this.destx = evt.clientX;
        this.desty = evt.clientY;
        this.moving = true;
    }
});


