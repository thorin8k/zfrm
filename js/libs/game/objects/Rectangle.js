/**
 * @Author Thorin8k
 * Clase rectangulo, pinta un rectangulo en las coordenadas indicadas.
 * 
 * Este rectangulo puede moverse por la pantalla con las flechas.
 * 
 */
var Rectangle = Class.extend({
    color: 'red',
    x: 15,
    y: 15,
    width: 25,
    height: 25,
    nSpeed: 5,
 
    bMoveRight: false,
    bMoveLeft: false,
    bMoveUp: false,
    bMoveDown: false,
    update : function (canvas) {
 
        if (this.bMoveRight === true) {
            this.x += this.nSpeed;
        }
        if (this.bMoveLeft === true) {
            this.x -= this.nSpeed;
        }
        if (this.bMoveUp === true) {
            this.y -= this.nSpeed;
        }
        if (this.bMoveDown === true) {
            this.y += this.nSpeed;
        }
    },
    draw : function (canvas) {
        canvas.bufferContext.beginPath();
        canvas.bufferContext.rect(this.x, this.y, this.width, this.height);
        canvas.bufferContext.fillStyle = this.color;
        canvas.bufferContext.closePath();
        canvas.bufferContext.fill();
        canvas.bufferContext.lineWidth = 2;
        canvas.bufferContext.strokeStyle = 'black';
        canvas.bufferContext.stroke();
    },
    keydown : function (event) {
        if (event.keyCode === 39) {
            this.bMoveRight = true;
        }
        if (event.keyCode === 37) {
            this.bMoveLeft = true;
        }
        if (event.keyCode === 38) {
            this.bMoveUp = true;
        }
        if (event.keyCode === 40) {
            this.bMoveDown = true;
        }
    },
    keyup : function (event) {
        if (event.keyCode === 39) {
            this.bMoveRight = false;
        }
        if (event.keyCode === 37) {
            this.bMoveLeft = false;
        }
        if (event.keyCode === 38) {
            this.bMoveUp = false;
        }
        if (event.keyCode === 40) {
            this.bMoveDown = false;
        }
    }

});

