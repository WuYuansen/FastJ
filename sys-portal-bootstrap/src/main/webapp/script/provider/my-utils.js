"use strict";

/**
 * 格式化字符串
 * @param args	要替换到字符串
 * @use		"'欢迎 {0}".format("光临");	
 * @returns {String}
 */
String.prototype.format = function(args) {
    var result = this;
    if (arguments.length > 0) {    
        if (arguments.length == 1 && typeof (args) == "object") {
            for (var key in args) {
                if(args[key]!=undefined){
                    var reg = new RegExp("({" + key + "})", "g");
                    result = result.replace(reg, args[key]);
                }
            }
        }
        else {
            for (var i = 0; i < arguments.length; i++) {
                if (arguments[i] != undefined) {
                    var reg = new RegExp("({[" + i + "]})", "g");
                    result = result.replace(reg, arguments[i]);
                }
            }
        }
    }
    return result;
}
/**
 * 二维码编号自动不全
 * @param number	值
 * @param size 		显示位数
 */
var padLeft = function(number, size) {
	var result = number;
    return result.toFixed(size - result.toString().length).replace('.', '').split('').reverse().join('');
}
/**
 * 截取字符串用于截取手机号&身份证等铭感信息都可使用
 * @params frontLen 前面保留位数，
 * @params endLen	后面保留位数。
 * 使用方式
 * "15909910367".subStr(5,3)
 */
String.prototype.subStr = function(frontLen,endLen){
	var len = this.length-frontLen-endLen;
    var stat = '';
    for (var i=0;i<len;i++) {
    	stat+='*';
    }
    return this.substr(0,frontLen)+stat+this.substr(this.length-endLen);
}


/**
 * 截取字符串，后面加...
 * @param args	要截取的字符串
 * @use		"'欢迎 {0}".subStrByOmitted(3);	
 * @returns {String}
 */
String.prototype.subStrByOmitted = function(args){
	if(this.length > 0){
		if(this.length > args)
			return this.substr(0,args) + " ...";
		else
			return this;
	}else{
		return this;
	}
}

/**
 * 格式化日期
 * @param fmt 要转换到格式
 *  对Date的扩展，将 Date 转化为指定格式的String
 *  	月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q) 年(y) 毫秒(S)
 * @returns {String}
 */
Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

/**
 * 点击panel右上角操作
 */
var panelClick = function(){
	$('.panel-tools').each(function(index,item){
		$(item).children('button[data-widget=collapse]').click(function(dom){
		    $(item).parent().next('div').hide();
		    $(this).children().attr('class','fa fa-plus');
		    $(this).attr('data-widget','push');
		    panelClick();
		});
		$(item).children('button[data-widget=push]').click(function(dom){
		    $(item).parent().next('div').show();
		    $(this).children().attr('class','fa fa-minus');
		    $(this).attr('data-widget','collapse');
		    panelClick();
		});
		$(item).children('button[data-widget=remove]').click(function(dom){
		    $(item).parent().parent('.panel').hide();
		});
	});
}

var myBrowser = function(){
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isOpera = userAgent.indexOf("Opera") > -1;
    if (isOpera) {//判断是否Opera浏览器
        return "Opera"
    };
    if (userAgent.indexOf("Firefox") > -1) { //判断是否Firefox浏览器
        return "FF";
    }
    if (userAgent.indexOf("Chrome") > -1){
    	return "Chrome";
    }
    if (userAgent.indexOf("Safari") > -1) { //判断是否Safari浏览器
        return "Safari";
    }
    if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) { //判断是否IE浏览器
        return "IE";
    };
}


/**
 * 移除对象中多余的对象
 * @param sources 原始对象
 * @param target  代替换的替换对象
 * 
 * @return 新的对象
 */
var removeOverField = function(sources,targer){
	var aProps = Object.getOwnPropertyNames(sources);
	for(var i=0;i<aProps.length;i++){
		sources[aProps[i]] = targer[aProps[i]]===undefined?"":targer[aProps[i]];
	}
	return sources;
}
/**
 * 动态改变窗体显示大小
 * @参数说明 tabWidth - 去除的高度
 *  	   centinfoWidth 要去除的高度
 * @return 
 */
var myWindowResize = function(tabWidth,centinfoWidth){
	if(tabWidth === 0 && centinfoWidth === 0){
		$('.my-tab').height($(window).height()-$('.tools').height()-45);
		$('.centinfo').height($('.my-tab').height()-$('.tools').height()-140);
		window.onresize = function(){
			$('.my-tab').height($(window).height()-$('.tools').height()-45);
			$('.centinfo').height($('.my-tab').height()-$('.tools').height()-140);
	    }
		return;
	}else{
		$('.my-tab').height($(window).height()-tabWidth);
	    $('.centinfo').height($('.my-tab').height()-centinfoWidth);
	    window.onresize = function(){
	    	$('.my-tab').height($(window).height()-tabWidth);
	        $('.centinfo').height($('.my-tab').height()-centinfoWidth);
	    }
	}
}

