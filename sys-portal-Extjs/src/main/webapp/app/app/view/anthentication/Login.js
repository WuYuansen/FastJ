Ext.define('app.view.anthentication.Login',{
    extend : 'app.view.anthentication.LockingWindow',
    xtype : 'login',
    requires: [
        'app.view.anthentication.Dialog',
        'Ext.container.Container',
        'Ext.tab.Panel',
        'app.util.commonUtil',
        'Ext.form.field.Text',
        'Ext.form.field.Checkbox',
        'Ext.button.Button'
    ],
    defaultFocus: 'authdialog',
    lain: true,
    header: false,
    border: false,
    closable: false,
    draggable: false,
    frame:false,
    items : [
		{
		    xtype: 'label',
		    cls: 'lock-screen-top-label',
		    style :{
		        fontSize: '48px',
		        color:'#fff'
		    },
		    text: WY.local.lang.core.app.sysName
		},
		{
			xtype : 'container',
			height:100
		},
        {
			xtype : 'tabpanel',
			activeTab : 0,
			autoHeight:true,
            border : false,  
			items : [{
				title : '身份认证',
				xtype : 'form',  
                iconCls : 'fa fa-user fa-fw',
                name : 'loginForm',  
                defaults : {  
                    margin: '10 0 0 20'  
                },  
                defaultType : 'textfield',  
                fieldDefaults: {
                    labelAlign: 'right',
                    labelWidth: 70
                },
				items : [{
		            xtype: 'authdialog',
		            defaultButton : 'loginButton',
		            autoComplete: true,
		            bodyPadding: '20 20',
		            cls: 'auth-dialog-login',
		            header: false,
		            width: 415,
		            layout: {
		                type: 'vbox',
		                align: 'stretch'
		            },
		            defaults : {
		                margin : '5 0',
		                selectOnFocus : true
		            },
		            items: [
		                {
		                    name:'errorMsg',
		                    hidden : true,
		                    xtype : 'label'
		                },
		                {
		                    xtype: 'textfield',
		                    cls: 'auth-textbox',
		                    name: 'userid',
		                    value : Ext.util.Cookies.get('loginName'),
		                    hideLabel: true,
		                    allowBlank : false,
		                    regex : /^[\s\S]{5,18}$/,
		                    regexText : WY.local.lang.core.app.loginPage.accountRegexText,
		                    emptyText: WY.local.lang.core.app.loginPage.accountPlaceHolder,
		                    listeners : {
		                        specialkey: 'enterByUserName'
		                    }
		                },
		                {
		                    xtype: 'textfield',
		                    cls: 'auth-textbox',
		//                    height: 55,
		                    hideLabel: true,
		                    emptyText: WY.local.lang.core.app.loginPage.pasPlaceHoler,
		                    inputType: 'password',
		                    name: 'password',
		                    allowBlank : false,
		                    regex : /^[\s\S]{6,20}$/,
		                    regexText : WY.local.lang.core.app.loginPage.pasRegexText,
		                    listeners : {specialkey:'enterByPassword'}
		                },
		                {
		                    xtype: 'container',
		                    layout: 'hbox',
		                    items: [
		                        {
		                            xtype: 'checkboxfield',
		                            flex : 1,
		                            cls: 'form-panel-font-color rememberMeCheckbox',
		                            height: 30,
		                            boxLabel: WY.local.lang.core.app.loginPage.rememberMe,
		                            checked : !Ext.isEmpty(Ext.util.Cookies.get('loginName')),
		                            listeners : {change :'rememberMeClick'}
		                        }, {
		                            xtype: 'box',
		                            html: Ext.String.format('<a id="forgotPassword" href="#forgotPassword" class="link-forgot-password">{0}</a>',WY.local.lang.core.app.loginPage.forgotPas),
		                            listeners : {beforerender:'initAFieldEvent'}
		                        }
		                    ]
		                },{
		                    xtype:'container',
		                    layout:'vbox',
		                    items : [
		                        {
		                            xtype: 'button',
		                            itemId:'loginButton',
		                            width:375,
		                            reference: 'loginButton',
		                            scale: 'large',
		                            ui: 'soft-green',
		                            iconAlign: 'right',
		                            iconCls: 'x-fa fa-angle-right',
		                            text: WY.local.lang.core.app.loginPage.login,
		                            formBind: true,
		                            listeners: {
		                                click: 'onLoginButton'
		                            }
		                        }
		                    ]
		                }
		            ]
		        }]
			},{
               title : '关于',  
               border :false,
               iconCls : 'fa fa-bullhorn fa-fw',
               defaults : {  
                   width : 230  
               },
               items : [{
            	   	xtype: 'authdialog',
		            defaultButton : 'loginButton',
		            autoComplete: true,
		            bodyPadding: '20 20',
		            cls: 'auth-dialog-login',
		            header: false,
		            width: 415,
		            layout: {
		                type: 'vbox',
		                align: 'stretch'
		            },
		            defaults : {
		                margin : '5 0',
		                selectOnFocus : true
		            },
		            height : 259
               }]
			}]
        }
    ],
    initComponent: function() {
        this.addCls('user-login-register-container');
        Ext.apply(this,{
        	
        });
        this.callParent(arguments);
    }
})