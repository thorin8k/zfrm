/**
 * @Author Thorin8k
 * Clase rectangulo, pinta un rectangulo en las coordenadas indicadas.
 * 
 * Este rectangulo puede moverse por la pantalla con las flechas.
 * 
 */
var Rectangle = CursorMovable.extend({
    color: 'red',
    start: function(moduleTools){
        var handler = moduleTools.game.getModule('CollisionManager');
        if(handler !== null){
            handler.add(this,'handleCollision');
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
    handleCollision: function(res){
        var noCollision = true;
        for(var i = 0;i < res.length; i+=1){
            if (res[i].x != 0 || res[i].y != 0) {
                noCollision = false;
                if (res[i].x != 0) {// x axis
                    if (res[i].x<0) this.collision.setCollision('left');
                    if (res[i].x>0) this.collision.setCollision('right');
                }
                if (res[i].y != 0) {// y axis
                    if (res[i].y<0) this.collision.setCollision('top');
                    if (res[i].y>0) this.collision.setCollision('bottom');
                }
            }
        }
        if(noCollision){
            //release all collisions if the object has no collision
            this.collision.releaseCollisions();
        }
    }

});

