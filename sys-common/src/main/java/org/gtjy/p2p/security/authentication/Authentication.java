package org.gtjy.p2p.security.authentication;


import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * 
 * 
 * Authentication 方法鉴权注解
 * 
 * 2015年6月5日 下午1:07:31
 * @author：wys
 * @version 1.0.0
 *
 */
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD) //方法
//@Inherited()  // 子类可以继承父类的该注解
public @interface Authentication {
    
    /**
     * 
     * 可访问权限列表,多个用半角逗号分隔
     */
    public String requiredPre() default "";
}
