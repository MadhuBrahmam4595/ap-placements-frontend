<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<%
String privateStudentRegistrationJwtToken = (String) session.getAttribute("jwtToken");
System.out.println("privateStudentRegistrationJwtToken=>" + privateStudentRegistrationJwtToken);

String privateStudentRegistrationInsCode = (String) session.getAttribute("insCode");
System.out.println("privateStudentRegistrationInsCode=>" + privateStudentRegistrationInsCode);

String privateStudentRegistrationapisUrl = (String) session.getAttribute("apisUrl");
System.out.println("privateStudentRegistrationapisUrl=>" + privateStudentRegistrationapisUrl);
%>


<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Private Candidate AITT Under CTS </title>
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
var jwtToken = 'Bearer '+'<%=privateStudentRegistrationJwtToken%>';
var insCode =  '<%=privateStudentRegistrationInsCode%>';
var baseUrl =  '<%=privateStudentRegistrationapisUrl%>';
</script>
</head>
<body>
	<%@include file="/WEB-INF/views/public/banner.jsp"%>
	<%@include file="/WEB-INF/views/userpages/userInfoNavbar.jsp"%>
	<div class="container border p-2 mt-2 shadow-lg"
		style="border-radius: 5px;">
		<div align="center" style="text-decoration: underline; color: fuchsia; font-weight: bolder;">APPLICATION FORM FOR APPEARING AITT UNDER CTS AS PRIVATE CANDIDATE -2026</div>
		<form id="labForm1" enctype="multipart/form-data" method="aittForm">


<!-- 			<form method="post" enctype="multipart/form-data" id="aittForm"> -->

<!-- ================= PERSONAL DETAILS ================= -->
<div class="card mb-4 shadow-sm">
<div class="card-header bg-success text-white">
<h5 class="mb-0">PERSONAL DETAILS</h5>
</div>

<div class="card-body">

<div class="row m-1">
<div class="col-md-4">
<label>Category</label>
<select name="category" class="form-select">
<option value="">--SELECT--</option>
<option>Allied Trade</option>
<option>CoE</option>
<option>SCVT</option>
<option>Others</option>
</select>
</div>

<div class="col-md-4">
<label>Applicant Full Name</label>
<input type="text" name="applicantName" class="form-control">
</div>

<div class="col-md-4">
<label>Photo</label>
<input type="file" name="photo" class="form-control" accept="image/*">
</div>
</div>

<div class="row m-1">
<div class="col-md-4">
<label>Father’s Name</label>
<input type="text" name="fatherName" class="form-control">
</div>

<div class="col-md-4">
<label>Father’s Occupation</label>
<input type="text" name="fatherOccupation" class="form-control">
</div>

<div class="col-md-4">
<label>Mother’s Name</label>
<input type="text" name="motherName" class="form-control">
</div>
</div>

<div class="row m-1">
<div class="col-md-4">
<label>Date of Birth</label>
<input type="date" name="dob" class="form-control">
</div>

<div class="col-md-2">
<label>Age</label>
<input type="text" name="age" class="form-control">
</div>

<div class="col-md-3">
<label>Gender</label>
<select name="gender" class="form-select">
<option value="">--SELECT--</option>
<option>Male</option>
<option>Female</option>
<option>Other</option>
</select>
</div>

<div class="col-md-3">
<label>Caste</label>
<select name="caste" class="form-select">
<option value="">--SELECT--</option>
</select>
</div>
</div>

<div class="row m-1">

<div class="col-md-3">
<label>Sub Caste</label>
<select name="subcaste" class="form-select">
<option value="">--SELECT--</option>
</select>
</div>

<div class="col-md-3">
<label>PWD</label>
<select name="pwdFlag" class="form-select">
<option>No</option>
<option>Yes</option>
</select>
</div>

<div class="col-md-3">
<label>PWD Category</label>
<input type="text" name="pwdCategory" class="form-control">
</div>

<div class="col-md-3">
<label>EWS</label>
<select name="ewsFlag" class="form-select">
<option>No</option>
<option>Yes</option>
</select>
</div>
</div>

</div>
</div>

<!-- ================= ADDRESS & CONTACT ================= -->
<div class="card mb-4 shadow-sm">
<div class="card-header bg-success text-white">
<h5 class="mb-0">ADDRESS & CONTACT DETAILS</h5>
</div>

