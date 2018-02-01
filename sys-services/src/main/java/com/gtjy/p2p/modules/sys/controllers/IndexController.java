package com.gtjy.p2p.modules.sys.controllers;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

import javax.annotation.Resource;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.gtjy.p2p.JSON.ExtResultUtil;
import org.gtjy.p2p.constants.SystemConstant;
import org.gtjy.p2p.model.Tree;
import org.gtjy.p2p.security.CipherUtil;
import org.gtjy.p2p.util.CookieUtils;
import org.gtjy.p2p.util.MapUtil;
import org.gtjy.p2p.util.StringUtils;
import org.gtjy.p2p.web.session.OnlineAppMap;
import org.gtjy.p2p.web.session.SessionUtil;
import org.gtjy.p2p.web.springMVC.webframe.web.springmvc.controller.BaseController;
import org.gtjy.p2p.web.springMVC.webframe.web.springmvc.exception.BoException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.gtjy.p2p.modules.sys.dto.Modular;
import com.gtjy.p2p.modules.sys.dto.Right;
import com.gtjy.p2p.modules.sys.dto.User;
import com.gtjy.p2p.modules.tiles.sys.IDept;
import com.gtjy.p2p.modules.tiles.sys.IModular;
import com.gtjy.p2p.modules.tiles.sys.IRight;
import com.gtjy.p2p.modules.tiles.sys.IRoleRight;
import com.gtjy.p2p.modules.tiles.sys.IUser;
//import com.gtjy.ssoServer.config.Config;
//import com.gtjy.ssoServer.config.Config;
//import com.gtjy.ssoServer.util.UserTokenUtil;
//import com.gtjy.ssoServer.util.UserTokenUtil;

@Controller
public class IndexController extends BaseController{

	private static final String SYSTEM_INDEX_PAGE="/index.html";
	
	private static ConcurrentMap<Long, List<?>> CACHE_MENU = new ConcurrentHashMap<Long, List<?>>();	//存放用户菜单
	
	@Resource
	private IUser userServices;
	@Resource
	private IRight rightService;
	@Resource
	private IModular modularService;
	@Resource
	private IDept deptService;
	@Resource 
	private IRoleRight roleRightServices;
	/* 跳转到首页 */
	@RequestMapping("admin")
	public String redictToIndex(){
		return "redirect:"+SYSTEM_INDEX_PAGE;
	}
	
	@RequestMapping("login")
	public Object login(String loginName,String password,HttpServletRequest request,HttpServletResponse response){
		ExtResultUtil ext = new ExtResultUtil();
		User user = null;
		user = userServices.validateUserName(loginName);
		if(user != null){
			user = userServices.validateUserNameAndPwd(loginName, CipherUtil.generatePassword(password));
			if(user != null) {
				if(user.getJobstate().equals("2")){
					ext.setMsg_info("用户["+user.getLoginname()+"]已离职，不能登录到系统中");
					ext.setSuccess(Boolean.FALSE);
				}else{
					CookieUtils.setCookie(response, "username", user.getLoginname());
                    CookieUtils.setCookie(response, "LOGINED", "true");
                    CookieUtils.setCookie(response, "realname",user.getRealname());
                    CookieUtils.setCookie(response, "dept",user.getDeptname());
                    CookieUtils.setCookie(response, "post",user.getPostText());
                    SessionUtil.setUser(request, user);
                    //登陆后清空用户菜单缓存
                    CACHE_MENU.remove(user.getId());
                    //设置用户管辖区域
                    SessionUtil.setAttr(request, "USERMANAGERAREA", deptService.get(user.getDeptcode()).getManagerArea());
                	// 生成token
        			Cookie tokenCookie = new Cookie("token", UUID.randomUUID().toString());
        			// 设置路径
        			tokenCookie.setPath("/");
        			// 设置cookie
        			response.addCookie(tokenCookie);
                    ext.setMsg_info("用户["+user.getLoginname()+"]登录成功，正在为您跳转到首页");
                    ext.setSuccess(Boolean.TRUE);
                    OnlineAppMap.put(request.getSession().getId(), request.getSession());
				}
			}else{
				ext.setMsg_info("用户["+loginName+"]密码错误，请重新输入");
				ext.setSuccess(Boolean.FALSE);
			}
		}else{
			ext.setMsg_info("用户["+loginName+"]不存在，请核对");
			ext.setSuccess(Boolean.FALSE);
		}
		return ext;
	}
	
	@RequestMapping(value="logout")
    public Object logout(HttpServletRequest request,HttpServletResponse response,HttpSession session) {
		List<?> chacheMenus = CACHE_MENU.get(((User)SessionUtil.getCurrentUser(request)).getId());
		CACHE_MENU.remove(((User)SessionUtil.getCurrentUser(request)).getId(),chacheMenus);
        SessionUtil.removeAttr(request, SystemConstant.SESSION_USER);
        session.invalidate();
        // 删除token
 		Cookie[] cookies = request.getCookies();
 		if (cookies != null) {
 			for (Cookie tmpCookie : cookies) {
 				if ("token".equals(tmpCookie.getName())) {
 					CookieUtils.setCookie(response, "token", "");
 				}
 			}
 		}
        ExtResultUtil ext = new ExtResultUtil();
        ext.setSuccess(Boolean.TRUE);
        return ext;
    }
	
