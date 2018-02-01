package org.gtjy.p2p.plugin.Paging;

/**
 * 
 * <p> Title: MySql 分页处理</p>
 * <p> Description: </p>
 * <p> Copyright: Copyright (c) 2013 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
public class MySqlDialect extends DBDialect {

	@Override
	public String getLimitStr(String sql, int start, int limit) {
		sql = sql.trim();
		StringBuffer pagingSelect = new StringBuffer(sql);
		pagingSelect.append(" limit ").append(start).append(",").append(limit);  
		return pagingSelect.toString();
	}

}
