<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
     <%
    String inplantDatewiseReportJwtToken = (String) session.getAttribute("jwtToken");
    System.out.println("inplantDatewiseReportJwtToken=>" + inplantDatewiseReportJwtToken);

    String inplantDatewiseReportApisUrl = (String) session.getAttribute("apisUrl");
    System.out.println("inplantDatewiseReportApisUrl=>" + inplantDatewiseReportApisUrl);
    %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Inplant Datewise Data</title>
<link href="./bootstrap-5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
<script src="./bootstrap-5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<script src="./js/jquery-3.7.1.min.js"></script>
<script src="./js/siteScript.js"></script>
<script src="./js/CustomJs/ImplantJs/inplantDatewiseReportJs.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.17.0/xlsx.full.min.js"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
<script>
	var jwtToken = 'Bearer '+'<%=inplantDatewiseReportJwtToken%>';
	var baseUrl = '<%=inplantDatewiseReportApisUrl%>';
	
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
		<div align="center" style="text-decoration: underline;color: fuchsia;">Inplant Datewise Data</div>
		
		<div class="row">
			<div class="col-md-3">
				<label for="fromDate">From Date (MM-DD-YYYY)</label>
				<input type="date" id="from_date" class="form-control"/>
			</div>
			<div class="col-md-3">
				<label for="toDate">To Date (MM-DD-YYYY)</label>
				<input type="date" id="to_date" class="form-control"/>
			</div>

			<div class="col-md-3">
				<button class="btn btn-sm btn-success mt-4" onclick="return getData();">GET DATA</button>
			</div>
		</div>
	</div>
	<div class="container-fluid border p-2 mt-2 shadow-lg">
		<div class="container-fluid" id="datadiv">
		<div align="center" style="text-decoration: underline;color: fuchsia;">IN-PLANT DATEWISE REPORT</div>

		<div class="text-center" id="spinnerdiv">
			<span>Data is Loading...</span>
			<div class="spinner-border" role="status"></div>
		</div>

		<div class="row mb-1">
			<div class="col-2">
				<label for="distcode">District</label>
				<select id="distcode" class="form-control" onchange="return filterData('changedistcode');"></select>
			</div>
			<div class="col-3">
				<label for="iticode">ITI</label>
				<select id="iticode" class="form-control"  onchange="return filterData('changeiticode');"></select>
			</div>
			<div class="col-3">
				<label for="industryId">INDUSTRY</label>
				<select id="industryId" class="form-control"  onchange="return filterData('industryId');"></select>
			</div>
			<div class="col-2">
<!-- 			<button class="btn btn-success btn-sm mt-4" onclick="return filterData();">GET DATA</button> -->
			</div>
			<div class="col-2"><button onclick="return fnExcelReport('reporttable');" class="btn btn-info btn-sm mt-4">DOWNLOAD EXCEL</button></div>
			
		</div>
			<table class="table table-bordered" id="reporttable">
				<thead>
					<tr >
						<td style="background-color: black;color: white;" rowspan="2">S.NO</td>	
						<td style="background-color: black;color: white;" rowspan="2">DISTRICT</td>	
						<td style="background-color: black;color: white;" rowspan="2">ITI</td>
						<td style="background-color: black;color: white;" colspan="14" align="center"> IN-PLANT RELATED INFORMATION</td>
					</tr>
					<tr >
						<td style="background-color: black;color: white;">IN-PLANT ID</td>
						<td style="background-color: black;color: white;">INDUSTRY NAME</td>	
						<td style="background-color: black;color: white;">FACULTY NAME</td>	
						<td style="background-color: black;color: white;">IN-PLANT TRADE</td>	
						<td style="background-color: black;color: white;">INDUSTRY ADDRESS</td>	
						<td style="background-color: black;color: white;">HR CONTACT NUMBER</td>	
						<td style="background-color: black;color: white;">FROM DATE(DD-MM-YYYY)</td>	
						<td style="background-color: black;color: white;">TO DATE(DD-MM-YYYY)</td>	
						<td style="background-color: black;color: white;">NO OF DAYS</td>
						<td style="background-color: black;color: white;">NO OF STUDENT U.T</td>	
						<td style="background-color: black;color: white;">IN-PLANT STATE</td>	
						<td style="background-color: black;color: white;">IN-PLANT DISTRICT</td>	
						<td style="background-color: black;color: white;">LOCATION</td>	
						<td style="background-color: black;color: white;">DESCRIPTION</td>	
					</tr>
				</thead>
				<tbody id="tablebody"></tbody>
			</table>
		
		</div>
		
	</div>
</body>
</html>