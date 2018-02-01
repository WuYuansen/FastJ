/*
	版权所有 2009-2015 荆门泽优软件有限公司 保留所有版权。
	邮箱:1085617561@qq.com
	描述:Word图片上传控件
	此文件实现上传后自动关闭上传窗口的功能
	更新记录：
		2012-07-04 增加对IE9的支持。
*/

//系统错误
var WordPasterError = {
	  "0": "连接服务器错误"
	, "1": "发送数据错误"
	, "2": "接收数据错误"
	, "3": "未设置文件路径"
	, "4": "本地文件不存在"
	, "5": "打开本地文件错误"
	, "6": "不能读取本地文件"
	, "7": "公司未授权"
	, "8": "未设置IP"
	, "9": "域名未授权"
	, "10": "文件大小超出限制"
	, "11": "不能设置回调函数"
	, "12": "Native控件错误"
};
var WordPasterConfig = {
	"EncodeType"		    : "GB2312"
	, "Company"			    : "荆门泽优软件有限公司"
	, "Version"			    : "1,5,123,31671"
	, "License"			    : ""
	, "Debug"			    : false//调试模式
	, "LogFile"			    : "f:\\log.txt"//日志文件路径
	, "PasteWordType"	    : ""	//粘贴WORD的图片格式。JPG/PNG/GIF/BMP，推荐使用JPG格式，防止出现大图片。
	, "PasteImageType"	    : ""	//粘贴文件，剪帖板的图片格式，为空表示本地图片格式。JPG/PNG/GIF/BMP
	, "JpgQuality"		    : "100"	//JPG质量。0~100
	, "QueueCount"		    : "5"	//同时上传线程数
	, "CryptoType"		    : "uuid"//名称计算方式,md5,crc,sha1,uuid，其中uuid为随机名称
	, "ThumbWidth"		    : "0"	//缩略图宽度。0表示不使用缩略图
	, "ThumbHeight"		    : "0"	//缩略图高度。0表示不使用缩略图
	, "AppPath"			    : ""
	, "Cookie"			    : ""
    , "Servers"             :[{"url":"www.ncmem.com"},{"url":"www.xproerui.com"}]//内部服务器地址(不下载此地址中的图片)
	, "IcoError"            : "http://www.ncmem.com/products/word-imagepaster/ckeditor353/WordPaster/error.png"
    , "IcoUploader"         : "http://www.ncmem.com/products/word-imagepaster/ckeditor353/WordPaster/upload.gif"
	, "PostUrl"			    : "http://www.ncmem.com/products/word-imagepaster/fckeditor2461/asp.net/upload.aspx"
    //x86
	, "ClsidParser"		    : "2404399F-F06B-477F-B407-B8A5385D2C5E"
	, "CabPath"			    : "http://www.ncmem.com/download/WordPaster2/WordPaster.cab"
	//x64
	, "ClsidParser64"		: "7C3DBFA4-DDE6-438A-BEEA-74920D90764B"
	, "CabPath64"			: "http://www.ncmem.com/download/WordPaster2/WordPaster64.cab"
	//Firefox
	, "XpiType"	            : "application/npWordPaster2"
	, "XpiPath"		        : "http://www.ncmem.com/download/WordPaster2/WordPaster.xpi"
	//Chrome
	, "CrxName"		        : "npWordPaster2"
	, "CrxType"	            : "application/npWordPaster2"
	, "CrxPath"		        : "http://www.ncmem.com/download/WordPaster2/WordPaster.crx"
	//Chrome 45
    , "NatHostName"         : "com.xproer.wordpaster"//
    , "ExtensionID"         : "nmopflahkgegkgkfnhdjpflfjipkpjpk"
	, "NatPath"		        : "http://www.ncmem.com/download/WordPaster2/WordPaster.nat.crx"
	, "ExePath"		        : "http://www.ncmem.com/download/WordPaster2/WordPaster.exe"
};
function debugMsg(m) { $("#msg").append(m);}
var WordPasterActiveX = {
	  "WordParser"	    : "Xproer.WordParser2"
	//x64
	, "WordParser64"	: "Xproer.WordParser2x64"
};

//浏览器版本
var BrowserVersion = {
    IE: 0
	, IE64: 1
	, Firefox: 2
	, Chrome: 3
};
var WordPasteImgType = {local:0/*本地图片*/,network:1/*网络图片*/,word:2/*word图片*/};

