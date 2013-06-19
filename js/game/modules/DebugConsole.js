/* 
 * TODO Cuadrado con consola de debug y que acepte comandos? ^^
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
       $('body').append("<div id='console'><b>Consola de debug:</b><br/><textarea id='console-text'></textarea></div>");
       //TODO Add textArea to enter commands
   },
   appendMessage:function(notification){
       //TODO Add message to messages and set to textArea
       this.message += notification.data+"\n";
       $("#console-text").val(this.message);
       $("#console-text").attr('readonly','readonly');
        moveCursorToEnd(document.getElementById("console-text"));
       
   }
   
});

