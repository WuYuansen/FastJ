package ${classPath}.controllers;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


import javax.servlet.http.HttpSession;

import org.gtjy.p2p.JSON.ExtResultUtil;
import org.gtjy.p2p.plugin.Paging.PageUtil;
import org.gtjy.p2p.util.BeanToMapUtil;
import org.gtjy.p2p.util.MapUtil;
import org.gtjy.p2p.util.StringUtils;
import org.gtjy.p2p.web.springMVC.webframe.web.springmvc.controller.BaseController;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import ${classPath}.dto.${className}DTO;
import ${classPath1}.interfaces.I${className};


/**
 * 
 * <p> Title:${className} Mapper</p>
 * <p> Description:  ${codeName}</p>
 * <p> Copyright: Copyright (c) 2013 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
@Controller
@RequestMapping("/${lowerName}") 
public class ${className}Controller extends BaseController{
	
    @Resource
    private I${className} services = null;
    /** =========================== 单纯页面跳转操作  ==================================== **/
    
    private static final String INDEX_PAGE = "sys/${lowerName}/${lowerName}List";
    private static final String EDIT_PAGE = "sys/${lowerName}/${lowerName}Edit";
    
    
    @RequestMapping(value="loadIndex",method=RequestMethod.GET)
    public String loadIndex(HttpServletRequest request, HttpServletResponse response) {
        return INDEX_PAGE;
    }
    
    @RequestMapping(value="toEdit",method=RequestMethod.GET)
    public String loadIndex(String code,HttpServletRequest request, HttpServletResponse response) {
        if(StringUtils.isEmpty(code)) {
        }else {
            request.setAttribute("obj", services.get(code));
        }
        return EDIT_PAGE;
    }
    
    /** =========================== 带数据页面跳转操作  ==================================== **/
    
    @RequestMapping(value="index",method=RequestMethod.GET)
    public String index(${className}DTO dto,Integer offset,Integer limit,HttpServletRequest request, HttpServletResponse response,Model model) {
        ExtResultUtil result = new ExtResultUtil();
        PageUtil pagingUtil = new PageUtil();
        pagingUtil.setPageIndex(offset);
        pagingUtil.setPageSize(limit);
        pagingUtil.setParams(BeanToMapUtil.convertBean(dto));
        List<${className}DTO> dtoList = services.selectByPaging(pagingUtil);
        Integer total = services.selectTotal(pagingUtil.getParams());
        result.setSuccess(Boolean.TRUE);
        result.setTotal(total);
        result.setList(dtoList);
        model.addAttribute("obj", result);
        return INDEX_PAGE;
    }
    
    /** =========================== 数据库操作 ==================================== **/
    /**
     *  
     * selectAll(加载 ${codeName} 数据)
     * 
     * @param request
     * @param response
     * @param session
     * @return Object 可以是 JSON 或者 XML
     * @exception 
     * @version  1.0.0
     */
    @RequestMapping(value="data",method=RequestMethod.GET)
    public @ModelAttribute Object selectAll(${className}DTO dto,Integer offset,Integer limit,HttpServletRequest request, HttpServletResponse response,
            HttpSession session) {
        ExtResultUtil result = new ExtResultUtil();
        PageUtil pageUt = new PageUtil();
        pageUt.setPageIndex(offset);
        pageUt.setPageSize(limit);
        pageUt.setParams(BeanToMapUtil.convertBean(dto));
        List<${className}DTO> servicesList = services.selectByPaging(pageUt);
        Integer total = services.selectTotal(pageUt.getParams());
        result.setSuccess(Boolean.TRUE);
        result.setList(servicesList);
        result.setTotal(total);
        return result;
    }
    
    /**
     *  
     * delete(删除${codeName}数据)
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
        ${className}DTO dto = services.get(code);
        return services.delete(dto);
    }
    
    /**
     *  
     * insert(新增${codeName}数据)
     * 
     * @param request
     * @param response
     * @param session
     * @return Object 可以是 JSON 或者 XML
     * @exception 
     * @version  1.0.0
     */
    @RequestMapping(value="save",method=RequestMethod.GET)
    public @ModelAttribute Object insert(${className}DTO dto,HttpServletRequest request, HttpServletResponse response,
            HttpSession session) {
        return services.insert(dto);
    }
    
    /**
     *  
     * selectAll(修改${codeName}数据)
     * 
     * @param request
     * @param response
     * @param session
     * @return Object 可以是 JSON 或者 XML
     * @exception 
     * @version  1.0.0
     */
    @RequestMapping(value="edit",method=RequestMethod.GET)
    public @ModelAttribute Object update(${className}DTO dto, HttpServletRequest request, HttpServletResponse response,
            HttpSession session) {
        return services.update(dto);
    }
    
    /**
     *  
     * selectAll(获取${codeName}单条数据)
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
