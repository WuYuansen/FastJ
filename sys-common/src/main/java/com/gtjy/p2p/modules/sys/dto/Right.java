package com.gtjy.p2p.modules.sys.dto;

import java.util.Date;
import java.util.Set;

import org.gtjy.p2p.web.base.BaseModel;

/**
 * 
 * <p> Title:Qx Mapper</p>
 * <p> Description:  系统权限表</p>
 * <p> Copyright: Copyright (c) 2013 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
public class Right extends BaseModel {
	private static final long serialVersionUID = 1L;
	
	private Long id;//   权限ID
	private String modularname;//   模块名称
	private String childrenmodular;//   子模块名称
	private String rightcode;//   权限字 表示有那些权限，权限之间由逗号隔开
	private Set<String> rightcodes;	//接受参数
	private String rightname;//   权限名称
	private String sourcescode;//   资源对象编号
	private String modifyuser;//   修改人员
	private java.util.Date modifydate;//   修改日期
	private String remarks;//   备注
	
	private String modularName;
	
	public Right(){super();}
	public Right(Long id, String modularname, String childrenmodular,
			String rightcode, String rightname, String sourcescode,
			String modifyuser, Date modifydate, String remarks) {
		super();
		this.id = id;
		this.modularname = modularname;
		this.childrenmodular = childrenmodular;
		this.rightcode = rightcode;
		this.rightname = rightname;
		this.sourcescode = sourcescode;
		this.modifyuser = modifyuser;
		this.modifydate = modifydate;
		this.remarks = remarks;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getModularname() {
		return modularname;
	}
	public void setModularname(String modularname) {
		this.modularname = modularname;
	}
	public String getChildrenmodular() {
		return childrenmodular;
	}
	public void setChildrenmodular(String childrenmodular) {
		this.childrenmodular = childrenmodular;
	}
	public String getRightcode() {
		return rightcode;
	}
	public void setRightcode(String rightcode) {
		this.rightcode = rightcode;
	}
	public String getRightname() {
		return rightname;
	}
	public void setRightname(String rightname) {
		this.rightname = rightname;
	}
	public String getSourcescode() {
		return sourcescode;
	}
	public void setSourcescode(String sourcescode) {
		this.sourcescode = sourcescode;
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
	public Set<String> getRightcodes() {
		return rightcodes;
	}
	public void setRightcodes(Set<String> rightcodes) {
		this.rightcodes = rightcodes;
	}
	public String getModularName() {
		return modularName;
	}
	public void setModularName(String modularName) {
		this.modularName = modularName;
	}
}