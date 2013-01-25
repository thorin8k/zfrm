/**
 * Devuelve la posición de un punto respecto a otro
 * returns [top,bottom,left,right]
 */
function getPointPositionFromPoint(obj1,obj2){
    var hWidth1= Math.floor(obj1.width/2),
    hHeight1= Math.floor(obj1.height/2),
    hWidth2= Math.floor(obj2.width/2),
    hHeight2= Math.floor(obj2.height/2);
    
    
    if(obj1.x < obj2.x && (obj1.y > (obj2.y + obj2.height) || obj1.y + obj1.height > obj2.y)){
        return 'left';
    }
    
    
    return null;
}

