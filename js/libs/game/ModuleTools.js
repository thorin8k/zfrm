/**
 * @Author Thorin8k
 * 
 * Contiene objetos necesarios para los módulos y pertenecientes al hilo principal
 */
var ModuleTools = Class.extend({
    messageContainer : null, 
    canvas : null,
    settings : [],
    canvasText: null,
    game:null,
    
    init: function(game){
        
        this.messageContainer = game.messageContainer;
        this.canvas = game.oCanvas;
        this.settings = game.settings;
        this.canvasText = game.canvasText;
        this.game = game;
    }
});
