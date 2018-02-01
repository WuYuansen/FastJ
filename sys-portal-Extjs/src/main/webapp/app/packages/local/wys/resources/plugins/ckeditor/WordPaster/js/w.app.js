var WordPasterApp = {
    entID: "Uploader7Event"
    , ins: null
    , check: function ()//检查插件是否已安装
    {
        return null != this.GetVersion();
    }
    , supportFF: function () {
        var mimetype = navigator.mimeTypes;
        if (typeof mimetype == "object" && mimetype.length) {
            for (var i = 0; i < mimetype.length; i++)
            {
                var enabled = mimetype[i].type == this.ins.Config.XpiType;
                if (!enabled) enabled = mimetype[i].type == this.ins.Config.XpiType.toLowerCase();
                if (enabled) return mimetype[i].enabledPlugin;
            }
        }
        else {
            mimetype = [this.ins.Config.XpiType];
        }
        if (mimetype) {
            return mimetype.enabledPlugin;
        }
        return false;
    }
    , NeedUpdate: function () {
        return this.GetVersion() != this.Config["Version"];
    }
    , getHtmlIE: function () {
        var acx = '<div style="display: none">';
        //Word解析组件
        acx += ' <object id="objWordParser" classid="clsid:' + this.config["ClsidParser"] + '"';
        acx += ' codebase="' + this.config["CabPath"] + '#version=' + this.config["Version"] + '"';
        acx += ' width="1" height="1" ></object>';
        acx += '</div>';
        return acx;}
    , getHtmlFF: function () {
        var html = '<embed type="' + this.config["XpiType"] + '" pluginspage="' + this.config["XpiPath"] + '" width="1" height="1" id="objWordPaster"/>';
        return html; }
    , getHtmlChr: function () {
        var html = '<embed type="' + this.config["CrxType"] + '" pluginspage="' + this.config["CrxPath"] + '" width="1" height="1" id="objWordPaster"/>';
        return html;
    }
    , setUpChr: function () {
		    document.write('<iframe style="display:none;" src="' + this.config["XpiPath"] + '"></iframe>');
    }
    , init: function () {
        var param = { name: "init", config: this.ins.Config,fields:this.ins.Fields };
        this.postMessage(param);
    }
    , exit: function () {
        var par = { name: 'exit' };
        var evt = document.createEvent("CustomEvent");
        evt.initCustomEvent(this.entID, true, false, par);
        document.dispatchEvent(evt);
    }
    , exitEvent: function () {
        var obj = this;
        $(window).bind("beforeunload", function () { obj.exit(); });
    }
    , paste: function () {
        var param = { name: "paste"};
        this.postMessage(param);
    }
    , pasteAuto: function (data) {
        var param = { name: "pasteAuto",html:data};
        this.postMessage(param);
    }
    , postMessage: function (json) {
        try {
            this.ins.parter.postMessage(JSON.stringify(json));
        }
        catch (e) { console.log("调用postMessage失败，请检查控件是否安装成功"); }
    }
    , postMessageEdge: function (json) {
        try {
            this.ins.edgeApp.send(JSON.stringify(json));
        }
        catch (e) { console.log("调用postMessage失败，请检查控件是否安装成功"); }
    }
};