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
    sprite: null,
    animation: null,
    image: null,
    timer: null,
    light: null,
    persistent: true,
    weapon: false,
    speed: 3,
    collisionBox: null,
    collisionCorrectionX: 23,
    collisionCorrectionY: 35,
    start: function (moduleTools) {
        this._super(moduleTools);
        var self = this;
        //Crear una collisionbox 
        this.collisionBox = new CollisionBox(this.__id, this.x, this.y, 18, 25, moduleTools, this);
        this.collisionBox.handleCollision = function (res) {
            //asignar una llamada a handle collision que redireccione a la de este objeto
            self.handleCollision(res);
        };

        //Crear el mapa de sprites
        this.sprite = new SpriteSheet({
            width: this.width,
            height: this.height,
            sprites: [
                {name: 'stand1', x: 0, y: 0},
                {name: 'stand2', x: 1, y: 0},
                {name: 'stand3', x: 2, y: 0},
                {name: 'stand4', x: 3, y: 0},
                {name: 'stand5', x: 4, y: 0}
            ]
        });
//        this.sprite = new SpriteSheet({
//            width: this.width,
//            height: this.height,
//            sprites: [
//                { name: 'stand', x: 7, y: 0},
//                { name: 'walk_left_1', x: 0, y: 2 },
//                { name: 'walk_left_2', x: 1, y: 2 },
//                { name: 'walk_left_3', x: 2, y: 2 },
//                { name: 'walk_left_4', x: 3, y: 2 },
//                { name: 'walk_left_5', x: 4, y: 2 },
//                { name: 'walk_left_6', x: 5, y: 2 },
//                { name: 'walk_left_7', x: 6, y: 2 },
//                { name: 'walk_right_1', x: 0, y: 6 },
//                { name: 'walk_right_2', x: 1, y: 6 },
//                { name: 'walk_right_3', x: 2, y: 6 },
//                { name: 'walk_right_4', x: 3, y: 6 },
//                { name: 'walk_right_5', x: 4, y: 6 },
//                { name: 'walk_right_6', x: 5, y: 6 },
//                { name: 'walk_right_7', x: 6, y: 6 },
//                { name: 'walk_up_1', x: 0, y: 4 },
//                { name: 'walk_up_2', x: 1, y: 4 },
//                { name: 'walk_up_3', x: 2, y: 4 },
//                { name: 'walk_up_4', x: 3, y: 4 },
//                { name: 'walk_up_5', x: 4, y: 4 },
//                { name: 'walk_up_6', x: 5, y: 4 },
//                { name: 'walk_up_7', x: 6, y: 4 },
//                { name: 'walk_down_1', x: 0, y: 0 },
//                { name: 'walk_down_2', x: 1, y: 0 },
//                { name: 'walk_down_3', x: 2, y: 0 },
//                { name: 'walk_down_4', x: 3, y: 0 },
//                { name: 'walk_down_5', x: 4, y: 0 },
//                { name: 'walk_down_6', x: 5, y: 0 },
//                { name: 'walk_down_7', x: 6, y: 0 }
//            ]
//        });
        if (this.light === null) {
            this.light = new Light(this.__id, (this.x + this.width / 2), (this.y + this.height / 2), 150, 95, this.tools, false);
        }
//        this.animation = new Animation([
//            { sprite: 'stand', time: 0.1 }
//        ], this.sprite);
        this.animation = new Animation([
            {sprite: 'stand1', time: 0.1},
            {sprite: 'stand2', time: 0.1},
            {sprite: 'stand3', time: 0.1},
            {sprite: 'stand4', time: 0.1},
            {sprite: 'stand5', time: 0.1},
            {sprite: 'stand4', time: 0.1},
            {sprite: 'stand3', time: 0.1},
            {sprite: 'stand2', time: 0.1},
            {sprite: 'stand1', time: 0.1}
        ], this.sprite);
        this.timer = new FrameTimer();
        this.timer.tick();
        this.image = this.tools.imageList["square.png"];

    },
    centerOnScreen: function () {
        if (this.tools !== null) {
            this.tools.game.changeViewPort(-(this.x - 300), -(this.y - 240));
            this.x = 300;
            this.y = 240;
            this.light.x = (this.x + this.width / 2);
            this.light.y = (this.y + this.height / 2);

        }
    },
    update: function (canvas) {
        if (this.tools === null) {
            return;
        }

        if (this.movement.jump !== null) {
            if (this.movement.jump <= this.y) {
                this.y -= this.speed;
                this.light.y -= this.speed;
                this.tools.game.changeViewPort(0, +this.speed);
            } else {
                this.movement.setJump(null);
            }
        } else if (this.gravity !== 0) {
            if (!this.collision.bottom) {
                this.y += this.gravity;
                this.light.y += this.gravity;
                this.tools.game.changeViewPort(0, -this.gravity);
            }
        }
        if (this.movement.left !== 0 && !this.collision.left) {
            this.setMovementAnimation('left');
            this.tools.game.changeViewPort(+this.speed, 0);
        }
        if (this.movement.right !== 0 && !this.collision.right) {

            this.setMovementAnimation('right');
            this.tools.game.changeViewPort(-this.speed, 0);
        }
        if (this.gravity === 0 && this.movement.up !== 0 && !this.collision.top) {

            this.setMovementAnimation('up')
            this.tools.game.changeViewPort(0, +this.speed);
        }
        if (this.movement.down !== 0 && !this.collision.bottom) {

            this.setMovementAnimation('down');
            this.tools.game.changeViewPort(0, -this.speed);
        }

//      correción de la posición del collisionbox
        if (this.collisionBox !== null) {
            this.collisionBox.x = this.x + this.collisionCorrectionX;
            this.collisionBox.y = this.y + this.collisionCorrectionY;
        }
    },
    draw: function (canvas) {
        if (this.timer === null) {
            return;
        }
        this.animation.animate(this.timer.getSeconds());
        var frame = this.animation.getSprite();
        canvas.bufferContext.drawImage(this.image, frame.x, frame.y, this.width, this.height, this.x, this.y, this.width, this.height);
        this.timer.tick();

        this.collisionBox.draw(canvas);
    },
    handleCollision: function (res) {
        var noCollision = true;
        for (var i = 0; i < res.length; i += 1) {
            if (res[i] !== null) {
                noCollision = false;
                if (res[i].parent && res[i].parent instanceof Box) {
                    this.speed = 1;

                    if (res[i].parent.hasCollisions()) {
                        var side = this.tools.collisionUtils.getCollisionSide(this.collisionBox, res[i], false);
                        this.collision.setCollision(side);
                    }
                    continue;
                }
                if (res[i] instanceof CollisionBox) {
                    var side = this.tools.collisionUtils.getCollisionSide(this.collisionBox, res[i], false);
                    this.collision.setCollision(side);
                }
                if (res[i].parent && res[i].parent instanceof Enemy) {
                    this.kill();
                }
            }
        }
        if (noCollision) {
            //release all collisions if the object has no collision
            this.collision.releaseCollisions();
            this.speed = 3;
        }
    },
    keydown: function (event) {
        if (this.tools === null) {
            return;
        }
        if (!this.canMove)return;

        if (event.keyCode === KEY_RIGHT) {
            this.movement.setMovement('right', this.speed);
        }
        if (event.keyCode === KEY_LEFT) {
            this.movement.setMovement('left', this.speed);
        }
        if (event.keyCode === KEY_UP) {
//            this.movement.setMovement('up', this.speed);
        }
        if (event.keyCode === KEY_DOWN) {
//            this.movement.setMovement('down', this.speed);
        }
        if (event.keyCode === KEY_ACTION) {
            if (this.collision.bottom) {
                this.movement.setJump(this.y - (60));
                this.movement.setMovement('up', this.speed);
            }
        }
    },
    keyup: function (event) {
        if (this.tools === null) {
            return;
        }
        if (!this.canMove)return;

        this.animation._frameIndex = 0;
        if (event.keyCode === KEY_RIGHT) {
            this.movement.unSetMovement('right');
            this.releaseMovementAnimation('right');
        }
        if (event.keyCode === KEY_LEFT) {
            this.movement.unSetMovement('left');
            this.releaseMovementAnimation('left');
        }
        if (event.keyCode === KEY_UP) {
//            this.movement.unSetMovement('up');
//            this.releaseMovementAnimation('up');
        }
        if (event.keyCode === KEY_DOWN) {
//            this.movement.unSetMovement('down');
//            this.releaseMovementAnimation('down');
        }
    },
    kill: function (test) {
        this.tools.game.pauseGame();
        //this.speed = 0;

    },
    toString: function () {
        var test = this._super();
        var result = "";
        result += test;
        result += "color:" + this.color + '</br>';
        result += "collisionType:" + this.collisionType + '</br>';
        result += "coll.x:" + this.collisionBox.x + '</br>';
        result += "coll.y:" + this.collisionBox.y + '</br>';
        return  result;
    },
    setMovementAnimation: function (direction) {
        if (this.animation === null) {
            return;
        }
//        this.animation._frames = [
//            { sprite: 'walk_' + direction + '_1', time: 0.1 },
//            { sprite: 'walk_' + direction + '_2', time: 0.1 },
//            { sprite: 'walk_' + direction + '_3', time: 0.1 },
//            { sprite: 'walk_' + direction + '_4', time: 0.1 },
//            { sprite: 'walk_' + direction + '_5', time: 0.1 },
//            { sprite: 'walk_' + direction + '_6', time: 0.1 },
//            { sprite: 'walk_' + direction + '_7', time: 0.1 }
//        ];
    },
    releaseMovementAnimation: function (direction) {
        if (this.animation === null) {
            return;
        }
//        this.animation._frames = [
//            { sprite: 'walk_' + direction + '_1', time: 0.1 }
//        ];
    },
    setStandAnimation: function () {
        if (this.animation === null) {
            return;
        }
//        this.animation._frameIndex = 0;
//        this.animation._frames = [
//            { sprite: 'stand', time: 0.1 }
//        ];
    }
});

