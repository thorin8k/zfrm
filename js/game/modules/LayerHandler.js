 /**
  * 
  * Utilizando un mapa JSON generado por el programa Tiled.
  * 
  * Lo convierte en una colección de objetos utilizable por el framework
  * 
  * 
  * FIXME : en ocasiones genera algun tile extraño, revisar si es culpa de esto
  * o del propio tiled
  */
 var LayerHandler = IModule.extend({
    image: null,
    tileMap: null,
    mapWidth: '',
    mapHeight: '',
    tileWidth: '',
    tileHeight: '',
    layers: '',
    imageCols: '',
    imageRows: '',
    nTileId: '',
    nSourceX: '',
    nSourceY: '',
    nDataCount: '',
    nAxisX: '',
    nAxisY: '',
    layerList: [],
    init:function(jsonMap){
        this.setTileMap(jsonMap);
    },
    loadModule:function(tools){
        this.tools = tools;
        this.tools.messageContainer.listen(["#loadMap#"], this.preloadMap, this);
        this.tools.messageContainer.listen(["#draw#"], this.loadMap, this);
    },
    setTileMap:function(jsonMap){
        this.layerList= [];
        this.tileMap = jsonMap;
        
    },
    preloadMap:function(notification){
        //TODO loading screen? no creo que merezca la pena, el tiempo de carga es infimo
        this.tools.game.clearLandscape();
        //this.tools.game.addLayer('loadingScreen',new LoadingScreen());
        this.tools.game.actualMap = notification.mapName;
        this.setTileMap(this.tools.mapList[notification.mapName]);
        this.canLoadMap = true;
        game.messageContainer.speak({
            message : "#debugMessage#",
            data : "Loading Map: "+notification.mapName
        });
    },
    loadMap: function(notification){
        
        if(!this.canLoadMap || this.tileMap === null || this.tileMap === undefined){
            return;
        }
        
        this.image = this.tools.imageList[this.tileMap.tilesets[0].name];
        this.tileWidth = this.tileMap.tilewidth;
        this.tileHeight = this.tileMap.tileheight;
        this.mapWidth = this.tileWidth * this.tileMap.width;
        this.mapHeight = this.tileHeight * this.tileMap.height;
        this.layers = this.tileMap.layers;
        this.imageCols = this.tileMap.tilesets[0].imagewidth / this.tileWidth;
        this.imageRows = this.tileMap.tilesets[0].imageheight / this.tileHeight;
        
        var currentLayer,
        currentLayerLen = this.layers.length,
        nCount = 0;
        // Vamos a pintar todos los elementos de una capa, y al finalizar, pasaremos a la siguiente capa.
	// Recordemos que cada capa contiene un conjunto de elementos. En nuestro caso, la primera
	// capa contiene el suelo, y la segunda capa elementos como las sillas, mesas, etc.
	while (nCount < currentLayerLen) { 
            currentLayer = this.layers[nCount];
            //en función del tipo creamos un tipo de capa o otro
            if(this.layers[nCount].type === 'tilelayer'){
                this.addLandscapeLayer(currentLayer,currentLayer.data.length);
            }else if(this.layers[nCount].type === 'objectgroup'){
                this.addObjectLayer(currentLayer);
            }
            //this.tools.game.getLayer('loadingScreen').setValue(nCount*300/currentLayerLen);
            nCount++;
	}
         for(var lay in this.layerList){
             //añadimos toda la colección a las capas del juego
             this.tools.game.addLayer(this.layerList[lay].__id,this.layerList[lay]);
         }
         this.canLoadMap = false;
         //this.tools.game.removeLayer('loadingScreen');
         //ordenación en el eje z
         this.tools.game.layerList.sort(function(oObjA, oObjB) {
               return oObjA.z - oObjB.z;
         });
         //center on screen
         this.tools.game.callObjectMethods('centerOnScreen',null);
         //After load
         game.messageContainer.speak({message : "#reloadDbg#"});
     },
     getActualTileset:function(tileId){
         var i=0,
            length = this.tileMap.tilesets.length;
    
         while(i<length){
             var actualTileset = this.tileMap.tilesets[i];
             var nextTileset = this.tileMap.tilesets[i+1];
             if(tileId >=  actualTileset.firstgid){
                 if(nextTileset === undefined || tileId <= nextTileset.firstgid){
                     this.image = this.tools.imageList[actualTileset.name];
                     this.imageCols = actualTileset.imagewidth / this.tileWidth;
                     this.imageRows = actualTileset.imageheight / this.tileHeight;
                     return tileId-actualTileset.firstgid+1;                     
                 }
             }
             i++;
         }
     },
     addLandscapeLayer: function(currentLayer,currentLayerDataLen){
         // Variables para controlar en qué posición del Canvas debemos pintar.
        this.nAxisX = 0;
        this.nAxisY = 0;
        var nDataCount = 0,
        layer = new LandscapeLayer();

        while(nDataCount < currentLayerDataLen) {

            // nTileId contiene el ID del tile que queremos dibujar.
            this.nTileId = this.getActualTileset(currentLayer.data[nDataCount]);
            
            // Necesitamos saber en que columna de la imagen se encuentra el tile
            // con nTileId. Restamos una unidad ya que los arrays empiezan por el índice 0,
            // en lugar del índice 1.
            this.nSourceX = Math.floor((this.nTileId-1) % this.imageCols);

            // Si nSourceX === -1 quiere decir que la ID del tile era 0, por lo tanto, es un tile
            // donde no debemos pintar nada. Si es distinto a -1, entonces hay que pintar.
            if (this.nSourceX !== -1) {
                // Hasta el momento nSourceX contenía la columna, pero necesitamos saber la posición
                // en píxeles de dicha columna.
                this.nSourceX *= this.tileWidth; 
                

                // Igual que con nSourceX, necesitamos saber la fila dentro de la imágen en la que se
                // encuentra el nTileId.
                this.nSourceY = Math.floor((this.nTileId-1) / this.imageCols);
                // Ahora tenemos la fila, y necesitamos saber la posición en píxeles de dicha fila.
                this.nSourceY *= this.tileHeight;
                
                
                // Finalmente pintamos el tile.
                var cell = new ImageObj(this.image);
                cell.x = this.nAxisX;
                cell.y = this.nAxisY;
                cell.width = this.tileWidth;
                cell.height = this.tileHeight;
                cell.nSourceX = this.nSourceX;
                cell.nSourceY = this.nSourceY;
                layer.addImage(cell);
            }

            // Incrementamos la posición X donde vamos a pintar el próximo tile.
            this.nAxisX += this.tileWidth;
            // Si la posición X es igual al ancho del mapa, quiere decir que debemos
            // pasar a dibujar la siguiente fila. Por lo tanto reseteamos la X e
            // incrementamos Y.
            if (this.nAxisX === this.mapWidth) {
                this.nAxisX = 0;
                this.nAxisY += this.tileHeight;
            }
            nDataCount++;
        }
        layer.__id= currentLayer.name;
        
        for(var i in currentLayer.properties){
            var prop = currentLayer.properties[i];
            if(!isNaN(prop)){
                layer[i] = parseInt(prop);
            }else{
                layer[i] = prop;
            }
        }
        layer.width = this.mapWidth;
        layer.height = this.mapHeight;
        layer.preRender();
        
        this.layerList.push(layer);
     },
     addObjectLayer:function(currentLayer){
         //añade una capa de objetos.
         var nDataCount = 0,
                 layLength = currentLayer.objects.length,
                 layer = new ObjectLayer();
         layer.tools = this.tools;
         //recorre todos los objetos en la capa y los genera
         while (nDataCount < layLength) {
             var currObj = currentLayer.objects[nDataCount],
                object = new window[currObj.type](this.tools);
             
             object.x=currObj.x;
             object.y=currObj.y;
             object.width=currObj.width;
             object.height=currObj.height;
             for(var i in currObj.properties){
                 var prop = currObj.properties[i];
                 if(!isNaN(prop)){
                    object[i] = parseInt(prop);
                }else{
                    object[i] = prop;
                }
             }
             layer.addObject(currObj.name,object);
             nDataCount++;
         }
         layer.__id= currentLayer.name;
         //establece sus propiedades
         for(var i in currentLayer.properties){
            var prop = currentLayer.properties[i];
            if(!isNaN(prop)){
                layer[i] = parseInt(prop);
            }else{
                layer[i] = prop;
            }
         }
         //lo añadimos a la colleción   
         this.layerList.push(layer);
     }
     
 });
 