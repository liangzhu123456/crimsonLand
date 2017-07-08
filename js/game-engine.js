
function Game(name,canvasId){
    //准备
    var canvas=document.getElementById(canvasId),
        self=this;
    //一般属性
    this.context=canvas.getContext('2d');
    this.canvas=canvas;
    this.name=name;
    this.sprites=[];
    this.keyListeners_keydown=[];
    this.keyListeners_keyup=[];
    this.keys=[];
    //时间管理
    this.startTime=0;
    this.lastTime=0;
    this.lastUpdateFPS=0;
    this.gameTime=0;
    this.fps=0;
    this.fps_record=60;
    this.STARTING_FPS=60;
    this.paused=false;
    this.paused_timeout=100;
    this.startedPausedAt=0;
    //图片加载
    this.imageLoadingProgressCallBack;
    this.images={};
    this.imageURLs=[];
    this.imagesLoaded=0;
    this.imagesFailToLoaded=0;
    this.imageIndex=0;//感觉这个变量没有用啊




    this.STOP_INTERVAL=400;
    this.lastStopTime=0;
    this.CLICK_INTERVAL=500;
    window.onkeydown=function(e){
        self.keyPressed(e);
    };
    window.onkeyup=function(e){
        self.keyUp(e);
    };
    window.onclick=function(e){
        self.click(e);
    };
    var self=this;
    //形状数组
    this.shapes=[];
    //右侧栏的相关属性（时间管理）
    //面板的信息；
    this.panel_data={};
    this.panel_data.gameTime=0;
    this.panel_data.healthPoint='100';
    this.panel_data.weapon='狙击枪';
    this.panel_data.fireAvailable='可用';
    this.panel_data.count=0;
    this.panel_data.loops_count='第一波';
        //gameTime更新相关
    this.lastTimeUpdate_gameTime=0;
    this.INTERVAL_gameTime=1000;
        //health更新相关；
    this.lastTimeUpdate_health=0;
    this.INTERVAL_health=1000;
        //weapon相关
    this.lastTimeUpdate_weapon=0;
    this.INTERVAL_weapon=1000;
        //count相关
    this.count_deadMonster=0;
    this.lastTimeUpdate_count=0;
    this.INTERVAL_count=1000;
        //火球术相关
    this.lastTimeUpdate_fireAvailable=0;
    this.INTERVAL_fireAvailable=1000;
    this.count_20=0;
        //游戏流程
    this.INTERVAL_loop=5000;
    this.index_loop=1;
    this.lastTimeUpdate_loopCount=0;
    this.INTERVAL_loopCount=500;

    this.started=false;
    this.gameOver=false;
    this.win=false;
}

