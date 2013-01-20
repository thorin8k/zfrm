var LandscapeLayer = Class.extend({
    z:0,
    imagesList : [],
    init: function(images){
        this.imagesList = [];
        if(images !== null && images !== undefined){
            this.imagesList = images;
        }
    },
    draw : function (canvas) {
        var actualImg;
        for (var i = 0; i < this.imagesList.length; i += 1) {
            actualImg = this.imagesList[i];
            canvas.bufferContext.drawImage(actualImg.oImage, actualImg.nSourceX, actualImg.nSourceY, actualImg.width, actualImg.height, actualImg.x, actualImg.y, actualImg.width, actualImg.height);
        }
    },
    addImage: function(image){
        this.imagesList.push(image);
    }
});

