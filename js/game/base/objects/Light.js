/**
 * Clase encargada de pintar una luz circular
 */
var Light = Class.extend({
    size:0,
    intensity: 0,
    x: 0,
    y: 0,
    tools: null,
    start:function(tools){
        this.tools = tools;
        //Se utiliza para los objetos añadidos directamente a las capas y que no dependen de otro objeto
        this.tools.messageContainer.speak({
            message : "#lightSubs#",
            obj : this
        });
    },
    init: function(id,x,y,size,intensity,tools,screenCenter){
        this.__id = id;
        this.x = x;
        this.y = y;
        this.size = size;
        this.intensity = intensity;
        this.tools = tools;
        this.screenCenter = screenCenter;
        
        if(this.tools != null){
            //En este punto los objetos light añadidos directamente a las capas no disponen de una construcción
            //estandar, por lo que no disponen del sandbox de modulos.
            //Sin embargo los que dependen de un objeto padre si que son construidos de manera estandar y si que 
            //se realiza esta inicialización
            this.tools.messageContainer.speak({
                message : "#lightSubs#",
                obj : this
            });
        }
    },
    drawLight: function(canvasCtx){
        var radialGradient1 = canvasCtx.createRadialGradient(this.x, this.y, 20, this.x, this.y, this.size);

        radialGradient1.addColorStop(0, 'rgba(0,0,0,'+parseFloat(this.intensity/100)+')');
        radialGradient1.addColorStop(1, 'rgba(0,0,0,0)');

        canvasCtx.beginPath();
        canvasCtx.arc(this.x, this.y, this.size, 0, 2 * Math.PI, false);
        canvasCtx.fillStyle = radialGradient1;
        canvasCtx.closePath();
        canvasCtx.fill();
    },
    updatePos: function(x,y){
        this.x = x;
        this.y = y;
    }
    
});


