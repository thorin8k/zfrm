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
    }
    
    
});

