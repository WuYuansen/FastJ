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
import org.gtjy.p2p.constants.SystemConstant;
import org.gtjy.p2p.plugin.Paging.PageUtil;
import org.gtjy.p2p.security.CipherUtil;
import org.gtjy.p2p.util.BeanToMapUtil;
import org.gtjy.p2p.util.CacheUtil;
import org.gtjy.p2p.util.MapUtil;
import org.gtjy.p2p.util.StringUtils;
import org.gtjy.p2p.web.springMVC.webframe.web.springmvc.controller.BaseController;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.gtjy.p2p.modules.sys.dto.Dict;
import com.gtjy.p2p.modules.sys.dto.User;
import com.gtjy.p2p.modules.tiles.sys.IDict;

/**
 * 
 * <p> Title:Zd Mapper</p>
 * <p> Description:  字典表</p>
 * <p> Copyright: Copyright (c) 2013 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
@SuppressWarnings("all")
@Controller
@RequestMapping("/dict") 
public class DictController extends BaseController{
	
    @Resource
    private IDict services = null;

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
    public @ModelAttribute Object selectAll(Dict dto,Integer start,Integer limit,HttpServletRequest request, HttpServletResponse response,
            HttpSession session) {
        Map<String, List<Dict>> dictCacheMap = (Map<String, List<Dict>>) CacheUtil.get(SystemConstant.CACHE_DICT_MAP);
        ExtResultUtil result = new ExtResultUtil();
        PageUtil pageUt = new PageUtil();
        pageUt.setPageIndex(start);
        pageUt.setPageSize(limit);
        pageUt.setParams(BeanToMapUtil.convertBean(dto));
        List<Dict> servicesList = services.selectByPaging(pageUt);
        if(dictCacheMap == null) {
            dictCacheMap = MapUtil.newHashMap();
            for(Dict dt : servicesList) {
                List<Dict> dtoList = dictCacheMap.get(dt.getType());
                if (dtoList != null) {
                    dtoList.add(dt);
                } else {
                    List<Dict> list = new ArrayList<Dict>();
                    list.add(dt);
                    dictCacheMap.put(dt.getType(), list);
                }
            }
            CacheUtil.put(SystemConstant.CACHE_DICT_MAP, dictCacheMap);
        }
        Integer total = services.selectTotal(pageUt.getParams());
        result.setSuccess(Boolean.TRUE);
        result.setList(servicesList);
        result.setTotal(total);
        return result;
    }
    
    @RequestMapping("combobox")
    public Object comboBoxByDict(HttpServletRequest request,String type,String code){
    	Map<String,Object> searchMap = MapUtil.newHashMap();
    	searchMap.put("type", type);
    	searchMap.put("state",1);
    	if(!StringUtils.isEmpty(code)){
    		searchMap.put("parent",code);
    	}
    	Map<String,Object> resultMap = MapUtil.newHashMap();
    	resultMap.put("root", services.selectAll(searchMap));
    	return resultMap;
    } 
    
    @RequestMapping("zTree")
    public Object Ztree(HttpServletRequest request,String type,String code){
    	Map<String,Object> searchMap = MapUtil.newHashMap();
    	searchMap.put("type", type);
    	searchMap.put("state",1);
    	if(!StringUtils.isEmpty(code)){
    		searchMap.put("parent",code);
    	}
    	Map<String,Object> resultMap = MapUtil.newHashMap();
    	List<Map<String,Object>> resultZtreeDate = new ArrayList<Map<String,Object>>();
    	List<Dict> dictList = services.selectAll(searchMap);
    	for(Dict dict : dictList){
    		Map<String,Object> tempMap = MapUtil.newHashMap();
//    		{id:1, pId:0, name: "父节点1"},
    		tempMap.put("id", dict.getId());
    		tempMap.put("value", dict.getValue());
    		tempMap.put("pId", dict.getParent());
    		tempMap.put("name", dict.getKey());
    		if(dict.getValue().equals("650000")){
    			tempMap.put("open",true);
    		}
    		resultZtreeDate.add(tempMap);
    	}
    	resultMap.put("root", resultZtreeDate);
    	return resultMap;
    }
    
    /**
     * 
     * selectAllByZydm(根据资源代码查询权限)
     * (这里描述这个方法适用条件 – 可选)
     * @param lx
     * @param zdjzdm
     * @param request
     * @param response
     * @return 
     * @return Object
     * @exception 
     * @version  1.0.0
     */
    @RequestMapping(value="selectAllByZydm",method=RequestMethod.GET)
    public @ModelAttribute Object selectAllByZydm(Dict dto,HttpServletRequest request, HttpServletResponse response) {
        ExtResultUtil result = new ExtResultUtil();
//        dto.setZdjzdms(StringUtils.StringToList(dto.getKeycode(), ","));
        if(StringUtils.isEmpty(dto.getType())) {
            result.setSuccess(Boolean.FALSE);
            result.setMsg_info("请输入字典类型");
        }else {
            result.setSuccess(Boolean.TRUE);
            result.setList(services.selectAllByQxz(dto));
        }
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
	    		Dict dict = services.get(value.get("id"));
	    		isSuccess = services.delete(dict);
	    	}
    	}else{
    		Map<String,Object> map = (Map<String,Object>)JSONUtil.ConvertObjectByJsonString(json, Map.class);
    		Dict dict = services.get(map.get("id"));
    		isSuccess = services.delete(dict);
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
    public Object insert(Dict dto,HttpServletRequest request, HttpServletResponse response,
            HttpSession session) {
    	Map<String, List<Dict>> dictCacheMap = (Map<String, List<Dict>>) CacheUtil.get(SystemConstant.CACHE_DICT_MAP);
    	ExtResultUtil ext = new ExtResultUtil();
    	ext.setSuccess(services.insert(dto));
    	List<Dict> servicesList= services.selectAll(null);
    	if(dictCacheMap == null) {
            dictCacheMap = MapUtil.newHashMap();
            for(Dict dt : servicesList) {
                List<Dict> dtoList = dictCacheMap.get(dt.getType());
                if (dtoList != null) {
                    dtoList.add(dt);
                } else {
                    List<Dict> list = new ArrayList<Dict>();
                    list.add(dt);
                    dictCacheMap.put(dt.getType(), list);
                }
            }
            CacheUtil.put(SystemConstant.CACHE_DICT_MAP, dictCacheMap);
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
    public @ModelAttribute Object update(Dict dto,HttpServletRequest request, HttpServletResponse response,
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
    @RequestMapping(value="find",method=RequestMethod.POST)
    public @ModelAttribute Object get(String code, HttpServletRequest request, HttpServletResponse response,
            HttpSession session) {
        return services.get(code);
    }
    /** =========================== 存储过程操作 ==================================== **/
	
}
