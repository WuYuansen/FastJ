package org.gtjy.p2p.plugin.Paging;

import java.sql.Connection;
import java.util.Properties;

import org.apache.ibatis.executor.statement.RoutingStatementHandler;
import org.apache.ibatis.executor.statement.StatementHandler;
import org.apache.ibatis.mapping.BoundSql;
import org.apache.ibatis.plugin.Interceptor;
import org.apache.ibatis.plugin.Intercepts;
import org.apache.ibatis.plugin.Invocation;
import org.apache.ibatis.plugin.Plugin;
import org.apache.ibatis.plugin.Signature;
import org.apache.log4j.Logger;


/**
 * 
 * <p> Title:实现ibatis Interceptor接口实现数据库物理分页功能 </p>
 * <p> Description: </p>
 * <p> Copyright: Copyright (c) 2013 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
@Intercepts({@Signature(method = "prepare", type = StatementHandler.class, args = {Connection.class})})
public class PageInterceptor implements Interceptor {
	private final static Logger log= Logger.getLogger(PageInterceptor.class);
	private DBDialect.Type dataBaseType=null;//数据库类型，不同的数据库有不同的分页方法 
	private DBDialect dialect = null; //根据不同数据库类型返回对应的操作语句
	
	/** 
     * 设置注册拦截器时设定的属性 
     */ 
	@Override
	public void setProperties(Properties pro) {
		log.info("数据库方言："+pro.getProperty("dataBaseType"));
		this.dataBaseType=DBDialect.Type.valueOf(pro.getProperty("dataBaseType").toUpperCase());
	}
	
	/** 
     * 拦截器对应的封装原始对象的方法 
     */  
	@Override
	public Object plugin(Object target) {
	    //当目标类是StatementHandler类型时，才包装目标类，否者直接返回目标本身,减少目标被代理的次数
		if(target instanceof StatementHandler) {
		    return Plugin.wrap(target, this);  
		}else {
		    return target;
		}
	}
	
	/** 
     * 拦截后要执行的方法 
     */  
	@Override
	public Object intercept(Invocation invocation) throws Throwable {
        final RoutingStatementHandler handler = (RoutingStatementHandler) invocation.getTarget();  
        final StatementHandler delegate = (StatementHandler) ReflectUtil.getFieldValue(handler, "delegate");  
        final BoundSql boundSql = delegate.getBoundSql();  
        final Object obj = boundSql.getParameterObject();  
        if (obj instanceof PageUtil) {  
            final PageUtil page = (PageUtil) obj;  
            final String sql = boundSql.getSql();  
            final String pageSql = this.getPageSql(page, sql);  
            ReflectUtil.setFieldValue(boundSql, "sql", pageSql); 
        }
        return invocation.proceed();  
	}

	/** 
     * 根据page对象获取对应的分页查询Sql语句，这里只做了两种数据库类型，Mysql和Oracle 其它的数据库都 没有进行分页 
     *  
     * @param page 
     *            分页对象 
     * @param sql 
     *            原sql语句 
     * @return 
     */  
    private String getPageSql(PageUtil page, String sql) {  
        if(dataBaseType == null){
			throw new RuntimeException("在数据连接配置文件中的方言属性的值没有定义");
		}
        switch(dataBaseType){
        	case MYSQL:
        		this.dialect = new MySqlDialect();
        		break;
        	case ORACLE:
        		this.dialect = new OracleDialect();
        		break;
			default:
				break;
        }
        return dialect.getLimitStr(sql, page.getPageIndex(), page.getPageSize());
    }  
}
