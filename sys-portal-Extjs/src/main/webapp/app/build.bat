@echo off
title 物业系统前端压缩 Ctrl+C键结束服务
@echo 正在启用前端压缩工具...
@echo 作者:森森 15909910367@163.com
@echo 开始执行打包操作，请稍等 
@echo 打包完成后请到build目录下查看内容?
cd /d %~dp0
set startDir=%cd%
cd "%startDir%"
call sencha app build