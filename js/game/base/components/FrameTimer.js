/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
var FrameTimer = Class.extend({
    _lastTick:null,
    init: function(){
        this._lastTick = (new Date()).getTime();
    },
    getSeconds: function() {
        var seconds = this._frameSpacing / 1000;
        if(isNaN(seconds)) {
            return 0;
        }

        return seconds;
    },

    tick: function() {
        var currentTick = (new Date()).getTime();
        this._frameSpacing = currentTick - this._lastTick;
        this._lastTick = currentTick;
    }
});

