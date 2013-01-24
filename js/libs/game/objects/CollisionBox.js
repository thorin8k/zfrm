/**
 * @Author Thorin8k
 * Clase rectangulo, pinta un rectangulo en las coordenadas indicadas.
 * QUe colisionará con quién venga
 * 
 */
var CollisionBox = Object.extend({
    start: function(moduleTools){
        var handler = moduleTools.game.getModule('CollisionManager');
        if(handler !== null){
            handler.add(this,'handleCollision');
        }
    },
    handleCollision: function(res){
        //can add here especial collisions
    }

});


