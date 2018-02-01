package com.gtjy.p2p.modules.sys.dto;

import java.util.Date;
import java.util.List;

import org.gtjy.p2p.web.base.BaseModel;

/**
 * 
 * <p> Title:Mkxx Mapper</p>
 * <p> Description:  模块信息</p>
 * <p> Copyright: Copyright (c) 2013 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
public class Modular extends BaseModel {
	private static final long serialVersionUID = 1L;
	
	private Long id;//   模块ID
	private String modularcode;//   模块编码
	private String name;//   模块名称
	private String modularen;//   模块拼音
	private String modularright;//   权限字 表示模块有那些权限，权限之间由逗号隔开
	private String showname;//   显示名称
	private String parent_;//   父类
	private String children_;//   子类
	private String extendclass;//   延伸类
	private String extendtype;//   延伸码
	private String modifyuser;//   修改人员
	private Date modifydate;//   修改日期
	private String remarks;//   备注
	private Long order;//   排序
	private Modular parent;
	private List<Modular> children;
	private boolean leaf=false; //是否是叶子节点
	private String icon;
	
	public Modular(){super();}
	public Modular(Long id, String modularcode, String name,
			String modularen, String modularright, String showname,
			String parent_, String children_, String extendclass,
			String extendtype, String modifyuser, Date modifydate,
			String remarks, Long order, Modular parent, List<Modular> children,
			Boolean leaf) {
		super();
		this.id = id;
		this.modularcode = modularcode;
		this.name = name;
		this.modularen = modularen;
		this.modularright = modularright;
		this.showname = showname;
		this.parent_ = parent_;
		this.children_ = children_;
		this.extendclass = extendclass;
		this.extendtype = extendtype;
		this.modifyuser = modifyuser;
		this.modifydate = modifydate;
		this.remarks = remarks;
		this.order = order;
		this.parent = parent;
		this.children = children;
		this.leaf = leaf;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getModularcode() {
		return modularcode;
	}
	public void setModularcode(String modularcode) {
		this.modularcode = modularcode;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getModularen() {
		return modularen;
	}
	public void setModularen(String modularen) {
		this.modularen = modularen;
	}
	public String getModularright() {
		return modularright;
	}
	public void setModularright(String modularright) {
		this.modularright = modularright;
	}
	public String getShowname() {
		return showname;
	}
	public void setShowname(String showname) {
		this.showname = showname;
	}
	public String getParent_() {
		return parent_;
	}
	public void setParent_(String parent_) {
		this.parent_ = parent_;
	}
	public String getChildren_() {
		return children_;
	}
	public void setChildren_(String children_) {
		this.children_ = children_;
	}
	public String getExtendclass() {
		return extendclass;
	}
	public void setExtendclass(String extendclass) {
		this.extendclass = extendclass;
	}
	public String getExtendtype() {
		return extendtype;
	}
	public void setExtendtype(String extendtype) {
		this.extendtype = extendtype;
	}
	public String getModifyuser() {
		return modifyuser;
	}
	public void setModifyuser(String modifyuser) {
		this.modifyuser = modifyuser;
	}
	public java.util.Date getModifydate() {
		return modifydate;
	}
	public void setModifydate(java.util.Date modifydate) {
		this.modifydate = modifydate;
	}
	public String getRemarks() {
		return remarks;
	}
	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}
	public Long getOrder() {
		return order;
	}
	public void setOrder(Long order) {
		this.order = order;
	}
	public Modular getParent() {
		return parent;
	}
	public void setParent(Modular parent) {
		this.parent = parent;
	}
	public List<Modular> getChildren() {
		return children;
	}
	public void setChildren(List<Modular> children) {
		this.children = children;
	}
	public Boolean getLeaf() {
		return leaf;
	}
	public void setLeaf(Boolean leaf) {
		this.leaf = leaf;
	}
	public String getIcon() {
		return icon;
	}
	public void setIcon(String icon) {
		this.icon = icon;
	}
	
	}