/**
 *
 * <p> Title:CodeEditorWin.js BY EXTJS V6.0 (src/main/newwebapp/classic/overrides/window)</p>
 * <p> Description:  TODO</p>
 * <p> Copyright: Copyright (c) 2017 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
Ext.define('wys.window.CodeEditorWin',{
	extend : 'Ext.window.Window',
	xtype : 'codeEditorWin',
	requires:[
      'Ext.window.Window',
      'wys.basic.specialGridpanel'
    ],
	closeAction: "destroy",
    initComponent: function() {
    	var me = this;
    	Ext.apply(me,{
    		autoShow: true,
    		title : me.title || '添加代码',
    		iconCls : me.iconCls || 'fa fa-code fa-lg',
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
    	    width : me.width || Ext.getBody().getSize().width-100,
    	    height : me.height || Ext.getBody().getSize().height-100,
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
    	    		editor.on('changes',function(codeMirror,newValue){
    	    			me.down('textarea').setValue(codeMirror.getValue());
    	    		},this);
    	    		editor.setSize('auto',Ext.getCmp(win.down('textarea').id).getHeight()-3 + 'px');
    	    	},
    	    	close : function(win){
    	    		win.down('textarea').setValue('');
    	    	}
    	    },
    	    dockedItems : [{
	       		 xtype : 'toolbar',
	       		 hidden : me.type ==='JSON',
	       		 style : 'background:#f9f9f9;border-bottom-color:#ccc !important;border-bottom-width:1px !important;',
	       		 dock :'top',
	       		 items : ['->',{text:'执行...',iconCls :'EDIT_ON',handler : function(btn){
	       			me.execute(btn);
	       		 }}]
      	 	},{
	       		 xtype : 'toolbar',
	       		 hidden : me.type ==='SQL',
	       		 style : 'background:#f9f9f9;border-bottom-color:#ccc !important;border-bottom-width:1px !important;',
	       		 dock :'top',
	       		 items : ['->',{text:'调试...',iconCls :'DEBUGGER',handler : function(btn){
	       			me.debuggerJSON(btn);
	       		 }}]
      	 	}],
    	    items : [{
    	    	xtype : 'textarea',
    	    	name : 'sourceCode'
    	    }]
    	});
    	me.callParent();
    },
    execute : function(btn){
    	var me = this,
    		textareaValue = this.down('textarea').getValue(),
    		executeSQL = textareaValue;
    	util.ajax({
    		url : app.base + '/stat/resolveSQLToFields.do',
    		params : {sql : executeSQL},
    		ok : function(resp){
    			if(!resp.success){
    				util.err(resp.msg_info);
    			}else{
    				var url = [[app.base + '/stat/resolveSQLToFields.do'],[app.base + '/stat/queryDatasBySql.do']];
    				Ext.create('Ext.window.Window',{
    		    		title : '查询结果',
    		    		width : me.width || Ext.getBody().getSize().width-100,
    		    	    height : me.height || Ext.getBody().getSize().height-100,
    		    	    items : [{
    		    	    	xtype : 'specialGridPanel',
    		    	    	url : url,
    		    	    	params : {sql : executeSQL}
    		    	    }]
    		    	}).show();
    			}
    		}
    	});
    	return;
    },
    debuggerJSON : function(btn){
    	var me = this;
			textareaValue = this.down('textarea').getValue(),
			executeJSON = textareaValue;
    }
});