export function drag (el){
  	let oDiv = el;
  	var flag = false;
	var cur = {
	    x:0,
	    y:0
	}
	var nx,ny,dx,dy,x,y ;
	function down(){
	    flag = true;
	    var touch ;
	    if(event.touches){
	        touch = event.touches[0];
	    }else {
	        touch = event;
	    }
	    cur.x = touch.clientX;
	    cur.y = touch.clientY;
	    dx = oDiv.offsetLeft;
	    dy = oDiv.offsetTop;
	}
	function move(){
	    if(flag){
	        var touch ;
	        if(event.touches){
	            touch = event.touches[0];
	        }else {
	            touch = event;
	        }
	        nx = touch.clientX - cur.x;
	        ny = touch.clientY - cur.y;
	        x = dx+nx;
	        y = dy+ny;
	        oDiv.style.left = x+"px";
	        oDiv.style.top = y +"px";
	        //阻止页面的滑动默认事件
	        document.addEventListener("touchmove",function(){
	            event.preventDefault();
	        },false);
	    }
	}
	//鼠标释放时候的函数
	function end(){
	    flag = false;
	}
	oDiv.addEventListener("mousedown",function(){
        down();
    },false);
    oDiv.addEventListener("touchstart",function(){
        down();
    },false)
    oDiv.addEventListener("mousemove",function(){
        move();
    },false);
    oDiv.addEventListener("touchmove",function(){
        move();
    },false)
    document.body.addEventListener("mouseup",function(){
        end();
    },false);
    oDiv.addEventListener("touchend",function(){
        end();
    },false);
}

export function faxianyemian (el, binding) {
	el.src = require('../assets/moren/faxianyemian.png');
	var img = new Image();
	img.src = binding.value;
	img.onload = () => {
		el.style.backgroundColor = '';
		el.src = binding.value;
	}
}

export function fenlei (el, binding) {
	el.src = require('../assets/moren/fenlei.png');
	var img = new Image();
	img.src = binding.value;
	img.onload = () => {
		el.style.backgroundColor = '';
		el.src = binding.value;
	}
}

export function fenleiziyemian (el, binding) {
	el.src = require('../assets/moren/fenleiziyemian.png');
	var img = new Image();
	img.src = binding.value;
	img.onload = () => {
		el.style.backgroundColor = '';
		el.src = binding.value;
	}
}

export function jingpingyouxi (el, binding) {
	el.src = require('../assets/moren/jingpingyouxi.png');
	var img = new Image();
	img.src = binding.value;
	img.onload = () => {
		el.style.backgroundColor = '';
		el.src = binding.value;
	}
}

export function shouyebanner (el, binding) {
	el.src = require('../assets/moren/shouyebanner.png');
	var img = new Image();
	img.src = binding.value;
	img.onload = () => {
		el.style.backgroundColor = '';
		el.src = binding.value;
	}
}

export function xiuxianicon (el, binding) {
	el.src = require('../assets/moren/xiuxianicon.png');
	var img = new Image();
	img.src = binding.value;
	img.onload = () => {
		el.style.backgroundColor = '';
		el.src = binding.value;
	}
}

export function youxixiangqingtupian (el, binding) {
	el.src = require('../assets/moren/youxixiangqingtupian.png');
	var img = new Image();
	img.src = binding.value;
	img.onload = () => {
		el.style.backgroundColor = '';
		el.src = binding.value;
	}
}

export function youqingtuijian (el, binding) {
	el.src = require('../assets/moren/youqingtuijian.png');
	var img = new Image();
	img.src = binding.value;
	img.onload = () => {
		el.style.backgroundColor = '';
		el.src = binding.value;
	}
}

export function zhanneixinmoren (el, binding) {
	el.src = require('../assets/moren/zhutizhongxin.png');
	var img = new Image();
	img.src = binding.value;
	img.onload = () => {
		el.style.backgroundColor = '';
		el.src = binding.value;
	}
}

export function zhutizhongxin (el, binding) {
	el.src = require('../assets/moren/zhanneixin.png');
	var img = new Image();
	img.src = binding.value;
	img.onload = () => {
		el.style.backgroundColor = '';
		el.src = binding.value;
	}
}