/**
 *
 * <p> Title:SearchField.js BY EXTJS V6.0 (src/main/newwebapp/packages/local/wys/modern/src/field)</p>
 * <p> Description:  移动端搜索输入框</p>
 * <p> Copyright: Copyright (c) 2017 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
Ext.define('wys.field.SearchField',{
	extend : 'Ext.field.Text',
	xtype: 'searchField',
	alternateClassName: 'wys.field.searchField',
	requires: [
	  'Ext.Panel',
	  'Ext.picker.Picker',
	  'Ext.data.Store',
	  'Ext.data.StoreManager',
	  'Ext.dataview.List'
	]
});