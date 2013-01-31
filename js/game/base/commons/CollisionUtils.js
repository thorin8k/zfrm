var CollisionUtils = Class.extend({
    getCollisionSide: function (obj1,obj2){
        var axis = this.getCollisionAxis(obj1, obj2);
        //Invierte el eje de colisiones para los circulos.
        var reverse = obj1.collisionType === 'Circle' || obj2.collisionType === 'Circle';
        if(axis.x != 0 || axis.y != 0){
            if(axis.x != 0){
                if(axis.x > 0){
                    if(!reverse){
                        return 'left';
                    }else {
                        return 'right';
                    }
                }
                if(axis.x < 0){
                    if(!reverse){
                        return 'right';
                    }else {
                        return 'left';
                    }
                }
            }else if(axis.y != 0){
                if(axis.y > 0){
                    if(!reverse){
                        return 'top';
                    }else {
                        return 'bottom';
                    }
                }
                if(axis.y < 0){
                    if(!reverse){
                        return 'bottom';
                    }else {
                        return 'top';
                    }
                }
            }
        }

        return null;
    },


    isPointInRect: function (x,y,x2,y2,height,width){
        //función para comprobar si un punto esta en un cuadrado  dado
        var t1 = (x>=x2 && x<=x2+width);
        var t2 = (y>=y2 && y<=y2+height);
        return t1 && t2;
    },

    valueInRange: function (value, min, max) {
        return (value <= max) && (value >= min);
    },
    rectCollideRect: function (obj1, obj2){ 
        var xOverlap = this.valueInRange(obj1.x, obj2.x, obj2.x + obj2.width) ||
        this.valueInRange(obj2.x, obj1.x, obj1.x + obj1.width);

        var yOverlap = this.valueInRange(obj1.y, obj2.y, obj2.y + obj2.height) ||
        this.valueInRange(obj2.y, obj1.y, obj1.y + obj1.height);

        return xOverlap && yOverlap;
    },
    circleCollideRect: function (obj1,obj2){   

        var testX = obj1.x;
        var testY = obj1.y;

        if (testX < obj2.x)
            testX = obj2.x;
        if (testX > (obj2.x + obj2.width))
            testX = (obj2.x + obj2.width);
        if (testY < obj2.y)
            testY = obj2.y;
        if (testY > (obj2.y + obj2.height))
            testY = (obj2.y + obj2.height);

        return ((obj1.x - testX) * (obj1.x - testX) + (obj1.y - testY) * (obj1.y - testY)) < obj1.radius * obj1.radius;

    },
    circleCollideCircle: function (obj1,obj2){ 
        var dx = obj2.x - obj1.x,
         dy = obj2.y - obj1.y,
        dist = Math.sqrt(dx * dx + dy * dy);

        //collision handling code here
        if (dist <= obj1.radius + obj2.radius) {
              
              return true;
        }
        return false;
        //return ( Math.sqrt( ( obj2.x-obj1.x ) * ( obj2.x-obj1.x )  + ( obj2.y-obj1.y ) * ( obj2.y-obj1.y ) ) < ( obj1.radius + obj2.radius )); 
     },
    getCollisionAxis: function (obj1,obj2){
        var px = 0,
        py = 0,
        o1hWidth = (obj1.width / 2),
        o1hHeight = (obj1.height / 2),
        o2hWidth = (obj2.width / 2),
        o2hHeight = (obj2.height / 2);
        if(obj1.collisionType === 'Circle'){
            o1hWidth = 0,
            o1hHeight = 0;
        }
        if(obj2.collisionType === 'Circle'){
            o2hWidth = 0,
            o2hHeight = 0;
        }
        // check if both box are overlaping
        // compute delta between obj1 & obj2
        var dx = obj1.x + o1hWidth - obj2.x - o2hWidth,
        dy = obj1.y + o1hHeight - obj2.y - o2hHeight;
        //compute penetration depth for both axis
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
        return {x:px,y:py};
    }
})