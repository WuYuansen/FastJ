/**
 * 
 * <p> Title:Zd EXTJS MODEL</p>
 * <p> Description:  字典表</p>
 * <p> Copyright: Copyright (c) 2013 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
Ext.define('app.model.sys.Dict',{
	extend : 'Ext.data.Model',
	idProperty : 'id',
	fields : [
		{name:"id", mapping:'id',type:'int'}, // 对应java数据类型：Long  此字段备注:字典ID
		{name:"typename", mapping:'typename',type:'string'}, // 对应java数据类型：String  此字段备注:字典名字典种类名称
		{name:"key", mapping:'key',type:'string'}, // 对应java数据类型：String  此字段备注:字典键值某项字典键值编码
		{name:"keycode", mapping:'keycode',type:'string'}, // 对应java数据类型：String  此字段备注:字典键值代码
		{name:"value", mapping:'value',type:'string'}, // 对应java数据类型：String  此字段备注:字典值对应键值得中文名
		{name:"parent", mapping:'parent',type:'int'}, // 对应java数据类型：Long  此字段备注:父级
		{name:"state", mapping:'state',type:'int'}, // 对应java数据类型：Long  此字段备注:删除标记1 未删除2  删除
		{name:"ismodify", mapping:'ismodify',type:'string'}, // 对应java数据类型：String  此字段备注:前台是否可以维护
		{name:"order", mapping:'order',type:'int'}, // 对应java数据类型：Long  此字段备注:排序
		{name:"remarks", mapping:'remarks',type:'string'}, // 对应java数据类型：String  此字段备注:备注
		{name:"type", mapping:'type',type:'string'} // 对应java数据类型：String  此字段备注:类型
	]
});