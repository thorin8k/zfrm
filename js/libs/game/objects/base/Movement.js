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
    }
    
    
});

