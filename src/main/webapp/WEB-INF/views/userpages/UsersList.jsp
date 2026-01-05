<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
     <%
String usersListJwtToken = (String) session.getAttribute("jwtToken");
System.out.println("usersListJwtToken=>" + usersListJwtToken);

String usersListapisUrl = (String) session.getAttribute("apisUrl");
System.out.println("usersListapisUrl=>" + usersListapisUrl);
 
%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>USERS LIST</title>
<link href="./bootstrap-5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
<script src="./bootstrap-5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<script src="./js/jquery-3.7.1.min.js"></script>
<script src="./js/siteScript.js"></script>
<script src="./js/CustomJs/usersListJs.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.17.0/xlsx.full.min.js"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
<script>
var jwtToken = 'Bearer '+'<%=usersListJwtToken%>';
var baseUrl = '<%=usersListapisUrl%>';
</script>
</head>
<body>
<%@include file="/WEB-INF/views/public/banner.jsp"%>
<%@include file="/WEB-INF/views/userpages/userInfoNavbar.jsp"%>

<div class="container border p-2 mt-2 shadow-lg" style="border-radius: 5px;">
		<div align="center" style="text-decoration: underline;color: fuchsia;">AVAILABLE USERS</div>
		
		<table class="table table-bordered">
			<thead>
				<tr>
					<td style="background-color: black;color: white;">SNO</td>
					<td style="background-color: black;color: white;">USER NAME</td>
					<td style="background-color: black;color: white;">ROLE NAME</td>
					<td style="background-color: black;color: white;">USER ID</td>
				</tr>
			</thead>
			<tbody id="tablebody"></tbody>
		</table>
</div>
</body>
</html>