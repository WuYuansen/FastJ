## 目前为alpha版本，很多内容还在完善，请谨慎使用

## 项目架构以及开发工具:
	eclipse + maven + jetty + myBatis3.1.1 + spring3.1.2 + springMVC3.1.2
## 项目使用的主要jar
	fastJSON : JSON构造器
	druid : 数据库连接池
	mybatis : ORM
	springMVC : 控制器
	log4j	: 日志框架
	commons-pool : 对象池,为了避免对象重复引用创建而带来的性能问题.
	mail : 邮件发送.
	ehcache : 缓存框架,缓存系统页面信息,公共信息
	等等.
## 项目结构说明:
	grjyFramework	
		sys-common	--系统基础类,公共模块
		sys-dao	--持久化操作模块 (如需新增模块 创建一个maven项目,命名为:sapp-DAO-模块 groupid 必须为:com.gtjy.p2p.modules 以下两个操作步骤与此类似)
		sys-tiles	--存储业务模块
		sys-servces	--存储控制器模块
		sys-portal-Extjs	--Extjs版本前端展示
		sys-portal-bootstrap	--bootstrap版本前端展示
