/**
 * tab右键关闭
 */
Ext.define('wys.plugs.TabClose', {
    extend: 'Ext.plugin.Abstract',
    alias: 'plugin.tabclosemenu',
    mixins: {
        observable: 'Ext.util.Observable'
    },
    closeTabText: '关闭当前标签',
    showCloseOthers: true,
    closeOthersTabsText: '关闭其他标签',
    showCloseAll: true,
    closeAllTabsText: '关闭所有标签',
    extraItemsHead: null,
    extraItemsTail: null,
    //public
    constructor: function (config) {
        this.callParent([config]);
        this.mixins.observable.constructor.call(this, config);
    },
    init : function(tabpanel){
        this.tabPanel = tabpanel;
        this.tabBar = tabpanel.down("tabbar");
        this.mon(this.tabPanel, {
            scope: this,
            afterlayout: this.onAfterLayout,
            single: true
        });
    },

    onAfterLayout: function() {
        this.mon(this.tabBar.el, {
            scope: this,
            contextmenu: this.onContextMenu,
            delegate: '.x-tab'
        });
    },

    destroy : function(){
        this.callParent();
        Ext.destroy(this.menu);
    },

    /**
     * @private
     */
    onContextMenu : function(event, target){
        var me = this,
            menu = me.createMenu(),
            disableAll = true,
            disableOthers = true,
            tab = me.tabBar.getChildByElement(target),
            index = me.tabBar.items.indexOf(tab);

        me.item = me.tabPanel.getComponent(index);
        menu.child('#close').setDisabled(!me.item.closable);

        if (me.showCloseAll || me.showCloseOthers) {
            me.tabPanel.items.each(function(item) {
                if (item.closable) {
                    disableAll = false;
                    if (item !== me.item) {
                        disableOthers = false;
                        return false;
                    }
                }
                return true;
            });

            if (me.showCloseAll) {
                menu.child('#closeAll').setDisabled(disableAll);
            }

            if (me.showCloseOthers) {
                menu.child('#closeOthers').setDisabled(disableOthers);
            }
        }

        event.preventDefault();
        me.fireEvent('beforemenu', menu, me.item, me);

        menu.showAt(event.getXY());
    },

    createMenu : function() {
        var me = this;

        if (!me.menu) {
            var items = [{
                itemId: 'close',
                text: me.closeTabText,
                iconCls : 'fa fa-close fa-fw',
                scope: me,
                handler: me.onClose
            }];

            if (me.showCloseAll || me.showCloseOthers) {
                items.push('-');
            }

            if (me.showCloseOthers) {
                items.push({
                    itemId: 'closeOthers',
                    iconCls : 'fa fa-share-alt fa-fw',
                    text: me.closeOthersTabsText,
                    scope: me,
                    handler: me.onCloseOthers
                });
            }

            if (me.showCloseAll) {
                items.push({
                    itemId: 'closeAll',
                    text: me.closeAllTabsText,
                    scope: me,
                    iconCls : 'fa fa-reply-all fa-fw',
                    handler: me.onCloseAll
                });
            }

            if (me.extraItemsHead) {
                items = me.extraItemsHead.concat(items);
            }

            if (me.extraItemsTail) {
                items = items.concat(me.extraItemsTail);
            }

            me.menu = Ext.create('Ext.menu.Menu', {
                items: items,
                listeners: {
                    hide: me.onHideMenu,
                    scope: me
                }
            });
        }

        return me.menu;
    },

    onHideMenu: function () {
        var me = this;
        me.fireEvent('aftermenu', me.menu, me);
    },

    onClose : function(){
        this.tabPanel.remove(this.item);
    },

    onCloseOthers : function(){
        this.doClose(true);
    },

    onCloseAll : function(){
        this.doClose(false);
    },

    doClose : function(excludeActive){
        var items = [];

        this.tabPanel.items.each(function(item){
            if(item.closable){
                if(!excludeActive || item !== this.item){
                    items.push(item);
                }
            }
        }, this);

        Ext.suspendLayouts();
        Ext.Array.forEach(items, function(item){
            this.tabPanel.remove(item);
        }, this);
        Ext.resumeLayouts(true);
    }
});