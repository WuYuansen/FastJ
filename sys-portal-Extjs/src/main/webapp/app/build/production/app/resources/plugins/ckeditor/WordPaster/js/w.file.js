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