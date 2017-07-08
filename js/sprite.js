
var Sprite=function (name,left,top,width,height,velocity,healthPoint,painter,behaviors){
    this.name=name;
    this.top=top;
    this.left=left;
    this.width=width;
    this.height=height;
    this.velocityX=0;
    this.velocityY=0;
    this.velocity=velocity;
    this.healthPoint=healthPoint;
    this.clicking=false;
    this.radian=0;
    this.animating=false;
    this.hitted_everyClick=false;
    this.dead=false;
    this.changedCells_dead=false;
    this.stick=false;
    this.painter=painter;
    this.behaviors=behaviors||[];
};//精灵构造函数把精灵的位置和尺寸收归中央；
Sprite.prototype={
    paint:function(context){
        this.painter.paint(this,context)//让paint方法有个快捷的指向sprite对象的办法；
    },
    update:function(context,time){
        for (var i = 0; i < this.behaviors.length; i++) {//behaviors是一个数组，还是不是一个普通的对象
            var behavior=this.behaviors[i];
            behavior.execute(this,context,time);//让execute有一个快捷的指向sprite对象的办法，并且需要time来计算基于时间的位移和限定帧速率的事件执行：例如精灵图的切换；
        }
    }
}//精灵对象原型上的方法，两个：绘制、更新信息，有可能是精灵对象上的，也可能是painter对象上的；
/*精灵对象的中的第二个参数，有三类，分别是描边与填充绘制器，图像绘制器，精灵表绘制器，主要是精灵表绘制器*/
var SpriteSheetPainter_monster=function(cells){
    this.cells=cells||[];
    this.cellIndex=0;
};
SpriteSheetPainter_monster.prototype={
    advance:function(){
        if(this.cells===playerDeadCells){
            console.log('?');
        }
        this.cellIndex++;
        this.cellIndex=this.cellIndex%(this.cells.length)
    },
    paint:function(sprite,context){
        var cell=this.cells[this.cellIndex];
        context.save();
        context.translate(sprite.left+sprite.width/2,sprite.top+sprite.height/2);
        context.rotate(sprite.radian);
        context.translate(-sprite.left-sprite.width/2,-sprite.top-sprite.height/2);
        context.drawImage(spriteSheet,cell.left,cell.top,cell.width,cell.height,sprite.left,sprite.top,cell.width,cell.height);
        context.restore();
        if(this.cells===playerDeadCells){
            console.log(this.cellIndex);
        }
    }
};
//为怪物设计的精灵绘制器对象

//为人物定制的特殊的绘制器对象，并且兼容其它对象
var SpriteSheetPainter_player=function(playerBodyCell,playerRunCells){
    this.playerBodyCell=playerBodyCell||{};
    this.playerRuncells=playerRunCells||[];
    this.cellIndex=0;
};
SpriteSheetPainter_player.prototype={
    advance:function(){
        this.cellIndex++;
        this.cellIndex=this.cellIndex%(this.playerRuncells.length);
    },
    paint:function(sprite,context){
        var playerBodyCell=this.playerBodyCell;
        var playerRunCell=this.playerRuncells[this.cellIndex];
        context.save();
        context.translate(sprite.left+sprite.width/2,sprite.top+sprite.height/2);
        context.rotate(sprite.radian);
        context.translate(-sprite.left-sprite.width/2,-sprite.top-sprite.height/2);
        context.drawImage(spriteSheet,playerRunCell.left,playerRunCell.top,playerRunCell.width,playerRunCell.height,sprite.left,sprite.top,sprite.width,sprite.height);
        context.drawImage(spriteSheet,playerBodyCell.left,playerBodyCell.top,playerBodyCell.width,playerBodyCell.height,sprite.left,sprite.top,sprite.width,sprite.height);
        context.restore();
    }
};
SpriteSheetPainter_player_dead=function(playerDeadCells){
    this.playerDeadCells=playerDeadCells;
    this.cellIndex=0;
}
SpriteSheetPainter_player_dead.prototype={
    advance:function(){
        this.cellIndex++;
        this.cellIndex=this.cellIndex%(this.playerDeadCells.length);
    },
    paint:function(sprite,context){
        var playerDeadCell=this.playerDeadCells[this.cellIndex];
        context.save();
        context.translate(sprite.left+sprite.width/2,sprite.top+sprite.height/2);
        context.rotate(sprite.radian);
        context.translate(-sprite.left-sprite.width/2,-sprite.top-sprite.height/2);
        context.drawImage(spriteSheet,playerDeadCell.left,playerDeadCell.top,playerDeadCell.width,playerDeadCell.height,sprite.left,sprite.top,sprite.width,sprite.height);
        context.restore();
    }
};
//为gunfire定制特殊的绘制器对象，
var SpriteSheetPainter_gunfire=function(gunfireCells){
    this.cells=gunfireCells;
    this.cellIndex=0;
};
SpriteSheetPainter_gunfire.prototype={
    advance:function(){
        this.cellIndex++;
        this.cellIndex=this.cellIndex%(this.cells.length);
    },
    paint:function(sprite,context){
        var cell=this.cells[this.cellIndex];
        var sprite_player=game.getSprite('player');
        context.save();
        //平移、旋转、平移
        context.translate(sprite_player.left+sprite_player.width/2,sprite_player.top+sprite_player.height/2);
        context.rotate(sprite_player.radian);
        context.translate(-sprite_player.left-sprite_player.width/2,-sprite_player.top-sprite_player.height/2);
        context.drawImage(spriteSheet,cell.left,cell.top,cell.width,cell.height,sprite.left,sprite.top,sprite.width,sprite.height);
        context.restore();
    }
};


