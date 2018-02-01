Ext.define('app.model.sys.User',{
	extend : 'Ext.data.Model',
	idProperty :'id',
	field:[
	       {name:'id',type:'int'},  //ID
	       {name:'loginname',type:'string'},  //  用户登陆名
	       {name:'password',type:'string'},  //登录密码
	       {name:'realname',type:'string'},  //用户真实姓名
	       {name:'deptcode',type:'int'},  //  所属组织机构
	       {name:'post',type:'int'},  //   职务
	       {name:'idcard',type:'string'},  //   身份证号码
	       {name:'sex',type:'string'},  //   性别
	       {name:'nation',type:'string'},  //   民族
	       {name:'tel',type:'string'},  //   办公电话
	       {name:'mobphone',type:'string'},  //   个人电话
	       {name:'qq',type:'string'},  //   QQ号
	       {name:'email',type:'string'},  //   电子邮箱
	       {name:'jobstate',type:'int'},  //   工作情况:1.在职;2.离职;3.休假
	       {name:'address',type:'string'},  //   家庭住址
	       {name:'remarks',type:'string'},  //   备注
	       {name:'jobstateText',type:'string'},  //   备注
	       {name:'nationText',type:'string'},  //   备注
	       {name:'sexText',type:'string'},  //   备注
	       {name:'postText',type:'string'}  //   备注
	       ]
});