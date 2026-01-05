<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
       <%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
    <%
String plcmtItiReportJwtToken = (String) session.getAttribute("jwtToken");
System.out.println("plcmtItiReportJwtToken=>" + plcmtItiReportJwtToken);

String plcmtItiReportInsCode = (String) session.getAttribute("insCode");
System.out.println("plcmtItiReportInsCode=>" + plcmtItiReportInsCode);

String plcmtItiReportapisUrl = (String) session.getAttribute("apisUrl");
System.out.println("plcmtItiReportapisUrl=>" + plcmtItiReportapisUrl);


%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Plcmt Iti Report</title>
<link href="./bootstrap-5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
<script src="./bootstrap-5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<script src="./js/jquery-3.7.1.min.js"></script>
<script src="./js/siteScript.js"></script>
<script src="./js/CustomJs/plcmtsJs/plcmtItiReportJs.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.17.0/xlsx.full.min.js"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
<script>
var jwtToken = 'Bearer '+'<%=plcmtItiReportJwtToken%>';
var insCode =  '<%=plcmtItiReportInsCode%>';
var baseUrl =  '<%=plcmtItiReportapisUrl%>';
</script>
</head>
<body>
<%@include file="/WEB-INF/views/public/banner.jsp"%>
<%@include file="/WEB-INF/views/userpages/userInfoNavbar.jsp"%>
<br>
<div align="center" style="color: blue;"><h5>Placement Details - ITI Level</h5></div>
        
        <div class="container">
            
            <div class="row">
                <div class="col-lg-4">
                    <label class="form-label">Placement Type</label>
                     <select name="ptype" class="form-control" id="ptype" 
                             onchange="return doErrNull('ptypeErr');">
<!--                    <option value="all">-All-</option>-->
                    <option value="">-SELECT-</option>
                    <option value="Job">Job</option>
                    <option value="OJ">Other than Job</option>
                    <option value="Apprenticeship">Apprenticeship</option>
                    <option value="OA">Other than Apprenticeship</option>
                    <option value="HigherEducation">Higher Education</option>
                    <option value="SelfEmployment">Self Employment</option>
                </select>
                    <span id="ptypeErr"></span>
                </div>
                <div class="col-lg-4">
                    <label class="form-label">Placement Year</label>
                    <select id="plcmtYear" class="form-control">
                    </select>
                </div>
                <div class="col-lg-2">
                     <label class="form-label"> </label>
                     <button class="btn btn-success form-control" style="margin-top: 7px;" onclick="return getData()">GET DATA</button>
                </div>
            </div>
            
        </div>
        
            <br>
            
            <div class="container-fluid" id="reportdiv">
                <input type="button" value="Excel Download" id="fnExcelReport" onclick="fnExcelReport();"/><br>
               <form id="dataform" method="post"> 
                <table class="table table-bordered" id="reporttable">
                    <thead id="reportthead"></thead>
                    <tbody id="reportbody"></tbody>
                </table>
                </form>
            </div>
</body>
</html>