	@RequestMapping("init")
	public Object initMenu(HttpServletRequest request){
		Long userid = ((User)SessionUtil.getCurrentUser(request)).getId();
		ExtResultUtil result = new ExtResultUtil();
		if(CACHE_MENU.get(userid) == null){
			List<Modular> menuList = new ArrayList<Modular>();
			List<Right> rightList = rightService.findRightByUserCode(userid.toString());
			StringBuffer sourcesSb = new StringBuffer();
			StringBuffer sourceRightSb = new StringBuffer();
			for(Right ri : rightList){
				sourcesSb.append(ri.getSourcescode());
				sourcesSb.append(",");
				sourceRightSb.append(ri.getRightcode());
				sourceRightSb.append(",");
			}
			SessionUtil.setAttr(request,SystemConstant.SESSION_PRIVIEW, sourceRightSb);
			Map<String,Object> searchMenuParentMap = null;
			for(String parentCode : rightService.findSourceParent(userid.toString())){
				searchMenuParentMap = MapUtil.newHashMap();
				searchMenuParentMap.put("modularcode", parentCode);
				List<Modular> menuListFor = modularService.selectAll(searchMenuParentMap);
				for(Modular menu : menuListFor){
					menuList.add(menu);
				}
			}
			buildMenu(menuList,sourcesSb.toString());
			result.setSuccess(Boolean.TRUE);
			
			Collections.sort(menuList, new Comparator<Modular>(){
				@Override
				public int compare(Modular o1, Modular o2) {
					return o1.getOrder().compareTo(o2.getOrder());
				}
			});
			result.setList(menuList);
			CACHE_MENU.put(userid, menuList);
		}else{
			result.setSuccess(Boolean.TRUE);
			result.setList(CACHE_MENU.get(userid));
		}
		return result;
	}
	/**
	 * 递归构建系统菜单
	 * @param menuList
	 * @param rightList
	 */
	private void buildMenu(List<Modular> menuList,String rightList){
		List<Modular> childrensMenu = new ArrayList<Modular>();
		for(Modular menu : menuList){
			Map<String,Object> childmap = MapUtil.newHashMap();
			childmap.put("parent_", menu.getModularcode());
			List<Modular> sunMenu = modularService.selectAll(childmap);
			if(sunMenu != null && sunMenu.size() > 0){
				buildMenu(sunMenu,rightList);
			}else{
				menu.setLeaf(Boolean.TRUE);
				if(rightList.contains(menu.getModularcode())==false){
					childrensMenu.add(menu);
				}
				continue;
			}
			menu.setChildren(sunMenu);
		}
		menuList.removeAll(childrensMenu);
	}
	
	@RequestMapping("modifyPwd")
	public Object modifyPassword(String sourcePwd ,String newPassword,String confimPwd,HttpServletRequest request){
		ExtResultUtil result = new ExtResultUtil();
		User userOld = userServices.get(SessionUtil.getCurrentUser(request));
		if(newPassword.equals(confimPwd)){
			if(!userOld.getPassword().equals(CipherUtil.generatePassword(sourcePwd))){
				result.setSuccess(Boolean.FALSE);
				result.setMsg_info("您输入的原登陆密码不对，请核对");
			}else{
				User user = new User();
				user.setId(userOld.getId());
				user.setPassword(newPassword);
				userServices.update(user);
				result.setSuccess(Boolean.TRUE);
			}
		}else{
			result.setSuccess(Boolean.FALSE);
			result.setMsg_info("两次输入的密码不一致请核对");
		}
		return result;
	}
	
	
	@RequestMapping("authorizationModular")
	public Object authorizationModular(String parentCode,String roleCode){
		ExtResultUtil  result = new ExtResultUtil();
		List<Tree> treeList = new ArrayList<Tree>();
		StringBuffer rightSources = new StringBuffer();
		List<String> rightSourcesList = rightService.findSourceByRole(roleCode);
		for(String str : rightSourcesList){
			rightSources.append(str);
			rightSources.append(",");
		}
		Map<String,Object> searchMap = MapUtil.newHashMap();
    	searchMap.put("parent", StringUtils.isEmpty(parentCode)?"0":parentCode);
    	try {
			treeList = roleRightServices.authorizationModular(searchMap);
			modularListBuildRight(treeList,rightSources.toString());
			result.setSuccess(Boolean.TRUE);
			result.setList(treeList);
		} catch (BoException e) {
			result.setSuccess(Boolean.FALSE);
			result.setMsg_info(e.getMessage());
		}
    	return result;
	}
	
	private void modularListBuildRight(List<Tree> modulars,String sources) throws BoException{
    	List<Tree> modularList = new ArrayList<Tree>();
    	for(Tree m : modulars){
    		Map<String,Object> childrenMap = MapUtil.newHashMap();
    		childrenMap.put("parent", m.getSourcesCode());
    		List<Tree> childrenList = roleRightServices.authorizationModular(childrenMap);
    		if(childrenList != null && childrenList.size() > 0){
    			modularListBuildRight(childrenList,sources);
    		}else{
    			m.setLeaf(true);
    			if(m.getSourcesCode().equals("0001")){
    				modularList.add(m);
    			}
    			
    			Map<String,Object> rightMap = MapUtil.newHashMap();
    			rightMap.put("sourcesCode", m.getSourcesCode());
    			List<Tree> rightTreeNone = roleRightServices.queryRightByModular(rightMap);
    			if(rightTreeNone.size() == 0){
    			}else{
    				List<Tree> rightTree = new ArrayList<Tree>();
        			for(Tree tree : rightTreeNone){
        				tree.setChecked(sources.contains(tree.getSourcesCode()));
        				tree.setLeaf(Boolean.TRUE);
        				rightTree.add(tree);
        			}
    				m.setLeaf(false);
    				m.setChildren(rightTree);
    			}
    			
    			continue;
    		}
    		m.setChildren(childrenList);
    	}
    	modulars.removeAll(modularList);
    }
}
