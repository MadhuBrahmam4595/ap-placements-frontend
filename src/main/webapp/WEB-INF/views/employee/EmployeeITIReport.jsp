<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<%
String employeeItiReportJwtToken = (String) session.getAttribute("jwtToken");
System.out.println("employeeItiReportJwtToken=>" + employeeItiReportJwtToken);

String employeeItiReportInsCode = (String) session.getAttribute("insCode");
System.out.println("employeeItiReportInsCode=>" + employeeItiReportInsCode);

String employeeItiReportapisUrl = (String) session.getAttribute("apisUrl");
System.out.println("employeeItiReportapisUrl=>" + employeeItiReportapisUrl);
%>


<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Employee ITI Report</title>
<link href="./bootstrap-5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
<script src="./bootstrap-5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<script src="./js/jquery-3.7.1.min.js"></script>
<script src="./js/siteScript.js"></script>
<script src="./js/CustomJs/EmployeeJs/EmployeeITIReportJs.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.17.0/xlsx.full.min.js"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
	
<!-- Excel Export Library -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.17.0/xlsx.full.min.js"></script>

<!-- FontAwesome Icons -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">

<!-- Responsive Table Styling -->
<style>
    /* Make the table container scrollable */
    .table-responsive {
        overflow-x: auto;
        max-width: 100%;
    }
    
    /* Fix table header for scrolling */
    thead th {
        position: sticky;
        top: 0;
        background: black;
        color: white;
        z-index: 100;
    }

    /* Adjust table font for better readability */
    table {
        font-size: 14px;
        white-space: nowrap; /* Prevents text wrapping */
    }

    /* Make large tables more compact */
    th, td {
        padding: 8px;
        text-align: center;
    }

    /* Alternate row colors for better readability */
    tbody tr:nth-child(even) {
        background-color: #f8f9fa;
    }
</style>
<script>
var jwtToken = 'Bearer '+'<%=employeeItiReportJwtToken%>';
var insCode =  '<%=employeeItiReportInsCode%>';
var baseUrl =  '<%=employeeItiReportapisUrl%>';
</script>
</head>
<meta charset="UTF-8">
<title>Employee ITI Report</title>
</head>
<body>
<%@include file="/WEB-INF/views/public/banner.jsp"%>
	<%@include file="/WEB-INF/views/userpages/userInfoNavbar.jsp"%>
<!-- <div class="text-center" id="spinnerdiv"> -->
<!-- 			<span>Data is Loading...</span> -->
<!-- 			<div class="spinner-border" role="status"></div> -->
<!-- 		</div> -->
		<div class="container-fluid border p-3 mt-2 shadow-lg rounded">
    <div align="center" style="text-decoration: underline; color: fuchsia;">AVAILABLE EMPLOYEE INFORMATION </div>

		<button id="downloadEmployeeExcel" class="btn btn-success mb-2">
			<i class="fas fa-file-excel"></i> Download Employee Details
		</button>

		<!-- Table container with horizontal scrolling -->
    <div class="table-responsive">
        <table class="table table-bordered table-striped" id="reporttable">
            <thead>
                <tr>
                    <th>SNO</th>
                    <th>ITI NAME</th>
                    <th>EMPLOYEE NAME</th>
                    <th>EMPLOYEE CODE</th>
                    <th>DESIGNATION</th>
                    <th>DDO CODE</th>
                    <th>CONTACT NUMBER</th>
                    <th>TRADE</th>
                    <th>DOB</th>
                    <th>DOR</th>
                    <th>POST SANCTIONING G.O NO</th>
                    <th>ACADEMIC QUALIFICATION</th>
                    <th>TECHNICAL QUALIFICATION</th>
                    <th>RESERVATION CATEGORY</th>
                    <th>SUB CASTE</th>
                    <th>INITIAL APPOINTMENT POST</th>
                    <th>INITIAL APPOINTMENT DATE</th>
                    <th>DATE OF REPORTING IN PRESENT STATION</th>
                </tr>
            </thead>
            <tbody id="tablebody"></tbody>
        </table>
    </div>
</div>
<div class="modal fade" id="employeeDetailsModal" tabindex="-1" aria-labelledby="employeeDetailsLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
				<div
					class="modal-header d-flex justify-content-between align-items-center">
					<h5 class="modal-title">Employee Promotion Details</h5>

					<div class="d-flex gap-2">
						<!-- Excel Download Buttons for Modal Tables -->
						<button id="downloadPromotionExcel" class="btn btn-success">
							<i class="fas fa-file-excel"></i>Download Promotion Details
						</button>

						

						<!-- Close Button -->
						<button type="button" class="btn-close" data-bs-dismiss="modal"
							aria-label="Close"></button>
					</div>
				</div>

				<div class="modal-body">
                <table class="table table-bordered" id="promotionTable">
                    <thead>
                        <tr>
                            <th>Promotion Name</th>
                            <th>Date Of Promotion</th>
                            <th>Place Of Reporting</th>
                            
                        </tr>
                    </thead>
                    <tbody id="modalTableBody"></tbody>
                </table>
                
                <div class="modal-header d-flex justify-content-between align-items-center">
					<h5 class="modal-title"> Department Test Details</h5>
					
					<button id="downloadDeptTestExcel" class="btn btn-success">
							<i class="fas fa-file-excel"></i> Download Department Test Details
						</button>
					
					</div>
                
                <table class="table table-bordered" id="deptTestTable">
                    <thead>
                        <tr>
                            
                            <th>Department Test Name</th>
                            <th>Test Date</th>
                        </tr>
                    </thead>
                    <tbody id="modalTableBody2"></tbody>
                </table>
                
                
            </div>
        </div>
    </div>
</div>
</body>
</html>