/**
 * 对系统View层进行简单组装，去除重复写不必要的代码
 */
Ext.define('wys.basic.BaseView',{
	extend : 'Ext.grid.Panel',
	xtype : 'baseView',
	requires:[],
	border : 1,
	loadMask : true,
	minHeight : 100,
	enableColumnHide:true,
	border:false,
    bodyBorder:false,
	loadMask:
    {
        msg : '正在加载数据,请稍等...'
    },
	columnLines : false,//是否显示列分割线
	viewConfig:{
		emptyText:'<div style="margin: 10px;padding: 15px;background: #f9edc0;border: 1px solid #d2a04a !important;color: black;-webkit-border-radius: 5px;-moz-border-radius: 5px;">没有找到相关记录<div>',
	    stripeRows:false,//在表格中显示斑马线
	    enableTextSelection:true, //可以复制单元格文字
		stripeRows:false,//是否隔行换色
		getRowClass:function(record,rowIndex,rowParams,store){
			if(rowIndex % 2 === 0){
				return 'x-grid-row-hight';
			}
		}
	},
	initComponent: function () {
		this.callParent(arguments);
	}
});