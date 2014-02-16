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
        canvas.bufferContext.drawImage(this.oImage, this.nSourceX, this.nSourceY, this.width, this.height, this.x, this.y, this.width, this.height);
    },
    toString: function(){
        var result = "";
        var res = this._super();
        result += res;
        result += "image:"+this.oImage.src;
        return result;
    }
});

