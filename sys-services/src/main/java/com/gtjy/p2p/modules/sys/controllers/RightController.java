package com.gtjy.p2p.modules.sys.controllers;

import java.io.IOException;
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
import org.gtjy.p2p.web.springMVC.webframe.web.springmvc.controller.BaseController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;

import com.gtjy.p2p.modules.sys.dto.Modular;
import com.gtjy.p2p.modules.sys.dto.Right;
import com.gtjy.p2p.modules.tiles.sys.IModular;
import com.gtjy.p2p.modules.tiles.sys.IRight;


/**
 * 
 * <p> Title:Qx Mapper</p>
 * <p> Description:  系统权限表</p>
 * <p> Copyright: Copyright (c) 2013 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 * 
 *
 * @author wys
 * @version 1.0
 *
 */
@Controller
@RequestMapping("/right") 
public class RightController extends BaseController{
	
    @Resource
    private IRight services = null;
    @Resource
    private IModular modularService;
    
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
    public @ModelAttribute Object selectAll(Right dto,Integer start,Integer limit,HttpServletRequest request, HttpServletResponse response,
            HttpSession session) {
        ExtResultUtil result = new ExtResultUtil();
        PageUtil pageUt = new PageUtil();
        pageUt.setPageIndex(start);
        pageUt.setPageSize(limit);
        pageUt.setParams(BeanToMapUtil.convertBean(dto));
        List<Right> servicesList = services.selectByPaging(pageUt);
        Integer total = services.selectTotal(pageUt.getParams());
        result.setSuccess(Boolean.TRUE);
        result.setList(servicesList);
        result.setTotal(total);
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
	    		Right right = services.get(value.get("id"));
	    		isSuccess = services.delete(right);
	    	}
    	}else{
    		Map<String,Object> map = (Map<String,Object>)JSONUtil.ConvertObjectByJsonString(json, Map.class);
    		Right right = services.get(map.get("id"));
    		isSuccess = services.delete(right);
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
    @RequestMapping(value="save")
    public Object insert(Right dto,HttpServletRequest request, HttpServletResponse response,
            HttpSession session) {
    	StringBuffer rightCodeSb = new StringBuffer();
    	Modular m = getModularEn(dto.getSourcescode());
    	String rightEn = m.getModularen();
    	for(String str:dto.getRightcodes()){
    		rightCodeSb.append(rightEn+"_"+str);
    		rightCodeSb.append(",");
    	}
    	dto.setRightcode(rightCodeSb.toString());
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
     * 获取模块拼音
     * @param sourcesCode
     * @return
     */
    private Modular getModularEn(String sourcesCode){
    	Map<String,Object> searchMap = MapUtil.newHashMap();
    	searchMap.put("modularcode",sourcesCode);
    	List<Modular> modulars =  modularService.selectAll(searchMap);
    	return modulars.get(0);
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
    @RequestMapping(value="edit")
    public @ModelAttribute Object update(Right dto,HttpServletRequest request, HttpServletResponse response,
            HttpSession session) {
    	StringBuffer rightCodeSb = new StringBuffer();
    	Modular m = getModularEn(dto.getSourcescode());
    	String rightEn = m.getModularen();
    	for(String str:dto.getRightcodes()){
    		rightCodeSb.append(rightEn+"_"+str);
    		rightCodeSb.append(",");
    	}
    	dto.setRightcode(rightCodeSb.toString());
        dto.setModifydate(new Date());
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
    @RequestMapping(value="find")
    public @ModelAttribute Object get(String code, HttpServletRequest request, HttpServletResponse response,
            HttpSession session) {
        return services.get(code);
    }
}
