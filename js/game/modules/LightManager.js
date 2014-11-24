/**
 *  Oscuridad: 0 - 99 ( 0= Mas claro|| 99 = Mas oscuro)
 *  
 *  Intensidad Luces: 0-99 ( 0 mas oscuro || 99 mas claro)
 * 
 * @type @exp;IModule@call;extend
 */
var LightManager = IModule.extend({
    z:25,
    fogCanvas: null,
    //Oscuridad
    dark:99,
    turnOff: false,
    enabled: true,
    lightList:[],
    addSubscription:function(notification){
        if(!this.getSubByObjId(notification.obj.__id)){
            this.lightList.push(notification.obj);
        }
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
        tools.messageContainer.listen(["#changeDarkness#"], this.setDark, this);
        tools.messageContainer.listen(["#turnTheLights#"], this.turnLights, this);
    },
    setDark: function(notification){
        this.dark = notification.dark;
    },
    turnLights: function(notification){
        if(this.turnOff){
            this.turnOff = false;
        }else{
            this.turnOff = true;
        }
    },
    unloadModule: function(){
        if(this.tools!=null){
            this.tools.messageContainer.unlisten(["#lightSubs#"], this);
            this.tools.messageContainer.unlisten(["#draw#"], this);
            this.tools.messageContainer.unlisten(["#changeViewPort#"], this);
            this.tools.messageContainer.unlisten(["#start#"], this);
            this.tools.messageContainer.unlisten(["#changeDarkness#"], this);
            this.tools.messageContainer.unlisten(["#turnTheLights#"], this);
        }
    },
    draw: function(){
        if(this.fogCanvas !== null && this.enabled){
            this.fogCanvas.width = this.tools.canvas.main.width;
            this.fogCanvas.height = this.tools.canvas.main.height;
            var fogCanvasContext = this.fogCanvas.getContext('2d');

            fogCanvasContext.beginPath();
            fogCanvasContext.rect(0,0,this.tools.canvas.main.width, this.tools.canvas.main.height);
            fogCanvasContext.fillStyle = "rgba(0, 0, 0, "+parseFloat("0."+this.dark)+")";
            fogCanvasContext.closePath();
            fogCanvasContext.fill();
            if(!this.turnOff){
                this.computeLights(fogCanvasContext);
            }

        
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
            if(light.screenCenter === "true"){
                light.x+= notification.pos.x;
                light.y+= notification.pos.y;
            }
        }
     }
    
});

