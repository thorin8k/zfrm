var ImageObj = Object.extend({   
    oImage : null,
    nSourceX :32,
    nSourceY :32,
    init: function(image){
        this.oImage = image;
    },
    
    start:function(tools){
        
      this._super(tools);
    },
    draw : function (canvas) {
        canvas.bufferContext.drawImage(this.oImage, this.nSourceX, this.nSourceY, this.size.width, this.size.height, this.position.x, this.position.y, this.size.width, this.size.height);
    },
    toString: function(){
        var result = "";
        var res = this._super();
        result += res;
        result += "image:"+this.oImage.src;
        return result;
    }
});

