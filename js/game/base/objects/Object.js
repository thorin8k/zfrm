/**
 * @Author Thorin8k
 * 
 */
var Object= Class.extend({
    x:0,
    y:0,
    width:0,
    height:0,
    destx: 0,
    desty: 0,   
    movement: null,
    collision: null,
    reaction: null,
    speed: 5,
    weight:10,
    z: 0,
    gravity:0,
    tools:null,
    canMove: true,
    init:function(){
        this.movement = new Movement();
        this.reaction = new Movement();
        this.collision = new Collision();
    },
    prestart:function(tools){
        
        this.tools = tools;
    },
    start:function(tools){
        
        this.tools = tools;
    },
    update:function(){},
    draw : function (canvas) {},
    move:function(checkDestination){
        if(!this.canMove)return;
        if (this.movement.right !== 0 && !this.collision.right) {
            //Move right
            this.x += this.movement.right;
            if(checkDestination && this.x >= this.destx){
                this.destx = 0;
                this.movement.unSetMovement('right');                
            }
        }
        if (this.movement.left !== 0 && !this.collision.left) {
            //Move left
            this.x -= this.movement.left;
            if(checkDestination && this.x <= this.destx){
                this.destx = 0;
                this.movement.unSetMovement('left');
            }
        }
        if (this.movement.up !== 0 && !this.collision.top) {
            //Move Up
            this.y -= this.movement.up;
            if(checkDestination && this.y <= this.desty){
                this.desty = 0;
                this.movement.unSetMovement('up');
            }
        }
        if (this.movement.down !== 0 && !this.collision.bottom) {
            //Move Down
            this.y += this.movement.down;
            if(checkDestination && this.y >= this.desty){
                this.desty = 0;
                this.movement.unSetMovement('down');
            }
        }
    },
    isMoving: function(){
        return this.movement.isMoving();
    },
    hasCollisions:function(){
        return this.collision.hasCollisions();
    },
    pause: function(){
        this.canMove = false;
        this.movement.stop();
    },
    resume: function(){
        this.canMove = true;
    },
    toString:function(){
        var result = "";
        result += "x: "+this.x+"</br>";
        result += "y: "+this.y+"</br>";
        result += "z: "+this.z+"</br>";
        result += "width: "+this.width+"</br>";
        result += "height: "+this.height+"</br>";
        result += "destx: "+this.destx+"</br>";
        result += "desty: "+this.desty+"</br>";
        result += this.movement.toString()+"</br>";
        result += "speed: "+this.speed+"</br>";
        result += "weight: "+this.weight+"</br>";
        
        
        return result;
    }
});



