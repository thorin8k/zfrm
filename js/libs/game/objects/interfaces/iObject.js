/**
 * @Author Thorin8k
 * Clase rectangulo, pinta un rectangulo en las coordenadas indicadas.
 * 
 * Este rectangulo puede moverse por la pantalla con las flechas.
 * 
 */
var IObject= Class.extend({
    x: 0,
    y: 0,
    z: 0,
    width: 0,
    height: 0,
    speed: 5,
    moving: false, 
    update:function(){},
    draw : function (canvas) {}

});



