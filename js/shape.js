
//3.创建一个投影对象projection，用来储存一个物体对于一个投影轴的投影值范围,以及标量的检测投影是否重叠的方法；
var Projection=function(min,max){
    this.min=min;
    this.max=max;
};
Projection.prototype={
    overlaps:function(projection){
        return this.max>projection.min&this.min<projection.max;
    },
    overlap:function(projection){
        if(!this.overlaps(projection)){
            return 0
        }else{
         if(this.max>projection.max){
             return projection.max-this.min;
         }else if(this.min<projection.min){
             return this.max-projection.min;
         }
        }
    }
};


//6.shape对象
var Shape=function() {
//    x,y,strokeStyle,fillStyle属性，有必要吗？
};
Shape.prototype={
    collidesWith:function(shape){
        console.log('...');//被多边形和圆形重叠了
    },
    separationOnAxes:function(axes,shape){
        var flag=false;
        for (var i = 0; i < axes.length; i++) {
            var axis = axes[i];
            var projection_1=this.project(axis);
            var projection_2=shape.project(axis);
            if(!projection_1.overlaps(projection_2)){
                flag=true;
            }
        }
        return flag;
    }//nice job!
}



//主要用于碰撞检测；
//1.精灵要检测的重要信息就是一个一个的点，而非向量，因为本质是坐标系中的点，而不是向量，向量是为了算法的应用；创建point对象
var Point=function (x,y){
    this.x=x;
    this.y=y;
};
//2.因为要用到许多的向量的算法,因此采用vector对象
var Vector=function(x,y){
    this.x=x;
    this.y=y;
};
    //原型方法（向量的算法）
Vector.prototype={
    getMagnitude:function(){
        return Math.sqrt(Math.pow(this.x,2)+Math.pow(this.y,2))
    },
    add:function(vector){
        var vector_new=new Vector();
        vector_new.x=this.x+vector.x;
        vector_new.y=this.y+vector.y;
        return vector_new;
    },
    subtract:function(vector){
        var vector_new=new Vector();
        vector_new.x=this.x-vector.x;
        vector_new.y=this.y-vector.y;
        return vector_new;
    },
    dotProduct:function(vector){
        return this.x*vector.x+this.y*vector.y;
    },
    edge:function(vector){
        return this.subtract(vector)
    },
    perpendicular:function(){
        var vector_new=new Vector();
        vector_new.x=this.y;
        vector_new.y=-this.x;
        return vector_new;
    },
    normalize:function(){
        var vector_new=new Vector();
        var magnitude=this.getMagnitude();
        vector_new.x=this.x/magnitude;
        vector_new.y=this.y/magnitude;
        return vector_new;
    },
    normal:function(){
        var vector_new=this.normalize();
        return vector_new.perpendicular();
    }//bound with normalize and perpendicular;
};


//4.多边形对象Polygon
var Polygon=function(name){
    this.points=[];
    this.name=name||'';
//    strokeStyle,fillStyle是否有必要？
};
Polygon.prototype=new Shape();
Polygon.prototype.getAxes=function(){
    var vector_1=new Vector(),
        vector_2=new Vector(),
        array_axes=[];
    for (var i = 0; i < this.points.length-1; i++){
        var point_1 = this.points[i];
        var point_2= this.points[i+1];
        vector_1.x=point_1.x;
        vector_1.y=point_1.y;
        vector_2.x=point_2.x;
        vector_2.y=point_2.y;
        array_axes.push(vector_1.edge(vector_2).normal());
    }
    vector_1.x=this.points[this.points.length-1].x;
    vector_1.y=this.points[this.points.length-1].y;
    vector_2.x=this.points[0].x;
    vector_2.y=this.points[0].y;
    array_axes.push(vector_1.edge(vector_2).normal());
    return array_axes;
};//获取多边形的点最外侧的点之间的所有的向量的标准法向量；（normal方法）
Polygon.prototype.project=function(axis){
//    求出每一个多变形的点所代表的向量，和这个投影轴的点积，取出最大值和最小值，也就是投影的最大值和最小值；
    var project_scales=[];
    var vector_new=new Vector();
    this.points.forEach(function (point) {
        vector_new.x=point.x;
        vector_new.y=point.y;
        project_scales.push(vector_new.dotProduct(axis))
    });
    return new Projection(Math.min.apply(Math,project_scales),
    Math.max.apply(Math,project_scales));
};
Polygon.prototype.addPoint=function(x,y){
    this.points.push(new Point(x,y))
};
Polygon.prototype.createPath=function(context){
    console.log('nessarily?');
};
Polygon.prototype.move=function(dx,dy){
    for (var i = 0; i < this.points.length; i++) {
        var point = this.points[i];
        point.x+=dx;
        point.y+=dy;
    }
};//这是还是很有必要的！
Polygon.prototype.collidesWith=function(shape){
    var axes=shape.getAxes();
    if(axes===undefined){
    //    you are circle!
        polygonCollidesWithCircle(this,shape)
    }else{
    //    you are polygon
        axes=axes.concat(this.getAxes());
        return !this.separationOnAxes(axes,shape)
    }
};

