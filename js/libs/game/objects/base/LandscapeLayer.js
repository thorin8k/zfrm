var LandscapeLayer = Class.extend({
    z:0,
    imagesList : [],
    layBuffer: null,
    test: null,
    actualX:0,
    actualY:0,
    width:0,
    height:0,
    init: function(images){
        this.imagesList = [];
        if(images !== null && images !== undefined){
            this.imagesList = images;
        }
        
    },
    preRender:function(){
        var actualImg;
        this.layBuffer = document.createElement('canvas');
        this.layBuffer.width = this.width;
        this.layBuffer.height = this.height;
        var layBufferContext = this.layBuffer.getContext('2d');
        //clear
        layBufferContext.clearRect(0,0,this.layBuffer.width,this.layBuffer.height);
        for (var i = 0; i < this.imagesList.length; i += 1) {
            actualImg = this.imagesList[i];
            layBufferContext.drawImage(actualImg.oImage, actualImg.nSourceX, actualImg.nSourceY, actualImg.width, actualImg.height, actualImg.x, actualImg.y, actualImg.width, actualImg.height);
        }
        //store in image
        this.test=new Image();
        this.test.src = this.layBuffer.toDataURL('image/png');
        
    },
    draw : function (canvas) {
        
        if(this.test !== null){
           canvas.bufferContext.drawImage(this.test,this.actualX,this.actualY);
        }
        
    },
    addImage: function(image){
        this.imagesList.push(image);
    },
    changeViewPort: function(pos){
        
        this.actualX+= pos.x;
        this.actualY+= pos.y;
    }
});

