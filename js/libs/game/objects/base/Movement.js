var Movement = Class.extend({
    right: 0,
    left: 0,
    up: 0,
    down: 0,
    setMovement:function(direction,speed){
        this[direction] = speed;
    },
    unSetMovement:function(direction){
        this[direction] = 0;
    },
    isMoving: function(){
        return (this.left !== 0 || this.right !== 0 || this.up !== 0 || this.down !== 0);
    },
    stop:function(){
        this.left =0;
        this.right =0;
        this.up =0;
        this.down =0;
    },
    
    getSignedActualSpeed: function(){
        var speedx = 0, speedy = 0;
        if(this.right !== 0){
            speedx = this.right;
        }else if(this.left !== 0){
            speedx = - this.left;
        }
        if(this.down !== 0){
            speedy = this.down;
        }else if(this.up !== 0){
            speedy = - this.up;
        }
        return {x:speedx,y:speedy};
    }
    
    
});