//5.circle对象
var Circle=function(name,x,y,radius){
    this.name=name;
    this.x=x;
    this.y=y;
    this.radius=radius;
//    strokeStyle,fillStyle有用吗？
};
Circle.prototype=new Shape();
Circle.prototype.getAxes=function(){
    return undefined;
};
Circle.prototype.project=function(axis){
    var array_scalars=[];
    var dotProduct=new Vector(this.x,this.y).dotProduct(axis);
    array_scalars.push(dotProduct);
    array_scalars.push(dotProduct+this.radius);
    array_scalars.push(dotProduct-this.radius);
    return new Projection(Math.min.apply(Math,array_scalars),Math.max.apply(Math,array_scalars));
};
Circle.prototype.createPath=function(context){
    console.log('??');
};
Circle.prototype.move=function(dx,dy){
    this.x+=dx;
    this.y+=dy;
};
Circle.prototype.collidesWith=function(shape){
    var axes=shape.getAxes();
    if(axes===undefined){
    //    you are circle
        var distance_circleCenter=Math.sqrt(Math.pow(this.x-shape.x,2)+Math.pow(this.y-shape.y,2));
        var distance_radiusPlus=this.radius+shape.radius;
        return distance_circleCenter<distance_radiusPlus
    }else{
    //    you are polygon!
        return polygonCollidesWithCircle(shape,this)
    }
};
//用于碰撞检测的公共方法
function getPolygonPointClosestToCircle(polygon,circle){
    var distance_min=100000;
    var distance_now,
         point_wanted;
    for (var i = 0; i < polygon.points.length; i++) {
        var point = polygon.points[i];
        distance_now=Math.sqrt(Math.pow(point.x-circle.x,2)+Math.pow(point.y-circle.y,2))
        if(distance_now<distance_min){
            distance_min=distance_now;
            point_wanted=point;
        }
    }
    return point_wanted;
}
//获取离圆最近的一个多边形的点，..居然和书上的方法一模一样。。。除了变量的名字 - -
function polygonCollidesWithCircle(polygon,circle){
    var closestPoint=getPolygonPointClosestToCircle(polygon,circle);
    var axes=polygon.getAxes();
    var vector_1=new Vector(closestPoint.x,closestPoint.y);
    var vector_2=new Vector(circle.x,circle.y);
    axes.push(vector_1.edge(vector_2).normalize());
   return !polygon.separationOnAxes(axes,circle)
}//- -看了三四遍。。根本不用想就知道思路


