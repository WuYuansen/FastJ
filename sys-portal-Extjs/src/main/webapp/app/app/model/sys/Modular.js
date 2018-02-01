Ext.define('app.model.sys.Modular',{
	extend : 'Ext.data.Model',
	idProperty : 'id',
	field:[
		'id',//   模块ID
		'modularcode',//   模块编码
		{name:'name',mapping:'name',type:'string'},//   模块名称
		'modularen',//   模块拼音
		{name:'modularright',type:'string'},//   权限字 表示模块有那些权限，权限之间由逗号隔开
		'showname',//   显示名称
		'parent_',//   父类
		'children_',//   子类
		'extendclass',//   延伸类
		'extendtype',//   延伸码
		'modifyuser',//   修改人员
		'modifydate',
		'remarks',//   备注
		'order'//   排序
   ]
});