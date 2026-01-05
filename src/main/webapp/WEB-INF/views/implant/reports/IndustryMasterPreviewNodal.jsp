<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
	<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>  
<%
String industryMasterPreviewNodalJwtToken = (String) session.getAttribute("jwtToken");
System.out.println("industryMasterPreviewJwtToken=>" + industryMasterPreviewNodalJwtToken);

String industryMasterPreviewNodalapisUrl = (String) session.getAttribute("apisUrl");
System.out.println("industryMasterPreviewapisUrl=>" + industryMasterPreviewNodalapisUrl);
%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Industry Master Preview</title>
<link href="./bootstrap-5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
<script src="./bootstrap-5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<script src="./js/jquery-3.7.1.min.js"></script>
<script src="./js/siteScript.js"></script>
<script src="./js/CustomJs/ImplantJs/IndustryMasterPreviewNodalJs.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.17.0/xlsx.full.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/crypto-js.js"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
<script>
var jwtToken = '<%=industryMasterPreviewNodalJwtToken%>';
var baseUrl = '<%=industryMasterPreviewNodalapisUrl%>';
</script>
 
</head>
<body>
	<%@include file="/WEB-INF/views/public/banner.jsp"%>
	<%@include file="/WEB-INF/views/userpages/userInfoNavbar.jsp"%>
<div align="center" style="color: green;font-weight: bolder;">${successMsg }</div>
<div align="center" style="color: red;font-weight: bolder;">${errorMsg }</div>
	<div class="container border p-2 mt-2 shadow-lg"
		style="border-radius: 5px;">
		<div align="center"
			style="text-decoration: underline; color: fuchsia;">AVAILABLE
			INDUSTRY MASTER DATA</div>
		<form id="dataform" method="post">
		
			<table class="table table-bordered"id="reporttable">
				<thead>
					<tr>
						<td style="background-color: black; color: white;">S.NO</td>
						<td style="background-color: black; color: white;">ID</td>
						<td style="background-color: black; color: white;">NAME</td>
						<td style="background-color: black; color: white;">TYPE</td>
						<td style="background-color: black; color: white;">ADDRESS</td>
						<td style="background-color: black; color: white;">ACTIONS</td>
					</tr>
				</thead>
				<tbody id="tabledata"></tbody>
			</table>
		</form>
	</div>

	 
</body>
</html>