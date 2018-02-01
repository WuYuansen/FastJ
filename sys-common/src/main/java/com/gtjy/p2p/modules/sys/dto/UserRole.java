package com.gtjy.p2p.modules.sys.dto;

import java.util.Date;

import org.gtjy.p2p.web.base.BaseModel;

/**
 * 
 * <p> Title:Yhjs Mapper</p>
 * <p> Description:  用户角色表</p>
 * <p> Copyright: Copyright (c) 2013 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
public class UserRole extends BaseModel {
private static final long serialVersionUID = 1L;
	
	private Long id;//   自动编码
	private Long rolecode;//   角色编号
	private Long usercode;//   用户编号
	private Long modifyuser;//   修改人员
	private java.util.Date modifydate;//   修改日期
	private String remarks;//   备注
	public UserRole(){super();}
	public UserRole(Long id, Long rolecode, Long usercode, Long modifyuser,
			Date modifydate, String remarks) {
		super();
		this.id = id;
		this.rolecode = rolecode;
		this.usercode = usercode;
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
	public Long getRolecode() {
		return rolecode;
	}
	public void setRolecode(Long rolecode) {
		this.rolecode = rolecode;
	}
	public Long getUsercode() {
		return usercode;
	}
	public void setUsercode(Long usercode) {
		this.usercode = usercode;
	}
	public Long getModifyuser() {
		return modifyuser;
	}
	public void setModifyuser(Long modifyuser) {
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
	}}