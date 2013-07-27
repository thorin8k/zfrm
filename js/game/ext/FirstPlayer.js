/**
 * @Author Thorin8k
 * Clase rectangulo, pinta un rectangulo en las coordenadas indicadas.
 * 
 * Este rectangulo puede moverse por la pantalla con las flechas.
 * 
 */
var FirstPlayer = Object.extend({
    color: 'red',
    collisionType: 'Rectangle',
    sprite:null,
    animation: null,
    image: null,
    light: null,
    persistent:true,
    weapon: false,
    speed: 3,
    collisionBox:null,
    collisionCorrectionX: 23,
    collisionCorrectionY: 30,
    start: function(moduleTools){
        this._super(moduleTools);
        var self= this;
        //Crear una collisionbox 
        this.collisionBox = new CollisionBox(this.__id,this.x,this.y,18,30,moduleTools,this);
        this.collisionBox.handleCollision = function(res){
            //asignar una llamada a handle collision que redireccione a la de este objeto
            self.handleCollision(res);
        };
        
        //Crear el mapa de sprites
        this.sprite = new SpriteSheet({
            width: this.width,
            height: this.height,
            sprites: [
                { name: 'stand', x: 7, y: 0},
                { name: 'walk_left_1', x: 0, y: 2 },
                { name: 'walk_left_2', x: 1, y: 2 },
                { name: 'walk_left_3', x: 2, y: 2 },
                { name: 'walk_left_4', x: 3, y: 2 },
                { name: 'walk_left_5', x: 4, y: 2 },
                { name: 'walk_left_6', x: 5, y: 2 },
                { name: 'walk_left_7', x: 6, y: 2 },
                { name: 'walk_right_1', x: 0, y: 6 },
                { name: 'walk_right_2', x: 1, y: 6 },
                { name: 'walk_right_3', x: 2, y: 6 },
                { name: 'walk_right_4', x: 3, y: 6 },
                { name: 'walk_right_5', x: 4, y: 6 },
                { name: 'walk_right_6', x: 5, y: 6 },
                { name: 'walk_right_7', x: 6, y: 6 },
                { name: 'walk_up_1', x: 0, y: 4 },
                { name: 'walk_up_2', x: 1, y: 4 },
                { name: 'walk_up_3', x: 2, y: 4 },
                { name: 'walk_up_4', x: 3, y: 4 },
                { name: 'walk_up_5', x: 4, y: 4 },
                { name: 'walk_up_6', x: 5, y: 4 },
                { name: 'walk_up_7', x: 6, y: 4 },
                { name: 'walk_down_1', x: 0, y: 0 },
                { name: 'walk_down_2', x: 1, y: 0 },
                { name: 'walk_down_3', x: 2, y: 0 },
                { name: 'walk_down_4', x: 3, y: 0 },
                { name: 'walk_down_5', x: 4, y: 0 },
                { name: 'walk_down_6', x: 5, y: 0 },
                { name: 'walk_down_7', x: 6, y: 0 },
            ]
        });
        
        
        this.animation = new Animation([
                { sprite: 'stand', time: 0.1 }
            ],this.sprite);
        this.timer = new FrameTimer();
        this.timer.tick();
        this.image = this.tools.imageList["link.png"];
        
    },
    centerOnScreen:function(){
        this.tools.game.changeViewPort(-(this.x-300),-(this.y-240));
        this.x = 300;
        this.y = 240;
        
        this.light = new Light(this.__id,(this.x+this.width/2),(this.y+this.height/2),100,95,this.tools,false);
    },
    update: function(canvas){
        var equipedWeapon = this.getEquipedSword();
        if(this.gravity!==0){
            if(!this.collision.bottom){
                this.y+=this.gravity;
            }
        }
        if (this.movement.left !== 0 && !this.collision.left) {
            this.animation._frames = [
                 { sprite: 'walk'+equipedWeapon+'_left_1', time: 0.1 },
                 { sprite: 'walk'+equipedWeapon+'_left_2', time: 0.1 },
                 { sprite: 'walk'+equipedWeapon+'_left_3', time: 0.1 },
                 { sprite: 'walk'+equipedWeapon+'_left_4', time: 0.1 },
                 { sprite: 'walk'+equipedWeapon+'_left_5', time: 0.1 },
                 { sprite: 'walk'+equipedWeapon+'_left_6', time: 0.1 },
                 { sprite: 'walk'+equipedWeapon+'_left_7', time: 0.1 }
            ];
            this.tools.game.changeViewPort(+this.speed,0);
        }
        if (this.movement.right !== 0 && !this.collision.right) {
            this.animation._frames = [
                 { sprite: 'walk'+equipedWeapon+'_right_1', time: 0.1 },
                 { sprite: 'walk'+equipedWeapon+'_right_2', time: 0.1 },
                 { sprite: 'walk'+equipedWeapon+'_right_3', time: 0.1 },
                 { sprite: 'walk'+equipedWeapon+'_right_4', time: 0.1 },
                 { sprite: 'walk'+equipedWeapon+'_right_5', time: 0.1 },
                 { sprite: 'walk'+equipedWeapon+'_right_6', time: 0.1 },
                 { sprite: 'walk'+equipedWeapon+'_right_7', time: 0.1 },
            ];
            this.tools.game.changeViewPort(-this.speed,0);
        }
        if (this.gravity===0 && this.movement.up !== 0 && !this.collision.top) {
            this.animation._frames = [
                 { sprite: 'walk'+equipedWeapon+'_up_1', time: 0.1 },
                 { sprite: 'walk'+equipedWeapon+'_up_2', time: 0.1 },
                 { sprite: 'walk'+equipedWeapon+'_up_3', time: 0.1 },
                 { sprite: 'walk'+equipedWeapon+'_up_4', time: 0.1 },
                 { sprite: 'walk'+equipedWeapon+'_up_5', time: 0.1 },
                 { sprite: 'walk'+equipedWeapon+'_up_6', time: 0.1 },
                 { sprite: 'walk'+equipedWeapon+'_up_7', time: 0.1 },
            ];
            this.tools.game.changeViewPort(0,+this.speed);
        }
        if (this.movement.down !== 0 && !this.collision.bottom) {
            
            this.animation._frames = [
                 { sprite: 'walk'+equipedWeapon+'_down_1', time: 0.1 },
                 { sprite: 'walk'+equipedWeapon+'_down_2', time: 0.1 },
                 { sprite: 'walk'+equipedWeapon+'_down_3', time: 0.1 },
                 { sprite: 'walk'+equipedWeapon+'_down_4', time: 0.1 },
                 { sprite: 'walk'+equipedWeapon+'_down_5', time: 0.1 },
                 { sprite: 'walk'+equipedWeapon+'_down_6', time: 0.1 },
                 { sprite: 'walk'+equipedWeapon+'_down_7', time: 0.1 },
            ];
            this.tools.game.changeViewPort(0,-this.speed);
        }
        
//      correción de la posición del collisionbox
        this.collisionBox.x = this.x + this.collisionCorrectionX;
        this.collisionBox.y = this.y + this.collisionCorrectionY;
    },
    draw : function (canvas) {
        
        this.animation.animate(this.timer.getSeconds());
        var frame = this.animation.getSprite();
        canvas.bufferContext.drawImage(this.image, frame.x, frame.y, this.width, this.height, this.x, this.y, this.width, this.height);
        this.timer.tick();

        this.collisionBox.draw(canvas);
        
//        canvas.bufferContext.beginPath();
//        canvas.bufferContext.rect(this.x, this.y, this.width, this.height);
//        canvas.bufferContext.closePath();
//        canvas.bufferContext.lineWidth = 2;
//        canvas.bufferContext.strokeStyle = 'black';
//        canvas.bufferContext.stroke();
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
                if(res[i].parent && res[i].parent instanceof Enemy){
                    this.kill();
                }
            }
        }
        if(noCollision){
            //release all collisions if the object has no collision
            this.collision.releaseCollisions();
        }
    },
    keydown : function (event) {
        if (event.keyCode === KEY_RIGHT) {
            this.movement.setMovement('right', this.speed);
        }
        if (event.keyCode === KEY_LEFT) {
            this.movement.setMovement('left', this.speed);
        }
        if (event.keyCode === KEY_UP) {
            this.movement.setMovement('up', this.speed);
        }
        if (event.keyCode === KEY_DOWN) {
            this.movement.setMovement('down', this.speed);
        }
        if (event.keyCode === KEY_ACTION) {
            console.log("ay");
        }
    },
    keyup : function (event) {
        var equipedWeapon = this.getEquipedSword();
        this.animation._frameIndex = 0;
        if (event.keyCode === KEY_RIGHT) {
            this.movement.unSetMovement('right');
            this.animation._frames = [
                { sprite: 'walk'+equipedWeapon+'_right_1', time: 0.1 }
            ];
        }
        if (event.keyCode === KEY_LEFT) {
            this.movement.unSetMovement('left');
            this.animation._frames = [
                { sprite: 'walk'+equipedWeapon+'_left_1', time: 0.1 }
            ];
        }
        if (event.keyCode === KEY_UP) {
            this.movement.unSetMovement('up');
            this.animation._frames = [
                { sprite: 'walk'+equipedWeapon+'_up_1', time: 0.1 }
            ];
        }
        if (event.keyCode === KEY_DOWN) {
            this.movement.unSetMovement('down');
            this.animation._frames = [
                { sprite: 'walk'+equipedWeapon+'_down_1', time: 0.1 }
            ];
        }
    },
    kill:function(test){
        this.movement.stop();
        //this.speed = 0;
        
    },
    getEquipedSword: function(){
        var equipedWeapon = "";
        if(this.weapon){
            equipedWeapon = "_sword";
        }
        return equipedWeapon;
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

