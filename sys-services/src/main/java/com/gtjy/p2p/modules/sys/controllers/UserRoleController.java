package com.gtjy.p2p.modules.sys.controllers;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


import javax.servlet.http.HttpSession;

import org.gtjy.p2p.JSON.ExtResultUtil;
import org.gtjy.p2p.util.MapUtil;
import org.gtjy.p2p.util.StringUtils;
import org.gtjy.p2p.web.session.SessionUtil;
import org.gtjy.p2p.web.springMVC.webframe.web.springmvc.controller.BaseController;
import org.gtjy.p2p.web.springMVC.webframe.web.springmvc.exception.BoException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.gtjy.p2p.modules.sys.dto.User;
import com.gtjy.p2p.modules.sys.dto.UserRole;
import com.gtjy.p2p.modules.tiles.sys.IUserRole;


/**
 * 
 * <p> Title:Yhjs Mapper</p>
 * <p> Description:  用户角色表</p>
 * <p> Copyright: Copyright (c) 2013 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
@Controller
@RequestMapping("/userRole") 
public class UserRoleController extends BaseController{
	
    @Resource
    private IUserRole services = null;

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
    public @ModelAttribute Object selectAll(HttpServletRequest request, HttpServletResponse response,
            HttpSession session) {
        ExtResultUtil result = new ExtResultUtil();
        Map<String,Object> map = MapUtil.newHashMap();
        List<UserRole> servicesList = services.selectAll(map);
        result.setSuccess(Boolean.TRUE);
        result.setList(servicesList);
        return servicesList;
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
    @RequestMapping(value="delete",method=RequestMethod.GET)
    public @ModelAttribute Object delete(String code,HttpServletRequest request, HttpServletResponse response,
            HttpSession session) {
        UserRole dto = services.get(code);
        return services.delete(dto);
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
    public @ModelAttribute Object insert(UserRole dto,HttpServletRequest request, HttpServletResponse response,
            HttpSession session) {
        dto.setModifydate(new Date());
        ExtResultUtil ext = new ExtResultUtil();
        dto.setModifydate(new Date(System.currentTimeMillis()));
        dto.setModifyuser(((User)SessionUtil.getCurrentUser(request)).getId());
        ext.setSuccess(services.insert(dto));
        return ext;
    }
    
    @RequestMapping(value="userRoleInsert")
    public Object userRoleInsert(String usercode,String rolecode,HttpServletRequest request,HttpServletResponse response,HttpSession session){
    	ExtResultUtil result=new ExtResultUtil();
    	try{
    		services.deleteUserCode(Long.valueOf(rolecode));
    		List<String> roleCodeList=StringUtils.StringToList(usercode, ",");
    		List<UserRole> userRoleList= new ArrayList<UserRole>();
    		for(String str:roleCodeList){
    			UserRole u=new UserRole();
    			u.setUsercode(Long.valueOf(str));
    			u.setRolecode(Long.valueOf(rolecode));
    			u.setModifydate(new Date(System.currentTimeMillis()));
    			userRoleList.add(u);
    		}
    		    services.insertRoleUser(userRoleList);
    		    result.setSuccess(Boolean.TRUE);
    	}catch(NumberFormatException e){
    		result.setSuccess(Boolean.FALSE);
			result.setMsg_info(e.getMessage());
    	}catch (BoException e) {
			result.setSuccess(Boolean.FALSE);
			result.setMsg_info(e.getMessage());
        }
    	return result;
    }
    
    
    @RequestMapping(value="selectUserByRoleCode")
    public Object selectUserByRoleCode(Long roleCode,HttpServletRequest request,HttpServletResponse response,HttpSession session){
    	ExtResultUtil result=new ExtResultUtil();
    	result.setSuccess(Boolean.TRUE);
    	result.setList(services.selectUserByRoleCode(roleCode));
    	result.setTotal(result.getList().size());
    	return result;
    }
    
    @RequestMapping(value="selectUserNotHavaRoleByRoleCode")
    public Object selectUserNotHavaRoleByRoleCode(Long rolecode,Long deptCode){
    	ExtResultUtil result=new ExtResultUtil();
    	result.setSuccess(Boolean.TRUE);
    	Map<String,Object> map = MapUtil.newHashMap();
    	map.put("rolecode", rolecode);
    	map.put("deptCode", deptCode);
    	result.setList(services.selectUserNotHavaRoleByRoleCode(map));
    	result.setTotal(result.getList().size());
    	return result;
    }
    @RequestMapping(value="deleteUserRoleByUserCodeAndRoleCode")
    public Object deleteUserRoleByUserCodeAndRoleCode(String usercode,String rolecode){
    	ExtResultUtil result=new ExtResultUtil();
    	Map<String,Object> map = MapUtil.newHashMap();
    	map.put("usercode", usercode);
    	map.put("rolecode", rolecode);
    	result.setSuccess(services.deleteUserRoleByUserCodeAndRoleCode(map)>0?Boolean.TRUE:Boolean.FALSE);
    	return result;
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
    @RequestMapping(value="edit",method=RequestMethod.GET)
    public @ModelAttribute Object update(UserRole dto, HttpServletRequest request, HttpServletResponse response,
            HttpSession session) {
    	ExtResultUtil ext = new ExtResultUtil();
        ext.setSuccess(services.update(dto));
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
}