//为fireLine定制特殊的绘制器对象，
var linePainter_fireLine={
    radian:undefined,
    translateX:undefined,
    translateY:undefined,
    paint:function(sprite,context){
        var sprite_player=game.getSprite('player');
        context.save();
       /* if(this.radian===undefined){
            this.radian=sprite_player.radian;
            //console.log(this.radian);
        }*/
        this.radian=sprite_player.radian;
       /* if(this.translateX===undefined){
            this.translateX=sprite_player.left+sprite_player.width/2
        }*/
        this.translateX=sprite_player.left+sprite_player.width/2;
      /*  if(this.translateY===undefined){
            this.translateY=sprite_player.top+sprite_player.height/2
        }*/
        this.translateY=sprite_player.top+sprite_player.height/2;

        context.translate(this.translateX,this.translateY);
        context.rotate(this.radian);
        context.translate(-this.translateX,-this.translateY);
        context.beginPath();
        context.moveTo(sprite.left,sprite.top);
        context.lineTo(sprite.left+sprite.width,sprite.top);
        context.lineWidth=sprite.height;//why？
        context.strokeStyle='white';
        context.stroke();
        context.restore();
    }
};
var linePainter_fireLines={
    radian:undefined,
    translateX:undefined,
    translateY:undefined,
    paint:function(sprite,context){
        this.angle=15;
        var sprite_player=game.getSprite('player');
        context.save();
        this.radian=sprite_player.radian;
        this.translateX=sprite_player.left+sprite_player.width/2;
        this.translateY=sprite_player.top+sprite_player.height/2;
        context.translate(this.translateX,this.translateY);
        context.rotate(this.radian);
        context.translate(-this.translateX,-this.translateY);
        context.beginPath();
        context.arc(sprite.left,sprite.top,sprite.height/2,0,Math.PI*2,false);
        context.arc(sprite.left+5,sprite.top,sprite.height/2,0,Math.PI*2,false);
        context.arc(sprite.left+10,sprite.top,sprite.height/2,0,Math.PI*2,false);
        context.arc(sprite.left+15,sprite.top,sprite.height/2,0,Math.PI*2,false);
        context.arc(sprite.left+20,sprite.top,sprite.height/2,0,Math.PI*2,false);
        var delta1=(sprite.left-this.translateX)*Math.tan(this.angle*Math.PI/180);
        var delta2=(sprite.left+5-this.translateX)*Math.tan(this.angle*Math.PI/180);
        var delta3=(sprite.left+10-this.translateX)*Math.tan(this.angle*Math.PI/180);
        var delta4=(sprite.left+15-this.translateX)*Math.tan(this.angle*Math.PI/180);
        var delta5=(sprite.left+20-this.translateX)*Math.tan(this.angle*Math.PI/180);
        context.moveTo(sprite.left,sprite.top+delta1);
        context.arc(sprite.left,sprite.top+delta1,sprite.height/2,0,Math.PI*2,true);
        context.arc(sprite.left+5,sprite.top+delta2,sprite.height/2,0,Math.PI*2);
        context.arc(sprite.left+10,sprite.top+delta3,sprite.height/2,0,Math.PI*2);
        context.arc(sprite.left+15,sprite.top+delta4,sprite.height/2,0,Math.PI*2);
        context.arc(sprite.left+20,sprite.top+delta5,sprite.height/2,0,Math.PI*2);
        context.moveTo(sprite.left,sprite.top-delta1);
        context.arc(sprite.left,sprite.top-delta1,sprite.height/2,0,Math.PI*2);
        context.arc(sprite.left+5,sprite.top-delta2,sprite.height/2,0,Math.PI*2);
        context.arc(sprite.left+10,sprite.top-delta3,sprite.height/2,0,Math.PI*2);
        context.arc(sprite.left+15,sprite.top-delta4,sprite.height/2,0,Math.PI*2);
        context.arc(sprite.left+20,sprite.top-delta5,sprite.height/2,0,Math.PI*2);
        context.strokeStyle='white';
        context.stroke();
        context.restore();
    }
};
var linePainter_fireCircle={
    radian:undefined,
    translateX:undefined,
    translateY:undefined,
    paint:function(sprite,context){
        var sprite_player=game.getSprite('player');
        context.save();
         if(this.radian===undefined){
         this.radian=sprite_player.radian;
         //console.log(this.radian);
         }
        //this.radian=sprite_player.radian;
         if(this.translateX===undefined){
         this.translateX=sprite_player.left+sprite_player.width/2
         }
        //this.translateX=sprite_player.left+sprite_player.width/2;
          if(this.translateY===undefined){
         this.translateY=sprite_player.top+sprite_player.height/2
         }
        //this.translateY=sprite_player.top+sprite_player.height/2;
        context.translate(this.translateX,this.translateY);
        context.rotate(this.radian);
        context.translate(-this.translateX,-this.translateY);
        context.beginPath();
        context.arc(sprite.left,sprite.top,sprite.width/2,0,Math.PI*2);
        context.fillStyle='red';
        context.fill();
        context.strokeStyle='red';
        context.moveTo(sprite.left,sprite.top);
        context.lineTo(sprite.left-30,sprite.top);
        context.moveTo(sprite.left,sprite.top+sprite.width/2);
        context.lineTo(sprite.left-25,sprite.top+sprite.width/2);
        context.moveTo(sprite.left,sprite.top-sprite.width/2);
        context.lineTo(sprite.left-25,sprite.top-sprite.width/2);
     /*   context.moveTo(sprite.left,sprite.top-sprite.width/4);
        context.lineTo(sprite.left-22.5,sprite.top-sprite.width/4);
        context.moveTo(sprite.left,sprite.top+sprite.width/4);
        context.lineTo(sprite.left-22.5,sprite.top+sprite.width/4);*/

        context.stroke();
        context.restore();
    }
};