package com.gtjy.p2p.modules.sys.dto;


import java.util.List;

import org.gtjy.p2p.web.base.BaseModel;

/**
 * 
 * <p> Title:Zd Mapper</p>
 * <p> Description:  字典表</p>
 * <p> Copyright: Copyright (c) 2013 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
public class Dict extends BaseModel {
	private static final long serialVersionUID = 1L;
	
	private Long id;//   字典ID
	private String typename;//   字典名字典种类名称
	private String key;//   字典键值某项字典键值编码
	private String keycode;//   字典键值代码
	private String value;//   字典值对应键值得中文名
	private Long parent;//   父级
	private Long state;//   删除标记1 未删除 2  删除
	private String ismodify;//   前台是否可以维护
	private Long order;//   排序
	private String remarks;//   备注
	private String type;//   类型
	private List<String> keycodes; //查询 
	public Dict(){super();}
	public Dict(Long id, String typename, String key, String keycode,
			String value, Long parent, Long state, String ismodify, Long order,
			String remarks, String type) {
		super();
		this.id = id;
		this.typename = typename;
		this.key = key;
		this.keycode = keycode;
		this.value = value;
		this.parent = parent;
		this.state = state;
		this.ismodify = ismodify;
		this.order = order;
		this.remarks = remarks;
		this.type = type;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getTypename() {
		return typename;
	}
	public void setTypename(String typename) {
		this.typename = typename;
	}
	public String getKey() {
		return key;
	}
	public void setKey(String key) {
		this.key = key;
	}
	public String getKeycode() {
		return keycode;
	}
	public void setKeycode(String keycode) {
		this.keycode = keycode;
	}
	public String getValue() {
		return value;
	}
	public void setValue(String value) {
		this.value = value;
	}
	public Long getParent() {
		return parent;
	}
	public void setParent(Long parent) {
		this.parent = parent;
	}
	public Long getState() {
		return state;
	}
	public void setState(Long state) {
		this.state = state;
	}
	public String getIsmodify() {
		return ismodify;
	}
	public void setIsmodify(String ismodify) {
		this.ismodify = ismodify;
	}
	public Long getOrder() {
		return order;
	}
	public void setOrder(Long order) {
		this.order = order;
	}
	public String getRemarks() {
		return remarks;
	}
	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public List<String> getKeycodes() {
		return keycodes;
	}
	public void setKeycodes(List<String> keycodes) {
		this.keycodes = keycodes;
	}
}