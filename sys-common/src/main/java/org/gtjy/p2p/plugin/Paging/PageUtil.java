package org.gtjy.p2p.plugin.Paging;

import java.util.HashMap;
import java.util.Map;

import org.springframework.util.StringUtils;

/**
 * 分页工具类MyBatis分页拦截器专用
 * @author wys
 *
 */
public class PageUtil {
	private Integer pageIndex;
	private Integer pageSize;
	private Integer total;
	private Map<String,Object> params = new HashMap<String,Object>();
	
	public PageUtil(){
		super();
	}
	
	public PageUtil(Integer pageIndex, Integer pageSize) {
		super();
		this.pageIndex = pageIndex;
		this.pageSize = pageSize;
	}
	
	public PageUtil(Integer pageIndex, Integer pageSize, Integer total, Map<String, Object> params) {
		super();
		this.pageIndex = pageIndex;
		this.pageSize = pageSize;
		this.total = total;
		this.params = params;
	}

	public Integer getPageIndex() {
		return pageIndex;
	}
	public void setPageIndex(Integer pageIndex) {
		if(StringUtils.isEmpty(pageIndex)) {
		    this.pageIndex=0;
		}else {
		    this.pageIndex = pageIndex;
		}
	}
	public Integer getPageSize() {
		return pageSize;
	}
	public void setPageSize(Integer pageSize) {
	    if(StringUtils.isEmpty(pageSize)) {
	        this.pageSize = 10;
	    }else {
	        this.pageSize = pageSize;
	    }
	}
	public Integer getTotal() {
		return total;
	}
	public void setTotal(Integer total) {
		this.total = total;
	}
	public Map<String, Object> getParams() {
		return params;
	}
	public void setParams(Map<String, Object> params) {
		this.params = params;
	}
}