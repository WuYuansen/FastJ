/**
 * 
 * <p> Title:Yhjs EXTJS MODEL</p>
 * <p> Description:  用户角色表</p>
 * <p> Copyright: Copyright (c) 2013 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
Ext.define('app.model.sys.UserRole',{
	extend : 'Ext.data.Model',
	idProperty : 'zdbh',
	fields : [
		{name:"zdbh", mapping:'zdbh',type:'int'}, // 对应java数据类型：Long  此字段备注:自动编码
		{name:"jsbh", mapping:'jsbh',type:'int'}, // 对应java数据类型：Long  此字段备注:角色编号
		{name:"yhbh", mapping:'yhbh',type:'int'}, // 对应java数据类型：Long  此字段备注:用户编号
		{name:"xgry", mapping:'xgry',type:'string'}, // 对应java数据类型：String  此字段备注:修改人员
		{name:"xgrq", mapping:'xgrq',type:'date'}, // 对应java数据类型：java.util.Date  此字段备注:修改日期
		{name:"bz", mapping:'bz',type:'string'} // 对应java数据类型：String  此字段备注:备注
	]
});