Game.prototype= {
//   1. 图像加载相关方法
    getImage: function (imageURL) {
        return this.images[imageURL]
    },
    imageLoadedCallBack: function () {
        this.imagesLoaded++;
    },
    imageLoadErrorCallBack: function () {
        this.imagesFailToLoaded++;

    },
    loadImage: function (imageURL) {
        var image = new Image(),
            self = this;
        image.src = imageURL;
        image.addEventListener('load', function () {
            self.imageLoadedCallBack();//因为需要让函数中的this指向game，直接写this.imageLoadedCallBack的话，this指向window
        });
        image.addEventListener('error', function () {
            self.imageLoadErrorCallBack();
        });
        this.images[imageURL] = image;
    },
    loadImages: function () {
        /*for (var i = 0; i < this.imageURL.length; i++) {
         this.loadImage(this.imageURL[i])*/
        if (this.imageIndex < this.imageURLs.length) {
            this.loadImage(this.imageURLs[this.imageIndex]);
            this.imageIndex++;
        }
        return (this.imagesLoaded + this.imagesFailToLoaded) / this.imageURLs.length * 100;
    },
    queueImage: function (imageURL) {
        this.imageURLs.push(imageURL)
    },
//  2. 游戏主程序   game looping
    start: function () {
        this.started=true;
        var self = this;
        this.startTime = this.getTimeNow();
        window.requestAnimationFrame(function (time) {
            self.animate.call(self, time);
        });
    },//记录游戏开始时间，并且用questAnimationFrame来启动animate方法；
    animate: function (time) {
        var self = this;
        if (this.paused) {
            pausedSound('audio_bg');
            window.setTimeout(function () {
                self.animate.call(self, time)//这个time是在questAnimationFrame中传递来的
            }, this.paused_timeout)
        } else if(this.gameOver){
            this.context.save();
            this.context.drawImage(this.getImage('images/bkg1.jpg'),0,0,1200,640,0,0,1000,600);
            this.context.drawImage(this.getImage('images/zhuzi.jpg'),0,0,512,512,100,75,220,220);
            /*     this.context.textAlign='left';
             var text='呜啦啦啦啦啦啦啦~~~~~iuhgkghk;dljghdhfgjhjgh;shjghjkshg;kjsfhg;kjshg;hgjkh;jkgh;dksfjhg;sjgh;skjghpsd;hg';
             var metric=this.context.measureText(text);
             metric.width=200;
             this.context.fillText(text,400,250,200);*/
            this.context.textAlign='left';
            drawText('这是我在学习了这本书后，独立开发的一款H5游戏（除了素材），没有使用任何框架，都是原生的技术，脱产学习了JS四个月，最近在找工作，想从事前段或者H5游戏方向，如果有意向或者游戏中出现了我没有考虑到的BUG，麻烦加微信详谈(向大佬低头)，万分感谢！               再给你个么么哒(⑉°з°)-♡，最后特别感谢知乎的朋友冴羽和井藏天的无私帮助',500,75,400);
            this.context.drawImage(this.getImage('images/book.jpg'),0,0,470,630,350,75,120,150);
            this.context.restore();
            lastScreen_button=document.getElementById('lastScreen_button');
            lastScreen_button.className='block';
            if(this.win){
                this.context.save();
                this.context.textAlign='center';
                drawText('恭喜您！！击败了阻止您的怪物，等到了政府的直升机，脱离荒岛！！',500,500,10000);
                this.context.restore();
            }

        }else{
            playSound('audio_bg');
            this.tick(time);
            //this.setPlayerStop(time);
            this.clearScreen();
            this.startAnimate(time);
            this.paintUnderSprites();
            this.updateSprites(time);
            this.paintSprites();
            this.paintOverSprites(time);
            this.endAnimate();
/*
                 if(this.gameTime<1000){
             window.requestAnimationFrame(function (time) {
             self.animate.call(self, time)
             })
             }*/


            window.requestAnimationFrame(function (time) {
                self.animate.call(self, time)
            })
        }
    },
    tick: function (time) {
        this.updateFrameRate(time);
        this.lastTime = time;
        this.gameTime = this.getTimeNow() - this.startTime;
    },
    updateFrameRate:function(time) {
        if (this.lastTime === 0) {this.fps = this.STARTING_FPS}
        else {this.fps = 1000 / (time - this.lastTime)}
        //console.log(this.fps);
    },
    clearScreen:function(){
        //console.log('it`s clear');
        this.context.clearRect(0,0,this.context.canvas.width,this.context.canvas.height)
    },
    startAnimate:function(time){
        var sprite_player=this.getSprite('player');
        sprite_player.stick=false;

        //1.怪物精灵根据距离获取速度或者到达终点stick
        this.getMonstersVelocity();
        //2.根据stick的数量来减少人物的血量，在血量少的死亡
        this.playerHurted(1);
        //3.人物死亡且没有播放过死亡截图的时候，人物获取新的绘制器和行为对象；
        if(sprite_player.dead===true&&sprite_player.changedCells_dead===false){
            playSound('audio_die');
            sprite_player.painter=new SpriteSheetPainter_player_dead(playerDeadCells);
            var runInPlace_new11=Object.assign({},runInPlaceBehavior);
            sprite_player.behaviors=[runInPlace_new11];
            sprite_player.changedCells_dead=true;
        }//偷偷加一个changedCells_dead属性
        //4.碰撞检测
        this.tankDetectCollisionsWithMonsters();
        this.fireLineDetectCollisionsWithMonsters(0);
        this.fireLinesDetectCollisionsWithMonsters(50);
        this.fireCircleDetectCollisionsWithMonsters();
        //5.在按下键且鼠标没有点击的时候人物获取速度
        this.getPlayerVelocity();

        //this.tankDetectCollisionsWithPlayer();
        //1-4获取怪物精灵的速度，并且进行三个碰撞检测，并且处理

         sprite_player.left_yuanlai=sprite_player.left;
         sprite_player.top_yuanlai=sprite_player.top;
         sprite_player.radian_yuanlai=sprite_player.radian;


        //6.人物没有死亡的情况下，按下键并且没有按鼠标的时候获取行为对象
        if(sprite_player.dead===false){
            if(sprite_player.animating===true&&sprite_player.clicking===false){
                sprite_player.behaviors=[runInPlaceBehavior,movingBehavior]
            }else{
                sprite_player.behaviors=[];
            }
        }
        //5-6获取人物的速度，只有人物在活着的情况下，同时两个事件的触发，才能让人物具有两个行为对象

        //7.在怪物精灵播放死亡截图的最后一张的时候，清除这个精灵，并且清除相对应的精灵图形；
        for (var i = 0; i < this.sprites.length; i++) {
            //cells是怪物精灵绘制器拥有的属性
            if(this.sprites[i].painter.cells===zombieDieCells||this.sprites[i].painter.cells===lizardDieCells||this.sprites[i].painter.cells===spiderDieCells||this.sprites[i].painter.cells===bossDieCells){
                if(this.sprites[i].painter.cellIndex===this.sprites[i].painter.cells.length-1){
                    //清除对应的精灵和对应的精灵图形对象
                    //part one清除对应的精灵
                    this.count_deadMonster++;
                    var sprite=this.sprites[i];
                    this.sprites.splice(i,1);
                    for (var j = 0; j < game.shapes.length; j++) {
                        var shape = game.shapes[j];
                        if(shape.sprite===sprite){
                            var index_shape=game.shapes.indexOf(shape);
                            game.shapes.splice(index_shape,1);
                        }
                    }
                    //console.log(this.sprites, this.shapes);
                }
            }
        }
        //8.在人物精灵的死亡画面到最后一张的时候，暂停整个游戏；
        if(sprite_player.dead===true){
            if(sprite_player.painter.cellIndex===sprite_player.painter.playerDeadCells.length-1){
                this.gameOver=true;
            }
        }
        //7-8在播放死亡画面的最后一张的时候进行处理
    },//设置所有怪物精灵的速度属性，以及碰撞检测
    paintUnderSprites:function(){
        //console.log('paintUnderSprites is implemented now！');
        var imageURL=this.imageURLs[0];//把背景图片先放置在队列中的第一个，永远下标为0；
        this.context.drawImage(this.getImage(imageURL),0,0);
    },//绘制背景
    updateSprites:function(time){
        //console.log('updateSprites is implemented now！');
        for (var i = 0; i < this.sprites.length; i++) {
            var sprite=this.sprites[i];
            sprite.update(this.context,time);
        }
        this.updateSpriteShapesPoint_player();
        this.tankDetectCollisionsWithPlayer();
    },//改变所有精灵的位移，以及精灵绘制器的旋转角度
    paintSprites:function(){
        //console.log('paintSprites is implemented now！');
        //console.log(this.sprites);
        for (var i = 0; i <this.sprites.length; i++) {
            var sprite=this.sprites[i];
            sprite.paint(this.context);
        }
    },
    paintOverSprites:function(time){
        //1.fps;
        var sprite_player=this.getSprite('player');
        var INTERVAL=1000;
        this.drawFps(time,INTERVAL);
        //2.右侧面板
        this.drawPanel();
        //3.右侧面板的内容绘制
        this.context.save();
        this.context.font="18px '微软雅黑'";
        this.context.textAlign='center';
        this.context.fillStyle='black';
        this.updateGameTimeData(time,this.panel_data);
        this.updateHealthPointData(time,sprite_player,this.panel_data);
        this.updateWeaponData(time,sprite_player,this.panel_data);
        this.updateCountData(time,this.count_deadMonster,this.panel_data);
        this.updatefireAvailableData(time,this.panel_data.count,this.panel_data);
        this.updateLoopsCountData(time,this.panel_data);
        this.context.fillText('游戏时间：'+this.panel_data.gameTime,900,100);
        this.context.fillText('血量:'+this.panel_data.healthPoint,900,200);

        this.context.fillText('当前武器：'+this.panel_data.weapon,900,300);
        this.context.fillText('火球术:'+this.panel_data.fireAvailable+'/'+'杀敌数:'+this.panel_data.count,900,400);
        this.context.fillText('怪物波数：'+this.panel_data.loops_count,900,500);
    },
    endAnimate:function(){
        this.middleGame(monstersData_tem,runInPlaceBehavior,movingBehavior);

        //更新碰撞检测的点
        /*
        for (var i = 0; i < this.shapes.length; i++) {
            var shape = this.shapes[i];
            if(shape.name==='monster'){
                shape.points=[];
                shape.setPolygonPoints();
            }else if(shape.name==='fireLine'){
                var sprite_player=this.getSprite('player');
                shape.points=[];//一个点足矣
                var length=shape.sprite.left+shape.sprite.width-sprite_player.left-sprite_player.width/2;
                var coordinate={};
                    coordinate.x=sprite_player.left+sprite_player.width/2;
                    coordinate.y=sprite_player.top+sprite_player.height/2;
                shape.addPoint(coordinate.x+Math.cos(sprite_player.radian)*length,coordinate.y+Math.sin(sprite_player.radian)*length);
                shape.readyToDetectCollisions=true;
            }
        }
        this.readyToDetectCollisions=true;*/
        this.updateSpriteShapesPoint_monster();
        this.updateSpriteShapePoint_fireLine();
        //this.readyToDetectCollisions=true;
        this.updateSpriteShapePoint_fireLines();
        this.updateCircleShapeXandY_fireCircle();
        var player=this.getShape('monster');
        //填充碰撞检测的店
        /*    game.context.beginPath();
          for (var j = 0; j < player.points.length; j++) {
                var point = player.points[j];
                    if(j===0){
                        game.context.moveTo(point.x,point.y)
                    }else{
                        game.context.lineTo(point.x,point.y)
                    }
            }
            game.context.fill();*/

    },//更新当前帧怪物精灵图形的点,并且开启检测碰撞
    //3. 切换游戏的状态
    togglePaused:function(){
        var now=this.getTimeNow();
        this.paused=!this.paused;
        if(this.paused){
            this.startedPausedAt=now;
        }else {
            this.startTime=this.startTime+(now-this.startedPausedAt);
            this.lastTime=this.lastTime+(now-this.startedPausedAt);
        }
    },//暂停的转换：修改paused属性的值，记录暂停的时间，在激活的时候呢，重置lastTime和修改startTime的值
    //4. 得到基于事件的每一帧的像素位移
    pixelsPerFrame:function(velocity){
        return velocity/this.fps;
    },//可以用这个函数在sprite对象的update方法时调用
    //5.按键处理程序相关
    //4.事件相关

    //键盘up事件
    addKeyListener_keyup:function(keyAndListener){
        this.keyListeners_keyup.push(keyAndListener)
    },//这个方法是为了添加对象keylisteners_keydown数组中的成员；
    findKeyListener_keyup:function(key){
        var listener;
        for (var i = 0; i < this.keyListeners_keyup.length; i++) {
            var keyListener = this.keyListeners_keyup[i];
            if(keyListener.key===key){
               listener=keyListener.listener;
            }
        }
        return listener;
    },//这个方法是为了在keyListeners数组中找到想要的对象；
    keyUp:function(e){
        var sprite_player=this.getSprite('player');
        var listener;
        var key;
        switch (e.keyCode){
            case 65:key='left arrow'; break;
            case 87:key='up arrow'; break;
            case 68:key='right arrow'; break;
            case 83:key='down arrow';break;
            case 32: key='space'; break;
            case 49:key='pistol';break;
            case 50:key='sniper rifle';break;
            case 51:key='shotgun';break;
            case 52:key='fire';break;
            case 107:key='+';break;
            case 109:key='-';break;
        }
        listener=this.findKeyListener_keyup(key);
        if(listener){
            if(key==='fire'&&this.panel_data.fireAvailable==='不可用'){
                //如果点击了fire按键，但是不可用，就不进行武器切换
                return;
            }
            listener();
        }/*
        if(this.keys.length===0){
            sprite_player.animating=false;
        }*/
    },//这个方法是事件处理程序，根据event.keyCode的值，得到key值，在根据key值得到相对应的listener函数，并且执行；
    //6. 处理精灵相关：

   //键盘down事件
   addKeyListener_keydown:function(keyAndListener){
        this.keyListeners_keydown.push(keyAndListener)
    },//这个方法是为了添加对象keylisteners_keydown数组中的成员；
    findKeyListener_keydown:function(key){
        var listener;
        for (var i = 0; i < this.keyListeners_keydown.length; i++) {
            var keyListener = this.keyListeners_keydown[i];
            if(keyListener.key===key){
               listener=keyListener.listener;
            }
        }
        return listener;
    },//这个方法是为了在keyListeners数组中找到想要的对象；
    keyPressed:function(e){
        var sprite_player=this.getSprite('player');
        var listener;
        var key;
        switch (e.keyCode){
            case 65:key='left arrow'; break;
            case 87:key='up arrow'; break;
            case 68:key='right arrow'; break;
            case 83:key='down arrow';break;
            case 32: key='space'; break;
        }
        listener=this.findKeyListener_keydown(key);
        if(listener){
            listener();
        }
        /*
        for (var i = 0; i < this.keys.length; i++) {
            var key_inKeys = this.keys[i];
            switch (key_inKeys){
                case 'left arrow':{sprite_player.velocityX=-sprite_player.velocity;sprite_player.animating=true}continue;
                case 'up arrow':{sprite_player.velocityY=-sprite_player.velocity;sprite_player.animating=true}continue;
                case'right arrow':{sprite_player.velocityX=sprite_player.velocity;sprite_player.animating=true}continue;
                case 'down arrow':{sprite_player.velocityY=sprite_player.velocity;sprite_player.animating=true}
            }
        }*/
    },//这个方法是事件处理程序，根据event.keyCode的值，得到key值，在根据key值得到相对应的listener函数，并且执行；
    //6. 处理精灵相关：

    //鼠标click事件
    click: function (e) {
        e.preventDefault();
        if(!this.started||this.paused||this.gameOver){
            return;
        }


    //part one 人物转身 part two 精灵动画 part three fireLine精灵
    //part one鼠标坐标为点击的点、人物的坐标为中心点；**人物的中心点无论怎么旋转都是不变的；
//点击的任务部分：
        var self=this;
        //1.用点击停止人物的行为
        var sprite_player=this.getSprite('player');
        if(sprite_player.clicking===true){
            return;
        }
        sprite_player.clicking=true;

        //2.改变人物的旋转角度
            //获取人物的坐标
        var coordinate_player=this.getCoordinate_player(sprite_player);
            //获取鼠标的坐标
        var coordinate_click=this.getCoordinate_click(this.canvas,e.clientX,e.clientY);
            //改变人物的旋转角度
        this.changePlayerRadian_click(coordinate_player,coordinate_click);

        //3.添加gunfire精灵
        this.addSprite_gunFire(sprite_player,20,20,gunfireCell,runInPlaceBehavior);

        //4.添加fireLine精灵或者是fireLines精灵
        if(sprite_player.weapon===1){
            this.addSprite_fireLine(sprite_player,20,1,500,movingBehavior);
            this.addSpriteShape_fireLine();

            playSound_interrupt('audio_pistol');

        };
        if(sprite_player.weapon===2){
            this.addSprite_fireLine(sprite_player,20,1,1200,movingBehavior);
            this.addSpriteShape_fireLine();
            playSound_interrupt('audio_sniperRifle');

        };
        if(sprite_player.weapon===3){
            this.addSprite_fireLines(sprite_player,20,2,300,movingBehavior);
            this.addSpriteShape_fireLines();
            playSound_interrupt('audio_shotgun');

        }
        if(sprite_player.weapon===4){
            this.addSprite_fireCircle(sprite_player,20,20,300,linePainter_fireCircle,movingBehavior);
            this.addCircleShape_fireCircle();
            playSound_interrupt('audio_fire');
        }

        //5.添加fireLine图像精灵

        //6.重置每一次点击怪物的被射击记录
        this.resetHitted_monsters();

        //7.写一个定时器来定时恢复一切
        if(sprite_player.weapon===4){
            self.panel_data.fireAvailable='不可用';
            //怎么让它真的不可用呢？
            //在按键处理程序上加个控制流吧，应该没问题
            setTimeout(function(){
                //part one 让人物移动
                sprite_player.clicking=false;

                //part two 移除gunFire精灵
                self.removeSprite('gunFire');
                sprite_player.weapon=1;
            },350);
            setTimeout(function(){
                if(self.getSprite('fireCircle')){
                    self.removeSprite('fireCircle');
                }

                if(self.getShape('fireCircle')){
                    self.removeShape('fireCircle');
                }
            },5000)
        }else{
            setTimeout(function(){
                //part one 让人物移动
                sprite_player.clicking=false;

                //part two 移除gunFire精灵
                self.removeSprite('gunFire');

                //part three 移除fireLine精灵或者是fireLines精灵
                if(self.getSprite('fireLine')){
                    self.removeSprite('fireLine');
                };
                if(self.getSprite('fireLines')){
                    self.removeSprite('fireLines');
                };


                //part three在shapes中的对象也删去
                if(self.getShape('fireLine')){
                    self.removeShape('fireLine');
                }
                if(self.getShape('fireLines')){
                    self.removeShape('fireLines');
                }
            },350);
        }



    },
    //5.人物和怪物精灵、怪物和障碍物坦克图形
    addSprite:function(sprite){
    this.sprites.push(sprite);
    },//增加game对象中sprites数组中的精灵对象；
    getSprite:function(name){
        var sprite;
        for (var i = 0; i < this.sprites.length; i++) {
             sprite=this.sprites[i];
            if(sprite.name===name){
                return sprite;
            }
        }
        return null;
    },//根据精灵对象的name属性，得到相对应的精灵对象；
    //7.startAnimate():
    addSprites_monster:function (monstersData_rea){
    //console.log('添加怪物');
        var array_monsters=[];
    for (var i = 0; i < monstersData_rea.length; i++) {
        var monsterData = monstersData_rea[i];
        var spriteSheetPainter_monster=new SpriteSheetPainter_monster(monsterData.cells);
        var sprite_monster=new Sprite(monsterData.name,monsterData.left,monsterData.top,monsterData.width,monsterData.height,monsterData.velocity,monsterData.healthPoint,spriteSheetPainter_monster,monsterData.behaviors);
        //console.log('怪物精灵的left为' + sprite_monster.left,'top为'+sprite_monster.top);
        this.addSprite(sprite_monster);//添加的怪物精灵坐-标是正确的，随机五个
        array_monsters.push(sprite_monster);
    };
        return array_monsters;
},//添加怪物到sprites中
    addSprite_player:function (width,height,basicSpeed,healthPoint){
    var spriteSheetPainter_player= new SpriteSheetPainter_player(bodyCell,runCells);
    var sprite_player=new Sprite('player',400,300,width,height,basicSpeed,healthPoint,spriteSheetPainter_player);//在名为person的对象的时候，调用两个painter
        sprite_player.weapon=1;
    game.addSprite(sprite_player);
},
    addSprite_gunFire:function(sprite_player,width,height,gunfireCell,runInPlaceBehavior){
        var spriteSheetPainter_gunfire=new SpriteSheetPainter_gunfire(gunfireCell);
        var sprite_gunfire=new Sprite('gunFire',sprite_player.left+sprite_player.width,sprite_player.top+sprite_player.height/2-10,width,height,0,0,spriteSheetPainter_gunfire,[runInPlaceBehavior]);
        game.addSprite(sprite_gunfire);

    },
    addSprite_fireLine:function(sprite_player,width,height,velocity,movingBehavior){
        var sprite_fireLine=new Sprite('fireLine',sprite_player.left+sprite_player.width,sprite_player.top+sprite_player.height/2,width,height,velocity,0,linePainter_fireLine,[movingBehavior]);
        sprite_fireLine.velocityX=sprite_fireLine.velocity;
        game.addSprite(sprite_fireLine);
    },
    addSprite_fireLines:function(sprite_player,width,height,velocity,movingBehavior){
        var moving=Object.assign({},movingBehavior);
        var sprite_fireLines=new Sprite('fireLines',sprite_player.left+sprite_player.width,sprite_player.top+sprite_player.height/2,width,height,velocity,0,linePainter_fireLines,[moving]);
        sprite_fireLines.velocityX=sprite_fireLines.velocity;
        game.addSprite(sprite_fireLines);
    },
    addSprite_fireCircle:function(sprite_player,width,height,velocity,linePainter_fireCircle,movingBehavior){
        var moving=Object.assign({},movingBehavior);
        var linePainter_fireCircle_new=Object.assign({},linePainter_fireCircle);
        var sprite_fireCircle=new Sprite('fireCircle',sprite_player.left+sprite_player.width,sprite_player.top+sprite_player.height/2,width,height,velocity,0,linePainter_fireCircle_new,[moving]);
        sprite_fireCircle.velocityX=sprite_fireCircle.velocity;
        game.addSprite(sprite_fireCircle);
    },


    beforeGame:function(width_sprite_player,height_sprite_player,basicVelocity_sprite_player,healthPoint_sprite_player,monstersData_tem,polygon_tank_points,runInPlaceBehavior,movingBehavior){
        var monstersData_rea=getMonstersData_rea(this.canvas,monstersData_tem,runInPlaceBehavior,movingBehavior);

        this.addSprite_player(width_sprite_player,height_sprite_player,basicVelocity_sprite_player,healthPoint_sprite_player);
        var array_monsters=this.addSprites_monster(monstersData_rea);
        this.addSpriteShapes_monster(array_monsters);
        this.addPolygonShape_Tank(polygon_tank_points);
        this.addSpriteShape_player();
    },
    middleGame:function(monstersData_tem,runInPlaceBehavior,movingBehavior){
        if(Math.ceil(this.gameTime/this.INTERVAL_loop)>this.index_loop){
            this.index_loop++;
            for (var i = 0; i < monstersData_tem.length; i++) {
                var monsterData_tem = monstersData_tem[i];
                if(this.index_loop===7){
                    if(monsterData_tem.name==='zombie'||monsterData_tem.name==='lizard'){
                        monsterData_tem.number++;
                    }
                }else if(this.index_loop===13){
                    if(monsterData_tem.name==='spider'){
                        monsterData_tem.number++;
                    }
                }else if(this.index_loop===25){
                    if(monsterData_tem.name==='boss'){
                        monsterData_tem.number++;
                    }
                }else if(this.index_loop===37){
                    if(monsterData_tem.name==='spider'){
                        monsterData_tem.number++;
                    }
                }else  if(this.index_loop===48){
                    if(monsterData_tem.name==='boss'){
                        monsterData_tem.number++;
                    }
                }

            }
            var monstersData_rea=getMonstersData_rea(this.canvas,monstersData_tem,runInPlaceBehavior,movingBehavior);
            var array_monsters=this.addSprites_monster(monstersData_rea);
            this.addSpriteShapes_monster(array_monsters);
        }
    },
    removeSprite:function(spriteName){
        var sprite=this.getSprite(spriteName);
        var index=this.sprites.indexOf(sprite);
        if(index!==-1){
            this.sprites.splice(index,1);
        }
    },
    //6.shape相关
    addShape:function(shape){
        this.shapes.push(shape)
    },
    addSpriteShapes_monster:function (array_monster){
        for (var i = 0; i < array_monster.length; i++){
            var sprite = array_monster[i];
            if(sprite.name==='zombie'||sprite.name==='spider'||sprite.name==='lizard'||sprite.name==='boss'){
                var spriteShape_monster=new SpriteShape(sprite);
                spriteShape_monster.name='monster';
                //game.shapes.push(spriteShape_monster);
                this.addShape(spriteShape_monster);
            }
        }
    },//添加怪物精灵图形到shapes属性中
    addPolygonShape_Tank:function (polygon_tank_points){
        var polygon_tank=new Polygon('tank');
        for (var i = 0; i < polygon_tank_points.length; i++) {
            var polygon_tank_point = polygon_tank_points[i];
            polygon_tank.addPoint(polygon_tank_point.x,polygon_tank_point.y)
        }
        //game.shapes.push(polygon_tank)
        polygon_tank.readyToDetectCollisions=false;
        this.addShape(polygon_tank)
    },//添加多边形tank到shapes属性中
    //5.1综合
    addSpriteShape_fireLine:function(){
        var sprite_fireLine=this.getSprite('fireLine');
        var spriteShape_fireLine=new SpriteShape(sprite_fireLine);
        spriteShape_fireLine.name='fireLine';
        //spriteShape_fireLine.addPoint(460,320);肯定是错的
        spriteShape_fireLine.readyToDetectCollisions=false;
        this.addShape(spriteShape_fireLine);
    },
    addSpriteShape_fireLines:function(){
        var sprite_fireLines=this.getSprite('fireLines');
        var spriteShape_fireLines=new SpriteShape(sprite_fireLines);
        spriteShape_fireLines.name='fireLines';
        //spriteShape_fireLine.addPoint(460,320);肯定是错的
        spriteShape_fireLines.readyToDetectCollisions=false;
        this.addShape(spriteShape_fireLines);
    },
    addCircleShape_fireCircle:function(){
        /*var polygon_tank=new Polygon('tank');
         for (var i = 0; i < polygon_tank_points.length; i++) {
         var polygon_tank_point = polygon_tank_points[i];
         polygon_tank.addPoint(polygon_tank_point.x,polygon_tank_point.y)
         }
         //game.shapes.push(polygon_tank)
         polygon_tank.readyToDetectCollisions=false;
         this.addShape(polygon_tank)
        * */
        var sprite_fireCircle=this.getSprite('fireCircle');
        var x=sprite_fireCircle.painter.translateX+Math.cos(sprite_fireCircle.painter.radian)*(sprite_fireCircle.left-sprite_fireCircle.painter.translateX);
        var y=sprite_fireCircle.painter.translateY+Math.sin(sprite_fireCircle.painter.radian)*(sprite_fireCircle.left-sprite_fireCircle.painter.translateX);

        var circle_fireCircle=new Circle('fireCircle',x,y,sprite_fireCircle.width/2);
        circle_fireCircle.readyToDetectCollisions=false;
        this.addShape(circle_fireCircle);
    },
    addSpriteShape_player:function(){
        var sprite_player=this.getSprite('player');
        var spriteShape_player=new SpriteShape(sprite_player);
        spriteShape_player.name='player';
        //spriteShape_fireLine.addPoint(460,320);肯定是错的
        spriteShape_player.readyToDetectCollisions=false;
        this.addShape(spriteShape_player);
    },
    getShape:function(name){
        var shape;
        for (var i = 0; i < this.shapes.length; i++) {
             shape = this.shapes[i];
            if(shape.name===name){
                return shape;
            }
        }
        return null;
    },
    removeShape:function(shapeName){
      var shape=this.getShape(shapeName);
        var index=this.shapes.indexOf(shape);
        if(index!==-1){
            this.shapes.splice(index,1);
        }
    },
    //7.获取当前的时间
    getTimeNow:function(){
        return +new Date();
    },

    getPlayerVelocity:function(){
    var sprite_player=this.getSprite('player');
    this.keys.length!==0?sprite_player.animating=true:sprite_player.animating=false;
        if(sprite_player.animating===false||sprite_player.clicking===true){
            return
        }
        if(this.keys.includes('left arrow')){
            if(this.keys.includes('up arrow')){
                sprite_player.velocityX=-sprite_player.velocity/Math.sqrt(2);
                sprite_player.velocityY=-sprite_player.velocity/Math.sqrt(2);
            }else if(this.keys.includes('down arrow')){
                sprite_player.velocityX=-sprite_player.velocity/Math.sqrt(2);
                sprite_player.velocityY=sprite_player.velocity/Math.sqrt(2);
            }else{
                sprite_player.velocityX=-sprite_player.velocity;
            }
        }else if(this.keys.includes('up arrow')){
            if(this.keys.includes('right arrow')){
                sprite_player.velocityX=sprite_player.velocity/Math.sqrt(2);
                sprite_player.velocityY=-sprite_player.velocity/Math.sqrt(2);
            }else{
                sprite_player.velocityY=-sprite_player.velocity;
            }
        }else if(this.keys.includes('right arrow')){
            if(this.keys.includes('down arrow')){
                sprite_player.velocityX=sprite_player.velocity/Math.sqrt(2);
                sprite_player.velocityY=sprite_player.velocity/Math.sqrt(2);
            }else {
                sprite_player.velocityX=sprite_player.velocity;
            }
        }else if(this.keys.includes('down arrow')){
            sprite_player.velocityY=sprite_player.velocity;
        }
},

    getMonstersVelocity:function () {
    var sprite_player=this.getSprite('player'),
        targetX =sprite_player.left+sprite_player.width/2,
        targetY = sprite_player.top+sprite_player.height/2,
        leftDelta_tem,
        topDelta_tem,
        sprite;
    for (var i = 0; i <this.sprites.length; i++) {
        /* var sprite=self.sprites[i];
         if(sprite.left<targetLeft){
         sprite.velocityX=4;
         }else if(sprite.left>targetLeft){
         sprite.velocityX=-4;
         }else{
         sprite.velocityX=0;
         }
         if(sprite.top<targetTop){
         sprite.velocityY=4;
         }else if(sprite.top>targetTop){
         sprite.velocityY=-4;
         }else{
         sprite.velocityY=0;
         }*/
        sprite = this.sprites[i];
        if(sprite.name==='zombie'||sprite.name==='lizard'||sprite.name==='spider'||sprite.name==='boss'){
            leftDelta_tem = targetX - (sprite.left+sprite.width/2);
            topDelta_tem = targetY - (sprite.top+sprite.height/2);
            //try：修正x,y方向的偏移量
            var radian=Math.atan(Math.abs(topDelta_tem)/Math.abs(leftDelta_tem));
            if(leftDelta_tem>Math.cos(radian)*40){
                sprite.stick=false;
                leftDelta_tem=leftDelta_tem-Math.cos(radian)*40
            }else if(leftDelta_tem<-Math.cos(radian)*40){
                sprite.stick=false;
                leftDelta_tem=leftDelta_tem+Math.cos(radian)*40;
            }else{
                sprite.stick=true;
                return;
            }
            if(topDelta_tem>Math.sin(radian)*40){
                sprite.stick=false;
                topDelta_tem=topDelta_tem-Math.sin(radian)*40
            }else if(topDelta_tem<-Math.sin(radian)*40){
                topDelta_tem=topDelta_tem+Math.sin(radian)*40;
                sprite.stick=false;
            }else {
                sprite.stick=true;
                return;
            }

            if (Math.abs(leftDelta_tem) > Math.abs(topDelta_tem)) {
                if (leftDelta_tem > 0) {
                    sprite.velocityX = sprite.velocity;
                    if (topDelta_tem > 0) {
                        sprite.velocityY = Math.abs(topDelta_tem) / Math.abs(leftDelta_tem) * sprite.velocity
                    } else if (topDelta_tem < 0) {
                        sprite.velocityY = Math.abs(topDelta_tem) / Math.abs(leftDelta_tem) * -sprite.velocity
                    } else {
                        sprite.velocityY = 0;
                    }
                } else if (leftDelta_tem < 0) {
                    sprite.velocityX = -sprite.velocity;
                    if (topDelta_tem > 0) {
                        sprite.velocityY = Math.abs(topDelta_tem) / Math.abs(leftDelta_tem) * sprite.velocity
                    } else if (topDelta_tem < 0) {
                        sprite.velocityY = Math.abs(topDelta_tem) / Math.abs(leftDelta_tem) * -sprite.velocity
                    } else {
                        sprite.velocityY = 0;
                    }
                }
            }
            else if (Math.abs(leftDelta_tem) < Math.abs(topDelta_tem)) {
                if (topDelta_tem > 0) {
                    sprite.velocityY = sprite.velocity;
                    if (leftDelta_tem > 0) {
                        sprite.velocityX = Math.abs(leftDelta_tem) / Math.abs(topDelta_tem) * sprite.velocity
                    } else if (leftDelta_tem < 0) {
                        sprite.velocityX = Math.abs(leftDelta_tem) / Math.abs(topDelta_tem) * -sprite.velocity
                    } else {
                        sprite.velocityX = 0;
                    }
                } else if (topDelta_tem < 0) {
                    sprite.velocityY = -sprite.velocity;
                    if (leftDelta_tem > 0) {
                        sprite.velocityX = Math.abs(leftDelta_tem) / Math.abs(topDelta_tem) * sprite.velocity
                    } else if (leftDelta_tem < 0) {
                        sprite.velocityX = Math.abs(leftDelta_tem) / Math.abs(topDelta_tem) * -sprite.velocity
                    } else {
                        sprite.velocityX = 0;
                    }
                }
            }
            else {
                if (leftDelta_tem === 0) {
                    sprite.left = 0;
                    sprite.top = 0;
                } else if (leftDelta_tem > 0) {
                    sprite.velocityX = sprite.velocity;
                    if (topDelta_tem > 0) {
                        sprite.velocityY = sprite.velocity;
                    } else {
                        sprite.velocityY = -sprite.velocity;
                    }
                } else {
                    sprite.velocityX = -sprite.velocity;
                    if (topDelta_tem > 0) {
                        sprite.velocityY = sprite.velocity;
                    } else {
                        sprite.velocityY = -sprite.velocity;
                    }
                }

            }
            //console.log('精灵X方向的速度'+sprite.velocityX, 'Y方向的速度为'+sprite.velocityY);
        }
    }
},

    playerHurted:function(healthPoint){
        var sprite_player=this.getSprite('player');
        for (var i = 0; i < this.sprites.length; i++) {
            var sprite = this.sprites[i];
            if(sprite.stick===true&&sprite.name!=='player'&&sprite_player.healthPoint>0){
                sprite_player.healthPoint-=healthPoint;
            }
        }
        if(sprite_player.healthPoint<=0){
            sprite_player.healthPoint=0;
            sprite_player.dead=true;
        }
    },//更新人物的血量，并且判断人物是否死亡

    //得到人物精灵身体的旋转角度
    /*getPlayerBodyRadian:function(){
        console.log(this.clientX);
        if(this.clientX===undefined){return}
        var sprite_player=this.getSprite('player');
        var coordinate_click=windowToCanvas(this.canvas, this.clientX, this.clientY);
        var coordinate_player={};
        var delta_coordinate={};
        var radian;
        //获取精灵的中心点；
        coordinate_player.x=sprite_player.left+sprite_player.width/2;
        coordinate_player.y=sprite_player.top+sprite_player.height/2;
        delta_coordinate.x=coordinate_click.x-coordinate_player.x;
        delta_coordinate.y=coordinate_click.y-coordinate_player.y;
        if(delta_coordinate.x>0){
            radian=Math.atan(delta_coordinate.y/delta_coordinate.x)
        }else{
            radian=Math.atan(delta_coordinate.y/delta_coordinate.x)+Math.PI;
        }
        sprite_player.painter.radian_body=radian;
        console.log(sprite_player.painter.radian_body);
    }*/
    getCoordinate_player:function(sprite_player){
        var coordinate_player={};
        coordinate_player.x=sprite_player.left+sprite_player.width/2;
        coordinate_player.y=sprite_player.top+sprite_player.height/2;
        return coordinate_player;
    },
    getCoordinate_click:function (canvas,clientX,clientY){
        var bbox=canvas.getBoundingClientRect();
        return{
            x:clientX-bbox.left*(canvas.width/bbox.width),
            y:clientY-bbox.top*(canvas.height/bbox.height)
        }
    },
    changePlayerRadian_click:function(coordinate_player,coordinate_click){
        var sprite_player=this.getSprite('player');
        var delta_coordinate={};
        var radian;
        //获取精灵的中心点；
        delta_coordinate.x=coordinate_click.x-coordinate_player.x;
        delta_coordinate.y=coordinate_click.y-coordinate_player.y;
        if(delta_coordinate.x>0){
            radian=Math.atan(delta_coordinate.y/delta_coordinate.x)
        }else{
            radian=Math.atan(delta_coordinate.y/delta_coordinate.x)+Math.PI;
        }
        sprite_player.radian=radian;
    },
    resetHitted_monsters:function(){
        for (var i = 0; i < this.sprites.length; i++) {
            var sprite = this.sprites[i];
            if(sprite.name==='zombie'||sprite.name==='spider'||sprite.name==='lizard'||sprite.name==='boss'){
                sprite.hitted_everyClick=false;
            }
        }
    },//重置每一帧的攻击记录


    updateSpriteShapesPoint_monster:function(){
        for (var i = 0; i < this.shapes.length; i++) {
            var shape = this.shapes[i];
            if(shape.name==='monster'){
                shape.points=[];
                shape.setPolygonPoints();
            }
        }
        var tank=this.getShape('tank');
        tank.readyToDetectCollisions=true;
    },//更新怪物点，并且开启tank检测
    updateSpriteShapePoint_fireLine:function(){
        var spriteShape_fireLine=this.getShape('fireLine');
        if(!spriteShape_fireLine){
            return;
        }
        var sprite_player=this.getSprite('player');
        spriteShape_fireLine.points=[];//一个点足矣
        var length=spriteShape_fireLine.sprite.left+spriteShape_fireLine.sprite.width-sprite_player.left-sprite_player.width/2;
        var coordinate={};
        coordinate.x=sprite_player.left+sprite_player.width/2;
        coordinate.y=sprite_player.top+sprite_player.height/2;
        spriteShape_fireLine.addPoint(coordinate.x+Math.cos(sprite_player.radian)*length,coordinate.y+Math.sin(sprite_player.radian)*length);
        spriteShape_fireLine.readyToDetectCollisions=true;
    },//更新fireLine点，并且开启fireLine检测
    updateSpriteShapePoint_fireLines:function(){
        var spriteShape_fireLines=this.getShape('fireLines');
        if(!spriteShape_fireLines){
            return;
        }
        var sprite_player=this.getSprite('player');
        spriteShape_fireLines.points=[];//一个点足矣
        var length=spriteShape_fireLines.sprite.left+spriteShape_fireLines.sprite.width-sprite_player.left-sprite_player.width/2;
        var coordinate={};
        var angle_radian=15*Math.PI/180;
        coordinate.x=sprite_player.left+sprite_player.width/2;
        coordinate.y=sprite_player.top+sprite_player.height/2;
        spriteShape_fireLines.addPoint(coordinate.x+Math.cos(sprite_player.radian)*length,coordinate.y+Math.sin(sprite_player.radian)*length);
        spriteShape_fireLines.addPoint(coordinate.x+Math.cos(sprite_player.radian+angle_radian)*length,coordinate.y+Math.sin(sprite_player.radian+angle_radian)*length);
        spriteShape_fireLines.addPoint(coordinate.x+Math.cos(sprite_player.radian-angle_radian)*length,coordinate.y+Math.sin(sprite_player.radian-angle_radian)*length);
        spriteShape_fireLines.readyToDetectCollisions=true;
    },//更新fireLine点，并且开启fireLine检测
    updateCircleShapeXandY_fireCircle:function(){
        var circleShape_fireCircle=this.getShape('fireCircle');
        if(!circleShape_fireCircle){
            return;
        }
        /*
        circleShape_fireCircle.points=[];//一个点足矣
        var length=spriteShape_fireLines.sprite.left+spriteShape_fireLines.sprite.width-sprite_player.left-sprite_player.width/2;
        var coordinate={};
        var angle_radian=15*Math.PI/180;
        coordinate.x=sprite_player.left+sprite_player.width/2;
        coordinate.y=sprite_player.top+sprite_player.height/2;
        spriteShape_fireLines.addPoint(coordinate.x+Math.cos(sprite_player.radian)*length,coordinate.y+Math.sin(sprite_player.radian)*length);
        spriteShape_fireLines.addPoint(coordinate.x+Math.cos(sprite_player.radian+angle_radian)*length,coordinate.y+Math.sin(sprite_player.radian+angle_radian)*length);
        spriteShape_fireLines.addPoint(coordinate.x+Math.cos(sprite_player.radian-angle_radian)*length,coordinate.y+Math.sin(sprite_player.radian-angle_radian)*length);*/
        var sprite_fireCircle=this.getSprite('fireCircle');
        var x=sprite_fireCircle.painter.translateX+Math.cos(sprite_fireCircle.painter.radian)*(sprite_fireCircle.left-sprite_fireCircle.painter.translateX);
        var y=sprite_fireCircle.painter.translateY+Math.sin(sprite_fireCircle.painter.radian)*(sprite_fireCircle.left-sprite_fireCircle.painter.translateX);
        circleShape_fireCircle.x=x;
        circleShape_fireCircle.y=y;
        circleShape_fireCircle.readyToDetectCollisions=true;
    },//更新fireCircle的x，y坐标,并且开启fireCircle检测
    updateSpriteShapesPoint_player:function(){
        var spriteShape=this.getShape('player');
        spriteShape.points=[];
        spriteShape.setPolygonPoints();
        var tank=this.getShape('tank');
        tank.readyToDetectCollisions=true;
    },//更新player的店，并且开启tank检测（-_-)



    tankDetectCollisionsWithMonsters:function (){
        var polygon_tank=this.getShape('tank');
    if(polygon_tank.readyToDetectCollisions===false){
        return;
    }
    for (var i = 0; i < this.shapes.length; i++) {
        var shape = this.shapes[i];
        if(shape.name==='monster'){
            var mtv=polygon_tank.collidesWith(shape);
            if(mtv.overlap!==0) {
                separate(shape,mtv);
            }else{
            }
        }
    }
},//tank碰撞检测
    fireLineDetectCollisionsWithMonsters:function(offset_monster){
    var spriteShape_fireLine=this.getShape('fireLine');
    if(!spriteShape_fireLine||spriteShape_fireLine.readyToDetectCollisions===false){
        return;
    }
    for (var i = 0; i < this.shapes.length; i++) {
        var shape = this.shapes[i];
        if(shape.name==='monster'&&shape.sprite.hitted_everyClick===false){
            //获取被检测的图形的四个点的x，y范围：
            var x_min=Math.min.apply(Math,[shape.points[0].x,shape.points[1].x,shape.points[2].x,shape.points[3].x]);
            var x_max=Math.max.apply(Math,[shape.points[0].x,shape.points[1].x,shape.points[2].x,shape.points[3].x]);
            var y_min=Math.min.apply(Math,[shape.points[0].y,shape.points[1].y,shape.points[2].y,shape.points[3].y]);
            var y_max=Math.max.apply(Math,[shape.points[0].y,shape.points[1].y,shape.points[2].y,shape.points[3].y]);
            //console.log('fireLine的点为',spriteShape_fireLine.points[0]);
            //console.log(shape.sprite.name,'x最值', x_min, x_max, 'y最值', y_min, y_max);
            //console.log(x_min,x_max,y_min,y_max);
            if(x_min<spriteShape_fireLine.points[0].x&&spriteShape_fireLine.points[0].x<x_max&&y_min<spriteShape_fireLine.points[0].y&&spriteShape_fireLine.points[0].y<y_max){
                console.log(shape.sprite.name, '被击中了');
                playSound('audio_mAttacked')
                shape.sprite.hitted_everyClick=true;
                shape.sprite.healthPoint-=40;
                if(shape.sprite.healthPoint<=0){
                    //给一个新的绘制器对象
                    //并且清除moving行为对象
                    shape.sprite.left+=-offset_monster*Math.cos(shape.sprite.radian);
                    shape.sprite.top+=-offset_monster*Math.sin(shape.sprite.radian);

                    switch (shape.sprite.name ){
                        case 'zombie': var spritePainter_monster=new SpriteSheetPainter_monster(zombieDieCells);
                            shape.sprite.painter=spritePainter_monster;
                            var runInPlaceBehavior_new=Object.assign({},runInPlaceBehavior);
                            shape.sprite.behaviors=[runInPlaceBehavior_new];break;
                        case 'lizard': var spritePainter_monster=new SpriteSheetPainter_monster(lizardDieCells);
                            shape.sprite.painter=spritePainter_monster;
                            var runInPlaceBehavior_new=Object.assign({},runInPlaceBehavior);
                            shape.sprite.behaviors=[runInPlaceBehavior_new];break;
                        case 'spider': var spritePainter_monster=new SpriteSheetPainter_monster(spiderDieCells);
                            shape.sprite.painter=spritePainter_monster;
                            var runInPlaceBehavior_new=Object.assign({},runInPlaceBehavior);
                            shape.sprite.behaviors=[runInPlaceBehavior_new];break;
                        case 'boss': var spritePainter_monster=new SpriteSheetPainter_monster(bossDieCells);
                            shape.sprite.painter=spritePainter_monster;
                            var runInPlaceBehavior_new=Object.assign({},runInPlaceBehavior);
                            shape.sprite.behaviors=[runInPlaceBehavior_new];break;
                    }
                }
            }
        }
    }
},//fireLine碰撞检测
    fireLinesDetectCollisionsWithMonsters:function(offset_monster){
        var spriteShape_fireLines=this.getShape('fireLines');
        if(!spriteShape_fireLines||spriteShape_fireLines.readyToDetectCollisions===false){
            return;
        }
        for (var i = 0; i < this.shapes.length; i++) {
            var shape = this.shapes[i];
            if(shape.name==='monster'&&shape.sprite.hitted_everyClick===false){
                //获取被检测的图形的四个点的x，y范围：
                var x_min=Math.min.apply(Math,[shape.points[0].x,shape.points[1].x,shape.points[2].x,shape.points[3].x]);
                var x_max=Math.max.apply(Math,[shape.points[0].x,shape.points[1].x,shape.points[2].x,shape.points[3].x]);
                var y_min=Math.min.apply(Math,[shape.points[0].y,shape.points[1].y,shape.points[2].y,shape.points[3].y]);
                var y_max=Math.max.apply(Math,[shape.points[0].y,shape.points[1].y,shape.points[2].y,shape.points[3].y]);
                //console.log('fireLine的点为',spriteShape_fireLine.points[0]);
                //console.log(shape.sprite.name,'x最值', x_min, x_max, 'y最值', y_min, y_max);
                //console.log(x_min,x_max,y_min,y_max);
                if(x_min<spriteShape_fireLines.points[0].x&&spriteShape_fireLines.points[0].x<x_max&&y_min<spriteShape_fireLines.points[0].y&&spriteShape_fireLines.points[0].y<y_max||x_min<spriteShape_fireLines.points[1].x&&spriteShape_fireLines.points[1].x<x_max&&y_min<spriteShape_fireLines.points[1].y&&spriteShape_fireLines.points[1].y<y_max||x_min<spriteShape_fireLines.points[2].x&&spriteShape_fireLines.points[2].x<x_max&&y_min<spriteShape_fireLines.points[2].y&&spriteShape_fireLines.points[2].y<y_max){
                    console.log(shape.sprite.name, '被击中了');
                    playSound('audio_mAttacked')
                    shape.sprite.hitted_everyClick=true;
                    shape.sprite.healthPoint-=40;
                    if(shape.sprite.healthPoint<=0){
                        //给一个新的绘制器对象
                        //并且清除moving行为对象
                        shape.sprite.left+=-offset_monster*Math.cos(shape.sprite.radian);
                        shape.sprite.top+=-offset_monster*Math.sin(shape.sprite.radian);

                        switch (shape.sprite.name ){
                            case 'zombie': var spritePainter_monster=new SpriteSheetPainter_monster(zombieDieCells);
                                shape.sprite.painter=spritePainter_monster;
                                var runInPlaceBehavior_new=Object.assign({},runInPlaceBehavior);
                                shape.sprite.behaviors=[runInPlaceBehavior_new];break;
                            case 'lizard': var spritePainter_monster=new SpriteSheetPainter_monster(lizardDieCells);
                                shape.sprite.painter=spritePainter_monster;
                                var runInPlaceBehavior_new=Object.assign({},runInPlaceBehavior);
                                shape.sprite.behaviors=[runInPlaceBehavior_new];break;
                            case 'spider': var spritePainter_monster=new SpriteSheetPainter_monster(spiderDieCells);
                                shape.sprite.painter=spritePainter_monster;
                                var runInPlaceBehavior_new=Object.assign({},runInPlaceBehavior);
                                shape.sprite.behaviors=[runInPlaceBehavior_new];break;
                            case 'boss': var spritePainter_monster=new SpriteSheetPainter_monster(bossDieCells);
                                shape.sprite.painter=spritePainter_monster;
                                var runInPlaceBehavior_new=Object.assign({},runInPlaceBehavior);
                                shape.sprite.behaviors=[runInPlaceBehavior_new];break;
                        }
                    }
                }
            }
        }
    },//fireLines碰撞检测
    fireCircleDetectCollisionsWithMonsters:function(){
        var circle_fireCircle=this.getShape('fireCircle');
        if(!circle_fireCircle||circle_fireCircle.readyToDetectCollisions===false){
            return;
        }
        for (var i = 0; i < this.shapes.length; i++) {
            var shape = this.shapes[i];
            if(shape.name==='monster'&&shape.sprite.hitted_everyClick===false){
                var mtv=circle_fireCircle.collidesWith(shape);
                if(mtv.overlap!==0) {
                    playSound('audio_mAttacked');
                    shape.sprite.hitted_everyClick=true;
                    switch (shape.sprite.name ){
                        case 'zombie': var spritePainter_monster=new SpriteSheetPainter_monster(zombieDieCells);
                            shape.sprite.painter=spritePainter_monster;
                            var runInPlaceBehavior_new=Object.assign({},runInPlaceBehavior);
                            shape.sprite.behaviors=[runInPlaceBehavior_new];break;
                        case 'lizard': var spritePainter_monster=new SpriteSheetPainter_monster(lizardDieCells);
                            shape.sprite.painter=spritePainter_monster;
                            var runInPlaceBehavior_new=Object.assign({},runInPlaceBehavior);
                            shape.sprite.behaviors=[runInPlaceBehavior_new];break;
                        case 'spider': var spritePainter_monster=new SpriteSheetPainter_monster(spiderDieCells);
                            shape.sprite.painter=spritePainter_monster;
                            var runInPlaceBehavior_new=Object.assign({},runInPlaceBehavior);
                            shape.sprite.behaviors=[runInPlaceBehavior_new];break;
                        case 'boss': var spritePainter_monster=new SpriteSheetPainter_monster(bossDieCells);
                            shape.sprite.painter=spritePainter_monster;
                            var runInPlaceBehavior_new=Object.assign({},runInPlaceBehavior);
                            shape.sprite.behaviors=[runInPlaceBehavior_new];break;
                    }
                }
            }
        }
    },//fireCircle碰撞检测
   /* tankDetectCollisionsWithPlayer:function(){
        var sprite_player=this.getSprite('player');
        var left_yuanlai=sprite_player.left;
        var top_yuanlai=sprite_player.top;
        var radian_yuanlai=sprite_player.radian;
        sprite_player.update();
        var spriteShape_player=this.getShape('player');
        spriteShape_player.setPolygonPoints();
        sprite_player.left=left_yuanlai;
        sprite_player.top=top_yuanlai;
        sprite_player.radian=radian_yuanlai;
        var polygon_tank=this.getShape('tank');
        if(polygon_tank.readyToDetectCollisions===false){
            return;
        }
        var mtv=polygon_tank.collidesWith(spriteShape_player);
        if(mtv.overlap!==0){
            spriteShape_player.sprite.stick=true;
        }
    },*/
    tankDetectCollisionsWithPlayer:function(){
        var polygon_tank=this.getShape('tank');
        var spriteShape_player=this.getShape('player');
        if(polygon_tank.readyToDetectCollisions===false){
            return;
        }
        var mtv=polygon_tank.collidesWith(spriteShape_player);
        if(mtv.overlap!==0){
            //separate(spriteShape_player,mtv);
            var sprite_player=this.getSprite('player');
            sprite_player.left=sprite_player.left_yuanlai;
            sprite_player.top=sprite_player.top_yuanlai;
            sprite_player.radian=sprite_player.radian_yuanlai;

        }
    },

    //右侧栏相关
    /* var name='尼古拉斯';
     var healthPoint='100';
     var weapon='狙击枪';
     var fireAvailableAndTimeout='可用';
     var loops_count='第一波';
     this.context.save();
     this.context.font="18px '微软雅黑'";
     this.context.textAlign='center';
     this.context.fillStyle='black';
     this.context.fillText('人物名称：'+name,900,100);
     this.context.fillText('血量:'+healthPoint,900,200);
     this.context.fillText('当前武器：'+weapon,900,300);
     this.context.fillText('强效炎爆术'+fireAvailableAndTimeout,900,400);
     this.context.fillText('怪物波数：'+loops_count,900,500);
    * */
    updateGameTimeData:function(time,obj_data){
        if(time-this.lastTimeUpdate_gameTime>this.INTERVAL_gameTime){
            var tem=parseInt(this.gameTime/1000);
            if(tem>=300){
                this.gameOver=true;
                this.win=true;
            }
            if(tem<60){
                obj_data.gameTime=tem+'秒';
            }else{
                obj_data.gameTime=Math.floor(tem/60)+'分'+tem%60+'秒'
            }
            this.lastTimeUpdate_gameTime=time;
        }
    },
    updateHealthPointData:function (time,sprite_player,obj_data){
        if(time-this.lastTimeUpdate_health>this.INTERVAL_health){
            obj_data.healthPoint=sprite_player.healthPoint.toFixed(1);
            this.lastTimeUpdate_health=time;
        };
    },
    updateWeaponData:function(time,sprite_player,obj_data){
        if(time-this.lastTimeUpdate_weapon>this.INTERVAL_weapon){
            var number_weapon=sprite_player.weapon;
            switch (number_weapon){
                case 1:obj_data.weapon='手枪';break;
                case 2:obj_data.weapon='狙击枪';break;
                case 3:obj_data.weapon='散弹枪';break;
                case 3:obj_data.weapon='火球术';break;
            };
            this.lastTimeUpdate_weapon=time;
        };
    },
    updateCountData:function(time,count_deadMonster,obj_data){
        if(time-this.lastTimeUpdate_count>this.INTERVAL_count){
            obj_data.count=count_deadMonster;
            this.lastTimeUpdate_count=time;
        };
    },
    updatefireAvailableData:function(time,count,obj_data){
        if(time-this.lastTimeUpdate_fireAvailable>this.INTERVAL_fireAvailable){
            if(Math.floor(count/20)>this.count_20){
                obj_data.fireAvailable='可用';
                this.count_20++;
            }
            this.lastTimeUpdate_fireAvailable=time;
        };
    },
    updateLoopsCountData:function(time,obj_data){
        if(time-this.lastTimeUpdate_loopCount>this.INTERVAL_loopCount){
            obj_data.loops_count=this.index_loop;
            this.lastTimeUpdate_loopCount=time;
        };
    },

    drawFps:function(time,INTERVAL){
        if(time-this.lastUpdateFPS>INTERVAL){
            this.fps_record=this.fps.toFixed(1);
            this.lastUpdateFPS=time;
        }
        //1.fps部分
        this.context.save();
        this.context.fillStyle='black';
        this.context.fillText('FPS:',50,50);
        this.context.fillStyle='red';
        this.context.fillText(this.fps_record,90,50);
        this.context.restore();
    },
    drawPanel:function(){
        this.context.save();
        this.context.beginPath();
        this.context.moveTo(800,0);
        this.context.lineTo(1000,0);
        this.context.lineTo(1000,600);
        this.context.lineTo(800,600);
        this.context.fillStyle='#E8E8FF';
        this.context.fill();
        this.context.restore();
    }


};
function getRandomPosition(canvas){
    var top;
    var left;
    var randomNumber=Math.random()*0.8;
    if(randomNumber<0.2){
        top=0;
    }else if(randomNumber<0.4){
        left=800;
    }else if(randomNumber<0.6){
        top=600;
    }else {
        left=0;
    }
    if(top===undefined){
        top=randomNumber%0.2/0.2*600;//that`s bug where it is!,dad is coming!
    }else {
        left=randomNumber%0.2/0.2*800;
    }
    return{left:left,top:top}
}//得到一个拥有随机left，top属性的对象
function getMonstersData_rea(canvas,monstersData_tem,runInPlaceBehavior,movingBehavior){
    var monstersData_rea=[];
    for (var i = 0; i < monstersData_tem.length; i++) {
        var monsterData_tem = monstersData_tem[i];
        for (var j = 0; j < monsterData_tem.number; j++) {
            var behavior1={};
            var behavior2={};
            var monsterData_rea={};
            monsterData_rea= Object.assign(monsterData_rea,monsterData_tem);
            monsterData_rea.behaviors=[];
            behavior1=Object.assign(behavior1,runInPlaceBehavior);
            behavior2=Object.assign(behavior2,movingBehavior);
            var obj_temp=getRandomPosition(canvas);
            monsterData_rea.top=obj_temp.top;
            monsterData_rea.left=obj_temp.left;
            monsterData_rea.behaviors.push(behavior1);
            monsterData_rea.behaviors.push(behavior2);
            monstersData_rea.push(monsterData_rea);
        }
    }
    return monstersData_rea;
}//获取真实的怪物信息
function drawText(t,x,y,w){
    var chr = t.split("");
    var temp = "";
    var row = [];
    game.context.font = "20px Arial";
    game.context.fillStyle = "black";
    game.context.textBaseline = "middle";
    for(var a = 0; a < chr.length; a++){
        if( game.context.measureText(temp).width < w ){

        }
        else{
            row.push(temp);
            temp = "";
        }
        temp += chr[a];
    }
    row.push(temp);
    for(var b = 0; b < row.length; b++){
        game.context.fillText(row[b],x,y+(b+1)*20);
    }
}
function togglePaused(){
    game.togglePaused();
    pausedMask.style.display=game.paused?'block':'none';
}
function playSound(Id){
    var audio=document.getElementById(Id);
    if(Id==='audio_bg')audio.volume=0.7;
    //audio.load();
    audio.play();
}
function pausedSound(Id){
    var audio=document.getElementById(Id);
    audio.pause();
}
function playSound_interrupt(Id){
    var audio=document.getElementById(Id);
    if(!audio.ended){
        audio.load();
        audio.play();
    }else{
        audio.play();
    }
}

