var CollisionManager = IModule.extend({
    collideSubscriptions : [],
    add:function(object, functionToAlert){
        this.collideSubscriptions.push({'object':object,'functionToAlert':functionToAlert});  
    },
    remove:function(notification){
        if (typeof notification.data === 'string') {
            var oCurrentGameObject = null;
            var nObjectCount = 0;
            var nGameObjectsLength = this.collideSubscriptions.length;
 
            for (nObjectCount = 0; nObjectCount < nGameObjectsLength; nObjectCount += 1) {
                oCurrentGameObject = this.collideSubscriptions[nObjectCount];
                if (oCurrentGameObject.object.__id === notification.data) {
                    this.collideSubscriptions.splice(nObjectCount,1);
                }
            }
        }
    },
    loadModule: function(tools){
        this.tools = tools;
        tools.messageContainer.listen(["#checkCollisions#"], this.checkCollisions, this);
        tools.messageContainer.listen(["#objRemoved#"], this.remove, this);
    },
    checkCollisions:function(notification){
        for(var obj1 in this.collideSubscriptions){
            var object1 = this.collideSubscriptions[obj1].object;
            for(var obj2 in this.collideSubscriptions){
                var object2 = this.collideSubscriptions[obj2].object;
                if(object1.__id !== object2.__id){
                    
                    var result = this.collide(object1,object2);
                    object1[this.collideSubscriptions[obj1].functionToAlert](result);
                    if(result.hasCollisions()) break;                    
                    
                }
            }
        }
    },
    collide:function(obj1,obj2){
        var collision = obj1.collision;
        var res =  this.computeCollision(obj1,obj2);
        if (res.x != 0 || res.y != 0) {
            if (res.x != 0) {
                // x axis
                if (res.x<0){
                    //left
                    collision.setCollision('left');
                }else{
                    //right
                    collision.setCollision('right');
                }
             }
            if (res.y != 0) {
                // y axis
                if (res.y<0){
                    //top
                    collision.setCollision('top');
                }else{
                    //bot
                    collision.setCollision('bottom');
                }
             }
        }else{
            collision.releaseCollisions();
        }
        return collision;
    },
    isPointInSQ: function(x,y,obj2){
        //función para comprobar si un punto esta en un cuadrado  dado
        //obj2 es el cuadrado
        var t1 = (x>=obj2.x && x<=obj2.x+obj2.width);
        var t2 = (y>=obj2.y && y<=obj2.y+obj2.height);
        return t1 && t2;
    },computeCollision : function(obj1,obj2) {
        // response vector
        var px = 0;
        var py = 0;

        // check if both box are overlaping
        if (this.overlaps(obj1,obj2)) {
            
            // compute delta between this & rect
            var dx = obj1.x + (obj1.width/2) - obj2.x - (obj2.width/2);
            var dy = obj1.y + (obj1.height/2) - obj2.y - (obj2.height/2);

//          compute penetration depth for both axis
            px = ((obj2.width/2) + (obj1.width/2)) - (dx < 0 ? -dx : dx); // - Math.abs(dx);
            py = ((obj2.height/2) + (obj1.height/2)) - (dy < 0 ? -dy : dy); // - Math.abs(dy);

            // check and "normalize" axis
            if (px < py) {
                py = 0;
                px = dx < 0 ? -px : px;
            } else {
                px = 0;
                py = dy < 0 ? -py : py;
            }
        }
        return {x:px,y:py};
    },
    overlaps: function(obj1,obj2){
        return (obj1.x < (obj2.x+obj2.width) && obj2.x < (obj1.x+obj1.width) && obj1.y < (obj2.y+obj2.height) && obj2.y < (obj1.y+obj1.height));
    
    }
    
})


