package com.gtjy.p2p.modules.sys.dto;

import java.util.Date;

import org.gtjy.p2p.web.base.BaseModel;

/**
 * 
 * <p> Title:Rz Mapper</p>
 * <p> Description:  系统日志表</p>
 * <p> Copyright: Copyright (c) 2013 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
public class Logs extends BaseModel {
	private static final long serialVersionUID = 1L;
	
	private Long id;//   日志记录ID
	private Long logstype;//    1 前台日志、2 后台日志、3 其它日志
	private String logssource;//   操作来源
	private java.util.Date operationdate;//   操作时间
	private String operationstep;//   操作步骤名
	private String operationtype;//   操作类型
	private String operationremarks;//   操作描述
	private String operationuser;//   操作人
	private String operationip;//   操作人IP
	
	public Logs(){super();}
	public Logs(Long id, Long logstype, String logssource, Date operationdate,
			String operationstep, String operationtype,
			String operationremarks, String operationuser, String operationip) {
		super();
		this.id = id;
		this.logstype = logstype;
		this.logssource = logssource;
		this.operationdate = operationdate;
		this.operationstep = operationstep;
		this.operationtype = operationtype;
		this.operationremarks = operationremarks;
		this.operationuser = operationuser;
		this.operationip = operationip;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Long getLogstype() {
		return logstype;
	}
	public void setLogstype(Long logstype) {
		this.logstype = logstype;
	}
	public String getLogssource() {
		return logssource;
	}
	public void setLogssource(String logssource) {
		this.logssource = logssource;
	}
	public java.util.Date getOperationdate() {
		return operationdate;
	}
	public void setOperationdate(java.util.Date operationdate) {
		this.operationdate = operationdate;
	}
	public String getOperationstep() {
		return operationstep;
	}
	public void setOperationstep(String operationstep) {
		this.operationstep = operationstep;
	}
	public String getOperationtype() {
		return operationtype;
	}
	public void setOperationtype(String operationtype) {
		this.operationtype = operationtype;
	}
	public String getOperationremarks() {
		return operationremarks;
	}
	public void setOperationremarks(String operationremarks) {
		this.operationremarks = operationremarks;
	}
	public String getOperationuser() {
		return operationuser;
	}
	public void setOperationuser(String operationuser) {
		this.operationuser = operationuser;
	}
	public String getOperationip() {
		return operationip;
	}
	public void setOperationip(String operationip) {
		this.operationip = operationip;
	}
}