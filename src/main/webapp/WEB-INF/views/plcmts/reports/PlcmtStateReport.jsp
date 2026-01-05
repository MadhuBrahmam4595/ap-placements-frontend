<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
      <%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
    <%
String plcmtStateReportJwtToken = (String) session.getAttribute("jwtToken");
System.out.println("plcmtStateReportJwtToken=>" + plcmtStateReportJwtToken);

String plcmtStateReportapisUrl = (String) session.getAttribute("apisUrl");
System.out.println("plcmtStateReportapisUrl=>" + plcmtStateReportapisUrl);


%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>State Report</title>
<link href="./bootstrap-5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
<script src="./bootstrap-5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<script src="./js/jquery-3.7.1.min.js"></script>
<script src="./js/siteScript.js"></script>
<script src="./js/CustomJs/plcmtsJs/plcmtStateReportJs.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.17.0/xlsx.full.min.js"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
<script>
var jwtToken = 'Bearer '+'<%=plcmtStateReportJwtToken%>';
var baseUrl =  '<%=plcmtStateReportapisUrl%>';

</script>
</head>
<body>
<%@include file="/WEB-INF/views/public/banner.jsp"%>
<%@include file="/WEB-INF/views/userpages/userInfoNavbar.jsp"%>
<br>
<div class="container-fluid">
            <div id="statediv">
                <div align="center">
                    <h5 class="h5 text-info" style="font-weight: bolder;text-decoration: underline;">STATE LEVEL PLACEMENT DETAILS</h5>
                </div>
                <div align="right">
                    <button class="btn btn-info" onclick="return fnExcelReport2('tbodyyy')">EXCEL DOWNLOAD</button>
                </div>
                <table class="table table-bordered" >
                    <thead>
                        <tr>
                            <td style="background-color: black;color: white;">S.NO</td>
                            <td style="background-color: black;color: white;">DIST NAME</td>
                            <td style="background-color: black;color: white;">JOBS</td>
                            <td style="background-color: black;color: white;">OTHER THAN JOBS</td>
                            <td style="background-color: black;color: white;">APPRENTICESHIP</td>
                            <td style="background-color: black;color: white;">OTHER THAN APPRENTICESHIP</td>
                            <td style="background-color: black;color: white;">SELF EMPLOYMENT</td>
                            <td style="background-color: black;color: white;">HIGHER EDUCATION</td>
                            <td style="background-color: black;color: white;">TOTAL</td>
                        </tr>
                    </thead>
                    <tbody id="tbodyyy"></tbody>
                </table>
            </div>
        </div>
        <div class="container-fluid">
            <div id="distdiv">
                <div align="center"><h5 class="h5 text-info" style="font-weight: bolder;text-decoration: underline;">DIST LEVEL REPORT - <b> <span id="distname"></span></b></h5></div>
                <div align="center"><h5 class="h5 text-info" style="font-weight: bolder;text-decoration: underline;">PLACEMENT TYPE - <b> <span id="ptypename"></span></b></h5></div>

                <input type="hidden" id="distcodee" />
                <input type="hidden" id="ptypee" />
                <div class="row">
                    <div class="col-lg-4">
                        <label class="form-label">ITI Name</label>
                        <select id="iticode" class="form-control">
                        </select>
                    </div>
                    <div class="col-lg-4">
                        <label class="form-label">Placement Year</label>
                        <select id="plcmtYear" class="form-control">
                        </select>
                    </div>
                    <div class="col-lg-2">
                        <label class="form-label"> </label>
                        <button class="btn btn-success form-control" style="margin-top: 5px;" 
                                onclick="return filterData()">SORT DATA</button>
                    </div>
                    <div class="col-lg-2">
                        <label class="form-label"> </label>
                        <button class="btn btn-warning form-control" style="margin-top: 5px;" 
                                onclick="return reload()">GO BACK</button>
                    </div>
                </div>
                <br>
                <div align="right">
                    <button class="btn btn-info" onclick="return fnExcelReport2('reporttable')">EXCEL DOWNLOAD</button>
                </div>
                <table class="table table-bordered" id="reporttable">
                    <thead id="reportthead"></thead>
                    <tbody id="reportbody"></tbody>
                </table>
            </div>
        </div>
</body>
</html>