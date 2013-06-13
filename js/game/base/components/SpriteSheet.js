/**
 * 
 * Clase de gestión de sprites
 * 
 * @author Thorin8k
 */
var SpriteSheet = Class.extend({
    _sprites: [],
    _width: 0,
    _height: 0,

    init: function(data) {
        this._height = data.height;
        this._width = data.width;
        this._sprites = data.sprites;
    },

    getOffset: function(spriteName) {
        //Go through all sprites to find the required one
        for(var i = 0, len = this._sprites.length; i < len; i++) {
            var sprite = this._sprites[i];

            if(sprite.name == spriteName) {
                //To get the offset, multiply by sprite width
                //Sprite-specific x and y offset is then added into it.
                return {
                    x:  this._width*sprite.x,
                    y: this._height*sprite.y,
                    width: this._width,
                    height: this._height
                };
            }
        }

        return null;
    } 
});

