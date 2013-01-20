var ImageObj = IObject.extend({
    x: 15,
    y: 15,
    width: 32,
    height: 32,
    oImage : null,
    nSourceX :32,
    nSourceY :32,
    init: function(image){
        this.oImage = image;
    },
    draw : function (canvas) {
        canvas.bufferContext.drawImage(this.oImage, this.nSourceX, this.nSourceY, this.width, this.height, this.x, this.y, this.width, this.height);
    }
});

