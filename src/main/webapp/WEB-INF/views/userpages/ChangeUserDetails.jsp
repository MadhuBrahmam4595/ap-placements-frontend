<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
       <%
String changeUserDetailsJwtToken = (String) session.getAttribute("jwtToken");
System.out.println("changeUserDetailsJwtToken=>" + changeUserDetailsJwtToken);

String changeUserDetailsapisUrl = (String) session.getAttribute("apisUrl");
System.out.println("changeUserDetailsapisUrl=>" + changeUserDetailsapisUrl);

%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Change User Details</title>
<link href="./bootstrap-5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
<script src="./bootstrap-5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<script src="./js/jquery-3.7.1.min.js"></script>
<script src="./js/siteScript.js"></script>
<script src="./js/CustomJs/changeUserDetailsJs.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.17.0/xlsx.full.min.js"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
<script>
var jwtToken = 'Bearer '+'<%=changeUserDetailsJwtToken%>';
var baseUrl = '<%=changeUserDetailsapisUrl%>';
</script>
</head>
<body>
<%@include file="/WEB-INF/views/public/banner.jsp"%>
<%@include file="/WEB-INF/views/userpages/userInfoNavbar.jsp"%>
<div class="container border p-2 mt-2 shadow-lg w-50" style="border-radius: 5px;">
<form id="userUpdateForm" action="./editUserDetails" method="post">
	<div align="center" style="text-decoration: underline;color: fuchsia;">CHANGE USER DETAILS</div>
	<div class="row">
		<div class="col-md-4"></div>
		<div class="col-md-4">
			<label for="username">USER NAME</label>
			<input type="text" id="username" name="username" class="form-control" required autocomplete="off">
		</div>
		<div class="col-md-4"></div>
		
	</div>
	<div class="row">
		<div class="col-md-4"></div>
		<div class="col-md-4">
			<label for="password">PASSWORD</label><br>
        	<input type="password" id="password" name="password" class="form-control" required autocomplete="off">
		</div>
		<div class="col-md-4"></div>
	</div>
	<div align="center"><button type="submit" class="btn btn-primary m-1">Update</button></div>
    
</form>
<div align="center" style="color: red;">${errorMsg }</div>
</div>

</body>
</html>