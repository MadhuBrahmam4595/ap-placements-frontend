<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<title>Bootstrap 5 Example</title>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">

<link href="./bootstrap-5.3.3/dist/css/bootstrap.min.css"
	rel="stylesheet">
<script src="./bootstrap-5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<script src="./js/jquery-3.7.1.min.js"></script>
<link rel="stylesheet"
	href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
<%
String navbarjwtToken = (String) session.getAttribute("jwtToken");
System.out.println("LoginSuccess=navbar=>" + navbarjwtToken);

String navbarroleId = (String) session.getAttribute("roleId");
System.out.println("LoginSuccess=navbarroleId=>" + navbarroleId);

String navbarinsCode = (String) session.getAttribute("insCode");
System.out.println("LoginSuccess=navbarinsCode=>" + navbarinsCode);

String navbarusername = (String) session.getAttribute("username");
System.out.println("LoginSuccess=username=>" + navbarusername);

String navbarinsName = (String) session.getAttribute("insName");
System.out.println("LoginSuccess=navbarinsName=>" + navbarinsName);
%>

<script>
$(document).ready(function(){
	//alert("ready");
	
	var roleId = '<%=navbarroleId%>';
	var insCode = '<%=navbarinsCode%>';
	var username = '<%=navbarusername%>';
	var insName = '<%=navbarinsName%>';

				//document.getElementById("userinfo").innerHTML = 'Welcome ' + username + ' (' + insCode + ')';

				if (roleId == "3") {
					
					$("#services").empty();
					$("#services").append('<h4 class="card-title text-danger">ITI Services</h4>');
					$("#services").append('1. <a href="./changeUserDetails" class="card-link">Change My Password</a><br>');
					$("#services").append('2. <a href="./privateStudentsEntry" class="card-link">Private Students Data Entry</a><br>');
					
					$("#labcard").empty();
					$("#labcard").append('<h4 class="card-title text-danger">LABS</h4>');
					
					$("#inplantcard").empty();
					$("#inplantcard").append('<h4 class="card-title  text-danger">IN-PLANT</h4>');
					$("#inplantcard").append('<h6 class="card-title  text-success mt-2">Reports</h6>');
					$("#inplantcard").append('1. <a href="./implantDistReport" class="card-link">In-Plant Report</a>');
				 
					$("#plcmtscard").empty();
					$("#plcmtscard").append('<h4 class="card-title  text-danger">PLACEMENTS</h4>');
					$("#plcmtscard").append('<h6 class="card-title  text-success">Services</h6>');
					$("#plcmtscard").append('1. <a href="./placementScheduleEntry" class="card-link">Schedule Entry</a><br>');
					$("#plcmtscard").append('<h6 class="card-title  text-success mt-2">Reports</h6>');
					$("#plcmtscard").append('2. <a href="./plcmtDistReport" class="card-link">Dist Report</a>');
					
				}

				if (roleId == '4') {

					$("#services").empty();
					$("#services").append('<h4 class="card-title text-danger">ITI Services</h4>');
					$("#services").append('<h6 class="card-title  text-success">Services</h6>');
					$("#services").append('1. <a href="./changeUserDetails" class="card-link">Change My Password</a><br>');
					$("#services").append('2. <a href="./employeEntry" class="card-link">Employee Registration</a><br>');
					$("#services").append('3. <a href="./employeServiceEntry" class="card-link">Employee Service</a><br>');
					$("#services").append('<h6 class="card-title  text-success mt-2">Reports</h6>');
					$("#services").append('4. <a href="./employeeITIReport" class="card-link">Employee Report</a><br>');
					
					$("#labcard").empty();
					$("#labcard").append('<h4 class="card-title text-danger">LABS</h4>');
					$("#labcard").append('<h6 class="card-title  text-success">Services</h6>');
					$("#labcard").append('1. <a href="./labEntry" class="card-link">Lab Entry</a><br>');
					$("#labcard").append('<h6 class="card-title  text-success mt-2">Reports</h6>');
					$("#labcard").append('2. <a href="./labItiReport" class="card-link">Lab Report</a>');
					
					$("#inplantcard").empty();
					$("#inplantcard").append('<h4 class="card-title  text-danger">IN-PLANT</h4>');
					$("#inplantcard").append('<h6 class="card-title  text-success">Services</h6>');
					$("#inplantcard").append('1. <a href="./implantEntry" class="card-link">In-Plant Training Entry</a><br>');
					$("#inplantcard").append('2. <a href="./industryITIMappingITI" class="card-link">ITI - Industry Mapping Entry</a><br>');
					$("#inplantcard").append('<h6 class="card-title  text-success mt-2">Reports</h6>');
					$("#inplantcard").append('3. <a href="./implantITIReport" class="card-link">In-Plant Report</a>');
				 
					$("#plcmtscard").empty();
					$("#plcmtscard").append('<h4 class="card-title  text-danger">PLACEMENTS</h4>');
					$("#plcmtscard").append('<h6 class="card-title  text-success">Services</h6>');
					$("#plcmtscard").append('1. <a href="./placementEntry" class="card-link">Placements Entry</a><br>');
					$("#plcmtscard").append('<h6 class="card-title  text-success mt-2">Reports</h6>');
					$("#plcmtscard").append('2. <a href="./plcmtItiReport" class="card-link">Placements ITI Report</a>');
					
				}

				if (roleId == '10') {
					//alert("role 10");

					$("#services").empty();
					$("#services").append('<h4 class="card-title text-danger">ITI Services</h4>');
					$("#services").append('<h6 class="card-title  text-success">Services</h6>');
					$("#services").append('1. <a href="./changeUserDetails" class="card-link">Change My Password</a><br>');
					$("#services").append('2. <a href="./userCreation" class="card-link">New User Creation</a><br>');
// 					$("#services").append('3. <a href="./userUpdation" class="card-link">Update User Details</a><br>');
					$("#services").append('<h6 class="card-title  text-success mt-2">Reports</h6>');
					$("#services").append('3. <a href="./usersList" class="card-link">Available Users</a><br>');
					$("#services").append('4. <a href="./employeeNodalReport" class="card-link">Employee Report</a>');
					
					
					$("#labcard").empty();
					$("#labcard").append('<h4 class="card-title text-danger">LABS</h4>');
					$("#labcard").append('<h6 class="card-title  text-success mt-2">Reports</h6>');
					$("#labcard").append('1. <a href="./labsNodalReport" class="card-link">Labs Report</a><br>');
					

					$("#inplantcard").empty();
					$("#inplantcard").append('<h4 class="card-title  text-danger">IN-PLANT</h4>');
					$("#inplantcard").append('<h6 class="card-title  text-success">Services</h6>');
					$("#inplantcard").append('1. <a href="./industryEntry" class="card-link">Industry Master Entry</a><br>');
					$("#inplantcard").append('2. <a href="./industryMasterReportNodalPreview" class="card-link">Industry Master preview</a><br>');
					$("#inplantcard").append('3. <a href="./industryITIMapping" class="card-link">ITI - Industry Mapping Entry</a><br>');
					$("#inplantcard").append('4. <a href="./industryPartnerDetails" class="card-link">Industry Partner Details</a><br>');
					

					
					$("#inplantcard").append('<h6 class="card-title  text-success mt-2">Reports</h6>');
					$("#inplantcard").append('5. <a href="./implantNodalReport" class="card-link">In-Plant Report</a><br>');
					$("#inplantcard").append('6. <a href="./industryMasterReportNodal" class="card-link">Industry Master Report</a><br>');
					$("#inplantcard").append('7. <a href="./industryITIMappingReportNodal" class="card-link">Industry - ITI Mapping Report</a><br>');
					$("#inplantcard").append('8. <a href="./inplantTraineesReport" class="card-link">Trainees Report</a><br>');
					$("#inplantcard").append('9. <a href="./inplantDatewiseReport" class="card-link">Datewise Report</a><br>');
					$("#inplantcard").append('10. <a href="./inplantYearwiseReport" class="card-link"> One Year&ITIWise Report</a><br>');
					$("#inplantcard").append('11. <a href="./inplantTwoYearwiseReport" class="card-link"> Two Years Inplant Training Report</a>');
					
					
					$("#plcmtscard").empty();
					$("#plcmtscard").append('<h4 class="card-title  text-danger">PLACEMENTS</h4>');
					$("#plcmtscard").append('<h6 class="card-title  text-success"></h6>');
					$("#plcmtscard").append('<h6 class="card-title  text-success mt-2">Reports</h6>');
					$("#plcmtscard").append('1. <a href="./plcmtScheduleswiseData" class="card-link">Schedulewise Data</a><br>');
					$("#plcmtscard").append('2. <a href="./plcmtScheduleDatewiseReport" class="card-link">Schedule Datewise Data</a><br>');
					$("#plcmtscard").append('3. <a href="./plcmtStateReport" class="card-link">State Report</a><br>');
					$("#plcmtscard").append('4. <a href="./plcmtYearWiseCountReport" class="card-link">Yearwise Report</a><br>');
					$("#plcmtscard").append('5. <a href="./stateSkillDevelopmentPlanReport" class="card-link">State Skill Development Plan Report</a><br>');
					$("#plcmtscard").append('6. <a href="./plcmtDataDetails" class="card-link">Placement Data Details Report</a><br>');
					
				}
				
				if (roleId == '11') {
					$("#services").empty();
					$("#services").append('<h4 class="card-title text-danger">ITI Services</h4>');
					$("#services").append('1. <a href="./changeUserDetails" class="card-link">Change My Password</a><br>');
					
					$("#labcard").empty();
					$("#labcard").append('<h4 class="card-title text-danger">LABS</h4>');
					$("#labcard").append('<h6 class="card-title  text-success mt-2">Reports</h6>');
					$("#labcard").append('1. <a href="./labsNodalReport" class="card-link">Labs Report</a><br>');
					
					$("#inplantcard").empty();
					$("#inplantcard").append('<h4 class="card-title  text-danger">IN-PLANT</h4>');
					$("#inplantcard").append('<h6 class="card-title  text-success">Services</h6>');
					$("#inplantcard").append('1. <a href="./industryPartnerDetails" class="card-link">Industry Partner Details</a><br>');
					$("#inplantcard").append('<h6 class="card-title  text-success mt-2">Reports</h6>');
					$("#inplantcard").append('2. <a href="./implantNodalReport" class="card-link">In-Plant Report</a><br>');
					$("#inplantcard").append('3. <a href="./industryITIMappingReportNodal" class="card-link">Industry - ITI Mapping Report</a><br>');
					$("#inplantcard").append('4. <a href="./inplantTraineesReport" class="card-link">Trainees Report</a><br>');
					$("#inplantcard").append('5. <a href="./industryPartnerDetailsNodalReport" class="card-link">Industry Partner Details Report</a>');
					$("#inplantcard").append('6. <a href="./inplantYearwiseReport" class="card-link">One Year&ITIWise Report</a><br>');
					$("#inplantcard").append('7. <a href="./inplantTwoYearwiseReport" class="card-link"> Two Years Inplant Training Report</a>');

					
					$("#plcmtscard").empty();
					$("#plcmtscard").append('<h4 class="card-title  text-danger">PLACEMENTS</h4>');
					$("#plcmtscard").append('<h6 class="card-title  text-success mt-2">Reports</h6>');
					$("#plcmtscard").append('1. <a href="./plcmtScheduleswiseData" class="card-link">Schedulewise Data</a><br>');
					$("#plcmtscard").append('2. <a href="./plcmtStateReport" class="card-link">State Report</a><br>');
					$("#plcmtscard").append('3. <a href="./plcmtYearWiseCountReport" class="card-link">Yearwise Report</a><br>');
					$("#plcmtscard").append('4. <a href="./plcmtScheduleDatewiseReport" class="card-link">Schedule Datewise Data</a><br>');
					$("#plcmtscard").append('5. <a href="./plcmtDataDetails" class="card-link">Placement Data Details Report</a><br>');

					
				}

			});
