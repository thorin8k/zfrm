/**
 * Clase de animación
 * 
 * @author Thorin8k
 */
var Animation = Class.extend({
    _frames: [],
    _frame: null,
    _frameDuration: 0,
    _sprites: null,
    init: function(data,sprites) {
        this._frames = data;
 
        //Initialize the first frame
        this._frameIndex = 0;
        this._frameDuration = data[0].time;
        this._sprites = sprites;
    },
 
    animate: function(deltaTime) {
        //Reduce time passed from the duration to show a frame        
        this._frameDuration -= deltaTime;
 
        //When the display duration has passed
        if(this._frameDuration <= 0) {
            //Change to next frame, or the first if ran out of frames
            this._frameIndex++;
            if(this._frameIndex == this._frames.length) {
                this._frameIndex = 0;
            }
 
            //Change duration to duration of new frame
            this._frameDuration = this._frames[this._frameIndex].time;
        }
    },
 
    getSprite: function() {
        //Return the sprite for the current frame
        return this._sprites.getOffset(this._frames[this._frameIndex].sprite);
    }
})


