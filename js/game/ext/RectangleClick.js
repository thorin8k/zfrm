/**
 * @Author Thorin8k
 * Clase rectangulo, pinta un rectangulo en las coordenadas indicadas.
 * 
 * Este rectangulo puede moverse por la pantalla con las flechas.
 * 
 */
var RectangleClick = Clickable.extend({
    color: 'blue',
    collisionType: 'Rectangle',

    start: function(moduleTools){
        this._super(moduleTools);
        moduleTools.messageContainer.speak({
            message : "#collisionSubs#",
            obj : this,
            callback: 'handleCollision'
        });
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
    handleCollision: function(res){
        var noCollision = true;
        for(var i = 0;i < res.length; i+=1){
            if(res[i] !== null){
                noCollision = false;
                this.color = 'red';
                var side = this.tools.collisionUtils.getCollisionSide(this,res[i],false);
                this.collision.setCollision(side);
            }
        }
        if(noCollision){
            //release all collisions if the object has no collision
            this.color = "yellow";
            this.collision.releaseCollisions();
        }
    },
    toString:function(){
        var test = this._super();
        var result = "";
        result += test;
        result += "color:"+this.color+'</br>';
        result += "collisionType:"+this.collisionType+'</br>';
        return  result;
    }

});