//7.spriteShape对象
var SpriteShape=function(sprite){
    this.points=[]
    this.sprite=sprite;
//    还有x，y，left，top，不过感觉没啥用
//    this.setPolygonPoints();
};
SpriteShape.prototype=new Polygon();
SpriteShape.prototype.move=function(dx,dy){
    /*
    for (var i = 0; i < this.points.length; i++) {
        var point = this.points[i];
        point.x+=dx;
        point.y+=dy;
    }
    this.sprite.left=this.points[0].x;
    this.sprite.top=this.points[0].y;*/
    this.sprite.left+=dx;
    this.sprite.top+=dy;
    //console.log(this.sprite.left, this.sprite.top);
    this.setPolygonPoints();
};
/*
SpriteShape.prototype.setPolygonPoints=function(){
    var dx_center,dy_center;
    //1.求出精灵图左上角的点的相对于精灵中心点的初始弧度和中心到左上点的长度；
    var radian_init=Math.atan(this.sprite.width/this.sprite.height);
    var length_basic=Math.sqrt(Math.pow(this.sprite.width/2,2)+Math.pow(this.sprite.height/2,2));
    //2.修改精灵对象的旋转弧度；
    if(this.sprite.radian<0){
        var radian_sprite=this.sprite.radian+Math.PI*2;
    }else {
        var radian_sprite=this.sprite.radian
    }
    //3.根据旋转角度求出左上点的位移；
    if(radian_sprite<=radian_init){
        dx_center=-Math.sin(radian_init-radian_sprite)*length_basic;//expected negative
        dy_center=-Math.cos(radian_init-radian_sprite)*length_basic;//expected negative
    }else if((radian_sprite-radian_init)<=(Math.PI/2)){
        dx_center=Math.sin(radian_sprite-radian_init)*length_basic;//expected positive
        dy_center=-Math.cos(radian_sprite-radian_init)*length_basic;//expected negative
    }else if((radian_sprite-radian_init)<=Math.PI){
        dx_center=Math.cos(radian_sprite-radian_init-Math.PI/2)*length_basic;//expected positive
        dy_center=Math.sin(radian_sprite-radian_init-Math.PI/2)*length_basic;//expected positive
    }else if((radian_sprite-radian_init)<=(Math.PI*1.5)){
        dx_center=-Math.sin(radian_sprite-radian_init-Math.PI)*length_basic;//expected negative
        dy_center=Math.cos(radian_sprite-radian_init-Math.PI)*length_basic;//expected positive
    }else if((radian_sprite-radian_init)<=(Math.PI*2-radian_init)){
        dx_center=-Math.cos(radian_sprite-radian_init-Math.PI*1.5)*length_basic;//expected negative
        dy_center=-Math.sin(radian_sprite-radian_init-Math.PI*1.5)*length_basic;//expected negative
    }else{
        console.log('鸡儿喽')
    }
    //try
    //4.求多边形的左上点的坐标
    var x_center=this.sprite.left+this.sprite.width/ 2,
        y_center=this.sprite.top+this.sprite.height/2,
        x_1=x_center+dx_center,
        y_1=y_center+dy_center,
        x_2=x_center+dy_center,
        y_2=y_center-dx_center,
        x_3=x_center-dx_center,
        y_3=y_center-dy_center,
        x_4=x_center-dy_center,
        y_4=y_center+dx_center;
    this.addPoint(x_1,y_1);
    this.addPoint(x_2,y_2);
    this.addPoint(x_3,y_3);
    this.addPoint(x_4,y_4);
    //console.log(this.points);
    /*
    //4.求多边形的左上点的坐标
    var x_center=this.sprite.left+this.sprite.width/2;
    var y_center=this.sprite.top+this.sprite.height/2;
    var x_leftTop=x_center+dx_center;
    var y_leftTop=y_center+dy_center;
    //5.利用求出的左上点和未旋转的差值来获得其他三个点，并添加入对象属性中
    var dx_leftTop=x_leftTop-this.sprite.left;
    var dy_leftTop=y_leftTop-this.sprite.top;
    this.addPoint(x_leftTop,y_leftTop);
    console.log('左上角的点的坐标；' + x_leftTop, y_leftTop);
    var x_rightTop=this.sprite.left+this.sprite.width+dy_leftTop;
    var y_rightTop=this.sprite.top+dx_leftTop;
    this.addPoint(x_rightTop,y_rightTop);
    console.log('右上角的点的坐标；' + x_rightTop, y_rightTop);
    var x_leftBottom=this.sprite.left-dy_leftTop;
    var y_leftBottom=this.sprite.top+this.sprite.height-dx_leftTop;
    this.addPoint(x_leftBottom,y_leftBottom);
    console.log('左下角的点的坐标；' + x_leftBottom, y_leftBottom);
    var x_rightBottom=this.sprite.left+this.sprite.width-dx_leftTop;
    var y_rightBottom=this.sprite.top+this.sprite.height-dy_leftTop;
    this.addPoint(x_rightBottom,y_rightBottom);
    console.log('右上角的点的坐标；' + x_rightBottom, y_rightBottom);
*/
//}
    SpriteShape.prototype.setPolygonPoints=function() {
        var dx_center, dy_center;
        var dx_center_sec,dy_center_sec;
        //1.求出精灵图左上角的点的相对于精灵中心点的初始弧度和中心到左上点的长度；
        var radian_init = Math.atan(this.sprite.width / this.sprite.height);
        var length_basic = Math.sqrt(Math.pow(this.sprite.width / 2, 2) + Math.pow(this.sprite.height / 2, 2));
        //2.修改精灵对象的旋转弧度；
        if (this.sprite.radian < 0) {
            var radian_sprite = this.sprite.radian + Math.PI * 2;
        } else {
            var radian_sprite = this.sprite.radian
        }
        //3.根据旋转角度求出左上点的位移；
        if (radian_sprite <= radian_init) {
            dx_center = -Math.sin(radian_init - radian_sprite) * length_basic;//expected negative
            dy_center = -Math.cos(radian_init - radian_sprite) * length_basic;//expected negative
        } else if ((radian_sprite - radian_init) <= (Math.PI / 2)) {
            dx_center = Math.sin(radian_sprite - radian_init) * length_basic;//expected positive
            dy_center = -Math.cos(radian_sprite - radian_init) * length_basic;//expected negative
        } else if ((radian_sprite - radian_init) <= Math.PI) {
            dx_center = Math.cos(radian_sprite - radian_init - Math.PI / 2) * length_basic;//expected positive
            dy_center = Math.sin(radian_sprite - radian_init - Math.PI / 2) * length_basic;//expected positive
        } else if ((radian_sprite - radian_init) <= (Math.PI * 1.5)) {
            dx_center = -Math.sin(radian_sprite - radian_init - Math.PI) * length_basic;//expected negative
            dy_center = Math.cos(radian_sprite - radian_init - Math.PI) * length_basic;//expected positive
        } else if ((radian_sprite - radian_init) <= (Math.PI * 2 - radian_init)) {
            dx_center = -Math.cos(radian_sprite - radian_init - Math.PI * 1.5) * length_basic;//expected negative
            dy_center = -Math.sin(radian_sprite - radian_init - Math.PI * 1.5) * length_basic;//expected negative
        } else {
            console.log('鸡儿喽')
        }

        if(radian_sprite+radian_init<=(Math.PI/2)){
            dx_center_sec=Math.sin(radian_sprite+radian_init)*length_basic;//expected positive
            dy_center_sec=-Math.cos(radian_sprite+radian_init)*length_basic;//expected negative
        }else if(radian_sprite+radian_init<=Math.PI){
            dx_center_sec=Math.cos(radian_sprite+radian_init-Math.PI/2)*length_basic;//expected positive
            dy_center_sec=Math.sin(radian_sprite+radian_init-Math.PI/2)*length_basic;//expected positive
        }else if(radian_sprite+radian_init<=(Math.PI*1.5)){
            dx_center_sec=-Math.sin(radian_sprite+radian_init-Math.PI)*length_basic;//expected negative
            dy_center_sec=Math.cos(radian_sprite+radian_init-Math.PI)*length_basic;//expected positive
        }else if(radian_sprite+radian_init<=(Math.PI*2)){
            dx_center_sec=-Math.cos(radian_sprite+radian_init-Math.PI*1.5)*length_basic;//expected negative
            dy_center_sec=-Math.cos(radian_sprite+radian_init-Math.PI*1.5)*length_basic;//expected negative
        }else if(radian_sprite+radian_init<=(Math.PI*2+radian_init)){
            dx_center_sec=Math.sin(radian_sprite+radian_init-Math.PI*2)*length_basic;//expected positive
            dy_center_sec=-Math.cos(radian_sprite+radian_init-Math.PI*2)*length_basic;//expexted negative
        }else{
            console.log('gg');
        }
        var x_center=this.sprite.left+this.sprite.width/ 2,
            y_center=this.sprite.top+this.sprite.height/2;
        x_1=x_center+dx_center;
        y_1=y_center+dy_center;
        x_2=x_center+dx_center_sec;
        y_2=y_center+dy_center_sec;
        x_3=x_center-dx_center;
        y_3=y_center-dy_center;
        x_4=x_center-dx_center_sec;
        y_4=y_center-dy_center_sec;
        this.addPoint(x_1,y_1);
        this.addPoint(x_2,y_2);
        this.addPoint(x_3,y_3);
        this.addPoint(x_4,y_4);
    }


