package com.gtjy.p2p.modules.sys.dto;

import java.util.Date;

import org.gtjy.p2p.web.base.BaseModel;

/**
 * 
 * <p> Title:Js Mapper</p>
 * <p> Description:  角色表</p>
 * <p> Copyright: Copyright (c) 2013 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
public class Role extends BaseModel {
	private static final long serialVersionUID = 1L;
	
	private Long id;//   角色ID
	private String rolename;//   角色名称
	private String remarks;//   备注
	private String modifyuser;//   修改人员
	private String modifyuserText;	//修改人员名字中文
	private Date modifydate;//   修改日期
	
	public Role(){super();}
	public Role(Long id, String rolename, String remarks, String modifyuser,
			Date modifydate) {
		super();
		this.id = id;
		this.rolename = rolename; 
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
	public String getRolename() {
		return rolename;
	}
	public void setRolename(String rolename) {
		this.rolename = rolename;
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
	public String getModifyuserText() {
		return modifyuserText;
	}
	public void setModifyuserText(String modifyuserText) {
		this.modifyuserText = modifyuserText;
	}
}
