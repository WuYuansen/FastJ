/**
 * 
 * <p> Title:Qx EXTJS MODEL</p>
 * <p> Description:  系统权限表</p>
 * <p> Copyright: Copyright (c) 2013 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
Ext.define('app.model.sys.Right',{
	extend : 'Ext.data.Model',
	idProperty : 'id',//设置您的主键信息
	fields : [
		{name:"id", mapping:'id',type:'int'}, // 对应java数据类型：Long  此字段备注:权限ID
		{name:"modularname", mapping:'modularName',type:'string'}, // 对应java数据类型：String  此字段备注:模块名称
		{name:"childrenmodular", mapping:'childrenmodular',type:'string'}, // 对应java数据类型：String  此字段备注:子模块名称
		{name:"rightcode", mapping:'rightcode',type:'string'}, // 对应java数据类型：String  此字段备注:权限字 表示有那些权限，权限之间由逗号隔开
		{name:'rightcodes',mapping:'rightcodes',convert:function(value){
			if(typeof(value) === 'string'){
				var temp = new Array();
				temp.push(value);
				return temp;
			}else{
				return value;
			}
		}},
		{name:"rightname", mapping:'rightname',type:'string'}, // 对应java数据类型：String  此字段备注:权限名称
		{name:"sourcescode", mapping:'sourcescode',type:'string'}, // 对应java数据类型：String  此字段备注:资源对象编号
		{name:"modifyuser", mapping:'modifyuser',type:'string'}, // 对应java数据类型：String  此字段备注:修改人员
		{name:"modifydate", mapping:'modifydate',type:'date'}, // 对应java数据类型：java.util.Date  此字段备注:修改日期
		{name:"remarks", mapping:'remarks',type:'string'} // 对应java数据类型：String  此字段备注:备注
	]
});