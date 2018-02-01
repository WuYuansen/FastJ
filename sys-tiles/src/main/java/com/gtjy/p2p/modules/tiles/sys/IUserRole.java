package com.gtjy.p2p.modules.tiles.sys;

import java.util.List;
import java.util.Map;

import org.gtjy.p2p.plugin.Paging.PageUtil;
import org.gtjy.p2p.web.springMVC.webframe.web.springmvc.exception.BoException;

import com.gtjy.p2p.modules.sys.dto.User;
import com.gtjy.p2p.modules.sys.dto.UserRole;

/**
 * 
 * IUser 测试
 * 
 * 2015年5月20日 上午11:13:31
 * @author：wys
 * @version 1.0.0
 *
 */
public interface IUserRole {
    /**
     * 
     * selectAll(查询所有)
     * (这里描述这个方法适用条件 – 可选)
     * @return 
     * @return List
     * @exception 
     * @version  1.0.0
     */
    public List<UserRole> selectAll(Map<String,Object> map);
    
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
    public Integer selectTotal(Map<String,Object> map);
    
    /**
     * 
     * selectByPaging(分页查询)
     * (这里描述这个方法适用条件 – 可选)
     * @param pageUtil
     * @return 
     * @return List<UserDTO>
     * @exception 
     * @version  1.0.0
     */
    public List<UserRole> selectByPaging(PageUtil pageUtil);
    
    /**
     * 
     * delete(删除)
     * (这里描述这个方法适用条件 – 可选)
     * @param dto 
     * @return void
     * @exception 
     * @version  1.0.0
     */
    public boolean delete(UserRole dto);
    
    /**
     * 
     * update(修改)
     * (这里描述这个方法适用条件 – 可选)
     * @param dto 
     * @return void
     * @exception 
     * @version  1.0.0
     */
    public boolean update(UserRole dto);
    
    /**
     * 
     * insert(新增)
     * (这里描述这个方法适用条件 – 可选)
     * @param dto 
     * @return void
     * @exception 
     * @version  1.0.0
     */
    public boolean insert(UserRole dto);
    
    /**
     * 
     * get(获取单个对象)
     * (这里描述这个方法适用条件 – 可选)
     * @param code
     * @return 
     * @return UserDTO
     * @exception 
     * @version  1.0.0
     */
    public UserRole get(Object code);
    
    public Integer deleteUserCode(Long usercode) throws BoException;
    public Integer insertRoleUser(List<UserRole> userRole) throws BoException;
    
    /**
     * @方法名: selectUserByRoleCode
     * @方法说明: 查询指定角色下所有用户
     * @param rolecode
     * @return: List<User>
     */
    public List<User> selectUserByRoleCode(Long rolecode);
    public List<User> selectUserNotHavaRoleByRoleCode(Map<String,Object> map);
    
    public Integer deleteUserRoleByUserCodeAndRoleCode(Map<String,Object> map);
}
