/**
 * Created by Administrator on 2017/6/27.
 */
(function(window){
    var Game=function(spriteName){
        new Game.fn.init(spriteName);
    };
    Game.prototype={
        constructor:Game,
        init:function(spriteName){

        }
    };
    Game.prototype=Game.fn;
    Game.prototype.init.prototype=Game.prototype;
    Game.extend=Game.fn.extend=function(object){
        for(var  key in object){
            this[key]=object[key];
        }
    }



})(window);
