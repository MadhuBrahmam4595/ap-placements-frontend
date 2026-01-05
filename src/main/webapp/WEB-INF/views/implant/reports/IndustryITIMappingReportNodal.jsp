<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%
String industryITIMappingReportNodalJwtToken = (String) session.getAttribute("jwtToken");
System.out.println("implantEntryJwtToken=>" + industryITIMappingReportNodalJwtToken);

String industryITIMappingReportNodalapisUrl = (String) session.getAttribute("apisUrl");
System.out.println("implantEntryapisUrl=>" + industryITIMappingReportNodalapisUrl);

%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Industry ITI Mapping Report</title>
<link href="./bootstrap-5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
<script src="./bootstrap-5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<script src="./js/jquery-3.7.1.min.js"></script>
<script src="./js/siteScript.js"></script>
<script src="./js/CustomJs/ImplantJs/IndustryITIMappingReportNodalJs.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.17.0/xlsx.full.min.js"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
<script>
var jwtToken = '<%=industryITIMappingReportNodalJwtToken%>';
var baseUrl = '<%=industryITIMappingReportNodalapisUrl%>';
</script>
</head>
<body>
 <%@include file="/WEB-INF/views/public/banner.jsp"%>
<%@include file="/WEB-INF/views/userpages/userInfoNavbar.jsp"%>
 <div class="container border p-2 mt-2 shadow-lg" style="border-radius: 5px;">
		<div align="center" style="text-decoration: underline;color: fuchsia;">ITI-Industry Mapping Details</div>
		
		<div class="row mb-1">
			<div class="col-2">
				<label for="distcode">District</label>
				<select id="distcode" class="form-control" onchange="return filterData('dist');">
					<option value="">-SELECT-</option>
				</select>
			</div>
			<div class="col-3">
				<label for="iticode">ITI</label>
				<select id="iticode" class="form-control"  onchange="return filterData('iti');">
					<option value="">-SELECT-</option>
				</select>
			</div>
			<div class="col-3">
				<label for="industryId">INDUSTRY</label>
				<select id="industryId" class="form-control"  onchange="return filterData('industry');">
					<option value="">-SELECT-</option>
				</select>
			</div>
			<div class="col-2">
			</div>
			<div class="col-2"><button onclick="return fnExcelReport('reporttable');" class="btn btn-info btn-sm mt-4">DOWNLOAD EXCEL</button></div>
			
		</div>
		
		<table class="table table-bordered" id="reporttable">
			<thead>
				<tr>
					<td style="color: white;background-color: black;">S.NO</td>
					<td style="color: white;background-color: black;">ID</td>
					<td style="color: white;background-color: black;">DISTRICT</td>
					<td style="color: white;background-color: black;">ITI</td>
					<td style="color: white;background-color: black;">INDUSTRY</td>
					<td style="color: white;background-color: black;">TYPE</td>
					<td style="color: white;background-color: black;">TRADE</td>
					 
				</tr>
			</thead>
			<tbody id="tabledata"></tbody>
		</table>
		
		</div>
</body>
</html>