/*
	上传对象管理器
	关联HTML元素：
		文件上传列表：FilePostLister
		文件上传列表项模板：UploaderTemplate
		文件上传列表分隔线：FilePostLine
*/
function WordPasterManager()
{
    var _this = this;
    this.Editor = null;
    this.Fields = {}; //符加信息
    this.UploadDialogCreated = false;
    this.PasteDialogCreated = false;
    this.imgPasterDlg = null;//jquery obj
    this.imgUploaderDlg = null;//jquery obj
    this.imgIco = null;//jquery obj
    this.imgMsg = null;//jquery obj
    this.imgPercent = null;//jquery obj
    this.ffPaster = null;
    this.ieParser = null;
    this.setuped = false;//控件是否安装
    this.natInstalled = false;
    this.filesPanel = null;//jquery obj
    this.fileItem = null;//jquery obj
    this.line = null;//jquery obj
    this.BrowserVer = BrowserVersion.IE;
	this.ActiveX = WordPasterActiveX;
	this.Config = WordPasterConfig;
	this.EditorContent = ""; //编辑器内容。当图片上传完后需要更新此变量值
	this.CurrentUploader = null; //当前上传项。
	this.UploaderList = new Object(); //上传项列表
    //已上传图片列表
    //模型：LocalUrl:ServerUrl
	this.UploaderListCount = 0; //上传项总数
	this.fileMap = new Object();//文件映射表。
	this.postType = WordPasteImgType.word;//默认是word
	this.working = false;//正在上传中
	this.event = {
	    "postComplete": function (url) { }
        , "queueComplete": function () { }
	};

    //IE浏览器信息管理对象
	this.BrowserIE = {
	    "GetHtml": function ()
	    {
	        /*ActiveX的静态加载方式，如果在框架页面中使用此控件，推荐使用静态加截方式。
			<div style="display: none">
			<object id="Paster" classid="clsid:2404399F-F06B-477F-B407-B8A5385D2C5E" codebase="http://www.ncmem.com/WordPaster.cab#version=1,6,26,54978" width="1" height="1"></object>
			</div>
			*/
	        var acx = '<div style="display: none">';
	        //Word解析组件
	        acx += ' <object id="objWordParser" classid="clsid:' + _this.Config["ClsidParser"] + '"';
	        acx += ' codebase="' + _this.Config["CabPath"] + '#version=' + _this.Config["Version"] + '"';
	        acx += ' width="1" height="1" ></object>';
	        acx += '</div>';
	        return acx;
	    }
		, "Check": function ()
		{
		    try
		    {
		        var v = _this.ieParser.Version;
		        return true;
		    }
		    catch (e) { return false; }
		}
	    , "CheckVer": function ()
	    {
	        try
	        {
	            return _this.ieParser.Version != _this.Config["Version"];
	        }
	        catch (e) { return true; }
	    }
		, "Init": function () { }
	};
    //FireFox浏览器信息管理对象
	this.BrowserFF = {
	    "GetHtml": function ()
	    {
	        var html = '<embed type="' + _this.Config["XpiType"] + '" pluginspage="' + _this.Config["XpiPath"] + '" width="1" height="1" id="objWordPaster"/>';
	        return html;
	    }
        , "Check": function ()
        {
            var mimetype = navigator.mimeTypes;
            if (typeof mimetype == "object" && mimetype.length)
            {
                for (var i = 0; i < mimetype.length; i++)
                {
                	var exist = mimetype[i].type == _this.Config["XpiType"];//low ff
                	if(!exist) exist = mimetype[i].type == _this.Config["XpiType"].toLowerCase();//high ff
                	if(exist) return mimetype[i].enabledPlugin;
                }
            }
            else
            {
                mimetype = [_this.Config["XpiType"]];
            }
            if (mimetype)
            {
                return mimetype.enabledPlugin;
            }
            return false;
        }
	    , "CheckVer": function ()
	    {
	        try
	        {
	            return _this.ffPaster.Version != _this.Config["Version"];
	        }
	        catch (e) { return true;}
	    }//安装插件
		, "Setup": function ()
		{
		    var xpi = new Object();
		    xpi["Calendar"] = _this.Config["XpiPath"];
		    InstallTrigger.install(xpi, function (name, result) { });
		}
		, "Init": function () { }
	};
    //Chrome浏览器信息管理对象
	this.BrowserChrome = {
	    "GetHtml": function ()
	    {
	        var html = '<embed type="' + _this.Config["CrxType"] + '" pluginspage="' + _this.Config["CrxPath"] + '" width="1" height="1" id="objWordPaster"/>';
	        return html;
	    }
		, "Check": function ()
		{
		    for (var i = 0, l = navigator.plugins.length; i < l; i++)
		    {
		        if (navigator.plugins[i].name == _this.Config["CrxName"])
		        {
		            return true;
		        }
		    }
		    return false;
		}
	    , "CheckVer": function ()
	    {
	        try
	        {
	            return _this.ffPaster.Version != _this.Config["Version"];
	        }
	        catch (e) { return true; }
	    } //安装插件
		, "Setup": function ()
		{
		    document.write('<iframe style="display:none;" src="' + _this.Config["XpiPath"] + '"></iframe>');
		}
		, "Init": function () { }
	};
	this.BrowserNat = {
	    "GetHtml": function ()
	    {
	        var html = '<embed type="' + _this.Config["CrxType"] + '" pluginspage="' + _this.Config["CrxPath"] + '" width="1" height="1" id="objWordPaster"/>';
	        return html;
	    }
		, "Check": function ()
		{
		    var img = document.createElement('img');
		    img.src = 'chrome-extension://' + _this.Config.ExtensionID + '/icon.jpg';
		    img.onload = function () { _this.natInstalled = true; };
		    img.onerror = function () { _this.setupTip(); };
		    //chrome.management.get(_this.Config.ExtensionID, function (exInf) { _this.natInstall = true; });
		    return true;
		}
	    , "CheckVer": function ()
	    {
	        return false;
	    } //安装插件
		, "Setup": function ()
		{
		    document.write('<iframe style="display:none;" src="' + _this.Config["XpiPath"] + '"></iframe>');
		}
		, "Init": function (){}
	};

    //WordParser Control
	this.WordParserIE = {
	    "Init": function ()
	    {
	        if (!_this.Browser.Check()) return;
	        this.parser = _this.ieParser;
	        var param = { config: _this.Config, fields: _this.Fields };
	        this.parser.Init(JSON.stringify(param));
	        this.parser.StateChanged = _this.WordParser_StateChanged;
	    }
        , "Paste": function ()
        {
            if (_this.working) return;
            _this.working = true;
            _this.ieParser.Paste()
        }
        , "PasteAuto": function (html)
        {
            if (_this.working) return;
            _this.working = true;
            _this.ieParser.PasteAuto(html)
        }
        , "HasData": function () { return _this.ieParser.HasData();}
	};
	this.WordParserFF = {
	    "Init": function ()
	    {
	        if (!_this.Browser.Check()) return;
	        this.parser = _this.ffPaster;
	        var param = { config: _this.Config, fields: _this.Fields };
	        this.parser.Init(JSON.stringify(param));
	        this.parser.StateChanged = _this.WordParser_StateChanged;
	    }
        , "Paste": function ()
        {
            if (_this.working) return;
            _this.working = true;
            _this.ffPaster.Paste();
        }
        , "PasteAuto": function (html)
        {
            if (_this.working) return;
            _this.working = true;
            _this.ffPaster.PasteAuto(html)
        }
        , "HasData": function () { return _this.ffPaster.HasData(); }
	};
    //chrome 45 Native Message
	this.WordParserNat = {
	     "entID": "WordPasterEvent"
	    ,"Init": function ()
	    {
	        this.exitEvent();
	        document.addEventListener('WordPasterEventCallBack', function (evt)
	        {
	            _this.WordParser_StateChanged(JSON.stringify(evt.detail));
	        });
	    }
        , "Paste": function ()
        {
            if (_this.working) return;
            _this.working = true;
            var par = { name: 'Paste', config: _this.Config, fields: _this.Fields };
            var evt = document.createEvent("CustomEvent");
            evt.initCustomEvent(this.entID, true, false, par);
            document.dispatchEvent(evt);
        }
        , "PasteAuto": function (html)
        {
            if (_this.working) return;
            _this.working = true;
            var par = { name: 'PasteAuto', data: html,config: _this.Config, fields: _this.Fields };
            var evt = document.createEvent("CustomEvent");
            evt.initCustomEvent(this.entID, true, false, par);
            document.dispatchEvent(evt);
        }
        , "exit": function ()
        {
            var par = { name: 'exit'};
            var evt = document.createEvent("CustomEvent");
            evt.initCustomEvent(this.entID, true, false, par);
            document.dispatchEvent(evt);
        }
        , "exitEvent": function ()
        {
            var obj = this;
            $(window).bind("beforeunload", function () { obj.exit(); });
        }
	};
	this.WordParser = this.WordParserIE;
	this.Browser = this.BrowserIE;
	var browserName = navigator.userAgent.toLowerCase();
	this.ie = browserName.indexOf("msie") > 0;
    //IE11
	this.ie = this.ie ? this.ie : browserName.search(/(msie\s|trident.*rv:)([\w.]+)/) != -1;
	this.firefox = browserName.indexOf("firefox") > 0;
	this.chrome = browserName.indexOf("chrome") > 0;
	this.chrome45 = false;
	this.chrVer = navigator.appVersion.match(/Chrome\/(\d+)/);

	if (this.ie)
	{
	    //Win64
	    if (window.navigator.platform == "Win64")
	    {
	        _this.BrowserVer = BrowserVersion.IE64;
	        _this.Config["ClsidParser"] = this.Config["ClsidParser64"];
	        _this.Config["CabPath"] = this.Config["CabPath64"];
	        //ActiveX
	        _this.ActiveX["WordParser"] = this.ActiveX["WordParser64"];
	    }
	} //Firefox
	else if (this.firefox)
	{
	    _this.BrowserVer = BrowserVersion.Firefox;
	    _this.Browser = this.BrowserFF;
	    this.WordParser = this.WordParserFF;
	} //chrome
	else if (this.chrome)
	{
	    _this.BrowserVer = BrowserVersion.Chrome;
	    _this.Config["XpiPath"] = _this.Config["CrxPath"];
	    _this.Config["XpiType"] = _this.Config["CrxType"];
	    _this.Browser = this.BrowserChrome;
	    this.WordParser = this.WordParserFF;
	    //44+版本使用Native Message
	    if (parseInt(this.chrVer[1]) >= 44)
	    {
	        if (!this.BrowserChrome.Check())//仍然支持npapi
	        {
	            _this.chrome45 = true;//
	            _this.Browser = this.BrowserNat;
	            _this.Browser.Check();
	            this.WordParser = this.WordParserNat;
	        }
	    }
	}

	this.setupTip = function ()
	{
	    this.OpenDialogPaste();
	    var dom = this.imgMsg.html("未检测到控件，请先<a name='aCtl'>安装控件</a>,Chrome 45+需要单独<a name='aCrx'>安装扩展</a>");
	    var lnk = dom.find('a[name="aCtl"]');
	    lnk.attr("href", this.Config["ExePath"]);
	    var crx = dom.find('a[name="aCrx"]');
	    crx.attr("href", this.Config["NatPath"]);
	    this.imgPercent.hide();
	    this.imgIco.hide();
	};
	this.CheckUpdate = function ()
	{
	    if (this.Browser.CheckVer())
	    {
	        this.OpenDialogPaste();
	        var dom = this.imgMsg.html("控件有新版本，请<a name='aCtl'>更新控件</a>");
	        var lnk = dom.find('a[name="aCtl"]');
	        lnk.attr("href", this.Config["ExePath"]);
	        this.imgPercent.hide();
	        this.imgIco.hide();
	    }
	};

    //加载控件及HTML元素
	this.GetHtml = function ()
	{
	    //Word图片粘贴
	    var acx = "";
	    /*
			静态加截控件代码，在复杂WEB系统中或者框架页面中请静态方式加截Word解析组件(Xproer.WordParser)。
			<object id="objWordParser" classid="clsid:2404399F-F06B-477F-B407-B8A5385D2C5E"	width="1" height="1" ></object>
		*/
	    if(!this.chrome45) acx += '<embed name="ffPaster" type="' + this.Config["XpiType"] + '" pluginspage="' + this.Config["XpiPath"] + '" width="1" height="1" id="objWordPaster"/>';
	    //Word解析组件
	    acx += ' <object name="ieParser" classid="clsid:' + this.Config["ClsidParser"] + '"';
	    acx += ' codebase="' + this.Config["CabPath"] + '#version=' + this.Config["Version"] + '"';
	    acx += ' width="1" height="1" ></object>';
	    //单张图片上传窗口
	    acx += '<div name="imgPasterDlg" class="panel-paster" style="display:none;">';
	    acx += '<img name="ico" id="infIco" alt="进度图标" src="' + this.Config["IcoUploader"] + '" /><span name="msg">图片上传中...</span><span name="percent">10%</span>';
	    acx += '</div>';
	    //图片批量上传窗口
	    acx += '<div name="filesPanel" class="panel-files" style="display: none;"></div>';
	    //
	    acx += '<div style="display: none;">';

	    //文件上传列表项模板
	    acx += '<div class="UploaderItem" name="fileItem" id="UploaderTemplate">\
		            <div class="UploaderItemLeft">\
		            <div name="fname" class="FileName top-space">HttpUploader程序开发.pdf</div>\
		            <div class="ProcessBorder top-space">\
		                <div name="process" class="Process"></div>\
		            </div>\
		            <div name="msg" class="PostInf top-space">已上传:15.3MB 速度:20KB/S 剩余时间:10:02:00</div>\
		        </div>\
		        <div class="UploaderItemRight">\
		            <a name="btn" class="Btn" href="javascript:void(0)">取消</a>\
		            <div name="percent" class="ProcessNum">35%</div>\
		        </div>';
	    acx += '</div>'; //template end
	    //分隔线
	    acx += '<div name="line" class="Line" id="FilePostLine"></div>';

	    //hide div end
	    acx += '</div>';
	    return acx;
	};

    //加载控件及HTML元素
	this.Load = function ()
	{
	    var dom             = $(document.body).append(this.GetHtml());
	    this.ffPaster       = dom.find('embed[name="ffPaster"]').get(0);
	    this.ieParser       = dom.find('object[name="ieParser"]').get(0);
	    this.line           = dom.find('div[name="line"]');
	    this.fileItem       = dom.find('div[name="fileItem"]');
	    this.filesPanel     = dom.find('div[name="filesPanel"]');
	    this.imgUploaderDlg = dom.find('div[name="filesPanel"]');
	    this.imgPasterDlg   = dom.find('div[name="imgPasterDlg"]');
	    this.imgIco         = this.imgPasterDlg.find('img[name="ico"]');
	    this.imgMsg         = this.imgPasterDlg.find('span[name="msg"]');
	    this.imgPercent     = this.imgPasterDlg.find('span[name="percent"]');

	    this.init();
	};

	this.LoadTo = function (oid)
	{
	    var dom             = $("#" + oid).append(this.GetHtml());
	    this.ffPaster       = dom.find('embed[name="ffPaster"]').get(0);
	    this.ieParser       = dom.find('object[name="ieParser"]').get(0);
	    this.line           = dom.find('div[name="line"]');
	    this.fileItem       = dom.find('div[name="fileItem"]');
	    this.filesPanel     = dom.find('div[name="filesPanel"]');
	    this.imgUploaderDlg = dom.find('div[name="filesPanel"]');
	    this.imgPasterDlg   = dom.find('div[name="imgPasterDlg"]');
	    this.imgIco         = this.imgPasterDlg.find('img[name="ico"]');
	    this.imgMsg         = this.imgPasterDlg.find('span[name="msg"]');
	    this.imgPercent     = this.imgPasterDlg.find('span[name="percent"]');

	    this.init();
	};

    //在文档加载完毕后调用
	this.init = function ()
	{
	    $(function ()
	    {
	        _this.setuped = _this.Browser.Check();
	        if (_this.setuped)
	        {
	            _this.WordParser.Init();//

	            _this.CheckUpdate();//
	        }
	        else
	        {
	            _this.setupTip();
	        }
	    });
	};

    //打开图片上传对话框
	this.OpenDialogFile = function ()
	{
	    this.layerID = layer.open({
	        type: 1,
	        title: false,
	        area: ['auto', 'auto'],
	        border: [10, 0.3, '#000'], //去掉默认边框
	        shade: [0], //去掉遮罩
	        closeBtn: [0, false], //去掉默认关闭按钮
	        content: _this.imgUploaderDlg
	    });
	};
	this.CloseDialogFile = function ()
	{
	    layer.close(this.layerID);
	};
	
    //打开粘贴图片对话框
	this.OpenDialogPaste = function ()
	{
	    this.layerID = layer.open({
	        type: 1,
	        title: false,
	        area: ['auto', 'auto'],
	        border: [10, 0.3, '#000'], //去掉默认边框
	        shade: [0], //去掉遮罩
	        closeBtn: [0, false], //去掉默认关闭按钮
	        content: _this.imgPasterDlg
	    });

	};
	this.CloseDialogPaste = function ()
	{
	    layer.close(this.layerID);
	};
	this.InsertHtml = function (html)
	{
	    CKEDITOR.currentInstance.insertHtml(html);
	};
	this.GetEditor = function () { return CKEDITOR.currentInstance; };

    //在FCKeditor_OnComplete()中调用
	this.SetEditor = function (edt)
	{
	    //_this.Editor = edt;
	    //_this.WordPaster.Editor = edt;
	    //_this.ImagePaster.Editor = edt;

        //非chrome 45才挂载事件，因为chrome 45无法立即判断剪帖板数据
	    if(!this.chrome45)this.LoadPasteEvent(edt);
	};

    //粘贴命令
	this.Paste = function (evt)
	{
	    if (!this.setuped)
	    {
	        this.setupTip(); return;
	    }
	    if (!this.chrome45)
	    {
	        if (_this.WordParser.HasData())
	        {
	            evt.cancel();
	            _this.WordParser.Paste();
	        }
	    }
	    else if(this.chrome45)
	    {
	        _this.WordParser.Paste();
	    }
	};

    //单击按钮粘贴
	this.PasteManual = function ()
	{
	    if (!this.setuped)
	    {
	        this.setupTip(); return;
	    }//chrome 45直接调用控件命令
	    if (this.chrome45)
	    {
	        if (!this.natInstalled) { this.setupTip(); return;}
	        _this.WordParser.Paste();
	    }//非chrome 45则进行判断
	    else
	    {
	        if (_this.WordParser.HasData()) _this.WordParser.Paste();
	        else this.GetEditor().execCommand('paste');
	    }
	};

    //上传网络图片
	this.UploadNetImg = function ()
	{
	    var data = this.GetEditor().getData();
	    _this.WordParser.PasteAuto(data);
	};

    //加载粘贴事件	
	this.LoadPasteEvent = function (edt)
	{
	    edt.on('paste', function (evt)
	    {
	        _this.Paste(evt);
	    });
	};

	/*
	验证文件名是否存在
	参数:
		fileName 包含完整路径的文件名称
	*/
	this.Exist = function(fileName)
	{
		for (a in this.UploaderList)
		{
			if (this.UploaderList[a].LocalFile == fileName)
			{
				return true;
			}
		}
		return false;
	};

	/*
	根据ID删除上传任务
	参数:
	fileID
	*/
	this.Delete = function(fileID)
	{
		var obj = this.UploaderList[fileID];
		if (null == obj) return;

		var tbID = "item" + obj.FileID;
		var item = document.getElementById(tbID);
		if (item) document.removeChild(item); //删除
	};

	/*
		添加到上传列表
		参数
			index 上传对象唯一标识
			uploaderObj 上传对象
	*/
	this.AppendToUploaderList = function(index, uploaderObj)
	{
		this.UploaderList[index] = uploaderObj;
		++this.UploaderListCount;
	};

	/*
		添加到上传列表层
		参数
			fid 文件ID
			div 上传信息层对象
			obj 上传对象
	*/
	this.AppendToListDiv = function(fid, div, obj)
	{
		var line = this.line.clone(true); //分隔线
		line.attr("id", "FilePostLine" + fid)
            .css("display", "block");
		obj.Separator = line;

		this.filesPanel.append(div);
		this.filesPanel.append(line);
	};

	/*
		更新编辑器内容。
		在所有图片上传完后调用。
		在上传图片出现错误时调用。
	*/
	this.UpdateContent = function ()
	{
	    _this.InsertHtml(_this.EditorContent);
	};

	this.addImgLoc = function (img)
	{
	    var fid = img.id;
	    var task = new FileUploader(img.id, img.src, this, img.width, img.height);
	    this.fileMap[img.id] = task;//添加到文件映射表
	    var ui = this.fileItem.clone();
	    ui.css("display", "block").attr("id", "item" + fid);

	    var objFileName = ui.find('div[name="fname"]');
	    var divMsg = ui.find('div[name="msg"]');
	    var aBtn = ui.find('a[name="btn"]');
	    var divPercent = ui.find('div[name="percent"]');
	    var divProcess = ui.find('div[name="process"]');

	    objFileName.text(img.name).attr("title", img.name);
	    task.pProcess = divProcess;
	    task.pMsg = divMsg;
	    task.pMsg.text("");
	    task.pButton = aBtn;
	    aBtn.attr("fid", fid)
            .attr("domid", "item" + fid)
            .attr("lineid", "FilePostLine" + fid)
            .click(function ()
            {
                switch ($(this).text())
                {
                    case "暂停":
                    case "停止":
                        upFile.Stop();
                        break;
                    case "取消":
                        { upFile.Remove(); }
                        break;
                    case "续传":
                    case "重试":
                        upFile.Post();
                        break;
                }
            });
	    task.pPercent = divPercent;
	    task.pPercent.text("0%");
	    task.ImageTag = img.html; //图片标记
	    task.InfDiv = ui;//上传信息DIV

	    //添加到上传列表层
	    this.AppendToListDiv(fid, ui, task);

	    //添加到上传列表
	    this.AppendToUploaderList(fid, task);
	    task.Ready(); //准备
	    return task;
	};
	this.WordParser_PasteWord = function (json)
	{
	    this.postType = WordPasteImgType.word;
	    this.EditorContent = json.word;
	    for (var i = 0, l = json.imgs.length; i < l; ++i)
	    {
	        this.addImgLoc(json.imgs[i]);
	    }
	    this.OpenDialogFile();
	};
	this.WordParser_PasteExcel = function (json)
	{
	    this.postType = WordPasteImgType.word;
	    this.EditorContent = json.word;
	    for (var i = 0, l = json.imgs.length; i < l; ++i)
	    {
	        this.addImgLoc(json.imgs[i]);
	    }
	    this.OpenDialogFile();
	};
	this.WordParser_PasteHtml = function (json)
	{
	    this.postType = WordPasteImgType.word;
	    this.InsertHtml(json.word);//
	    this.working = false;
	};
	this.WordParser_PasteFiles = function (json)
	{
	    this.postType = WordPasteImgType.local;
	    for (var i = 0, l = json.imgs.length; i < l; ++i)
	    {
	        var task = this.addImgLoc(json.imgs[i]);
	        task.PostLocalFile = true;//
	    }
	    this.OpenDialogFile();
	};
	this.WordParser_PasteImage = function (json)
	{
	    this.OpenDialogPaste();
	    this.imgMsg.text("开始上传");
	    this.imgPercent.text("1%");
	};
	this.WordParser_PasteAuto = function (json)
	{
	    this.postType = WordPasteImgType.network;
	    for (var i = 0, l = json.imgs.length; i < l; ++i)
	    {
	        this.addImgLoc(json.imgs[i]);
	    }
	    this.OpenDialogFile();
	};
	this.WordParser_PostComplete = function (json)
	{
	    this.event.postComplete(json.value);
	    this.imgPercent.text("100%");
	    this.imgMsg.text("上传完成");
	    var img = "<img src=\"";
	    img += json.value;
	    img += "\" />";
	    this.InsertHtml(img);
	    this.CloseDialogPaste();
	    this.working = false;
	};
	this.WordParser_PostProcess = function (json)
	{
	    this.imgPercent.text(json.percent);
	};
	this.WordParser_PostError = function (json)
	{
	    this.OpenDialogPaste();
	    this.imgMsg.text(WordPasterError[json.value]);
	    this.imgIco.src = this.Config["IcoError"];
	    this.imgPercent.text("");
	};
	this.File_PostComplete = function (json)
	{
	    this.event.postComplete(json.pathSvr);
	    var up = this.fileMap[json.id];
	    up.postComplete(json);
	    delete up;//
	};
	this.File_PostProcess = function (json)
	{
	    var up = this.fileMap[json.id];
	    up.postProcess(json);
	};
	this.File_PostError = function (json)
	{
	    var up = this.fileMap[json.id];
	    up.postError(json);
	};
	this.Queue_Complete = function (json)
	{
	    //上传网络图片
	    if (_this.postType == WordPasteImgType.network)
	    {
	        _this.GetEditor().setData(json.word);
	    } //上传Word图片时才替换内容
	    else if (_this.postType == WordPasteImgType.word)
	    {
	        _this.InsertHtml(json.word);//
	    }
	    this.CloseDialogFile();
	    _this.working = false;
	    this.event.queueComplete();
	};
	this.WordParser_StateChanged = function (msg)
	{
	    var json = JSON.parse(msg);
	    if      (json.name == "Parser_PasteWord") _this.WordParser_PasteWord(json);
	    else if (json.name == "Parser_PasteExcel") _this.WordParser_PasteExcel(json);
	    else if (json.name == "Parser_PasteHtml") _this.WordParser_PasteHtml(json);
	    else if (json.name == "Parser_PasteFiles") _this.WordParser_PasteFiles(json);
	    else if (json.name == "Parser_PasteImage") _this.WordParser_PasteImage(json);
	    else if (json.name == "Parser_PasteAuto") _this.WordParser_PasteAuto(json);
	    else if (json.name == "Parser_PostComplete") _this.WordParser_PostComplete(json);
	    else if (json.name == "Parser_PostProcess") _this.WordParser_PostProcess(json);
	    else if (json.name == "Parser_PostError") _this.WordParser_PostError(json);
	    else if (json.name == "File_PostProcess") _this.File_PostProcess(json);
	    else if (json.name == "File_PostComplete") _this.File_PostComplete(json);
	    else if (json.name == "File_PostError") _this.File_PostError(json);
	    else if (json.name == "Queue_Complete") _this.Queue_Complete(json);
	};
}

