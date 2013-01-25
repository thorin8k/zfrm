/**
 * @Author Thorin8k
 * Clase rectangulo, pinta un rectangulo en las coordenadas indicadas.
 * 
 * Este rectangulo puede moverse por la pantalla con las flechas.
 * 
 */
var IClickable = IObject.extend({
    update:function(){
        if(this.isMoving()){
            this.move(true);
            
        }
    },
    click: function(evt){
        this.destx = evt.clientX;
        this.destx -= (this.width / 2);
        this.desty = evt.clientY;
        this.desty -= (this.height / 2);
        
        if(this.x < this.destx){
            //Move Right
            this.movement.setMovement('right', this.speed);
        }
        if(this.x > this.destx){
            //Move left
            this.movement.setMovement('left', this.speed);
        }
        if(this.y > this.desty){
            //Move up
            this.movement.setMovement('up', this.speed);
        }
        if(this.y < this.desty){
            //Move down
            this.movement.setMovement('down', this.speed);
        }
    }

});



