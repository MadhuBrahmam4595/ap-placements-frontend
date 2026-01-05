<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>  
    <%
String editIndustryMasterJwtToken = (String) session.getAttribute("jwtToken");
System.out.println("editIndustryMasterJwtToken=>" + editIndustryMasterJwtToken);
%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Edit Industry Master</title>
<link href="./bootstrap-5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
<script src="./bootstrap-5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<script src="./js/jquery-3.7.1.min.js"></script>
<script src="./js/siteScript.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.17.0/xlsx.full.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/crypto-js.js"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
<script>
var jwtToken = 'Bearer '+'<%=editIndustryMasterJwtToken%>';
</script>
</head>
<body>
<%@include file="/WEB-INF/views/public/banner.jsp"%>
	<%@include file="/WEB-INF/views/userpages/userInfoNavbar.jsp"%>
	
	<div class="container border p-2 mt-2 shadow-lg" style="border-radius: 5px;">
		<div align="center" style="text-decoration: underline;color: fuchsia;">EDIT INDUSTRY ENTRY FORM</div>
		
		<form:form action="./updateIndustryMaster" modelAttribute="industryMaster" method="post">
		<form:hidden path="industryId" class="form-control"/>
		<div class="row">
			<div class="col-md-8">
				<label for="industryname">Industry Name</label>
				<form:input path="industryName" class="form-control"/>
			</div>
			<div class="col-md-4">
				<label for="industrytype">Industry Type</label>
				<form:select path="industryType" class="form-control">
					<form:option value="">-SELECT-</form:option>
					<form:option value="Major">Major</form:option>
					<form:option value="Minor">Minor</form:option>
				</form:select>
			</div>
		</div>
		<div class="row">
			<div class="col-md-12">
				<label for="industryaddress">Industry Address</label>
				<form:textarea path="industryAddress" rows="" cols="" class="form-control"></form:textarea>
			</div>
		</div>
		<div align="center">
			<button class="btn btn-success m-2" onclick="return saveIndustry();">SUBMIT</button>
		</div>
		<div align="center" id="servermsg">
		</div>
		</form:form>
</div>
	
	
	
		
	
	
</body>
</html>
		
				