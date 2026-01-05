<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
        <%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
    <%
String yearWiseCountReportJwtToken = (String) session.getAttribute("jwtToken");
System.out.println("plcmtStateReportJwtToken=>" + yearWiseCountReportJwtToken);

String yearWiseCountReportRoleId = (String) session.getAttribute("roleId");
System.out.println("yearWiseCountReportRoleId=>" + yearWiseCountReportRoleId);

String yearWiseCountReportapisUrl = (String) session.getAttribute("apisUrl");
System.out.println("yearWiseCountReportapisUrl=>" + yearWiseCountReportapisUrl);


%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Plcmt Year Wise Count Report</title>
<link href="./bootstrap-5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
<script src="./bootstrap-5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<script src="./js/jquery-3.7.1.min.js"></script>
<script src="./js/siteScript.js"></script>
<script src="./js/CustomJs/plcmtsJs/plcmtYearWiseCountReportJs.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.17.0/xlsx.full.min.js"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">

<script>
var jwtToken = 'Bearer '+'<%=yearWiseCountReportJwtToken%>';
var roleid = '<%=yearWiseCountReportRoleId%>';
var baseUrl = '<%=yearWiseCountReportapisUrl%>';

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
<div class="container" id='containertable'>
            <div align="center">
                <h3 class="h3 text-danger">Year Wise Placement Report</h3>
                <input type="button" value="Excel Download" id="fnExcelReport" onclick="fnExcelReport('table');"/><br>
            </div>
            <table class="table table-bordered table-striped bg-info" id='table'>
                <thead>
                    <tr>
                        <th style="color: white;background-color: black;">S.NO</th>
                        <th style="color: white;background-color: black;">Pass Year</th>
                        <th style="color: white;background-color: black;">No.of Jobs</th>
                        <th style="color: white;background-color: black;">No.of Other than Jobs</th>
                        <th style="color: white;background-color: black;">No.of Apprenticeship</th>
                        <th style="color: white;background-color: black;">No.of Other than Apprenticeship</th>
                        <th style="color: white;background-color: black;">No.of Higher Education</th>
                        <th style="color: white;background-color: black;">No.of Self Employment</th>
                        <th style="color: white;background-color: black;">Total</th>
                    </tr>
                </thead>
                <tbody id="tbodyyy">

                </tbody>
            </table>

        </div>



        <div class="container-fluid" id="datadiv">
            <div align="center">
                <h3 class="h3 text-danger">Year Wise Placement Report </h3>
                <span id="datainfo" style="color: blue;"></span><br>
                <input type="button" value="Excel Download" id="fnExcelReport" onclick="fnExcelReport('reporttable');"/><br>
                <div class="text-center" id="spinnersdiv">
                    <h1 class="h1 text-danger">Data is Loading Please wait.........</h1>
                </div>
                <button  style="margin-top: 5px;color: black;background-color: orange;"  onclick="return reload()">GO BACK</button>
            </div>

            <table class="table table-bordered" id="reporttable">
                <thead id="reportthead"></thead>
                <tbody id="reportbody"></tbody>
            </table>

        </div>
</body>
</html>