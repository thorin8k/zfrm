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
                    object1.collision.releaseCollisions();
                    object2.collision.releaseCollisions();
                    var result = this.collide(object1,object2);

//                    object1[this.collideSubscriptions[obj1].functionToAlert](result);
//                    object2[this.collideSubscriptions[obj2].functionToAlert](result);
                    
                }
            }
        }
    },
    collide:function(obj1,obj2){
        obj1.color='yellow';
        
        if( this.isPointInSQ(obj1.x,obj1.y,obj2)){
            obj1.color='green';
        }
        if( this.isPointInSQ(obj1.x+obj1.width,obj1.y,obj2)){
            obj1.color='pink';
        }
        if( this.isPointInSQ(obj1.x,obj1.y+obj1.height,obj2)){
            obj1.color='red';
        }
        if( this.isPointInSQ(obj1.x+obj1.width,obj1.y+obj1.height,obj2)){
            obj1.color='blue';
        }
        
//        if (obj1.x + obj1.width < obj2.x) {
//            obj1.color='green';
//        }
//        if (obj1.y + obj1.height < obj2.y) {
//            obj1.color='green';
//        }
//        if (obj1.x > obj2.x + obj2.width) {
//            obj1.color='green';
//        }
//        if (obj1.y > obj2.y + obj2.height) {
//            obj1.color='green';
//        }
        
    },
    isPointInSQ: function(x,y,obj2){
        var t1 = (x>=obj2.x && x<=obj2.x+obj2.height);
        var t2 = (y>=obj2.y && y<=obj2.y+obj2.height);
        return t1 && t2;
    }
    
})


