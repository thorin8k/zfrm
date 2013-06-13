/**
 * Funciones útiles.
 * 
 * @author Thorin8k
 */

function cleanArray(actual){
  var newArray = new Array();
  for(var i = 0; i<actual.length; i++){
      if (actual[i]){
        newArray.push(actual[i]);
    }
  }
  return newArray;
}

function isInArray(array,index){
    for(var key in array){
        if(array[key] === index){
            return key;
        }
    }
    return 0;
}

