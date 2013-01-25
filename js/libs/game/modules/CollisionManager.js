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
        var result = [];
        
        for(var obj1 in this.collideSubscriptions){
            var object1 = this.collideSubscriptions[obj1].object;
            object1.collision.releaseCollisions();
            for(var obj2 in this.collideSubscriptions){
                var object2 = this.collideSubscriptions[obj2].object;
                if(object1.__id !== object2.__id){
                    //register axis penetration of all collisions
                    result.push(this.collide(object1,object2));
                }
            }
            //return all collisions to the object
            object1[this.collideSubscriptions[obj1].functionToAlert](result);
            
            
        }
    },
    isPointInSQ: function(x,y,obj2){
        //función para comprobar si un punto esta en un cuadrado  dado
        //obj2 es el cuadrado
        var t1 = (x>=obj2.x && x<=obj2.x+obj2.width);
        var t2 = (y>=obj2.y && y<=obj2.y+obj2.height);
        return t1 && t2;
    },
    collide : function(obj1,obj2) {
        var px = 0,
        py = 0,
        o1hWidth = (obj1.width / 2),
        o1hHeight = (obj1.height / 2),
        o2hWidth = (obj2.width / 2),
        o2hHeight = (obj2.height / 2);
        // check if both box are overlaping
        if (this.overlaps(obj1,obj2)) {
            // compute delta between obj1 & obj2
            var dx = obj1.x + o1hWidth - obj2.x - o2hWidth,
            dy = obj1.y + o1hHeight - obj2.y - o2hHeight;
//          compute penetration depth for both axis
            px = (o2hWidth + o1hWidth) - (dx < 0 ? -dx : dx); // - Math.abs(dx);
            py = (o2hHeight + o1hHeight) - (dy < 0 ? -dy : dy); // - Math.abs(dy);
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
    valueInRange: function (value, min, max) {
        return (value <= max) && (value >= min);
    },
    overlaps: function(obj1, obj2){ 
        var xOverlap = this.valueInRange(obj1.x, obj2.x, obj2.x + obj2.width) ||
        this.valueInRange(obj2.x, obj1.x, obj1.x + obj1.width);

        var yOverlap = this.valueInRange(obj1.y, obj2.y, obj2.y + obj2.height) ||
        this.valueInRange(obj2.y, obj1.y, obj1.y + obj1.height);

        return xOverlap && yOverlap;
    }
    
})


