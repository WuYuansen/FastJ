package com.gtjy.p2p.modules.tiles.sys.impl;

import java.util.List;
import java.util.Map;

import org.gtjy.p2p.plugin.Paging.PageUtil;
import org.gtjy.p2p.security.authentication.Authentication;
import org.gtjy.p2p.web.springMVC.webframe.web.springmvc.exception.BoException;
import org.gtjy.p2p.web.springMVC.webframe.web.springmvc.exception.ControllerException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.gtjy.p2p.modules.sys.DAO.LogsDAO;
import com.gtjy.p2p.modules.sys.dto.Logs;
import com.gtjy.p2p.modules.tiles.sys.ILogs;

/**
 * 
 * <p> Title:Rz 实现</p>
 * <p> Description:  系统日志表</p>
 * <p> Copyright: Copyright (c) 2013 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */

@Component
public class ILogsImpl  implements ILogs  {
	
	@Autowired
    private LogsDAO<Logs> DAO;
        
    public LogsDAO<Logs> getDAO() {
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
     * 
     * (requiredPre="LOG_FIND")
     */
    @Override
    @Authentication
    public List<Logs> selectAll(Map<String,Object> map) {
        List<Logs> s = null;
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
     * (requiredPre="LOG_FIND")
     */
    @Override
    @Authentication
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
     * @return List<Logs>
     * @exception 
     * @version  1.0.0
     * (requiredPre="LOG_FIND")
     */
    @Override
    @Authentication
    public List<Logs> selectByPaging(PageUtil pageUtil) {
        List<Logs> pagingList = null;
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
     * 
     * (requiredPre="LOG_DELETED")
     */
    @Override
    @Authentication
    public boolean delete(Logs dto) {
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
     * (requiredPre="LOG_EDIT")
     */
    @Override
    @Authentication
    public boolean update(Logs dto) {
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
     * 
     * (requiredPre="LOG_SAVE")
     */
    @Override
    @Authentication
    public boolean insert(Logs dto) {
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

    /**
     * (requiredPre="LOG_FIND")
     * */
    @Override
    @Authentication
    public Logs get(Object code) {
        Logs dto = null;
        try {
            dto = DAO.selectByPrimaryKey(code);
        } catch (BoException e) {
            throw new ControllerException(e.getMessage());
        }
        return dto;
    }
    
    /** =========================== 存储过程操作 ==================================== **/
}