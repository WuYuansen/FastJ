package com.gtjy.p2p.modules.pojo;

import java.util.List;

/**
 * 动态gridpanel列头
 * @author wys
 *
 */
public class GridPanelTitle {
	private String text;
	private String dataIndex;
	private List<GridPanelTitle> children;
	public GridPanelTitle(){
		super();
	}
	public GridPanelTitle(String text, String dataIndex) {
		super();
		this.text = text;
		this.dataIndex = dataIndex;
	}
	public String getText() {
		return text;
	}
	public void setText(String text) {
		this.text = text;
	}
	public String getDataIndex() {
		return dataIndex;
	}
	public void setDataIndex(String dataIndex) {
		this.dataIndex = dataIndex;
	}
	public List<GridPanelTitle> getChildren() {
		return children;
	}
	public void setChildren(List<GridPanelTitle> children) {
		this.children = children;
	}
}