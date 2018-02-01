package org.gtjy.p2p.plugin.Paging;

/**
 * 
 * <p> Title: Oracle 分页处理</p>
 * <p> Description: </p>
 * <p> Copyright: Copyright (c) 2013 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
public class OracleDialect extends DBDialect {

	@Override
	public String getLimitStr(String sql, int start, int limit) {
		StringBuilder pageSql = new StringBuilder(200);
		pageSql.append("select * from ( select temp.*, rownum row_id from ( ");
		pageSql.append(sql);
		pageSql.append(" ) temp where rownum <= ").append(start+limit);
		pageSql.append(") where row_id > ").append(start);
		return pageSql.toString();
	}

}
