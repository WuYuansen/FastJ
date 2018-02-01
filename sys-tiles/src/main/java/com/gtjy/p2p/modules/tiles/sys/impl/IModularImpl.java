package com.gtjy.p2p.modules.tiles.sys.impl;

import java.util.List;
import java.util.Map;

import org.gtjy.p2p.plugin.Paging.PageUtil;
import org.gtjy.p2p.security.authentication.Authentication;
import org.gtjy.p2p.util.MapUtil;
import org.gtjy.p2p.util.StringUtils;
import org.gtjy.p2p.web.springMVC.webframe.web.springmvc.exception.BoException;
import org.gtjy.p2p.web.springMVC.webframe.web.springmvc.exception.ControllerException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.gtjy.p2p.modules.sys.DAO.ModularDAO;
import com.gtjy.p2p.modules.sys.dto.Modular;
import com.gtjy.p2p.modules.tiles.sys.IModular;

/**
 * 
 * <p> Title:Mkxx 实现</p>
 * <p> Description:  模块信息</p>
 * <p> Copyright: Copyright (c) 2013 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */

@Component
public class IModularImpl  implements IModular  {
	
	@Autowired
    private ModularDAO<Modular> DAO;
        
    public ModularDAO<Modular> getDAO() {
        return DAO;
    }
    
    /** =========================== 数据库操作 ==================================== **/
    /**
     * 
     * selectAll(查询所有) requiredPre="MENU_FIND"
     * (这里描述这个方法适用条件 – 可选)
     * @return 
     * @return List
     * @exception 
     * @version  1.0.0
     */
    @Override
    @Authentication()
    public List<Modular> selectAll(Map<String,Object> map) {
        List<Modular> s = null;
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
    @Authentication(requiredPre="MENU_FIND")
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
     * @return List<MkxxDTO>
     * @exception 
     * @version  1.0.0
     */
    @Override
    @Authentication(requiredPre="MENU_FIND")
    public List<Modular> selectByPaging(PageUtil pageUtil) {
        List<Modular> pagingList = null;
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
    @Authentication(requiredPre="MENU_DELETED")
    public boolean delete(Modular dto) {
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
    @Authentication(requiredPre="MENU_EDIT")
    public boolean update(Modular dto) {
        boolean flag = false;
        try {
        	if(!StringUtils.isEmpty(dto.getParent_())){
	        	Map<String,Object> map = selectNextCode(dto.getParent_());
	        	dto.setModularcode(map.get("typecodes").toString());
	            dto.setChildren_(map.get("fathertype").toString());
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
    @Authentication(requiredPre="MENU_SAVE")
    public boolean insert(Modular dto) {
        boolean flag = false;
        try {
        	Map<String,Object> map = selectNextCode(dto.getParent_());
        	dto.setModularcode(map.get("typecodes").toString());
            dto.setChildren_(map.get("fathertype").toString());
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
    @Authentication(requiredPre="MENU_FIND")
    public Modular get(Object code) {
    	Modular dto = null;
        try {
            dto = DAO.selectByPrimaryKey(code);
        } catch (BoException e) {
            throw new ControllerException(e.getMessage());
        }
        return dto;
    }

    /** =========================== 存储过程操作 ==================================== **/
    
    /** =========================== 自定义标签调用  ==================================== **/
    @Override
    @Authentication(requiredPre="MENU_FIND")
    public List<Modular> selectParent(){
        List<Modular> dtoList = null;
        try {
            dtoList = DAO.selectParent();
        } catch (BoException e) {
            throw new ControllerException(e.getMessage());
        }
        return dtoList;
    }

    @Override
    @Authentication(requiredPre="MENU_FIND")
    public List<Modular> selectMKByParent(String fl) {
        List<Modular> dtoList = null;
        try {
            dtoList = DAO.selectMKByParent(fl);
        } catch (BoException e) {
            throw new ControllerException(e.getMessage());
        }
        return dtoList;
    }
    
    /**
     * 查询最大节点
     * @param fatherType
     * @return
     * @throws BoException
     */
    @Authentication(requiredPre="MENU_FIND")
    private Map<String, Object> selectNextCode(String fathertype) throws BoException{
        Map<String,Object> resultMap = MapUtil.newHashMap();
        String resultLis = DAO.selectNextCode(fathertype);
        if (resultLis == null) {
            resultLis = "001";
        } else if (resultLis.length() == 3) {
            resultLis = String.valueOf(Integer.valueOf(resultLis) + 1);
            switch (resultLis.length()) {
            case 1:
                resultLis = "00" + resultLis;
                break;
            case 2:
                resultLis = "0" + resultLis;
                break;
            default:
                break;
            }

        } else {
            resultLis = resultLis.substring(resultLis.length() - 3,resultLis.length());
            resultLis = String.valueOf(Integer.valueOf(resultLis) + 1);
            switch (resultLis.length()) {
            case 1:
                resultLis = "00" + resultLis;
                break;
            case 2:
                resultLis = "0" + resultLis;
                break;
            default:
                break;
            }
        }
        resultMap.put("fathertype", resultLis);
        resultMap.put("typecodes", fathertype+resultLis);
        return resultMap;
    }

    @Override
    @Authentication
    public Modular CurrentPosition(String reqPath) {
        try {
        	Modular dto = DAO.CurrentPosition(reqPath);
            return dto;
        } catch (BoException e) {
            e.printStackTrace();
            return null;
        }
    }
    
}