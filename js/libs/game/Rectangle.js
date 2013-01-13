/**
 * @Author Iago.s
 * Clase rectangulo, pinta un rectangulo en las coordenadas indicadas.
 * 
 * Este rectangulo puede moverse por la pantalla con las flechas.
 * 
 */
var Rectangle = Class.extend({
    color: 'blue',
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
    },
    keydown : function (nKeyCode) {
        if (nKeyCode === 39) {
            this.bMoveRight = true;
        }
        if (nKeyCode === 37) {
            this.bMoveLeft = true;
        }
        if (nKeyCode === 38) {
            this.bMoveUp = true;
        }
        if (nKeyCode === 40) {
            this.bMoveDown = true;
        }
    },
    keyup : function (nKeyCode) {
        if (nKeyCode === 39) {
            this.bMoveRight = false;
        }
        if (nKeyCode === 37) {
            this.bMoveLeft = false;
        }
        if (nKeyCode === 38) {
            this.bMoveUp = false;
        }
        if (nKeyCode === 40) {
            this.bMoveDown = false;
        }
    }

});

