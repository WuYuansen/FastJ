package org.gtjy.p2p.web.base;

import java.util.List;
import java.util.Map;

import org.gtjy.p2p.plugin.Paging.PageUtil;
import org.gtjy.p2p.web.springMVC.webframe.web.springmvc.exception.BoException;

/**
 * 
 * <p>Title: 业务逻辑实现类</p>
 * <p>Description:</p>
 * <p>Copyright: Copyright (c) 2013</p>
 * <p>Company:乌鲁木齐光通嘉业网络服务有限公司</p>
 * 
 * @author wys
 * @version 1.0
 */
public class BaseServiceImpl<T> implements IBaseService<T> {

	private IBaseMapper<T> mapper;

	public IBaseMapper<T> getMapper() {
		return mapper;
	}

	@Override
	public T selectByPrimaryKey(Object key) throws BoException {
		return getMapper().selectByPrimaryKey(key);
	}

	@Override
	public Integer updateByPrimaryKey(T t) throws BoException {
		return getMapper().updateByPrimaryKey(t);
	}

	@Override
	public Integer deleteByPrimaryKey(Object key) throws BoException {
		return getMapper().deleteByPrimaryKey(key);
	}

	@Override
	public Integer insert(T t) throws BoException{
		return getMapper().insert(t);
	}

	@Override
	public Integer deleteByEntity(T entity) throws BoException {
		return getMapper().deleteByEntity(entity);
	}

	@Override
	public List<T> selectBySql(String sql) throws BoException {
		return getMapper().selectBySql(sql);
	}

	@Override
	public Integer updateBySql(String sql) throws BoException {
		return getMapper().updateBySql(sql);
	}

	@Override
	public Integer deleteBySql(String sql) throws BoException {
		return getMapper().deleteBySql(sql);
	}

	@Override
	public Integer insertBySql(String sql) throws BoException {
		return getMapper().insertBySql(sql);
	}

	@Override
	public Integer selectByMapPagingCount(Map<?, ?> map) throws BoException {
		return getMapper().selectByMapPagingCount(map);
	}

	@Override
	public List<T> selectByMapPaging(PageUtil pageUtil) throws BoException {
		return getMapper().selectByMapPaging(pageUtil);
	}

	@Override
	public Integer selectByMapCount(Map<?, ?> map) throws BoException {
		return getMapper().selectByMapCount(map);
	}

	@Override
	public List<T> selectByMap(Map<?, ?> map) throws BoException {
		return getMapper().selectByMap(map);
	}

	@Override
	public List<T> selectByChild(T model) throws BoException {
		return getMapper().selectByChild(model);
	}

	@Override
	public Integer updateBySelective(Object obj) throws BoException {
		// TODO Auto-generated method stub
		return getMapper().updateBySelective(obj);
	}

}
