
var firstScreen=document.querySelector('#firstScreen');
var loadButton=document.querySelector('#firstScreen_loadButton input');
var loadMes=document.querySelector('#firstScreen_loadButton span');
var canvas_firstScreen=document.querySelector('#canvas_firstScreen');
var context_firstScreen=canvas_firstScreen.getContext('2d');
var spriteSheet;
var pausedMask=document.getElementById('pausedMask');
loadButton.onclick=function(e){
    e.preventDefault();
    loadMes.style.display='block';
    loadButton.style.display='none';
    canvas_firstScreen.style.display='block';
     game=new Game('crimson','canvas');
    game.queueImage('images/bkg.jpg');
    game.queueImage('images/bkg1.jpg');
    game.queueImage('images/sprite.png');
    game.queueImage('images/zhuzi.jpg');
    game.queueImage('images/book.jpg');

    var index_flag=0;
    var interval=setInterval(function(){
        var loadingPercentComplete=game.loadImages();
        if(loadingPercentComplete===0){return}
        context_firstScreen.clearRect(0,0,canvas_firstScreen.width,canvas_firstScreen.height);
        context_firstScreen.save();
        context_firstScreen.moveTo(20,40);
        context_firstScreen.arc(20,20,20,Math.PI/2,Math.PI/2*3);
        if(loadingPercentComplete===100){
            context_firstScreen.lineTo(580,0);
            context_firstScreen.arc(580,20,20,-Math.PI/2,Math.PI/2);
            context_firstScreen.closePath();
            index_flag++;
        }else{
            context_firstScreen.lineTo(loadingPercentComplete/100*600,0);
            context_firstScreen.lineTo(loadingPercentComplete/100*600,40);
            context_firstScreen.closePath();
        }

        context_firstScreen.fillStyle='#CC9933';
        context_firstScreen.fill();
        context_firstScreen.restore();
        if(index_flag===2){
            clearInterval(interval);
            spriteSheet=game.getImage('images/sprite.png');
            firstScreen.style.display='none';
            game.canvas.style.display='block';
            game.beforeGame(35,35,50,100,monstersData_tem,polygon_tank_points,runInPlaceBehavior,movingBehavior);
            game.addKeyListener_keydown({key:'space',listener:function(){
                console.log('you just press space');
                togglePaused();
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
                sprite_player.weapon=2;
                playSound('audio_reload')
            }});
            game.addKeyListener_keyup({key:'pistol',listener:function(){
                var sprite_player=game.getSprite('player');
                sprite_player.weapon=1;
                playSound('audio_reload')
            }});
            game.addKeyListener_keyup({key:'shotgun',listener:function(){
                var sprite_player=game.getSprite('player');
                sprite_player.weapon=3;
                playSound('audio_reload')
            }});
            game.addKeyListener_keyup({key:'fire',listener:function(){
                var sprite_player=game.getSprite('player');
                sprite_player.weapon=4;
                playSound('audio_reload')
            }});

            game.start();
        }
    },500)
};
var lastScreen_button=document.getElementById('lastScreen_button');
lastScreen_button.onclick=function(e){
    //part one 让在玩一局的按钮消失
    lastScreen_button.className='';

    e.preventDefault();
    game=new Game('crimson','canvas');
    game.queueImage('images/bkg.jpg');
    game.queueImage('images/bkg1.jpg');
    game.queueImage('images/sprite.png');
    game.queueImage('images/zhuzi.jpg');
    game.queueImage('images/book.jpg');

    game.loadImages();
    game.loadImages();
    game.loadImages();
    game.loadImages();
    game.loadImages();

    game.beforeGame(35,35,50,100,monstersData_tem,polygon_tank_points,runInPlaceBehavior,movingBehavior);
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
        sprite_player.weapon=2;
        playSound('audio_reload')
    }});
    game.addKeyListener_keyup({key:'pistol',listener:function(){
        var sprite_player=game.getSprite('player');
        sprite_player.weapon=1;
        playSound('audio_reload')
    }});
    game.addKeyListener_keyup({key:'shotgun',listener:function(){
        var sprite_player=game.getSprite('player');
        sprite_player.weapon=3;
        playSound('audio_reload')
    }});
    game.addKeyListener_keyup({key:'fire',listener:function(){
        var sprite_player=game.getSprite('player');
        sprite_player.weapon=4;
        playSound('audio_reload')
    }});

    game.start();
};
