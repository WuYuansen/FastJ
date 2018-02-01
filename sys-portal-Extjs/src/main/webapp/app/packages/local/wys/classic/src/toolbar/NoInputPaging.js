/**
 *
 * <p> Title:NoInputPaging.js BY EXTJS V6.0 (src/main/newwebapp/classic/overrides/toolbar)</p>
 * <p> Description:  TODO</p>
 * <p> Copyright: Copyright (c) 2017 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
Ext.define('wys.toolbar.NoInputPaging',{
	extend: 'Ext.toolbar.Paging',
    xtype: 'toolbar-noinputpaging',
    displayInfo: false,
    isShow:false,
    //点击导航按钮
    onClick: function (obj) {
        var me = this;
        var updateNoticeNavItems = me.down("[reference= 'updateNoticeNav']").items.items;
        Ext.each(updateNoticeNavItems, function (item) {
            item.setPressed(false);
        })
        obj.setPressed(true);
        obj.up("window-updateNotice").getViewModel().set("currentUpdateNotice", obj.initialConfig.data.noticeDetail);
        obj.up("window-updateNotice").getViewModel().set("updateDate", Ext.util.Format.date(obj.initialConfig.data.publishDate, 'Y-m-d'));
    },
    setStore: function (data) {
        var me = this;
        me.bindStore(data);
        me.updateNavItems(data);
    },
    /**
    * Gets the standard paging items in the toolbar
    * @private
    */
    getPagingItems: function () {
        var me = this;
        return [{
            itemId: 'prev',
            tooltip: me.prevText,
            overflowText: me.prevText,
            iconCls: Ext.baseCSSPrefix + 'tbar-page-prev',
            disabled: true,
            handler: me.movePrevious,
            scope: me
        }, {
            xtype: 'fieldcontainer',
            layout: 'hbox',
            reference: 'updateNoticeNav',
            defaults: {
                xtype: 'button',
                width: 20,
                height: 20,
                ui: 'toggleCricleButton',
                margin: '0 5',
                listeners: {
                    click: Ext.bind(me.onClick, me)
                }
            },
            items: []//需要从model载入的按钮
        }, {
            itemId: 'next',
            tooltip: me.nextText,
            overflowText: me.nextText,
            iconCls: Ext.baseCSSPrefix + 'tbar-page-next',
            disabled: true,
            handler: me.moveNext,
            scope: me
        }];
    },
    //上一页
    movePrevious: function () {
        var me = this,
            store = me.store,
            prev = store.currentPage - 1;
        if (prev > 0) {
            if (me.fireEvent('beforechange', me, prev) !== false) {
                store.previousPage();
                //更新导航按钮
                me.updateNavItems(store);
                return true;
            }
        }
        return false;
    },
    //下一页
    moveNext: function () {
        var me = this,
            store = me.store,
            total = me.getPageData().pageCount,
            next = store.currentPage + 1;
        if (next <= total) {
            if (me.fireEvent('beforechange', me, next) !== false) {
                store.nextPage();
                //更新导航按钮
                me.updateNavItems(store);
                return true;
            }
        }
        return false;
    },
    //更新导航按钮
    updateNavItems: function (data) {
        var me = this,
            updateNoticeNavItems = [],
            pageData;
        var updateNoticeNav = me.down("[reference=updateNoticeNav]");

        updateNoticeNav.removeAll();
        pageData = me.getPageData();

        Ext.each(data.config.data, function (item, index, dataSelf) {
            if (index + 1 > pageData.fromRecord - 1 && index + 1 < pageData.toRecord + 1) {
                updateNoticeNavItems.push({
                    text: index + 1,
                    data: item
                })
            }
        })
        updateNoticeNav.add(updateNoticeNavItems);
        if(updateNoticeNav.items.length>0){
            updateNoticeNav.items.items[0].fireEvent("click", updateNoticeNav.items.items[0])
        }
    },
    initComponent: function () {
        var me = this, pagingItems;
        pagingItems = me.getPagingItems();
        me.callParent();
    }
});