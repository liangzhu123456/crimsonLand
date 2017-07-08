var bodyCell={left:80,top:70,width:220,height:220};
var runCells=[{left:0,top:407,width:213,height:107},
    {left:213,top:407,width:213,height:107},
    {left:426,top:407,width:213,height:107},
    {left:639,top:407,width:213,height:107},
    {left:852,top:407,width:213,height:107},
    {left:1065,top:407,width:213,height:107},
    {left:1278,top:407,width:213,height:107},
    {left:1491,top:407,width:213,height:107},
    {left:1704,top:407,width:213,height:107},
    {left:0,top:557,width:213,height:107},
    {left:213,top:557,width:213,height:107},
    {left:426,top:557,width:213,height:107},
    {left:639,top:557,width:213,height:107},
    {left:852,top:557,width:213,height:107},
    {left:1065,top:557,width:213,height:107},
    {left:1278,top:557,width:213,height:107}];//精灵表中的腿，对应着runCells
//僵尸
var zombieCells=[{left:0,top:921,width:48,height:27},
    {left:48,top:921,width:48,height:27},
    {left:144,top:921,width:48,height:27},
    {left:192,top:921,width:48,height:27},
    {left:240,top:921,width:48,height:27},
    {left:288,top:921,width:48,height:27},
    {left:0,top:950,width:48,height:27},
    {left:48,top:950,width:48,height:27},
    {left:144,top:950,width:48,height:27},
    {left:192,top:950,width:48,height:27},
    {left:240,top:950,width:48,height:27},
    {left:288,top:950,width:48,height:27},
    {left:0,top:977,width:48,height:27},
    {left:48,top:977,width:48,height:27},
    {left:144,top:977,width:48,height:27},
    {left:192,top:977,width:48,height:27},
    {left:240,top:977,width:48,height:27},
    {left:288,top:977,width:48,height:27}],
    zombieDieCells=[{left:0,top:1035,width:58,height:53},
        {left:58,top:1035,width:58,height:53},
        {left:116,top:1035,width:58,height:53},
        {left:174,top:1035,width:58,height:53},
        {left:232,top:1035,width:58,height:53},
        {left:290,top:1035,width:58,height:53},
        {left:348,top:1035,width:58,height:53},
        {left:0,top:1088,width:58,height:53},
        {left:58,top:1088,width:58,height:53},
        {left:116,top:1088,width:58,height:53},
        {left:174,top:1088,width:58,height:53},
        {left:232,top:1088,width:58,height:53},
        {left:290,top:1088,width:58,height:53},
        {left:348,top:1088,width:58,height:53},
        {left:0,top:1141,width:58,height:53},
        {left:58,top:1141,width:58,height:53},
        {left:116,top:1141,width:58,height:53},
        {left:174,top:1141,width:58,height:53},
        {left:232,top:1141,width:58,height:53},
        {left:290,top:1141,width:58,height:53},
        {left:348,top:1141,width:58,height:53},
        {left:0,top:1194,width:58,height:53}];

//射击枪火
gunfireCell=[{left:0,top:795,width:116,height:77},
    {left:117,top:795,width:116,height:77},
    {left:234,top:795,width:116,height:77},
    {left:351,top:795,width:116,height:77}
];
//gunfire精灵的宽高为20*20

// 蜥蜴
var lizardCells=[{left:483,top:921,width:63,height:35},
        {left:546,top:921,width:63,height:35},
        {left:609,top:921,width:63,height:35},
        {left:672,top:921,width:63,height:35},
        {left:735,top:921,width:63,height:35},
        {left:798,top:921,width:63,height:35},
        {left:861,top:921,width:63,height:35},
        {left:483,top:955,width:63,height:35},
        {left:546,top:955,width:63,height:35},
        {left:609,top:955,width:63,height:35},
        {left:672,top:955,width:63,height:35},
        {left:735,top:955,width:63,height:35},
        {left:798,top:955,width:63,height:35},
        {left:861,top:955,width:63,height:35},
        {left:483,top:990,width:63,height:35},
        {left:546,top:990,width:63,height:35},
        {left:609,top:990,width:63,height:35},
        {left:672,top:990,width:63,height:35},
        {left:735,top:990,width:63,height:35},
        {left:798,top:990,width:63,height:35},
        {left:861,top:990,width:63,height:35}
    ],
    lizardDieCells=[{left:483,top:1025,width:63,height:46},
        {left:546,top:1025,width:63,height:46},
        {left:609,top:1025,width:63,height:46},
        {left:672,top:1025,width:63,height:46},
        {left:746,top:1025,width:63,height:46},
        {left:798,top:1025,width:63,height:46},
        {left:861,top:1025,width:63,height:46},
        {left:483,top:1071,width:63,height:46},
        {left:546,top:1071,width:63,height:46},
        {left:609,top:1071,width:63,height:46},
        {left:672,top:1071,width:63,height:46},
        {left:746,top:1071,width:63,height:46},
        {left:798,top:1071,width:63,height:46},
        {left:861,top:1071,width:63,height:46},
        {left:493,top:1117,width:63,height:46},
        {left:556,top:1117,width:63,height:46},
        {left:619,top:1117,width:63,height:46},
        {left:682,top:1117,width:63,height:46},
        {left:756,top:1117,width:63,height:46},
        {left:798,top:1117,width:63,height:46},
        {left:861,top:1117,width:63,height:46}];

