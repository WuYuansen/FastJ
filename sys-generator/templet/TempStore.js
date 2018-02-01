/**
 * 
 * <p> Title:${className} EXTJS STORE</p>
 * <p> Description:  ${codeName}</p>
 * <p> Copyright: Copyright (c) 2013 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
 Ext.define('${JS_PATH_store}.${className}Store',{
	extend: 'Ext.data.Store',	//继承自那个类
    model: '${JS_PATH_model}.${className}', 
    autoSync : true,
    autoLoad: false,
    alias: 'store.${className}',	//别名
    storeId : '${className}StoreId',
    autoLoad : true,	//是否自动加载
    autoSync : true,
    pageSize : 15,	//设置每页加载数据条数 默认25
    sorters: {	//排序
        direction: 'DASC',	//排序方式
        property: 'mkid'	//排序字段
    },
    proxy: {
        type: 'ajax',	//请求类型
        api : {
        	read: constants.url.sys.${className}.findByPaging,
            create: constants.url.sys.${className}.save,
            update: constants.url.sys.${className}.update,
            destroy: constants.url.sys.${className}.deleteById
        },
        reader: {
            type: 'json',	//返回数据类型
            rootProperty: 'extResultUtil.list',	//展示数据根节点
            successProperty : 'extResultUtil.success',	//数据加载成功失败表示
            totalProperty : 'extResultUtil.total'	//返回书记总条数标识
        },
        writer: {
        	 type: 'json'
//             writeAllFields: false,
//             root: 'dto'
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
	listeners:{  
       'loadexception' : function(e){  /* 数据加载异常 */
    	   Ext.MessageBox.show({
               title: '系统提示',
               msg: '数据加载异常，请联系管理员',
               icon: Ext.MessageBox.ERROR,
               buttons: Ext.Msg.OK
           });
        }  
    }
});