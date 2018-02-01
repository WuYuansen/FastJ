/**
 *
 * <p> Title:MyKeyBoard.js BY EXTJS V6.0 (src/main/newwebapp/classic/overrides/form)</p>
 * <p> Description:  虚拟键盘</p>
 * <p> 指定事件，当这个事件触发时，虚拟键盘显示出来，默认是focus事件</p>
 * <p> 指定是否启用按钮位置混淆，默认是true，表示每次显示出来时，位置都不一样</p>
 * <p> 有大小写转换开关，shift开关，控制录入字符的大小写</p>
 * <p> 键盘自动计算显示的位置，不必担心在浏览器边上显示不全</p>
 * <p> Copyright: Copyright (c) 2017 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
Ext.define('wys.form.MyKeyBoard',{
    extend : 'Ext.menu.Menu',
    requires:[
      'Ext.menu.Menu',
      'Ext.container.Container'
    ],
    xtype : 'keyBoardPicker',
    alias: 'widget.keyBoardPicker',
    wander : true,//启用按钮位置混淆  
    upperCase : false,
    showEvents : 'focus',  
    boxMinWidth : 328,  
    boxMaxWidth : 328,  
    height : 103,  
    margin : '23 0 0 0',
    plain : true,  
    autoHide: false,
    chars : {  
        '`':'`', '1':'!', '2':'@', '3':'#', '4':'$', '5':'%', '6':'^', '7':'&', '8':'*', '9':'(', '0':')',  
        '-':'_', '=':'+', ',':'<', '.':'>', '/':'?', ';':':', '\'':'"','[':'{', ']':'}', '\\':'|', '←':'←',  
        'Shift':'Shift', '大写锁定':'大写锁定', '清空':'清空'  
    },  
    //Char
    posC:['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'],
    //Number
    posN : ['0','1','2','3','4','5','6','7','8','9'], 
    //keyBoard init
    initComponent : function(field){
    	field = this.fieldWidget;
    	if(!Ext.isIE){  
            this.autoWidth = true;  
        }
		btns = Ext.create('Ext.container.Container',{  
            ref : 'kbPanel',  
            width : Ext.isIE?318:320,  
            height : 103,  
            style : 'margin : -2px;',  
            layout : 'absolute',  
            defaults : {  
                width : 20
            },  
            defaultType : 'button',  
            items : [{   
                text : "1", x : 2, y : 3 },{  
                text : "2", x : 25, y : 3 },{  
                text : "3", x : 48, y : 3 },{     
                text : "4", x : 71, y : 3 },{         
                text : "5", x : 94, y : 3 },{  
                text : "6", x : 117, y : 3 },{  
                text : "7", x : 140, y : 3 },{  
                text : "8", x : 163, y : 3 },{            
                text : "9", x : 186, y : 3 },{            
                text : "0", x : 209, y : 3 },{    
                text : "←", width : 40, x : 278, y : 3 },{        
                text : "Shift", ref : 'kbShift', enableToggle : true, width : 63,x : 2,y : 53 },{  
                text : '大写锁定', ref : 'kbCapsLock', enableToggle : true, width : 66 ,x : 2, y : 28 },{     
                text : "a", x : 69, y : 28 },{  
                text : "c", x : 114, y : 28 },{       
                text : "b", x : 91, y :28},{      
                text : "d", x : 137, y : 28 },{           
                text : "e", x : 160, y : 28 },{  
                text : "g", x : 206, y : 28 },{   
                text : "f", x : 183, y : 28 },{  
                text : "i", x : 252, y : 28 },{   
                text : "j", x : 275, y : 28 },{   
                text : "h", x : 229, y : 28 },{   
                text : "k", x : 298, y : 28 },{   
                text : "l", x : 68, y : 53 },{  
                text : "p", x : 160, y : 53 },{   
                text : "m", x : 91, y : 53 },{  
                text : "n", x : 114, y : 53 },{       
                text : "o", x : 137, y : 53 },{   
                text : "r", x : 206, y : 53 },{           
                text : "s", x : 229, y : 53 },{   
                text : "t", x : 252, y : 53 },{   
                text : "q", x : 183, y : 53 },{   
                text : "u", x : 275, y : 53 },{   
                text : "v", x : 298, y : 53 },{  
                text : "w", x : 68, y : 78 },{    
                text : "x", x : 46, y : 78 },{  
                text : "z", x : 114, y : 78 },{   
                text : "y", x : 91, y : 78 },{  
                text : "清空", ref : 'kbClear',width : 42,x : 2, y : 78 },{          
                text : "=", x : 255, y : 3 },{    
                text : "-", x : 232, y : 3 },{    
                text : "`", x : 137, y : 78 },{   
                text : "[", x : 252, y : 78 },{   
                text : "]", x : 275, y : 78 },{  
                text : ";", x : 160, y : 78 },{  
                text : "'", x : 183, y : 78 },{  
                text : ",", x : 206, y : 78 },{   
                text : ".", x : 229, y : 78 },{  
                text : "/", x : 298, y : 78  
            }]  
        });  
        Ext.apply(this,{
        	items : btns
        });
        this.doHandlers(this,field);
        this.addManagedListener(this,'show',this.doWander,this);
        this.callParent(arguments);
    },
	doHandlers : function(this_,field){
		var self = this;
		Ext.Array.each(this_.items.items.items,function(item){
			item.on('click',function(obj){  
               switch(obj.text){  
                   case '大写锁定':  //大写锁定
                	   self.doCapsLock(obj);  
                       break;  
                   case 'Shift':  
                	   self.doShift(obj);  
                       break;  
                   case '清空':  
                	   self.doClear(field);  
                       break;  
                   case '←':  
                	   self.doBackspace(field);  
                       break;  
                   default:  
                	   self.doClicked(obj,field);  
               }  
           },this);
		});
       //处理事件  
		this_.on(this.showEvents,function(){  
           var posArr = field.getPosition();  
           var viewWidth = document.body.scrollWidth;//网页可见区宽度  
           var viewHeight = document.body.scrollHeight;//网页可见区高度  
           var posXY = [];  
           if((viewWidth-posArr[0]-field.getWidth()-328)>=0){  
               posXY.push(posArr[0]+field.getWidth());  
               posXY.push(posArr[1]);  
           }else if((viewWidth-posArr[0]-328)>=0){  
               posXY.push(posArr[0]);  
               var tmp = viewHeight-posArr[1]-field.getHeight()-103;  
               posXY.push(tmp>=0?(posArr[1]+this.getHeight()):(posArr[1]-103));  
           }else if((viewWidth-posArr[0]-328)<0){  
               posXY.push(posArr[0]-328);  
               var tmp = viewHeight-posArr[1]-field.getHeight()-103;  
               posXY.push(tmp>=0?(posArr[1]+this.getHeight()):(posArr[1]-103));  
           }else{  
               posXY = [posArr[0],posArr[1]+field.getHeight()];  
           }
           this.showAt(posXY);  
       },this);  
   },  
   doBackspace : function(field){  
       var oldV = field.getValue();  
       var newV = oldV.substring(0,oldV.length-1);  
       field.setValue(newV);  
   },  
   //处理所有按钮的点击事件  
   doClicked : function(obj,field){  
       field.setValue(field.getValue() + obj.text);  
   },  
   //清除文本框的内容  
   doClear : function(field){  
       field.setValue('');  
   },  
   //点击了Shift键  
   doShift : function(obj){  
	   var self = this;
       var isUp = obj.pressed;
       var regex = /^[a-z]{1}$/i;  
       Ext.Array.each(this.items.items[0].items.items,function(item){
    	   var txt = item.text;  
           var ascii = txt.charCodeAt(0);  
           if(txt.match(regex)){//是字母  
               item.setText(isUp?txt.toUpperCase():txt.toLowerCase());
           }else{
               var tmp = self.chars[txt];  
               item.setText(tmp);  
//               delete this.chars[txt];  
               self.chars[tmp] = txt;  
           }  
       });
   },  
     
   //点击了CapsLock  
   doCapsLock : function(obj){  
	   var isUp = obj.pressed;
       var regex = /^[a-zA-Z]{1}$/;
       Ext.Array.each(this.items.items[0].items.items,function(item){
    	   console.log(item);
           var txt = item.text;  
           if(txt.match(regex)){  
        	   item.setText(isUp?txt.toUpperCase():txt.toLowerCase());  
           }  
       });
   },  
     
   //混淆按钮位置  
   doWander : function(){  
       if(!this.wander){  
           return;  
       }  
       var regexC = /^[a-zA-Z]{1}$/;  
       var regexN = /^\d+$/;  
       var ghostC = this.posC;  
       var ghostN = this.posN;  
       Ext.Array.each(this.items.items.items,function(item){
           var posxy;  
           var obj = item;  
           if((obj.text.length == 1) && obj.text.match(regexC)){//是字母  
               var cIndex = window.util.randomNum(0,this.posC.length-1);  
               obj.setText(this.posC[cIndex]);  
               this.posC = window.util.arrayDelte(this.posC,cIndex);  
           }else if(obj.text.match(regexN)){//是数字  
               var nIndex = window.util.randomNum(0,this.posN.length-1);  
               obj.setText(this.posN[nIndex]);  
               this.posN = window.util.arrayDelte(this.posN,nIndex);  
           }  
//         alert(obj.text + (obj.text.length == 1) + '\t'+this.posC.length+'\t'+this.posN.length);  
             
       })
       this.posC = ghostC;  
       this.posN = ghostN;  
         
   },  
     
   getPType : function(){  
       return this.ptype;  
   }
});