var MainMenu = Class.extend({
    z: 10,
    tools: null,
    menuCanvas: null,
    showing: false,
    start:function(tools){
        this.tools = tools;
        this.menuCanvas = document.createElement('canvas');
        this.show();
    },
    draw: function(canvas){
        if(this.showing && this.menuCanvas !== null && canvas !== null){
            this.menuCanvas.width = canvas.main.width;
            this.menuCanvas.height = canvas.main.height;
            var menuCanvasContext = this.menuCanvas.getContext('2d');

            menuCanvasContext.beginPath();
            menuCanvasContext.rect(0,0,canvas.main.width, canvas.main.height);
            menuCanvasContext.fillStyle = 'red';
            menuCanvasContext.closePath();
            menuCanvasContext.fill();
            
            
            this.tools.canvas.canvasText.config({
                canvas: this.menuCanvas,
                context: menuCanvasContext,
                fontSize: '20px',
                fontWeight: 'bold',
                fontColor: 'black',
                lineHeight: "22"
            });
            this.tools.canvas.canvasText.drawText({
                text:'Prueba de Menu! \n\ Pulsa ESPACIO para continuar',
                x: (this.menuCanvas.width / 2)-100,
                y: (this.menuCanvas.height / 2),
                boxWidth: 300

            });
            
            canvas.bufferContext.drawImage(this.menuCanvas,0,0);
        }
    },
    show: function(){
        this.showing = true;
        //this.tools.game.getModule('LightManager').dark = 0;
    },
    hide: function(){
        this.showing = false;
        //this.tools.game.getModule('LightManager').dark = 80;
    },
    keydown : function (event) {
        if (event.keyCode === KEY_ACTION) {
            this.hide();
        }
    }
})

