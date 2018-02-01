Ext.define('wys.form.HtmlEditor.Plugins',{
	extend: 'Ext.form.field.TextArea',
    alias: 'widget.myHtmlEditor',
    constructor : function() {
        this.callParent(arguments);//必须先构造父类对象
        Ext.Logger.info('初始化WORD文本转换器');
    	app.pasterMgr = new WordPasterManager();
    	app.pasterMgr.Load();//加载控件
    	Ext.Logger.info('初始化WORD文本转换器结束');
    	Ext.Logger.info('初始化C-LODOP打印控件');
    	app.LODOP = getLodop(document.getElementById('SynCardOcx1'));
    	Ext.Logger.info('初始化C-LODOP打印控件完成,'+app.LODOP);
    },
    editor:null, 
    border:0, 
    bodyBorder:0,
    style : 'border-width:0px;',
    initComponent: function () {
    	this.callParent(arguments);
        this.on("render", function(){
            Ext.apply(this.CKConfig, {
               height : this.getHeight(),
               width : this.getWidth(),
               title : this.title,
               baseFloatZIndex:999999,
               toolbarCanCollapse : true 
            });
            this.editor = CKEDITOR.replace(this.inputEl.id, this.CKConfig);
            this.editor.title = this.title;
            this.editor.border = false;
            this.editor.name = this.name;//把配置中的name属性赋值给CKEditor的name属性
            this.editor.setData(this.value); //设置值
//            var editorHeight = CKEDITOR.document.getById(this.name).getParent().$.offsetHeight;
            this.editor.config.height = parseInt(this.getHeight());
            this.editor.on("instanceReady", function(){
                this.fireEvent("instanceReady", this, this.editor);//触发instanceReady事件
                app.pasterMgr.SetEditor(this.editor);
            }, this);
        }, this);
    },
    onRender: function (ct, position) {
        if (!this.el) {
            this.defaultAutoCreate = {
                tag: 'textarea',
                autocomplete: 'off'
            };
        }
        this.callParent(arguments);
    },
    setValue: function (value) {
    	var self = this;
        if (this.editor) {
            this.editor.setData(value);
        }
        this.callParent(arguments);
    },
    getRawValue: function () {//要覆盖getRawValue方法，否则会取不到值
        if (this.editor) {
            return this.editor.getData();
        } else {
            return ''
        }
    },
    getValue: function () {
        return this.getRawValue();
    }
});