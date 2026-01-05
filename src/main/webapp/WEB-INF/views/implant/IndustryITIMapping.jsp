<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
      <%
String industryITIMappingJwtToken = (String) session.getAttribute("jwtToken");
System.out.println("industryITIMapping =>" + industryITIMappingJwtToken);

String industryITIMappingapisUrl = (String) session.getAttribute("apisUrl");
System.out.println("industryITIMappingapisUrl =>" + industryITIMappingapisUrl);

%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<link href="./bootstrap-5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
<script src="./bootstrap-5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<script src="./js/jquery-3.7.1.min.js"></script>
<script src="./js/siteScript.js"></script>
<script src="./js/CustomJs/ImplantJs/IndustryITIMappingJs.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.17.0/xlsx.full.min.js"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
<script>
var jwtToken = '<%=industryITIMappingJwtToken%>';
var baseUrl = '<%=industryITIMappingapisUrl%>';

</script>
</head>
<body>
<%@include file="/WEB-INF/views/public/banner.jsp"%>
<%@include file="/WEB-INF/views/userpages/userInfoNavbar.jsp"%>
<div class="container border p-2 mt-2 shadow-lg" style="border-radius: 5px;">
		<div align="center" style="text-decoration: underline;color: fuchsia;">INDUSTRY - ITI MAPPING FORM</div>
		
		<div class="row">
			<div class="col-md-6">
				<label for="dist">District Name</label>
				<select class="form-control" id="dist" onchange="return getnItis(this.value);">
					<option value="">-SELECT-</option>
				</select>
			</div>
			<div class="col-md-6">
				<label for="itiName">ITI Name</label>
				<select class="form-control" id="itiName">
					<option value="">-SELECT-</option>
				</select>
			</div>
		</div>
		
		<div class="row">
			<div class="col-md-6">
				<label for="industryName">Industry Name</label>
				<select class="form-control" id="industryName">
					<option value="">-SELECT-</option>
				</select>
			</div>
			<div class="col-md-6">
				<label for="industryName">Trade Name</label>
				<select class="form-control" id="tradeName">
					<option value="">-SELECT-</option>
				</select>
			</div>
		</div>
		<div class="row">
			
<!-- 			<div class="col-md-3"> -->
<!-- 				<label for="noOfTrades">No Of Trades</label> -->
<!-- 				<input type="text" id="noOfTrades" class="form-control"/> -->
<!-- 			</div> -->
<!-- 			<div class="col-md-3"> -->
<!-- 				<label for="noOfUnits">No Of Units</label> -->
<!-- 				<input type="text" id="noOfUnits" class="form-control"/> -->
<!-- 			</div> -->
			 
		</div>
		
		<div align="center">
			<button class="btn btn-success m-1" onclick="return savedData();">SUBMIT</button>
		</div>
		<div align="center" id="servermsg">
		</div>
		
		
		</div>
</body>
</html>