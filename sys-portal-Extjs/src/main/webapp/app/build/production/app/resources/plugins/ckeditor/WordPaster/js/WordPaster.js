/*
	版权所有 2009-2017 荆门泽优软件有限公司 保留所有版权。
	官网：http://www.ncmem.com/
    论坛：http://bbs.ncmem.com/
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
	, "Version"			    : "1,5,128,51252"
	, "License"			    : ""
	, "Debug"			    : false//调试模式
	, "LogFile"			    : "f:\\log.txt"//日志文件路径
	, "PasteWordType"	    : ""	//粘贴WORD的图片格式。JPG/PNG/GIF/BMP，推荐使用JPG格式，防止出现大图片。
	, "PasteImageType"	    : ""	//粘贴文件，剪帖板的图片格式，为空表示本地图片格式。JPG/PNG/GIF/BMP
	, "PasteImgSrc"		    : ""	//shape:优先使用源公式图片，img:使用word自动生成的图片
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
    //Edge
    , edge: { protocol: "wordpaster", port: 9200, visible: false }
    , "ExePath": "http://www.ncmem.com/download/WordPaster2/WordPaster.exe"
};
function debugMsg(m) { $("#msg").append(m);}
var WordPasterActiveX = {
	  "WordParser"	    : "Xproer.WordParser2"
	//x64
	, "WordParser64"	: "Xproer.WordParser2x64"
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
    this.ui = { setup: null ,single:null};
    this.ffPaster = null;
    this.ieParser = null;
    this.ffPasterName = "ffPaster" + new Date().getTime();
    this.iePasterName = "iePaster" + new Date().getTime();
    this.setuped = false;//控件是否安装
    this.natInstalled = false;
    this.filesPanel = null;//jquery obj
    this.fileItem = null;//jquery obj
    this.line = null;//jquery obj
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
    this.edgeApp = new WebServer(this);
    this.app = WordPasterApp;
    this.app.ins = this;
    var browserName = navigator.userAgent.toLowerCase();
	this.ie = browserName.indexOf("msie") > 0;
    //IE11
	this.ie = this.ie ? this.ie : browserName.search(/(msie\s|trident.*rv:)([\w.]+)/) != -1;
	this.firefox = browserName.indexOf("firefox") > 0;
	this.chrome = browserName.indexOf("chrome") > 0;
	this.chrome45 = false;
	this.edge = navigator.userAgent.indexOf("Edge") > 0;
	this.chrVer = navigator.appVersion.match(/Chrome\/(\d+)/);
	this.ffVer = navigator.userAgent.match(/Firefox\/(\d+)/);
	if (this.edge) { this.ie = this.firefox = this.chrome = this.chrome45 = false; }

    $(window).bind("beforeunload", function () {
        if (this.edge) _this.edgeApp.close();
    });
    //Win64
    if (window.navigator.platform == "Win64")
	{
        _this.Config["ClsidParser"] = this.Config["ClsidParser64"];
        _this.Config["CabPath"] = this.Config["CabPath64"];
        //ActiveX
        _this.ActiveX["WordParser"] = this.ActiveX["WordParser64"];   
	}//Firefox
	if (this.firefox)
    {
	    if (!this.app.supportFF() || parseInt(this.ffVer[1]) >= 50)//仍然支持npapi
        {
            this.app.postMessage = this.app.postMessageEdge;
            this.edge = true;
        }
	} //chrome
	else if (this.chrome)
	{
	    _this.Config["XpiPath"] = _this.Config["CrxPath"];
	    _this.Config["XpiType"] = _this.Config["CrxType"];
	    //44+版本使用Native Message
	    if (parseInt(this.chrVer[1]) >= 44)
	    {
            if (!this.app.supportFF())//仍然支持npapi
            {
                this.app.postMessage = this.app.postMessageEdge;
                this.edge = true;
	        }
	    }
	}
	else if (this.edge)
    {
        this.app.postMessage = this.app.postMessageEdge;
	}
    this.setup_tip = function () {
        this.ui.setup.skygqbox();
        var dom = this.ui.setup.html("控件加载中，如果未加载成功请先<a name='w-exe'>安装控件</a>");
        var lnk = dom.find('a[name="w-exe"]');
        lnk.attr("href", this.Config["ExePath"]);
    };
    this.need_update = function ()
    {
        this.ui.setup.skygqbox();
        var dom = this.ui.setup.html("发现新版本，请<a name='w-exe' href='#'>更新</a>");
        var lnk = dom.find('a[name="w-exe"]');
        lnk.attr("href", this.Config["ExePath"]);
    };
	this.setupTipClose = function ()
	{
	    var dom = this.imgMsg.html("图片上传中......");
	    this.imgPercent.show();
	    this.imgIco.show();
        this.CloseDialogPaste();
        this.setuped = true;
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
        if (!this.chrome45) acx += '<embed name="' + this.ffPasterName + '" type="' + this.Config["XpiType"] + '" pluginspage="' + this.Config["XpiPath"] + '" width="1" height="1"/>';
        //Word解析组件
        acx += ' <object name="' + this.iePasterName + '" classid="clsid:' + this.Config["ClsidParser"] + '"';
	    acx += ' codebase="' + this.Config["CabPath"] + '#version=' + this.Config["Version"] + '"';
	    acx += ' width="1" height="1" ></object>';
	    if (this.edge) acx = '';
	    //单张图片上传窗口
	    acx += '<div name="imgPasterDlg" class="panel-paster" style="display:none;">';
	    acx += '<img name="ico" id="infIco" alt="进度图标" src="' + this.Config["IcoUploader"] + '" /><span name="msg">图片上传中...</span><span name="percent">10%</span>';
        acx += '</div>';
        //安装提示
        acx += '<div name="ui-setup" class="panel-paster panel-setup"></div>';
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
        this.ffPaster       = dom.find('embed[name="' + this.ffPasterName + '"]').get(0);
        this.ieParser       = dom.find('object[name="' + this.iePasterName + '"]').get(0);
	    this.line           = dom.find('div[name="line"]');
	    this.fileItem       = dom.find('div[name="fileItem"]');
	    this.filesPanel     = dom.find('div[name="filesPanel"]');
	    this.imgUploaderDlg = dom.find('div[name="filesPanel"]');
	    this.imgPasterDlg   = dom.find('div[name="imgPasterDlg"]');
	    this.imgIco         = this.imgPasterDlg.find('img[name="ico"]');
	    this.imgMsg         = this.imgPasterDlg.find('span[name="msg"]');
	    this.imgPercent     = this.imgPasterDlg.find('span[name="percent"]');
        this.ui.single      = dom.find('div[name="imgPasterDlg"]');
        this.ui.setup       = dom.find('div[name="ui-setup"]');

	    this.init();
	};

	this.LoadTo = function (oid)
	{
	    var dom             = $("#" + oid).append(this.GetHtml());
        this.ffPaster       = dom.find('embed[name="' + this.ffPasterName + '"]').get(0);
        this.ieParser       = dom.find('object[name="' + this.iePasterName + '"]').get(0);
	    this.line           = dom.find('div[name="line"]');
	    this.fileItem       = dom.find('div[name="fileItem"]');
	    this.filesPanel     = dom.find('div[name="filesPanel"]');
	    this.imgUploaderDlg = dom.find('div[name="filesPanel"]');
        this.imgPasterDlg   = dom.find('div[name="imgPasterDlg"]');
        this.ui.single      = dom.find('div[name="imgPasterDlg"]');
	    this.imgIco         = this.imgPasterDlg.find('img[name="ico"]');
	    this.imgMsg         = this.imgPasterDlg.find('span[name="msg"]');
	    this.imgPercent     = this.imgPasterDlg.find('span[name="percent"]');
        this.ui.setup       = dom.find('div[name="ui-setup"]');

	    this.init();
	};

    //在文档加载完毕后调用
	this.init = function ()
	{
	    $(function ()
        {
            if (!_this.edge)
            {
                _this.parter = _this.ffPaster;
                if (_this.ie) _this.parter = _this.ieParser;
                _this.parter.recvMessage = _this.recvMessage;
            }
            //_this.setup_tip();
            if (_this.edge) {
                _this.edgeApp.runChr();
            }
            else { _this.app.init(); }
	    });
	};

    //打开图片上传对话框
	this.OpenDialogFile = function ()
	{
	    _this.imgUploaderDlg.skygqbox();
	};
	this.CloseDialogFile = function ()
	{
		$.skygqbox.hide();
	};

    //打开粘贴图片对话框
	this.OpenDialogPaste = function ()
	{
	    _this.imgPasterDlg.skygqbox();
	};
	this.CloseDialogPaste = function ()
	{
		$.skygqbox.hide();
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

        //非chrome 45才挂载事件，因为chrome 45无法立即判断剪帖板数据
	    if(!this.chrome45)this.LoadPasteEvent(edt);
	};

    //粘贴命令
	this.Paste = function (evt)
	{
	    if (!this.setuped)
        {
            this.setup_tip(); return;
	    }
	    if (!this.chrome45 && !_this.edge)
	    {
	        evt.cancel();
            this.app.paste();
	    }
	    else if (this.chrome45)
	    {
            this.app.paste();
	    }
	    else if(this.edge)
	    {
            this.app.paste();
	    }
	};

    //单击按钮粘贴
	this.PasteManual = function ()
	{
	    if (!this.setuped)
        {
            this.setup_tip(); return;
        }
        this.app.paste();
	};

    //上传网络图片
	this.UploadNetImg = function ()
	{
	    var data = this.GetEditor().getData();
        this.app.pasteAuto(data);
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
	};
	this.load_complete_edge = function (json)
	{
        _this.app.init();
    };
    this.load_complete = function (json)
    {
        var needUpdate = true;
        if (typeof (json.version) != "undefined")
        {
            this.setuped = true;
            if (json.version == this.Config.Version) {
                needUpdate = false;
            }
        }
        if (needUpdate) this.need_update();
        //else { $.skygqbox.hide(); }
    };
    this.recvMessage = function (msg)
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
        else if (json.name == "load_complete") _this.load_complete(json);
	    else if (json.name == "Queue_Complete") _this.Queue_Complete(json);
	    else if (json.name == "load_complete_edge") _this.load_complete_edge(json);
	};
}