var FileUploaderState = {
	Ready: 0,
	Posting: 1,
	Stop: 2,
	Error: 3,
	GetNewID: 4,
	Complete: 5,
	WaitContinueUpload: 6,
	None: 7,
	Waiting: 8
};

/*
	文件上传对象
	参数：
		fileID 文件唯一标识
		filePath 包含完整路径的本地文件名称。D:\Soft\QQ.exe
		width 图片宽度
		height 图片高度
	属性：
		pMsg		显示上传信息，进度信息
		pProcess	进度条
		pPercent	显示百分比文字
		pButton		按钮按钮
		LocalFile	本地文件路径。D:\Soft\QQ.exe
		ImageTag	图片标记。
		InfDiv		上传信息层。
		Separator	分隔线
*/
function FileUploader(fileID,filePath,mgr,width,height)
{
	var _this = this;
	this.Manager = mgr;
	this.Editor = mgr.Editor;
	this.Config = mgr.Config;
	this.ActiveX = mgr.ActiveX;
	this.Fields = mgr.Fields;
	this.Browser = mgr.Browser;
	this.InsertHtml = mgr.InsertHtml;

	this.PostLocalFile = false;//是否上传本地文件
	this.imgW = width;
	this.imgH = height;
	this.LocaFile = filePath;//网络图片需要使用
	this.State = FileUploaderState.None;
	this.LocalFile = filePath;
	this.FileID = fileID;
	this.idLoc = fileID;//add(2015-12-10)
	this.ImageTag = ""; //图片标记，在图片上传完后需要替换此标记

	this.postComplete = function (json)
	{
	    this.pButton.text("");
	    this.pProcess.css("width", "100%");
	    this.pPercent.text("100%");
	    this.pMsg.text("上传完成");

	    //从上传列表中清除
	    this.Remove();
	    //更新编辑器中的图片标签
	    this.FilePostComplete(json.pathSvr);
	};

	this.postError = function (json)
	{
	    this.pMsg.text(WordPasterError[json.value]);
	    this.pButton.text("重试");
	};

	this.postProcess = function (json)
	{
	    var msg = "已上传:" + json.len + " 速度:" + json.speed + " 剩余时间:" + json.time;
	    this.pMsg.text(msg);
	    this.pPercent.text(json.percent);
	    this.pProcess.css("width", json.percent);
	};

	//方法-准备
	this.Ready = function()
	{
		//this.pButton.style.display = "none";
		_this.pMsg.text("正在上传队列中等待...");
		_this.State = FileUploaderState.Ready;
	};

	//从上传列表中删除
	this.Remove = function()
	{
		//删除信息层
		_this.InfDiv.remove();
		//删除分隔线
		_this.Separator.remove();
		//清空本地文件名称
		_this.LocalFile = "";
	};

	//停止传输
	this.Stop = function()
	{
		//var obj = _this.Manager.UploaderList[fid];
		this.ATL.Stop();
		this.State = FileUploaderState.Stop;
		this.pButton.text("重试");
	};

	//本地图片文件上传完毕
	this.LocalFileComplete = function (imgSrc)
	{
		var img = '<img src="' + imgSrc + '"/>';
		_this.InsertHtml(img);
	};

	//文件上传完毕
	this.FilePostComplete = function(imgSrc)
	{
		//上传的本地文件
		if (_this.PostLocalFile)
		{
			_this.LocalFileComplete(imgSrc);
		}
	};
}