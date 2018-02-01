package org.gtjy.p2p.beanValidation.rules;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * NotNull
 * 不运行为空 校验
 * 2015年9月10日 下午6:04:18
 * @author：wys
 * @version 1.0.0
 *
 */
@Target(value= {ElementType.METHOD,ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
public @interface NotNull {
    /** 提示信息 **/
    String message() default "";
}