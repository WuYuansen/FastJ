/**
 *
 * <p> Title:View.js BY EXTJS V6.0 (src/main/newwebapp/modern/src/plugs/ux/navigation)</p>
 * <p> Description:  TODO</p>
 * <p> Copyright: Copyright (c) 2017 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
Ext.define('wys.navigation.View',{
	extend: 'Ext.navigation.View',
    alternateClassName: 'ux.NavigationView',
    xtype: 'uxNavigationView',
    requires: ['wys.navigation.Bar'],
    config: {
        defaultBackButtonText: '返回'
    },
    /**
     * @private
     * 在这里用了自定义的导航栏
     */
    applyNavigationBar: function (config) {
        var me = this;
        if (!config) {
            config = {
                hidden: true,
                docked: 'top'
            };
        }

        // Call the getter for items on this view to insure that they will be 
        // available (via innerItems) for the navigationBar created below. 
        me.getItems();

        if (config.title) {
            delete config.title;
            //<debug> 
            Ext.Logger.warn('ux.navigation.View: The " navigationBar " configuration does not accept a "title " property. You set the title of the navigationBar by giving this navigation view"s children a "title"property.');
            //</debug> 
        }

        config.view = me;
        config.useTitleForBackButtonText = me.getUseTitleForBackButtonText();
        // Blackberry specific nav setup where title is on the top title bar and the bottom toolbar is used for buttons and BACK 
        if (config.splitNavigation) {
            me.$titleContainer = me.add({
                docked: 'top',
                xtype: 'titlebar',
                ui: 'light',
                title: me.$currentTitle || ''
            });

            var containerConfig = (config.splitNavigation === true) ? {} : config.splitNavigation;

            me.$backButtonContainer = me.add({
                xtype: 'toolbar',
                docked: 'bottom',
                hidden: true
            });

            // Any item that is added to the BackButtonContainer should be monitored for visibility 
            // this will allow the toolbar to be hidden when no items exist in it. 
            me.$backButtonContainer.on({
                scope: me,
                add: me.onBackButtonContainerAdd,
                remove: me.onBackButtonContainerRemove
            });

            me.$backButton = me.$backButtonContainer.add({
                xtype: 'button',
                text: '返回',
                hidden: true,
                ui: 'back'
            });

            // Default config items go into the bottom bar 
            if (config.items) {
                me.$backButtonContainer.add(config.items);
            }

            // If the user provided items and splitNav items, default items go into the bottom bar, split nav items go into the top 
            if (containerConfig.items) {
                me.$titleContainer.add(containerConfig.items);
            }

            me.$backButton.on({
                scope: me,
                tap: me.onBackButtonTap
            });

            config = {
                hidden: true,
                docked: 'top'
            };
        }
//        return this.getNavigationBar();
        return Ext.factory(config,wys.navigation.Bar, this.getNavigationBar());
    }
});