<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
<%
String labsNodalReportJwtToken = (String) session.getAttribute("jwtToken");
System.out.println("labsNodalReportJwtToken=>" + labsNodalReportJwtToken);

String labsNodalReportApisUrl = (String) session.getAttribute("apisUrl");
System.out.println("labsNodalReportApisUrl=>" + labsNodalReportApisUrl);
 
%>
    
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Labs Nodal Report</title>
<link href="./bootstrap-5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
<script src="./bootstrap-5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<script src="./js/jquery-3.7.1.min.js"></script>
<script src="./js/siteScript.js"></script>
<script src="./js/CustomJs/labsJs/labsNodalReportJs.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.17.0/xlsx.full.min.js"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/exceljs/4.2.0/exceljs.min.js"></script>
<script>
var jwtToken = 'Bearer '+'<%=labsNodalReportJwtToken%>';
var baseUrl = '<%=labsNodalReportApisUrl%>';
</script>
</head>
<body>
<%@include file="/WEB-INF/views/public/banner.jsp"%>
<%@include file="/WEB-INF/views/userpages/userInfoNavbar.jsp"%>
 
 <div class="container border p-2 mt-2 shadow-lg" style="border-radius: 5px;">
		<div align="center" style="text-decoration: underline;color: fuchsia;">LABS REPORT</div>
		<div class="text-center" id="spinnerdiv">
			<span>Data is Loading...</span>
			<div class="spinner-border" role="status"></div>
		</div>
		<div class="row mb-1">
			<div class="col-2">
				<label for="distcode">District</label>
				<select id="distcode" class="form-control" onchange="return filterData('changedistcode');"> </select>
			</div>
			<div class="col-3">
				<label for="iticode">ITI</label>
				<select id="iticode" class="form-control"  onchange="return filterData('changeiticode');"> </select>
			</div>
			<div class="col-3">
				<label for="industryId">INDUSTRY</label>
				<select id="industryId" class="form-control"  onchange="return filterData('industryId');"> </select>
			</div>
			<div class="col-2">
<!-- 			<button class="btn btn-success btn-sm mt-4" onclick="return filterData();">GET DATA</button> -->
			</div>
<!-- 			<div class="col-2"><button onclick="return fnExcelReport('reporttable');" class="btn btn-info btn-sm mt-4">DOWNLOAD EXCEL</button></div> -->
			
		</div>
		<br>
		<button onclick="return fnExcelReport2('reporttable');" class="btn btn-info btn-sm m-1">DOWNLOAD EXCEL WITHOUT ITEM PHOTO</button>
			<button onclick="return fnExcelReport('reporttable');" class="btn btn-info btn-sm m-1">DOWNLOAD EXCEL WITH ITEM PHOTO</button>
			<table class="table table-bordered" id="reporttable">
				<thead>
					<tr>
						<th style="background-color: black;color: white;">SNO</th>
						<th style="background-color: black;color: white;">DISTRICT</th>
						<th style="background-color: black;color: white;">ITI</th>
						<th style="background-color: black;color: white;">INDUSTRY</th>
						<th style="background-color: black;color: white;">TRADE</th>
						<th style="background-color: black;color: white;">DESCRIPTION</th>
						<th style="background-color: black;color: white;">ITEM NAME</th>
						<th style="background-color: black;color: white;">ITEM COST</th>
						<th style="background-color: black;color: white;">ITEM PHOTO</th>
					</tr>
				</thead>
				<tbody id="tablebody"></tbody>
			</table>
 </div>
</body>
</html>