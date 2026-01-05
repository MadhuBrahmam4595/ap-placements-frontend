<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%
String stateSkillDevelopmentPlanReportJwtToken = (String) session.getAttribute("jwtToken");
System.out.println("stateSkillDevelopmentPlanReportJwtToken=>" + stateSkillDevelopmentPlanReportJwtToken);

String stateSkillDevelopmentPlanReportApisUrl = (String) session.getAttribute("apisUrl");
System.out.println("stateSkillDevelopmentPlanReportApisUrl=>" + stateSkillDevelopmentPlanReportApisUrl);
%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>State Skill Development Plan Report</title>
<link href="./bootstrap-5.3.3/dist/css/bootstrap.min.css"
	rel="stylesheet">
<script src="./bootstrap-5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<script src="./js/jquery-3.7.1.min.js"></script>
<script src="./js/siteScript.js"></script>
<script
	src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.17.0/xlsx.full.min.js"></script>
<link rel="stylesheet"
	href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
<script>
	var jwtToken = 'Bearer '+'<%=stateSkillDevelopmentPlanReportJwtToken%>';
	var baseUrl = '<%=stateSkillDevelopmentPlanReportApisUrl%>';
	
	$(document).ready(function(){
		//alert('ready');
		
		$("#spinnerdiv").hide();
		$("#datadiv").hide();
		
		$.ajax({
			type: 'get',
			url: baseUrl+'masterdata/getDistinctYearOfAdmissons',
			cache: false,
			timeout: 600000,
			success:function(response){
				//alert('response->'+JSON.stringify(response));
				
				$("#year").empty();
				$("#year").append('<option value="">-SELECT-</option>');
				response.forEach(a=>{
					$("#year").append('<option value="'+a+'">'+a+'</option>');
				});
			}
		});
		
	});
	
	function getData(){
		//alert('getdata');
		
		var year = $("#year").val();
		
		$("#spinnerdiv").show();
		
		$.ajax({
			type: 'get',
			url: baseUrl+'masterdata/stateSkillDevelopmentPlanReport?year='+year,
			cache: false,
			timeout: 600000,
			success:function(response){
				//alert('response->'+JSON.stringify(response));
				$("#datadiv").show();
				$("#tabledata").empty();
				var count = 0;
				response.forEach(bean=>{
					count = count + 1;
					$("#tabledata").append('<tr>'
							+'<td>'+count+'</td>'
							+'<td>'+bean.tradeName+'</td>'
							+'<td>'+bean.itiCount+'</td>'
							+'<td>'+bean.totalStrength+'</td>'
							
							+'<td>'+bean.totalMale+'</td>'
							+'<td>'+bean.totalFemale+'</td>'
							+'<td>'+bean.totalGender+'</td>'
							
							+'<td>'+bean.totalPlcmts+'</td>'
							+'</tr>');
				});
				$("#spinnerdiv").hide();
				
			}
		});
	}
	
	function fnExcelReport(a) {
	    var table = document.getElementById(a);
	    var wb = XLSX.utils.table_to_book(table, { sheet: "Sheet1" });

	    // Generate Excel file
	    XLSX.writeFile(wb, 'Report.xlsx');
	}
	
</script>
</head>
<body>
	<%@include file="/WEB-INF/views/public/banner.jsp"%>
	<%@include file="/WEB-INF/views/userpages/userInfoNavbar.jsp"%>

	<div class="container border p-2 mt-2 shadow-lg" id="formdiv">
		<div align="center"
			style="text-decoration: underline; color: fuchsia;">State Skill
			Development Plan Report</div>

		<div class="row">
			<div class="col-md-3"></div>
			<div class="col-md-3">
				<label for="year">YEAR OF ADMISSION</label> <select id="year"
					class="form-control">
					<option value="">-SELECT-</option>
				</select>
			</div>
			<div class="col-md-3">
				<button class="btn btn-sm btn-success mt-4"
					onclick="return getData();">GET DATA</button>
			</div>
			<div class="col-md-3"></div>
		</div>
		<br>
	
		<div class="text-center" id="spinnerdiv">
			<span>Data is Loading...</span>
			<div class="spinner-border" role="status"></div>
		</div>
		<div id="datadiv">
		<div class="col-2"><button onclick="return fnExcelReport('reporttable');" class="btn btn-info btn-sm mt-4">DOWNLOAD EXCEL</button></div>
		<table class="table table-bordered" id="reporttable">
			<thead>
				<tr>
					<td style="background-color: black; color: white;">S.NO</td>
					<td style="background-color: black; color: white;">TRADE</td>
					<td style="background-color: black; color: white;">NO OF ITIs
						Included</td>
					<td style="background-color: black; color: white;">TOTAL SEATS</td>
					<td style="background-color: black; color: white;" colspan="3">TOTAL
						ADMITTED SEATS</td>
					<td style="background-color: black; color: white;">PLACED
						SEATS</td>
				</tr>
				<tr>
					<td style="background-color: black; color: white;" colspan="4"></td>
					<td style="background-color: black; color: white;">MALE</td>
					<td style="background-color: black; color: white;">FEMALE</td>
					<td style="background-color: black; color: white;">TOTAL</td>
					<td style="background-color: black; color: white;"></td>
				</tr>
			</thead>
			<tbody id="tabledata"></tbody>
		</table>
		</div>
	</div>

</body>
</html>