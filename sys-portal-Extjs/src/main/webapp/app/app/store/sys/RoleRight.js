/**
 * 
 * <p> Title:Jsqx EXTJS STORE</p>
 * <p> Description:  角色权限表</p>
 * <p> Copyright: Copyright (c) 2013 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
 Ext.define('app.store.sys.RoleRight',{
	extend: 'Ext.data.Store',
	requires:['app.util.Constants'],	//继承自那个类
    model: 'app.model.sys.RoleRight', 
    autoSync : false,
    autoLoad: false,
    alias: 'store.roleRight',	//别名
    storeId : 'roleRightStoreId',
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
        api : {
        	read: constants.url.sys.roleRight.findByPaging,
            create: constants.url.sys.roleRight.save,
            update: constants.url.sys.roleRight.update,
            destroy: constants.url.sys.roleRight.deleteById
        },
        reader: {
            type: 'json',	//返回数据类型
            rootProperty: 'extResultUtil.list',	//展示数据根节点
            successProperty : 'extResultUtil.success',	//数据加载成功失败表示
            totalProperty : 'extResultUtil.total'	//返回书记总条数标识
        },
        writer: {
        	 type: 'json'
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
    },
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