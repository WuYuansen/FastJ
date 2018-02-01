package com.gtjy.p2p.modules.sys.DAO;

import java.util.List;

import org.gtjy.p2p.web.base.IBaseMapper;
import org.gtjy.p2p.web.springMVC.webframe.web.springmvc.exception.BoException;

import com.gtjy.p2p.modules.sys.dto.Modular;

/**
 * 
 * <p> Title: Mkxx Mapper</p>
 * <p> Description: 模块信息 </p>
 * <p> Copyright: Copyright (c) 2013 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */

public interface ModularDAO<T> extends IBaseMapper<T> {
	
	public List<Modular> selectParent() throws BoException;
	
	public List<Modular> selectMKByParent(String fl) throws BoException;
	
	public String selectNextCode(String fathertype)throws BoException;
	
	public Modular CurrentPosition(String reqPath) throws BoException;
}
