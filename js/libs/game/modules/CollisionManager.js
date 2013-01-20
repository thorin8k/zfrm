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
                    object2[this.collideSubscriptions[obj2].functionToAlert](result);
                    
                }
            }
        }
    },
    collide:function(obj1,obj2){
        if (obj1.x + obj1.width < obj2.x) {
            return false;
        }
        if (obj1.y + obj1.height < obj2.y) {
            return false;
        }
        if (obj1.x > obj2.x + obj2.width) {
            return false;
        }
        if (obj1.y > obj2.y + obj2.height) {
            return false;
        }
        return true;
    }
    
})


