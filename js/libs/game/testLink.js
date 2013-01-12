//Config Constants
IMG_PATH = "img/";
CHAR_IMG= "loz.png";
SPRT_D = 32;


var linkObj;

$(document).ready(function(){    
    var canvas = $('#canvas');
    var context = canvas[0].getContext('2d'); 
            
    linkObj = new Character(context);    
    var game = new Game(canvas,context,linkObj);
});

function keyHandler(evt){
    if ((linkObj.life>0) && (linkObj.moving == false)){
        if (evt.keyCode == 38){ linkObj.moveLink('up'); }
        if (evt.keyCode == 40){ linkObj.moveLink('down'); }
        if (evt.keyCode == 37){ linkObj.moveLink('left'); }
        if (evt.keyCode == 39){ linkObj.moveLink('right'); }
        if (evt.keyCode == 32){ linkObj.drawSword(); }
    }
}
window.addEventListener('keydown',keyHandler,true);

