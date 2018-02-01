package org.gtjy.p2p.beanValidation.rules;

import java.io.Serializable;

import org.gtjy.p2p.beanValidation.Validator;
import org.springframework.util.StringUtils;

public class NotNullValidator implements Serializable, Validator<NotNull> {

    
    private static final long serialVersionUID = 1L;

    @Override
    public void initialize(NotNull paramA) {
    }
    
    @Override
    public boolean isValid(Object value) {
        return StringUtils.isEmpty(value);
    }

}
