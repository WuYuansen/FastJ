package com.gtjy.p2p.modules.sys.DAO;

import java.util.List;

import org.gtjy.p2p.web.base.IBaseMapper;
import org.gtjy.p2p.web.springMVC.webframe.web.springmvc.exception.BoException;

import com.gtjy.p2p.modules.sys.dto.Dict;

/**
 * 
 * <p> Title: Zd Mapper</p>
 * <p> Description: 字典表 </p>
 * <p> Copyright: Copyright (c) 2013 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */

public interface DictDAO<T> extends IBaseMapper<T> {
 
    public Integer deleteByIds(String[] ctqGuids) throws BoException;
    
    public List<T> selectAllByQxz(Dict dto);
    
    
}
