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
    collisionBox:null,
    persistent:true,
    sword: false,
    speed: 3,
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
        
        //Crear el mapa de sprites
        this.sprite = new SpriteSheet({
            width: 64,
            height: 64,
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
        
        var equippedSword = this.getEquipedSword();
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
        
        //añadir el objeto al módulo de luces...
        this.tools.messageContainer.speak({
            message : "#lightSubs#",
            obj : this,
            centerOnScreen: false,
            size: 100,
            intensity:30
        });
    },
    update: function(canvas){
        var equippedSword = this.getEquipedSword();
        if(this.gravity!==0){
            if(!this.collision.bottom){
                this.y+=this.gravity;
            }
        }
        if (this.movement.left !== 0 && !this.collision.left) {
            this.animation._frames = [
                 { sprite: 'walk'+equippedSword+'_left_1', time: 0.1 },
                 { sprite: 'walk'+equippedSword+'_left_2', time: 0.1 },
                 { sprite: 'walk'+equippedSword+'_left_3', time: 0.1 },
                 { sprite: 'walk'+equippedSword+'_left_4', time: 0.1 },
                 { sprite: 'walk'+equippedSword+'_left_5', time: 0.1 },
                 { sprite: 'walk'+equippedSword+'_left_6', time: 0.1 },
                 { sprite: 'walk'+equippedSword+'_left_7', time: 0.1 }
            ];
            this.tools.game.changeViewPort(+this.speed,0);
        }
        if (this.movement.right !== 0 && !this.collision.right) {
            this.animation._frames = [
                 { sprite: 'walk'+equippedSword+'_right_1', time: 0.1 },
                 { sprite: 'walk'+equippedSword+'_right_2', time: 0.1 },
                 { sprite: 'walk'+equippedSword+'_right_3', time: 0.1 },
                 { sprite: 'walk'+equippedSword+'_right_4', time: 0.1 },
                 { sprite: 'walk'+equippedSword+'_right_5', time: 0.1 },
                 { sprite: 'walk'+equippedSword+'_right_6', time: 0.1 },
                 { sprite: 'walk'+equippedSword+'_right_7', time: 0.1 },
            ];
            this.tools.game.changeViewPort(-this.speed,0);
        }
        if (this.gravity===0 && this.movement.up !== 0 && !this.collision.top) {
            this.animation._frames = [
                 { sprite: 'walk'+equippedSword+'_up_1', time: 0.1 },
                 { sprite: 'walk'+equippedSword+'_up_2', time: 0.1 },
                 { sprite: 'walk'+equippedSword+'_up_3', time: 0.1 },
                 { sprite: 'walk'+equippedSword+'_up_4', time: 0.1 },
                 { sprite: 'walk'+equippedSword+'_up_5', time: 0.1 },
                 { sprite: 'walk'+equippedSword+'_up_6', time: 0.1 },
                 { sprite: 'walk'+equippedSword+'_up_7', time: 0.1 },
            ];
            this.tools.game.changeViewPort(0,+this.speed);
        }
        if (this.movement.down !== 0 && !this.collision.bottom) {
            
            this.animation._frames = [
                 { sprite: 'walk'+equippedSword+'_down_1', time: 0.1 },
                 { sprite: 'walk'+equippedSword+'_down_2', time: 0.1 },
                 { sprite: 'walk'+equippedSword+'_down_3', time: 0.1 },
                 { sprite: 'walk'+equippedSword+'_down_4', time: 0.1 },
                 { sprite: 'walk'+equippedSword+'_down_5', time: 0.1 },
                 { sprite: 'walk'+equippedSword+'_down_6', time: 0.1 },
                 { sprite: 'walk'+equippedSword+'_down_7', time: 0.1 },
            ];
            this.tools.game.changeViewPort(0,-this.speed);
        }
        
//      correción de la posición del collisionbox
        this.collisionBox.x = this.x+23;
        this.collisionBox.y = this.y+30;
    },
    draw : function (canvas) {
        
            this.animation.animate(this.timer.getSeconds());
            var frame = this.animation.getSprite();
            canvas.bufferContext.drawImage(this.image, frame.x, frame.y, this.width, this.height, this.x, this.y, this.width, this.height);
            this.timer.tick();

            this.collisionBox.draw(canvas);
        
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
    toString:function(){
        var test = this._super();
        var result = "";
        result += test;
        result += "color:"+this.color+'</br>';
        result += "collisionType:"+this.collisionType+'</br>';
        return  result;
    },
    keydown : function (event) {
        if (event.keyCode === 39) {
            
            this.movement.setMovement('right', this.speed);
        }
        if (event.keyCode === 37) {
            
            this.movement.setMovement('left', this.speed);
        }
        if (event.keyCode === 38) {
            
            this.movement.setMovement('up', this.speed);
        }
        if (event.keyCode === 40) {
            this.movement.setMovement('down', this.speed);
        }
        if (event.keyCode === 32) {
            console.log("ay")
        }
    },
    keyup : function (event) {
        var equippedSword = this.getEquipedSword();
        this.animation._frameIndex = 0;
        if (event.keyCode === 39) {
            this.movement.unSetMovement('right');
            this.animation._frames = [
            { sprite: 'walk'+equippedSword+'_right_1', time: 0.1 }
        ];
        }
        if (event.keyCode === 37) {
            this.movement.unSetMovement('left');
            this.animation._frames = [
            { sprite: 'walk'+equippedSword+'_left_1', time: 0.1 }
        ];
        }
        if (event.keyCode === 38) {
            this.movement.unSetMovement('up');
            this.animation._frames = [
            { sprite: 'walk'+equippedSword+'_up_1', time: 0.1 }
        ];
        }
        if (event.keyCode === 40) {
            this.movement.unSetMovement('down');
            this.animation._frames = [
            { sprite: 'walk'+equippedSword+'_down_1', time: 0.1 }
        ];
        }
    },
    kill:function(test){
        this.tools.game.getLayer('objects').removeObject('fp');
    },
    getEquipedSword: function(){
        var equippedSword = "";
        if(this.sword){
            equippedSword = "_sword";
        }
        return equippedSword;
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

