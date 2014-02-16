/* 
 * Cuadrado con consola de debug y que acepta comandos ^^
 */
var DebugConsole = IModule.extend({
   message:"",
   start:function(){ 
        if(this.tools.settings.debug){
            this.constructDbgView();
        }
        
   },
   loadModule: function(tools){
        this.tools = tools;
        tools.messageContainer.listen(["#prestart#"], this.start, this);
        tools.messageContainer.listen(["#debugMessage#"],this.appendMessage,this);
   },
   constructDbgView:function(){
       $('body').append("<div id='console'><b>Consola de debug:</b><br/><textarea id='console-text'></textarea><br/><input id='consoleInput' type='text' value=''/></div>");
       var self = this;
       $('#consoleInput').keyup(function(e) {
            var keycode = (e.keyCode ? e.keyCode : e.which);
            if(keycode == 13) {
                self.executeCommand($(this).val());
                
                $(this).val('');
            }
        });
   },
   appendMessage:function(notification){
       
       this.message += notification.data+"\n";
       $("#console-text").val(this.message);
       $("#console-text").attr('readonly','readonly');
        moveCursorToEnd(document.getElementById("console-text"));
       
   },
    executeCommand: function(instruction){

        var command ='', param = '';
        if(instruction.indexOf('/') !== -1){
            command = instruction.substring(0,instruction.indexOf('/')),
            param = instruction.substring(instruction.indexOf('/')+1,instruction.length);
            command = trim(command);
        }else{
            command = instruction;
        }
        switch(command){
            case 'help':
                var help = 'Comandos posibles:\n';
                help += '-> loadMap /mapName || Carga un mapa \n';
                help += '-> reload || Recarga el mapa actual\n';
                this.appendMessage({data: help});
                break;
            case 'loadMap':
                this.tools.messageContainer.speak({
                    message : "#loadMap#",
                    mapName : param
                });
                break;
            case 'reload':
                this.tools.messageContainer.speak({
                    message : "#loadMap#",
                    mapName : this.tools.game.actualMap
                });
                break;
            default:
                this.appendMessage({data: 'Comando desconocido.'});
                break;
                
        }
    }
   
});

