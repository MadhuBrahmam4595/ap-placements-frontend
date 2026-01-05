<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<%
String employeRegistrationJwtToken = (String) session.getAttribute("jwtToken");
System.out.println("employeRegistrationJwtToken=>" + employeRegistrationJwtToken);

String employeRegistrationInsCode = (String) session.getAttribute("insCode");
System.out.println("employeRegistrationInsCode=>" + employeRegistrationInsCode);

String employeRegistrationapisUrl = (String) session.getAttribute("apisUrl");
System.out.println("employeRegistrationapisUrl=>" + employeRegistrationapisUrl);
%>


<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Employee Registration</title>
<link href="./bootstrap-5.3.3/dist/css/bootstrap.min.css"
	rel="stylesheet">
<script src="./bootstrap-5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<script src="./js/jquery-3.7.1.min.js"></script>
<script src="./js/siteScript.js"></script>
<script src="./js/CustomJs/EmployeeJs/EmployeRegistrationJs.js"></script>
<script
	src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.17.0/xlsx.full.min.js"></script>
<link rel="stylesheet"
	href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
<script>
var jwtToken = 'Bearer '+'<%=employeRegistrationJwtToken%>';
var insCode =  '<%=employeRegistrationInsCode%>';
var baseUrl =  '<%=employeRegistrationapisUrl%>';
</script>
</head>
<body>
	<%@include file="/WEB-INF/views/public/banner.jsp"%>
	<%@include file="/WEB-INF/views/userpages/userInfoNavbar.jsp"%>
	<div class="container border p-2 mt-2 shadow-lg"
		style="border-radius: 5px;">
		<div align="center" style="text-decoration: underline; color: fuchsia; font-weight: bolder;">EMPLOYEE REGISTRATION FORM</div>
		<form id="labForm" enctype="multipart/form-data" method="post">


			<div class="card mb-4 shadow-sm">
				<div class="card-header bg-success text-white">
					<h5 class="mb-0">EMPLOYEE DETAILS</h5>
				</div>
				<div class="card-body">

					<div class="row m-1">
						<div class="col-md-4">
							<label for="employee_name">Name of the Employee</label> <input
								type="text" name="employeeName" class="form-control"
								id="employee_name" required />
						</div>
						<div class="col-md-4">
							<label for="employee_code">Employee Code(CFMS)</label> <input
								name="employeeCode" class="form-control" id="employee_code"
								required>
						</div>

						<div class="col-md-4">
							<label for="ddo_code">DDO Code</label> <input name="ddoCode"
								class="form-control" id="ddo_code" required>

						</div>
					</div>

					<div class="row m-1">
						<div class="col-md-4">
							<label for="go_no">Post Sanctioning G.O No.</label> <input
								name="postSanctioningGoNo" class="form-control" id="go_no"
								required>
						</div>
						<div class="col-md-4">
							<label for="go_pdf">Upload G.O PDF</label> <input type="file"
								name="goCertificatePath[]" class="form-control"
								id="goCertificatePath" accept=".pdf" required>
						</div>
						<div class="col-md-4">
							<label for="designation">Designation</label> <select
								name="designation" class="form-control" id="designation">
								<option value="">--Select--</option>

							</select>
						</div>
					</div>

					<div class="row m-1">
						<div class="col-md-4">
							<label for="contact">Contact Number</label> <input type="text"
								name="contactNumber" class="form-control" id="contact" required />
						</div>
						
						<div class="col-md-4">
							<label for="designation">Date of Birth</label> <input type="date"
								name="dob" class="form-control" required>
						</div>
						<div class="col-md-4">
							<label for="designation">Date of Retirement</label> <input
								type="date" name="dor" class="form-control" required>
						</div>
					</div>

					<div class="row m-1">

						
						<div class="col-md-4">
							<label for="academicQualification">Academic Qualification</label>
							<select class="form-select" id="academicQualification"
								name="academicQualification">
								<option value="">-SELECT-</option>
							</select>
						</div>
						<div class="col-md-4">
							<label for="technicalQualification">Technical
								Qualification</label> <select name="technicalQualification"
								id="technicalQualification" class="form-select">
								<option value="">--SELECT--</option>
							</select>
						</div>
						<div class="col-md-4">
							<label for="goCertificatePath">Upload Technical
								Certificate</label> <input type="file" name="goTechCertificatePath[]"
								class="form-control" id="goTechCertificatePath" accept=".pdf"
								required>
						</div>
					</div>

					<div class="row m-1">
						
						<div class="col-md-4">
							<label for="tradeName">Trade</label> <select class="form-select"
								id="tradeName" name="tradeName">
								<option value="">-SELECT-</option>
							</select>
						</div>
						<div class="col-md-4">
							<label for="reservationCategory">Reservation Category</label> <select
								class="form-select" id="reservationCategory"
								name="reservationCategory">
								<option value="">-SELECT-</option>
							</select>
						</div>

						<div class="col-md-4">
							<label for="subCaste">Sub Caste</label> <select
								class="form-select" id="subCaste" name="subCaste">
								<option value="">-SELECT-</option>
							</select>
						</div>

					</div>

					<div class="row m-1">
						<div class="col-md-4">
							<label for="initial_appointment_post">Initial AppointmentPost</label>
							 <select name="initialAppointmentPost" class="form-control" id="initialAppointmentPost"> 
								<option value="">-SELECT-</option>
								
								</select>
							
						</div>
						
					

						<div class="col-md-4">
							<label for="initial_appointment_date">Date of Initial Appointment
								</label> <input type="date" name="dateOfInitialAppointment"
								class="form-control" id="initial_appointment_date" required>
						</div>
						<div class="col-md-4">
							<label for="reporting_present_station">Date of Reporting
								in Present Station </label> <input type="date"
								name="dateOfReportingPresentStation" class="form-control"
								id="reporting_present_station" required>
						</div>

					</div>



				</div>
			</div>


			<div class="card mb-4 shadow-sm">
				<div class="card-header bg-success text-white">
					<h5 class="mb-0">PROMOTION's DETAILS</h5>
				</div>
				<div class="card-body">
					<div id="itemContainer">
						<div class="row m-1">

							<div class="col-md-3">
								<label for="promotion_post">Promotion Post</label> <select
									name="promotionPost[]" class="form-control" id="promotion_post">
									<option value="">-SELECT-</option>
								</select>
							</div>
							<div class="col-md-2">
								<label for="promotion_cert">Upload Certificate</label> <input
									type="file" name="certificatePath[]" class="form-control"
									id="promotion_cert" accept=".pdf" required>
							</div>
							<div class="col-md-2">
								<label for="reporting_date">Date of Reporting</label> <input
									type="date" name="reportingDate[]" class="form-control"
									id="reporting_date" required>
							</div>

							<div class="col-md-3">
								<label for="place_of_reporting">Place of Reporting</label> <input
									type="text" name="placeOfReporting[]" class="form-control"
									id="place_of_reporting" required>
							</div>

							<div class="col-md-1">
								<button type="button" class="btn btn-danger mt-4 btn-sm"
									onclick="removeItem(this)">Remove</button>
							</div>
							<div class="col-md-1">
								<button type="button" class="btn btn-sm mt-4 btn-info"
									onclick="addMoreItems()">Add</button>
							</div>
						</div>
					</div>
				</div>
			</div>



			<div class="card mb-4 shadow-sm">
				<div class="card-header bg-success text-white">
					<h5 class="mb-0">DEPARTMENT TEST's DETAILS</h5>
				</div>
				<div class="card-body">
					<div id="testContainer">

						<div class="row m-1">
							<div class="col-md-5">
								<label for="accounts_test">Departmental Tests </label> <select
									class="form-select" id="accounts_test" name="testName[]">
									<option value="">-SELECT-</option>
								</select>
							</div>
							<div class="col-md-5">
								<label for="account_date">Date of Pass </label> <input
									type="date" name="passDate[]" class="form-control"
									id="account_date" required>
							</div>


							<div class="col-md-1">
								<button type="button" class="btn btn-danger mt-4 btn-sm"
									onclick="removeItem(this)">Remove</button>
							</div>
							<div class="col-md-1">
								<button type="button" class="btn btn-sm mt-4 btn-info"
									onclick="addTestItems()">Add </button>
							</div>
						</div>
					</div>


				</div>
			</div>

			<div class="row mt-2"></div>


			<div class="row mb-3">
				<div class="col-md-12" align="center">
					<!--                 	<input type="button" onclick="return saveLab();" value="save" /> -->
					<button type="submit" class="btn btn-success">Submit</button>
				</div>
			</div>
		</form>
		<!-- Success Modal -->
		<div class="modal fade" id="successModal" tabindex="-1"
			aria-labelledby="successModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header bg-success text-white">
						<h5 class="modal-title" id="successModalLabel">Success</h5>
						<button type="button" class="btn-close" data-bs-dismiss="modal"
							aria-label="Close"></button>
					</div>
					<div class="modal-body" id="successMessage">
						<!-- Success message will be injected here -->
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-success"
							data-bs-dismiss="modal">OK</button>
					</div>
				</div>
			</div>
		</div>


		<div align="center" id="serverErr"></div>
	</div>
</body>
</html>