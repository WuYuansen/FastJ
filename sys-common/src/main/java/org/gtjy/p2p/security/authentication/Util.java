package org.gtjy.p2p.security.authentication;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.gtjy.p2p.constants.SystemConstant;
import org.gtjy.p2p.util.StringUtils;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

/**
 * 
 * 
 * Util 鉴权具体操作
 * 
 * 2015年6月5日 下午1:19:31
 * @author：wys
 * @version 1.0.0
 *
 */
public class Util {
    
    /**
     * 
     * getPerms(获取当前登录用户下的所有权限标识存放到List中)
     * (这里描述这个方法适用条件 – 可选)
     * @return
     * @throws Exception 
     * @return List<String>
     * @exception 
     * @version  1.0.0
     */
    public static List<String> getPerms() throws Exception {
        try{
            HttpServletRequest request = ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest();  
            List<String> ps = StringUtils.StringToList(request.getSession().getAttribute(SystemConstant.SESSION_PRIVIEW).toString(), ",");
            if(ps != null){
                return ps;
            }
            return new ArrayList<String>();
        }catch(java.lang.NullPointerException e){
            throw new AuthenticationException(e);
        }
    }
    
    public static void checkPermission(String[] perms) throws Exception {
        if (checkPerms(perms)) {
            return;
        }
        throw new AuthenticationException(perms);
    }
    
    /**
     * 
     * checkPerms(校验当前用户是否有权限)
     * (这里描述这个方法适用条件 – 可选)
     * @param perms
     * @return
     * @throws Exception 
     * @return boolean
     * @exception 
     * @version  1.0.0
     */
    private static boolean checkPerms(String[] perms) throws Exception {
        if (perms == null) {
            return false;
        }
        if (perms.length == 0) {// 没有标注任何权限时 可直接通过.
            return true;
        }
        List<String> list = new ArrayList<String>();
        for (String perm : perms) {
            if (perm != null && perm.trim().length() > 0) {
                list.add(perm.trim());
            }
        }
        if (list.isEmpty()) {// 没有标注任何权限时 可直接通过.
            return true;
        }

        List<String> ps = getPerms();
        for (String perm : perms) {
            if (ps.contains(perm)) {
                return true;
            }
        }
        return false;
    }
}
