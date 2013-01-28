 /**
  * 
  * Utilizando un mapa JSON generado por el programa Tiled.
  * 
  * Lo convierte en una colección de objetos utilizable por el framework
  * 
  */
 var LayerHandler = IModule.extend({
    image: null,
    tileMap: '',
    mapWidth: '',
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
        this.tileMap = jsonMap;

    },
    loadModule:function(tools){
        this.tools = tools;
        this.image = new Image();
        this.image.src = this.tileMap.tilesets[0].image
        this.tileWidth = this.tileMap.tilewidth;
        this.tileHeight = this.tileMap.tileheight;
        this.mapWidth = this.tileWidth * this.tileMap.width;
        this.layers = this.tileMap.layers;
        this.imageCols = this.tileMap.tilesets[0].imagewidth / this.tileWidth;
        this.imageRows = this.tileMap.tilesets[0].imageheight / this.tileHeight;
        
        this.tools.messageContainer.listen(["#start#"], this.parseFromJSON, this);
    },
    parseFromJSON: function(){
         
        var currentLayer;
        var currentLayerLen;
        // Vamos a pintar todos los elementos de una capa, y al finalizar, pasaremos a la siguiente capa.
	// Recordemos que cada capa contiene un conjunto de elementos. En nuestro caso, la primera
	// capa contiene el suelo, y la segunda capa elementos como las sillas, mesas, etc.
	for (var nCount = 0; nCount < this.layers.length; nCount += 1) { 
            currentLayer = this.layers[nCount];
            
            if(this.layers[nCount].type === 'tilelayer'){
                this.addLandscapeLayer(currentLayer,currentLayer.data.length);
            }else if(this.layers[nCount].type === 'objectgroup'){
                this.addObjectLayer(currentLayer);
            }
            
	}
        var index = 0;
         for(lay in this.layerList){
             this.tools.game.addObject(this.layerList[lay].__id,this.layerList[lay]);
             index++;
         }
         
     },
     addLandscapeLayer: function(currentLayer,currentLayerDataLen){
         // Variables para controlar en qué posición del Canvas debemos pintar.
        this.nAxisX = 0;
        this.nAxisY = 0;
        var layer = new LandscapeLayer();
        for (var nDataCount = 0; nDataCount < currentLayerDataLen; nDataCount += 1) {

            // nTileId contiene el ID del tile que queremos dibujar.
            this.nTileId = currentLayer.data[nDataCount];
            // Necesitamos saber en que columna de la imagen se encuentra el tile
            // con nTileId. Restamos una unidad ya que los arrays empiezan por el índice 0,
            // en lugar del índice 1.
            this.nSourceX = Math.floor(this.nTileId % this.imageCols) -1;

            // Si nSourceX === -1 quiere decir que la ID del tile era 0, por lo tanto, es un tile
            // donde no debemos pintar nada. Si es distinto a -1, entonces hay que pintar.
            if (this.nSourceX !== -1) {
                // Hasta el momento nSourceX contenía la columna, pero necesitamos saber la posición
                // en píxeles de dicha columna.
                this.nSourceX *= this.tileWidth; 
                // Igual que con nSourceX, necesitamos saber la fila dentro de la imágen en la que se
                // encuentra el nTileId.
                this.nSourceY = Math.floor(this.nTileId / this.imageCols);
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
        }
        layer.__id= currentLayer.name;
        for(i in currentLayer.properties){
            var prop = currentLayer.properties[i];
            layer[i] = prop;
        }
        layer.preRender(this.tools.canvas);
        this.layerList.push(layer);
     },
     addObjectLayer:function(currentLayer){
         var layer = new ObjectLayer();
         layer.tools = this.tools;
         for (var nDataCount = 0; nDataCount < currentLayer.objects.length; nDataCount += 1) {
             var currObj = currentLayer.objects[nDataCount];
             
             var object = new window[currObj.type](this.tools);
             object.x=currObj.x;
             object.y=currObj.y;
             object.width=currObj.width;
             object.height=currObj.height;
             for(i in currObj.properties){
                 var prop = currObj.properties[i];
                 object[i] = prop;
             }
             layer.addObject(currObj.name,object);
         }
         layer.__id= currentLayer.name;
         for(i in currentLayer.properties){
            var prop = currentLayer.properties[i];
            layer[i] = prop;
            }
         this.layerList.push(layer);
     }
     
 });
 