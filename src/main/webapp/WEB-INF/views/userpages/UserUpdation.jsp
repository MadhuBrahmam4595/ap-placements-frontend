<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
        <%
String userUpdationJwtToken = (String) session.getAttribute("jwtToken");
System.out.println("userUpdationJwtToken=>" + userUpdationJwtToken);

String userUpdationapisUrl = (String) session.getAttribute("apisUrl");
System.out.println("userUpdationapisUrl=>" + userUpdationapisUrl);

%>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>User Updation</title>
	<link href="./bootstrap-5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
	<script src="./bootstrap-5.3.3/dist/js/bootstrap.bundle.min.js"></script>
	<script src="./js/jquery-3.7.1.min.js"></script>
	<script src="./js/siteScript.js"></script>
	<script src="./js/CustomJs/userUpdationJs.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.17.0/xlsx.full.min.js"></script>
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
	
	<script>
		var jwtToken = 'Bearer '+'<%=userUpdationJwtToken%>';
		var baseUrl = '<%=userUpdationapisUrl%>';
	</script>
</head>
<body>
<%@include file="/WEB-INF/views/public/banner.jsp"%>
<%@include file="/WEB-INF/views/userpages/userInfoNavbar.jsp"%>
<div class="container border p-2 mt-2 shadow-lg" style="border-radius: 5px;">
	<div align="center" style="text-decoration: underline;color: fuchsia;">UPDATE USER DETAILS</div>
	
	<div class="row">
		<div class="col-md-4"></div>
		<div class="col-md-4">
			<label for="username">USER NAME</label>
			<input type="text" id="username" name="username" class="form-control" required autocomplete="off">
		</div>
		<div class="col-md-4"></div>
	</div>
	
</div>
</body>
</html>