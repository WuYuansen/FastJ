package org.gtjy.p2p.model;

import javax.xml.bind.annotation.XmlElement;

/**
 * @类名称: WsReqHead
 * @说明: 请求头部
 * @作者: Loser森 javaer0415@gmail.com
 * @创建时间: 2017年3月1日 下午6:57:39
 */
public class WsRespHead {
	private String respInfo;//REQINFO	请求类型（参见附录A.4）
	private String action ;//ACTION	请求动作（参见附录A.5）
	private String timeStamp ;//TIMESTAMP	请求动作时间流水，yyyyMMddHHmmss格式
	@XmlElement(name="RESPINFO")
	public String getRespInfo() {
		return respInfo;
	}
	public void setRespInfo(String respInfo) {
		this.respInfo = respInfo;
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
}
