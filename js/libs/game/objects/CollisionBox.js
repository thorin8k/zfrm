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
    weight:0,
    z: 0,
    collision: null,
    init:function(){
        this.collision = new Collision();
        
    },
    start: function(moduleTools){
        var handler = moduleTools.game.getModule('CollisionManager');
        if(handler !== null){
            handler.add(this,'handleCollision');
        }
    },
    handleCollision: function(res){
        //can add here especial collisions
    },
    hasCollisions:function(){
        return this.collision.hasCollisions();
    }

});


