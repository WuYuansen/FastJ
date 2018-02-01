package ${classPath1}.interfaces;

import java.util.List;
import java.util.Map;

import org.gtjy.p2p.plugin.Paging.PageUtil;

import ${classPath}.DTO.${className}DTO;

/**
 * 
 * IUser 测试
 * 
 * 2015年5月20日 上午11:13:31
 * @author：wys
 * @version 1.0.0
 *
 */
public interface I${className} {
    /**
     * 
     * selectAll(查询所有)
     * (这里描述这个方法适用条件 – 可选)
     * @return 
     * @return List
     * @exception 
     * @version  1.0.0
     */
    public List<${className}DTO> selectAll(Map<String,Object> map);
    
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
    public List<${className}DTO> selectByPaging(PageUtil pageUtil);
    
    /**
     * 
     * delete(删除)
     * (这里描述这个方法适用条件 – 可选)
     * @param dto 
     * @return void
     * @exception 
     * @version  1.0.0
     */
    public boolean delete(${className}DTO dto);
    
    /**
     * 
     * update(修改)
     * (这里描述这个方法适用条件 – 可选)
     * @param dto 
     * @return void
     * @exception 
     * @version  1.0.0
     */
    public boolean update(${className}DTO dto);
    
    /**
     * 
     * insert(新增)
     * (这里描述这个方法适用条件 – 可选)
     * @param dto 
     * @return void
     * @exception 
     * @version  1.0.0
     */
    public boolean insert(${className}DTO dto);
    
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
    public ${className}DTO get(Object code);
}
