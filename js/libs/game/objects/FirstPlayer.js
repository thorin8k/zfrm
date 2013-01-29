/**
 * @Author Thorin8k
 * Clase rectangulo, pinta un rectangulo en las coordenadas indicadas.
 * 
 * Este rectangulo puede moverse por la pantalla con las flechas.
 * 
 */
var FirstPlayer = CursorMovable.extend({
    color: 'red',
    collisionType: 'Rectangle',
    start: function(moduleTools){
        moduleTools.messageContainer.speak({
            message : "#collisionSubs#",
            obj : this,
            callback: 'handleCollision'
        });
    },
    update: function(canvas){
        if(this.movement.left !== 0){
            canvas.bufferContext.translate (-this.speed, 0);
        }
        if(this.movement.right !== 0){
            canvas.bufferContext.translate (+this.speed, 0);
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
            if(res[i] !== null){
                noCollision = false;
                this.color = 'red';
                var side = this.tools.collisionUtils.getCollisionSide(this,res[i]);
                this.collision.setCollision(side);
            }
        }
        if(noCollision){
            //release all collisions if the object has no collision
            this.color = "yellow";
            this.collision.releaseCollisions();
        }
    }

});
