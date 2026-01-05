<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%
    String pid = (String)request.getAttribute("pid");
    
    String editPlcmtsJwtToken = (String) session.getAttribute("jwtToken");
    System.out.println("industryEntryJwtToken=>" + editPlcmtsJwtToken);

    String editPlcmtsapisUrl = (String) session.getAttribute("apisUrl");
    System.out.println("industryEntryapisUrl=>" + editPlcmtsapisUrl);
    %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Plcmt Edit</title>
<link href="./bootstrap-5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
<script src="./bootstrap-5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<script src="./js/jquery-3.7.1.min.js"></script>
<script src="./js/siteScript.js"></script>
<script src="./js/CustomJs/plcmtsJs/plcmtEditJs.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.17.0/xlsx.full.min.js"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
<script>
	var pid = '<%=pid%>';
	var jwtToken = 'Bearer '+'<%=editPlcmtsJwtToken%>';
	var baseUrl = '<%=editPlcmtsapisUrl%>';
	
</script>
</head>
<body>
<%@include file="/WEB-INF/views/public/banner.jsp"%>
<%@include file="/WEB-INF/views/userpages/userInfoNavbar.jsp"%>
</body>
</html>