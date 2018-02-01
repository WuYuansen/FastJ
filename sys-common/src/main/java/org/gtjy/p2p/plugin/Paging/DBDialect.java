package org.gtjy.p2p.plugin.Paging;

/**
 * 
 * <p> Title: 数据库类型</p>
 * <p> Description: </p>
 * <p> Copyright: Copyright (c) 2013 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
public abstract class DBDialect {
	
	public abstract String getLimitStr(String sql,int start,int limit);
	
	public static enum Type{
		MYSQL,ORACLE,SQLSERVER;
	}
}
