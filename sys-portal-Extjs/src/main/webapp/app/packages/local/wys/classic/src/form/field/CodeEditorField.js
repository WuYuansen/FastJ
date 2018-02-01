/**
 *
 * <p> Title:CodeEditorField.js BY EXTJS V6.0 (src/main/newwebapp/classic/overrides/form/field)</p>
 * <p> Description:  代码编辑器</p>
 * <p> Copyright: Copyright (c) 2017 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
Ext.define('wys.form.field.CodeEditorField',{
	extend: 'Ext.form.field.Text',
	alias: 'widget.codeEditorField',
	requires: [
       'Ext.form.trigger.Component'
    ],
    emptyText:'请输入',
    type : 'text/javascript', //类型
    triggers: {
        clear: {
            weight: 0,
            cls: Ext.baseCSSPrefix + 'form-clear-trigger',
            hidden: true,
            handler: 'onClearClick',
            scope: 'this'
        },
        search: {
            weight: 1,
            cls :  Ext.baseCSSPrefix + 'fa fa-code fa-lg',
            handler: 'onDotClick',
            scope: 'this'
        }
    },
    hasSearch : false,
    paramName : 'query',
	initComponent: function () {
		var me = this;
	    me.callParent(arguments);
	},
	onClearClick : function(){ /* 清除点 */
		var me = this;
	        me.setValue('');
        me.getTrigger('clear').hide();
	},
	onDotClick : function(){	/* 加入点 */
		var me = this,
        value = me.getValue();
		me.getTrigger('clear').show();
		Ext.create('Ext.window.Window',{
			autoShow: true,
			title : '添加代码',
			iconCls : 'fa fa-code fa-lg',
		    requires:[
		      'Ext.window.Window'
		    ],
		    modal: true,
			maximizable:true,
		    closeAction:'hide',
		    layout: 'fit',
		    autoScroll : true,
		    animCollapse : true,
		    animateTarget : Ext.getBody(),
		    border:true,
		    style :'border-color: #b6babe;',
		    closeToolText:'点击关闭窗口',
		    width : Ext.getBody().getSize().width-100,
		    height : Ext.getBody().getSize().height-100,
		    listeners : {
		    	show : function(win){
		    		var editor = CodeMirror.fromTextArea(Ext.getDom(win.down('textarea').id+'-inputEl'), {
		    		    lineNumbers: true,     // 显示行数
		    			indentUnit: 4,         // 缩进单位为4
		    			styleActiveLine: true, // 当前行背景高亮
		    			matchBrackets: true,   // 括号匹配
		    			mode: me.type,     // HMTL混合模式
		    			lineWrapping: true,    // 自动换行
		    			theme : 'vibrant-ink'
		    		  });
	    		   editor.setSize('auto',Ext.getCmp(win.down('textarea').id).getHeight()-3 + 'px');
		    	},
		    	close : function(win){
		    		win.down('textarea').setValue('');
		    	}
		    },
		    items : [{
		    	xtype : 'textarea'
		    }]
		}).show();
	}
})