Ext.define('app.store.sys.Logs',{
	extend: 'Ext.data.Store',
	requires:['app.util.Constants'],	//继承自那个类
	alias: 'store.logsStore',	//别名
	storeId : 'logsStore',
	model: 'app.model.sys.monitor.Logs',	//数据对于的模型层
	autoLoad : true,	//是否自动加载
    autoSync : false,
    pageSize : WY.local.lang.common.pagingtoolbar.pageSize,	//设置每页加载数据条数 默认25
    sorters: {	//排序
        direction: 'DESC',	//排序方式
        property: 'operationdate'	//排序字段
    },
	 proxy: {
	        type: 'ajax',	//请求类型
	        actionMethods: {  
	            read: 'POST'  
	        },

	        //headers: {'Content-Type': "text/plain" },//application/x-www-form-urlencoded
	        api : {
	        	read: constants.url.sys.logs.findByPaging
	        },
	        reader: {
	            type: 'json',	//返回数据类型
	            rootProperty: 'list',	//展示数据根节点
	            successProperty : 'success',	//数据加载成功失败表示
	            totalProperty : 'total'	//返回书记总条数标识
	        },
	        writer: {
	        	 type: 'json',
	        	 successProperty : 'success'
	        },
	        listeners: {
	            exception: function(proxy, response, operation){
	                Ext.MessageBox.show({
	                    title: '系统提示',
	                    msg: operation.getError(),
	                    icon: Ext.MessageBox.ERROR,
	                    buttons: Ext.Msg.OK
	                });
	            }
	        } 
	    }
});