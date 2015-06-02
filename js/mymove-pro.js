function getStyle(obj,attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
		}
	else{
		return getComputedStyle(obj,false)[attr];
		
			}
	
	}
function startMove(obj,json,fn){
	
	clearInterval(obj.timer);
	obj.timer=setInterval(function(){
		var bStop=true;//做标志位，带代表所有值都按要求改变了
		for(var attr in json){
		//1.取当前要改变的值
		var iCur=0;
		if(attr=='opacity')
		{	iCur=parseInt(parseFloat(getStyle(obj,attr))*100);	

			}
			else{
			iCur=parseInt(getStyle(obj,attr));	
				}
		//2.计算速度
		var iSpeed=(json[attr]-iCur)/8;
		iSpeed=iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);
		//3.检测停止
		if(iCur!=json[attr])
		{
			bStop=false;//若还有没按要求改变完的，我们做标志	
		}
		if(attr=='opacity'){
						
					obj.style.filter='alpha(opacity:'+(iCur+iSpeed)+')';
					obj.style.opacity=(iCur+iSpeed)/100;		
		}
		else{
					obj.style[attr]=iCur+iSpeed+'px';	

			}
		}
		//循坏完后检测，如果bStop为true，代表所有值都按要求改变了，这是再关闭定时器
			if(bStop){
				clearInterval(obj.timer);
				if(fn)
				{
					fn();
				}

				}
		},30);
	
	}