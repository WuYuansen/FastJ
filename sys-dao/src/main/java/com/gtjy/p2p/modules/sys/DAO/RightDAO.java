package com.gtjy.p2p.modules.sys.DAO;

import java.util.List;

import org.gtjy.p2p.web.base.IBaseMapper;

import com.gtjy.p2p.modules.sys.dto.Right;
/**
 * 
 * <p> Title: Qx Mapper</p>
 * <p> Description: 系统权限表 </p>
 * <p> Copyright: Copyright (c) 2013 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */

public interface RightDAO<T> extends IBaseMapper<T> {
	
	public List<String> findSourceParent(String usercode);
	public List<String> findSourceByRole(String roleId);
	public List<Right> findRightByUserCode(String usercode);
}
