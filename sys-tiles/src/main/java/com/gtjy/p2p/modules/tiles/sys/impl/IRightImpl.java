package com.gtjy.p2p.modules.tiles.sys.impl;

import java.util.List;
import java.util.Map;

import org.gtjy.p2p.plugin.Paging.PageUtil;
import org.gtjy.p2p.security.authentication.Authentication;
import org.gtjy.p2p.web.springMVC.webframe.web.springmvc.exception.BoException;
import org.gtjy.p2p.web.springMVC.webframe.web.springmvc.exception.ControllerException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.gtjy.p2p.modules.sys.DAO.RightDAO;
import com.gtjy.p2p.modules.sys.dto.Right;
import com.gtjy.p2p.modules.tiles.sys.IRight;

/**
 * 
 * <p> Title:Qx 实现</p>
 * <p> Description:  系统权限表</p>
 * <p> Copyright: Copyright (c) 2013 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */

@Component
public class IRightImpl  implements IRight  {
	
	@Autowired
    private RightDAO<Right> DAO;
        
    public RightDAO<Right> getDAO() {
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
    @Authentication(requiredPre="RIGHT_FIND")
    public List<Right> selectAll(Map<String,Object> map) {
        List<Right> s = null;
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
    @Authentication(requiredPre="RIGHT_FIND")
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
     * @return List<Right>
     * @exception 
     * @version  1.0.0
     */
    @Override
    @Authentication(requiredPre="RIGHT_FIND")
    public List<Right> selectByPaging(PageUtil pageUtil) {
        List<Right> pagingList = null;
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
    @Authentication(requiredPre="RIGHT_DELETED")
    public boolean delete(Right dto) {
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
    @Authentication(requiredPre="RIGHT_EDIT")
    public boolean update(Right dto) {
        boolean flag = false;
        try {
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
    @Authentication(requiredPre="RIGHT_SAVE")
    public boolean insert(Right dto) {
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
    @Authentication(requiredPre="RIGHT_FIND")
    public Right get(Object code) {
        Right dto = null;
        try {
            dto = DAO.selectByPrimaryKey(code);
        } catch (BoException e) {
            throw new ControllerException(e.getMessage());
        }
        return dto;
    }
    
    @Override
    @Authentication
    public List<String> findSourceParent(String usercode){
    	return DAO.findSourceParent(usercode);
    }
    
    @Override
    @Authentication
    public List<Right> findRightByUserCode(String usercode){
    	return DAO.findRightByUserCode(usercode);
    }

	@Override
	@Authentication(requiredPre="RIGHT_FIND")
	public List<String> findSourceByRole(String roleId) {
		return DAO.findSourceByRole(roleId);
	}
}