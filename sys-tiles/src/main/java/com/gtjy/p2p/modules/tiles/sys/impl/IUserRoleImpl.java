package com.gtjy.p2p.modules.tiles.sys.impl;

import java.util.List;
import java.util.Map;

import org.gtjy.p2p.plugin.Paging.PageUtil;
import org.gtjy.p2p.security.authentication.Authentication;
import org.gtjy.p2p.web.springMVC.webframe.web.springmvc.exception.BoException;
import org.gtjy.p2p.web.springMVC.webframe.web.springmvc.exception.ControllerException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.gtjy.p2p.modules.sys.DAO.UserRoleDAO;
import com.gtjy.p2p.modules.sys.dto.User;
import com.gtjy.p2p.modules.sys.dto.UserRole;
import com.gtjy.p2p.modules.tiles.sys.IUserRole;

/**
 * 
 * <p> Title:Yhjs 实现</p>
 * <p> Description:  用户角色表</p>
 * <p> Copyright: Copyright (c) 2013 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */

@Component
public class IUserRoleImpl  implements IUserRole  {
	
	@Autowired
    private UserRoleDAO<UserRole> DAO;
        
    public UserRoleDAO<UserRole> getDAO() {
        return DAO;
    }
    
    /** =========================== 数据库操作 ==================================== **/
    /**
     * 
     * selectAll(查询所有)
     * (这里描述这个方法适用条件 – 可选)
     * @return 
     * @return List
     * @exception 
     * @version  1.0.0
     */
    @Override
    @Authentication/*(requiredPre="USERROLE_FIND")*/
    public List<UserRole> selectAll(Map<String,Object> map) {
        List<UserRole> s = null;
        try {
            s = DAO.selectByMap(map);
        } catch (BoException e) {
            throw new ControllerException(e.getMessage());
        }
        return s;
    }

    /**
     * 
     * selectTotal(查询总条数)
     * (这里描述这个方法适用条件 – 可选)
     * @param map
     * @return 
     * @return Integer
     * @exception 
     * @version  1.0.0
     */
    @Override
    @Authentication/*(requiredPre="USERROLE_FIND")*/
    public Integer selectTotal(Map<String, Object> map) {
        Integer total = 0; 
        try {
            total = DAO.selectByMapCount(map);
        } catch (BoException e) {
            throw new ControllerException(e.getMessage());
        }
        return total;
    }

    /**
     * 
     * selectByPaging(分页查询)
     * (这里描述这个方法适用条件 – 可选)
     * @param pageUtil
     * @return 
     * @return List<YhjsDTO>
     * @exception 
     * @version  1.0.0
     */
    @Override
    @Authentication/*(requiredPre="USERROLE_FIND")*/
    public List<UserRole> selectByPaging(PageUtil pageUtil) {
        List<UserRole> pagingList = null;
        try {
            pagingList = DAO.selectByMapPaging(pageUtil);
        } catch (BoException e) {
            throw new ControllerException(e.getMessage());
        }
        return pagingList;
    }

    /**
     * 
     * delete(删除)
     * (这里描述这个方法适用条件 – 可选)
     * @param dto 
     * @return void
     * @exception 
     * @version  1.0.0
     */
    @Override
    @Authentication/*(requiredPre="USERROLE_DELETED")*/
    public boolean delete(UserRole dto) {
        boolean flag = false;
        try {
            if(DAO.deleteByPrimaryKey(dto) > 0)
                flag = true;
            else 
                flag = false;
        } catch (BoException e) {
            throw new ControllerException(e.getMessage());
        }
        return flag;
    }

    /**
     * 
     * update(修改)
     * (这里描述这个方法适用条件 – 可选)
     * @param dto 
     * @return void
     * @exception 
     * @version  1.0.0
     */
    @Override
    @Authentication/*(requiredPre="USERROLE_EDIT")*/
    public boolean update(UserRole dto) {
        boolean flag = false;
        try {
            if(DAO.updateByPrimaryKey(dto) > 0)
                flag = true;
            else 
                flag = false;
        } catch (BoException e) {
            throw new ControllerException(e.getMessage());
        }
        return flag;
    }

    /**
     * 
     * insert(新增)
     * (这里描述这个方法适用条件 – 可选)
     * @param dto 
     * @return void
     * @exception 
     * @version  1.0.0
     */
    @Override
    @Authentication/*(requiredPre="USERROLE_SAVE")*/
    public boolean insert(UserRole dto) {
        boolean flag = false;
        try {
			int rows = DAO.insert(dto);
			if(rows > 0){
				flag=true;
			}
		} catch (BoException e) {
			e.printStackTrace();
		}
        return flag;
    }

    @Override
    @Authentication/*(requiredPre="USERROLE_FIND")*/
    public UserRole get(Object code) {
        UserRole dto = null;
        try {
            dto = DAO.selectByPrimaryKey(code);
        } catch (BoException e) {
            throw new ControllerException(e.getMessage());
        }
        return dto;
    }

	@Override
	@Authentication/*(requiredPre="USERROLE_DELETE")*/
	public Integer deleteUserCode(Long usercode) throws BoException {
		// TODO Auto-generated method stub
		return DAO.deleteUserCode(usercode);
	}

	@Override
	@Authentication/*(requiredPre="USERROLE_SAVE")*/
	public Integer insertRoleUser(List<UserRole> userRole) throws BoException {
		// TODO Auto-generated method stub
		return DAO.insertRoleUser(userRole);
	}

	@Override
	@Authentication
	public List<User> selectUserByRoleCode(Long rolecode){
		return DAO.selectUserByRoleCode(rolecode);
	}
	
	@Override
	@Authentication
	public List<User> selectUserNotHavaRoleByRoleCode(Map<String,Object> map){
		return DAO.selectUserNotHavaRoleByRoleCode(map);
	}
    
	@Override
	@Authentication
	public Integer deleteUserRoleByUserCodeAndRoleCode(Map<String,Object> map){
		return DAO.deleteUserRoleByUserCodeAndRoleCode(map);
	}
    /** =========================== 存储过程操作 ==================================== **/
}