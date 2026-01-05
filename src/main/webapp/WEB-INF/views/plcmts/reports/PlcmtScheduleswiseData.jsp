<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
    <%
String plcmtScheduleswiseDataJwtToken = (String) session.getAttribute("jwtToken");
System.out.println("plcmtScheduleswiseDataJwtToken=>" + plcmtScheduleswiseDataJwtToken);

String plcmtScheduleswiseDataapisUrl = (String) session.getAttribute("apisUrl");
System.out.println("plcmtScheduleswiseDataapisUrl=>" + plcmtScheduleswiseDataapisUrl);


%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Plcmt Scheduleswise Data</title>
<link href="./bootstrap-5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
<script src="./bootstrap-5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<script src="./js/jquery-3.7.1.min.js"></script>
<script src="./js/siteScript.js"></script>
<script src="./js/CustomJs/plcmtsJs/PlcmtScheduleswiseDataJs.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.17.0/xlsx.full.min.js"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
<script>
var jwtToken = 'Bearer '+'<%=plcmtScheduleswiseDataJwtToken%>';
var baseUrl =  '<%=plcmtScheduleswiseDataapisUrl%>';
//alert(jwtToken)
</script>
<style>
            #distwise,#itiwisetable th{
                background-color: black;
                color: white;
            }
        </style>
</head>
<body>
<%@include file="/WEB-INF/views/public/banner.jsp"%>
<%@include file="/WEB-INF/views/userpages/userInfoNavbar.jsp"%>
<br>
<div class="container">
            
            <div id="distwisediv">
                <div align="right">
                    <span style="font-weight: bolder;color: #28921f;margin-right: 350px;">PLACEMENTS SCHEDULES DISTRICT WISE DATA</span>
                    <button onclick="downloadExcel('distwise')" class="btn btn-primary">Download Excel</button>
                </div>
                <table class="table table-striped table-bordered" id="distwise">
                    <thead>
                        <tr>
                            <th>S.NO</th>
                            <th>DIST NAME</th>
                            <th>NO OF JOB SCHEDULES</th>
                            <th>NO OF APPRENTICESHIP SCHEDULES</th>
                            <th>TOTAL SCHEDULES</th>
                        </tr>
                    </thead>
                    <tbody id="distwisedata">

                    </tbody>
                </table>
            </div>
            <div id="itiwisediv">
                <div align="right">
                    <span style="font-weight: bolder;color: #28921f;margin-right: 350px;">PLACEMENTS SCHEDULES ITI WISE DATA IN <span id="itinamespan"></span></span>
                    <button onclick="reload()" class="btn btn-info">Back</button>
                    <button onclick="downloadExcel('itiwisetable')" class="btn btn-primary">Download Excel</button>
                </div>
                
                <table class="table table-bordered" id="itiwisetable">
                    <thead>
                        <tr style="background-color: black;">
                            <th>S.NO</th>
                            <th>ID</th>
                            <th>ITI NAME</th>
                            <th>TYPE</th>
                            <th>DATE</th>
                            <th>DESCRIPTION</th>
                            <th>VACANCIES</th>
                            <th>ATTENDED</th>
                            <th>SELECTED</th>
                            <th>NO OF RECORDS</th>
                        </tr>
                    </thead>
                    <tbody id="itiwisedata">
                        
                    </tbody>
                </table>
            </div>
            <div id="plcmtsdatadiv">
                <div align="right">
                    <span style="font-weight: bolder;color: #28921f;margin-right: 350px;" id="plcmtsdataheading"></span>
                    <button onclick="showtable2()" class="btn btn-info">Back</button>
                    <button onclick="downloadExcel('plcmtsdatatable')" class="btn btn-primary">Download Excel</button>
                </div>
                
                <table class="table table-bordered" id="plcmtsdatatable">
                    <thead id="plcmtsdatadataheader">
                         
                    </thead>
                    <tbody id="plcmtsdatadata">
                        
                    </tbody>
                </table>
            </div>
        </div>
</body>
</html>