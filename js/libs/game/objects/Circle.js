var Circle = Object.extend({

    collisionType: 'Circle',
    radius : 0,
    start: function(moduleTools){
        moduleTools.messageContainer.speak({
            message : "#collisionSubs#",
            obj : this,
            callback: 'handleCollision'
        });
        this.movement.setMovement('right', this.speed);  
        this.movement.setMovement('up', this.speed);  
    },
    update : function (canvas) {
        if(this.reaction.isMoving()){
            this.movement.left = this.reaction.left;
            this.movement.right = this.reaction.right;
            this.movement.up = this.reaction.up;
            this.movement.down = this.reaction.down;
            this.reaction.stop();
        }
        if(this.isMoving()){
            this.move(false);
            
        }
    },
    draw: function(canvas){
      canvas.bufferContext.beginPath();
      canvas.bufferContext.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
      canvas.bufferContext.closePath();
      canvas.bufferContext.fillStyle = this.color;
      canvas.bufferContext.fill();
      canvas.bufferContext.lineWidth = 2;
      canvas.bufferContext.strokeStyle = '#003300';
      canvas.bufferContext.stroke();
    },
    handleCollision: function(res){
        this.color = 'yellow';
        for(var i = 0;i < res.length; i+=1){
            if(res[i] !== null){
                if(res[i].collisionType === 'Circle'){
                    
                    var o1speed = this.movement.getSignedActualSpeed(),
                    o2speed = res[i].movement.getSignedActualSpeed();
                    
                    var newVelX1 = (o1speed.x * (this.weight- res[i].weight) + (2 * res[i].weight * o2speed.x)) / (this.weight + res[i].weight);
                    var newVelY1 = (o1speed.y * (this.weight - res[i].weight) + (2 * res[i].weight * o2speed.y)) / (this.weight + res[i].weight);                    
                    
                    if(newVelX1 > 0){
                        this.reaction.unSetMovement('left');
                        this.reaction.right = Math.abs(newVelX1);
                    }
                    if(newVelX1 < 0){
                        this.reaction.unSetMovement('right');
                        this.reaction.left = Math.abs(newVelX1);
                    }
                    if(newVelY1 < 0){
                        this.reaction.unSetMovement('down');
                        this.reaction.up = Math.abs(newVelY1);
                    }
                    if(newVelY1 > 0){
                        this.reaction.unSetMovement('up');
                        this.reaction.down = Math.abs(newVelY1);
                    }
                    
                    this.color = 'red';
                    
                }
                if(res[i].collisionType === 'Rectangle'){
                    var side = this.tools.collisionUtils.getCollisionSide(this,res[i]);
                    this.color = 'red';
                    
                    if(side === 'right' ){
                        this.x -= this.speed;
                        this.movement.setMovement('left',this.movement.right);
                        this.movement.unSetMovement(side);

                    }
                    if(side === 'left'){
                        this.x += this.speed;
                        this.movement.setMovement('right',this.movement.left);
                        this.movement.unSetMovement(side);

                    }
                    if(side === 'top'){
                        this.y += this.speed;
                        this.movement.setMovement('down',this.movement.up);
                        this.movement.unSetMovement('up');
                    }
                    if(side === 'bottom'){
                        this.y -= this.speed;
                        this.movement.setMovement('up',this.movement.down);
                        this.movement.unSetMovement('down');
                    }

                }
                
            }
        }
    }
    


})