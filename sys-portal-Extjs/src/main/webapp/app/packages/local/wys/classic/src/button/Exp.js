/**
 * 重写Button使其可以复用，去除编写重复代码
 */
Ext.define('wys.button.Exp',{
    extend : 'Ext.button.Button',
    xtype:'expBtn',
	ui : 'button-expbtn-toolbar',
    iconCls : 'fa fa-file-excel-o fa-lw',
    text:'导出数据',
    tooltip : '<span style="font-size:12px">点击进行数据导出</span>',
    isLocalStore : false,	//是否本地数据,如果是则放弃执行SQL
    columnsStr : '',	//显示字段 fullName
    searchSQL : '',		//查询数据SQL
    tempFileName : '', 	//模版名称-所在地
    handler : function(btn){
    	if(!Ext.isEmpty(btn.columnsStr) || !Ext.isEmpty(btn.searchSQL) || !Ext.isEmpty(btn.tempFileName)){
    		util.ajax({
    			url : app.base + '/excel/download.do',
    			params : {
    				tempFileName : btn.tempFileName,
    				columns : btn.columnsStr,
    				sql : btn.searchSQL
    			},
    			ok : function(res){
    				if(res.success){
    					window.open(app.base + '/' + res.path);
    				}else{
    					util.err(WY.local.lang.common.tip.exp.downloadError);
    				}
    			}
    		});
    		
    		
//    		var url =  app.base + '/excel/download.do?tempFileName='+btn.tempFileName+'&columns='+btn.columnsStr+'&sql='+btn.searchSQL;
//    		var url =  app.base + '/download.jsp?tempFileName='+btn.tempFileName+'&columns='+btn.columnsStr+'&sql='+btn.searchSQL;
//    		window.open(url);
    	}else{
    		//不执行任何操作
    		//util.err(WY.local.lang.common.tip.exp.error);
    	}
    }
});