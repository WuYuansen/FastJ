package com.gtjy.p2p.win;

import java.awt.EventQueue;

import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JTextField;

public class R {

    private JFrame frmJavaV;
    private JTextField textField;
    private JTextField textField_1;
    private JTextField textField_2;
    private JTextField textField_3;
    private JTextField textField_4;
    private JTextField textField_5;
    private JTextField textField_6;

    /**
     * Launch the application.
     */
    public static void main(String[] args) {
        EventQueue.invokeLater(new Runnable() {
            public void run() {
                try {
                    R window = new R();
                    window.frmJavaV.setVisible(true);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    	
    	String  s = "[\"XZ\",\"XG\",\"SC\",\"CX\"]";
    	System.out.println(s.replace("[","").replace("]", "").replaceAll("\"",""));
    }

    /**
     * Create the application.
     */
    public R() {
        initialize();
    }

    /**
     * Initialize the contents of the frame.
     */
    private void initialize() {
        frmJavaV = new JFrame();
        frmJavaV.setTitle("java 代码批量生成器 V1.0");
        frmJavaV.setBounds(100, 100, 562, 423);
        frmJavaV.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frmJavaV.getContentPane().setLayout(null);
        
        JLabel label = new JLabel("输出目录:");
        label.setBounds(10, 10, 54, 15);
        frmJavaV.getContentPane().add(label);
        
        JLabel label_1 = new JLabel("公司:");
        label_1.setBounds(10, 38, 54, 15);
        frmJavaV.getContentPane().add(label_1);
        
        JLabel label_2 = new JLabel("项目:");
        label_2.setBounds(183, 38, 54, 15);
        frmJavaV.getContentPane().add(label_2);
        
        JLabel label_3 = new JLabel("作者:");
        label_3.setBounds(183, 63, 54, 15);
        frmJavaV.getContentPane().add(label_3);
        
        JLabel label_4 = new JLabel("创建时间:");
        label_4.setBounds(10, 63, 54, 15);
        frmJavaV.getContentPane().add(label_4);
        
        JLabel label_5 = new JLabel("创建年份:");
        label_5.setBounds(10, 90, 54, 15);
        frmJavaV.getContentPane().add(label_5);
        
        JLabel label_6 = new JLabel("实体类:");
        label_6.setBounds(10, 121, 54, 15);
        frmJavaV.getContentPane().add(label_6);
        
        JLabel label_7 = new JLabel("文件名:");
        label_7.setBounds(195, 121, 54, 15);
        frmJavaV.getContentPane().add(label_7);
        
        textField = new JTextField();
        textField.setBounds(41, 35, 132, 21);
        frmJavaV.getContentPane().add(textField);
        textField.setColumns(10);
        
        textField_1 = new JTextField();
        textField_1.setColumns(10);
        textField_1.setBounds(63, 88, 132, 21);
        frmJavaV.getContentPane().add(textField_1);
        
        textField_2 = new JTextField();
        textField_2.setColumns(10);
        textField_2.setBounds(51, 118, 132, 21);
        frmJavaV.getContentPane().add(textField_2);
        
        textField_3 = new JTextField();
        textField_3.setBounds(240, 118, 93, 21);
        frmJavaV.getContentPane().add(textField_3);
        textField_3.setColumns(10);
        
        textField_4 = new JTextField();
        textField_4.setColumns(10);
        textField_4.setBounds(214, 63, 132, 21);
        frmJavaV.getContentPane().add(textField_4);
        
        textField_5 = new JTextField();
        textField_5.setColumns(10);
        textField_5.setBounds(214, 35, 132, 21);
        frmJavaV.getContentPane().add(textField_5);
        
        textField_6 = new JTextField();
        textField_6.setColumns(10);
        textField_6.setBounds(63, 60, 112, 21);
        frmJavaV.getContentPane().add(textField_6);
    }
}
