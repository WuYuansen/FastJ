package com.gtjy.p2p.modules.sys.DAO;
import java.util.List;
import java.util.Map;

import org.gtjy.p2p.model.Tree;
import org.gtjy.p2p.web.base.IBaseMapper;
import org.gtjy.p2p.web.springMVC.webframe.web.springmvc.exception.BoException;

import com.gtjy.p2p.modules.sys.dto.RoleRight;
/**
 * 
 * <p> Title: Jsqx Mapper</p>
 * <p> Description: 角色权限表 </p>
 * <p> Copyright: Copyright (c) 2013 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */

public interface RoleRightDAO<T> extends IBaseMapper<T> {
	public Integer insertBatch(List<RoleRight> roleRight) throws BoException;
	public Integer deleteByJsId(Long jsId) throws BoException;
	
	/* ########################### 角色鉴权部分查询菜单资源 ###########################*/
	public List<Tree> authorizationModular(Map<?,?> map)throws BoException;
	public List<Tree> queryRightByModular(Map<String,Object> map)throws BoException;
}
