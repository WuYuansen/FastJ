package org.gtjy.p2p.JSON;

import java.util.List;

/**
 * 
 * <p> Title: extjs前端显示树结构</p>
 * <p> Description: </p>
 * <p> Copyright: Copyright (c) 2013 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
public class ExtTree {
	private String id;		//编号
	private String idxtype;	//id xtype icon这
	private String leaf;	//是否还有下集
	private String pid;		//pid
	private String text;	//显示标题内容
	private String icon;	//图标
	private Integer sort;	//排序
//	private Boolean checked;	//是否选中
	private List<ExtTree> children;	//子集合
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getIdxtype() {
		return idxtype;
	}
	public void setIdxtype(String idxtype) {
		this.idxtype = idxtype;
	}
	public String getLeaf() {
		return leaf;
	}
	public void setLeaf(String leaf) {
		this.leaf = leaf;
	}
	public String getPid() {
		return pid;
	}
	public void setPid(String pid) {
		this.pid = pid;
	}
	public String getText() {
		return text;
	}
	public void setText(String text) {
		this.text = text;
	}
	public String getIcon() {
		return icon;
	}
	public void setIcon(String icon) {
		this.icon = icon;
	}
	public Integer getSort() {
		return sort;
	}
	public void setSort(Integer sort) {
		this.sort = sort;
	}
	public List<ExtTree> getChildren() {
		return children;
	}
	public void setChildren(List<ExtTree> children) {
		this.children = children;
	}
//	public Boolean getChecked() {
//		return checked;
//	}
//	public void setChecked(Boolean checked) {
//		this.checked = checked;
//	}
}
