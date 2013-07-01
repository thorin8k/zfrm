/**
 *  Oscuridad: 0 - 100 ( 0= Mas claro|| 100 = Mas oscuro)
 *  
 *  Luminosidad: 0-100 ( 0= Mas oscuro || 100 = Mas claro)
 *  
 *  Intensidad: 0-25 ( 0 mas oscuro || 25 mas claro)
 * 
 * 
 * @type @exp;IModule@call;extend
 */
var LightManager = IModule.extend({
    z:15,
    fogCanvas: null,
    fogCanvasContext: null,
    //Oscuridad
    dark:80,
    lightList:[],
    addSubscription:function(notification){
        var objX = notification.obj.x+notification.obj.width/2;
        var objY = notification.obj.y+notification.obj.height/2;
        
        this.lightList.push({
            x:objX,
            y:objY,
            size:notification.size,
            centerOnScreen: notification.centerOnScreen,
            //Luminosidad
            intensity: notification.intensity === undefined ? 18 : notification.intensity
        });  
    },
    start:function(){
        this.fogCanvas = document.createElement('canvas');
        
    },        
    loadModule: function(tools){
        this.tools = tools;
        tools.messageContainer.listen(["#lightSubs#"], this.addSubscription, this);
        tools.messageContainer.listen(["#draw#"], this.draw, this);
        tools.messageContainer.listen(["#changeViewPort#"], this.updateViewportObjects, this);
        tools.messageContainer.listen(["#start#"], this.start, this);
        
    },
    draw: function(){
        if(this.fogCanvas !== null){
            this.fogCanvas.width = this.tools.canvas.main.width;
            this.fogCanvas.height = this.tools.canvas.main.height;
            this.fogCanvasContext = this.fogCanvas.getContext('2d');

            this.fogCanvasContext.beginPath();
            this.fogCanvasContext.rect(0,0,this.tools.canvas.main.width, this.tools.canvas.main.height);
            this.fogCanvasContext.fillStyle = "rgba(0, 0, 0, "+parseFloat("0."+this.dark)+")";
            this.fogCanvasContext.closePath();
            this.fogCanvasContext.fill();
            this.computeLights();
        
            this.tools.canvas.bufferContext.drawImage(this.fogCanvas,0,0);
        }
    },
    computeLights:function(){
        this.fogCanvasContext.globalCompositeOperation = "destination-out";
        for(var i = 0;i<this.lightList.length;i+=1){
            var light = this.lightList[i];
            for(var j = 1;j<100;j+=1){
                if(j === light.intensity){
                    //console.log("Intensity break"+parseInt(j*100/light.size)+" @@ "+light.intensity);
                    break;
                }
                this.generateLight(light.size-j*2,light.x,light.y,parseFloat(j/100));
            }

            //this.generateLight(light.size,light.x,light.y,parseFloat("0.1"));
//            this.generateLight(light.size-1,light.x,light.y,parseFloat("0.15"));
//            this.generateLight(light.size-2,light.x,light.y,parseFloat("0.20"));
//            this.generateLight(light.size-3,light.x,light.y,parseFloat("0.25"));
//            this.generateLight(light.size-4,light.x,light.y,parseFloat("0.30"));
//            this.generateLight(light.size-5,light.x,light.y,parseFloat("0.35"));
//            this.generateLight(light.size-6,light.x,light.y,parseFloat("0.40"));
//            this.generateLight(light.size-7,light.x,light.y,parseFloat("0.45"));
//            this.generateLight(light.size-8,light.x,light.y,parseFloat("0.50"));
//            this.generateLight(light.size-9,light.x,light.y,parseFloat("0.55"));
//            this.generateLight(light.size-10,light.x,light.y,parseFloat("0.65"));
//            this.generateLight(light.size-11,light.x,light.y,parseFloat("0.70"));
//            this.generateLight(light.size-12,light.x,light.y,parseFloat("0.75"));
//            this.generateLight(light.size-13,light.x,light.y,parseFloat("0.80"));
//            this.generateLight(light.size-14,light.x,light.y,parseFloat("0.85"));
//            this.generateLight(light.size-15,light.x,light.y,parseFloat("0.90"));
//            this.generateLight(light.size-16,light.x,light.y,parseFloat("0.95"));
        }
    },
    generateLight:function(radius,x,y,dark){
        if(radius <= 0) return;
        this.fogCanvasContext.beginPath();
        this.fogCanvasContext.arc(x, y, radius, 0, 2 * Math.PI, false);
        this.fogCanvasContext.fillStyle = "rgba(0, 0, 0, "+dark+")";
        this.fogCanvasContext.closePath();
        this.fogCanvasContext.fill();
    },
     updateViewportObjects:function(notification){
        for(var i = 0;i<this.lightList.length;i+=1){
            var light = this.lightList[i];
            if(light.centerOnScreen){
                light.x+= notification.pos.x;
                light.y+= notification.pos.y;
            }
        }
     }
    
});

