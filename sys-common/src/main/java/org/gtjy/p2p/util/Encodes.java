package org.gtjy.p2p.util;

import org.springframework.web.util.HtmlUtils;


/**
 * 
 * Encodes 提供各种编码解码的工具集合
 * 
 * 2015年7月7日 上午10:30:22
 * @author：wys
 * @version 1.0.0
 *
 */
public class Encodes {
    
    /**
     * 
     * escapeHtml(HTML 转码)
     * (这里描述这个方法适用条件 – 可选)
     * @param html
     * @return 
     * @return String
     * @exception 
     * @version  1.0.0
     */
    public static String escapeHtml(String html) {
        return HtmlUtils.htmlEscape(html);
    }
    
    /**
     * 
     * unescapeHtml(HTML 解码)
     * (这里描述这个方法适用条件 – 可选)
     * @param htmlEscaped
     * @return 
     * @return String
     * @exception 
     * @version  1.0.0
     */
    public static String unescapeHtml(String htmlEscaped) {
        return HtmlUtils.htmlUnescape(htmlEscaped);
    }
}
