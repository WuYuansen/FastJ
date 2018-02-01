/**
 *
 * <p> Title:Share.js BY EXTJS V6.0 (src/main/newwebapp/packages/local/wys/modern/overrides/picker)</p>
 * <p> Description:  分享功能</p>
 * <p> Copyright: Copyright (c) 2017 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
Ext.define('wys.picker.Share',{
	extend:'Ext.Picker',
	xtype : 'sharePicker',
	alternateClassName: 'wys.picker.Share',
	config : {
		toolbar : {
			ui : 'light',
			title : '分享到'
		},
		align:'center',
		value : {
			weibo : 'sinaminiblog'
		},
		slots : [{
			name : 'weibo',
			data : [
				{text : '<i class="fa fa-weibo fa-lg text_weibo_gb"></i> 新浪微博',value : 'sinaminiblog'},
				{text : '<i class="fa fa-renren fa-lg text_renren_gb"></i> 人人网',value : 'renren'},
				{text : '<i class="fa fa-qq fa-lg text_qq_gb"></i> QQ',value :'QQ'},
				{text : '<i class="fa fa-weixin fa-lg text_weixin_gb"></i> 微信',value : 'wechat'}
			]
		}],
		//分享参数，具体参数类型参考不同官方ＡＰＩ接口
		weiboParams : null, //
		show : function(params){
			this.setWeiboParams(params);
			this.callParent(arguments);
		},
		//点击确认
		onDoneButtonTap : function(){
			var params = this.getWeiboParams();
			//具体查看对应ａｐｉ地址
			var url = "";
			for(var item in params){
				var value = params[item];
				if(item === 'url'){
					//转码特殊符号防止ｕｒｌ中包含参数
					value = escape(value);
				}
				url = url + '&' + item + '=' +value;
			}
			window.open(url,'_system');
			this.endPicker();
		},
		//点击取消
		onCancelButtonTap　: function(){
			this.endPicker();
		},
		//结束并销毁
		endPicker : function(){
			this.hide();
			this.destroy();
		}
	}
});