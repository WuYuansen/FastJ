/**
 * 
 * <p> Title:Bmxx EXTJS MODEL</p>
 * <p> Description:  部门信息</p>
 * <p> Copyright: Copyright (c) 2013 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
Ext.define('app.model.sys.Dept',{
	extend : 'Ext.data.Model',
	idProperty : 'id',
	fields : [
		{name:"id", mapping:'id',type:'int'}, // 对应java数据类型：Long  此字段备注:部门ID
		{name:"deptname", mapping:'deptname',type:'string'}, // 对应java数据类型：String  此字段备注:部门名称
		{name:"deptmanagerid", mapping:'deptmanagerid',type:'int'}, // 对应java数据类型：Long  此字段备注:部门负责人ID
		{name:"depttype", mapping:'depttype',type:'string'}, // 对应java数据类型：String  此字段备注:层级
		{name:"deptmanagername", mapping:'deptmanagername',type:'string'}, // 对应java数据类型：String  此字段备注:部门负责人
		{name:"deptremarks", mapping:'deptremarks',type:'string'}, // 对应java数据类型：String  此字段备注:部门介绍
		{name:'depttypename',mapping:'depttypename',type:'string'},
		{name:"deptsuper", mapping:'deptsuper',type:'int'}, // 对应java数据类型：Long  此字段备注:上级部门
		{name:"deptmanageridText",type:'string'}
	]
});