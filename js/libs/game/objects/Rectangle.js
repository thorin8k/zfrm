/**
 * @Author Thorin8k
 * Clase rectangulo, pinta un rectangulo en las coordenadas indicadas.
 * 
 * Este rectangulo puede moverse por la pantalla con las flechas.
 * 
 */
var Rectangle = ICursorMovable.extend({
    color: 'red',
    x: 15,
    y: 15,
    width: 25,
    height: 25,
    collideSubscription: function(moduleTools){
        moduleTools.game.getModule('CollisionManager').add(this,'handleCollision');
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
    handleCollision: function(result){
        this.speed = 5;
        if(result){
            this.speed = 0;
        }
    }

});

