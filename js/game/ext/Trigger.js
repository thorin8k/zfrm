/**
 * @Author Thorin8k
 * Clase rectangulo, pinta un rectangulo en las coordenadas indicadas.
 *
 */
var Trigger = Object.extend({
    color: 'yellow',
    collisionType: 'Rectangle',
    start: function (moduleTools) {
        this._super(moduleTools);
        moduleTools.messageContainer.speak({
            message: "#collisionSubs#",
            obj: this,
            callback: 'handleCollision'
        });
    },
    draw: function (canvas) {
        canvas.bufferContext.beginPath();
        canvas.bufferContext.rect(this.x, this.y, this.width, this.height);
        canvas.bufferContext.fillStyle = this.color;
        canvas.bufferContext.closePath();
        canvas.bufferContext.fill();
        canvas.bufferContext.lineWidth = 2;
        canvas.bufferContext.strokeStyle = 'black';
        canvas.bufferContext.stroke();
    },
    handleCollision: function (res) {
        var self = this;
        var noCollision = true;
        this.color = "yellow";
        for (var i = 0; i < res.length; i += 1) {
            if (res[i] !== null) {
                noCollision = true;
                if (res[i].parent && res[i].parent instanceof FirstPlayer) {
                    noCollision = false;
                    this.color = 'red';
                    setTimeout(function () {
                        if (self !== null && self.mapTo) {
                            game.messageContainer.speak({
                                message: "#loadMap#",
                                mapName: self.mapTo
                            });
                        }
                    }, 100);
                    game.getLayer('objects').removeObject(this.__id);
                }
            }
        }
        if (noCollision) {
            //release all collisions if the object has no collision
            this.collision.releaseCollisions();
        }
    },
    toString: function () {
        var test = this._super();
        var result = "";
        result += test;
        result += "color:" + this.color + '</br>';
        result += "collisionType:" + this.collisionType + '</br>';
        return  result;
    },
    changeViewPort: function (pos) {

        this.x += pos.x;
        this.y += pos.y;
    }

});

