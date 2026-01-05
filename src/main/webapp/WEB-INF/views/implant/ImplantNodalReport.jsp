<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%
String implantDistReportJwtToken = (String) session.getAttribute("jwtToken");
System.out.println("implantDistReportJwtToken=>" + implantDistReportJwtToken);

String implantDistReportapisUrl = (String) session.getAttribute("apisUrl");
System.out.println("implantDistReportapisUrl=>" + implantDistReportapisUrl);
%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>IN-PLANT Nodal Report</title>
<link href="./bootstrap-5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
<script src="./bootstrap-5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<script src="./js/jquery-3.7.1.min.js"></script>
<script src="./js/siteScript.js"></script>
<script src="./js/CustomJs/ImplantJs/ImplantNodalReportJs.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.17.0/xlsx.full.min.js"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
<script>
var jwtToken = 'Bearer '+'<%=implantDistReportJwtToken%>';
var baseUrl = '<%=implantDistReportapisUrl%>';
</script>
</head>
<body>
<%@include file="/WEB-INF/views/public/banner.jsp"%>
<%@include file="/WEB-INF/views/userpages/userInfoNavbar.jsp"%>

<div class="container-fluid" >
		<div align="center" style="text-decoration: underline;color: fuchsia;">IN-PLANT TRAININGS REPORT</div>

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


</body>
</html>