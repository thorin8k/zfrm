var DebugModule = IModule.extend({
    dbgContainer: null,
    gameInfo: null,
    objList:null,
    colList:null,
    selectedObj1:null,
    selectedObj2:null,
    debugging:null,
    loadModule: function(tools){
        this.tools = tools;
        tools.messageContainer.listen(["#dbgObjInfo#"], this.getObjectInfo, this);
        tools.messageContainer.listen(["#start#"], this.start, this);
        tools.messageContainer.listen(["#draw#"], this.startChecking, this);
        
    },
    start:function(){
        
        if(this.tools.settings.debug){
            this.constructDbgView();
        }
        
    },
    getObjectInfo: function(notification){
        
        var obj = this.tools.game.getLayer('objects').getObject(notification.data);
        var txt = "<div class='object' id='object_cont"+notification.id+"' id='"+notification.data+"'>";
//        for (var myKey in obj){
//            if(Object.prototype.toString.call(obj[myKey]) !== '[object Function]'){
//                txt += (myKey +" => "+obj[myKey]) + "<br/>";
//            }
            if(obj !== null){
               txt +=  obj.toString();
            }
//        }
        txt +='</div>';
        $('#dbg_container .object_cont').children('#object_cont'+notification.id).remove();
        this.dbgContainer.children('.object_cont').append(txt);
    },
    constructDbgView:function(){
        if(this.tools.game.getLayer('objects') !== null){
            this.objList = this.tools.game.getLayer('objects').objList;
            
        }
        if(this.tools.game.getLayer('collisions') !== null){
            this.colList = this.tools.game.getLayer('collisions').objList;
            
        }
        //Game Info Container
        $('#game_info').remove();
        $('body').append('<div class="right_canvas" id="game_info"><label id="title">Game Info -</label></div>');
        this.gameInfo = $('#game_info');
        //Object Debug Container
        $('#dbg_container').remove();
        $('body').append('<div class="bottom_canvas" id="dbg_container"><label id="title">Object Dbg - </label></div>');
        this.dbgContainer = $('#dbg_container');
        
        
        
        //Btn
        this.dbgContainer.append(
            '<div class="buttons">'+
            '<input type="button" value="Trace!" id="launchDBG"/>'+
            '<input type="button" value="Stop!" id="cancelDBG"/>'+
            '<input type="button" value="Show!" id="showDBG"/>'+
            '<input type="button" value="Pause!" id="pauseGame"/>'+
            '<input type="button" value="UpdateDbg!" id="updateDBG"/>'+
            '<input type="button" value="Kill Link!" id="killLink"/>'+
            '</div>'
        );
        
        
        
        //Combo Boxes
        var select = '<option></option>';
        for (var myKey in this.objList){
            select += '<option value="'+this.objList[myKey].__id+'">'+this.objList[myKey].__id+'</option>'
            
        }
        select += '</select>';
        this.dbgContainer.append(
            '<div class="object_combos">'+
            '<label>Obj1 - </label><select id="object_selc1">'+select+
            '<label>Obj2 - </label><select id="object_selc2">'+select+
            '</div>'
        );
        this.dbgContainer.append("<div  class='object_cont'></div>");
        //Game Info
        var txt = "";
        
        
        txt +='<span><b>Game Layers:</b> '+this.tools.game.layerList.length+'</span>'
        if(this.objList !== null){
            txt += '<span><b>Game Objects:</b> '+ this.objList.length  +'</span>';
        }
        if(this.colList !== null){
            txt += '<span><b>Collidable Objects:</b> '+ this.colList.length  +'</span>';
        }
        txt +='<span><b>Draw Collisions</b></span> <select id="drawColRect"><option value="1">No</option><option value="0">Yes</option></select>';
        this.gameInfo.append(
            '<div class="info">'+txt+'</div>'
        );
        
        if(this.tools.game.moduleList.length !== 0){
            var txt = "<span><b>Modules </b></span>";
            for(var modK in this.tools.game.moduleList){
                txt += '<span>'+this.tools.game.moduleList[modK].__id+'</span>';
            }
            this.gameInfo.append('<div class="info">'+txt+'</div>');
        }
        
        var mapList = '<option></option>';
        for (var myKey in this.tools.mapList){
            mapList += '<option value="'+myKey+'">'+myKey+'</option>'
            
        }
        mapList += '</select>';
        this.gameInfo.append('<div class="info"><span><b>Mapas</b></span><select id="map_sel">'+mapList+'</div>');
        
        this.dbgContainer.append('<div class="clear"></div>');
        /*--------------- Events ------------*/
        var self = this;
        $('#map_sel').change(function(){
           self.tools.messageContainer.speak({
                message : "#loadMap#",
                mapName : $(this).val()
            });
        });
        $('#object_selc1').change(function(){
           self.selectedObj1 = $(this).val();
        });
        $('#object_selc2').change(function(){
           self.selectedObj2 = $(this).val();
        });
        $('#drawColRect').change(function(){
            if($(this).val() === "0"){
                self.updOrSetSetting('drawCollisionRects',true);
            }else{
                self.updOrSetSetting('drawCollisionRects',false);
            }
        });
        
        var buttonStart = $('#launchDBG');
        var buttonEnd = $('#cancelDBG');
        var buttonShow = $('#showDBG');
        var buttonPause = $('#pauseGame');
        var buttonUpd = $('#updateDBG');
        var buttonkill = $('#killLink');
        buttonStart.click(function(){
            self.debugging = true;
        });
        buttonEnd.click(function(){
            self.cancelChecking();
        });
        buttonShow.click(function(){
            self.debugging = true;
            setTimeout(function(){self.debugging = false;},10)
        });
        buttonPause.click(function(){
            
            if($(this).val() === 'Pause!'){
                self.debugging = false;
                self.tools.game.pauseGame();
                $(this).val('Resume!');
            }else{
                self.debugging = true;
                self.tools.game.resumeGame();
                $(this).val('Pause!');
            }
        });
        buttonUpd.click(function(){
            self.constructDbgView();
        });
        buttonkill.click(function(){
            self.tools.game.getLayer('objects').getObject('fp').kill('test');
        });
    },
    updOrSetSetting: function(key,value){
      this.tools.game.updOrSetSetting(key,value);  
    },
    startChecking:function(){
        var self = this;
        if(this.debugging){
            self.tools.messageContainer.speak({
                message : "#dbgObjInfo#",
                data : self.selectedObj1,
                id: 1
            });
            self.tools.messageContainer.speak({
                message : "#dbgObjInfo#",
                data : self.selectedObj2,
                id: 2
            });
        }
    },
    cancelChecking: function(){
        this.debugging = false;
        $('#dbg_container .object_cont').children('.object').remove();
    }
    
})