<div class="card-body">

<div class="row m-1">
<div class="col-md-6">
<label>Permanent Address</label>
<textarea name="permanentAddress" class="form-control"></textarea>
</div>

<div class="col-md-6">
<label>Correspondence Address</label>
<textarea name="correspondenceAddress" class="form-control"></textarea>
</div>
</div>

<div class="row m-1">
<div class="col-md-3">
<label>Mobile No</label>
<input type="text" name="mobile" class="form-control">
</div>

<div class="col-md-3">
<label>Aadhar No</label>
<input type="text" name="aadhar" class="form-control">
</div>

<div class="col-md-3">
<label>Email ID</label>
<input type="email" name="email" class="form-control">
</div>

<div class="col-md-3">
<label>Trade Applying For</label>
<select name="tradeApplied" class="form-select">
<option value="">--SELECT--</option>
</select>
</div>
</div>

</div>
</div>

<!-- ================= QUALIFICATIONS ================= -->
<div class="card mb-4 shadow-sm">
<div class="card-header bg-success text-white">
<h5 class="mb-0">EDUCATIONAL & TECHNICAL QUALIFICATIONS</h5>
</div>

<div class="card-body">
<div id="qualificationContainer">

<div class="row m-1">
<div class="col-md-4">
<label>From Year</label>
<input name="fromYear[]" class="form-control">
</div>

<div class="col-md-4">
<label>To Year</label>
<input name="toYear[]" class="form-control">
</div>


<div class="col-md-4">
<label>Institute Name</label>
<input name="instituteName[]" class="form-control">
</div>
</div>
<div class="row m-1">
<div class="col-md-4">
<label>Trade</label>
<input name="tradeName[]" class="form-control">
</div>

<div class="col-md-4">
<label>Exam</label>
<input name="examName[]" class="form-control">
</div>
<div class="col-md-3">
<label>SSC Marks / GPA</label>
<input name="sscMarks" class="form-control">
</div>

<div class="col-md-1">
<button type="button" class="btn btn-info mt-4">Add</button>
</div>
</div>
</div>
</div>
</div>

<!-- ================= PRESENT WORKING DETAILS ================= -->
<div class="card mb-4 shadow-sm">
<div class="card-header bg-success text-white"><h5>PRESENT WORKING DETAILS</h5></div>
<div class="card-body">

<div class="row m-1">
<div class="col-md-12">
<label>Office / Establishment Name & Address</label>
<textarea name="officeAddress" class="form-control"></textarea>
</div>
</div>

<div class="row m-1">
<div class="col-md-4">
<label>Employee ID Number</label>
<input name="employeeIdNumber" class="form-control">
</div>
<div class="col-md-4">
<label>Employer Mobile Number</label>
<input name="employerMobile" class="form-control">
</div>
<div class="col-md-4">
<label>Employer Email ID</label>
<input name="employerEmail" class="form-control">
</div>
</div>

<div class="row m-1">
<div class="col-md-12">
<label>Industry / Establishment Registration Details</label>
<textarea name="industryRegistrationDetails" class="form-control"></textarea>
</div>
</div>

</div>
</div>
<!-- ================= WORK EXPERIENCE ================= -->
<div class="card mb-4 shadow-sm">
<div class="card-header bg-success text-white">
<h5 class="mb-0">WORK EXPERIENCE DETAILS</h5>
</div>

<div class="card-body">

<div id="experienceContainer">

<div class="row m-1">
<div class="col-md-3">
<label>Industry Name</label>
<input name="industryName[]" class="form-control">
</div>

<div class="col-md-2">
<label>Designation</label>
<input name="designation[]" class="form-control">
</div>

<div class="col-md-2">
<label>From</label>
<input type="date" name="fromDate[]" class="form-control">
</div>

<div class="col-md-2">
<label>To</label>
<input type="date" name="toDate[]" class="form-control">
</div>

<div class="col-md-2">
<label>Experience (Y/M)</label>
<input name="yearsMonths[]" class="form-control">
</div>

<div class="col-md-1">
<button type="button" class="btn btn-info mt-4">Add</button>
</div>
</div>
</div>
</div>
</div>

