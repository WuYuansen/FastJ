package org.gtjy.p2p.security.authentication;

import java.util.Arrays;

/**
 * 
 * 
 * AuthenticationException 鉴权异常类 <br>
 * 
 * 2015年6月5日 下午1:08:15
 * @author：wys
 * @version 1.0.0
 *
 */
public class AuthenticationException extends RuntimeException {

    private static final long serialVersionUID = 1L;
    
    public AuthenticationException() {
        super("权限不足，操作被拒绝：该操作未进行鉴权。请联系系统管理员。");
    }

    public AuthenticationException(String... perms) {
        super("权限不足，操作被拒绝：" + "可能缺少如下权限 " + Arrays.toString(perms)+ "，请联系系统管理员。");
    }

    public AuthenticationException(Throwable throwable) {
        this("权限不足，操作被拒绝，请联系系统管理员。", throwable);
    }

    public AuthenticationException(String msg ,Throwable throwable) {
        super(msg, throwable);
    }

}
