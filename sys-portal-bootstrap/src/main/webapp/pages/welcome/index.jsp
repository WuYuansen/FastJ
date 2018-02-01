<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!-- 欢迎空白页 -->
<div class="my-main" style="overflow:auto;">
    <!-- <fieldset class="my-elem-field my-field-title">
        <legend>当前位置：欢迎页面</legend>
    </fieldset> -->
    <div class="" style="top:40px;bottom:40px;">
    	<ul class="flexbox je-box-left jew100 f14">
             <li class="flexbox je-box-left f_jew40">
             	<div class="panel panel-danger">
			            <div class="panel-header with-border">
			              <h3 class="panel-title"><b>归集接口监控</b></h3>
			              <div class="panel-tools pull-right">
			                <button type="button" class="btn btn-panel-tool" data-widget=""><i class="fa fa-minus"></i>
			                </button>
			                <button type="button" class="btn btn-panel-tool" data-widget="remove"><i class="fa fa-times"></i></button>
			              </div>
			            </div>
			            <div class="panel-body" style="display: block;" id="welcomeBaiduMapPanel">
			              	<baiducharts class="jew100" ec-width="10" ec-height="540" ec-config="mapConfig" ec-option="mapOption"></baiducharts>
			            </div>
				     </div>
             </li>&nbsp;
             <li class="flexbox je-box-right jew60">
             	<!--  -->
             	<div class="panel panel-danger">
				            <div class="panel-header with-border">
				              <h3 class="panel-title"><b>数据概览</b></h3>
				              <div class="panel-tools pull-right">
				              	<button type="button" class="btn btn-panel-tool" ng-click="expFile()" title="导出表格数据"><i class="fa fa-file-excel-o blue"></i></button>
				              	<button type="button" class="btn btn-panel-tool" ng-click="table()" title="表格显示"><i class="fa fa-table blue"></i></button>
				              	<!-- <button type="button" class="btn btn-panel-tool" ng-click="pie()" title="饼状图显示"><i class="fa fa-pie-chart blue"></i></button> -->
				                <button type="button" class="btn btn-panel-tool" ng-click="bar()" title="折线图显示"><i class="fa fa-bar-chart blue"></i></button>
				                <button type="button" class="btn btn-panel-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
				                <button type="button" class="btn btn-panel-tool" data-widget="remove"><i class="fa fa-times"></i></button>
				              </div>
				            </div>
				            <div class="panel-body" style="display: none;" name="dynamic_div_bar">
				            	<baiducharts class="jew100" ec-height="480" ec-config="barConfig" ec-option="barOption"></baiducharts>
				            </div>
				            <div class="panel-body" style="display: none;" name="dynamic_div_pie">
				            	<baiducharts class="jew100" ec-height="480" ec-config="pieConfig" ec-option="pieOption"></baiducharts>
				            </div>
				            <div class="panel-body" style="display: block;" name="dynamic_div">
				            		<!--  -->
				                	<table style="border-collapse: collapse; width: 100%; height: auto; top: 0pt; left: 0pt;" cellpadding="0" cellspacing="0" class="component style5">
										<thead>
											<tr height="73">
												<th class="style11 component" style="width: 120px;"
													rowspan="2">
													<div class="component style7"
														style="position: relative; width: 100%;">
														<div class="component style8 hideOverflow f16"
															style="width: 28.2999992370605pt; top: -2pt; left: 5.65000009536743pt;">
															<div style="padding-top: 0.02587891pt;">区县</div>
														</div>
														<div class="component style9 hideOverflow f16"
															style="width: 30.2999992370605pt; top: -15pt; left: 39.6500015258789pt;">
															<div style="padding-top: 0.02587891pt;">类别</div>
														</div>
														<div class="style10 component"
															style="width:100%; height: 0; left: 0pt; top:100%">
														</div>
													</div>
												</th>
												<th scope="col" class="style11 component fontWeight_6 f16" style="text-align:center;">应急处置总数(件)</th>
												<th scope="col" class="style11 component fontWeight_6 f16" style="text-align:center;">困人总数(人)</th>
												<th scope="col" class="style11 component fontWeight_6 f16" style="text-align:center;">故障发生数量(件)</th>
												<th scope="col" class="style11 component fontWeight_6 f16" style="text-align:center;">解救人数(人)</th>
												<th scope="col" class="style11 component fontWeight_6 f16" style="text-align:center;">电梯总数(部)</th>
											</tr>
										</thead>
										<tbody>
											<tr ng-repeat="item in result.list">
												<th class="component style15 hideOverflow" style="text-align:left;"><a
													href="javascript:void(0);" ng-click="areaClick(item);">{{item.REMARKS || item.KEYNAME}}</a></th>
												<td class="style16 component"><a href="javascript:;" ng-click="redirectToView(item,'#/dataCollection/biz/dtxx/index')">{{item.total || 0}}</a></td>
												<td class="style16 component">{{item.bkrs || 0}}</td>
												<td class="style16 component">{{item.gzfss || 0}}</td>
												<td class="style16 component">{{item.jkbkrs || 0}}</td>
												<td class="style16 component">{{item.dtCount || 0}}</td>
											</tr>
											<tr>
												<th class="component style11 hideOverflow fontWeight_6" style="text-align:center;" colspan=1>合计</th>
												<td class="style11 component fontWeight_6">{{result.totalT || 0 }}</td>
												<td class="style11 component fontWeight_6">{{result.bkrsT || 0}}</td>
												<td class="style11 component fontWeight_6">{{result.gzfssT  || 0}}</td>
												<td class="style11 component fontWeight_6">{{result.jkbkrsT || 0}}</td>
												<td class="style11 component fontWeight_6">{{result.dtT || 0}}</td>
											</tr>
										</tbody>
									</table>
				                	<!--  -->
				            </div>
					     </div>
             	<!--  -->
             </li>
        </ul>
    
        <!-- content -->
        <!--  -->
          <ul class="flexbox je-box-left jew100 f14">
                <li class="flexbox je-box-left jew100">
			     <div class="panel panel-danger" style="border: 0px;top: -10px;">
		            <div class="panel-body" style="display: block;">
              				<ul class="flexbox je-box-left jew100 f14">
				                <li class="flexbox je-box-right jew50">
					                <div class="panel panel-danger">
					                	<div class="panel-header with-border">
							              <h3 class="panel-title"><b>救援时间统计</b></h3>
							              <div class="panel-tools pull-right">
							                <button type="button" class="btn btn-panel-tool" data-widget="collapse"><i class="fa fa-minus"></i>
							                </button>
							                <button type="button" class="btn btn-panel-tool" data-widget="remove"><i class="fa fa-times"></i></button>
							              </div>
							            </div>
					                	<div class="panel-body" id="welcomeRescueTimePanel">
					                		<!-- 平均到达时间和平均救援时间 -->
					                		<baiducharts class="jew100" ec-height="jyPjHeight" ec-config="JyPjConfig" ec-option="JyPjOption"></baiducharts>
					                	</div>
					                </div>
				                </li>
				                &nbsp;
				                <li class="flexbox je-box-right jew50">
					                <div class="panel panel-danger">
					                	<div class="panel-header with-border">
							              <h3 class="panel-title"><b>到达救援现场统计</b></h3>
							              <div class="panel-tools pull-right">
							                <button type="button" class="btn btn-panel-tool" data-widget="collapse"><i class="fa fa-minus"></i>
							                </button>
							                <button type="button" class="btn btn-panel-tool" data-widget="remove"><i class="fa fa-times"></i></button>
							              </div>
							            </div>
					                	<div class="panel-body" id="welcomeReachTimePanel">
					                		<!-- 按规定时间到达救援现场和超过规定时间到达救援现场的比率 -->
					                		<baiducharts class="jew100" ec-height="300" ec-config="GdsjDdConfig" ec-option="GdsjDdOption"></baiducharts>
					                	</div>
					                </div>
				                </li>
				         	</ul>
				         	<ul class="flexbox je-box-left jew100 f14">
				               <ul class="flexbox je-box-left jew100 f14">
				                	<li class="flexbox je-box-right jew20">
				                			<div class="panel panel-danger">
					                		<div class="panel-header with-border">
					                			<h3 class="panel-title"><b>故障高发电梯</b></h3>
				                			</div>
						                	<div class="panel-body">
						                		<ul class="rank_list">
									                <li class="top3" ng-repeat="dt in GFDT"><em>{{$index+1}}</em><a href="javascript:;" title="{{dt.LIFTADDRESS}}">{{dt.LIFTADDRESS  | limitTo:20}}&nbsp;&nbsp;({{dt.NUM}})</a></li>
									            </ul>
						                	</div>
						                </div>
				                	</li>
				                	&nbsp;
				                	<li class="flexbox je-box-right jew60">
				                		<div class="panel panel-danger">
					                		<div class="panel-header with-border">
					                			<h3 class="panel-title"><b>故障原因分析</b></h3>
				                			</div>
						                	<div class="panel-body">
						                		<!--故障原因柱状图-->
						                		<baiducharts class="jew100" ec-height="300" ec-config="gzyyConfig" ec-option="gzyyOption"></baiducharts>
					                		</div>
					                	</div>
				                	</li>
				                	&nbsp;
				                	<li class="flexbox je-box-right jew20">
				                		<div class="panel panel-danger">
					                		<div class="panel-header with-border">
												<h3 class="panel-title"><b>故障高发单位</b></h3>
											</div>
						                	<div class="panel-body">
						                		<ul class="rank_list">
									                <li class="top3" ng-repeat="dw in GZGFDW"><em>{{$index+1}}</em><a href="javascript:;" title="{{dw.USERUNITS}}">{{dw.USERUNITS | limitTo:20}}&nbsp;&nbsp;({{dw.NUM}})</a></li>
									            </ul>
						                	</div>
						                </div>
				                	</li>
			                	</ul>
				         	</ul>
	              		<!--  -->
		            </div>
			     </div>
		     	</li>
     	</ul>
    <!-- content -->
    	</div>
    </div>
</div>