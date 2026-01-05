<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
     <%
String labsEntryJwtToken = (String) session.getAttribute("jwtToken");
System.out.println("labsEntryJwtToken =>" + labsEntryJwtToken);

String labsEntryinsCode = (String) session.getAttribute("insCode");
System.out.println("labsEntryinsCode =>" + labsEntryinsCode);

String labsEntryapisUrl = (String) session.getAttribute("apisUrl");
System.out.println("labsEntryapisUrl =>" + labsEntryapisUrl);
%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Labs Entry</title>
<link href="./bootstrap-5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
<script src="./bootstrap-5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<script src="./js/jquery-3.7.1.min.js"></script>
<script src="./js/siteScript.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.17.0/xlsx.full.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/crypto-js.js"></script> 
<script src="./js/CustomJs/labsJs/labsEntryJs.js"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
<script>
	var jwtToken = 'Bearer '+'<%=labsEntryJwtToken%>';
	var insCode = '<%=labsEntryinsCode%>';
	var baseUrl = '<%=labsEntryapisUrl%>';
</script>
</head>
<body>
<%@include file="/WEB-INF/views/public/banner.jsp"%>
	<%@include file="/WEB-INF/views/userpages/userInfoNavbar.jsp"%>

	<div class="container border p-2 mt-2 shadow-lg"
		style="border-radius: 5px;">
		<div align="center"
			style="text-decoration: underline; color: fuchsia;">LAB
			INFORMATION ENTRY FORM</div>
<form id="labForm" enctype="multipart/form-data" method="post">
		<div class="row">
			<div class="col-md-6">
				<label for="industryName">INDUSTRY NAME</label> <input type="text"
					class="form-control" id="industryName" name="industryName" />
			</div>
			<div class="col-md-6">
				<label for="tradeName">TRADE FOR LAB</label> <select
					class="form-select" id="tradeShort" name="tradeShort">
					<option value="">-SELECT-</option>
				</select>
			</div>
		</div>
		<div class="row">
			<div class="col-md-12">
				<label for="tradeName">DESCRIPTION</label> 
				<textarea class="form-control" rows="4" cols="10" name="description"></textarea>
			</div>
		</div>
		<br>
		<div class="row mb-2">
			<div class="col-md-12">EQUPMENT LIST PROVIDED BY THE INDUSTRY</div>
		</div>
		<div id="itemContainer">

			 <div class="row mb-3">
                    <div class="col-md-3">
                    	<label for="itemName">ITEM NAME</label>
                        <input type="text" class="form-control" name="itemNames[]" placeholder="Item Name" required>
                    </div>
                    <div class="col-md-3">
                    	<label for="itemCosts">ITEM COST</label>
                        <input type="text" class="form-control" name="itemCosts[]" placeholder="Item Cost" required>
                    </div>
                    <div class="col-md-3">
                    	<label for="itemPhotos">ITEM PHOTO</label>
                        <input type="file" class="form-control" name="itemPhotos[]" accept="image/*">
                    </div>
                    <div class="col-md-3">
                        <button type="button" class="btn btn-danger mt-4" onclick="removeItem(this)">Remove</button>
                    </div>
                </div>
		</div>
		<div class="row m-1">
			<div class="col-md-12" align="right">
				<button type="button" class="btn btn-info"
					onclick="addMoreItems()">Add More</button>
			</div>
		</div>
		<div class="row mb-3">
                <div class="col-md-12" align="center">
<!--                 	<input type="button" onclick="return saveLab();" value="save" /> -->
                    <button type="submit" class="btn btn-success">Submit</button>
                </div>
            </div>
</form>
<div align="center" id="serverErr"> </div>
	</div>

</body>
</html>