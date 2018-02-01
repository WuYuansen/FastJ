package com.gtjy.p2p.modules.sys.DAO;

import java.util.Map;

import org.gtjy.p2p.web.base.IBaseMapper;
/**
 * 
 * <p> Title: Bmxx Mapper</p>
 * <p> Description: 部门信息 </p>
 * <p> Copyright: Copyright (c) 2013 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */

public interface DeptDAO<T> extends IBaseMapper<T> {
	/**
	 * 查找最大层级编号
	 * @param map
	 * @return
	 */
	String findCJ(Map<String,Object> map);
	
}
