<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<%
String employeServiceJwtToken = (String) session.getAttribute("jwtToken");
System.out.println("employeServiceJwtToken=>" + employeServiceJwtToken);

String employeServiceInsCode = (String) session.getAttribute("insCode");
System.out.println("employeServiceInsCode=>" + employeServiceInsCode);

String employeServiceapisUrl = (String) session.getAttribute("apisUrl");
System.out.println("employeServiceapisUrl=>" + employeServiceapisUrl);
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
<script src="./js/CustomJs/EmployeeJs/EmployeeServiceDetailsJs.js"></script>
<script
	src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.17.0/xlsx.full.min.js"></script>
<link rel="stylesheet"
	href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
<script>
var jwtToken = 'Bearer '+'<%=employeServiceJwtToken%>';
var insCode =  '<%=employeServiceInsCode%>';
var baseUrl =  '<%=employeServiceapisUrl%>';
</script>
</head>
<body>
	<%@include file="/WEB-INF/views/public/banner.jsp"%>
	<%@include file="/WEB-INF/views/userpages/userInfoNavbar.jsp"%>
	<div class="container border p-2 mt-2 shadow-lg"
		style="border-radius: 5px;">
		<div align="center" style="text-decoration: underline; color: fuchsia; font-weight: bolder;">EMPLOYEE SERVICE FORM</div>
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
							<label for="designation">Designation</label> <select
								name="designation" class="form-control" id="designation">
								<option value="">--Select--</option>

							</select>
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
							<label for="presentWorkingStation">Present Working Station</label> 
							<input type="text" name="presentWorkingStation"
								class="form-control" id="presentWorkingStation" required />
						</div>

						<div class="col-md-4">
							<label for="workingSinceAllCadres"> Date from which
								working in the Present Station</label> <input
								type="date" name="workingSinceAllCadres" class="form-control"
								id="workingSinceAllCadres" required />
						</div>

					</div>

					<div class="row m-1">
						
						
						<div class="col-md-4">
							<label for="dateofbirth">Date of Birth</label> <input type="date"
								name="dob" class="form-control" required>
						</div>
						<div class="col-md-4">
							<label for="dateofresig">Date of Retirement</label> <input
								type="date" name="dor" class="form-control" required readonly>
						</div>
						<div class="col-md-4">
							<label>Total Service in Station (as on 31-05-2025)</label>
							<div class="d-flex">
								<input type="text" name="serviceYears" class="form-control me-1"
									placeholder="Years"> <input type="text"
									name="serviceMonths" class="form-control me-1"
									placeholder="Months" required> <input type="text"
									name="serviceDays" class="form-control" placeholder="Days">
							</div>
						</div>
					</div>

					<div class="row m-1">


						<div class="col-md-3">
							<label for="benchmarkDisability">Benchmark Disability
								(PwBD)</label> <select name="benchmarkDisability" class="form-select"
								id="benchmarkDisability" required>
								<option value="">--SELECT--</option>
								<option value="Yes">Yes</option>
								<option value="No">No</option>
							</select>
						</div>

						<!-- PwBD Category -->
						<div class="col-md-3">
							<label for="pbdCategory">PwBD Category</label> <select
								name="pbdCategory" class="form-select" id="pbdCategory" disabled>
								<option value="">--SELECT CATEGORY--</option>
								<option value="Visually Handicapped">Visually
									Handicapped</option>
								<option value="Physically Handicapped">Physically
									Handicapped</option>
								<option value="Mentally Retired">Mentally Retired</option>
								<option value="Multiple Disorder">Multiple Disorder</option>
							</select>
						</div>
						
						<!-- Percentage of Disability -->

						<div class="col-md-3">
							<label for="pwdPercentage">Percentage of Disability (%)</label> <input
								type="number" name="pwdPercentage" class="form-control"
								id="pwdPercentage" min="20" max="100" step="1"
								placeholder="e.g. 60" disabled>
						</div>

						<!-- Certificate Upload -->
						<div class="col-md-3">
							<label for="pbdCertificate">Upload PwBD Certificate (PDF)</label>
							<input type="file" name="pbdCertificate" class="form-control"
								id="pbdCertificate" accept=".pdf" disabled>
						</div>
						</div>
						
						<div class="row m-1">
						<!-- Spouse Working Place -->
						<div class="col-md-6">
							<label for="spouseWorkingPlace">Is Spouse Working?
								(Yes/No)</label> <select name="spouseWorkingPlace"
								class="form-select" id="spouseWorkingPlace">
								<option value="">--SELECT--</option>
								<option value="Yes">Yes</option>
								<option value="No">No</option>
							</select>
						</div>

						<div class="col-md-6" >
							<label for="spouseCertificate">Upload Spouse Certificate
								(PDF)</label> <input type="file" name="spouseCertificate"
   							 class="form-control" id="spouseCertificate" accept=".pdf" disabled />
						</div>
						
						</div>
						<div class="row m-1">

						<!-- Challenged Children -->
						<div class="col-md-6">
							<label for="challengedChildren">Mentally Challenged Children</label> <select
								name="challengedChildren" class="form-select"
								id="challengedChildren">
								<option value="">--SELECT--</option>
								<option value="Yes">Yes</option>
								<option value="No">No</option>
							</select>
						</div>

						<div class="col-md-6">
							<label for="challengedChildrenCert">Upload Certificate
								(PDF)</label> <input type="file" name="challengedChildrenCert"
								class="form-control" id="challengedChildrenCert" accept=".pdf" />
						</div>

				</div>
					<div class="row m-1">
						<!-- Widow Employee on Compassionate Grounds -->
						<div class="col-md-6">
							<label for="widowCase">Widow Employees Appointed on Compassionate
								Grounds</label> <select name="widowCase" class="form-select"
								id="widowCase">
								<option value="">--SELECT--</option>
								<option value="Yes">Yes</option>
								<option value="No">No</option>
							</select>
						</div>

						<div class="col-md-6">
							<label for="widowCertificate">Upload Widow Case
								Certificate (PDF)</label> <input type="file" name="widowCertificate"
								class="form-control" id="widowCertificate" accept=".pdf" />
						</div>
						</div>
						<div class="row m-1">

						<!-- Medical Grounds -->
						<div class="col-md-6">
							<label for="medicalGrounds">Medical Grounds of (Cancer, Heart,
								Neuro, Kidney)</label> <select name="medicalGrounds" class="form-select"
								id="medicalGrounds">
								<option value="">--SELECT--</option>
								<option value="Yes">Yes</option>
								<option value="No">No</option>
							</select>
						</div>

						<div class="col-md-6">
							<label for="medicalCertificate">Upload Medical
								Certificate (PDF)</label> <input type="file" name="medicalCertificate"
								class="form-control" id="medicalCertificate" accept=".pdf" />
						</div>
						</div>
						
						<div class="row m-1">


						<!-- Worked in Tribal Area -->
						<div class="col-md-6">
							<label for="workedTribalArea">Employee Worked more than 2 Years in Tribal
								Area</label> <select name="workedTribalArea" class="form-select"
								id="workedTribalArea">
								<option value="">--SELECT--</option>
								<option value="Yes">Yes</option>
								<option value="No">No</option>
							</select>
						</div>

						<!-- Area Name (Only visible if "Yes" is selected for Worked >2 Years in Tribal Area) -->
						<div class="col-md-6" >
							<label for="areaName">Area Name</label> <input type="text"
								name="areaName" class="form-control" id="areaName"
								placeholder="Enter Area Name" />
						</div>
						</div>

					<div class="row m-1">

						<!-- No. of Terms -->
						<div class="col-md-4">
							<label for="officeBearerTerms">Office Bearer (Memo
								GAD01...15-06-2022)  No. of Terms</label> <input
								type="number" name="officeBearerTerms" class="form-control"
								id="officeBearerTerms" min="0"   max="3"placeholder="e.g. 2" />
						</div>

						<!-- No. of Years -->
						<div class="col-md-4">
							<label for="officeBearerYears">Office Bearer (Memo
								GAD01...15-06-2022)  No. of Years</label> <input type="number"
								name="officeBearerYears" class="form-control"
								id="officeBearerYears" min="0" max="9" placeholder="e.g. 5" />
						</div>

						<!-- Office Bearer Certificate Upload -->
						<div class="col-md-4">
							<label for="officeBearerCert">Upload Office Bearer(Memo
								GAD01...15-06-2022) Certificate (PDF)</label> <input type="file" name="officeBearerCert"
								class="form-control" id="officeBearerCert" accept=".pdf" />
						</div>

					</div>

					
					
					
					<div class="row m-1">
						<div class="col-md-4">
							<label for="passPercentage">Pass Percentage(%) during ALTT</label> <input
								type="text" name="passPercentage" class="form-control"
								id="passPercentage">
						</div>

						<div class="col-md-4">
							<label for="placementPercentage">Placement Percentage(%)
								against AITT 2024</label> <input type="text" name="placementPercentage"
								class="form-control" id="placementPercentage">
						</div>

						<div class="col-md-4">
							<label for="remarks">Remarks</label>
							<textarea name="remarks" class="form-control" id="remarks"
								rows="3"></textarea>
						</div>
					</div>





				</div>
			</div>


			<div class="row mt-2"></div>


			<div class="row mb-3">
				<div class="col-md-12" align="center">
					
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