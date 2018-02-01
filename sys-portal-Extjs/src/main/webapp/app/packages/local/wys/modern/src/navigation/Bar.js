/**
 *
 * <p> Title:Bar.js BY EXTJS V6.0 (src/main/newwebapp/modern/src/plugs/ux/navigation)</p>
 * <p> Description:  拷贝官方网站上源码进行修改</p>
 * <p> Copyright: Copyright (c) 2017 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
Ext.define('wys.navigation.Bar',{
	extend: 'Ext.navigation.Bar',
	xtype : 'myBar',
	cls : 'status_toolbar',
	style : '-webkit-border-top-left-radius: 0px;border-top-left-radius: 0px;-moz-border-radius-topright: 0px; -webkit-border-top-right-radius: 0px;border-top-right-radius: 0px;',
    config: {
        /**
         * @cfg {String} defaultBackButtonText 
         * The text to be displayed on the back button if:
         * a) The previous view does not have a title
         * b) The {@link #useTitleForBackButtonText} configuration is true.
         * @private
         * @accessor
         */
        defaultBackButtonText: '&emsp;返回&emsp;',

        /**
         * @cfg {Object} animation 
         * @private 禁用标题栏动画效果，防止自定义功能出错，如非必要请勿改动
         * @accessor
         */
        animation: false,

        /**
         * @cfg {Ext.Button/Object} backButton
         * The configuration for the back button
         * @private
         * @accessor
         */
        backButton: {
            text: '&emsp;返回&emsp;',
            align: 'left',
            ui: 'back',
            hidden: true
        },
        //以下配置需要在自定中配置在bar里面,如bar:{item:[],cls:'',backHide:false}
        /*导航栏临时控件组，在子项中配置*/
        tmpItems: null,
        /*导航栏临时cls，在子项中配置*/
        tmpCls: null,
        /*是否隐藏返回按钮，在子项中配置*/
        backHide: true
    },

    /*创建导航栏临时控件组*/
    applyTmpItems: function (newItems) {
        if (!newItems) return false;
        var me = this,
            navItems = [],
            i,
            ln;
        newItems = Ext.Array.from(newItems);
        for (i = 0, ln = newItems.length; i < ln; i++) {
            var item = newItems[i],
                fire = item.fire,
                btn = me.factoryItem(item);
            if (fire) {
                btn.on({
                    tap: 'onTmpItemTap',
                    scope: me
                });
            }
            navItems.push(me.factoryItem(btn));
        }
        return navItems;
    },
    //临时控件被点击时
    onTmpItemTap: function (t) {
        var me = this,
            view = me.getView().getActiveItem(),
            fire = t.getInitialConfig('fire');
        view.fireEvent(fire, me, view, t);
    },
    /*更新导航栏临时控件组*/
    updateTmpItems: function (newItem, oldItem) {
        if (oldItem) {
            var i, ln;
            for (i = 0, ln = oldItem.length; i < ln; i++) {
                this.remove(oldItem[i]);
            }
        }
        if (newItem) {
            this.add(newItem);
        }
    },
    /*更新导航栏临时cls*/
    updateTmpCls: function (newItem, oldItem) {
        if (oldItem) {
            this.removeCls(oldItem);
        }
        if (newItem) {
            this.addCls(newItem);
        }
    },

    /**
     * @private
     */
    updateView: function (newView) {
        var me = this,
            backButton, innerItems, i, backButtonText, item, bar;

        // Need to have items initialized before getting the backButton 
        me.getItems();
        backButton = me.getBackButton();

        if (newView) {
            //update the back button stack with the current inner items of the view 
            innerItems = newView.getInnerItems();
            for (i = 0; i < innerItems.length; i++) {
                item = innerItems[i];
                 title = (item.getTitle) ? item.getTitle() : item.config.title;

                bar = (item.getBar) ? item.getBar() : item.config.bar;
                me.backButtonStack.push({
                     title: title || '&nbsp;',
                    bar: bar
                });
            }

             titleText = me.getTitleText();

             if (titleText === undefined) {
                 titleText = '';
             }

             me.setTitle(titleText);

            backButtonText = me.getBackButtonText();
            if (backButtonText) {
                backButton.setText(backButtonText);
                backButton.show();
            }
            //更新bar
            me.updateBar();
        }
    },

    /**
     * @private
     */
    onViewAdd: function (view, item) {
        var me = this,
            backButtonStack = me.backButtonStack,
            hasPrevious, bar;

        me.endAnimation();

         title = (item.getTitle) ? item.getTitle() : item.config.title;

        bar = (item.getBar) ? item.getBar() : item.config.bar;
        backButtonStack.push({
             title: title || '&nbsp;',
            bar: bar
        });
        hasPrevious = backButtonStack.length > 1;

        me.doChangeView(view, hasPrevious, false);
    },

    /**
     * @private
     */
    doChangeView: function (view, hasPrevious, reverse) {
        var me = this,
            leftBox = me.leftBox,
            leftBoxElement = leftBox.element,
            titleComponent = me.titleComponent,
            titleElement = titleComponent.element,
            backButton = me.getBackButton(),
             titleText = me.getTitleText(),
            backButtonText = me.getBackButtonText(),
            animation = me.getAnimation() && view.getLayout().getAnimation(),
            animated = animation && animation.isAnimation && view.isPainted(),
            properties, leftGhost, titleGhost, leftProps, titleProps;


        if (animated) {
            leftGhost = me.createProxy(leftBox.element);
            leftBoxElement.setStyle('opacity', '0');
            backButton.setText(backButtonText);
            backButton[hasPrevious ? 'show' : 'hide']();

            titleGhost = me.createProxy(titleComponent.element.getParent());
            titleElement.setStyle('opacity', '0');
             me.setTitle(titleText);

            properties = me.measureView(leftGhost, titleGhost, reverse);
            leftProps = properties.left;
            titleProps = properties.title;

            me.isAnimating = true;
            me.animate(leftBoxElement, leftProps.element);
            me.animate(titleElement, titleProps.element, function () {
                titleElement.setLeft(properties.titleLeft);
                me.isAnimating = false;
                me.refreshTitlePosition();
            });

            me.animate(leftGhost.ghost, leftProps.ghost);
            me.animate(titleGhost.ghost, titleProps.ghost, function () {
                leftGhost.ghost.destroy();
                titleGhost.ghost.destroy();
            });
        } else {
            if (hasPrevious) {
                backButton.setText(backButtonText);
                backButton.show();
            } else {
                backButton.hide();
            }
             me.setTitle(titleText);
        }
        me.updateBar();
    },
    //更新bar
    updateBar: function () {
        //更新其他
        var me = this,
            bar = me.getBar() || {};
        //设置导航栏临时控件组
        me.setTmpItems(bar.items);
        //设置导航栏临时cls
        me.setTmpCls(bar.cls);
        //更新返回按钮状态
        if (bar.backHide) {
            me.getBackButton().hide();
        }
    },

    /**
     * Returns the text needed for the current title at anytime.
     * @private
     */
    getTitleText: function () {
        if (this.backButtonStack.length == 0) {
            return '';
        }
        return this.backButtonStack[this.backButtonStack.length - 1].title;
    },
    getBar: function () {
        if (this.backButtonStack.length == 0) {
            return false;
        }
        return this.backButtonStack[this.backButtonStack.length - 1].bar;
    }
});