package org.gtjy.p2p.web.springMVC.webframe.web.springmvc.exception;

/**
 * 
 * 
 * OutSideTheChainException 
 * 
 * 2015年4月3日 下午2:04:49
 * @author：wys
 * @version 1.0.0
 *
 */
public class OutSideTheChainException extends RuntimeException {
private static final long serialVersionUID = 1L;
    
    public OutSideTheChainException() {
        super("您访问的页面已过期");
    }
    
    public OutSideTheChainException(String url) {
        super("["+url+"]您访问的页面已过期");
    }
}
