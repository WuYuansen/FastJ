package org.gtjy.p2p.web.base;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;
import org.gtjy.p2p.plugin.Paging.PageUtil;
import org.gtjy.p2p.web.springMVC.webframe.web.springmvc.exception.BoException;

/**
 * 
 * <p> Title: 公用的baseDAO 所有DAO全部继承此接口 </p>
 * <p> Description: </p>
 * <p> Copyright: Copyright (c) 2013 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
public interface IBaseMapper<T> {
	/*****************CRUD操作********************/
	public T selectByPrimaryKey(Object key) throws BoException;
	public Integer updateByPrimaryKey(T t) throws BoException;
	public Integer updateBySelective(Object obj) throws BoException;
	public Integer deleteByPrimaryKey(Object key) throws BoException;
	public Integer insert(T t) throws BoException;
	
	public Integer deleteByEntity(T entity) throws BoException;
	public List<T> selectBySql(@Param(value = "sql")String sql) throws BoException;
	public Integer updateBySql(@Param(value = "sql")String sql) throws BoException;
	public Integer deleteBySql(@Param(value = "sql")String sql) throws BoException;
	public Integer insertBySql(@Param(value = "sql")String sql) throws BoException;
	/***********************分页查询操作************************/
	public Integer selectByMapPagingCount(Map<?,?> map) throws BoException;
	public List<T> selectByMapPaging(PageUtil pageUtil) throws BoException;
	/***********************查询不分页*************************/
	public Integer selectByMapCount(Map<?, ?>  map) throws BoException;
	public List<T> selectByMap(Map<?, ?>  map) throws BoException;
	/**************************递归查询***********************/
	public List<T> selectByChild(T model) throws BoException;
}
