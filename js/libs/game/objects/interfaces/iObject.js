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
    init:function(){
        this.movement = new Movement();
        this.collision = new Collision();
        
    },
    update:function(){},
    draw : function (canvas) {},
    move:function(checkDestination){
        if (this.movement.right !== 0 && !this.collision.right) {
            //Move right
            this.x += this.movement.right;
            if(checkDestination && this.x >= this.destx){
                this.destx = 0;
                this.movement.unSetMovement('right');                
            }
        }
        if (this.movement.left !== 0 && !this.collision.left) {
            //Move left
            this.x -= this.movement.left;
            if(checkDestination && this.x <= this.destx){
                this.destx = 0;
                this.movement.unSetMovement('left');
            }
        }
        if (this.movement.up !== 0 && !this.collision.up) {
            //Move Up
            this.y -= this.movement.up;
            if(checkDestination && this.y <= this.desty){
                this.desty = 0;
                this.movement.unSetMovement('up');
            }
        }
        if (this.movement.down !== 0 && !this.collision.down) {
            //Move Down
            this.y += this.movement.down;
            if(checkDestination && this.y >= this.desty){
                this.desty = 0;
                this.movement.unSetMovement('down');
            }
        }
    }
});



