/**
 * 
 * <p> Title:Jsqx EXTJS MODEL</p>
 * <p> Description:  角色权限表</p>
 * <p> Copyright: Copyright (c) 2013 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
Ext.define('app.model.sys.RoleRight',{
	extend : 'Ext.data.Model',
	idProperty : 'jsqxid',
	fields : [
		{name:"jsqxid", mapping:'jsqxid',type:'int'}, // 对应java数据类型：Long  此字段备注:角色权限ID
		{name:"jsid", mapping:'jsid',type:'int'}, // 对应java数据类型：Long  此字段备注:角色ID
		{name:"qxid", mapping:'qxid',type:'int'}, // 对应java数据类型：Long  此字段备注:权限ID
		{name:"bz", mapping:'bz',type:'string'}, // 对应java数据类型：String  此字段备注:备注
		{name:"xgry", mapping:'xgry',type:'string'}, // 对应java数据类型：String  此字段备注:修改人员
		{name:"xgrq", mapping:'xgrq',type:'date'} // 对应java数据类型：java.util.Date  此字段备注:修改日期
	]
});