package com.gtjy.p2p.modules.sys.DAO;


import java.util.List;
import java.util.Map;

import org.gtjy.p2p.web.base.IBaseMapper;
import org.gtjy.p2p.web.springMVC.webframe.web.springmvc.exception.BoException;

import com.gtjy.p2p.modules.sys.dto.User;
import com.gtjy.p2p.modules.sys.dto.UserRole;
/**
 * 
 * <p> Title: Yhjs Mapper</p>
 * <p> Description: 用户角色表 </p>
 * <p> Copyright: Copyright (c) 2013 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */

public interface UserRoleDAO<T> extends IBaseMapper<T> {
	public Integer deleteUserCode(Long usercode) throws BoException;
    public Integer insertRoleUser(List<UserRole> userRole) throws BoException;
	public Integer deleteByJsId(Long jsid);
	
	public Integer deleteUserRoleByUserCodeAndRoleCode(Map<String,Object> map);
	
	public List<User> selectUserByRoleCode(Long rolecode);
	public List<User> selectUserNotHavaRoleByRoleCode(Map<String,Object> map);//Long rolecode,Long deptCode
}
