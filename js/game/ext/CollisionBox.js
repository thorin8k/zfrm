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
    tools:null,
    init:function(){
        this.collision = new Collision();
        this.movement = new Movement();
        
    },
    start: function(moduleTools){
        
        this.tools = moduleTools;
    
        moduleTools.messageContainer.speak({
            message : "#collisionSubs#",
            obj : this,
            callback: 'handleCollision'
        });
    },
    draw : function (canvas) {
        if(this.tools.settings.drawCollisionRects){
            canvas.bufferContext.beginPath();
            canvas.bufferContext.rect(this.x, this.y, this.width, this.height);
            canvas.bufferContext.fillStyle = this.color;
            canvas.bufferContext.closePath();
            canvas.bufferContext.lineWidth = 1;
            canvas.bufferContext.strokeStyle = 'red';
            canvas.bufferContext.stroke();
        }
    },
    handleCollision: function(res){
        //can add here especial collisions
    },
    hasCollisions:function(){
        return this.collision.hasCollisions();
    },
    changeViewPort: function(pos){
        
        this.x+= pos.x;
        this.y+= pos.y;
    }
});


