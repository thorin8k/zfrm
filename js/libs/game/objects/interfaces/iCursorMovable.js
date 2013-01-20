/**
 * @Author Thorin8k
 * Clase rectangulo, pinta un rectangulo en las coordenadas indicadas.
 * 
 * Este rectangulo puede moverse por la pantalla con las flechas.
 * 
 */
var ICursorMovable = IObject.extend({
    bMoveRight: false,
    bMoveLeft: false,
    bMoveUp: false,
    bMoveDown: false,
    update : function (canvas) {
 
        if (this.bMoveRight === true) {
            //Move right
            this.x += this.speed;
        }
        if (this.bMoveLeft === true) {
            //Move left
            this.x -= this.speed;
        }
        if (this.bMoveUp === true) {
            //Move Up
            this.y -= this.speed;
        }
        if (this.bMoveDown === true) {
            //Move Down
            this.y += this.speed;
        }
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

