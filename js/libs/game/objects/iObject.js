/**
 * @Author Thorin8k
 * Clase rectangulo, pinta un rectangulo en las coordenadas indicadas.
 * 
 * Este rectangulo puede moverse por la pantalla con las flechas.
 * 
 */
var IObject= Class.extend({
    x: 15,
    y: 15,
    width: 25,
    height: 25,
    speed: 5,
    moving: false, 
    update:function(){},
    draw : function (canvas) {},

});



