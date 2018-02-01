package com.gtjy.p2p.modules.tiles.sys.impl;

import java.util.List;
import java.util.Map;

import org.gtjy.p2p.model.Tree;
import org.gtjy.p2p.plugin.Paging.PageUtil;
import org.gtjy.p2p.security.authentication.Authentication;
import org.gtjy.p2p.web.springMVC.webframe.web.springmvc.exception.BoException;
import org.gtjy.p2p.web.springMVC.webframe.web.springmvc.exception.ControllerException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.gtjy.p2p.modules.sys.DAO.RoleRightDAO;
import com.gtjy.p2p.modules.sys.dto.RoleRight;
import com.gtjy.p2p.modules.tiles.sys.IRoleRight;

/**
 * 
 * <p> Title:Jsqx 实现</p>
 * <p> Description:  角色权限表</p>
 * <p> Copyright: Copyright (c) 2013 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */

@Component
public class IRoleRightImpl  implements IRoleRight  {
	
	@Autowired
    private RoleRightDAO<RoleRight> DAO;
        
    public RoleRightDAO<RoleRight> getDAO() {
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
    @Authentication(requiredPre="ROLERIGHT_FIND")
    public List<RoleRight> selectAll(Map<String,Object> map) {
        List<RoleRight> s = null;
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
    @Authentication(requiredPre="ROLERIGHT_FIND")
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
     * @return List<RoleRight>
     * @exception 
     * @version  1.0.0
     */
    @Override
    @Authentication(requiredPre="ROLERIGHT_FIND")
    public List<RoleRight> selectByPaging(PageUtil pageUtil) {
        List<RoleRight> pagingList = null;
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
    @Authentication(requiredPre="ROLERIGHT_DELETED")
    public boolean delete(RoleRight dto) {
        boolean flag = false;
        try {
            if(DAO.deleteByEntity(dto) > 0)
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
    @Authentication(requiredPre="ROLERIGHT_EDIT")
    public boolean update(RoleRight dto) {
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
    @Authentication()/*ROLERIGHT_SAVE*/
    public boolean insert(RoleRight dto) {
        boolean flag = false;
        try {
//            DAO.deleteByJsId(dto.getRoleid());
//            Integer i = 0;
//            if(!StringUtils.isEmpty(dto.getRightid())) {
//                for(String s : StringUtils.StringToList(dto.getRightid(), ",")) {
//                    dto.getRightid(s);
                    /*i = */DAO.insert(dto);
//                }
//            }else {
//                i = 1;
//            }
//            if(i > 0)
                flag = true;
//            else 
//                flag = false;
        } catch (BoException e) {
            throw new ControllerException(e.getMessage());
        }
        return flag;
    }

    @Override
    @Authentication(requiredPre="ROLERIGHT_FIND")
    public RoleRight get(Object code) {
        RoleRight dto = null;
        try {
            dto = DAO.selectByPrimaryKey(code);
        } catch (BoException e) {
            throw new ControllerException(e.getMessage());
        }
        return dto;
    }

	@Override
	@Authentication
	public Integer deleteByJsId(Long jsId) throws BoException {
		return DAO.deleteByJsId(jsId);
	}

	@Override
	@Authentication
	public Integer insertBatch(List<RoleRight> roleRight) throws BoException {
		return DAO.insertBatch(roleRight);
	}

	@Override
	@Authentication
	public List<Tree> authorizationModular(Map<?, ?> map) throws BoException {
		return DAO.authorizationModular(map);
	}

	@Override
	@Authentication
	public List<Tree> queryRightByModular(Map<String, Object> map) throws BoException {
		return DAO.queryRightByModular(map);
	}
    
    /** =========================== 存储过程操作 ==================================== **/
}