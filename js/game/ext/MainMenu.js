var MainMenu = Class.extend({
    z: 10,
    tools: null,
    menuCanvas: null,
    showing: false,
    persistent: true,
    previousDark: null,
    selectedOption: 0,
    menuOptions: ["Comenzar", "Salir"],
    start: function (tools) {
        this.tools = tools;
        this.menuCanvas = document.createElement('canvas');
        this.show();
        console.log("showing menu");
    },
    draw: function (canvas) {
        if (this.showing && this.menuCanvas !== null && canvas !== null) {
            this.menuCanvas.width = canvas.main.width;
            this.menuCanvas.height = canvas.main.height;
            var menuCanvasContext = this.menuCanvas.getContext('2d');

            menuCanvasContext.beginPath();
            menuCanvasContext.rect(0, 0, canvas.main.width, canvas.main.height);
            menuCanvasContext.fillStyle = 'black';
            menuCanvasContext.closePath();
            menuCanvasContext.fill();

            this.tools.canvas.canvasText.config({
                canvas: this.menuCanvas,
                context: menuCanvasContext,
                fontSize: "14px",
                fontColor: "blue",
                fontFamily: "Impact",
                fontWeight: "bold",
                lineHeight: "22"
            });
            this.tools.canvas.canvasText.defineClass("title", {
                fontSize: "30px",
                fontColor: "#29a1f1",
                fontWeight: "normal"
            });
            this.tools.canvas.canvasText.defineClass("option", {
                fontSize: "20px",
                fontColor: "#006600",
                fontWeight: "normal"
            });


            this.tools.canvas.canvasText.drawText({
                text: '<class="title">Unlock-me</class>',
                x: (this.menuCanvas.width / 2) - 110,
                y: (this.menuCanvas.height * .2),
                boxWidth: 220

            });
            var optionsText = '';
            for (var i = 0; i < this.menuOptions.length; i++) {
                if (i == this.selectedOption) {
                    optionsText += '<class="option">' + this.menuOptions[i] + '</class>';
                } else {
                    optionsText += this.menuOptions[i];
                }
                optionsText += '<br/>';
            }


            this.tools.canvas.canvasText.drawText({
                text: optionsText,
                x: (this.menuCanvas.width / 2) - 90,
                y: (this.menuCanvas.height * .3),
                boxWidth: 220

            });


            canvas.bufferContext.drawImage(this.menuCanvas, 0, 0);
        }
    },
    show: function () {
        this.showing = true;
        this.tools.game.getModule('LightManager').enabled = false;
    },
    hide: function () {
        this.showing = false;
        this.tools.game.getModule('LightManager').enabled = true;
    },
    keyup: function (event) {
        if (event.keyCode === KEY_ENTER) {
            switch (this.selectedOption) {
                case 0:
                    game.messageContainer.speak({
                        message: "#loadMap#",
                        mapName: 'unlockme1'
                    });
                    this.hide();
                    this.tools.game.resumeGame();
                    break;

            }
        }
        if (event.keyCode === KEY_UP) {
            this.selectedOption -= 1;
            if (this.selectedOption < 0) {
                this.selectedOption = 0;
            }
        }
        if (event.keyCode === KEY_DOWN) {
            this.selectedOption += 1;
            if (this.selectedOption > this.menuOptions.length - 1) {
                this.selectedOption = this.menuOptions.length - 1;
            }
        }
    }
})

