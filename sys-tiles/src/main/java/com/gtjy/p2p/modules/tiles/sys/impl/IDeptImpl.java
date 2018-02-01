package com.gtjy.p2p.modules.tiles.sys.impl;

import java.util.List;
import java.util.Map;

import org.gtjy.p2p.plugin.Paging.PageUtil;
import org.gtjy.p2p.security.authentication.Authentication;
import org.gtjy.p2p.web.springMVC.webframe.web.springmvc.exception.BoException;
import org.gtjy.p2p.web.springMVC.webframe.web.springmvc.exception.ControllerException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.gtjy.p2p.modules.sys.DAO.DeptDAO;
import com.gtjy.p2p.modules.sys.dto.Dept;
import com.gtjy.p2p.modules.tiles.sys.IDept;

/**
 * 
 * <p> Title:Bmxx 实现</p>
 * <p> Description:  部门信息</p>
 * <p> Copyright: Copyright (c) 2013 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */

@Component
public class IDeptImpl  implements IDept  {
	
	@Autowired
    private DeptDAO<Dept> DAO;
        
    public DeptDAO<Dept> getDAO() {
        return DAO;
    }
    
    /** =========================== 数据库操作 ==================================== **/
    /**
     *  
     * selectAll(查询所有)  requiredPre="DEPT_FIND"
     * (这里描述这个方法适用条件 – 可选)
     * @return 
     * @return List
     * @exception 
     * @version  1.0.0
     */
    @Override
    @Authentication(requiredPre="DEPT_FIND")
    public List<Dept> selectAll(Map<String,Object> map) {
        List<Dept> s = null;
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
    @Authentication(requiredPre="DEPT_FIND")
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
     * @return List<Dept>
     * @exception 
     * @version  1.0.0
     */
    @Override
    @Authentication(requiredPre="DEPT_FIND")
    public List<Dept> selectByPaging(PageUtil pageUtil) {
        List<Dept> pagingList = null;
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
    @Authentication(requiredPre="DEPT_DELETED")
    public boolean delete(Dept dto) {
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
    @Authentication(requiredPre="DEPT_EDIT")
    public boolean update(Dept dto) {
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
    @Authentication(requiredPre="DEPT_SAVE")
    public boolean insert(Dept dto) {
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
    @Authentication/*(requiredPre="DEPT_FIND")*/
    public Dept get(Object code) {
        Dept dto = null;
        try {
            dto = DAO.selectByPrimaryKey(code);
        } catch (BoException e) {
            throw new ControllerException(e.getMessage());
        }
        return dto;
    }

//	@Override
//	 @Authentication(requiredPre="BMGL_CX")
//	public List<ZTree> getTree(Map<String, Object> map)throws Exception{
//		List<ZTree> trees = new ArrayList<ZTree>();
//		
//		List<Dept> dtos = new ArrayList<Dept>();
//		map.put("sjbm", "0");
//		dtos = DAO.selectByMap(map);
//		for (Dept d : dtos) {
//			ZTree tree = new ZTree();
//			tree.setId(d.getBmid());
//			tree.setName(d.getBmmc());
//			tree.setChildren(getNodes(d.getBmid()));
//			trees.add(tree);
//		}
//		return trees;
//	}
//	@Authentication(requiredPre="BMGL_CX")
//	public List<ZTree> getNodes(int code) throws Exception{
//		List<ZTree> trees = new ArrayList<ZTree>();
//		Map<String, Object> map = new HashMap<String, Object>();
//		map.put("sjbm", code);
//		List<Dept> dtos = new ArrayList<Dept>();
//		dtos = DAO.selectByMap(map);
//		for (Dept d:dtos) {
//			ZTree tree = new ZTree();
//			tree.setId(d.getBmid());
//			tree.setName(d.getBmmc());
//			tree.setpId(code);
//			map.put("sjbm", d.getBmid());
//			List<Dept> dtos2 = DAO.selectByMap(map);
//			if(!dtos2.isEmpty()){
//				tree.setChildren(getNodes(d.getBmid()));
//			}
//			trees.add(tree);
//		}
//		return trees;
//	}

	@Override
	@Authentication(requiredPre="DEPT_FIND")
	public String findCJ(Map<String, Object> map) {
		return DAO.findCJ(map);
	}
	
    /** =========================== 存储过程操作 ==================================== **/
}