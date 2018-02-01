package org.gtjy.p2p.beanValidation.rules;

import java.io.Serializable;

import org.gtjy.p2p.beanValidation.Validator;

public class LengthValidator implements Serializable, Validator<Length> {

    private static final long serialVersionUID = 1L;
    
    private long max;
    private long min;
    
    @Override
    public void initialize(Length paramA) {
        this.min = paramA.min();
        this.max = paramA.max();
    }

    @Override
    public boolean isValid(Object value) {
        if (value == null) return true;
        if (!(value instanceof String)) return false;
        String string = (String)value;
        int length = string.length();
        return (length >= this.min) && (length <= this.max);
    }
}