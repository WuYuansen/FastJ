package sapp_generator;

import java.util.List;
import java.util.Map;

import org.gtjy.p2p.JSON.JSONUtil;


public class RightButton {
    @SuppressWarnings("unchecked")
    public static void main(String[] args) {
        String rightPrefix = "GXCX";
        String codeRightOrChinese ="[{k:'CX',v:'查询'},{k:'XG',v:'编辑'}]";
        List<Map<String,Object>> codeRightAndChineseList = (List<Map<String,Object>>)JSONUtil.ConvertObjectByJsonString(codeRightOrChinese, List.class);
        /*for(Map<String,Object> m : codeRightAndChineseList) {
            System.out.println(rightPrefix+"_"+m.get("k")+" <-> " +m.get("v"));
        }*/
        System.out.println(buttonCls("defaul"));
        System.out.println(ButtonClsEnum.danger.getDescription());
    }
    
  //获取按钮样式
    public static String buttonCls(String buttoncless) {
        String classButton = "";
        switch(ButtonClsEnum.valueOf(buttoncless)) {
            case info:
                classButton = "btn-info";
                break;
            case defaul : 
                classButton = "btn-default";
                break;
            case primary : 
                classButton = "btn-primary";
                break;
            case success : 
                classButton = "btn-success";
                break;
            case warning : 
                classButton = "btn-warning";
                break;
            case danger :
                classButton = "btn-danger";
                break;
            case link :
                classButton = "btn-link";
                break;
            default : 
                classButton = "btn-default";
                break;
        }
        return classButton;
    }
    
    enum ButtonClsEnum{
        //默认按钮
        defaul("btn-default"),
        //原始按钮
        primary("btn-primary"),
        //成功按钮
        success("btn-success"),
        //信息按钮
        info("btn-info"),
        //警告按钮
        warning("btn-warning"),
        //危险按钮
        danger("btn-danger"),
        //连接样式
        link("btn-link");
        
        private String description;
        
        private ButtonClsEnum(String description) {
            this.description = description;
        }
        public String getDescription() {
            return description;
        }
    }
}
