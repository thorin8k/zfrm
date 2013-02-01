var DebugModule = IModule.extend({
    dbgContainer: null,
    gameInfo: null,
    objList:null,
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
        this.objList = this.tools.game.getObject('objects').objList;
        this.constructDbgView();
        
    },
    getObjectInfo: function(notification){
        var obj = this.tools.game.getObject('objects').getObject(notification.data);
        var txt = "<div class='object' id='object_cont"+notification.id+"' id='"+notification.data+"'>";
        for (var myKey in obj){
            if(Object.prototype.toString.call(obj[myKey]) !== '[object Function]'){
                txt += (myKey +" => "+obj[myKey]) + "<br/>";
            }
        }
        txt +='</div>';
        $('#dbg_container .object_cont').children('#object_cont'+notification.id).remove();
        this.dbgContainer.children('.object_cont').append(txt);
    },
    constructDbgView:function(){
        //Game Info Container
        $('body').append('<div class="right_canvas" id="game_info"><label id="title">Game Info -</label></div>');
        this.gameInfo = $('#game_info');
        //Object Debug Container
        $('body').append('<div class="bottom_canvas" id="dbg_container"><label id="title">Object Dbg - </label></div>');
        this.dbgContainer = $('#dbg_container');
        
        
        
        //Btn
        this.dbgContainer.append(
            '<div class="buttons">'+
            '<input type="button" value="Trace!" id="launchDBG"/>'+
            '<input type="button" value="Stop!" id="cancelDBG"/>'+
            '<input type="button" value="Show!" id="showDBG"/>'+
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
        this.gameInfo.append(
            '<div class="info">'+
            '<span><b>Game Layers:</b> '+this.tools.game.objectList.length+'</span>'+
            '<span><b>Game Objects:</b> '+this.tools.game.getObject('objects').objList.length+'</span>'+
            '<span><b>Collidable Objects:</b> '+this.tools.game.getObject('collisions').objList.length+'</span>'+
            '</div>'
        );
        
        this.dbgContainer.append('<div class="clear"></div>');
        /*--------------- Events ------------*/
        var self = this;
        $('#object_selc1').change(function(){
           self.selectedObj1 = $(this).val();
        });
        $('#object_selc2').change(function(){
           self.selectedObj2 = $(this).val();
        });
        
        var buttonStart = $('#launchDBG');
        var buttonEnd = $('#cancelDBG');
        var buttonShow = $('#showDBG');
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


