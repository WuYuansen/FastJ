Ext.define('app.view.main.Error404Window',{
	extend: 'Ext.window.Window',
    alias: 'widget.pageserror404window',
    requires: [
        'Ext.container.Container',
        'Ext.toolbar.Spacer',
        'Ext.form.Label'
    ],
    autoShow: true,
    cls: 'error-page-container',
    closable: true,
    title: '系统提示',
    titleAlign: 'center',
//    maximized: true,
    modal: true,
    width : 300,
    height : 150,
    layout: {
        type: 'vbox',
        align: 'center',
        pack: 'center'
    },
    items: [
        {
            xtype: 'container',
            width: 300,
            layout: {
                type: 'vbox',
                align: 'center',
                pack: 'center'
            },
            items: [
                {
                    xtype: 'label',
                    cls: 'error-page-top-text',
                    text: '资源未找到（404）'
                },
                {
                    xtype: 'label',
                    cls: 'error-page-desc',
                    html: '服务器找不到给定的资源；文件不存在!'
                },
                {
                    xtype: 'tbspacer',
                    flex: 1
                }
            ]
        }
    ]
});