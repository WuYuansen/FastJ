package org.gtjy.p2p.JSON;

import java.util.List;

/**
 * 
 * <p> Title: 返回Extjs页面需要的参数</p>
 * <p> Description: </p>
 * <p> Copyright: Copyright (c) 2013 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
@SuppressWarnings("rawtypes")
public class ExtResultUtil {
	private List list;	/* 返回集合 */
	private Object root;	/* 返回对象 */
	private String msg_info; /* 操作说明 */
	private Integer total;	/* 总条数 */
	private boolean success;	/* 状态 */
	
	public List getList() {
		return list;
	}
	public void setList(List list) {
		this.list = list;
	}
	public Object getRoot() {
		return root;
	}
	public void setRoot(Object root) {
		this.root = root;
	}
	public String getMsg_info() {
		return msg_info;
	}
	public void setMsg_info(String msg_info) {
		this.msg_info = msg_info;
	}
	public boolean isSuccess() {
		return success;
	}
	public void setSuccess(boolean success) {
		this.success = success;
	}
	public Integer getTotal() {
		return total;
	}
	public void setTotal(Integer total) {
		this.total = total;
	}	
	
	/**
	 * 转换成JSON格式
	 */
	@Override
	public String toString() {
		return JSONUtil.ConvertJSONByObject(this).toString();
	}
}