/* 
 * TODO: Crear enemigos, inteligencia... autoataques si te acercas... 
 */
var Enemy = Object.extend({
    color: 'red',
    collisionType: 'Rectangle',
    sprite:null,
    animation: null,
    timer: null,
    image: null,
    speed:1,
    persistent:true,
    collisionBox:null,
    collisionCorrectionX: 23,
    collisionCorrectionY: 30,
    light: null,
    start: function(moduleTools){
        this._super(moduleTools);
        
        var self= this;
        
        //Crear una collisionbox 
        this.collisionBox = new CollisionBox(this.__id,this.x,this.y,18,30,moduleTools,this);
        this.collisionBox.handleCollision = function(res){
            //asignar una llamada a handle collision que redireccione a la de este objeto
            self.handleCollision(res);
        };
        
        this.light = new Light(this.__id,(this.x+this.width/2),(this.y+this.height/2),60,80,this.tools,true);
        
        //Crear el mapa de sprites
        this.sprite = new SpriteSheet({
            width: this.width,
            height: this.height,
            sprites: [
                { name: 'stand' , x: 0, y: 4},
                { name: 'walk_left_1', x: 0, y: 2 },
                { name: 'walk_left_2', x: 1, y: 2 },
                { name: 'walk_left_3', x: 2, y: 2 },
                { name: 'walk_left_4', x: 3, y: 2 },
                { name: 'walk_left_5', x: 4, y: 2 },
                { name: 'walk_left_6', x: 5, y: 2 },
                { name: 'walk_left_7', x: 6, y: 2 },
                { name: 'walk_right_1', x: 0, y: 1 },
                { name: 'walk_right_2', x: 1, y: 1 },
                { name: 'walk_right_3', x: 2, y: 1 },
                { name: 'walk_right_4', x: 3, y: 1 },
                { name: 'walk_right_5', x: 4, y: 1 },
                { name: 'walk_right_6', x: 5, y: 1 },
                { name: 'walk_right_7', x: 6, y: 1 },
                { name: 'walk_up_1', x: 0, y: 3 },
                { name: 'walk_up_2', x: 1, y: 3 },
                { name: 'walk_up_3', x: 2, y: 3 },
                { name: 'walk_up_4', x: 3, y: 3 },
                { name: 'walk_up_5', x: 4, y: 3 },
                { name: 'walk_up_6', x: 5, y: 3 },
                { name: 'walk_up_7', x: 6, y: 3 },
                { name: 'walk_down_1', x: 0, y: 0 },
                { name: 'walk_down_2', x: 1, y: 0 },
                { name: 'walk_down_3', x: 2, y: 0 },
                { name: 'walk_down_4', x: 3, y: 0 },
                { name: 'walk_down_5', x: 4, y: 0 },
                { name: 'walk_down_6', x: 5, y: 0 },
                { name: 'walk_down_7', x: 6, y: 0 }
                
            ]
        });
        
        this.animation = new Animation([
                { sprite: 'stand', time: 0.1 }
            ],this.sprite);
        this.timer = new FrameTimer();
        this.timer.tick();
        this.image = this.tools.imageList["zombie.png"];
        
        this.movement.setMovement('up', this.speed);
        
        
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
    searchForEnemy:function(){
        if(this.tools === null) return;
        this.movement.stop();
        this.destx = this.tools.game.getLayer('objects').getObject('fp').x;
        this.desty = this.tools.game.getLayer('objects').getObject('fp').y;
        
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
    },
    update: function(canvas){
        if(!this.canMove)return;
        
        this.searchForEnemy();
        if(this.isMoving()){
            this.move(false);
            this.light.updatePos((this.x+this.width/2),(this.y+this.height/2));
        }
        
        if (this.movement.left !== 0 && !this.collision.left) {
            this.setMovementAnimation('left');
        }
        if (this.movement.right !== 0 && !this.collision.right) {
            this.setMovementAnimation('right');
        }
        if (this.movement.up !== 0 && !this.collision.top) {
            this.setMovementAnimation('up');
        }
        if (this.movement.down !== 0 && !this.collision.bottom) {
            this.setMovementAnimation('down');
        }
        if(this.collisionBox !== null){
            this.collisionBox.x = this.x + this.collisionCorrectionX;
            this.collisionBox.y = this.y + this.collisionCorrectionY;
        }
    },
    draw : function (canvas) {
        if(this.timer === null){
            return;
        }
        this.animation.animate(this.timer.getSeconds());
        var frame = this.animation.getSprite();
        canvas.bufferContext.drawImage(this.image, frame.x, frame.y, 60, 60, this.x, this.y, 60, 60);
        this.timer.tick();
        
        this.collisionBox.draw(canvas);
        
//        canvas.bufferContext.beginPath();
//        canvas.bufferContext.rect(this.x, this.y, this.width, this.height);
//        canvas.bufferContext.closePath();
//        canvas.bufferContext.lineWidth = 2;
//        canvas.bufferContext.strokeStyle = 'black';
//        canvas.bufferContext.stroke();
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
    setMovementAnimation: function(direction){
        if(this.animation === null){
            return;
        }
        this.animation._frames = [
            { sprite: 'walk_'+direction+'_1', time: 0.1 },
            { sprite: 'walk_'+direction+'_2', time: 0.1 },
            { sprite: 'walk_'+direction+'_3', time: 0.1 },
            { sprite: 'walk_'+direction+'_4', time: 0.1 },
            { sprite: 'walk_'+direction+'_5', time: 0.1 },
            { sprite: 'walk_'+direction+'_6', time: 0.1 },
            { sprite: 'walk_'+direction+'_7', time: 0.1 }
        ];
    },
    releaseMovementAnimation: function(direction){
        if(this.animation === null){
            return;
        }
        this.animation._frames = [
            { sprite: 'walk_'+direction+'_1', time: 0.1 }
        ]; 
    },
    setStandAnimation: function(){
        if(this.animation === null){
            return;
        }
        this.animation._frameIndex = 0;
        this.animation._frames = [
            { sprite: 'stand', time: 0.1 }
        ];
    }
});

