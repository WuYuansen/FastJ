项目架构以及开发工具:
	eclipse + maven + jetty + myBatis3.1.1 + spring3.1.2 + springMVC3.1.2
项目使用的主要jar
	fastJSON : JSON构造器
	druid : 数据库连接池
	mybatis : ORM
	springMVC : 控制器
	log4j	: 日志框架
	commons-pool : 对象池,为了避免对象重复引用创建而带来的性能问题.
	mail : 邮件发送.
	ehcache : 缓存框架,缓存系统页面信息,公共信息
	等等.
项目结构说明:
grjyFramework		--首领
	sys-common	--系统基础类,公共模块
	sys-dao	--持久化操作模块 (如需新增模块 创建一个maven项目,命名为:sapp-DAO-模块 groupid 必须为:com.gtjy.p2p.modules 一下两个操作步骤与此类似)
	sys-tiles	--存储业务模块
	sys-servces	--存储控制器模块
	这里发布以后在class下看不到任何class文件.系统自动把各个模块打包成jar存放到lib下.提供此模块调用
	sys-portal-Extjs	--Extjs版本前端展示
	sys-portal-bootstrap	--bootstrap版本前端展示

命名方式必须:
1:包名必须为:com.gtjy.p2p.modules.业务模块.(DAO/Mapper/tiles(Interfaces/impl)/controller).类名(驼峰命名规则) 
2:类中主要代码必须有简要注释.

:::::::::::::::::::::::::
springMVC:作为页面服务
MyBatis : 轻量级ORM框架用于数据持久化
BootStrap : 做为页面展示，做了大量定制，完美支持IE8
bootstrapDialog : 作为弹出模态窗口
bootstrapTable : 作为表格插件
bootstrapvalidator : 作为表单校验框架
zTree : 作为树插件
My97DatePicker : 作为日期插件
log4j :  作为日志组件
fastJSON :  作为序列化组件 