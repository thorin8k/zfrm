/**
 * @Author Thorin8k
 * Clase rectangulo, pinta un rectangulo en las coordenadas indicadas.
 * 
 * Este rectangulo puede moverse por la pantalla con las flechas.
 * 
 */
var IClickable = IObject.extend({
    destx: 0,
    desty: 0,
    update:function(){
        if(this.moving == true){
            //FIXME
            if(this.x < this.destx){
                //Move Right
                this.x +=this.speed;
            }
            if(this.x > this.destx){
                //Move left
                this.x -=this.speed;
            }
            if(this.y < this.desty){
                //Move Up
                this.y +=this.speed;
            }
            if(this.y > this.desty){
                //Move Down
                this.y -=this.speed;
            }
            if(this.x == this.destx && this.y == this.desty){
                //Stop When destiny
                this.desty = 0;
                this.destx = 0;
                this.moving = false;
            }
        }
    },
    click: function(evt){
        this.destx = evt.clientX;
        this.destx -= (this.width / 2);
        this.desty = evt.clientY;
        this.desty -= (this.height / 2);
        this.moving = true;
    }

});



