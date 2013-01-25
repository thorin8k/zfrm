/**
 * @Author Thorin8k
 * Clase rectangulo, pinta un rectangulo en las coordenadas indicadas.
 * 
 * Este rectangulo puede moverse por la pantalla con las flechas.
 * 
 */
var IObject= Class.extend({
    x:0,
    y:0,
    width:0,
    height:0,
    destx: 0,
    desty: 0,   
    movement: null,
    collision: null,    
    speed: 5,
    weight:0,
    z: 0,

    init:function(){
        this.movement = new Movement();
        this.collision = new Collision();
        
    },
    update:function(){},
    draw : function (canvas) {},
    move:function(checkDestination){
        if (this.movement.right !== 0 && !this.collision.left) {
            //Move right
            this.x += this.movement.right;
            if(checkDestination && this.x >= this.destx){
                this.destx = 0;
                this.movement.unSetMovement('right');                
            }
        }
        if (this.movement.left !== 0 && !this.collision.right) {
            //Move left
            this.x -= this.movement.left;
            if(checkDestination && this.x <= this.destx){
                this.destx = 0;
                this.movement.unSetMovement('left');
            }
        }
        if (this.movement.up !== 0 && !this.collision.bottom) {
            //Move Up
            this.y -= this.movement.up;
            if(checkDestination && this.y <= this.desty){
                this.desty = 0;
                this.movement.unSetMovement('up');
            }
        }
        if (this.movement.down !== 0 && !this.collision.top) {
            //Move Down
            this.y += this.movement.down;
            if(checkDestination && this.y >= this.desty){
                this.desty = 0;
                this.movement.unSetMovement('down');
            }
        }
    },
    isMoving: function(){
        var mov = this.movement;
        if(mov.left !== 0 || mov.right !== 0 || mov.up !== 0 || mov.down !== 0){
            return true;
        }
        return false;
    },
    hasCollisions:function(){
        var col = this.collision;
        return col.right || col.left || col.top|| col.bottom;
    }
});



