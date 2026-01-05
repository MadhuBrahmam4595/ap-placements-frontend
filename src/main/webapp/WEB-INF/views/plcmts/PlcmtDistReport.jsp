<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
        <%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
    <%
String plcmtDistReportJwtToken = (String) session.getAttribute("jwtToken");
System.out.println("plcmtDistReportJwtToken=>" + plcmtDistReportJwtToken);

String plcmtDistReportInsCode = (String) session.getAttribute("insCode");
System.out.println("plcmtDistReportInsCode=>" + plcmtDistReportInsCode);

String plcmtDistReportRoleId = (String) session.getAttribute("roleId");
System.out.println("plcmtDistReportRoleId=>" + plcmtDistReportRoleId);

String plcmtDistReportapisUrl = (String) session.getAttribute("apisUrl");
System.out.println("plcmtDistReportapisUrl=>" + plcmtDistReportapisUrl);


%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Plcmt Dist Report</title>
<link href="./bootstrap-5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
<script src="./bootstrap-5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<script src="./js/jquery-3.7.1.min.js"></script>
<script src="./js/siteScript.js"></script>
<script src="./js/CustomJs/plcmtsJs/plcmtDistReportJs.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.17.0/xlsx.full.min.js"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
<script>
var jwtToken = 'Bearer '+'<%=plcmtDistReportJwtToken%>';
var insCode = '<%=plcmtDistReportInsCode%>';
var roleId = '<%=plcmtDistReportRoleId%>';
var baseUrl = '<%=plcmtDistReportapisUrl%>';
</script>
<style>
            #head{
                color: blue;
                font-weight: bolder;
                text-decoration: underline;
            }

            #inp{
                font-weight: bolder;
            }

            #iti_code{
                padding: 4px;
            }
            #formdiv{
                background-color: #e4eeb9;
                padding: 8px;

                margin: auto;
                border: 1px solid #888;
                width: 50%;
            }

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
<div align="center" >
            <h5 class="h5 text-primary" style="font-weight: bolder;">DISTRICT LEVEL PLACEMENT DETAILS</h5>
        </div>
        
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
                <div class="col-lg-4">
                    <label class="form-label">ITI Name</label>
                    <select name="iti_code" id="iti_code" class="form-control"> 
                        <option value="">-ALL-</option>
                    </select>
                </div>
            </div>
             <div class="row">
                 <div class="col-lg-5"></div>
                <div class="col-lg-2">
                     <label class="form-label"> </label>
                     <button class="btn btn-success form-control"  onclick="return getReport()">GET DATA</button>
                </div>
                 <div class="col-lg-5"></div>
            </div>
        </div>
        
        <div class="container-fluid" id="reportdiv">
                <input type="button" value="Excel Download" id="fnExcelReport" onclick="fnExcelReport();"/><br>
                
                <table class="table table-bordered" id="reporttable">
                    <thead id="reportthead"></thead>
                    <tbody id="reportbody"></tbody>
                </table>
        </div>
</body>
</html>