/**
 * 格式化时间格式
 * @参数说明 s 要格式化的数值
 * 		   n 保留的小数位数
 * @调用方式 formatMoney(123456,2);
 * @return "123,456.00"
 */
var formatMoney = function(s, n){
	n = n > 0 && n <= 20 ? n : 0;
	s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
	var l = s.split(".")[0].split("").reverse(), r = s.split(".")[1];
	var t = "";
	for (var i = 0; i < l.length; i++) {
		t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
	}
	if(n === 0)
		return t.split("").reverse().join("");
	else
		return t.split("").reverse().join("") + "." + r;
}
/**
 * 页面打印相关
 */
var hkey_root,hkey_path,hkey_key
hkey_root="HKEY_CURRENT_USER"
hkey_path="\\Software\\Microsoft\\Internet Explorer\\PageSetup\\"

// 设置页眉页脚为空
var PageSetup_Null = function(){
	try{
		  var RegWsh = new ActiveXObject("WScript.Shell") ;
		  hkey_key="header" ;
		  RegWsh.RegWrite(hkey_root+hkey_path+hkey_key,"") ;
		  hkey_key="footer" ;
		  RegWsh.RegWrite(hkey_root+hkey_path+hkey_key,"") ;
	}catch(e){}
}

// 设置页眉页脚为默认值
var PageSetup_Default = function(){
	try{
		var RegWsh = new ActiveXObject("WScript.Shell") ;
			hkey_key="header" ;
			RegWsh.RegWrite(hkey_root+hkey_path+hkey_key,"&w&b页码，&p/&P") ;
			hkey_key="footer" ;
			RegWsh.RegWrite(hkey_root+hkey_path+hkey_key,"&u&b&d") ;
	  	}catch(e){}
}

var preview = function(body) { 
	//写成一行 
	var bdhtml=body;
	var OpenWindow=window.open("", "打印预览", "toolbar=no ,scrollbars=YES,menubar=no"); 
	OpenWindow.document.write("<title>打印预览</title>")
	OpenWindow.document.write('<link href="script/plugs/layui/css/layui.css" rel="stylesheet" type="text/css">');
	OpenWindow.document.write('<link href="theme/css/common.css" rel="stylesheet" type="text/css">');
	OpenWindow.document.write('<link href="theme/css/console.css" rel="stylesheet" type="text/css">');
	OpenWindow.document.write('<link href="theme/css/my-chart.css" rel="stylesheet" type="text/css">');
	OpenWindow.document.write('<script src="script/provider/my-utils.js"></script>'); 
	OpenWindow.document.write("<BODY BGCOLOR=#ffffff>") 
	var sprnstr="<!--startprint-->"; 
	var eprnstr="<!--endprint-->"; 
	var prnhtml=bdhtml.substr(bdhtml.indexOf(sprnstr)+17); 
	prnhtml=prnhtml.substring(0,prnhtml.indexOf(eprnstr)); 
	OpenWindow.document.write('<div style="margin:0 auto;width:1000px;"><!--startprint-->')
	OpenWindow.document.write(prnhtml); 
	OpenWindow.document.write("<!--endprint--></div>")
	OpenWindow.document.write('<div style="width:100%;text-align:center;">')
	OpenWindow.document.write('<button type="button" onclick="previewToPrint();">打印</button>');
	OpenWindow.document.write("&nbsp;&nbsp;&nbsp;&nbsp;")
	OpenWindow.document.write('<button type="button" onclick="window.close();">取消</button>');
	OpenWindow.document.write('&nbsp;&nbsp;&nbsp;&nbsp;<button type="button" value="取消"/>');
	OpenWindow.document.write("</div>")
	
	OpenWindow.document.write("</BODY>") 
	OpenWindow.document.write("</HTML>") 
	OpenWindow.document.close() 
}
var previewToPrint = function(){
	PageSetup_Null() ; 
	var bdhtml=window.document.body.innerHTML; 
	var sprnstr="<!--startprint-->"; 
	var eprnstr="<!--endprint-->"; 
	var prnhtml=bdhtml.substr(bdhtml.indexOf(sprnstr)+17); 
	prnhtml=prnhtml.substring(0,prnhtml.indexOf(eprnstr)); 
	window.document.body.innerHTML=prnhtml;
	window.print(); 
	PageSetup_Default() ;
}

/**
 * 跳转页面
 * @params obj 缓存参数
 */
var redirectToView = function(obj,url){
	window.localStorage.setItem("searchObj", obj);
	window.location.href = url;
}

/**
 * 导出文件
 * @params tableDomID	表格ID
 * @params fileName		文件名称(无需后缀)
 * @params fileType		文件类型- 默认xls
 * 								json
 * 								txt
 * 								csv
 * 								xls
 * 								doc
 */
var expFile = function(tableDomID,fileName,fileType){
	if(fileType == null || fileType.length === 0){	//如果用户未传入文件类型 则直接导出为excel文件
		fileType = "xls";
	}
	tableExport(tableDomID, fileName, fileType);
}