/**
 *
 * <p> Title:Paging EXTJS MODEL</p>
 * <p> Description:  重写分页标签加入每页显示条数控制</p>
 * <p> Copyright: Copyright (c) 2017 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 * @author wys
 * @version 1.0
 */
Ext.define('wys.toolbar.Paging',{
    override : 'Ext.toolbar.Paging',
    isShow : true,
    initComponent : function() {
        var me = this;
        me.displayInfo      = true,
        me.beforePageText 	= WY.local.lang.common.pagingtoolbar['beforePageText'];
        me.displayMsg 		= WY.local.lang.common.pagingtoolbar['displayMsg'];
        me.emptyMsg 	    = WY.local.lang.common.pagingtoolbar['emptyMsg'];
        me.refreshText 	    = WY.local.lang.common.pagingtoolbar['refreshText'];
        me.firstText 		= WY.local.lang.common.pagingtoolbar['firstText'];
        me.prevText 		= WY.local.lang.common.pagingtoolbar['prevText'];
        me.nextText 		= WY.local.lang.common.pagingtoolbar['nextText'];
        me.lastText 		= WY.local.lang.common.pagingtoolbar['lastText'];
        me.items = [{
            xtype : 'combobox',
            fieldLabel : WY.local.lang.common.pagingtoolbar['DisplayPage'],
            width : 120,
            editable : false,
            hidden:!me.isShow,
            labelWidth : 60,
            store : ['10','20','25','30','50','100'],
            value : WY.local.lang.common.pagingtoolbar.pageSize,
            listeners : {
                afterrender : function(combo, eOpts) {
                    combo.setValue(WY.local.lang.common.pagingtoolbar.pageSize);
                },
                select : function(combo, records, eOpts) {
                    var ownerCt = combo.ownerCt, store = ownerCt.getStore();
                    store.pageSize = combo.getValue();
                    store.currentPage = 1;
                    ownerCt.doRefresh();
                }
            }
        },{hidden:!me.isShow,xtype:'label',style:'padding:7px 0px 0px 0px;color:#6f757b;',text:WY.local.lang.common.pagingtoolbar['strip']}/*,'-'*/];
        me.callParent();
        me.on('afterrender', function() {
            me.ownerCt.on('reconfigure', function() {
                me.bindStore(me.ownerCt.store || 'ext-empty-store', true);
            });
        });
    }
})