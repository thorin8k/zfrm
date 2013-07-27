/**
 *  Oscuridad: 0 - 100 ( 0= Mas claro|| 100 = Mas oscuro)
 *  
 *  Intensidad Luces: 0-100 ( 0 mas oscuro || 100 mas claro)
 * 
 * @type @exp;IModule@call;extend
 */
var LightManager = IModule.extend({
    z:15,
    fogCanvas: null,
    //Oscuridad
    dark:80,
    lightList:[],
    addSubscription:function(notification){
        this.lightList.push(notification.obj);  
    },
    start:function(){
        this.fogCanvas = document.createElement('canvas');
        
    },
    getSubByObjId:function(id){
        var i = 0,
        lightLength = this.lightList.length;
        while(i < lightLength){
            var light = this.lightList[i];
            if(light != null && light.__id === id){
                return light;
            }
            i++;
        }
    },
    loadModule: function(tools){
        this.tools = tools;
        tools.messageContainer.listen(["#lightSubs#"], this.addSubscription, this);
        tools.messageContainer.listen(["#draw#"], this.draw, this);
        tools.messageContainer.listen(["#changeViewPort#"], this.updateViewportObjects, this);
        tools.messageContainer.listen(["#start#"], this.start, this);
        
    },
    unloadModule: function(){
        if(this.tools!=null){
            this.tools.messageContainer.unlisten(["#lightSubs#"], this);
            this.tools.messageContainer.unlisten(["#draw#"], this);
            this.tools.messageContainer.unlisten(["#changeViewPort#"], this);
            this.tools.messageContainer.unlisten(["#start#"], this);
        }
    },
    draw: function(){
        if(this.fogCanvas !== null){
            this.fogCanvas.width = this.tools.canvas.main.width;
            this.fogCanvas.height = this.tools.canvas.main.height;
            var fogCanvasContext = this.fogCanvas.getContext('2d');

            fogCanvasContext.beginPath();
            fogCanvasContext.rect(0,0,this.tools.canvas.main.width, this.tools.canvas.main.height);
            fogCanvasContext.fillStyle = "rgba(0, 0, 0, "+parseFloat("0."+this.dark)+")";
            fogCanvasContext.closePath();
            fogCanvasContext.fill();
            this.computeLights(fogCanvasContext);
        
            this.tools.canvas.bufferContext.drawImage(this.fogCanvas,0,0);
        }
    },
    computeLights:function(fogCanvasContext){
        fogCanvasContext.globalCompositeOperation = "destination-out";
        var i = 0;
        while(i<this.lightList.length){
            var light = this.lightList[i];
            //Cada luz se encarga de pintarse a si misma
            light.drawLight(fogCanvasContext);            
            i++;
        }
    },
     updateViewportObjects:function(notification){
        for(var i = 0;i<this.lightList.length;i+=1){
            var light = this.lightList[i];
            if(light.screenCenter){
                light.x+= notification.pos.x;
                light.y+= notification.pos.y;
            }
        }
     }
    
});

