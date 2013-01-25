var CollisionManager = IModule.extend({
    collideSubscriptions : [],
    add:function(object, functionToAlert){
        this.collideSubscriptions.push({'object':object,'functionToAlert':functionToAlert});  
    },
    loadModule: function(tools){
        this.tools = tools;
        tools.messageContainer.listen(["#checkCollisions#"], this.checkCollisions, this);
    },
    checkCollisions:function(notification){
        for(obj1 in this.collideSubscriptions){
            var object1 = this.collideSubscriptions[obj1].object;
            for(obj2 in this.collideSubscriptions){
                var object2 = this.collideSubscriptions[obj2].object;
                if(object1.__id !== object2.__id){
                    
                    var result = this.collide(object1,object2);
                    object1[this.collideSubscriptions[obj1].functionToAlert](result);
                    
                }
            }
        }
    },
    collide:function(obj1,obj2){
        obj1.color='yellow';        
        var collision = new Collision();
        var res =  this.overlaps(obj1,obj2);
        if (res.x != 0 || res.y != 0) {
            if (res.x != 0) {
                // x axis
                if (res.x<0){
                    //left
                    collision.setCollision('left');
                    obj1.color='green';
                }else{
                    //right
                    collision.setCollision('right');
                    obj1.color='blue';
                }
             }
            if (res.y != 0) {
                // y axis
                if (res.y<0){
                    //top
                    collision.setCollision('top');
                    obj1.color='red';
                }else{
                    //bot
                    collision.setCollision('bottom');
                    obj1.color='black';
                }
             }
        }
        return collision;
    },
    isPointInSQ: function(x,y,obj2){
        //función para comprobar si un punto esta en un cuadrado  dado
        //obj2 es el cuadrado
        var t1 = (x>=obj2.x && x<=obj2.x+obj2.height);
        var t2 = (y>=obj2.y && y<=obj2.y+obj2.height);
        return t1 && t2;
    },overlaps : function(obj1,obj2) {
        // response vector
        var px = 0;
        var py = 0;

        // check if both box are overlaping
        if ((obj1.x < obj2.x+obj2.width && obj2.x < obj1.x+obj1.width && obj1.y < obj2.y+obj2.height && obj2.y < obj1.y+obj2.height)) {
            // compute delta between this & rect
            var dx = obj1.x + (obj1.width/2) - obj2.x - (obj2.width/2);
            var dy = obj1.y + (obj1.height/2) - obj2.y - (obj2.height/2);

            // compute penetration depth for both axis
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
    }
    
})


