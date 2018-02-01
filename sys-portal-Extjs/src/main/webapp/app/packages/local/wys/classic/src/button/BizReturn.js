/**
 *
 * <p> Title:BizReturn.js BY EXTJS V6.0 (src/main/newwebapp/classic/overrides/button)</p>
 * <p> Description:  退件</p>
 * <p> Copyright: Copyright (c) 2017 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
Ext.define('wys.button.BizReturn',{
    extend : 'Ext.button.Button',
    xtype:'bizReturnBtn',
	ui : 'button-biaReturn-toolbar',
    iconCls : 'fa fa-file-excel-o fa-lw',
    text:'退件',
    tooltip : '<span style="font-size:12px"> 点击退办</span>'
});