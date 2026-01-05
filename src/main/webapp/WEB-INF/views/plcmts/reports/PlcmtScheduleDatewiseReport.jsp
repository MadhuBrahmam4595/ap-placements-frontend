<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
     <%
    String plcmtScheduleDatewiseReportJwtToken = (String) session.getAttribute("jwtToken");
    System.out.println("plcmtScheduleDatewiseReportJwtToken=>" + plcmtScheduleDatewiseReportJwtToken);

    String plcmtScheduleDatewiseReportApisUrl = (String) session.getAttribute("apisUrl");
    System.out.println("plcmtScheduleDatewiseReportApisUrl=>" + plcmtScheduleDatewiseReportApisUrl);
    %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Plcmt Schedule Datewise Data</title>
<link href="./bootstrap-5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
<script src="./bootstrap-5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<script src="./js/jquery-3.7.1.min.js"></script>
<script src="./js/siteScript.js"></script>
<script src="./js/CustomJs/plcmtsJs/plcmtScheduleDatewiseReportJs.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.17.0/xlsx.full.min.js"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
<script>
	var jwtToken = 'Bearer '+'<%=plcmtScheduleDatewiseReportJwtToken%>';
	var baseUrl = '<%=plcmtScheduleDatewiseReportApisUrl%>';
	
</script>
<style>
	#scrollbar {
	width: 100%;
	height: 500px;
	overflow-x: auto;
	overflow-y: auto;
	text-align: justify;
}
#reporttable th{ position: sticky; top: 0px; background-color: black; color: white; }
</style>
</head>
<body>
<%@include file="/WEB-INF/views/public/banner.jsp"%>
<%@include file="/WEB-INF/views/userpages/userInfoNavbar.jsp"%>
 
	<div class="container border p-2 mt-2 shadow-lg" id="formdiv">
		<div align="center" style="text-decoration: underline;color: fuchsia;">SCHEDULE DATE WISE PLACEMENTS DATA</div>
		
		<div class="row">
			<div class="col-md-3">
				<label for="fromDate">Schedule From Date (MM-DD-YYYY)</label>
				<input type="date" id="fromDate" class="form-control"/>
			</div>
			<div class="col-md-3">
				<label for="toDate">Schedule To Date (MM-DD-YYYY)</label>
				<input type="date" id="toDate" class="form-control"/>
			</div>
			<div class="col-md-3">
				<label for="toDate">Schedule Type</label>
				<select id="ptype" class="form-control">
					<option value="">-SELECT-</option>
					<option value="Job">JOB</option>
					<option value="Apprenticeship">APPRENTICESHIP</option>
				</select>
			</div>
			<div class="col-md-3">
				<button class="btn btn-sm btn-success mt-4" onclick="return getData();">GET DATA</button>
			</div>
		</div>
		
	</div>

	<div class="d-flex justify-content-center" id="loadmsg">
	</div>
	<div class="container-fluid p-2 mt-2 " id="reportdiv">
		<div align="center" style="text-decoration: underline;color: fuchsia;">FILTER DATA BASED ON BELOW OPTIONS</div>
		<div class="row mb-1 border p-2 mt-2 shadow-lg">
			<div class="col-3">
				<label for="distcode">District</label> <select id="distcode"
					class="form-control"
					onchange="return filterData('changedistcode');">
				</select>
			</div>
			<div class="col-3">
				<label for="iticode">ITI</label> <select id="iticode"
					class="form-control" onchange="return filterData('changeiticode');">
				</select>
			</div>
			<div class="col-3">
				
			</div>
			<div class="col-3">
				<div class="d-flex justify-content-center">
					<button onclick="return fnExcelReport('reporttable');"
					class="btn btn-success btn-sm mt-4">DOWNLOAD EXCEL</button>
					<button onclick="return reloadpage();"
					class="btn btn-info btn-sm mt-4">GO BACK</button>
				</div>
				
			</div>

		</div>

		<div id="tablediv"></div>
	</div>
</body>
</html>