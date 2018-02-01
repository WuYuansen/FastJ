package com.gtjy.p2p.modules.tiles.sys;

import java.util.List;
import java.util.Map;

import org.gtjy.p2p.plugin.Paging.PageUtil;

import com.gtjy.p2p.modules.sys.dto.Logs;


/**
 * 
 * IUser 测试
 * 
 * 2015年5月20日 上午11:13:31
 * @author：wys
 * @version 1.0.0
 *
 */
public interface ILogs {
    /**
     * 
     * selectAll(查询所有)
     * (这里描述这个方法适用条件 – 可选)
     * @return 
     * @return List
     * @exception 
     * @version  1.0.0
     */
    public List<Logs> selectAll(Map<String,Object> map);
    
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
    public List<Logs> selectByPaging(PageUtil pageUtil);
    
    /**
     * 
     * delete(删除)
     * (这里描述这个方法适用条件 – 可选)
     * @param dto 
     * @return void
     * @exception 
     * @version  1.0.0
     */
    public boolean delete(Logs dto);
    
    /**
     * 
     * update(修改)
     * (这里描述这个方法适用条件 – 可选)
     * @param dto 
     * @return void
     * @exception 
     * @version  1.0.0
     */
    public boolean update(Logs dto);
    
    /**
     * 
     * insert(新增)
     * (这里描述这个方法适用条件 – 可选)
     * @param dto 
     * @return void
     * @exception 
     * @version  1.0.0
     */
    public boolean insert(Logs dto);
    
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
    public Logs get(Object code);
}
