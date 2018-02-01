/**
 *
 * <p> Title:API.js BY EXTJS V6.0 (src/main/newwebapp/modern/src/plugs/ux/proxy)</p>
 * <p> Description:  TODO</p>
 * <p> Copyright: Copyright (c) 2017 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
Ext.define('wys.proxy.API',{
	extend: 'Ext.data.proxy.Ajax',
    alias: 'proxy.api',
    limitParam: 'limit',
    pageParam: 'page',
    reader: {
        type: 'json',
        rootProperty: 'list',
        totalProperty: 'total',
        messageProperty: 'msg_info',
        successProperty: 'success'
        //如果服务端满足的数据不是标准的数据
        //例如没有给success字段，但是给了状态码，可以在里面写一些逻辑处理成代理想要的数据
        //transform: function (data) {
        //    console.log('服务端返回数据:', data);
        //    return data;
        //}
    },
    writer: {
        writeAllFields: true
    }
});