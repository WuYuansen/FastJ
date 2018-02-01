// JavaScript Document
;(function (window, undefined) {
	var docEle, docBody;
	var Panel = (function() {
		return function(set){
			this.PanCell    = set.PanCell || "" ;     
			this.size       = set.size || {topH:70,rightW:0,bottomH:0,leftW:200};
			this.leftspace  = set.leftspace || 0;
			this.rightspace = set.rightspace || 0;
			
			this.init();
		} 
    })();
	Panel.prototype = {
		init : function() {
			docBody=document.body, docEle=document.documentElement; 			
		    this.setOrget();
			this.bindEvent();
		},
		setOrget:function(){
			var wrapW=docEle.clientWidth;
			var wrapH=docEle.clientHeight;
			Pid(this.PanCell).style.cssText='width:'+wrapW+'px;height:'+wrapH+'px;';
			if(CurrStyle(Pid(this.PanCell),"position")=="relative"){}else{Pid(this.PanCell).style.position="relative";}
            var gettop=Pid('panels=top')[0], getleft=Pid('panels=left')[0],
				getright=Pid('panels=right')[0], getbottom=Pid('panels=bottom')[0],
				getcontent=Pid('panels=content')[0],REPX=/px|em|rem/;

			var gtopH= Pid('panels=top').length>0 ? (parseInt(CurrStyle(gettop,"borderTopWidth").replace(REPX,''))+parseInt(CurrStyle(gettop,"borderBottomWidth").replace(REPX,''))+parseInt(CurrStyle(gettop,"paddingTop").replace(REPX,''))+parseInt(CurrStyle(gettop,"paddingBottom").replace(REPX,''))):0;
			var gbotH= Pid('panels=bottom').length>0 ? (parseInt(CurrStyle(getbottom,"borderTopWidth").replace(REPX,''))+parseInt(CurrStyle(getbottom,"borderBottomWidth").replace(REPX,''))+parseInt(CurrStyle(getbottom,"paddingTop").replace(REPX,''))+parseInt(CurrStyle(getbottom,"paddingBottom").replace(REPX,''))):0;
			var borleft= Pid('panels=left').length>0 ? (parseInt(CurrStyle(getleft,"borderLeftWidth").replace(REPX,''))+parseInt(CurrStyle(getleft,"borderRightWidth").replace(REPX,''))):0;
			var borright= Pid('panels=right').length>0 ? (parseInt(CurrStyle(getright,"borderLeftWidth").replace(REPX,''))+parseInt(CurrStyle(getright,"borderRightWidth").replace(REPX,''))):0;
			
			if(Pid('panels=top').length>0){		
				gettop.style.cssText='width:'+(wrapW-parseInt(CurrStyle(gettop,"paddingLeft").replace(REPX,''))-parseInt(CurrStyle(gettop,"paddingRight").replace(REPX,'')))+'px;height:'+this.size.topH+'px;top:0;left:0px;right:0px;position:absolute;';
				if(this.size.topH==0){gettop.style.display='none';}
			};
			
			if(Pid('panels=left').length>0){	
				getleft.style.cssText='width:'+this.size.leftW+'px;height:'+(wrapH-this.size.topH-this.size.bottomH-gtopH-gbotH)+'px;top:'+(this.size.topH+gtopH)+'px;left:0px;position:absolute;';
				if(this.size.leftW==0){getleft.style.display='none';}
			};
			
			if(Pid('panels=right').length>0){		   
				getright.style.cssText='width:'+this.size.rightW+'px;height:'+(wrapH-this.size.topH-this.size.bottomH-gtopH-gbotH)+'px;top:'+(this.size.topH+gtopH)+'px;right:0px;position:absolute;';
				if(this.size.rightW==0){getright.style.display='none';}
			};
			
			if(Pid('panels=bottom').length>0){
				getbottom.style.cssText='width:'+(wrapW-parseInt(CurrStyle(getbottom,"paddingLeft").replace(REPX,''))-parseInt(CurrStyle(getbottom,"paddingRight").replace(REPX,'')))+'px;height:40px;left:0px;right:0px;bottom:0px;position:absolute;';
//				if(this.size.bottomH==0){getbottom.style.display='none';}
			};
			
			if(Pid('panels=content').length>0){		
				getcontent.style.cssText='width:'+(wrapW-this.size.leftW-this.size.rightW)+'px;height:'+(wrapH-this.size.topH-this.size.bottomH-gtopH-gbotH)+'px;top:'+(this.size.topH+gtopH)+'px;left:'+(this.size.leftW+this.leftspace+borleft)+'px;right:'+(this.size.rightW+this.rightspace+borright)+'px;position:absolute;';
			};
			return this;
		},
		bindEvent : function(){
			var that=this;
			bind(window,"resize",function(){
				that.setOrget();
			});
			return that;
		}
	};
	var bind=function(elem,type,fn){
		if(elem.attachEvent){//IE浏览器
			elem.attachEvent("on"+type,(function(){
				return function(){
					window.event.cancelBubble=true;//停止时间冒泡
					elem.attachEvent=fn.apply(elem);
				}
			})(elem));
		}else if(elem.addEventListener){//其他浏览器
			elem.addEventListener(type,function(event){
				event.stopPropagation();//停止时间冒泡
				fn.apply(this)
			},false);
		}
	};

	var CurrStyle = function(elem, attr) {
		if (elem.style[attr]) {
			return elem.style[attr];
		} else if (elem.currentStyle) {
			return elem.currentStyle[attr];
		} else if (document.defaultView && document.defaultView.getComputedStyle) {
			attr = attr.replace(/([A-Z])/g, "-$1").toLowerCase();
			return document.defaultView.getComputedStyle(elem, null).getPropertyValue(attr);
		} else {
			return null;
		}
	}
	var Pid = function(object){
		if(object === undefined ) return;
		var getArr = function(name,tagName,attr){
			var tagName = tagName || '*', eles = document.getElementsByTagName(tagName),
			clas = (typeof document.body.style.maxHeight === "undefined") ? "className" : "class";//ie6
			attr = attr || clas,  Arr = [];
			for(var i=0;i<eles.length;i++){
			    if(eles[i].getAttribute(attr)==name){  Arr.push(eles[i]); }
			}
			return Arr;
		};
		
		if(object.indexOf('#') === 0){  //#id 
		    return document.getElementById(object.substring(1));
		}else if(object.indexOf('.') === 0){  //.class
		    return getArr(object.substring(1));
		}else if(object.match(/=/g)){  //attr=name
		    return getArr(object.substring(object.search(/=/g)+1),null,object.substring(0,object.search(/=/g)));
		}else if(object.match(/./g)){ //tagName.className
		    return getArr(object.split('.')[1],object.split('.')[0]);
		}
	};
	var framPanel = function(options) { new Panel(options); }
	window.framPanel = framPanel;
	return framPanel;
})(window);