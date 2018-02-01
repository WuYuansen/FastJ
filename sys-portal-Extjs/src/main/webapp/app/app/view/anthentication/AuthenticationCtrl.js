Ext.define('app.view.anthentication.AuthenticationCtrl',{
	extend : 'wys.basic.BaseCtrl',
	alias: 'controller.authentication',
	init : function(){},
	onLoginButton: function(btn,e,args){
		//please write your code by login event,login event please invoker "window.util.ajax(cfx)"
		siginAjaxCfg = {
			url: constants.url.login,
			params : {
				loginName:btn.up('form').down('textfield[name=userid]').getValue(),
				password:btn.up('form').down('textfield[name=password]').getValue()
			},
			ok: function (res) {
				if (res.success) {
					Ext.util.Cookies.set('loginState', true);
					window.location.reload();
				}else{
					btn.up('form').down('label').setHtml('<span style="color:red;"><i class="fa fa-info-circle"></i> &nbsp;'+res.msg_info+'</span>');
					btn.up('form').down('label').show();
				}
			}
		}
		util.ajax(siginAjaxCfg);
	},
	initAFieldEvent : function(self_,args){
		var d = new Ext.util.DelayedTask(function(){
			Ext.get('forgotPassword').on('click',function(){
				Ext.ComponentQuery.query('login')[0].hide();
				Ext.create('app.view.anthentication.ForgotPassword');
			},this,{single:false});
		});
		d.delay(1000);
	},
	onNewAccount:function(btn,e,args){
		Ext.create('app.view.anthentication.Register');
	},
	onClickRegisterAccount : function(){
		Ext.create('app.view.anthentication.RegisterType');
	},

	registerProgress : function(btn,e,args){
		Ext.create('app.view.anthentication.SearchRegProgress');
	},
	onSearchProgressClick : function(btn,e,args){
		Ext.create('app.view.anthentication.SearchRegProgressResult');
	},
	enterByUserName : function(field, e){
		if (e.getKey() == e.ENTER) {
			if(field.getValue().length >= 5){
				field.up('form').down('textfield[name=password]').focus();
			}else{
				util.err('用户名输入格式有误，请重新输入');
				field.up('form').down('textfield[name=userid]').focus();
			}
		}
	},
	enterByPassword : function(field,e){
		var self_ = this;
		if(e.getKey() == e.ENTER){
			var userField = field.up('form').down('textfield[name=userid]');
			if(userField.getValue().length < 5){
				util.err('用户名输入格式有误，请重新输入');
				userField.focus();
			}else{
				self_.onLoginButton(field,null,null);
			}
		}
	},
	rememberMeClick : function(chk, newValue, oldValue, eOpts ){
		if(chk.getValue){
			Ext.util.Cookies.set("loginName",chk.up('form').down('textfield[name=userid]').getValue());
		}else{
			Ext.util.Cookies.clear('loginName');
		}
	},
	onSignupClick : function(btn){
		var self_ = this;
		self_.form = btn.up('form');
		if(self_.form.isValid()){
			self_.form.submit({
				waitMsg: '正在提交数据',
				waitTitle: '提示',
				url : constants.url.registerEnterAccount,
				success: function(form, action) {
					if(action.result.success){
						util.info('恭喜您，注册成功，请等待管理员审核');
						btn.up('lockingwindow').close();
					}else{
						util.err(action.result.msg_info || "用户注册失败，请稍后再试或联系管理员");
					}
				},
				failure: function(form, action) {
					util.err(action.result.msg_info ||  "用户注册失败，请稍后再试或联系管理员");
				}
			});
		}else{
			util.err('请将数据录入完整');
		}
	}
});