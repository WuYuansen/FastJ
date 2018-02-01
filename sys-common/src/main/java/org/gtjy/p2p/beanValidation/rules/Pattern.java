package org.gtjy.p2p.beanValidation.rules;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;


/**
 * 
 * Pattern
 * 正则校验
 * 2015年9月10日 下午6:07:52
 * @author：wys
 * @version 1.0.0
 *
 */
@Target(value= {ElementType.METHOD,ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
public @interface Pattern {
    /** 正则表达式 **/
    String regexp() default "";
    /** 错误信息 **/
    String message() default "";
}
