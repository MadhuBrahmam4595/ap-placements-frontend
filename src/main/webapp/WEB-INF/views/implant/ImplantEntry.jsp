<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%
String implantEntryJwtToken = (String) session.getAttribute("jwtToken");
System.out.println("implantEntryJwtToken=>" + implantEntryJwtToken);

String implantEntryInsCode = (String) session.getAttribute("insCode");
System.out.println("implantEntryInsCode=>" + implantEntryInsCode);

String implantEntryapisUrl = (String) session.getAttribute("apisUrl");
System.out.println("implantEntryapisUrl=>" + implantEntryapisUrl);
%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>IN-PLANT Entry</title>
<link href="./bootstrap-5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
<script src="./bootstrap-5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<script src="./js/jquery-3.7.1.min.js"></script>
<script src="./js/siteScript.js"></script>
<script src="./js/CustomJs/ImplantJs/ImplantEntryJs.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.17.0/xlsx.full.min.js"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
<script>
var insCode = '<%=implantEntryInsCode%>';
var jwtToken = '<%=implantEntryJwtToken%>';
var baseUrl = '<%=implantEntryapisUrl%>';

</script>
</head>
<body onload="return getReady();">
<%@include file="/WEB-INF/views/public/banner.jsp"%>
<%@include file="/WEB-INF/views/userpages/userInfoNavbar.jsp"%>

	<div class="container border p-2 mt-2 shadow-lg" style="border-radius: 5px;">
		<div align="center" style="text-decoration: underline;color: fuchsia;">IN-PLANT TRAINING ENTRY FORM</div>
		<div class="row">
			<div class="col-md-4">
				<label for="facultyName">Faculty Name</label>
				<input type="text" name="facultyName" class="form-control" id="facultyName" />
				<span id="alertError"></span>
			</div>
			<div class="col-md-8">
				<label for="industryName">Industry Name / Firm Name</label>
				<select name="industryName" class="form-control" id="industryName">
				</select>
			</div>
<!-- 			<div class="col-md-4"> -->
<!-- 				<label for="implantTrade">Trade</label> -->
<!-- 				<select name="implantTrade" class="form-control" id="implantTrade"> -->
<!-- 					<option value="">-SELECT-</option> -->
<!-- 				</select> -->
<!-- 			</div> -->
		</div>
		<div class="row mt-2">
		<div class="col-md-4">
				<label for="location">Location</label>
				<input type="text" name="location" class="form-control" id="location" />
			</div>
			
			<div class="col-md-4">
				<label for="industryAddress">Industry Address</label>
				<input type="text" name="industryAddress" class="form-control" id="industryAddress" />
			</div>
			<div class="col-md-4">
				<label for="hrNo">HR Contact Number</label>
				<input type="text" name="hrNo" class="form-control" id="hrNo" maxlength="10" />
			</div>
		</div>
		<div class="row mt-2">
			<div class="col-md-4">
				<label for="fromDate">From Date</label>
				<input type="date" name="fromDate" class="form-control" id="fromDate" />
			</div>
			<div class="col-md-4">
				<label for="toDate">To Date</label>
				<input type="date" name="toDate" class="form-control" id="toDate" />
			</div>
			<div class="col-md-4">
				<label for="noOfStudents">Number of Student U.T</label>
				<input type="text" name="noOfStudents" class="form-control" id="noOfStudents" maxlength="9"/>
			</div>
		</div>
		<div class="row mt-2">
			<div class="col-md-4">
				<label for="implantDist">State</label> <select name="implantState"
					class="form-control" id="implantState" onchange="return getAllDists(this.value);">
					
				</select>
			</div>
			<div class="col-md-4">
				<label for="implantDist">District</label> <select name="implantDist"
					class="form-control" id="implantDist" >
					
				</select>
			</div>
			<div class="col-md-4">
				<label for="description">Description</label>
				<textarea name="description" class="form-control" id="description"></textarea>
			</div>
		</div>
		<div class="row mt-2">
			<div class="col-md-4">
				 
			</div>
			<div class="col-md-4">
				 <input type="button" class="btn btn-success" value="Save" style="width: 150px;margin-left: 100px;" 
				 onclick="return saveImplant();" />
			</div>
			<div class="col-md-4">
				 
			</div>
		</div>
		<div align="center" id="servermsg"></div>
		
	</div>

</body>
</html>