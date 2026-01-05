<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
        <%
String industryITIMappingITIJwtToken = (String) session.getAttribute("jwtToken");
System.out.println("industryITIMappingITIJwtToken =>" + industryITIMappingITIJwtToken);

String industryITIMappingITIinsCode = (String) session.getAttribute("insCode");
System.out.println("industryITIMappingITIinsCode =>" + industryITIMappingITIinsCode);

String industryITIMappingITIapisUrl = (String) session.getAttribute("apisUrl");
System.out.println("industryITIMappingITIapisUrl =>" + industryITIMappingITIapisUrl);


%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Industry ITI Mapping ITI </title>
<link href="./bootstrap-5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
<script src="./bootstrap-5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<script src="./js/jquery-3.7.1.min.js"></script>
<script src="./js/siteScript.js"></script>
<script src="./js/CustomJs/ImplantJs/IndustryITIMappingITIJs.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.17.0/xlsx.full.min.js"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
<script>
var jwtToken = 'Bearer '+'<%=industryITIMappingITIJwtToken%>';
var insCode = '<%=industryITIMappingITIinsCode%>';
var baseUrl = '<%=industryITIMappingITIapisUrl%>';

</script>
</head>
<body>
<%@include file="/WEB-INF/views/public/banner.jsp"%>
<%@include file="/WEB-INF/views/userpages/userInfoNavbar.jsp"%>
<div class="container border p-2 mt-2 shadow-lg" style="border-radius: 5px;">
		<div align="center" style="text-decoration: underline;color: fuchsia;">INDUSTRY - ITI MAPPING FORM</div>
		
<!-- 		<div class="row"> -->
<!-- 			<div class="col-md-6"> -->
<!-- 				<label for="dist">District Name</label> -->
<!-- 				<select class="form-control" id="dist" onchange="return getnItis(this.value);"> -->
<!-- 					<option value="">-SELECT-</option> -->
<!-- 				</select> -->
<!-- 			</div> -->
<!-- 			<div class="col-md-6"> -->
<!-- 				<label for="itiName">ITI Name</label> -->
<!-- 				<select class="form-control" id="itiName"> -->
<!-- 					<option value="">-SELECT-</option> -->
<!-- 				</select> -->
<!-- 			</div> -->
<!-- 		</div> -->
		
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
		<div align="center" id="servermsg"> </div>
		<div align="center" style="color: green;font-weight: bold;">${updateMsg } </div>
		</div>
		<div align="center" style="color: red;">${errorMsg }</div>
		<div class="container border p-2 mt-2 shadow-lg" style="border-radius: 5px;">
			<div align="center" style="text-decoration: underline;color: fuchsia;">Available Industries for your ITI</div>
			<form id="dataform" method="post">
			<table class="table table-bordered">
				<thead>
					<tr>
						<td style="background-color: black;color: white;">INDUSTRY ID</td>
						<td style="background-color: black;color: white;">NAME</td>
						<td style="background-color: black;color: white;">TYPE</td>
						<td style="background-color: black;color: white;">TRADE</td>
						<td style="background-color: black;color: white;">ACTIONS</td>
					</tr>
				</thead>
				<tbody id="industrydata"></tbody>
			</table>
			</form>
		</div>
</body>
</html>