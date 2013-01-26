var Circle = Object.extend({

    colisionType: 'Circle',
    radius : 0,
    start: function(moduleTools){
        var handler = moduleTools.game.getModule('CollisionManager');
        if(handler !== null){
            handler.add(this,'handleCollision');
        }
        this.movement.setMovement('right', this.speed);  
        this.movement.setMovement('up', this.speed);  
    },
    update : function (canvas) {
        if(this.isMoving()){
            this.move(false);
            
        }
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
        
        for(var i = 0;i < res.length; i+=1){
            if(res[i] !== null){
                var side = this.tools.collisionUtils.getCollisionSide(this,res[i],false);
                if(side != null){
                    if(side === 'right'){
                        this.movement.unSetMovement('left');
                        this.movement.setMovement(side,this.speed);
                    }
                    if(side === 'left'){
                        this.movement.unSetMovement('right');
                        this.movement.setMovement(side,this.speed);
                    }
                    if(side === 'top'){
                        this.movement.unSetMovement('down');
                        this.movement.setMovement('up',this.speed);
                    }
                    if(side === 'bottom'){
                        this.movement.unSetMovement('up');
                        this.movement.setMovement('down',this.speed);
                    }

                }
            }
        }
    }
    


})