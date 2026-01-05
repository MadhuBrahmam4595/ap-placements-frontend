<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
    <%
String industryEntryJwtToken = (String) session.getAttribute("jwtToken");
System.out.println("industryEntryJwtToken=>" + industryEntryJwtToken);

String industryEntryapisUrl = (String) session.getAttribute("apisUrl");
System.out.println("industryEntryapisUrl=>" + industryEntryapisUrl);

%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Industry Entry</title>
<link href="./bootstrap-5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
<script src="./bootstrap-5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<script src="./js/jquery-3.7.1.min.js"></script>
<script src="./js/siteScript.js"></script>
<script src="./js/CustomJs/ImplantJs/IndustryEntryJs.js"></script>
<script>
var jwtToken = '<%=industryEntryJwtToken%>';
var baseUrl = '<%=industryEntryapisUrl%>';
</script>
</head>
<body>
<%@include file="/WEB-INF/views/public/banner.jsp"%>
<%@include file="/WEB-INF/views/userpages/userInfoNavbar.jsp"%>

<div class="container border p-2 mt-2 shadow-lg" style="border-radius: 5px;">
		<div align="center" style="text-decoration: underline;color: fuchsia;">INDUSTRY ENTRY FORM</div>
		
		
		<div class="row">
			<div class="col-md-8">
				<label for="industryname">Industry Name</label>
				<input type="text" id="industryname" class="form-control" />
			</div>
			<div class="col-md-4">
				<label for="industrytype">Industry Type</label>
				<select id="industrytype" class="form-control">
					<option value="">-SELECT-</option>
					<option value="Major">Major</option>
					<option value="Minor">Minor</option>
				</select>
			</div>
		</div>
		<div class="row">
			<div class="col-md-12">
				<label for="industryaddress">Industry Address</label>
				<textarea rows="" cols="" id="industryaddress" class="form-control"></textarea>
			</div>
		</div>
		<div align="center">
			<button class="btn btn-success m-2" onclick="return saveIndustry();">SUBMIT</button>
		</div>
		<div align="center" id="servermsg">
		</div>
		
</div>
</body>
</html>