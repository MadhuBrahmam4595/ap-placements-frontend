<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%
String industryPartnerDetailsJwtToken = (String) session.getAttribute("jwtToken");
System.out.println("industryPartnerDetailsJwtToken=>" + industryPartnerDetailsJwtToken);

String industryPartnerDetailsApisUrl = (String) session.getAttribute("apisUrl");
System.out.println("industryPartnerDetailsApisUrl=>" + industryPartnerDetailsApisUrl);
%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>INDUSTRY PARTNER DETAILS</title>
<link href="./bootstrap-5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
<script src="./bootstrap-5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<script src="./js/jquery-3.7.1.min.js"></script>
<script src="./js/siteScript.js"></script>
<script src="./js/CustomJs/ImplantJs/IndustryPartnerDetailsJs.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.17.0/xlsx.full.min.js"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
<script>
var jwtToken = 'Bearer '+'<%=industryPartnerDetailsJwtToken%>';
var baseUrl = '<%=industryPartnerDetailsApisUrl%>';
</script>
</head>
<body>
<%@include file="/WEB-INF/views/public/banner.jsp"%>
<%@include file="/WEB-INF/views/userpages/userInfoNavbar.jsp"%>
<div class="container ">
		<div align="center" style="text-decoration: underline;color: fuchsia;">INDUSTRY PARTNER DETAILS</div>

		<div class="border p-2 mt-2 shadow-lg">
			<div align="center" style="text-decoration: underline;color: fuchsia;">ENTRY FORM</div>
			<div class="row">
				<div class="col-md-6">
					<label for="distCode">DISTRICT</label>
					<select class="form-select" id="distCode" onchange="return getItis(this.value);"><option value="">-SELECT-</option></select>
				</div>
				<div class="col-md-6">
					<label for="itiCode">ITI</label>
					<select class="form-select" id="itiCode"><option value="">-SELECT-</option></select>
				</div>
			</div>
			<div class="row">
				<div class="col-md-6">
					<label for="revisedLeadSector">REVISED LEAD SECTOR</label>
					<input type="text" class="form-control" id="revisedLeadSector" />
				</div>
				<div class="col-md-6">
					<label for="proposedNewTrade">PROPOSED NEW TRADE</label>
					<input type="text" class="form-control" id="proposedNewTrade" />
				</div>
			</div>
			<div class="row">
				<div class="col-md-12">
				<label for="revisedLeadIndustryPartner">REVISED LEAD INDUSTRY PARTNER</label>
					<textarea rows="4" cols="4" class="form-control" id="revisedLeadIndustryPartner"></textarea>
				</div>
			</div>
			<div align="center" class="mt-1" id="submitbtn">
				  
			</div>
			<div align="center" class="mt-1" id="serverResp"></div>
		</div>



	</div>
	<div align="center">
	<button onclick="return fnExcelReport2('reporttable');" class="btn btn-info btn-sm m-1">DOWNLOAD EXCEL</button>
	</div>
	<div class="container border p-2 mt-2 shadow-lg">
		<div align="center" style="text-decoration: underline;color: fuchsia;">AVAILABLE INDUSTRY PARTNER DETAILS</div>
		
		<table class="table table-bordered" id="reporttable">
			<thead>
				<tr>
					<td style="background-color: black;color: white;">SNO</td>
					<td style="background-color: black;color: white;">DIST</td>
					<td style="background-color: black;color: white;">ITI</td>
					<td style="background-color: black;color: white;">REVISED LEAD SECTOR</td>
					<td style="background-color: black;color: white;">PROPOSED NEW TRADE</td>
					<td style="background-color: black;color: white;">REVISED LEAD INDUSTRY PARTNER</td>
					<td style="background-color: black;color: white;">ACTIONS</td>
				</tr>
			</thead>
			<tbody id="tabledata"></tbody>
		</table>
	</div>
</body>
</html>