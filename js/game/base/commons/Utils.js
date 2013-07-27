/**
 * Funciones útiles.
 * 
 * @author Thorin8k
 */
/**
 * Limpia los valores vacios de un array
 * 
 * @param {type} actual
 * @returns {Array}
 */
function cleanArray(actual){
//  var newArray = new Array();
//  for(var i = 0; i<actual.length; i++){
//      if (actual[i]){
//        newArray.push(actual[i]);
//    }
//  }
//  return newArray;
    return actual.filter(Boolean);
}

function isInArray(array,index){
    for(var key in array){
        if(array[key] === index){
            return key;
        }
    }
    return 0;
}

function moveCursorToEnd(el) {
    if (typeof el.selectionStart === "number") {
        el.selectionStart = el.selectionEnd = el.value.length;
        el.scrollTop = el.scrollHeight;
    } else if (typeof el.createTextRange !== "undefined") {
        el.focus();
        var range = el.createTextRange();
        range.collapse(false);
        range.select();
        //Nullify pattern
        range = null;
    }
    
}


/*
 * Trim Functions
 */
function ltrim(str, filter) {
  var i = str.length;
  filter || ( filter = '' );
  for (var k = 0; k < i && filtering(str.charAt(k), filter); k++);
  return str.substring(k, i);
}
function rtrim(str, filter) {
  filter || ( filter = '' );
  for (var j = str.length - 1; j >= 0 && filtering(str.charAt(j), filter); j--);          
  return str.substring(0, j + 1);
}
function trim(str, filter) {
  filter || ( filter = '' );
  return ltrim(rtrim(str, filter), filter);
}
function filtering(charToCheck, filter) {
  filter || ( filter = " \t\n\r\f" );
  return (filter.indexOf(charToCheck) != -1);
}