// 蜘蛛
var spiderCells=[{left:957,top:921,width:67,height:48},
        {left:1024,top:921,width:67,height:48},
        {left:1091,top:921,width:67,height:48},
        {left:1158,top:921,width:67,height:48},
        {left:1225,top:921,width:67,height:48},
        {left:1292,top:921,width:67,height:48},
        {left:1359,top:921,width:67,height:48},
        {left:957,top:968,width:67,height:48},
        {left:1024,top:968,width:67,height:48},
        {left:1091,top:968,width:67,height:48},
        {left:1158,top:968,width:67,height:48},
        {left:1225,top:968,width:67,height:48},
        {left:1292,top:968,width:67,height:48},
        {left:1359,top:968,width:67,height:48},
        {left:957,top:1016,width:67,height:48},
        {left:1024,top:1016,width:67,height:48},
        {left:1091,top:1016,width:67,height:48},
        {left:1158,top:1016,width:67,height:48},
        {left:1225,top:1016,width:67,height:48},
        {left:1292,top:1016,width:67,height:48},
        {left:1359,top:1016,width:67,height:48}
    ],
    spiderDieCells=[{left:957,top:1064,width:67,height:48},
        {left:1024,top:1064,width:67,height:48},
        {left:1091,top:1064,width:67,height:48},
        {left:1158,top:1064,width:67,height:48},
        {left:1225,top:1064,width:67,height:48},
        {left:1292,top:1064,width:67,height:48},
        {left:1359,top:1064,width:67,height:48},
        {left:957,top:1112,width:67,height:48},
        {left:1024,top:1112,width:67,height:48},
        {left:1091,top:1112,width:67,height:48},
        {left:1158,top:1112,width:67,height:48},
        {left:1225,top:1112,width:67,height:48},
        {left:1292,top:1112,width:67,height:48},
        {left:1359,top:1112,width:67,height:48},
        {left:957,top:1160,width:67,height:48},
        {left:1024,top:1160,width:67,height:48},
        {left:1091,top:1160,width:67,height:48},
        {left:1158,top:1160,width:67,height:48},
        {left:1225,top:1160,width:67,height:48},
        {left:1292,top:1160,width:67,height:48},
        {left:1359,top:1160,width:67,height:48}];

// boss
var bossCells=[{left:1426,top:921,width:65,height:48},
        {left:1491,top:921,width:65,height:48},
        {left:1556,top:921,width:65,height:48},
        {left:1621,top:921,width:65,height:48},
        {left:1686,top:921,width:65,height:48},
        {left:1751,top:921,width:65,height:48},
        {left:1816,top:968,width:65,height:48},
        {left:1426,top:968,width:65,height:48},
        {left:1491,top:968,width:65,height:48},
        {left:1556,top:968,width:65,height:48},
        {left:1621,top:968,width:65,height:48},
        {left:1686,top:968,width:65,height:48},
        {left:1751,top:968,width:65,height:48},
        {left:1816,top:968,width:65,height:48},
        {left:1426,top:1016,width:65,height:48},
        {left:1491,top:1016,width:65,height:48},
        {left:1556,top:1016,width:65,height:48},
        {left:1621,top:1016,width:65,height:48},
        {left:1686,top:1016,width:65,height:48},
        {left:1751,top:1016,width:65,height:48},
        {left:1816,top:1016,width:65,height:48}
    ],
    bossDieCells=[{left:1426,top:1064,width:65,height:48},
        {left:1491,top:1064,width:65,height:48},
        {left:1556,top:1064,width:65,height:48},
        {left:1621,top:1064,width:65,height:48},
        {left:1686,top:1064,width:65,height:48},
        {left:1751,top:1064,width:65,height:48},
        {left:1816,top:1064,width:65,height:48},
        {left:1426,top:1112,width:65,height:48},
        {left:1491,top:1112,width:65,height:48},
        {left:1556,top:1112,width:65,height:48},
        {left:1621,top:1112,width:65,height:48},
        {left:1686,top:1112,width:65,height:48},
        {left:1751,top:1112,width:65,height:48},
        {left:1816,top:1112,width:65,height:48},
        {left:1426,top:1160,width:65,height:48},
        {left:1491,top:1160,width:65,height:48},
        {left:1556,top:1160,width:65,height:48},
        {left:1621,top:1160,width:65,height:48},
        {left:1686,top:1160,width:65,height:48},
        {left:1751,top:1160,width:65,height:48},
        {left:1816,top:1160,width:65,height:48}];

