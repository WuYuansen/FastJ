Ext.define('app.view.main.Main', {
    extend: 'Ext.container.Viewport', //'Ext.tab.Panel',
    xtype: 'app-main',
    requires: [
        'Ext.container.Viewport',
        'app.util.commonUtil',
        'app.util.Constants',
        'Ext.app.*',
        'Ext.data.*',
		'Ext.data.field.*',
		'Ext.data.field.Field',
		'Ext.panel.*',
		'Ext.grid.*',
		'Ext.menu.Menu',
		'Ext.list.Tree',
		'Ext.form.field.*',
		'Ext.form.*',
        'Ext.layout.container.*',
        'Ext.plugin.Viewport',
        'Ext.window.MessageBox',
        'app.view.main.Layout_headler',
        'app.view.main.Layout_footer',
        'app.view.main.Layout_menu',
        'app.view.main.MainController',
        'app.view.main.Layout_welcome',
        'app.view.anthentication.Login',
        'app.view.anthentication.Register',
        //系统自已定义插件
        'wys.*'
    ],
    controller: 'main',
    viewModel: 'main',
    ui: 'navigation',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    itemId : 'mainView',
    items : [{xtype : 'headerBar'}]
});