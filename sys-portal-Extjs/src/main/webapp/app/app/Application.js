/**
 * The main application class. An instance of this class is created by app.js when it
 * calls Ext.application(). This is the ideal place to handle application launch and
 * initialization details.
 */
Ext.define('app.Application', {
    extend: 'Ext.app.Application',
    name: 'app',
    stores: [
    ],
    
    launch: function () {
        // TODO - 启动应用程序
    	Ext.QuickTips.init(); //初始化系统提示组件
    	var launch_self = this;
    	Ext.Ajax.timeout = 120; // (超时为两分钟，单位为毫秒，默认是30秒)
    	launch_self.requestcomplete();
    },

    onAppUpdate: function () {
    	Ext.create("wys.window.UpdateNotice", {
            viewModel: {
                data: {
                    updateDate: '',
                    title:'升级说明'
                },
                stores: {
                    updateNotice: {
                        type: 'store',
                        data: WY.local.lang.updater
                    }
                }
            }
        }).show();
    },
	requestcomplete : function(){
    	Ext.Ajax.on('requestcomplete', function(conn, response, options,eOpts){
   		 	var json = Ext.util.JSON.decode(response.responseText);
    		var sessionStatus = json.sessionstatus;
    		if (typeof(sessionStatus) != "undefined" && typeof(sessionStatus) != "") {
    			top.Ext.MessageBox.show({
    				title : '提示',
    				msg : '页面会话超时，请重新登录!',
    				buttons : Ext.MessageBox.OK,
    				fn : function(btn, text) {
    					if (btn == 'ok' || btn == 'cance') {
    						Ext.util.Cookies.set('loginState', false);
    						window.open(app.base + 'index.jsp', '_top', '');
    					}
    				},
    				icon : Ext.MessageBox.INFO
    			});
    		}
    		var err = json.ex;
    		if (typeof(err) != "undefined") {
    			top.Ext.MessageBox.show({
    				closable:false,
    				title : '信息',
    				msg : err.cause==null||err.message==null?err.message==null?'系统运行出错，请联系管理员！':err.message:err.cause.message,
    				icon : Ext.MessageBox.ERROR
    			});
    			Ext.util.Cookies.set('loginState', false);
    		}
    	}, this);
    }
});
