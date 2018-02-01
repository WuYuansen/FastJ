package com.gtjy.p2p.modules.tiles.sys.impl;

import java.util.List;
import java.util.Map;

import org.gtjy.p2p.plugin.Paging.PageUtil;
import org.gtjy.p2p.security.CipherUtil;
import org.gtjy.p2p.security.authentication.Authentication;
import org.gtjy.p2p.util.MapUtil;
import org.gtjy.p2p.util.StringUtils;
import org.gtjy.p2p.web.springMVC.webframe.web.springmvc.exception.BoException;
import org.gtjy.p2p.web.springMVC.webframe.web.springmvc.exception.ControllerException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.gtjy.p2p.modules.sys.DAO.UserDAO;
import com.gtjy.p2p.modules.sys.dto.User;
import com.gtjy.p2p.modules.tiles.sys.IUser;

/**
 * 
 * <p> Title:Ygxx 实现</p>
 * <p> Description:  记录部门员工的信息</p>
 * <p> Copyright: Copyright (c) 2013 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */

@Component
public class IUserImpl  implements IUser  {
	
	@Autowired
    private UserDAO<User> DAO;
        
    public UserDAO<User> getDAO() {
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
    @Authentication(requiredPre="USER_FIND")
    public List<User> selectAll(Map<String,Object> map) {
        List<User> s = null;
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
    @Authentication(requiredPre="USER_FIND")
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
     * @return List<YgxxDTO>
     * @exception 
     * @version  1.0.0
     */
    @Override
    @Authentication(requiredPre="USER_FIND")
    public List<User> selectByPaging(PageUtil pageUtil) {
        List<User> pagingList = null;
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
    @Authentication(requiredPre="USER_DELETED")
    public boolean delete(User dto) {
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
    @Authentication/*(requiredPre="USER_EDIT")*/
    public boolean update(User dto) {
        boolean flag = false;
        try {
            if(!StringUtils.isEmpty(dto.getPassword())) {
                dto.setPassword(CipherUtil.generatePassword(dto.getPassword()));
            }
            if(DAO.updateBySelective(dto) > 0)
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
    @Authentication(requiredPre="USER_SAVE")
    public boolean insert(User dto) {
        boolean flag = false;
        try {
            dto.setPassword(CipherUtil.generatePassword(dto.getPassword()));
            if(DAO.insert(dto) > 0)
                flag = true;
            else 
                flag = false;
        } catch (BoException e) {
            throw new ControllerException(e.getMessage());
        }
        return flag;
    }

    @Override
    @Authentication/*(requiredPre="USER_FIND")*/
    public User get(Object code) {
        User dto = null;
        try {
            dto = DAO.selectByPrimaryKey(code);
        } catch (BoException e) {
            throw new ControllerException(e.getMessage());
        }
        return dto;
    }
    
    @Override
    @Authentication
    public User validateUserName(String userName) {
        User dto = null;
        try {
            dto = DAO.validateUserName(userName);
        } catch (BoException e) {
            throw new ControllerException(e.getMessage());
        }
        return dto;
    }

    @Override
    @Authentication
    public User validateUserNameAndPwd(String userName, String pwd) {
        User dto = null;
        try {
            Map<String,Object> map = MapUtil.newHashMap();
            map.put("loginname", userName);
            map.put("password", pwd);
            dto = DAO.validateUserNameAndPwd(map);
        } catch (BoException e) {
            throw new ControllerException(e.getMessage());
        }
        return dto;
    }
    
    /** =========================== 存储过程操作 ==================================== **/
}