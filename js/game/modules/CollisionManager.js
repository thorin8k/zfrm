var CollisionManager = IModule.extend({
    collideSubscriptions : [],
    
    addSubscription:function(notification){
        this.collideSubscriptions.push({object:notification.obj,functionToAlert:notification.callback});  
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
        tools.messageContainer.listen(["#collisionSubs#"], this.addSubscription, this);
        tools.messageContainer.listen(["#checkCollisions#"], this.checkCollisions, this);
        tools.messageContainer.listen(["#objRemoved#"], this.remove, this);
    },
    checkCollisions:function(notification){
        
        for(var obj1 in this.collideSubscriptions){
            var result = [];
            var object1 = this.collideSubscriptions[obj1].object;
            if(object1 == null) continue;
            object1.collision.releaseCollisions();
            for(var obj2 in this.collideSubscriptions){
                var object2 = this.collideSubscriptions[obj2].object;
                if(object2 == null) continue;
                if(object1.__id !== object2.__id){
                    //register axis penetration of all collisions
                    var col = this.collide(object1,object2)
                    if(col !== null){
                        result.push(col);
                    }
                }
            }
            //return all collisions to the object
            object1[this.collideSubscriptions[obj1].functionToAlert](result);
            
        }
    },
    collide : function(obj1,obj2) {
        //TODO: check the weight and z-index between obj1 & obj1 to handle 
        //the collision and notify
        if( obj1.collisionType === 'Rectangle' && obj2.collisionType === 'Rectangle' ){
            if(this.tools.collisionUtils.rectCollideRect(obj1,obj2)){
                return obj2;
            }
        }
        if( (obj1.collisionType === 'Circle' ) && (obj2.collisionType === 'Circle')){
            if(this.tools.collisionUtils.circleCollideCircle(obj1,obj2)){
                return obj2;
            }
        }
        if(obj1.collisionType === 'Circle' && obj2.collisionType === 'Rectangle'){
            if(this.tools.collisionUtils.circleCollideRect(obj1,obj2)){
                return obj2;
            }
        }
        if(obj1.collisionType === 'Rectangle' && obj2.collisionType === 'Circle'){
            if(this.tools.collisionUtils.circleCollideRect(obj2,obj1)){
                return obj2;
            }
        }
        return null;
    }
    

    
})


