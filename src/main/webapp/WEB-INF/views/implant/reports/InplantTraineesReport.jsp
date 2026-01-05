<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%
String inplantTraineesReportJwtToken = (String) session.getAttribute("jwtToken");
System.out.println("inplantTraineesReportJwtToken=>" + inplantTraineesReportJwtToken);

String inplantTraineesReportApisUrl = (String) session.getAttribute("apisUrl");
System.out.println("inplantTraineesReportApisUrl=>" + inplantTraineesReportApisUrl);
%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>IN-PLANT Trainees Report</title>
<link href="./bootstrap-5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
<script src="./bootstrap-5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<script src="./js/jquery-3.7.1.min.js"></script>
<script src="./js/siteScript.js"></script>
<script src="./js/CustomJs/ImplantJs/inplantTraineesReportJs.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.17.0/xlsx.full.min.js"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
<script>
var jwtToken = 'Bearer '+'<%=inplantTraineesReportJwtToken%>';
var baseUrl = '<%=inplantTraineesReportApisUrl%>';
</script>
</head>
<body>
<%@include file="/WEB-INF/views/public/banner.jsp"%>
<%@include file="/WEB-INF/views/userpages/userInfoNavbar.jsp"%>

<div class="container" >
		<div align="center" style="text-decoration: underline;color: fuchsia;">IN-PLANT TRAINEES REPORT</div>
		
		<div id="countdiv">
			<div class="row ">
				<div class="col-md-3 border  shadow-lg text-center">
					<label for="noOfItis">No of ITIs</label><br>
					<a href="javascript:getReportItis();"><span style="font-weight: bolder;" id="noOfItis"></span></a>
				</div>
				<div class="col-md-3 border  shadow-lg text-center">
					<label for="noOfIndustries">No of Industries</label><br>
					<a href="javascript:getReportIndustries();"><span style="font-weight: bolder;" id="noOfIndustries"></span></a>
				</div>
				<div class="col-md-3 border  shadow-lg text-center">
					<label for="noOfTrades">No of Trades</label><br>
					<a href="javascript:getReportTrades();"><span style="font-weight: bolder;" id="noOfTrades"></span></a>
				</div>
				<div class="col-md-3 border  shadow-lg text-center">
					<label for="noOfTrainees">No of Trainees</label><br>
					 <span style="font-weight: bolder;color: blue;" id="noOfTrainees"></span> 
				</div>
			</div>
		</div>
		
		<div align="center" style="text-decoration: underline;color: fuchsia;" id="dataHeading"></div>
		<div id="datadiv"> </div>
</div>
</body>
</html>