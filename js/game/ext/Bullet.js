/**
 * @Author Thorin8k
 * //TODO objeto que al colisionar con otro elemento provoca su destruccion.
 */
var Bullet = Object.extend({

    collisionType: 'Circle',
    radius:3,
    start: function(tools){
        this._super(tools);
        tools.messageContainer.speak({
            message : "#collisionSubs#",
            obj : this,
            callback: 'handleCollision'
        });
    },
    update : function (canvas) {

    }


})