/**
 * 
 * <p> Title:Js EXTJS MODEL</p>
 * <p> Description:  角色表</p>
 * <p> Copyright: Copyright (c) 2013 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
Ext.define('app.model.sys.Role',{
	extend : 'Ext.data.Model',
	idProperty : 'id',//设置您的主键信息
	fields : [
		{name:"id", mapping:'id',type:'int'}, // 对应java数据类型：Long  此字段备注:角色ID
		{name:"rolename", mapping:'rolename',type:'string'}, // 对应java数据类型：String  此字段备注:角色名称
		{name:"remarks", mapping:'remarks',type:'string'}, // 对应java数据类型：String  此字段备注:备注
		{name:"modifyuser", mapping:'modifyuser',type:'string'}, // 对应java数据类型：String  此字段备注:修改人员
		{name:"modifydate", mapping:'modifydate',type:'date'} // 对应java数据类型：java.util.Date  此字段备注:修改日期
	]
});