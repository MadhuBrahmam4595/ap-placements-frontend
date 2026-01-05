<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
    <%
String editIndustriesJwtToken = (String) session.getAttribute("jwtToken");
System.out.println("editIndustriesJwtToken =>" + editIndustriesJwtToken);

String editIndustriesinsCode = (String) session.getAttribute("insCode");
System.out.println("editIndustriesinsCode =>" + editIndustriesinsCode);

String editIndustriesapisUrl = (String) session.getAttribute("apisUrl");
System.out.println("editIndustriesapisUrl =>" + editIndustriesapisUrl);

String slno = ""+request.getAttribute("slno");
System.out.println("slno =>" + slno);

%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Edit Industries</title>
<link href="./bootstrap-5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
<script src="./bootstrap-5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<script src="./js/jquery-3.7.1.min.js"></script>
<script src="./js/siteScript.js"></script>
<script src="./js/CustomJs/ImplantJs/editInplantIndustriesJs.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.17.0/xlsx.full.min.js"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
<script>
var jwtToken = 'Bearer '+'<%=editIndustriesJwtToken%>';
var insCode = '<%=editIndustriesinsCode%>';
var baseUrl = '<%=editIndustriesapisUrl%>';
var slno = '<%=slno%>';

</script>
</head>
<body>
<%@include file="/WEB-INF/views/public/banner.jsp"%>
<%@include file="/WEB-INF/views/userpages/userInfoNavbar.jsp"%>

<div class="container border p-2 mt-2 shadow-lg" style="border-radius: 5px;">
		<div align="center" style="text-decoration: underline;color: fuchsia;">EDIT INDUSTRY DETAILS FORM</div>
<%-- <form id="dataform" method="post"> --%>
		<div class="row">
			<div class="col-md-6">
				<label for="industryName">Industry Name</label> <select
					 class="form-control" id="industryName">
					<option value="">-SELECT-</option>
				</select>
			</div>
			<div class="col-md-6">
				<label for="industryName">Trade Name</label> <select
					class="form-control" id="tradeName">
					<option value="">-SELECT-</option>
				</select>
			</div>
		</div>
		<div align="center">
				<button class="btn btn-success m-2" onclick="return updateIndustry();">UPDATE</button>
			</div>
			
			
<%-- 		</form> --%>
	</div>

</body>
</html>