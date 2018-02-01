/**
 *
 * <p> Title:PropertyView EXTJS FORM</p>
 * <p> Description:  进度，可用于任何流程等需要办理步骤的页面</p>
 * <p> Copyright: Copyright (c) 2017 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
Ext.define('wys.view.Progress',{
    extend:'Ext.view.View',
    xtype : 'dataview-progress',
    requires: [
        'wys.view.ProgressController',
        'wys.view.ProgressViewModel'
    ],
    controller: 'progressCtrl',
    viewModel: 'progressViewModel',
    bind: { store: '{dataviewProgress}' },
    itemSelector: '.ui-progress-segment-main-icon-failed',
    initComponent: function () {
        var me = this;
        me.tpl = [
            '<tpl for=".">',
            '<div class="ui-progress">',
            '<tpl for="list">',
            '<div class="ui-progress-segment">',
            '<div class="ui-progress-segment-main">',
            '<div class="ui-progress-segment-main-up" title="{upMessage}">{upMessage}</div>',
            '<div class="ui-progress-segment-main-icon ui-progress-segment-main-icon-{status}"></div>',
            '<div class="ui-progress-segment-main-down title="{downMessage}">{downMessage}</div>',
            '</div>',
            '<div class="ui-progress-segment-bar"></div>',
            '<tpl if="failedMessage">',
            '<div class="ui-progress-segment-failed-popup"><span></span><em></em>{failedMessage}</div>',
            '</tpl>',
            '</div>',
            '</tpl>',
            '</div>',
            '</tpl>'
        ];
        me.callParent();
    },
    listeners: {
        afterrender: function (item, option) {
            item.on({
                element: 'el',
                mouseover: function (e, target, obj) {
                    if (target.className.indexOf('ui-progress-segment-main-icon-failed') != -1) {
                        var failedPopup = Ext.query(".ui-progress-segment-failed-popup");
                        failedPopup[0].style.display = 'block';
                    }
                },
                mouseout: function (e, target, obj) {
                    if (target.className.indexOf('ui-progress-segment-main-icon-failed') == -1) {
                        var failedPopup = Ext.query(".ui-progress-segment-failed-popup");
                        failedPopup[0].style.display = 'none';
                    }
                },
                scope: item
            });
        }
    }
});