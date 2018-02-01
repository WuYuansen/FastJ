/**
 *
 * <p> Title:Pickup.js BY EXTJS V6.0 (src/main/newwebapp/classic/overrides/button)</p>
 * <p> Description:  取件</p>
 * <p> Copyright: Copyright (c) 2017 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
Ext.define('wys.button.Pickup',{
    extend : 'Ext.button.Button',
    xtype:'pickupBtn',
	ui : 'button-pickup-toolbar',
    iconCls : 'fa fa-file-excel-o fa-lw',
    text:'取件',
    tooltip : '<span style="font-size:12px"> 点击获取办理要件</span>'
});