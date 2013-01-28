/**
 * @Author Thorin8k
 * Clase rectangulo, pinta un rectangulo en las coordenadas indicadas.
 * QUe colisionará con quién venga
 * 
 */
var CollisionBox = Class.extend({
    x:0,
    y:0,
    width:0,
    height:0,
    weight:100,
    speed: 0,
    movement: null,
    z: 0,
    collision: null,
    color: 'grey',
    collisionType: 'Rectangle',
    init:function(){
        this.collision = new Collision();
        this.movement = new Movement();
        
    },
    start: function(moduleTools){
        var handler = moduleTools.game.getModule('CollisionManager');
        if(handler !== null){
            handler.add(this,'handleCollision');
        }
    },
    draw : function (canvas) {
        canvas.bufferContext.beginPath();
        canvas.bufferContext.rect(this.x, this.y, this.width, this.height);
        canvas.bufferContext.fillStyle = this.color;
        canvas.bufferContext.closePath();
        canvas.bufferContext.fill();
        canvas.bufferContext.lineWidth = 2;
        canvas.bufferContext.strokeStyle = 'black';
        canvas.bufferContext.stroke();
    },
    handleCollision: function(res){
        //can add here especial collisions
    },
    hasCollisions:function(){
        return this.collision.hasCollisions();
    }

});