</script>

</head>
<body>

	<!-- 	 <div class="container "> -->
<!-- 	<nav class="navbar navbar-expand-sm navbar-dark bg-info rounded"> -->

<!-- 		<a class="navbar-brand" href="#"></a> -->
<!-- 		<button class="navbar-toggler" type="button" data-bs-toggle="collapse" -->
<!-- 			data-bs-target="#navbarSupportedContent" -->
<!-- 			aria-controls="navbarSupportedContent" aria-expanded="false" -->
<!-- 			aria-label="Toggle navigation"> -->
<!-- 			<span class="navbar-toggler-icon"></span> -->
<!-- 		</button> -->

<!-- 		<div class="collapse navbar-collapse" id="navbarSupportedContent"> -->

<!-- 			<ul class="navbar-nav me-auto  "> -->

<!-- 				<li class="nav-item"><a class="nav-link active" -->
<!-- 					aria-current="page" href="./loginSuccess"><i -->
<!-- 						class="fas fa-home fa-1x"></i></a></li> -->



<!-- 						SERVICES SERVICES SERVICES SERVICES SERVICES    -->
<!-- 								<li class="nav-item dropdown  px-3"><a -->
<!-- 									class="nav-link dropdown-toggle active" href="#" -->
<!-- 									id="navbarDropdown" role="button" data-bs-toggle="dropdown" -->
<!-- 									aria-expanded="false"> SERVICES </a> -->
<!-- 									<ul class="dropdown-menu bg-info" aria-labelledby="navbarDropdown" -->
<!-- 										id="services"> -->
<!-- 									</ul></li> -->
<!-- 						LAB ESTABLISHMENT LAB ESTABLISHMENT LAB ESTABLISHMENT LAB ESTABLISHMENT  -->
<!-- 								<li class="nav-item dropdown  px-3"><a -->
<!-- 									class="nav-link dropdown-toggle active" href="#" -->
<!-- 									id="navbarDropdown" role="button" data-bs-toggle="dropdown" -->
<!-- 									aria-expanded="false"> LABS </a> -->
<!-- 									<ul class="dropdown-menu bg-info" aria-labelledby="navbarDropdown" -->
<!-- 										id="labs"> -->
<!-- 									</ul></li> -->
									
