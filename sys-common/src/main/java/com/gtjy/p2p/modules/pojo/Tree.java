package com.gtjy.p2p.modules.pojo;

import java.util.List;
import java.util.Map;

/**
 * Extjs 所需树结构
 * @author wys
 *
 */
public class Tree {
	private String id;
	private String sourcesCode;
	private String text;
	private String icon;
	private boolean leaf;
	private boolean checked;
	private List<Tree> children;
	public Tree(){super();}
	public Tree(String id, String text, String icon, boolean leaf,List<Tree> children,boolean checke,String sourcesCode) {
		super();
		this.id = id;
		this.text = text;
		this.icon = icon;
		this.leaf = leaf;
		this.sourcesCode = sourcesCode;
		this.checked = checked;
		this.children = children;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getText() {
		return text;
	}
	public void setText(String text) {
		this.text = text;
	}
	public String getIcon() {
		return icon;
	}
	public void setIcon(String icon) {
		this.icon = icon;
	}
	public boolean isLeaf() {
		return leaf;
	}
	public void setLeaf(boolean leaf) {
		this.leaf = leaf;
	}
	public List<Tree> getChildren() {
		return children;
	}
	public void setChildren(List<Tree> children) {
		this.children = children;
	}
	public boolean isChecked() {
		return checked;
	}
	public void setChecked(boolean checked) {
		this.checked = checked;
	}
	public String getSourcesCode() {
		return sourcesCode;
	}
	public void setSourcesCode(String sourcesCode) {
		this.sourcesCode = sourcesCode;
	}
}