//MTV------------------------------------------------------------------------------------------------
//MTV对象
MinimumTranslationVector=function(axis,overlap){
    this.axis=axis;//平移向量（投影向量的单位向量）
    this.overlap=overlap;//投影的重合值
};
//重写Shape对象的separationOnAxes方法
Shape.prototype.minimumTranslationVector=function(axes,shape){
    var minimumoverlap=100000;
    var axiswithsmallestoverlap;
    for (var i = 0; i < axes.length; i++) {
        var axis = axes[i];
        var projection1=this.project(axis);
        var projection2=shape.project(axis);
        var overlap=projection1.overlap(projection2);
        if(overlap===0){
            return {axis:undefined, overlap:0};
        }else {
            if(overlap<minimumoverlap){
                minimumoverlap=overlap;
                axiswithsmallestoverlap=axis;
            }
        }
    }
    return{
        axis:axiswithsmallestoverlap,
        overlap:minimumoverlap
    }
};
//多边形和多边形的碰撞检测
function polygonCollidesWithPolygon(polygon1,polygon2){
    var mtv1=polygon1.minimumTranslationVector(polygon1.getAxes(),polygon2),
        mtv2=polygon1.minimumTranslationVector(polygon2.getAxes(),polygon2);
    if(mtv1.overlap===0&&mtv2.overlap===0){
        return{axis:undefined, overlap:0}
    }else{
        return mtv1.overlap<mtv2.overlap?mtv1:mtv2
    }
};
//圆形和圆形的碰撞检测
function circleCollidesWithCircle(circle1,circle2){
    var distance=Math.sqrt(Math.pow(circle1.x-circle2.x,2)+Math.pow(circle1.y-circle2.y,2)),
        overlap=Math.abs(circle1.radius+circle2.radius)-distance;
    return overlap<0?new MinimumTranslationVector(undefined,0):new MinimumTranslationVector(undefined,overlap);
}
//多边形和圆形的碰撞检测
function polygonCollidesWithCircle(polygon,circle){
    var axes=polygon.getAxes(),
        closestPoint=getPolygonPointClosestToCircle(polygon,circle),
        vector1=new Vector(circle.x,circle.y),
        vector2=new Vector(closestPoint.x,closestPoint.y);
    axes.push(vector1.subtract(vector2).normalize());
    return polygon.minimumTranslationVector(axes,circle)
}
//重写多边形对象的碰撞检测
Polygon.prototype.collidesWith=function(shape){
    if(shape.radius!==undefined){
        return polygonCollidesWithCircle(this,shape);
    }else{
        return polygonCollidesWithPolygon(this,shape)

    }
};
Circle.prototype.collidesWith=function(shape){
    if(shape.radius!==undefined){
        return circleCollidesWithCircle(this,shape)
    }else {
        return polygonCollidesWithCircle(shape,this)
    }
};
//问题是，如果碰撞的里面有圆形的话，mtv的axis的值都是undefined，需要根据速度向量来计算出一个axis；
function separate(shapeMoving,mtv){
    var velocityX=shapeMoving.sprite.velocityX;
    var velocityY=shapeMoving.sprite.velocityY;
    if(mtv.axis===undefined)//circle
    {
        var velocityMagnitude=Math.sqrt(Math.pow(velocityX,2)+Math.pow(velocityY,2));
        var x=velocityX/velocityMagnitude;
        var y=velocityY/velocityMagnitude;
        mtv.axis=new Vector(x,y);
    }
    var dx=mtv.axis.x*mtv.overlap;
    var dy=mtv.axis.y*mtv.overlap;
    //调整偏移量
    if(dx<0&&velocityX<0||dx>0&&velocityX>0){
        dx=-dx;
    }
    if(dy<0&&velocityY<0||dy>0&&velocityY>0){
        dy=-dy;
    }
    shapeMoving.move(dx,dy);
}