<!-- 									<li class="nav-item dropdown  px-3"><a -->
<!-- 										class="nav-link dropdown-toggle active" href="#" -->
<!-- 										id="navbarDropdown" role="button" data-bs-toggle="dropdown" -->
<!-- 										aria-expanded="false"> LABS REPORTS </a> -->
<!-- 										<ul class="dropdown-menu bg-info" aria-labelledby="navbarDropdown" -->
<!-- 										id="labsReports"> -->
<!-- 									</ul></li> -->
<!-- 						PLACEMENTS PLACEMENTS PLACEMENTS PLACEMENTS PLACEMENTS PLACEMENTS PLACEMENTS PLACEMENTS PLACEMENTS  -->
<!-- 								<li class="nav-item dropdown  px-3"><a -->
<!-- 									class="nav-link dropdown-toggle active" href="#" -->
<!-- 									id="navbarDropdown" role="button" data-bs-toggle="dropdown" -->
<!-- 									aria-expanded="false"> PLACEMENTS </a> -->
<!-- 									<ul class="dropdown-menu bg-info" aria-labelledby="navbarDropdown" -->
<!-- 										id="placements"> -->
<!-- 									</ul></li> -->
									
<!-- 									<li class="nav-item dropdown  px-3"><a -->
<!-- 										class="nav-link dropdown-toggle active" href="#" -->
<!-- 										id="navbarDropdown" role="button" data-bs-toggle="dropdown" -->
<!-- 										aria-expanded="false"> PLACEMENTS REPORTS </a> -->
<!-- 										<ul class="dropdown-menu bg-info" aria-labelledby="navbarDropdown" -->
<!-- 										id="plcmtsReports"> -->
<!-- 									</ul></li> -->


				<!-- INTERNSHIP INTERNSHIP INTERNSHIP -->
