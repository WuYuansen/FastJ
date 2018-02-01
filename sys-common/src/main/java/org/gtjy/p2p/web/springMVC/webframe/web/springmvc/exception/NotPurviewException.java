package org.gtjy.p2p.web.springMVC.webframe.web.springmvc.exception;

/**
 *  权限异常类 - 前端页面作用 
 * NotPurviewException
 * 
 * 2015年3月10日 下午4:42:19
 * @author：wys
 * @version 1.0.0
 *
 */
public class NotPurviewException extends RuntimeException {

    /**
     * serialVersionUID:TODO（用一句话描述这个变量表示什么）
     *
     * @version 1.0.0
     */
    
    private static final long serialVersionUID = 1L;
    
    public NotPurviewException() {
        super("您没有访问权限");
    }
    
    public NotPurviewException(String url) {
        super("["+url+"]此连接您无访问权限");
    }
    
    
}