<!-- ================= ESTABLISHMENT & STATUTORY DETAILS ================= -->
<div class="card mb-4 shadow-sm">
    <div class="card-header bg-success text-white">
        <h5 class="mb-0">ESTABLISHMENT & STATUTORY DETAILS</h5>
    </div>

    <div class="card-body">

        <!-- ===== Point 26 ===== -->
        <h6 class="fw-bold"> Whether the Establishment is covered under any of the following (Yes / No):</h6>

        <table class="table table-bordered">
            <tr>
                <td>a) Implementing Apprenticeship Training Scheme (ATS) and registered under Apprenticeship Portal</td>
                <td>
                    <input type="radio" name="atsRegistered" value="Yes"> Yes
                    <input type="radio" name="atsRegistered" value="No"> No
                </td>
            </tr>
            <tr>
                <td>b) Registered MSMEs</td>
                <td>
                    <input type="radio" name="msmeRegistered" value="Yes"> Yes
                    <input type="radio" name="msmeRegistered" value="No"> No
                </td>
            </tr>
            <tr>
                <td>c) Registered with Govt / Local Authorities / covered under Factories Act, 1948</td>
                <td>
                    <input type="radio" name="factoriesAct" value="Yes"> Yes
                    <input type="radio" name="factoriesAct" value="No"> No
                </td>
            </tr>
            <tr>
                <td>d) Shops and Establishments Act applicable for the State</td>
                <td>
                    <input type="radio" name="shopsAct" value="Yes"> Yes
                    <input type="radio" name="shopsAct" value="No"> No
                </td>
            </tr>
        </table>

        <!-- ===== Point 27 ===== -->
        <div class="row m-1">
            <div class="col-md-6">
                <label>If Yes, from which date implementing Apprentice Act:</label>
                <input type="date" name="apprenticeActDate" class="form-control">
            </div>
        </div>

        <!-- ===== Point 28 ===== -->
        <div class="row m-1">
            <div class="col-md-6">
                <label>Experience Certificate from Employer Enclosed:</label><br>
                <input type="radio" name="experienceCert" value="Yes"> Yes
                <input type="radio" name="experienceCert" value="No"> No
            </div>
        </div>

        <!-- ===== Point 29 ===== -->
        <div class="row m-1">
            <div class="col-md-6">
                <label>29. Character Certificate from Employer Enclosed:</label><br>
                <input type="radio" name="characterCert" value="Yes"> Yes
                <input type="radio" name="characterCert" value="No"> No
            </div>
        </div>

        <!-- ===== Point 30 ===== -->
        <div class="row m-1">
            <div class="col-md-6">
                <label>30. GPF / EPF Number</label>
                <input type="text" name="gpfEpfNo" class="form-control">
            </div>
            <div class="col-md-6">
                <label>Date of Commencement</label>
                <input type="date" name="gpfEpfDate" class="form-control">
            </div>
<!--             <div class="col-md-4"> -->
<!--                 <label>Upload Proof (Self-attested)</label> -->
<!--                 <input type="file" name="gpfEpfProof" class="form-control"> -->
<!--             </div> -->
        </div>

        <!-- ===== Point 31 ===== -->
        <div class="row m-1">
            <div class="col-md-6">
                <label>31. ESI Number</label>
                <input type="text" name="esiNo" class="form-control">
            </div>
            <div class="col-md-6">
                <label>Date of Commencement</label>
                <input type="date" name="esiDate" class="form-control">
            </div>
<!--             <div class="col-md-4"> -->
<!--                 <label>Upload Proof (Self-attested)</label> -->
<!--                 <input type="file" name="esiProof" class="form-control"> -->
<!--             </div> -->
        </div>

        <!-- ===== Declaration ===== -->
        <div class="row m-3">
            <div class="col-md-12">
                <input type="checkbox" name="declaration" required>
                <strong>
                    I certify that the information furnished by me in this Application is true and correct
                    to the best of my knowledge. If anything is found false in future, necessary action
                    may be initiated as deemed fit.
                </strong>
            </div>
        </div>

    </div>
</div>


<!-- ================= DECLARATION ================= -->
<div class="row mb-3">
<div class="col-md-12 text-center">
<button type="submit" class="btn btn-success px-5">Submit Application</button>
</div>
</div>

</form>
</div>
</div>

</body>
</html>