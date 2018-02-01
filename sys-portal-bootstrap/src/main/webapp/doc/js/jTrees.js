// JavaScript Document
;(function (window, undefined) {
	var Treebox=(function() {
		return function(set){
			this.treeCell  = set.treeCell  || "#setname" ;     
			this.DataList  = set.DataList;
			this.CreateDiv = set.CreateDiv || document.createElement("dl");
			this.trigger   = set.trigger ? true : false;
			this.menuCls   = set.menuCls   || "menuDiv";
			this.targetType  = set.targetType  || "";
			this.Icon = set.Icon || {DefOpenIcon:"",DefCloseIcon:"",DefCustomIcon:""};
			this.init();
		} 
    })();
	var Hnd="pare-"; var lastFaqClick=null;
	Treebox.prototype = {
		init:function(){
			var that = this;
            this.getTreeid = document.getElementById(this.treeCell.replace("#",""));
			if( !this.getTreeid ) return false;
			this.createTree();
			this.onEffect();
		},
		createTree:function(){
			var that=this, Data=this.DataList, dlNode = new Array();

            for(var i in Data){  
				var cDd	= document.createElement( "dd" );
				cDd.setAttribute("id",Data[i].cid);
				if(this.addEvent != ""){var onevent=this.addEvent;}else{var onevent="";}
				if(this.targetType != ""){var ontarget='target='+this.targetType+'';}else{var ontarget="";}
				if( Data[i].url != "" && Data[i].url != null && typeof( Data[i].url ) != "undefined" ){
					var isLeaf=Data[i].leafIcon != "" && Data[i].leafIcon != null;
					if(isLeaf){
						var childIcon="style='background:url("+Data[i].leafIcon+") no-repeat left center;'";
					}else{
						var childIcon="";
					}
				    cDd.innerHTML = "<a href='"+Data[i].url+"' title='"+Data[i].name+"' class='treeleaf' "+childIcon+" "+ontarget+">"+Data[i].name+"</a>";
				}else{
					var isAcc=Data[i].isAccordion== true && Data[i].isAccordion != "" && Data[i].isAccordion != null;
					var isops=Data[i].isopen== true && Data[i].isopen != "" && Data[i].isopen != null;
					var isCus=Data[i].CustomIcon != "" && Data[i].CustomIcon != null && typeof( Data[i].CustomIcon ) != "undefined";
					if(isCus){
						var CusIcon="style='background:url("+Data[i].CustomIcon+") no-repeat left center;'";
					}else{
						var CusIcon="";
					}
					if(isAcc){
						cDd.innerHTML = "<h3 class='titbox' "+CusIcon+" id='"+Hnd+Data[i].cid+"' title='"+Data[i].name+"'><em></em>"+Data[i].name+"</h3>";
					}else if(isops){
					    cDd.innerHTML = "<h3 class='treeopen' id='"+Hnd+Data[i].cid+"' title='"+Data[i].name+"'><em></em>"+Data[i].name+"</h3>";
					}else{
						cDd.innerHTML = "<h3 class='treeclose' id='"+Hnd+Data[i].cid+"' title='"+Data[i].name+"'><em></em>"+Data[i].name+"</h3>";
					}
				}
                if( Data[i].url != "" && Data[i].url != null && typeof( Data[i].url ) != "undefined" ){
					 cDd.className = ""; cDd.removeAttribute("class");
				}else{
					 cDd.className = this.menuCls;
				}
				
				var cDl	= document.createElement("dl");
				cDl.setAttribute( "id" , "dl-"+Data[i].cid );

				if(Data[i].isopen== true && Data[i].isopen != "" && Data[i].isopen != null){
					that.css(cDl,{"display":"block"});
				}else{
					that.css(cDl,{"display":"none"});
				}
				
				dlNode[Data[i].cid] = cDl;
				var pobj = dlNode[Data[i].pid];
		       
				if( typeof( pobj ) != "undefined" && pobj != null && pobj != ""){						
					pobj.appendChild( cDd );
					if( Data[i].url != "" && Data[i].url != null && typeof( Data[i].url ) != "undefined" ){}else{
				        cDd.appendChild( cDl );	
					}
				}else{					
					this.CreateDiv.appendChild( cDd );
					if( Data[i].url != "" && Data[i].url != null && typeof( Data[i].url ) != "undefined" ){}else{
					    cDd.appendChild( cDl );
					}
				}
				
		    };
			
			this.getTreeid.appendChild( this.CreateDiv );
			//dlNode	=	"";
            return this;
		},
		onEffect:function(){
			var that=this;
			if(this.trigger==true){
				var dlh= $J("h3",this.getTreeid);
				for(var i=0;i<dlh.length;i++){
					that.on(dlh[i],"click",function(evt){
						var evt = evt||window.event, target = evt.target || evt.srcElement;
						var eventObj = document.getElementById('dl-'+target.id.replace(Hnd,""));
						var spanObj	 = document.getElementById(target.id);
						if(that.getStyle(eventObj,"display") != "none" ){		
							that.css(eventObj,{"display":"none"}); 
							if(this.className=='treeclose' || this.className=='treeopen'){ 
							    that.removeClass(spanObj,'treeopen'); that.addClass(spanObj,'treeclose');
							}
						}else{				
							that.css(eventObj,{"display":"block"}); 
							if(this.className=='treeclose' || this.className=='treeopen'){
							    that.removeClass(spanObj,'treeclose'); that.addClass(spanObj,'treeopen');
							}
						}
					})
				}
			}else if(this.trigger==false){
				var eTag="H3";
				for(var eObj=this.getTreeid.getElementsByTagName(eTag),i=-1,onH;onH=eObj[++i];){
					that.on(onH,"click",function(){
						var dl = this.nextSibling;
						if(dl){
							if(dl.nodeType != 1){ dl = dl.nextSibling;  if(!dl) return false; }
						} else {
							return false;
						}
						//if(eTag != 'h3'){ dl = dl.nextSibling; if(!dl){return false;} } //h3 标签控制 隐藏或删除该行
						for(var Pardd=this.parentNode.parentNode.children,n=-1,dd;dd=Pardd[++n];){
							if(dd.tagName=="DD"){
								for(var _dl=dd.childNodes,t=-1,Cndl;Cndl=_dl[++t];){
									switch(Cndl.tagName){
									case "DL":
										if(Cndl!=dl){ that.css(Cndl,{"display":"none"}); }else{ that.css(Cndl,{"display":"block"}); }
									break;
									case eTag:
										//Cndl.className = Cndl!=this? this.className?"treeclose":"treeopen" : this.className?"treeopen":"treeclose";
										if(Cndl!=this){
											if(this.className=='treeclose' || this.className=='treeopen'){
												if(this.className){
													that.removeClass(Cndl,'treeopen'); that.addClass(Cndl,'treeclose');
												}else{
													that.removeClass(Cndl,'treeclose'); that.addClass(Cndl,'treeopen');
												}
											}
										}else{
											if(this.className=='treeclose' || this.className=='treeopen'){
												if(this.className){
													that.removeClass(Cndl,'treeclose'); that.addClass(Cndl,'treeopen');
												}else{
													that.removeClass(Cndl,'treeopen'); that.addClass(Cndl,'treeclose');
												}
											}
										}
									break;
									}
								}
							}
						}
					});
				}
			}
		},
		css : function(elem, key, value) {
			var invalidCss=function(key, value) { return (key == "width" || key == "height") && parseFloat(value) < 0 };
			var niceProp=function(prop) {
				if (!/-/.test(prop)){ return prop };  props = prop.split("-"); len = props.length;
				while (len) {
					props[--len] = len == 0 ? props[len].toLowerCase() : props[len].toLowerCase().replace(/(\s(\w)|\b(\w))/g, function(c) {
						return c.toUpperCase()
					})
				};
				return prop = props.join("");
			}
			if (value == undefined) {
				if (typeof key == "string") {
					key = niceProp(key);
					return elem.style[key] ? elem.style[key] : elem.currentStyle ? elem.currentStyle[key] : window.getComputedStyle(elem, null)[key]
				} else if (typeof key == "object") {
					for (var i in key) {
						i = niceProp(i);
						if (!invalidCss(i, key[i])){ elem.style[i] = key[i] };
					}
				}
			} else {
				if (typeof(key) == "string" && typeof(value) == "string") {
					key = niceProp(key);
					if (!invalidCss(key, value)){ elem.style[key] = value };
				}
			};
			return this;
		},
		getStyle : function(elem, attr) {
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
		},
		on : function(elem,type,fn){
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
			return this;
		},
		addClass : function (ele, className){
			 if (!ele || !className || (ele.className && ele.className.search(new RegExp("\\b" + className + "\\b")) != -1)){ return; }else{
			 ele.className += (ele.className ? " " : "") + className;}
			 return this;
		},
		removeClass : function (ele, className){
			 if (!ele || !className || (ele.className && ele.className.search(new RegExp("\\b" + className + "\\b")) == -1)){ return; }else{
			 ele.className = ele.className.replace(new RegExp("\\s*\\b" + className + "\\b", "g"), "");}
			 return this;
		}
		
	};
	var $J = function(str,parEle){ 
		str = str.split(" ");
		var par = [];
		parEle = parEle||document;
		var retn = [ parEle ] ;
		for( var i in str ){ if(str[i].length!=0) par.push(str[i]) } //去掉重复空格
		for( var i in par ){ 
			if( retn.length==0 ) return false;
			var _retn = [];
			for ( var r in retn )
			{
				if( par[i].charAt(0) =="#" ){ 
				    _retn.push( document.getElementById( par[i].replace("#","") ) );
				}else if( par[i].charAt(0) =="." ){
					var tag = retn[r].getElementsByTagName('*');
					for( var j=0; j<tag.length; j++ ){
						var cln = tag[j].className;
						if( cln && cln.search(new RegExp("\\b" + par[i].replace(".","") + "\\b"))!=-1 ){ _retn.push( tag[j] ); }
					}
				}
				else { var tag = retn[r].getElementsByTagName( par[i] ); for( var j=0; j<tag.length; j++ ){ _retn.push( tag[j] ) } }
			}
			retn =_retn;
		}
		
		return retn.length==0 || retn[0] == parEle ? false:retn;
	};

	var Trees = function(opt) { new Treebox(opt); }
	window.Trees = jTrees = Trees;
	return Trees;
})(window);
