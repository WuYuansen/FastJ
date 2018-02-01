Ext.define('app.view.main.Error500Window', {
	extend: 'Ext.window.Window',
    xtype: 'page500',
    requires: [
        'Ext.container.Container',
        'Ext.form.Label',
        'Ext.layout.container.VBox',
        'Ext.toolbar.Spacer'
    ],
    initComponent: function () {
    	Ext.apply(this,{
    		items: [
    		        {
    		            xtype: 'container',
    		            width: 600,
    		            cls:'error-page-inner-container',
    		            layout: {
    		                type: 'vbox',
    		                align: 'center',
    		                pack: 'center'
    		            },
    		            items: [
    		                {
    		                    xtype: 'label',
    		                    cls: 'error-page-desc',
    		                    html: '<div>出错了，服务器无法处理您的请求。</div>' +
    		                          '<div>'+this.domHtml+'</div>'
    		                },
    		                {
    		                    xtype: 'tbspacer',
    		                    flex: 1
    		                }
    		            ]
    		        }
    		    ]
    	});
		this.callParent(arguments);
	}
});
