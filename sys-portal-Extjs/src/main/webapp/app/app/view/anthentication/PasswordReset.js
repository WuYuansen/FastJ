Ext.define('app.view.anthentication.PasswordReset',{
	extend : 'Ext.window.Window',
	xtype: 'passwordreset',
    requires: [
        'Ext.window.Window',
        'Ext.form.field.Text'
    ],
	iconCls : 'fa fa-key',
    title: '修改密码',
    listeners : {
    	show : function(win){
    	},
    	close : function(win){
    		var form = win.down('form').getForm();
    		form.reset();
    	}
    },
	closeToolText:'关闭',
    modal:true,
	border:true,
    items: [
		{
			xtype : 'form',
			labelAlign:'right', 
		    labeWidth:80,
		    defaultType:'textfield',  
		    defaults:{
		    	allowBlank:false,
		    	msgTarget:'title',
				margin:8
			},
			items:[{
					name : 'sourcePwd',
					inputType : 'password',
					fieldLabel : '原 密 码',
					afterLabelTextTpl:required,
					allowBlank : false,
					blankText : '新密码不能为空',
					regex : /^[\s\S]{6,18}$/,
					regexText : '新密码长度不能超过18个字符'
				}, {
				    name : 'newPassword',
					afterLabelTextTpl:required,
				    inputType : 'password',
				    fieldLabel : '新 密 码',
				    allowBlank : false,
				    blankText : '新密码不能为空',
				    regex : /^[\s\S]{6,18}$/,
				    regexText : '新密码长度不能超过18个字符'
				}, {
				    name : 'confimPwd',
					afterLabelTextTpl:required,
				    inputType : 'password',
				    fieldLabel : '确认密码',
				    vtype: 'repetition',
                    repetition: { targetCmpId: 'newpassword' },
				    allowBlank : false,
				    blankText : '确认密码不能为空',
				    regex : /^[\s\S]{6,20}$/,
				    regexText : '旧密码长度不能超过20个字符'
				}       
	       ],
	       buttons:[{  
	            text:'修改密码',
			    iconCls : 'fa fa-edit',
			    formBind: true,
	            handler:function(f){  
	            	changePasswordFrom = f.up('form');
	                if(!changePasswordFrom.getForm().isValid()){  
	                  return;  
	                }
	                changePasswordFrom.getForm().submit({  
	                    url: constants.url.changePwd,  
	                    success:function(f,action){  
	                        if(action.result.success){
	                        	Ext.MessageBox.alert('系统提示',action.result.message ,function(btn){
	                        		if(btn === 'ok'){
	                            		logoutAjaxCfg = {
	                            			url : constants.url.logout,
	                            			ok : function(res){
	                            				if(res.success){
	                            					window.util.info('您已退出系统，点击确认跳转到登录页',function(){
	                            						Ext.util.Cookies.set('loginState',false);
	                            						window.location.href = app.base;
	                            					},'系统提示');
	                            				}
	                            			}
		                            	};
	                        			window.util.ajax(logoutAjaxCfg);
	                        		}
	                        	})
	                        }
	                    },  
	                    failure:function(f,action){   
	                        changePasswordFrom.getForm().reset();  
	                        Ext.Msg.alert('修改失败');  
	                    }   
	                });  
	            }  
	        }]  
		}
    ]
});