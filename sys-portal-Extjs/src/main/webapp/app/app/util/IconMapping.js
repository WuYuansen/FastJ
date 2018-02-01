/**
 * 图标映射类
 * 
 * @author wys
 * */
Ext.define('app.util.IconMapping',{
	singleton : true
},function(){
	iconPath = '';
	var me = this,
		iconPath = me.iconPath;
	Ext.apply(me,{
		add 				: iconPath + 'add.png', // 新增
		edit				: iconPath + 'page_edit.png', // 编辑
		del					: iconPath + 'delete.png'  // 删除
	});
	window.iconMapping = me;
});