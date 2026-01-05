<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
        <%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
    <%
String plcmtDataReportJwtToken = (String) session.getAttribute("jwtToken");
System.out.println("plcmtDataReportJwtToken=>" + plcmtDataReportJwtToken);

String plcmtDataReportRoleId = (String) session.getAttribute("roleId");
System.out.println("plcmtDataReportRoleId=>" + plcmtDataReportRoleId);

String plcmtDataReportapisUrl = (String) session.getAttribute("apisUrl");
System.out.println("plcmtDataReportapisUrl=>" + plcmtDataReportapisUrl);


%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Plcmt Data Details Report</title>
<link href="./bootstrap-5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
<script src="./bootstrap-5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<script src="./js/jquery-3.7.1.min.js"></script>
<script src="./js/siteScript.js"></script>
<script src="./js/CustomJs/plcmtsJs/plcmtDataDetailsJs.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.17.0/xlsx.full.min.js"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">

<script>
var jwtToken = 'Bearer '+'<%=plcmtDataReportJwtToken%>';
var roleid = '<%=plcmtDataReportRoleId%>';
var baseUrl = '<%=plcmtDataReportapisUrl%>';

</script>
<style>
            #fnExcelReport{
                width: 10%;
                background-color: yellow;
                margin-bottom: 2px;
            }
        </style>
</head>
<body>
<%@include file="/WEB-INF/views/public/banner.jsp"%>
<%@include file="/WEB-INF/views/userpages/userInfoNavbar.jsp"%>
<br>
<div class="container border p-2 mt-2 shadow-lg">
        <div align="center" style="text-decoration: underline; color: fuchsia;">Plcmt Current Year Plus Seniors Report</div>
        <div class="row">
			<div class="col-md-3">
				<label for="year">Passed Year :</label> <select id="year"
					class="form-control">
					<option value="" selected disabled>Select Year</option>
					<%
					int currentYear = java.time.Year.now().getValue();
					for (int year = currentYear; year >= currentYear - 10; year--) {
					%>
					<option value="<%=year%>"><%=year%></option>
					<%
					}
					%>
				</select>
			</div>
			
			<div class="col-md-3">
				<label for="itiType">ITI Type :</label> <select id="itiType"
					class="form-control">
					<option value="" selected disabled>Select ITI Type</option>
					<option value="G">Govt</option>
					<option value="P">Pvt</option>
					<option value="All">ALL</option>
				</select>
			</div>
			
			<div class="col-md-3">
				<button class="btn btn-sm btn-success mt-4"
					onclick="return getData();">GET DATA</button>
			</div>

		</div>
    </div>
    

    	<div class="container-fluid border p-2 mt-2 shadow-lg">
		<div class="container-fluid" id="datadiv">
		<div align="center" style="text-decoration: underline;color: fuchsia;">PLACEMENT CURRENT PLUS SENIORS DATA REPORT</div>
    
    <button onclick="fnExcelReport('reporttable');" class="btn btn-info btn-sm">DOWNLOAD EXCEL</button>
    
        <div align="center" style="text-decoration: underline; color: fuchsia;" id="spinnerdiv" style="display: none;">
            <span>Data is Loading...</span>
            <div class="spinner-border" role="status"></div>
        </div>

        <table class="table table-bordered" id="reporttable">
            <thead>
                <tr>
                    <th>S.NO</th>
                    <th>DISTRICT</th>
                    <th>ITI</th>
                    <th>MIS CODE</th>
                    <th id="admitted1YearHeader">ADMITTED ONE YEAR</th>
                    <th id="admitted2YearHeader">ADMITTED TWO YEARS</th>
                    <th>TOTAL APPEARED</th>
                    <th>Job+OJ</th>
                    <th>Apprenticeship+OA</th>
                    <th>Self Employment</th>
                    <th>Higher Education</th>
                    <th>Total Placements</th>
                    
                    
   
                </tr>
            </thead>
            <tbody id="tablebody"></tbody>
        </table>
        
    </div>
    </div>
    
    
</body>
</html>