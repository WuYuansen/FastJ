package org.gtjy.p2p.web.base;


/**
 * 
 * <p> Title: 核心业务逻辑访问</p>
 * <p> Description: </p>
 * <p> Copyright: Copyright (c) 2013 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
public interface BaseService{
	
	/**
	 * 
	 * @param method 方法名
	 * @param paramter 参数
	 * @param RowBoundstr 分页
	 * @return
	 * @throws Exception
	 */
	public String perform(String method, String paramter)throws Exception;
}
