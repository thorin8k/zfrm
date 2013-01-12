var Game = Class.extend({
    
    init: function(canvas, context, linkObj){
        //Bucle principal de juego
        setInterval(function() {
            // Borramos lo dibujado
            context.clearRect(0, 0, canvas.width, canvas.height);
            //Dibujar a link
            context.drawImage(linkObj.image,linkObj.facing*30,0,16,16,linkObj.x,linkObj.y,16,16);

        }, 1000 / 60); 
    },
           
});

