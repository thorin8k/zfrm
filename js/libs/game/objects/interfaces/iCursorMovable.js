/**
 * @Author Thorin8k
 * Clase rectangulo, pinta un rectangulo en las coordenadas indicadas.
 * 
 * Este rectangulo puede moverse por la pantalla con las flechas.
 * 
 */
var ICursorMovable = IObject.extend({
    movable: null,
    z: 0,
    update : function (canvas) {
        this.move(false);
    },
    keydown : function (event) {
        if (event.keyCode === 39) {
            this.movement.setMovement('right', this.speed);
        }
        if (event.keyCode === 37) {
            this.movement.setMovement('left', this.speed);
        }
        if (event.keyCode === 38) {
            this.movement.setMovement('up', this.speed);
        }
        if (event.keyCode === 40) {
            this.movement.setMovement('down', this.speed);
        }
    },
    keyup : function (event) {
        if (event.keyCode === 39) {
            this.movement.unSetMovement('right');
        }
        if (event.keyCode === 37) {
            this.movement.unSetMovement('left');
        }
        if (event.keyCode === 38) {
            this.movement.unSetMovement('up');
        }
        if (event.keyCode === 40) {
            this.movement.unSetMovement('down');
        }
    }

});

