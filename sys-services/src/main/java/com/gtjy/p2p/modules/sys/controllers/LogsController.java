package com.gtjy.p2p.modules.sys.controllers;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.gtjy.p2p.JSON.ExtResultUtil;
import org.gtjy.p2p.JSON.JSONUtil;
import org.gtjy.p2p.plugin.Paging.PageUtil;
import org.gtjy.p2p.util.DateUtil;
import org.gtjy.p2p.util.MapUtil;
import org.gtjy.p2p.util.StringUtils;
import org.gtjy.p2p.web.springMVC.webframe.web.springmvc.controller.BaseController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.gtjy.p2p.modules.sys.dto.Logs;
import com.gtjy.p2p.modules.tiles.sys.ILogs;

/**
 * 
 * <p> Title:Rz Mapper</p>
 * <p> Description:  系统日志表</p>
 * <p> Copyright: Copyright (c) 2013 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
@Controller
@RequestMapping("/logs") 
public class LogsController extends BaseController{
	
    @Resource
    private ILogs services = null;

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
    public @ModelAttribute Object selectAll(String beginDate,String endDate,String operationuser,String operationtype,
    		String search,Integer start,Integer limit,
    		HttpServletRequest request, HttpServletResponse response,HttpSession session) {
        Map<String,Object> searchMap = MapUtil.newHashMap();
        
        this.checkDateIsNull(searchMap,beginDate,endDate);
        searchMap.put("operationuser", StringUtils.isEmpty(operationuser)?"":operationuser);
       
        if(StringUtils.isEmpty(operationtype)){
        	operationtype = "";
        }else if( !StringUtils.isEmpty(operationtype)){
        	if(operationtype.equals("全部")){
        		operationtype = "";
        	}
        }
        searchMap.put("operationtype", operationtype);
        
        ExtResultUtil result = new ExtResultUtil();
        PageUtil pageUt = new PageUtil();
        pageUt.setPageIndex(start);
        pageUt.setPageSize(limit);
        pageUt.setParams(searchMap);
        List<Logs> servicesList = services.selectByPaging(pageUt);
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
	    		Logs logs = services.get(value.get("id"));
	    		isSuccess = services.delete(logs);
	    	}
    	}else{
    		Map<String,Object> map = (Map<String,Object>)JSONUtil.ConvertObjectByJsonString(json, Map.class);
    		Logs logs = services.get(map.get("id"));
    		isSuccess = services.delete(logs);
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
    public Object insert(Logs dto,HttpServletRequest request, HttpServletResponse response,
            HttpSession session) {
    	ExtResultUtil ext = new ExtResultUtil();
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
    public @ModelAttribute Object update(Logs dto,HttpServletRequest request, HttpServletResponse response,
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
    
    /*进入模块时通过拦截器后调用的方法*/
    @RequestMapping(value="module")
    public @ModelAttribute Object module(HttpServletRequest request, HttpServletResponse response,
            HttpSession session) {
    	//System.out.println("完成日志拦截");
    	ExtResultUtil result = new ExtResultUtil();
    	result.setSuccess(Boolean.TRUE);
        return result;
    }
    
	/**
	 * 2016-2-28 Silence
	 * 1.都不为空时
	 * 2.结束日期为空&开始日期不为空，结束日期默认为系统当前日期
	 * 3.开始日期为空&结束日期不为空，开始日期默认为1970-01-01
	 * 4.开始、结束日期都为空
	 * 
	 * 其他有时间的查询也使用此访求
	 * */
	private void checkDateIsNull(Map<String,Object> searchMap , String beginDate,String endDate ){
		//提前一个月
		if(StringUtils.isEmpty(beginDate)){
			beginDate = DateUtil.getPre30Day();
		}
		
		if(StringUtils.isEmpty(endDate)){
			endDate = DateUtil.getDate("yyyy-MM-dd");
		}
		searchMap.put("beginDate",beginDate);
		searchMap.put("endDate",endDate);
		
		//searchMap.put("beginDate", StringUtils.isEmpty(beginDate) ? "" : beginDate); //1970-01-01
		//searchMap.put("endDate", StringUtils.isEmpty(endDate) ? "" : endDate); //DateUtil.getDate("yyyy-MM-dd")
		
	}
	
    /** =========================== 存储过程操作 ==================================== **/
	
}
