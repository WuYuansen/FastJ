/**
 * @功能：系统国际化文件-中文简体
 * @作者:wys
 */
var WY = WY || {};
WY.local = WY.local ||{
	lang:{
		core:{}
	}
};
//正是环境请更改为13行代码
WY.local.loadScriptPrefix = "build/production/GasApp/classic/";
//WY.local.loadScriptPrefix = "classic/";
/* 系统更新说明 */
WY.local.lang.updater = [
	{content:"系统页面优化,性能调整"},
	{content:"解决部分用户浏览器无法正常显示问题"}
];
/*公共信息*/
WY.local.lang.common = {
	optionError	 : '操作失败，请重试!!!',
	dragText:'拖动排序',
	okButtonText:'确定',
	cancelButtonText:'取消',
	yesButtonText : '是',
	noButtonText : '否',
	clickCloseWindow : '点击关闭窗口',
	fieldBlankText:'该项为必选项',
	addSuccessAlert:'添加成功！',
	updateSuccessAlert:'修改成功！',
	saveSuccessAlert:'保存成功！',
	deleteSuccessAlert:'删除成功！',
	deleteConfirm:'确定删除选中的数据吗？',
	notHaveSelectDeleteDate : '您没有选择要删除的数据！',
	editText:'编辑',
	functionIsTempClose : '功能暂未开放！！！',
	addText:'保存',
	updateText:'修改',
	saveText:'修改',
	deleteText:'删除',
	refreshText:'刷新',
	closeText:'关闭',
	addSendText :'保存并发布',
	system_msg : {
		dataLoad : '数据正在加载中，请稍后。。。',
		sysTip : '系统提示',
		sysError : '错误提示',
		sysConfirm : '请确认',
		runingTitle : '处理中...',
		runing : '系统正在处理您的请求，请稍候...',
		onread_error : '数据加载发生错误，请稍后再试或联系管理员',
		deleteTip_err : '删除数据失败，请稍后再试或联系管理员',
		systemRunError : '系统运行期间发生异常，请稍后再试或联系管理员',
		systemUpdated : '系统已更新,是否重新加载?',
		loginTimeOut : '页面会话超时，请重新登录!',
		notFoundData : '没有找到相关记录'
	},
	grid:{
		justSelectOneRow : '请选择要操作的数据行且只能选择一行数据进行操作',//选择点击编辑功能使用
		notSelected  : '请选择要处理的数据'
	},
	tip : {
		toolbardbclickTipTemplate : '<font style="color:#225487;"><i class="fa fa-volume-up fa-fw" style="color:red;"></i>{0}</font>',
		toolbardbclickTip : '<font style="color:#225487;"><i class="fa fa-volume-up fa-fw" style="color:red;"></i>双击数据列表查看详情</font>',
		toolbardbclickByModifyTip : '<font style="color:#225487;"><i class="fa fa-volume-up fa-fw" style="color:red;"></i>双击数据列表进行数据编辑操作</font>',
		toolbardbclickTipApped : '<font style="color:#225487;"><i class="fa fa-volume-up fa-fw" style="color:red;"></i>单击/双击数据项可查看详情{0}</font>',
		searchTip : '<span style="font-size:12px">点击进行数据检索</span>',
		refreshTip : '<span style="font-size:12px">点击刷新当前列表</span>',
		dbitemclick_tip : '<font style="color:#225487;"><i class="fa fa-volume-up fa-fw" style="color:red;"></i>双击数据列表查看选中行详情信息，高级查询提供更多查询条件！</font>',
		seniorSearchTip : '<span style="font-size:12px">点击显示更多查询选项</span>',
		support : '<span style="font-size:12px;font-style:none;">技术支持:{0}</span>',
		notData : "<div style='text-align:center;mapping:6;color:#404549'>暂无数据!!!<div>",
		filing : {
			grid : '<font style="color:#225487;"><i class="fa fa-volume-up fa-fw" style="color:red;"></i>双击数据列表查看备案详情！！！</font>'
		},
		exp : {
			error : '导出文件异常，请联系管理员',
			downloadError : '下载文件异常，请联系管理'
		}
	},
	pagingtoolbar : {
		'beforePageText' 				: 	'<span style=\'font-size:12px;\'>第</span>',
		'displayMsg' 					:	"<span style=\'font-size:12px;\'>一共<font color=\"green\"> {2} </font>条记录,本页<font color=\"green\"> {0} - {1}</font>&nbsp;&nbsp;&nbsp;</span>",
		'emptyMsg' 						:	'<span style=\'font-size:12px;\'><font color=red>&nbsp;没有记录</font></span>',
		'refreshText' 					: 	'<span style=\'font-size:12px;\'>刷新</span>',
		'firstText' 					:	'<span style=\'font-size:12px;\'>第一页</span>',
		'prevText' 						: 	'<span style=\'font-size:12px;\'>前一页</span>',
		'nextText'						: 	'<span style=\'font-size:12px;\'>后一页</span>',
		'lastText' 						: 	'<span style=\'font-size:12px;\'>最后一页</span>',
		'pageSize'						:	30,
		'DisplayPage'					:	'每页显示',
		'strip'							:	'条'
	}
}
/*平台主页面 以及登陆页面相关 */
WY.local.lang.core.app = {
	sysName: 'fastJ-快速开发平台',
	company : 'Powered By Loser森 15909910367@163.com',
	welcomeText: '欢迎您：',
	northview:{
		tip : '查看通知公告',
		email : '查看站内消息',
		passwordreset : '修改密码',
		logout : '安全退出'
	},
	loginPage : {
		login : '登&nbsp;&nbsp;录',
		register : '注&nbsp;&nbsp;册',
		rememberMe : '记住我',
		forgotPas : '忘记密码？',
		accountPlaceHolder : '请输入登录名',
		accountRegexText : '用户名长度不能超过18个字符',
		pasPlaceHoler: '请输入登录密码',
		pasRegexText : '密码长度不能超过20个字符'
	},
	check:{
		checkIn:{
			notChoseUser : '您没有选择要迁入的用户！！！',
			confirmCheckIn : '你确定要将【<span style="color:#2492e2;">{0}</span>】迁入到【<span style="color:#2492e2;">{1}</span>】',
			deleteConfirmByCheckIn : '确定删除选中的数据吗？在您选择的数据中系统将自动排除已经入住的人员信息！如需迁入，请到迁入管理中操作！！！',
			deleteConfirmByCheckInNotHaveOperUser : '没有可删除的人员信息，如需迁出，请到迁出管理中操作！！！',
			confirmCheckOut : '你确定要将【<span style="color:#2492e2;">{0}</span>】从【<span style="color:#2492e2;">{1}</span>】迁出吗？',
			gridRowColorTip : '<font style="color:#225487;"><i class="fa fa-volume-up fa-fw" style="color:red;"></i>双击数据列表进行迁入前信息编辑，表格色块说明：“<span style="color:#FFFF00">黄色</span>”已迁入，“无色”未迁入</font>'
		}
	}
}