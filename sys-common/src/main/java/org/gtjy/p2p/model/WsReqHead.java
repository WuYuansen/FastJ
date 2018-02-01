package org.gtjy.p2p.model;

import javax.xml.bind.annotation.XmlElement;

import org.gtjy.p2p.beanValidation.rules.NotNull;
import org.gtjy.p2p.security.MD5;

/**
 * @类名称: WsReqHead
 * @说明: 请求头部
 * @作者: Loser森 javaer0415@gmail.com
 * @创建时间: 2017年3月1日 下午6:57:39
 */
public class WsReqHead {
	
	@NotNull(message="REQINFO为空")
	private String reqInfo;//REQINFO	请求类型（参见附录A.4）
	@NotNull(message="REGCODE为空")
	private String regCode ;//REGCODE	地区编号（行政区划代码，如110228代表密云县）
	@NotNull(message="ACTION型为空")
	private String action ;//ACTION	请求动作（参见附录A.5）
	@NotNull(message="TIMESTAMP为空")
	private String timeStamp ;//TIMESTAMP	请求动作时间流水，yyyyMMddHHmmss格式
	@NotNull(message="SESSIONKEY为空")
	private String sessionKey ;//SESSIONKEY	会话密钥:MD5加密（REQINFO + PROCODE + REGCODE + ACTION + TIMESTAMP）。
	private String token;	//TOKEN		请求密钥每个地区有每个地区特有的，由系统统一分配
	@XmlElement(name="REQINFO")
	public String getReqInfo() {
		return reqInfo;
	}
	public void setReqInfo(String reqInfo) {
		this.reqInfo = reqInfo;
	}
	@XmlElement(name="REGCODE")
	public String getRegCode() {
		return regCode;
	}
	public void setRegCode(String regCode) {
		this.regCode = regCode;
	}
	@XmlElement(name="ACTION")
	public String getAction() {
		return action;
	}
	public void setAction(String action) {
		this.action = action;
	}
	@XmlElement(name="TIMESTAMP")
	public String getTimeStamp() {
		return timeStamp;
	}
	public void setTimeStamp(String timeStamp) {
		this.timeStamp = timeStamp;
	}
	
	@XmlElement(name="SESSIONKEY")
	public String getSessionKey() {
		return MD5.sign(this.reqInfo+this.regCode+this.action+this.timeStamp);
	}
	public void setSessionKey(String sessionKey) {
		this.sessionKey = sessionKey;
	}
	@XmlElement(name="TOKEN")
	public String getToken() {
		return token;
	}
	public void setToken(String token) {
		this.token = token;
	}
}
