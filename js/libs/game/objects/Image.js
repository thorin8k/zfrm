var ImageObj = IObject.extend({
    
    
    position: {'x': 0, 'y':0 },
    size: {'width': 32, 'height':32 },    
    oImage : null,
    nSourceX :32,
    nSourceY :32,
    init: function(image){
        this.oImage = image;
    },
    draw : function (canvas) {
        canvas.bufferContext.drawImage(this.oImage, this.nSourceX, this.nSourceY, this.size.width, this.size.height, this.position.x, this.position.y, this.size.width, this.size.height);
    }
});

