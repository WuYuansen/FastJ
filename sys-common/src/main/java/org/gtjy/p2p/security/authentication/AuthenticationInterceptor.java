package org.gtjy.p2p.security.authentication;

import java.lang.reflect.Method;

import org.aopalliance.intercept.MethodInterceptor;
import org.aopalliance.intercept.MethodInvocation;

/**
 * 
 * 
 * AuthenticationInterceptor 方法鉴权注解拦截器(AOP实现)
 * 
 * 2015年6月5日 下午1:31:19
 * @author：wys
 * @version 1.0.0
 *
 */
public class AuthenticationInterceptor implements MethodInterceptor {
    private final String separator = ",";
    
    /**
     * 执行
     */
    @Override
    public Object invoke(MethodInvocation invocation) throws Throwable {
        Authentication auth = null;
        Method method = invocation.getMethod();
        //Class<?> clazz = method.getDeclaringClass();

        // 验证类是否安全
        //auth = clazz.getAnnotation(Authentication.class);
        //if(auth !=null){// 类上可以不加注解.
        //  SecurityUtil.checkPermission(auth.requiredPerms(), auth.or());
        //}
        //访问方法校验安全性 
        //校验访问的当前方法是否安全
        auth = method.getAnnotation(Authentication.class);
        if(auth == null) {// 方法上必须要加注解 不然抛出异常
            throw new AuthenticationException();
        }
        String [] perms = "".equals(auth.requiredPre()) ? new String[]{} : auth.requiredPre().split(separator);
        Util.checkPermission(perms);
        return invocation.proceed();
    }

}
