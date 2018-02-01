Ext.define('app.view.anthentication.LockingWindow',{
	extend: 'Ext.window.Window',
    requires: [
        'app.view.anthentication.AuthenticationCtrl',
        'Ext.layout.container.VBox'
    ],
    xtype: 'lockingwindow',
    cls: 'auth-locked-window',
    style : {
        background:'#75b9e6'
    },
    closable: false,
    resizable: false,
    autoShow: true,
    titleAlign: 'center',
    maximized: true,
    modal: true,
    frameHeader: false,
    layout: {
        type: 'vbox',
        align: 'center',
        pack: 'center'
    },
    listeners : {
    	activate : function(){
			var changeLoginBackground = document.querySelectorAll(".auth-locked-window .x-window-body")
	        for(var i=0;i<changeLoginBackground.length;i++){
	        	changeLoginBackground[i].style.background="url(resources/images/login/bg_login_"+Math.round(Math.random()*2)+".jpg)";
	        	changeLoginBackground[i].style.width="100%";
	        	changeLoginBackground[i].style.height="100%";
	        	changeLoginBackground[i].style.backgroundSize="100% 100%";
	        	changeLoginBackground[i].style.position="absolute";
	        	changeLoginBackground[i].style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(src='bg_login_0.png',sizingMethod='scale')";
	        }
		}
	},
    controller: 'authentication'
});