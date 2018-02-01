package org.gtjy.p2p.util;

import javax.servlet.http.HttpServletRequest;


import nl.bitwalker.useragentutils.Browser;
import nl.bitwalker.useragentutils.DeviceType;
import nl.bitwalker.useragentutils.UserAgent;

/**
 * 
 * 
 * UserAgentUtil 用户代理字符串识别工具 <br />
 * 用户获取用户访问系统的终端介质
 * 2015年6月1日 上午11:10:12
 * @author：wys
 * @version 1.0.0
 *
 */
public class UserAgentUtil {
    
    /**
     * 获取用户代理对象
     * @param request
     * @return
     */
    public static UserAgent getUserAgent(HttpServletRequest request){
        return UserAgent.parseUserAgentString(request.getHeader("User-Agent"));
    }
    
    /**
     * 获取设备类型
     * @param request
     * @return
     */
    public static DeviceType getDeviceType(HttpServletRequest request){
        return getUserAgent(request).getOperatingSystem().getDeviceType();
    }
    
    /**
     * 是否是PC
     * @param request
     * @return
     */
    public static boolean isComputer(HttpServletRequest request){
        return DeviceType.COMPUTER.equals(getDeviceType(request));
    }

    /**
     * 是否是手机
     * @param request
     * @return
     */
    public static boolean isMobile(HttpServletRequest request){
        return DeviceType.MOBILE.equals(getDeviceType(request));
    }
    
    /**
     * 是否是平板
     * @param request
     * @return
     */
    public static boolean isTablet(HttpServletRequest request){
        return DeviceType.TABLET.equals(getDeviceType(request));
    }

    /**
     * 是否是手机和平板
     * @param request
     * @return
     */
    public static boolean isMobileOrTablet(HttpServletRequest request){
        DeviceType deviceType = getDeviceType(request);
        return DeviceType.MOBILE.equals(deviceType) || DeviceType.TABLET.equals(deviceType);
    }
    
    /**
     * 获取浏览类型
     * @param request
     * @return
     */
    public static Browser getBrowser(HttpServletRequest request){
        return getUserAgent(request).getBrowser();
    }
    
    /**
     * 是否IE版本是否小于等于IE8
     * @param request
     * @return
     */
    public static boolean isLteIE8(HttpServletRequest request){
        Browser browser = getBrowser(request);
        return Browser.IE5.equals(browser) || Browser.IE6.equals(browser)
                || Browser.IE7.equals(browser) || Browser.IE8.equals(browser);
    }
    
    /**
     * 是否是Ajax异步请求
     * @param request
     */
    public static boolean isAjaxRequest(HttpServletRequest request){
        
        String accept = request.getHeader("accept");
        String xRequestedWith = request.getHeader("X-Requested-With");
        // 如果是异步请求或是手机端，则直接返回信息
        return ((accept != null && accept.indexOf("application/json") != -1 
            || (xRequestedWith != null && xRequestedWith.indexOf("XMLHttpRequest") != -1)));
    }

}
