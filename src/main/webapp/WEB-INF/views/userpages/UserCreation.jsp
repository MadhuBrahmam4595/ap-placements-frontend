<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
     <%
String userCreationJwtToken = (String) session.getAttribute("jwtToken");
System.out.println("userCreationJwtToken=>" + userCreationJwtToken);

String userCreationapisUrl = (String) session.getAttribute("apisUrl");
System.out.println("userCreationapisUrl=>" + userCreationapisUrl);
 
%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ITI IN-PLANT Report</title>
	<link href="./bootstrap-5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
	<script src="./bootstrap-5.3.3/dist/js/bootstrap.bundle.min.js"></script>
	<script src="./js/jquery-3.7.1.min.js"></script>
	<script src="./js/siteScript.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.17.0/xlsx.full.min.js"></script>
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
	
	<script>
		var jwtToken = 'Bearer '+'<%=userCreationJwtToken%>';
		var baseUrl = '<%=userCreationapisUrl%>';
	</script>
</head>
<body>
<%@include file="/WEB-INF/views/public/banner.jsp"%>
<%@include file="/WEB-INF/views/userpages/userInfoNavbar.jsp"%>

<div class="container border p-2 mt-2 shadow-lg" style="border-radius: 5px;">
	<form id="userForm">
	<div align="center" style="text-decoration: underline;color: fuchsia;">ADD NEW USER</div>
	
	<div class="row">
		<div class="col-md-6">
			<label for="username">USER NAME</label>
			<input type="text" id="username" name="username" class="form-control" required autocomplete="off">
		</div>
		<div class="col-md-6">
			<label for="password">PASSWORD</label><br>
        	<input type="password" id="password" name="password" class="form-control" required autocomplete="off">
		</div>
	</div>
	<div class="row">
		<div class="col-md-6">
			<label for="roles">ROLE</label>
			<select id="roles" name="roles" class="form-control" required>
        	<option value="">-SELECT-</option>
        	<option value="1">Admin</option>
        	<option value="2">Admin JD Exams</option>
        	<option value="3">Conviner Level</option>
        	<option value="4">ITI Level</option>
        	<option value="5">RDD</option>
        	<option value="6">District Data Entry Operator</option>
        	<option value="7">Verification Officer</option>
<!--         	<option value="8">PUBLIC</option> -->
        	<option value="9">Admin Reports</option>
        	<option value="10">Nodal Officer</option>
        	<option value="11">Assistant Director</option>
        </select>
		</div>
		<div class="col-md-6">
			<label for="roles">USER CODE</label>
			<input type="text" id="insCode" name="insCode" class="form-control" required>
		</div>
	</div>
	<div align="center"><button class="btn btn-success btn-sm m-1" type="button" onclick="submitForm()">Submit</button></div>
	</form>
	<div id="message" align="center"></div>
</div>
    <script>
        function submitForm() {
        	
        	if($("#username").val() == '' || $("#username").val() == null){
        		alert('Username is required.');
        		$("#username").focus()
        		return false;
        	}
        	
        	if($("#password").val() == '' || $("#password").val() == null){
        		alert('Password is required.');
        		$("#password").focus()
        		return false;
        	}
        	
        	if($("#roles").val() == '' || $("#roles").val() == null){
        		alert('Role is required.');
        		$("#roles").focus()
        		return false;
        	}
        	
            var user = {
                username: $("#username").val(),
                password: $("#password").val(),
                insCode: $("#insCode").val(),
                roles: $("#roles").val().split(',').map(function (roleId) {
                    return { role_id: roleId.trim() };
                })
            };

            $.ajax({
                url: baseUrl+'services/addUser', // This should be your API URL
                type: 'POST',
                headers: { 'Authorization': jwtToken},
                contentType: 'application/json',
                data: JSON.stringify(user),
                success: function (response) {
                    $("#message").html('<p style="color: green;">User added successfully with Username: '+response.username+'</p>');
                    $("#username").val('');
                    $("#password").val('');
                    $("#roles").val('');
                },
                error: function (error) {
                    $("#message").html('<p style="color: red;">Failed to add user: ' + error.responseText + '</p>');
                }
            });
        }
    </script>
</body>
</html>
