/**
 *
 * <p> Title:PluginNotInstallWin.js BY EXTJS V6.0 (src/main/newwebapp/classic/overrides/window)</p>
 * <p> Description:  系统所需插件为安装提示窗口</p>
 * <p> Copyright: Copyright (c) 2017 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
Ext.define("wys.window.PluginNotInstallWin", {
	extend: 'Ext.window.Window',
    alias: 'widget.pluginNotInstallWin',
    requires: [
        'Ext.container.Container',
        'Ext.toolbar.Spacer',
        'Ext.form.Label'
    ],
    tipText : '', //提示文字
    initComponent: function() {
    	var me = this;
    	Ext.apply(me,{
    		closeToolText : '关闭窗口',
    		autoShow: true,
    	    cls: 'error-page-container',
    	    closable: true,
    	    title: '系统检测到您有未安装的系统所需插件',
    	    titleAlign: 'center',
    	    modal: true,
    	    minWidth : 300,
    	    minheight : 150,
    	    layout: {
    	        type: 'vbox',
    	        align: 'center',
    	        pack: 'center'
    	    },
    		items: [{
		            xtype: 'container',
		            layout: {
		                type: 'vbox',
		                align: 'center',
		                pack: 'center'
		            },
		            items: [{
		                    xtype: 'label',
		                    cls: 'error-page-desc',
		                    margin:8,
		                    html: this.tipText
		                },{
		                    xtype: 'tbspacer',
		                    flex: 1
		                }
		            ]
		    }],
		    listeners : {
		    	show : function(win,e){
		    		Ext.EventManager.stopEvent(this);
		    		e.stopPropagation();
		    		return;
		    	}
		    }
    	});
    	me.callParent();
    },
    onCloseWindow: function() {
        var me=this;
        me.fireEvent("closeAnimate",me);
        Ext.defer(function() { me.close() },500,me);
    }
});