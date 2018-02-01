package com.gtjy.p2p.modules.sys.dto;

import java.util.Date;

import org.gtjy.p2p.web.base.BaseModel;

/**
 * 
 * <p> Title:Jsqx Mapper</p>
 * <p> Description:  角色权限表</p>
 * <p> Copyright: Copyright (c) 2013 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
public class RoleRight extends BaseModel {
	private static final long serialVersionUID = 1L;
	
	private Long id;//   角色权限ID
	private Long roleid;//   角色ID
	private Long rightid;//   权限ID
	private String remarks;//   备注
	private String modifyuser;//   修改人员
	private java.util.Date modifydate;//   修改日期
	
	public RoleRight(){super();}
	public RoleRight(Long id, Long roleid, Long rightid, String remarks,
			String modifyuser, Date modifydate) {
		super();
		this.id = id;
		this.roleid = roleid;
		this.rightid = rightid;
		this.remarks = remarks;
		this.modifyuser = modifyuser;
		this.modifydate = modifydate;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Long getRoleid() {
		return roleid;
	}
	public void setRoleid(Long roleid) {
		this.roleid = roleid;
	}
	public Long getRightid() {
		return rightid;
	}
	public void setRightid(Long rightid) {
		this.rightid = rightid;
	}
	public String getRemarks() {
		return remarks;
	}
	public void setRemarks(String remarks) {
		this.remarks = remarks;
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
}