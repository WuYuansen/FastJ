Ext.define('app.store.sys.User',{
	extend: 'Ext.data.Store',
	requires:['app.util.Constants'],	//继承自那个类
	alias: 'store.user',	//别名
	storeId : 'userStore',
	model: 'app.model.sys.User',	//数据对于的模型层
	autoLoad : true,	//是否自动加载
    autoSync : false,
    pageSize : WY.local.lang.common.pagingtoolbar.pageSize,	//设置每页加载数据条数 默认25
    sorters: {	//排序
        direction: 'DASC',	//排序方式
        property: 'id'	//排序字段
    },
	 proxy: {
	        type: 'ajax',	//请求类型
	        actionMethods: {  
	            read: 'POST'  
	        },
	        //headers: {'Content-Type': "text/plain" },//application/x-www-form-urlencoded
	        api : {
	        	read: constants.url.sys.user.findByPaging,
	            create: constants.url.sys.user.save,
	            update: constants.url.sys.user.update,
	            destroy: constants.url.sys.user.deleteById
	        },
	        reader: {
	            type: 'json',	//返回数据类型
	            rootProperty: 'extResultUtil.list',	//展示数据根节点
	            successProperty : 'extResultUtil.success',	//数据加载成功失败表示
	            totalProperty : 'extResultUtil.total'	//返回书记总条数标识
	        },
	        writer: {
	        	 type: 'json',
	        	 successProperty : 'extResultUtil.success'
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