package com.gtjy.p2p.modules.sys.controllers;

import java.io.IOException;
import java.util.ArrayList;
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
import org.gtjy.p2p.web.springMVC.webframe.web.springmvc.controller.BaseController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;


import com.gtjy.p2p.modules.sys.dto.Dept;
import com.gtjy.p2p.modules.tiles.sys.IDept;


/**
 * 
 * <p> Title:Bmxx Mapper</p>
 * <p> Description:  部门信息</p>
 * <p> Copyright: Copyright (c) 2013 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
@Controller
@RequestMapping("/dept") 
public class DeptController extends BaseController{
	
    @Resource
    private IDept services = null;

    /** =========================== 数据库操作 ==================================== **/
    /**
     *  
     * selectAll(加载 部门信息 数据)
     * 
     * @param request
     * @param response
     * @param session
     * @return Object 可以是 JSON 或者 XML
     * @exception 
     * @version  1.0.0
     */
    @RequestMapping(value="data")
    public @ModelAttribute Object selectAll(Dept dto,Integer start,Integer limit,HttpServletRequest request, HttpServletResponse response,
            HttpSession session) {
        ExtResultUtil result = new ExtResultUtil();
        PageUtil pageUt = new PageUtil();
        pageUt.setPageIndex(start);
        pageUt.setPageSize(limit);
        pageUt.setParams(BeanToMapUtil.convertBean(dto));
        List<Dept> servicesList = services.selectByPaging(pageUt);
        Integer total = services.selectTotal(pageUt.getParams());
        result.setSuccess(Boolean.TRUE);
        result.setList(servicesList);
        result.setTotal(total);
        return result;
    }
    
    /**
     *  
     * delete(删除部门信息数据)
     * 
     * @param request
     * @param response
     * @param session
     * @return Object 可以是 JSON 或者 XML
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
	    		Dept dept = services.get(value.get("id"));
	    		isSuccess = services.delete(dept);
	    	}
    	}else{
    		Map<String,Object> map = (Map<String,Object>)JSONUtil.ConvertObjectByJsonString(json, Map.class);
    		Dept dept = services.get(map.get("id"));
    		isSuccess = services.delete(dept);
    	}
    	if(isSuccess){
    		ext.setSuccess(Boolean.TRUE);
    	}
        return ext;
    }
    
    /**
     *  
     * insert(新增部门信息数据)
     * 
     * @param request
     * @param response
     * @param session
     * @return Object 可以是 JSON 或者 XML
     * @exception 
     * @version  1.0.0
     */
    @RequestMapping(value="save")
    public @ModelAttribute Object insert(Dept dto,HttpServletRequest request, HttpServletResponse response,
            HttpSession session) {
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
     * selectAll(修改部门信息数据)
     * 
     * @param request
     * @param response
     * @param session
     * @return Object 可以是 JSON 或者 XML
     * @exception 
     * @version  1.0.0
     */
    @RequestMapping(value="edit")
    public @ModelAttribute Object update(Dept dto,HttpServletRequest request, HttpServletResponse response,
            HttpSession session) {
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
     * selectAll(获取部门信息单条数据)
     * 
     * @param request
     * @param response
     * @param session
     * @return Object 可以是 JSON 或者 XML
     * @exception 
     * @version  1.0.0
     */
    @RequestMapping(value="find")
    public @ModelAttribute Object get(String code, HttpServletRequest request, HttpServletResponse response,
            HttpSession session) {
        return services.get(code);
    }
    
    @RequestMapping("deptTree")
    public Object deptTree(){
    	List<Dept> deptList = null;
    	Map<String,Object> searchParentMap = MapUtil.newHashMap();
    	searchParentMap.put("deptsuper", -1);
    	deptList = services.selectAll(searchParentMap);
    	treeBuild(deptList);
    	Map<String,Object> resultJSON = MapUtil.newHashMap();
    	resultJSON.put("name", "Root");
    	resultJSON.put("children", deptList);
    	return resultJSON;
    }
    
    public void treeBuild(List<Dept> depts){
    	List<Dept> deptList = new ArrayList<Dept>();
    	for(Dept d : depts){
    		Map<String,Object> childrenMap = MapUtil.newHashMap();
    		childrenMap.put("deptsuper", d.getId());
    		childrenMap.put("name", d.getDeptname());
    		d.setName(d.getDeptname());
    		List<Dept> children = services.selectAll(childrenMap);
    		if(children != null && children.size() > 0){
    			treeBuild(children);
    		}else{
    			d.setLeaf(true); 
    			if(d.getDeptsuper().equals(0)){
    				deptList.add(d);
    			}
    			continue;
    		}
    		d.setChildren(children);
    	}
    	depts.removeAll(deptList);
    }
}
