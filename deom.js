
//绘制地图
  function Map(){
    var w = 800;
	  var h = 400;   
    this.showmap = function(){
	  var tu = document.createElement('div');
	  tu.style.width = w+"px";
	  tu.style.height = h+"px";
	  tu.style.backgroundImage = "url(./bg.png)"
	  document.body.appendChild(tu);
	};
  };
//绘制食物
  function Food(){
   var len = 20;
	 this.xfood = 0;
	 this.yfood = 0;
	 this.pice = null;   //页面上唯一的食物
	 this.showfood = function(){
	  if(this.pice===null){
	   this.pice = document.createElement('div');
		 this.pice.style.width = this.pice.style.height = len+"px";
		 this.pice.style.backgroundColor = "green";
		 this.pice.style.position = "absolute";
		 document.body.appendChild(this.pice);
	  }
	   
		
//		食物的移动值是 20px
		//食物权值坐标  x轴（0-39） y轴（0-19）
		this.xfood = Math.floor(Math.random()*40);  //0-39 的随机数   Math.random() 0-1之间的数 乘以40就是0-40
		this.yfood = Math.floor(Math.random()*20);  //0-19 的随机数
		this.pice.style.left = this.xfood * len+"px";
		this.pice.style.top  = this.yfood * len+"px";
		
	 };
  };
//绘制小蛇
  function Snak(){
     var len = 20;
	 this.red = "right";
	 //每个蛇节[x坐标,y坐标,颜色,蛇节对象]
	 this.snakbody = [[0,1,'green',null],[1,1,'green',null],[2,1,'green',null],[3,1,'red',null]];
	 this.showsnak = function(){
	    for(i=0; i<this.snakbody.length; i++){
		  //判断！只有为  null  的时候才创建蛇节
		 if(this.snakbody[i][3]===null){
		    //创建蛇节
		   this.snakbody[i][3] = document.createElement('div');
		     //设置蛇节属性
		   this.snakbody[i][3].style.width = this.snakbody[i][3].style.height = len+"px";
		   this.snakbody[i][3].style.backgroundColor = this.snakbody[i][2];
		   //定位蛇节初始位置
		   this.snakbody[i][3].style.position = "absolute";
		 }
		  this.snakbody[i][3].style.left = this.snakbody[i][0]*len+"px";
		  this.snakbody[i][3].style.top = this.snakbody[i][1]*len+"px";
		  //追加到body中
		  document.body.appendChild(this.snakbody[i][3]);
		}
	 }
	 // 小蛇移动
	 this.movesnak = function(){
	    for(var i=0; i<this.snakbody.length-1 ;i++){
		    //当前蛇节的新坐标是上个蛇节的旧坐标
		   this.snakbody[i][0] = this.snakbody[i+1][0];
		   this.snakbody[i][1] = this.snakbody[i+1][1];
		};
		if(this.red=="right"){
		   this.snakbody[this.snakbody.length-1][0] +=1;
		};
		if(this.red=="left"){
		   this.snakbody[this.snakbody.length-1][0] -=1;
		};
	    if(this.red=="up"){
		   this.snakbody[this.snakbody.length-1][1] -=1;
		};
	    if(this.red=="down"){
		   this.snakbody[this.snakbody.length-1][1] +=1;
		};
		//判断蛇头碰到食物 --------蛇头坐标等于食物坐标
	    //找到蛇头坐标
		var xsnake = this.snakbody[this.snakbody.length-1][0];
		var ysnake = this.snakbody[this.snakbody.length-1][1];
		//食物坐标   food.xfood  food.yfood
		if(xsnake==food.xfood && ysnake==food.yfood){
		   //吃食物增加蛇节
		   var newjie = [this.snakbody[0][0],this.snakbody[0][1],'green',null];
		   this.snakbody.unshift(newjie); //把  newjie 放到数组的第一个位置上去   unshift 向数组的开头添加元素
		   audio.play();
		   food.showfood();
		};
		//控制小蛇在地图范围内
		if(xsnake<0 || xsnake>39 || ysnake<0 || ysnake>19){
		    alert('game over!');
			  clearInterval(mytime);
			return false;
		};
		//吃到自己
		for(var k=0; k<this.snakbody.length-1; k++){
		    if(this.snakbody[k][0]==xsnake && this.snakbody[k][1]==ysnake){
			    alert('game over!');
			    clearInterval(mytime);
			    return false;
			}
		};
		
		 
	//重新绘制小蛇
	 this.showsnak();
	 }   
  };
  
  
  
  window.onload = function(){
     var map = new Map();
     map.showmap();
	 
	 food = new Food();        //去掉var把food变成全局变量
	 food.showfood();
	 
	 snak = new Snak();        //去掉var把snak变成全局变量
	 snak.showsnak();
	 mytime = setInterval("snak.movesnak()",250);   //间隔1s移动一次
	 
	 
	 //设置键盘事件对象
	 document.onkeydown = function(evt){
	 
	    var num = evt.keyCode;
	    if(num==38){
		    snak.red = "up";
		};
		if(num==40){
		    snak.red = "down";
		};
		if(num==37){
		    snak.red = "left";
		};
		if(num==39){
		    snak.red = "right";
		};
	 };
 
     //音效
	audio = document.getElementById('Audiowx');
	
  };


	
	
 
