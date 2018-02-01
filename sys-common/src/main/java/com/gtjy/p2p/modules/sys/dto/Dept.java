package com.gtjy.p2p.modules.sys.dto;

import java.util.List;

import org.gtjy.p2p.web.base.BaseModel;

/**
 * 
 * <p> Title:Bmxx Mapper</p>
 * <p> Description:  部门信息</p>
 * <p> Copyright: Copyright (c) 2013 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
public class Dept extends BaseModel {
	private static final long serialVersionUID = 1L;
	
	private Long id;//   部门ID
	private String deptname;//   部门名称
	private Long depttype;//   组织类型：行政部门，财务部门。。。。
	private Long deptmanagerid;//   部门负责人ID
	private String deptmanagername;//   部门负责人
	private String deptremarks;//   部门介绍
	private Long deptsuper;//   上级部门
	private String deptsuperText;	//上级部门名称
	private String managerArea; //管辖区域
	private String depttypename;
	private List<Dept> children;
	private boolean leaf=false;
	private String name;	//Ztree显示需要
	private String deptmanageridText;
	
	
	
	public String getDeptmanageridText() {
		return deptmanageridText;
	}
	public void setDeptmanageridText(String deptmanageridText) {
		this.deptmanageridText = deptmanageridText;
	}
	public Dept(){super();}
	public Dept(Long id, String deptname, Long depttype, Long deptmanagerid,
			String deptmanagername, String deptremarks, Long deptsuper,String managerArea,
			List<Dept> children) {
		super();
		this.id = id;
		this.deptname = deptname;
		this.depttype = depttype;
		this.deptmanagerid = deptmanagerid;
		this.deptmanagername = deptmanagername;
		this.deptremarks = deptremarks;
		this.deptsuper = deptsuper;
		this.managerArea = managerArea;
		this.children = children;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getDeptname() {
		return deptname;
	}
	public void setDeptname(String deptname) {
		this.deptname = deptname;
	}
	public Long getDepttype() {
		return depttype;
	}
	public void setDepttype(Long depttype) {
		this.depttype = depttype;
	}
	public Long getDeptmanagerid() {
		return deptmanagerid;
	}
	public void setDeptmanagerid(Long deptmanagerid) {
		this.deptmanagerid = deptmanagerid;
	}
	public String getDeptmanagername() {
		return deptmanagername;
	}
	public void setDeptmanagername(String deptmanagername) {
		this.deptmanagername = deptmanagername;
	}
	public String getDeptremarks() {
		return deptremarks;
	}
	public void setDeptremarks(String deptremarks) {
		this.deptremarks = deptremarks;
	}
	public Long getDeptsuper() {
		return deptsuper;
	}
	public void setDeptsuper(Long deptsuper) {
		this.deptsuper = deptsuper;
	}
	public List<Dept> getChildren() {
		return children;
	}
	public void setChildren(List<Dept> children) {
		this.children = children;
	}
	public boolean isLeaf() {
		return leaf;
	}
	public void setLeaf(boolean leaf) {
		this.leaf = leaf;
	}
	public String getDepttypename() {
		return depttypename;
	}
	public void setDepttypename(String depttypename) {
		this.depttypename = depttypename;
	}
	public String getManagerArea() {
		return managerArea;
	}
	public void setManagerArea(String managerArea) {
		this.managerArea = managerArea;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getDeptsuperText() {
		return deptsuperText;
	}
	public void setDeptsuperText(String deptsuperText) {
		this.deptsuperText = deptsuperText;
	}
}