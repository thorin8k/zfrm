// Nuestras variables
var canvas, ctx, link;

var linkObj = {x: 3*16, y: 3*16, nx: 3*16, ny: 3*16, moving: false, speed: 4, frame: 0, facing: 0, life: 3};

$(document).ready(function(){
    link = new Image();
    link.src = "./img/loz.png";
    canvas = $('#canvas');
    ctx = canvas[0].getContext('2d'); 
      
})

//Bucle principal de juego
setInterval(function() {
    // Borramos lo dibujado
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //Dibujar a link
    ctx.drawImage(link,linkObj.facing*30,0,16,16,linkObj.x,linkObj.y,16,16);
    
}, 1000 / 60); 


function moveLink(dir){
        linkObj.moving = true;
        if (dir == 'up'){ linkObj.ny-=8; linkObj.facing=2; }
        if (dir == 'down'){ linkObj.ny+=8; linkObj.facing=0; }
        if (dir == 'left'){ linkObj.nx-=8; linkObj.facing=1; }
        if (dir == 'right'){ linkObj.nx+=8; linkObj.facing=3; }
        drawLink();
}

function drawLink(){
        ctx.clearRect(linkObj.x,linkObj.y,16,16);
        ctx.save();
        if (linkObj.ny>linkObj.y){ linkObj.y+=linkObj.speed; }
        if (linkObj.nx<linkObj.x){ linkObj.x-=linkObj.speed; }
        if (linkObj.ny<linkObj.y){ linkObj.y-=linkObj.speed; }
        if (linkObj.nx>linkObj.x){ linkObj.x+=linkObj.speed; }
        if (linkObj.frame == 0){
                ctx.drawImage(link,linkObj.facing*30,0,16,16,linkObj.x,linkObj.y,16,16);
                linkObj.frame = 1;
        }else{
                ctx.drawImage(link,linkObj.facing*30,30,16,16,linkObj.x,linkObj.y,16,16);
                linkObj.frame = 0;
        }
        ctx.restore();
        if ((linkObj.x == linkObj.nx) && (linkObj.y == linkObj.ny)){
                linkObj.moving = false;
        }else{
                setTimeout(drawLink,100);
        }
}

function doKeyDown(evt){
        if ((linkObj.life>0) && (linkObj.moving == false)){
                if (evt.keyCode == 38){ moveLink('up'); }
                if (evt.keyCode == 40){ moveLink('down'); }
                if (evt.keyCode == 37){ moveLink('left'); }
                if (evt.keyCode == 39){ moveLink('right'); }
                if (evt.keyCode == 32){ drawSword(); }
        }
}
window.addEventListener('keydown',doKeyDown,true);

function drawSword(){
    if (linkObj.moving == false){
            linkObj.moving = true;
            ctx.clearRect(linkObj.x,linkObj.y,16,16);
            ctx.drawImage(link,linkObj.facing*30,60,16,16,linkObj.x,linkObj.y,16,16);
            linkObj.sx = linkObj.x; linkObj.sy = linkObj.y
            if (linkObj.facing == 0){ linkObj.sy += 16; }
            if (linkObj.facing == 1){ linkObj.sx -= 16; }
            if (linkObj.facing == 2){ linkObj.sy -= 16; }
            if (linkObj.facing == 3){ linkObj.sx += 16; }
            ctx.drawImage(link,linkObj.facing*30,195,16,16,linkObj.sx,linkObj.sy,16,16);
            //if ((linkObj.sx == badObj.x) && (linkObj.sy == badObj.y)){ badObj.life-=1; }
            setTimeout(drawSword,100);
    }else{
            ctx.clearRect(linkObj.sx,linkObj.sy,16,16);
            drawLink();
            linkObj.moving = false;
    }
}