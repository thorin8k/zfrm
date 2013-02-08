/* 
 * Clase generada a partir del tutorial:
 * 
 * http://www.splashnology.com/article/how-to-create-a-progress-bar-with-html5-canvas/478/
 *
 *
 */
var LoadingScreen = Class.extend({
    radius:15,
    x:180,
    y:220,
    width:300,
    height:30,
    max: 300,
    actualW:0,
    setValue:function(value){
        if(this.actualW<this.max){
            this.actualW=value;
        }
    },
    draw: function(canvas){
        //TODO Img? bg?
        this.bgRect(canvas);
        this.roundRect(canvas);
        this.roundRect(canvas);
        this.progressRect(canvas);
        this.text(canvas);
    },
    bgRect:function(canvas){
         // first grey layer
        canvas.bufferContext.fillStyle = 'rgba(189,189,189,1)';
    },
    roundRect: function(canvas){
        canvas.bufferContext.beginPath();
        canvas.bufferContext.moveTo(this.x + this.radius, this.y);
        canvas.bufferContext.lineTo(this.x + this.width - this.radius, this.y);
        canvas.bufferContext.arc(this.x+this.width-this.radius, this.y+this.radius, this.radius, -Math.PI/2, Math.PI/2, false);
        canvas.bufferContext.lineTo(this.x + this.radius, this.y + this.height);
        canvas.bufferContext.arc(this.x+this.radius, this.y+this.radius, this.radius, Math.PI/2, 3*Math.PI/2, false);
        canvas.bufferContext.closePath();
        canvas.bufferContext.fill();
    },
    text: function(canvas){
        canvas.bufferContext.fillStyle = 'white';
        var text = Math.floor(this.actualW/this.max*100)+"%";
        var text_width = canvas.bufferContext.measureText(text).width;
        var text_x = this.x+this.actualW-text_width-this.radius/2;
        if (this.actualW<=this.radius+text_width) {
            text_x = this.x+this.radius/2;
        }
        canvas.bufferContext.fillText(text, text_x, this.y+22);
    },
    progressRect: function (canvas) {
        // Gradient of the progress
        var progress_lingrad = canvas.bufferContext.createLinearGradient(0,this.y+this.height,0,0);
        progress_lingrad.addColorStop(0, '#4DA4F3');
        progress_lingrad.addColorStop(0.4, '#ADD9FF');
        progress_lingrad.addColorStop(1, '#9ED1FF');
        canvas.bufferContext.fillStyle = progress_lingrad;
        // deplacement for chord drawing
        var offset = 0;
        canvas.bufferContext.beginPath();
        if (this.actualW<this.radius) {
            offset = this.radius - Math.sqrt(Math.pow(this.radius,2)-Math.pow((this.radius-this.actualW),2));
            // Left angle
            var left_angle = Math.acos((this.radius - this.actualW) / this.radius);
            canvas.bufferContext.moveTo(this.x + this.actualW, this.y+offset);
            canvas.bufferContext.lineTo(this.x + this.actualW, this.y+this.height-offset);
            canvas.bufferContext.arc(this.x + this.radius, this.y + this.radius, this.radius, Math.PI - left_angle, Math.PI + left_angle, false);
        }
        else if (this.actualW+this.radius>this.max) {
            offset = this.radius - Math.sqrt(Math.pow(this.radius,2)-Math.pow((this.radius - (this.max-this.actualW)),2));
            // Right angle
            var right_angle = Math.acos((this.radius - (this.max-this.actualW)) / this.radius);
            canvas.bufferContext.moveTo(this.x + this.radius, this.y);
            canvas.bufferContext.lineTo(this.x + this.actualW, this.y);
            canvas.bufferContext.arc(this.x+this.max-this.radius, this.y + this.radius, this.radius, -Math.PI/2, -right_angle, false);
            canvas.bufferContext.lineTo(this.x + this.actualW, this.y+this.height-offset);
            canvas.bufferContext.arc(this.x+this.max-this.radius, this.y + this.radius, this.radius, right_angle, Math.PI/2, false);
            canvas.bufferContext.lineTo(this.x + this.radius, this.y + this.height);
            canvas.bufferContext.arc(this.x+this.radius, this.y+this.radius, this.radius, Math.PI/2, 3*Math.PI/2, false);
        }
        else {
            canvas.bufferContext.moveTo(this.x + this.radius, this.y);
            canvas.bufferContext.lineTo(this.x + this.actualW, this.y);
            canvas.bufferContext.lineTo(this.x + this.actualW, this.y + this.height);
            canvas.bufferContext.lineTo(this.x + this.radius, this.y + this.height);
            canvas.bufferContext.arc(this.x+this.radius, this.y+this.radius, this.radius, Math.PI/2, 3*Math.PI/2, false);
        }
        canvas.bufferContext.closePath();
        canvas.bufferContext.fill();

    }
   
});

