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
import org.gtjy.p2p.web.springMVC.webframe.web.springmvc.controller.BaseController;
import org.gtjy.p2p.web.springMVC.webframe.web.springmvc.exception.BoException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.gtjy.p2p.modules.sys.dto.RoleRight;
import com.gtjy.p2p.modules.tiles.sys.IRoleRight;


/**
 * 
 * <p> Title:Jsqx Mapper</p>
 * <p> Description:  角色权限表</p>
 * <p> Copyright: Copyright (c) 2013 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
@Controller
@RequestMapping("/roleRight") 
public class RoleRightController extends BaseController{
	
    @Resource
    private IRoleRight services = null;
    
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
        List<RoleRight> servicesList = services.selectAll(map);
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
        RoleRight dto = services.get(code);
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
    public @ModelAttribute Object insert(RoleRight dto,HttpServletRequest request, HttpServletResponse response,
            HttpSession session) {
        dto.setModifydate(new Date());
        services.delete(dto);
        return services.insert(dto);
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
    @RequestMapping(value="rightRoleAuthorization")
    public Object rightRoleAuthorization(String r_code,String ri_code,HttpServletRequest request, HttpServletResponse response,
            HttpSession session) {
    	ExtResultUtil result = new ExtResultUtil();
    	try {
			services.deleteByJsId(Long.valueOf(r_code));
			List<String> rightCodeList = StringUtils.StringToList(ri_code, ",");
			List<RoleRight> roleRightList = new ArrayList<RoleRight>();
			for(String str : rightCodeList){
				RoleRight r = new RoleRight();
				r.setRoleid(Long.valueOf(r_code));
				r.setRightid(Long.valueOf(str));
				r.setModifydate(new Date(System.currentTimeMillis()));
//				roleRightList.add(r);
				services.insert(r);
			}
//			services.insertBatch(roleRightList);
			result.setSuccess(Boolean.TRUE);
		} catch (NumberFormatException e) {
			result.setSuccess(Boolean.FALSE);
			result.setMsg_info(e.getMessage());
		} catch (BoException e) {
			result.setSuccess(Boolean.FALSE);
			result.setMsg_info(e.getMessage());
		}
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
    public @ModelAttribute Object update(RoleRight dto, HttpServletRequest request, HttpServletResponse response,
            HttpSession session) {
        return services.update(dto);
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
