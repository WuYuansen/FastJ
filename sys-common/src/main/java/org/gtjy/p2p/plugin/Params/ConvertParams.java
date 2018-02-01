package org.gtjy.p2p.plugin.Params;

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
import org.gtjy.p2p.plugin.Paging.ReflectUtil;


/**
 * 
 * <p> Title:实现ibatis Interceptor接口实现查询参数类型转换 </p>
 * <p> Description: </p>
 * <p> Copyright: Copyright (c) 2014 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
@Intercepts({ @Signature(method = "prepare", type = StatementHandler.class, args = { Connection.class }) })
public class ConvertParams implements Interceptor {
	private final static Logger log= Logger.getLogger(ConvertParams.class);
	@Override
	public Object intercept(Invocation invocation) throws Throwable {
		final RoutingStatementHandler handler = (RoutingStatementHandler) invocation.getTarget();
		final StatementHandler delegate = (StatementHandler) ReflectUtil.getFieldValue(handler, "delegate");
		final BoundSql boundSql = delegate.getBoundSql();
		@SuppressWarnings("unused")
		final Object obj = boundSql.getParameterObject();
		return null;
	}

	@Override
	public Object plugin(Object target) {
		return Plugin.wrap(target, this);
	}

	@Override
	public void setProperties(Properties properties) {
		log.info("myBatis 拦截器加载,执行查询数据转换!!! 主要是Date <> TimeStamp");
	}

}
