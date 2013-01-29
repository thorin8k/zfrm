var LandscapeLayer = Class.extend({
    z:0,
    imagesList : [],
    layBuffer: '',
    init: function(images){
        this.imagesList = [];
        if(images !== null && images !== undefined){
            this.imagesList = images;
        }
    },
    preRender:function(canvas){
        //TESTING
        var actualImg;
        var layBuffer = document.createElement('canvas');
        layBuffer.width = canvas.main.width;
        layBuffer.height = canvas.main.height;
        var layBufferContext = layBuffer.getContext('2d');
        
        for (var i = 0; i < this.imagesList.length; i += 1) {
            actualImg = this.imagesList[i];
            layBufferContext.drawImage(actualImg.oImage, actualImg.nSourceX, actualImg.nSourceY, actualImg.width, actualImg.height, actualImg.x, actualImg.y, actualImg.width, actualImg.height);
        }
        this.layBuffer = layBuffer;
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

