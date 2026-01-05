<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%
String navbar2jwtToken = (String) session.getAttribute("jwtToken");
String navbar2roleId = (String) session.getAttribute("roleId");
String navbar2insCode = (String) session.getAttribute("insCode");
String navbar2username = (String) session.getAttribute("username");
String navbar2insName = (String) session.getAttribute("insName");
%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title></title>
<link href="./bootstrap-5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
<script src="./bootstrap-5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<script src="./js/jquery-3.7.1.min.js"></script>
<script src="./js/siteScript.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.17.0/xlsx.full.min.js"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">

<script>
$(document).ready(function(){
	var roleId = '<%=navbar2roleId%>';
	var insCode = '<%=navbar2insCode%>';
	var username = '<%=navbar2username%>';
	var insName = '<%=navbar2insName%>';
	document.getElementById("userinfo").innerHTML =  username + ' (' + insCode + ')';
});
</script>
</head>
<body>
<div class="container p-2">
		<div class="row border p-1" style="border-radius: 5px;">
			<div class="col-md-4"> <a class="nav-link active" aria-current="page" href="./loginSuccess"><i class="fas fa-home fa-2x"></i></a> </div>
			<div class="col-md-7"> Welcome <span id="userinfo" style="color: black; font-weight: bolder;font-size: 18px;"> </span> </div>
			<div class="col-md-1"> <a class="p-1" href="./logout" style="color: white;font-weight: bolder; background-color: black;border-radius: 5px;">LOGOUT</a> </div>
		</div></div>
</body>
</html>