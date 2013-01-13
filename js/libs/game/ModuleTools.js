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
    
    init: function(messageContainer,canvas,settings,canvasText){
        this.messageContainer = messageContainer;
        this.canvas = canvas;
        this.settings = settings;
        this.canvasText = canvasText;
    }
});
