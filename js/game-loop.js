
var game=new Game('crimson','canvas');
/*
game.queueImage('images/bkg.jpg');
game.queueImage('images/sprite.png');
game.loadImages();
game.loadImages();*/
//搞定人物精灵对象
/*
名词记录
 精灵对象需要两个对象来形成，spriteSheet精灵表对象提供图像信息，SpriteSheetPainter对象提供绘制和修改剪裁信息的方法
* spriteSheet为精灵表对象
* SpriteSheetPainter_player为人物精灵绘制器对象：spriteSheetPainter_player;
* Sprite为精灵对象：sprite_player;
*/
/*
var spriteSheet=game.getImage('images/sprite.png')//精灵表对象在painter对象的绘制中调用；
spriteSheet.onload=function(){
    /*
    //1.加入player精灵(不具有行为对象）
    game.addSprite_player(40,40,40,100);

     //怪物精灵对象
     //蜥蜴    width:55,height:32
     var spriteSheetPainter_lizard=new SpriteSheetPainter_monster(lizardCells);
     var sprite_lizard=new Sprite('lizard',100,100,55,32,spriteSheetPainter_lizard);
     game.addSprite(sprite_lizard);
     //僵尸    width:32,height:15
     var spriteSheetPainter_zombie=new SpriteSheetPainter_monster(zombieCells);
     var sprite_zombie=new Sprite('zombie',150,150,32,15,spriteSheetPainter_zombie);
     game.addSprite(sprite_zombie);
     //蜘蛛    width:80,height:60
     var spriteSheetPainter_spider=new SpriteSheetPainter_monster(spiderCells),
     sprite_spider=new Sprite('spider',50,150,80,60,spriteSheetPainter_spider);
     game.addSprite(sprite_spider);
     //Boss
     var spriteSheetPainter_boss=new SpriteSheetPainter_monster(bossCells),
     sprite_Boss=new Sprite('boss',50,250,100,80,spriteSheetPainter_boss);
     game.addSprite(sprite_Boss);


    //2.得到真实的怪物数据

    //3.加入怪物精灵
    game.addSprites_monster(monstersData_rea,game);

    //4.添加精灵图形（怪物）：
    game.addSpriteShape_monster();

    //5.添加多边形坦克图形（一个障碍物）：碰撞检测
    game.addPolygonShape_Tank(polygon_tank_points);*/
    //Num.1:开启游戏前人物精灵，怪物精灵，怪物图形，坦克图形的添加

    game.beforeGame(35,35,50,100,monstersData_tem,polygon_tank_points,runInPlaceBehavior,movingBehavior);
    //添加人物精灵，怪物精灵，添加怪物，坦克图形；



/*
    setInterval(function(){
        console.log('第二波');
        for (var i = 0; i < monstersData_tem.length; i++) {
            var monsterData_tem = monstersData_tem[i];
            monsterData_tem.number++;
        }
        var monstersData_rea=getMonstersData_rea(game.canvas,monstersData_tem,runInPlaceBehavior,movingBehavior);

        game.middleGame(monstersData_rea);
    },2000);*/
    //添加人物精灵；
    /*
    var spriteShape_player=new SpriteShape(sprite_player);
    spriteShape_player.name='player';
        game.shapes.push(spriteShape_player);
*/
    //Num.2:添加事件（人物）

    game.addKeyListener_keydown({key:'space',listener:function(){
        console.log('you just press space');
    }});
    game.addKeyListener_keydown({key:'left arrow',listener:function(){
         var sprite_player=game.getSprite('player');
         sprite_player.animating=true;
        if(game.keys.indexOf('left arrow')===-1){
            game.keys.push('left arrow');
        }
        //sprite_player.velocityX=-sprite_player.velocity;
         //sprite_player.velocityY=0;
    }});
    game.addKeyListener_keydown({key:'up arrow',listener:function(){
      /*   var sprite_player=game.getSprite('player');
         sprite_player.animating=true;*/if(game.keys.indexOf('up arrow')===-1){
            game.keys.push('up arrow');
        }
        //sprite_player.velocityY=-sprite_player.velocity;
         //sprite_player.velocityX=0;
     }});
    game.addKeyListener_keydown({key:'right arrow',listener:function(){
        /* var sprite_player=game.getSprite('player');
         sprite_player.animating=true;*/
        if(game.keys.indexOf('right arrow')===-1){
            game.keys.push('right arrow');
        }
        //sprite_player.velocityX=sprite_player.velocity;
         //sprite_player.velocityY=0;
     }});
    game.addKeyListener_keydown({key:'down arrow',listener:function(){
       /*  var sprite_player=game.getSprite('player');
         sprite_player.animating=true;*/if(game.keys.indexOf('down arrow')===-1){
            game.keys.push('down arrow');
        }
         //sprite_player.velocityY=sprite_player.velocity;
         //console.log(sprite_player.velocityY);
         //sprite_player.velocityX=0;
     }});
    game.addKeyListener_keyup({key:'left arrow',listener:function(){
        var index=game.keys.indexOf('left arrow');
        if(index!==-1){
            game.keys.splice(index,1);
            game.getSprite('player').velocityX=0;
        }
    }});
    game.addKeyListener_keyup({key:'up arrow',listener:function(){
        var index=game.keys.indexOf('up arrow');
        if(index!==-1){
            game.keys.splice(index,1);
            game.getSprite('player').velocityY=0;
        }
    }});
    game.addKeyListener_keyup({key:'right arrow',listener:function(){
        var index=game.keys.indexOf('right arrow');
        if(index!==-1){
            game.keys.splice(index,1);
            game.getSprite('player').velocityX=0;
        }
    }});
    game.addKeyListener_keyup({key:'down arrow',listener:function(){
        var index=game.keys.indexOf('down arrow');
        if(index!==-1){
            game.keys.splice(index,1);
            game.getSprite('player').velocityY=0;
        }
    }});
    //num.3添加武器切换事件
    game.addKeyListener_keyup({key:'sniper rifle',listener:function(){
        var sprite_player=game.getSprite('player');
        sprite_player.weapon=1;
    }});
    game.addKeyListener_keyup({key:'shotgun',listener:function(){
        var sprite_player=game.getSprite('player');
        sprite_player.weapon=2;
    }});
    game.addKeyListener_keyup({key:'fire',listener:function(){
        var sprite_player=game.getSprite('player');
        sprite_player.weapon=3;
    }});
    //方向事件，改变人物精灵的速率；
    //game.start();
//}
















