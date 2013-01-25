var Circle = Object.extend({

    
    radius : 0,
    start: function(moduleTools){
        var handler = moduleTools.game.getModule('CollisionManager');
        if(handler !== null){
            handler.add(this,'handleCollision');
        }
//      this.movement.setMovement('right', this.speed);  
    },
    draw: function(canvas){
      canvas.bufferContext.beginPath();
      canvas.bufferContext.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
      canvas.bufferContext.fillStyle = this.color;
      canvas.bufferContext.fill();
      canvas.bufferContext.lineWidth = 2;
      canvas.bufferContext.strokeStyle = '#003300';
      canvas.bufferContext.stroke();
    },
    handleCollision: function(res){
        var noCollision = true;
        for(var i = 0;i < res.length; i+=1){
            if (res[i].x != 0 || res[i].y != 0) {
                noCollision = false;
                if (res[i].x != 0) {// x axis
                    if (res[i].x>0) this.collision.setCollision('left');
                    if (res[i].x<0) this.collision.setCollision('right');
                }
                if (res[i].y != 0) {// y axis
                    if (res[i].y>0) this.collision.setCollision('top');
                    if (res[i].y<0) this.collision.setCollision('bottom');
                }
            }
        }
        if(noCollision){
            //release all collisions if the object has no collision
            this.collision.releaseCollisions();
        }
    }
    


})