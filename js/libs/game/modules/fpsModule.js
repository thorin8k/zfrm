var FpsModule = IModule.extend({
        currentFps: 0,
        frameCount: 0,
        lastFps: null,
        oBuffer: null,
        tools: null,
        
        loadModule : function (tools) {
            this.lastFps = new Date().getTime();
            this.tools = tools;
            this.oBuffer = tools.canvas.bufferContext;
            tools.messageContainer.listen(["#draw#"], this.drawFps, this);
        },
        drawFps : function() {
 
            var thisFrame = new Date().getTime();
            var diffTime = Math.ceil((thisFrame - this.lastFps));
 
            if (diffTime >= 1000) {
                this.currentFps = this.frameCount;
                this.frameCount = 0.0;
                this.lastFps = thisFrame;
            }
 
            this.oBuffer.save();
            this.oBuffer.fillStyle = '#000';
            this.oBuffer.font = 'bold 12px sans-serif';
            this.oBuffer.fillText('FPS: ' + this.currentFps + '/' + this.tools.settings.fps, 10, 15);
            this.oBuffer.restore();
            this.frameCount += 1;
 
        }
    });


