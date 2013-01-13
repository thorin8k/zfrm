var Character = Class.extend({
    //Canvas context
    context: null,
    //Attribs
    x: 3*16,
    y: 3*16,
    nx: 3*16,
    ny: 3*16,
    moving: false,
    speed: 4,
    frame: 0,
    facing: 0,
    life: 3,
    image: null,
    //Constructor
    init: function(ctx){
        this.context=ctx;
        this.image = new Image();
        this.image.src = IMG_PATH + CHAR_IMG;
    },
        
    moveLink : function (dir){
        this.moving = true;
        if (dir == 'up'){ 
            this.ny-=8; 
            this.facing=2; 
        }
        if (dir == 'down'){ 
            this.ny+=8;
            this.facing=0;
        }
        if (dir == 'left'){ 
            this.nx-=8;
            this.facing=1;
        }
        if (dir == 'right'){ 
            this.nx+=8;
            this.facing=3;
        }
        this.drawLink();
    },
    drawLink: function (){
        this.context.clearRect(this.x,this.y,16,16);
        this.context.save();
        if (this.ny>this.y){ this.y+=this.speed; }
        if (this.nx<this.x){ this.x-=this.speed; }
        if (this.ny<this.y){ this.y-=this.speed; }
        if (this.nx>this.x){ this.x+=this.speed; }
        if (this.frame == 0){
            this.context.drawImage(this.image,this.facing*30,0,16,16,this.x,this.y,16,16);
            this.frame = 1;
        }else{
            this.context.drawImage(this.image,this.facing*30,30,16,16,this.x,this.y,16,16);
            this.frame = 0;
        }
        this.context.restore();
        if ((this.x == this.nx) && (this.y == this.ny)){
            this.moving = false;
        }else{
            var self= this;//corrige error al lanzar set timeout
            setTimeout(function(){self.drawLink()}, 100);
            
        }
    },
    drawSword: function (){
        if (this.moving == false){
            this.moving = true;
            this.context.clearRect(this.x,this.y,16,16);
            this.context.drawImage(this.image,this.facing*30,60,16,16,this.x,this.y,16,16);
            this.sx = this.x; this.sy = this.y
            if (this.facing == 0){ this.sy += 16; }
            if (this.facing == 1){ this.sx -= 16; }
            if (this.facing == 2){ this.sy -= 16; }
            if (this.facing == 3){ this.sx += 16; }
            this.context.drawImage(this.image,this.facing*30,195,16,16,this.sx,this.sy,16,16);

            //Collisions
            //if ((linkObj.sx == badObj.x) && (linkObj.sy == badObj.y)){ badObj.life-=1; }

            var self= this;//corrige error al lanzar set timeout
            setTimeout(function(){ self.drawSword() },100);
        }else{
            this.context.clearRect(this.sx,this.sy,16,16);
            this.drawLink();
            this.moving = false;
        }
    }
});

