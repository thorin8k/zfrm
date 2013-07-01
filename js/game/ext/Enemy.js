/* 
 * TODO: Crear enemigos, inteligencia... autoataques si te acercas... 
 */
var Enemy = Object.extend({
    color: 'red',
    collisionType: 'Rectangle',
    sprite:null,
    animation: null,
    image: null,
    collisionBox:null,
    speed:2,
    start: function(moduleTools){
        this._super(moduleTools);
        var self= this;
        //Crear una collisionbox 
        this.collisionBox = new CollisionBox();
        this.collisionBox.width = 15;
        this.collisionBox.height = 30;
        this.collisionBox.tools = moduleTools;
        this.collisionBox.__id = this.__id;
        this.collisionBox.handleCollision = function(res){
            //asignar una llamada a handle collision que redireccione a la de este objeto
            self.handleCollision(res);
        };
        
        //añadir la collision box al módulo de collisiones
        this.tools.messageContainer.speak({
            message : "#collisionSubs#",
            obj : this.collisionBox,
            callback: 'handleCollision'
        });
        //añadir el objeto al módulo de luces...
        this.tools.messageContainer.speak({
            message : "#lightSubs#",
            obj : this,
            centerOnScreen: true,
            size: 40
        });
        //Crear el mapa de sprites
        this.sprite = new SpriteSheet({
            width: 60,
            height: 60,
            sprites: [
                { name: 'stand' },
                { name: 'walk_left_1', x: 0, y: 0 },
                { name: 'walk_left_2', x: 1, y: 0 },
                { name: 'walk_left_3', x: 2, y: 0 },
                { name: 'walk_left_4', x: 3, y: 0 },
                { name: 'walk_left_5', x: 4, y: 0 },
                { name: 'walk_right_1', x: 0, y: 1 },
                { name: 'walk_right_2', x: 1, y: 1 },
                { name: 'walk_right_3', x: 2, y: 1 },
                { name: 'walk_right_4', x: 3, y: 1 },
                { name: 'walk_right_5', x: 4, y: 1 },
                { name: 'walk_up_1', x: 0, y: 2 },
                { name: 'walk_up_2', x: 1, y: 2 },
                { name: 'walk_up_3', x: 2, y: 2 },
                { name: 'walk_up_4', x: 3, y: 2 },
                { name: 'walk_up_5', x: 4, y: 2 },
                { name: 'walk_down_1', x: 0, y: 3 },
                { name: 'walk_down_2', x: 1, y: 3 },
                { name: 'walk_down_3', x: 2, y: 3 },
                { name: 'walk_down_4', x: 3, y: 3 },
                { name: 'walk_down_5', x: 4, y: 3 }
                
            ]
        });
        
        this.animation = new Animation([
                { sprite: 'walk_left_1', time: 0.1 }
            ],this.sprite);
        this.timer = new FrameTimer();
        this.timer.tick();
        this.image = this.tools.imageList["zombie.png"];
        
        //this.movement.setMovement('up', this.speed);
        
        
    },
    changeViewPort: function(pos){
        
        this.x+= pos.x;
        this.y+= pos.y;
    },
    handleCollision: function(res){
        
        var noCollision = true;
        for(var i = 0;i < res.length; i+=1){
            if(res[i] !== null){
                noCollision = false;
                if(res[i] instanceof CollisionBox){
                    var side = this.tools.collisionUtils.getCollisionSide(this.collisionBox,res[i],false);
                    this.collision.setCollision(side);
                }
            }
        }
        if(noCollision){
            //release all collisions if the object has no collision
            this.collision.releaseCollisions();
        }
    },
    update: function(canvas){
        if(this.isMoving()){
            this.move(false);            
        }
        
        this.collisionBox.x = this.x+24;
        this.collisionBox.y = this.y+24;
    },
    draw : function (canvas) {
        var frame = this.animation.getSprite();
        canvas.bufferContext.drawImage(this.image, frame.x, frame.y, 60, 60, this.x, this.y, 60, 60);
        this.timer.tick();
        
        this.collisionBox.draw(canvas);
    },
    toString:function(){
        var test = this._super();
        var result = "";
        result += test;
        result += "color:"+this.color+'</br>';
        result += "collisionType:"+this.collisionType+'</br>';
        result += "coll.x:"+this.collisionBox.x+'</br>';
        result += "coll.y:"+this.collisionBox.y+'</br>';
        return  result;
    },
});

