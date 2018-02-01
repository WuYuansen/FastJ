/**
 * 页面布局头部
 */
Ext.define('app.view.main.Layout_headler',{
	extend : 'Ext.toolbar.Toolbar',
	xtype : 'headerBar',
	height: 65,
	requires : ['app.view.main.ProfileSwitcher'],
    itemId: 'headerBar',
    style: {
		background:'#3d8fc5'
	},
    items: [
        {
            xtype: 'component',
            html : '<div class="hand_component_title">&nbsp;'+WY.local.lang.core.app.sysName+'</div>',//<i class="fa fa-home"></i>
            width: 283,
            height : 60,
            cls : 'head_component'
        },
        {
            margin: '0 0 0 8',
            ui: 'header',
            iconCls: 'x-fa fa-navicon fa-lg',
            style : 'font-size:18px;',
            tooltip : '点击收缩/展开菜单',
            hidden : Ext.util.Cookies.get('theme') ==='modern',
            name: 'main-navigation-btn',
            handler: 'onToggleNavigationSize'
        },
        {
            xtype: 'tbspacer',
            flex: 1
        },
		{
			xtype: 'tbtext',
			text: Ext.String.format('{0}<span style="color:#00000;"><b>'+(app.uName||"系统管理员") +'</b></span>&nbsp;&nbsp;',WY.local.lang.core.app.welcomeText),
			style : 'color : #ffffff;',
			cls: 'top-user-name'
		},
		'-',
		{
			xtype : 'ArrayCombobox',
			width:90,
			value : Ext.util.Cookies.get('theme') || 'classic',
			name:'selectionTheme',
			arrayData : [['简约风格','modern'],['经典风格','classic']],
			listeners : {
				render : 'selectionThemeEventInit',
				select : 'selectionThemeEvent'
			},
			tooltip:'点击切换页面风格'
		},
		'-',
        {
            iconCls:'fa fa-key fa-lg',
			ui: 'header',
            href: '#passwordreset',
            hrefTarget: '_self',
            tooltip: WY.local.lang.core.app.northview.passwordreset,
            handler : function(){
            	Ext.create('app.view.anthentication.PasswordReset',{}).show();
            },
            listeners : {
				mouseout:function(this_,e,eOpts){
					//this_.setIconCls(this_.iconCls.replace(' fa-spin',''));
				},
				mouseover:function(this_, e, eOpts ){
					//this_.setIconCls(this_.iconCls +' fa-spin');
				}
			}
        },
        {
        	tooltip: WY.local.lang.core.app.northview.logout,
            iconCls : 'fa fa-power-off fa-lg',
			ui: 'header',
        	listeners : {
				mouseout:function(this_,e,eOpts){
					//this_.setIconCls(this_.iconCls.replace(' fa-spin',''));
				},
				mouseover:function(this_, e, eOpts ){
					//this_.setIconCls(this_.iconCls +' fa-spin');
				}
			},
            handler : function(){
				var logoutAjaxCfg = {
            			url : window.constants.url.logout,
            			ok : function(res){
            				if(res.success){
            					window.util.info('您已退出系统，点击确认跳转到登录页',function(){
									Ext.util.Cookies.set('loginState',false);
            						window.location.reload();
            					},'系统提示');
            				}
            			}
            	};
            	window.util.confirm('您确定要退出系统吗？',function(btn){
            		if(btn === 'ok'){
						//接入正式以后请将上一行代码注释，下一行代码解除注释
            			window.util.ajax(logoutAjaxCfg);
            		}
            	},'系统提示');
            }
        }/*,
        {xtype : 'profileSwitcher'}*/
    ]
});