<!-- 				<li class="nav-item dropdown  px-3"><a -->
<!-- 					class="nav-link dropdown-toggle active" href="#" -->
<!-- 					id="navbarDropdown" role="button" data-bs-toggle="dropdown" -->
<!-- 					aria-expanded="true"> IN-PLANT </a> -->
<!-- 					<ul class="dropdown-menu bg-info" aria-labelledby="navbarDropdown" -->
<!-- 						id="implant"> -->
<!-- 					</ul></li> -->
				
				 
<!-- 				<li class="nav-item dropdown  px-3"><a -->
<!-- 					class="nav-link dropdown-toggle active" href="#" -->
<!-- 					id="navbarDropdown" role="button" data-bs-toggle="dropdown" -->
<!-- 					aria-expanded="false"> IN-PLANT REPORTS </a> -->
<!-- 					<ul class="dropdown-menu bg-info" aria-labelledby="navbarDropdown" -->
<!-- 						id="inplantReports"> -->

<!-- 					</ul></li> -->
				
<!-- 				<li class="nav-link px-4"><span id="userinfo" -->
<!-- 					style="color: green; font-weight: bolder;font-size: 12px;"> </span></li> -->

<!-- 				<li class="nav-item px-1"><a -->
<!-- 					class="nav-link px-4 active text-danger" href="./logout">LOGOUT</a></li> -->
<!-- 			</ul> -->
<!-- 		</div> -->

<!-- 	</nav> -->

	<!-- </div> -->

	<div class="container p-2">
<!-- 		<div class="row border p-1 m-1" style="border-radius: 5px;"> -->
<!-- 			<div class="col-md-4"> <a class="nav-link active" aria-current="page" href="./loginSuccess"><i class="fas fa-home fa-1x"></i></a> </div> -->
<!-- 			<div class="col-md-7"> <span id="userinfo" style="color: black; font-weight: bolder;font-size: 18px;"> </span> </div> -->
<!-- 			<div class="col-md-1"> <a class="p-1" href="./logout" style="color: white;font-weight: bolder; background-color: black;border-radius: 5px;">LOGOUT</a> </div> -->
<!-- 		</div> -->
	
		<div class="row">
			<div class="col-md-3 d-flex">
				<div class="card h-100 w-100" >
					<div class="card-body" id="services"> </div>
				</div>
			</div>
			<div class="col-md-3 d-flex">
				<div class="card h-100  w-100" >
					<div class="card-body" id="labcard"> </div>
				</div>
			</div>
			<div class="col-md-3 d-flex">
				<div class="card h-100  w-100">
					<div class="card-body" id="inplantcard"> </div>
				</div>
			</div>
			<div class="col-md-3 d-flex">
				<div class="card h-100  w-100">
					<div class="card-body" id="plcmtscard"> </div>
				</div>
			</div>
		</div>
	</div>
</body>
</html>
