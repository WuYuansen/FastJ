package com.gtjy.p2p.modules.sys.controllers;

import java.beans.IntrospectionException;
import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


import javax.servlet.http.HttpSession;

import org.gtjy.p2p.JSON.ExtResultUtil;
import org.gtjy.p2p.JSON.JSONUtil;
import org.gtjy.p2p.plugin.Paging.PageUtil;
import org.gtjy.p2p.util.BeanToMapUtil;
import org.gtjy.p2p.util.MapUtil;
import org.gtjy.p2p.util.StringUtils;
import org.gtjy.p2p.web.springMVC.webframe.web.springmvc.controller.BaseController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.gtjy.p2p.modules.sys.dto.Modular;
import com.gtjy.p2p.modules.tiles.sys.IModular;


/**
 * 
 * <p> Title:Mkxx Mapper</p>
 * <p> Description:  模块信息</p>
 * <p> Copyright: Copyright (c) 2013 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
@Controller
@RequestMapping("/modular") 
public class ModularController extends BaseController{
	
    @Resource
    private IModular services = null;
    
    /** =========================== 数据库操作 ==================================== **/
    /**
     *  
     * selectAll(加载数据)
     * 
     * @param request
     * @param response
     * @param session
     * @return Object 可以是 JSON 或者 XML
     * @exception 
     * @version  1.0.0
     */
    @RequestMapping(value="data")
    public @ModelAttribute Object selectAll(Modular dto,Integer start,Integer limit,HttpServletRequest request, HttpServletResponse response,
            HttpSession session) {
        ExtResultUtil result = new ExtResultUtil();
        PageUtil pageUt = new PageUtil();
        pageUt.setPageIndex(start);
        pageUt.setPageSize(limit);
    	pageUt.setParams(BeanToMapUtil.convertBean(dto));
        List<Modular> servicesList = services.selectByPaging(pageUt);
        Integer total = services.selectTotal(pageUt.getParams());
        result.setSuccess(Boolean.TRUE);
        result.setList(servicesList);
        result.setTotal(total);
        return result;
    }
    
    @RequestMapping(value="dataAll",method=RequestMethod.GET)
    public @ModelAttribute Object select(Modular dto,HttpServletRequest request, HttpServletResponse response,
            HttpSession session) throws IntrospectionException, IllegalAccessException, InvocationTargetException {
        ExtResultUtil result = new ExtResultUtil();
        List<Modular> servicesList = services.selectAll(BeanToMapUtil.convertBean(dto));
        result.setSuccess(Boolean.TRUE);
        result.setList(servicesList);
        return result;
    }
    
    /**
     *  
     * delete(删除数据)
     * 
     * @param request
     * @param response
     * @param session
     * @return Object 可以是 JSON 或者 XML
     * @throws IOException 
     * @exception 
     * @version  1.0.0
     */
    @SuppressWarnings("all")
    @RequestMapping(value="delete")
    public @ModelAttribute Object delete(HttpServletRequest request, HttpServletResponse response,
            HttpSession session) throws IOException {
    	ExtResultUtil ext = new ExtResultUtil();
    	boolean isSuccess = false;
    	String json = getParam(request);
    	if(json.contains("[")){
	    	List<Map<String,Object>> map = (List<Map<String,Object>>)JSONUtil.ConvertObjectByJsonString(json, List.class);
	    	for (Map<String,Object> value : map) {
	    		Modular modular = services.get(value.get("id"));
	    		isSuccess = services.delete(modular);
	    	}
    	}else{
    		Map<String,Object> map = (Map<String,Object>)JSONUtil.ConvertObjectByJsonString(json, Map.class);
    		Modular modular = services.get(map.get("id"));
    		isSuccess = services.delete(modular);
    	}
    	if(isSuccess){
    		ext.setSuccess(Boolean.TRUE);
    	}
        return ext;
    }
    
    /**
     *  
     * insert(新增数据)
     * 
     * @param request
     * @param response
     * @param session
     * @return Object 可以是 JSON 或者 XML
     * @exception 
     * @version  1.0.0
     */
    @RequestMapping(value="save",method=RequestMethod.POST)
    public @ModelAttribute Object insert(Modular dto,HttpServletRequest request, HttpServletResponse response,
            HttpSession session) {
    	if(!StringUtils.isEmpty(dto.getModularright())){
    		dto.setModularright(dto.getModularright().replace("[","").replace("]", "").replaceAll("\"",""));
    	}
        dto.setModifydate(new Date());
        ExtResultUtil ext = new ExtResultUtil();
    	if(services.insert(dto)){
    		ext.setSuccess(Boolean.TRUE);
    	}else{
    		ext.setSuccess(Boolean.FALSE);
    	}
        return ext;
    }
    
    /**
     *  
     * selectAll(修改数据)
     * 
     * @param request
     * @param response
     * @param session
     * @return Object 可以是 JSON 或者 XML
     * @exception 
     * @version  1.0.0
     */
    @RequestMapping(value="edit",method=RequestMethod.POST)
    public @ModelAttribute Object update(Modular dto,HttpServletRequest request, HttpServletResponse response,
            HttpSession session) {
    	String json = getParam(request);
    	System.out.println(json);
    	ExtResultUtil ext = new ExtResultUtil();
    	if(services.update(dto)){
        	ext.setSuccess(Boolean.TRUE);
    	}else{
    		ext.setSuccess(Boolean.FALSE);
    	}
        return ext;
    }
    
    /**
     *  
     * selectAll(获取单条数据)
     * 
     * @param request
     * @param response
     * @param session
     * @return Object 可以是 JSON 或者 XML
     * @exception 
     * @version  1.0.0
     */
    @RequestMapping(value="find",method=RequestMethod.POST)
    public @ModelAttribute Object get(String code, HttpServletRequest request, HttpServletResponse response,
            HttpSession session) {
        return services.get(code);
    }
    
    /**
     * 
     * selectTreeByParent(查询父节点)
     * (这里描述这个方法适用条件 – 可选)
     * @param code
     * @param request
     * @param response
     * @return 
     * @return Object
     * @exception 
     * @version  1.0.0
     */
    @RequestMapping(value="selectTreeByParent",method=RequestMethod.GET)
    public Object selectTreeByParent(HttpServletRequest request, HttpServletResponse response) {
        return services.selectParent();
    }
    
    /**
     * 
     * selectTreeByFlID(根据父借点查询子借点)
     * (这里描述这个方法适用条件 – 可选)
     * @param fl
     * @param request
     * @param response
     * @return 
     * @return Object
     * @exception 
     * @version  1.0.0
     */
    @RequestMapping(value="selectTreeByFlID",method=RequestMethod.GET)
    public Object selectTreeByFlID(String fl, HttpServletRequest request, HttpServletResponse response) {
        return services.selectMKByParent(fl);
    }
    /** =========================== 存储过程操作 ==================================== **/
    /**
     * 资源树
     * @return
     */
    @RequestMapping("modularTree")
    public Object treeModular(String parentCode){
    	List<Modular> modularList = null;
    	Map<String,Object> searchMap = MapUtil.newHashMap();
    	searchMap.put("parent_", StringUtils.isEmpty(parentCode)?"0":parentCode);
    	modularList = services.selectAll(searchMap);
    	modularListBuild(modularList);
    	return modularList;
    }
	
    private void modularListBuild(List<Modular> modulars){
    	List<Modular> modularList = new ArrayList<Modular>();
    	for(Modular m : modulars){
    		Map<String,Object> childrenMap = MapUtil.newHashMap();
    		childrenMap.put("parent_", m.getModularcode());
    		List<Modular> childrenList = services.selectAll(childrenMap);
    		if(childrenList != null && childrenList.size() > 0){
    			modularListBuild(childrenList);
    		}else{
    			m.setLeaf(true);
    			if(m.getParent_().equals("0")){
    				modularList.add(m);
    			}
    			continue;
    		}
    		m.setChildren(childrenList);
    	}
    	modulars.removeAll(modularList);
    }
    
    /**
     * 菜单查询权限
     * @param parentCode
     * @return
     */
    @RequestMapping("roleAuthorization")
    public Object roleAuthorization(String parentCode){
    	List<Modular> modularList = null;
    	Map<String,Object> searchMap = MapUtil.newHashMap();
    	searchMap.put("parent_", StringUtils.isEmpty(parentCode)?"0":parentCode);
    	modularList = services.selectAll(searchMap);
    	modularListBuildRight(modularList);
    	return modularList;
    }
    
    private void modularListBuildRight(List<Modular> modulars){
    	List<Modular> modularList = new ArrayList<Modular>();
    	for(Modular m : modulars){
    		Map<String,Object> childrenMap = MapUtil.newHashMap();
    		childrenMap.put("parent_", m.getModularcode());
    		List<Modular> childrenList = services.selectAll(childrenMap);
    		if(childrenList != null && childrenList.size() > 0){
    			modularListBuild(childrenList);
    		}else{
    			m.setLeaf(true);
    			if(m.getParent_().equals("0")){
    				modularList.add(m);
    			}
    			continue;
    		}
    		m.setChildren(childrenList);
    	}
    	modulars.removeAll(modularList);
    }
}
