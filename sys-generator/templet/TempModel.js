/**
 * 
 * <p> Title:${className} EXTJS MODEL</p>
 * <p> Description:  ${codeName}</p>
 * <p> Copyright: Copyright (c) 2013 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
Ext.define('${JS_PATH_model}.${className}',{
	extend: 'app.model.Base',
	idProperty : '',//设置您的主键信息
	fields : [
		/*最后一行需要去除逗号负责IE下会报错*/
		#foreach($item in $!{columnDatas})
		{name:"$!item.columnName", mapping:'$!item.columnName',type:'$!item.dataType'}, // 对应java数据类型：$!item.dataType  此字段备注:$!item.columnComment
		#end
	]
});