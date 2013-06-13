/**
 * @Author Thorin8k 
 * Objeto encargado de las notificaciones entre módulos
 * 
 * 
 * Clase basada el framework cyanJS
 */
 var MessageContainer = Class.extend({
    speak : function (oNotification) {
        var nListenersLength,
            nCount,
            oListener,
            aMeetingList = this[oNotification.message];

        if (typeof aMeetingList !== 'undefined') {
            nListenersLength = aMeetingList.length;
            for (nCount = 0; nCount < nListenersLength; nCount += 1) {
                oListener = aMeetingList[nCount];
                if(oListener !== undefined){
                    oListener.handler.call(oListener.module, oNotification);
                }
            }
        }
    },
    listen : function (aMessages, fpHandler, oModule) {
        var sMessage = '',
            nMessage = 0,
            nMessages = aMessages.length;

        for (nMessage = 0; nMessage < nMessages; nMessage += 1) {
            sMessage = aMessages[nMessage];
            // Si el mensaje no existe, creamos un array para
            // dicho mensaje.
            if (typeof this[sMessage] === 'undefined') {
                this[sMessage] = [];
            }
            // Añadimos el módulo dentro del array del mensaje.
            this[sMessage].push({
                module: oModule,
                handler: fpHandler
            });
        }
    },
            
    unlisten:function(message,module){
        //FIXME Testing
        var sMessage = '',
            nMessage = 0,
            nMessages = message.length;
        for (nMessage = 0; nMessage < nMessages; nMessage += 1) {
            sMessage = message[nMessage];
            
            if (typeof this[sMessage] !== 'undefined') {
                var nListenersLength = this[sMessage].length;
                for (var nCount = 0; nCount < nListenersLength; nCount += 1) {
                    var oListener = this[sMessage][nCount];
                    if(oListener.module === module){
                        delete this[sMessage][nCount];
                    }
                }
            }
            
        }
    }
});