//行为对象
var runInPlaceBehavior={
    lastAdvance:0,
    ADVANCE_INTERVAL:50,
    execute:function(sprite,context,time){
        if(time-this.lastAdvance>this.ADVANCE_INTERVAL){
            sprite.painter.advance();
            this.lastAdvance=time;
        }
    }
};
var movingBehavior={
    //lastMove:0,
    execute:function(sprite,context,time){
        if(sprite.stick===true){
            return;
        }
        /*console.log('旋转精灵的名字'+sprite.name,'旋转精灵的X速度为'+sprite.velocityX,'Y速度为'+ sprite.velocityY);
        if(this.lastMove!==0){
           var  deltaX= (time-this.lastMove)/1000*sprite.velocityX;
            sprite.left=deltaX;
        }
        console.log('first,I am in',sprite.name);
        this.lastMove=time;
        part one is done!*/if(sprite.name==='fireLine'){
            //sprite.velocityX=sprite.velocity;
            var deltaX=game.pixelsPerFrame(sprite.velocityX);
            sprite.left+=deltaX;
            return;
        }//如果是fireLine精灵的话，这个行为对象只改变精灵的left属性，获取radian属性，因为不用；
        if(sprite.name==='fireLines'){
            var deltaX=game.pixelsPerFrame(sprite.velocityX);
            sprite.left+=deltaX;
            return;
        }
        if(sprite.name==='fireCircle'){
            var deltaX=game.pixelsPerFrame(sprite.velocityX);
            sprite.left+=deltaX;

            if((Math.cos(sprite.painter.radian)*(sprite.left-sprite.painter.translateX)+sprite.painter.translateX-sprite.width/2)<0||800<(Math.cos(sprite.painter.radian)*(sprite.left-sprite.painter.translateX)+sprite.painter.translateX+sprite.width/2)){
                var translateX=sprite.painter.translateX;
                sprite.painter.translateX=Math.cos(sprite.painter.radian)*(sprite.left-sprite.painter.translateX)+sprite.painter.translateX;
                sprite.painter.translateY=Math.sin(sprite.painter.radian)*(sprite.left-translateX)+sprite.painter.translateY;
                sprite.left=sprite.painter.translateX;
                sprite.top=sprite.painter.translateY;
                sprite.painter.radian=Math.PI-sprite.painter.radian;
            }
            if((Math.sin(sprite.painter.radian)*(sprite.left-sprite.painter.translateX)+sprite.painter.translateY-sprite.width/2)<0||600<(Math.sin(sprite.painter.radian)*(sprite.left-sprite.painter.translateX)+sprite.painter.translateY+sprite.width/2)){
                var translateX=sprite.painter.translateX;
                sprite.painter.translateX=Math.cos(sprite.painter.radian)*(sprite.left-sprite.painter.translateX)+sprite.painter.translateX;
                sprite.painter.translateY=Math.sin(sprite.painter.radian)*(sprite.left-translateX)+sprite.painter.translateY;
                sprite.left=sprite.painter.translateX;
                sprite.top=sprite.painter.translateY;
                sprite.painter.radian=-sprite.painter.radian;
            }
            return;
        }
        var deltaX=game.pixelsPerFrame(sprite.velocityX);
        var deltaY=game.pixelsPerFrame(sprite.velocityY);
        sprite.left+=deltaX;
        sprite.top+=deltaY;
        //part two,get radian,I am coming ,be shaking
        if(sprite.velocityX>0){
            if(sprite.velocityY==0){
                sprite.radian=0;
            }else{
                sprite.radian=Math.atan(sprite.velocityY/sprite.velocityX);
            }
        }else if(sprite.velocityX<0){
            if(sprite.velocityY==0){
                sprite.radian=Math.PI;
            }else{
                sprite.radian=Math.atan(sprite.velocityY/sprite.velocityX)+Math.PI;
            }
        }else
        {
            if(sprite.velocityY>0){
                sprite.radian=Math.PI/2;
            }else if(sprite.velocityY<0){
                sprite.radian=-Math.PI/2;
            }else{
                //怪物速度不能为零，但是人物肯定是可以的。以下都是针对人物精灵的代码，因为怪物精灵进不来；
                //而代码就是没有代码- -，维持上一次的旋转弧度；
            }
        }//三段论根据角度解决角度问题
        //console.log('精灵的旋转弧度为'+sprite.radian);
        //console.log('精灵的旋转角度为'+sprite.radian / Math.PI * 180);
    }
};//重点处理移动对象的两个功能；
/*一个精灵需要什么信息呢？
1.位置，尺寸
2.截取信息(两套)
3.速度(精灵只有一个方向的，不同速度的需要转换坐标系)
4.health point,在碰撞的时候进行操作；
5.添加到sprites属性的相对应的怪物的个数；
*/

