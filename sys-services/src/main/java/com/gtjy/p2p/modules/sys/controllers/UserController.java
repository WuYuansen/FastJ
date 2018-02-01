package com.gtjy.p2p.modules.sys.controllers;

import java.beans.IntrospectionException;
import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
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
import org.gtjy.p2p.security.CipherUtil;
import org.gtjy.p2p.util.BeanToMapUtil;
import org.gtjy.p2p.util.MapUtil;
import org.gtjy.p2p.web.springMVC.webframe.web.springmvc.controller.BaseController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.gtjy.p2p.modules.sys.dto.User;
import com.gtjy.p2p.modules.sys.dto.UserRole;
import com.gtjy.p2p.modules.tiles.sys.IDept;
import com.gtjy.p2p.modules.tiles.sys.IUser;
import com.gtjy.p2p.modules.tiles.sys.IUserRole;

/**
 * 
 * <p> Title:Ygxx Mapper</p>
 * <p> Description:  记录部门员工的信息</p>
 * <p> Copyright: Copyright (c) 2013 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
@Controller
@RequestMapping("/user") 
public class UserController extends BaseController{
	
    @Resource
    private IUser services = null;
    
    @Resource
    private IDept bmxx= null;
    
    @Autowired
    private IUserRole userRoleService;
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
    public @ModelAttribute Object selectAll(User dto,Integer start,Integer limit,HttpServletRequest request, HttpServletResponse response,
            HttpSession session) {
        ExtResultUtil result = new ExtResultUtil();
        PageUtil pageUt = new PageUtil();
        pageUt.setPageIndex(start);
        pageUt.setPageSize(limit);
        pageUt.setParams(BeanToMapUtil.convertBean(dto));
        List<User> servicesList = services.selectByPaging(pageUt);
        Integer total = services.selectTotal(pageUt.getParams());
        result.setSuccess(Boolean.TRUE);
        result.setList(servicesList);
        result.setTotal(total);
        return result;
    }
    
    
    @RequestMapping(value="dataAll",method=RequestMethod.GET)
    public @ModelAttribute Object select(User dto,HttpServletRequest request, HttpServletResponse response,
            HttpSession session) throws IntrospectionException, IllegalAccessException, InvocationTargetException {
        ExtResultUtil result = new ExtResultUtil();
        List<User> servicesList = services.selectAll(BeanToMapUtil.convertBean(dto));
        result.setSuccess(Boolean.TRUE);
        result.setList(servicesList);
        return result;
    }
    
    
    @RequestMapping(value="selectUserByRole",method=RequestMethod.GET)
    public @ModelAttribute Object selectUserByRole(String roleId,HttpServletRequest request, HttpServletResponse response,
            HttpSession session) {
            ExtResultUtil result = new ExtResultUtil();
            Map<String,Object> searchRoleMap = MapUtil.newHashMap();
            searchRoleMap.put("rolecode", roleId);
            List<UserRole> userRoleList = userRoleService.selectAll(searchRoleMap);
            List<User> servicesList = new ArrayList<User>();
            for(UserRole userRole : userRoleList) {
                servicesList.add(services.get(userRole.getId()));
            }
//          List<YhxxDTO> servicesList = services.selectAll(BeanToMapUtil.convertBean(dto));
//          Integer total = services.selectTotal(BeanToMapUtil.convertBean(dto));
            result.setSuccess(Boolean.TRUE);
            result.setList(servicesList);
//            result.setTotal(total);
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
	    		User user = services.get(value.get("id"));
	    		isSuccess = services.delete(user);
	    	}
    	}else{
    		Map<String,Object> map = (Map<String,Object>)JSONUtil.ConvertObjectByJsonString(json, Map.class);
    		User user = services.get(map.get("id"));
    		isSuccess = services.delete(user);
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
    public Object insert(User dto,HttpServletRequest request, HttpServletResponse response,
            HttpSession session) {
    	ExtResultUtil ext = new ExtResultUtil();
    	dto.setPassword(CipherUtil.generatePassword(dto.getPassword()));
    	ext.setSuccess(services.insert(dto));
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
    public @ModelAttribute Object update(User dto,HttpServletRequest request, HttpServletResponse response,
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
     * selectAll(获取单条数据)
     * 
     * @param request
     * @param response
     * @param session
     * @return Object 可以是 JSON 或者 XML
     * @exception 
     * @version  1.0.0
     */
    @RequestMapping(value="find",method=RequestMethod.GET)
    public @ModelAttribute Object get(String code, HttpServletRequest request, HttpServletResponse response,
            HttpSession session) {
        return services.get(code);
    }
    /** =========================== 存储过程操作 ==================================== **/
	
}
