var Collision = Class.extend({
    right: false,
    left: false,
    top: false,
    bottom: false,
    setCollision:function(direction){
        this[direction] = true;
    },
    unSetCollision:function(direction){
        this[direction] = false;
    },
    releaseCollisions:function(){
        this.right= false;
        this.left= false;
        this.top= false;
        this.bottom= false;
    }
    
    
});

