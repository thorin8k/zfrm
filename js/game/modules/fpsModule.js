var FpsModule = IModule.extend({
        currentFps: 0,
        frameCount: 0,
        lastFps: null,
        oBuffer: null,
        
        
        loadModule : function (tools) {
            this.lastFps = new Date().getTime();
            this.tools = tools;
            
            this.ownCanvas = document.createElement('canvas');
            
            tools.messageContainer.listen(["#draw#"], this.drawFps, this);
        },
        drawFps : function() {
            this.ownCanvas.width = this.tools.canvas.main.width;
            this.ownCanvas.height = this.tools.canvas.main.height;
            var ownBuffer = this.ownCanvas.getContext('2d');
            
            var thisFrame = new Date().getTime();
            var diffTime = Math.ceil((thisFrame - this.lastFps));
 
            if (diffTime >= 1000) {
                this.currentFps = this.frameCount;
                this.frameCount = 0.0;
                this.lastFps = thisFrame;
            }
            
            ownBuffer.globalCompositeOperation = "destination-over";
            this.tools.canvas.canvasText.config({
                canvas: this.ownCanvas,
                context: ownBuffer,
                fontSize: '11px',
                fontWeight: 'bold',
                fontColor: 'red',
                lineHeight: "22"
            });
            this.tools.canvas.canvasText.drawText({
                text:'FPS: ' + this.currentFps,
                x: 10,
                y: 15

            });
            this.frameCount += 1;
            this.tools.canvas.bufferContext.drawImage(this.ownCanvas,0,0);
            
            ownBuffer = null;
        }
    });


