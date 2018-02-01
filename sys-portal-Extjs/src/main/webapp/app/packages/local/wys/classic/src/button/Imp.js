/**
 * 重写Button使其可以复用，去除编写重复代码
 * 可选项：
 * 	excel
 *  xml
 *  中心库
 * @author wys
 */
Ext.define('wys.button.Imp',{
    extend : 'Ext.button.Button',
    xtype:'impBtn',
	ui : 'button-impbtn-toolbar',
    iconCls : 'fa fa-file-excel-o fa-lw',
    text:'导入数据',
    tooltip : '<span style="font-size:12px">点击进行数据导入</span>',
	menu : [
	    {text: 'excel导入',iconCls:'fa fa-file-excel-o fa-lg',handler : function(btn){
	    	var excelWin = Ext.create('Ext.window.Window',{
	    		title : btn.text,
	    		width:432,
	    		height : 87,
	    		iconCls : btn.iconCls,
	    		autoShow: true,
	    	    modal: true,
	    		maximizable:false,
	    	    closeAction:'destroy',
	    	    layout: 'fit',
	    	    autoScroll : true,
//	    	    animCollapse : true,
//	    	    animateTarget : Ext.getBody(),
	    	    border:true,
	    	    closeToolText:'点击关闭窗口',
	    	    items : [{
	    	    	xtype: 'filefield',
	    	        name: 'excelFile',
	    	        fieldLabel: 'excel文件',
	    	        labelWidth: 80,
	    	        msgTarget: 'side',
	    	        allowBlank: false,
	    	        anchor: '100%',
	    	        buttonText : '请选择',
	    	        emptyText: '请选择要导入的excel文件...'
	    	    }]
	    	});
	    	excelWin.show();
	    }},'-',
	    {text: 'xml导入',iconCls : 'fa fa-file-code-o fa-lg',handler:function(btn){
	    	var xmlWin = Ext.create('Ext.window.Window',{
	    		title : btn.text,
	    		width:432,
	    		height : 87,
	    		iconCls : btn.iconCls,
	    		autoShow: true,
	    	    modal: true,
	    		maximizable:false,
	    	    closeAction:'destroy',
	    	    layout: 'fit',
	    	    autoScroll : true,
//	    	    animCollapse : true,
//	    	    animateTarget : Ext.getBody(),
	    	    border:true,
	    	    closeToolText:'点击关闭窗口',
	    	    items : [{
	    	    	xtype: 'filefield',
	    	        name: 'xmlFile',
	    	        fieldLabel: 'xml文件',
	    	        labelWidth: 80,
	    	        allowBlank: false,
	    	        anchor: '100%',
	    	        //请选择要导入的xml文件...
	    	        buttonText: '请选择'
	    	    }]
	    	});
	    	xmlWin.show();
	    }},'-',
	    {text: '中心库导入',iconCls : 'fa fa-align-center fa-lg',handler:function(btn){
	    	
	    }}
	]
});