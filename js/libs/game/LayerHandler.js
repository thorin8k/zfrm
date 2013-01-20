 function drawTiles(oTileMap,oImage,oContext) {
		// Ancho (en píxeles) de cada tile. En nuestro ejemplo: 32.
	var nTileWidth = oTileMap.tilewidth,
		// Altura (en píxeles) de cada tile. En nuestro ejemplo: 32.
		nTileHeight = oTileMap.tileheight,
		// Ancho (en píxeles) total del mapa. En nuestro ejemplo: 32 * 8 = 256.
		nMapWidth = nTileWidth * oTileMap.width,
		// Capas de nuestro mapa.
		aLayers = oTileMap.layers,
		// Número de capas de nuestro mapa. En nuestro ejemplo: 2 (una para
		// el suelo, otro para los elementos de la habitación).
		aLayersLen = aLayers.length,
		// Número de columnas que tiene la imágen.
		nImageCols = oImage.width / nTileWidth,
		// Número de celdas que tiene la imágen.
		nImageRows = oImage.height / nTileHeight,
		// Variable donde guardaremos la información de la capa actual.
		oCurrentLayer,
		oCurrentLayerLen,
		// Variables para el control de los bucles.
		nTileId,
		nSourceX,
		nSourceY,
		nDataCount,
		nCount,
		nAxisX,
		nAxisY;
 
	// Vamos a pintar todos los elementos de una capa, y al finalizar, pasaremos a la siguiente capa.
	// Recordemos que cada capa contiene un conjunto de elementos. En nuestro caso, la primera
	// capa contiene el suelo, y la segunda capa elementos como las sillas, mesas, etc.
	for (nCount = 0; nCount < aLayersLen; nCount += 1) {
 
		oCurrentLayer = aLayers[nCount].data;
		oCurrentLayerLen = oCurrentLayer.length;
 
		// Variables para controlar en qué posición del Canvas debemos pintar.
		nAxisX = 0;
		nAxisY = 0;
 
		for (nDataCount = 0; nDataCount < oCurrentLayerLen; nDataCount += 1) {
 
			// nTileId contiene el ID del tile que queremos dibujar.
			nTileId = oCurrentLayer[nDataCount];
			// Necesitamos saber en que columna de la imagen se encuentra el tile
			// con nTileId. Restamos una unidad ya que los arrays empiezan por el índice 0,
			// en lugar del índice 1.
			nSourceX = Math.floor(nTileId % nImageCols) -1;
 
			// Si nSourceX === -1 quiere decir que la ID del tile era 0, por lo tanto, es un tile
			// donde no debemos pintar nada. Si es distinto a -1, entonces hay que pintar.
			if (nSourceX !== -1) {
				// Hasta el momento nSourceX contenía la columna, pero necesitamos saber la posición
				// en píxeles de dicha columna.
				nSourceX *= nTileWidth;
 
				// Igual que con nSourceX, necesitamos saber la fila dentro de la imágen en la que se
				// encuentra el nTileId.
				nSourceY = Math.floor(nTileId / nImageCols);
				// Ahora tenemos la fila, y necesitamos saber la posición en píxeles de dicha fila.
				nSourceY *= nTileHeight;
 
				// Finalmente pintamos el tile.
				oContext.drawImage(oImage, nSourceX, nSourceY, nTileWidth, nTileHeight, nAxisX, nAxisY, nTileWidth, nTileHeight);
			}
 
			// Incrementamos la posición X donde vamos a pintar el próximo tile.
			nAxisX += nTileWidth;
			// Si la posición X es igual al ancho del mapa, quiere decir que debemos
			// pasar a dibujar la siguiente fila. Por lo tanto reseteamos la X e
			// incrementamos Y.
			if (nAxisX === nMapWidth) {
				nAxisX = 0;
				nAxisY += nTileHeight;
			}
		}
	}
};
