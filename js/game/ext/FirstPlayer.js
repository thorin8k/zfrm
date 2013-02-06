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
    start: function(moduleTools){
        this._super(moduleTools);
        var self= this;
        //Crear una collisionbox 
        this.collisionBox = new CollisionBox();
        this.collisionBox.width = 15;
        this.collisionBox.height = 35;
        this.collisionBox.tools = moduleTools;
        this.collisionBox.handleCollision = function(res){
            //asignar una llamada a handle collision que redireccione a la de este objeto
            self.handleCollision(res);
        }
        
        //añadir la collision box al módulo de collisiones
        this.tools.messageContainer.speak({
            message : "#collisionSubs#",
            obj : this.collisionBox,
            callback: 'handleCollision'
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
                { name: 'walk_down_5', x: 4, y: 3 },
                
            ]
        });
        this.animation = new Animation([
                { sprite: 'walk_down_1', time: 0.1 },
            ],this.sprite);
        this.timer = new FrameTimer();
        this.timer.tick();
        this.image = this.tools.imageList["link.png"];
        this.tools.game.changeViewPort(-(this.x-300),-(this.y-240));
        this.x = 300;
        this.y = 240;
        
    },
    update: function(canvas){
//        if(!this.collision.top){
//            this.y+=5
//        }
        //this._super();
        if (this.movement.left !== 0 && !this.collision.left) {
            this.animation._frames = [
                 { sprite: 'walk_left_1', time: 0.1 },
                 { sprite: 'walk_left_2', time: 0.1 },
                 { sprite: 'walk_left_3', time: 0.1 },
                 { sprite: 'walk_left_4', time: 0.1 },
                 { sprite: 'walk_left_5', time: 0.1 },
            ];
            this.tools.game.changeViewPort(+this.speed,0);
        }
        if (this.movement.right !== 0 && !this.collision.right) {
            this.animation._frames = [
                 { sprite: 'walk_right_1', time: 0.1 },
                 { sprite: 'walk_right_2', time: 0.1 },
                 { sprite: 'walk_right_3', time: 0.1 },
                 { sprite: 'walk_right_4', time: 0.1 },
                 { sprite: 'walk_right_5', time: 0.1 },
            ];
            this.tools.game.changeViewPort(-this.speed,0);
        }
        if (this.movement.up !== 0 && !this.collision.top) {
            this.animation._frames = [
                 { sprite: 'walk_up_1', time: 0.1 },
                 { sprite: 'walk_up_2', time: 0.1 },
                 { sprite: 'walk_up_3', time: 0.1 },
                 { sprite: 'walk_up_4', time: 0.1 },
                 { sprite: 'walk_up_5', time: 0.1 },
            ];
            this.tools.game.changeViewPort(0,+this.speed);
        }
        if (this.movement.down !== 0 && !this.collision.bottom) {
            
            this.animation._frames = [
                 { sprite: 'walk_down_1', time: 0.1 },
                 { sprite: 'walk_down_2', time: 0.1 },
                 { sprite: 'walk_down_3', time: 0.1 },
                 { sprite: 'walk_down_4', time: 0.1 },
                 { sprite: 'walk_down_5', time: 0.1 },
            ];
            this.tools.game.changeViewPort(0,-this.speed);
        }
        
//        correción de la posición del collisionbox
        this.collisionBox.x = this.x+22;
        this.collisionBox.y = this.y+12;
    },
    draw : function (canvas) {
        
            this.animation.animate(this.timer.getSeconds());
            var frame = this.animation.getSprite();
            canvas.bufferContext.drawImage(this.image, frame.x, frame.y, 60, 60, this.x, this.y, 60, 60);
            this.timer.tick();

            this.collisionBox.draw(canvas);
        
    },
    handleCollision: function(res){
        var noCollision = true;
        for(var i = 0;i < res.length; i+=1){
            if(res[i] !== null){
                noCollision = false;
                this.color = 'red';
                var side = this.tools.collisionUtils.getCollisionSide(this.collisionBox,res[i]);
                this.collision.setCollision(side);
            }
        }
        if(noCollision){
            //release all collisions if the object has no collision
            this.color = "yellow";
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
    },
    keyup : function (event) {
        this.animation._frameIndex = 0;
        if (event.keyCode === 39) {
            this.movement.unSetMovement('right');
            this.animation._frames = [
            { sprite: 'walk_right_5', time: 0.1 },
        ];
        }
        if (event.keyCode === 37) {
            this.movement.unSetMovement('left');
            this.animation._frames = [
            { sprite: 'walk_left_1', time: 0.1 },
        ];
        }
        if (event.keyCode === 38) {
            this.movement.unSetMovement('up');
            this.animation._frames = [
            { sprite: 'walk_up_1', time: 0.1 },
        ];
        }
        if (event.keyCode === 40) {
            this.movement.unSetMovement('down');
            this.animation._frames = [
            { sprite: 'walk_down_1', time: 0.1 },
        ];
        }
    },
    kill:function(test){
        this.status="Dead";
        this.tools.game.getLayer('objects').removeObject('fp');
    }

});

