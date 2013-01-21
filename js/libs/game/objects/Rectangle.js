/**
 * @Author Thorin8k
 * Clase rectangulo, pinta un rectangulo en las coordenadas indicadas.
 * 
 * Este rectangulo puede moverse por la pantalla con las flechas.
 * 
 */
var Rectangle = ICursorMovable.extend({
    color: 'red',
    position: {'x': 15, 'y':15 },
    size: {'width': 25, 'height':25 },
    
    collideSubscription: function(moduleTools){
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
    handleCollision: function(collision){
        this.collision = collision;
    }

});

