var Box = Rectangle.extend({
    image: null,
    collisionCorrectionX: -5,
    collisionCorrectionY: -10,
    start: function(moduleTools){
        this._super(moduleTools);
        var self = this;
        this.collisionBox = new CollisionBox(this.__id,this.x,this.y,42,32,moduleTools,this);
        this.collisionBox.handleCollision = function(res){
            //asignar una llamada a handle collision que redireccione a la de este objeto
            self.handleCollision(res);
        };
        
        this.image = new ImageObj(this.tools.imageList['tileb']);
        this.image.nSourceX = 32*9;
        this.image.nSourceY = 0;
        this.image.width= 32;
        this.image.height= 32;
        this.image.x = this.x;
        this.image.y = this.y;
        
    },
    update: function(){
        this._super();
        if(this.isMoving()){
            this.move(false);
        }
        this.image.x = this.x;
        this.image.y = this.y;
        //correción de la posición del collisionbox
        if(this.collisionBox !== null){
            this.collisionBox.x = this.x + this.collisionCorrectionX;
            this.collisionBox.y = this.y + this.collisionCorrectionY;
        }
    },
    draw: function(canvas){
        this.image.draw(canvas);
        
        this.collisionBox.draw(canvas);
    },
    handleCollision: function(res){
        var noCollision = true;
        for(var i = 0;i < res.length; i+=1){
            if(res[i] !== null){
                noCollision = false;
                if(res[i].parent && res[i].parent instanceof FirstPlayer){
                    var side = this.tools.collisionUtils.getCollisionSide(this.collisionBox,res[i],true);
                    switch(side){
                        case 'right':
                        case 'left':
                            this.movement.setMovement(side, res[i].parent.speed);
                            break;
                        case 'top':
                            this.movement.setMovement('up', res[i].parent.speed);
                            break;
                        case 'bottom':
                            this.movement.setMovement('down', res[i].parent.speed);
                            break;
                    }
                    
                }else{
                    var side = this.tools.collisionUtils.getCollisionSide(this.collisionBox,res[i],false);
                    this.collision.setCollision(side);
                    
                }
            }
        }
        if(noCollision){
            //release all collisions if the object has no collision
            this.collision.releaseCollisions();
            this.movement.stop();
        }
    },
    
    toString:function(){
        var test = this._super();
        var result = "";
        result += test;
        result += "color:"+this.color+'</br>';
        result += "collisionType:"+this.collisionType+'</br>';
        result += "collisionX:"+this.collisionBox.x+'</br>';
        result += "collisionY:"+this.collisionBox.y+'</br>';
        return  result;
    },
    changeViewPort: function(pos){
        this.x += pos.x;
        this.y += pos.y;
        this.image.x = this.x;
        this.image.y = this.y;
        //correción de la posición del collisionbox
        if(this.collisionBox !== null){
            this.collisionBox.x = this.x + this.collisionCorrectionX;
            this.collisionBox.y = this.y + this.collisionCorrectionY;
        }
    }
})

