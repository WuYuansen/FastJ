package ${classPath1}.impl;

import java.util.List;
import java.util.Map;

import org.gtjy.p2p.plugin.Paging.PageUtil;
import org.gtjy.p2p.web.springMVC.webframe.web.springmvc.exception.BoException;
import org.gtjy.p2p.web.springMVC.webframe.web.springmvc.exception.ControllerException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import ${classPath}.DAO.${className}DAO;
import ${classPath}.dto.${className}DTO;
import ${classPath1}.interfaces.I${className};

/**
 * 
 * <p> Title:${className} 实现</p>
 * <p> Description:  ${codeName}</p>
 * <p> Copyright: Copyright (c) 2013 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */

@Component
public class I${className}Impl  implements I${className}  {
	
	@Autowired
    private ${className}DAO<${className}DTO> DAO;
        
    public ${className}DAO<${className}DTO> getDAO() {
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
    public List<${className}DTO> selectAll(Map<String,Object> map) {
        List<${className}DTO> s = null;
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
     * @return List<${className}DTO>
     * @exception 
     * @version  1.0.0
     */
    @Override
    public List<${className}DTO> selectByPaging(PageUtil pageUtil) {
        List<${className}DTO> pagingList = null;
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
    public boolean delete(${className}DTO dto) {
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
    public boolean update(${className}DTO dto) {
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
    public boolean insert(${className}DTO dto) {
        boolean flag = false;
        try {
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
    public ${className}DTO get(Object code) {
        ${className}DTO dto = null;
        try {
            dto = DAO.selectByPrimaryKey(code);
        } catch (BoException e) {
            throw new ControllerException(e.getMessage());
        }
        return dto;
    }
    
    /** =========================== 存储过程操作 ==================================== **/
}