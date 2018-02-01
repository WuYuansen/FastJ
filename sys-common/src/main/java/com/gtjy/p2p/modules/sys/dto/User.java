package com.gtjy.p2p.modules.sys.dto;

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
public class User extends BaseModel {
	private static final long serialVersionUID = 1L;
	private Long id;//   
	private String loginname;//   用户登陆名
	private String password;//   
	private String realname;//   用户真实姓名
	private Long deptcode;//   所属组织机构
	private String deptname;	//机构名称
	private String post;//   职务
	private String idcard;//    身份证号
	private Long sex;//   性别
	private Long nation;//   民族
	private String tel;//   办公电话
	private String mobphone;//   个人电话
	private String qq;//   QQ号
	private String email;//   电子邮箱
	private Long jobstate;//   工作情况:1.在职;2.离职;3.休假
	private String address;//   家庭住址
	private String remarks;//   备注
	private String sexText;
	private String nationText;
	private String postText;
	private String jobstateText;
	
	
	public String getSexText() {
		return sexText;
	}
	public void setSexText(String sexText) {
		this.sexText = sexText;
	}
	public String getNationText() {
		return nationText;
	}
	public void setNationText(String nationText) {
		this.nationText = nationText;
	}
	public String getPostText() {
		return postText;
	}
	public void setPostText(String postText) {
		this.postText = postText;
	}
	public String getJobstateText() {
		return jobstateText;
	}
	public void setJobstateText(String jobstateText) {
		this.jobstateText = jobstateText;
	}
	public User(){super();}
	public User(Long id, String loginname, String password, String realname,
			Long deptcode, String post, String idcard, Long sex, Long nation,
			String tel, String mobphone, String qq, String email,
			Long jobstate, String address, String remarks) {
		super();
		this.id = id;
		this.loginname = loginname;
		this.password = password;
		this.realname = realname;
		this.deptcode = deptcode;
		this.post = post;
		this.idcard = idcard;
		this.sex = sex;
		this.nation = nation;
		this.tel = tel;
		this.mobphone = mobphone;
		this.qq = qq;
		this.email = email;
		this.jobstate = jobstate;
		this.address = address;
		this.remarks = remarks;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getLoginname() {
		return loginname;
	}
	public void setLoginname(String loginname) {
		this.loginname = loginname;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getRealname() {
		return realname;
	}
	public void setRealname(String realname) {
		this.realname = realname;
	}
	public Long getDeptcode() {
		return deptcode;
	}
	public void setDeptcode(Long deptcode) {
		this.deptcode = deptcode;
	}
	public String getPost() {
		return post;
	}
	public void setPost(String post) {
		this.post = post;
	}
	public String getIdcard() {
		return idcard;
	}
	public void setIdcard(String idcard) {
		this.idcard = idcard;
	}
	public Long getSex() {
		return sex;
	}
	public void setSex(Long sex) {
		this.sex = sex;
	}
	public Long getNation() {
		return nation;
	}
	public void setNation(Long nation) {
		this.nation = nation;
	}
	public String getTel() {
		return tel;
	}
	public void setTel(String tel) {
		this.tel = tel;
	}
	public String getMobphone() {
		return mobphone;
	}
	public void setMobphone(String mobphone) {
		this.mobphone = mobphone;
	}
	public String getQq() {
		return qq;
	}
	public void setQq(String qq) {
		this.qq = qq;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public Long getJobstate() {
		return jobstate;
	}
	public void setJobstate(Long jobstate) {
		this.jobstate = jobstate;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getRemarks() {
		return remarks;
	}
	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}
	public String getDeptname() {
		return deptname;
	}
	public void setDeptname(String deptname) {
		this.deptname = deptname;
	}
}