//具体实施
//1.随机位置//top按照上右下左四个方向分配
var monstersData_tem=[
    {name:'zombie',left:0,top:0,width:32,height:35,cells:zombieCells,dieCells:zombieDieCells,healthPoint:40,number:2,behaviors:undefined,velocity:20},
    {name:'lizard',left:0,top:0,width:55,height:32,cells:lizardCells,dieCells:lizardDieCells,healthPoint:40,number:1,behaviors:undefined,velocity:30},
    {name:'spider',left:0,top:0,width:70,height:60,cells:spiderCells,dieCells:spiderDieCells,healthPoint:50,number:0,behaviors:undefined,velocity:25},
    {name:'boss',left:0,top:0,width:70,height:60,cells:bossCells,dieCells:bossDieCells,healthPoint:100,number:0,behaviors:undefined,velocity:20}
];

//碰撞检测相关
//坦克
var polygon_tank_points=
    [{x:427,y:234},{x:495,y:201},{x:561,y:319},{x:493,y:351}];
//在startAnimate上检测；
/*var spriteSheetPainter_lizard=new SpriteSheetPainter_monster(lizardCells);
var sprite_lizard=new Sprite('lizard',100,100,55,32,spriteSheetPainter_lizard);
game.addSprite(sprite_lizard);*/


/*var monsterType=[
 {type:0,ATK:4,speed:30,life:40,antiKick:0,cell:zombieCell,dieCell:zombieDieCell,interval:50,dieInterval:15,x:-15,y:-15,width:55,height:32,radius:15,score:10},
 {type:1,ATK:2,speed:55,life:30,antiKick:0,cell:lizardCell,dieCell:lizardDieCell,interval:50,dieInterval:15,x:-15,y:-15,width:55,height:32,radius:15,score:7},
 {type:2,ATK:8,speed:20,life:400,antiKick:10,cell:spiderCell,dieCell:spiderDieCell,interval:50,dieInterval:15,x:-10,y:-25,width:80,height:60,radius:40,score:30},
 {type:3,ATK:40,speed:20,life:5000,antiKick:45,cell:bossCell,dieCell:bossDieCell,interval:50,dieInterval:15,x:-5,y:-35,width:100,height:80,radius:70,score:300},
 {type:4,ATK:8,speed:50,life:500,antiKick:20,cell:zombieCell,dieCell:zombieDieCell,interval:50,dieInterval:15,x:-15,y:-10,width:60,height:40,radius:50,score:50},
 {type:5,ATK:5,speed:75,life:40,antiKick:0,cell:lizardCell,dieCell:lizardDieCell,interval:50,dieInterval:15,x:-15,y:-15,width:30,height:25,radius:15,score:12},
 {type:6,ATK:12,speed:40,life:400,antiKick:10,cell:spiderCell,dieCell:spiderDieCell,interval:50,dieInterval:15,x:-10,y:-25,width:30,height:20,radius:15,score:45},
 {type:7,ATK:40,speed:50,life:5000,antiKick:45,cell:bossCell,dieCell:bossDieCell,interval:50,dieInterval:15,x:-5,y:-35,width:100,height:80,radius:70,score:700}];     */


//人物死亡
playerDeadCells=[{left:414,top:78,width:64,height:63},
    {left:478,top:78,width:64,height:63},
    {left:542,top:78,width:64,height:63},
    {left:606,top:78,width:64,height:63},
    {left:670,top:78,width:64,height:63},
    {left:734,top:78,width:64,height:63},
    {left:798,top:78,width:64,height:63},
    {left:414,top:141,width:64,height:63},
    {left:478,top:141,width:64,height:63},
    {left:542,top:141,width:64,height:63},
    {left:606,top:141,width:64,height:63},
    {left:670,tzop:141,width:64,height:63},
    {left:734,top:141,width:64,height:63},
    {left:798,top:141,width:64,height:63},
    {left:414,top:204,width:64,height:63},
    {left:478,top:204,width:64,height:63},
    {left:542,top:204,width:64,height:63},
    {left:606,top:204,width:64,height:63},
    {left:670,top:204,width:64,height:63},
    {left:734,top:204,width:64,height:63},
    {left:798,top:204,width:64,height:63}]
