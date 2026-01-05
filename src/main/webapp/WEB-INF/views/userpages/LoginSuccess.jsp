
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="java.util.List"%>
<%
String jwtToken = (String) session.getAttribute("jwtToken");
System.out.println("LoginSuccess=jwtToken=>" + jwtToken);

String roleId = (String) session.getAttribute("roleId");
System.out.println("LoginSuccess=roleId=>" + roleId);

String insCode = (String) session.getAttribute("insCode");
System.out.println("LoginSuccess=insCode=>" + insCode);

String username = (String) session.getAttribute("username");
System.out.println("LoginSuccess=username=>" + username);

String insName = (String) session.getAttribute("insName");
System.out.println("LoginSuccess=insName=>" + insName);

%>
<!DOCTYPE html>
<html>
<head>
<title>ITI Login Success</title>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link href="./bootstrap-5.3.3/dist/css/bootstrap.min.css"
	rel="stylesheet">
<script src="./bootstrap-5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<script src="./js/jquery-3.7.1.min.js"></script>
<script src="./js/chart.js"></script>
<script src="./js/md5.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.17.0/xlsx.full.min.js"></script>



<style>
.modal {
	position: fixed; /* Stay in place */
	z-index: 1; /* Sit on top */
	padding-top: 100px; /* Location of the box */
	left: 0;
	top: 0;
	width: 100%; /* Full width */
	height: 90%; /* Full height */
	overflow: auto; /* Enable scroll if needed */
	background-color: rgb(0, 0, 0); /* Fallback color */
	background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
}
/* The Close Button */
.close {
	color: black;
	float: right;
	font-size: 40px;
	font-weight: bold;
	background-color: #ff6600;
	width: 100px;
	margin-right: 80px;
}

.close:hover, .close:focus {
	color: #000;
	text-decoration: none;
	cursor: pointer;
}

a>input[type=button] {
	border: none;
	background-color: #e4eeb9;
	color: black;
	font-weight: bolder;
}

#custom {
	border: 1px solid red;
	background-color: #e4eeb9;
	margin-bottom: 20px;
	border-radius: 10px;
	height: 40px;
}
</style>



<script>
	$(document).ready(function(){
		   //alert("ready");
		   var jwtToken = '<%=jwtToken%>';
		   var roleId = '<%=roleId%>';
		   var insCode = '<%=insCode%>';
		   var username = '<%=username%>';
		   var insName = '<%=insName%>';
		//alert("jwtToken=>"+jwtToken);

	});
</script>


<script>

let baseUrl = "${apisUrl}";
                    
           function fetchDataAndRenderChart() {
            $.ajax({
                type: 'GET',
                url: baseUrl+'masterdata/dashBoardData',  
                success: function(response) {
                    // Extract data for the pie chart from dashBoardPvtSeats
                    
                    getPieChartsTotal(response);
                    getPieChartsGovt(response);
                    getPieChartsPvt(response);
                    
                    
                    
                },
                error: function(error) {
                    console.log("Error fetching data: ", error);
                }
            });
        }
        
        function fetchAbove20PercentData() {
            $.ajax({
                type: 'GET',
                url: baseUrl+'masterdata/getAbove20PercentItisStats', // replace with your endpoint
                success: function(response) {
                    // Extract data for the pie chart from dashBoardPvtSeats
                    getPieChartsAbove20(response);
                },
                error: function(error) {
                    console.log("Error fetching data: ", error);
                }
            });
        }
        
        
          function fetchBelow20PercentData() {
            $.ajax({
                type: 'GET',
                url: baseUrl+'masterdata/getBelow20PercentItisStats', // replace with your endpoint
                success: function(response) {
                    // Extract data for the pie chart from dashBoardPvtSeats
                    getPieChartsBelow20(response);
                },
                error: function(error) {
                    console.log("Error fetching data: ", error);
                }
            });
        }
        
        
        
        
        
         function getPieChartsTotal(response){
            
            const dashBoardAllSeats = response.dashBoardAllSeats;
                    renderPieChart(dashBoardAllSeats,'dashBoardAllSeats');
                    $("#totaldashBoardAllSeats").empty();
                    $("#fillrationdashBoardAllSeats").empty();
                    $("#totaldashBoardAllSeats").append('Total Seats - '+dashBoardAllSeats.strength.toLocaleString("en-US"));
                    $("#fillrationdashBoardAllSeats").append('<br>Fill Ratio - '+dashBoardAllSeats.fill_ratio+'%');
            
        }
        
        function getPieChartsGovt(response){
            
            const dashBoardGovtSeats = response.dashBoardGovtSeats;
                    renderPieChart(dashBoardGovtSeats,'govtSeatsPieChart');
                    $("#totalseatsgovtitis").empty();
                    $("#fillrationgovtitis").empty();
                    $("#totalseatsgovtitis").append('Total Seats - '+dashBoardGovtSeats.strength.toLocaleString("en-US"));
                    $("#fillrationgovtitis").append('<br>Fill Ratio - '+dashBoardGovtSeats.fill_ratio+'%');
            
        }
        
         function getPieChartsPvt(response){
            const dashBoardPvtSeats = response.dashBoardPvtSeats;
                    renderPieChart(dashBoardPvtSeats,'pvtSeatsPieChart');
                    $("#totalseatspvtitis").empty();
                    $("#fillrationpvtitis").empty();
                    $("#totalseatspvtitis").append('Total Seats - '+dashBoardPvtSeats.strength.toLocaleString("en-US"));
                    $("#fillrationpvtitis").append('<br>Fill Ratio - '+dashBoardPvtSeats.fill_ratio+'%');
                    $("#spinnerdiv").hide();
        }
        
          function getPieChartsAbove20(response){
            const dashBoardAbove20PercentData = response;
                    renderPieChart(dashBoardAbove20PercentData,'above20PercentPieChart');
                    $("#above20StrengthFill").empty();
                    $("#above20FillRatio").empty();
                    $("#above20StrengthFill").append('Total Seats - '+dashBoardAbove20PercentData.strength.toLocaleString("en-US"));
                    $("#above20FillRatio").append('<br>Fill Ratio - '+dashBoardAbove20PercentData.fill_ratio+'%');
                    $("#above20NoOfItis").append('<br><a href="javascript:above20NoOfItis()">No Of ITIs : '+dashBoardAbove20PercentData.noOfItis+'</a>');
                   
        }
        
        function getPieChartsBelow20(response){
            const dashBoardBelow20PercentData = response;
                    renderPieChart(dashBoardBelow20PercentData,'below20PercentPieChart');
                    $("#below20StrengthFill").empty();
                    $("#below20FillRatio").empty();
                    $("#below20StrengthFill").append('Total Seats - '+dashBoardBelow20PercentData.strength.toLocaleString("en-US"));
                    $("#below20FillRatio").append('<br>Fill Ratio - '+dashBoardBelow20PercentData.fill_ratio+'%');
                    $("#below20NoOfItis").append('<br><a href="javascript:below20NoOfItis();">No Of ITIs : '+dashBoardBelow20PercentData.noOfItis+'</a>');
                    
                   
        }
        
             
    
     function renderPieChart(data, chartId) {
            const ctx = document.getElementById(chartId).getContext('2d');
            const chartData = {
                labels: ['Filled Seats-'+data.strength_fill, 'Vacant Seats-'+data.strength_vacant],
                datasets: [{
                    data: [data.strength_fill, data.strength_vacant],
                    backgroundColor: ['#36A2EB', '#FF6384'],
                    hoverOffset: 4
                }]
            };

            new Chart(ctx, {
                type: 'pie',
                data: chartData,
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top'
                        },
                        tooltip: {
                            callbacks: {
                                label: function(tooltipItem) {
                                    let label = chartData.labels[tooltipItem.dataIndex] || '';
                                    const value = chartData.datasets[0].data[tooltipItem.dataIndex];
                                    return label + ': ' + value;
                                }
                            }
                        }
                    }
                }
            });
        }

        // Fetch data and render the chart when the page loads
        $(document).ready(function() {
             $("#datadiv").hide();
            fetchDataAndRenderChart();
            fetchAbove20PercentData();
            fetchBelow20PercentData();
            
        });
        function fnExcelReport(a) {
    	    var table = document.getElementById(a);
    	    var wb = XLSX.utils.table_to_book(table, { sheet: "Sheet1" });

    	    // Generate Excel file
    	    XLSX.writeFile(wb, 'Report.xlsx');
    	}    
                    </script>


<script type="text/javascript">
                    
                    function below20NoOfItis(){
                        //alert('below20NoOfItis()');
                        $("#datadiv").show();
                        $("#spinnerdiv2").show();
                        $("#tabledata").empty();
                        
                        $.ajax({
                            type: 'get',
                            url: baseUrl+'masterdata/getBelow20PercentItis',
                            cache: false,
                            timeout: 600000,
                            success:function(response){
                               // alert('response->'+JSON.stringify(response));
                                $("#spinnerdiv2").hide();
                                $("#dataheading").empty();
                                $("#dataheading").append('<h5 class="h5" style="color: blue; font-size: 12px;text-decoration: underline;"> < 20% ADMITTED ITIs DATA </h5>');
                                $("#tabledata").empty();
                                
                                var count = 0;
                                for(var i=0;i<response.length;i++){
                                    count = count + 1;
                                    var bean = response[i];
                                    
                                    $("#tabledata").append('<tr>'
                                            +'<td>'+count+'</td>'
                                            +'<td>'+bean.dist_name+'</td>'
                                            +'<td>'+bean.iti_name+'</td>'
                                            +'<td>'+bean.strength+'</td>'
                                            +'<td>'+bean.strength_fill+'</td>'
                                            +'<td>'+bean.strength_vacant+'</td>'
                                            +'<td>'+bean.fill_ratio+'%</td>'
                                            +'</tr>');
                                    
                                }
                                 
                            }
                        });
                        
                        
                    }
                    function above20NoOfItis(){
                        //alert('above20NoOfItis()');
                        $("#datadiv").show();
                        $("#spinnerdiv2").show();
                        $("#tabledata").empty();
                        
                        $.ajax({
                            type: 'get',
                            url: baseUrl+'masterdata/getAbove20PercentItis',
                            cache: false,
                            timeout: 600000,
                            success:function(response){
                               // alert('response->'+JSON.stringify(response));
                                $("#spinnerdiv2").hide();
                                $("#dataheading").empty();
                                $("#dataheading").append('<h5 class="h5" style="color: blue; font-size: 12px;text-decoration: underline;"> >= 20% ADMITTED ITIs DATA </h5>');
                                $("#tabledata").empty();
                                
                                var count = 0;
                                for(var i=0;i<response.length;i++){
                                    count = count + 1;
                                    var bean = response[i];
                                    
                                    $("#tabledata").append('<tr>'
                                            +'<td>'+count+'</td>'
                                            +'<td>'+bean.dist_name+'</td>'
                                            +'<td>'+bean.iti_name+'</td>'
                                            +'<td>'+bean.strength+'</td>'
                                            +'<td>'+bean.strength_fill+'</td>'
                                            +'<td>'+bean.strength_vacant+'</td>'
                                            +'<td>'+bean.fill_ratio+'%</td>'
                                            +'</tr>');
                                    
                                }
                                 
                            }
                        });
                    }
                    
                    
                    
                    </script>


</head>
<body>
	<%@include file="/WEB-INF/views/public/banner.jsp"%>
	<%@include file="/WEB-INF/views/userpages/userInfoNavbar.jsp"%>
	<%@include file="/WEB-INF/views/userpages/navbar.jsp"%>

<% if(roleId.equalsIgnoreCase("10") || roleId.equalsIgnoreCase("11")){ %>
	<div class="container">
		<div class="col-md-12">

			<div class=" p-1 border shadow-lg" style="border-radius: 20px">
				<div align="center">
					<h3 class="h3"
						style="color: blueviolet; font-size: 15px; text-decoration: underline;">SEATS
						ABSTRACT FOR 2024 ADMISSION YEAR</h3>
				</div>

				<div class="text-center" id="spinnerdiv">
					<span>Data is Loading...</span>
					<div class="spinner-border" role="status"></div>
				</div>

				<div class="row m-1">
					<div class="col-md-2" style="border-radius: 20px" align="center">
						<div align="center">
							<h5 class="h5"
								style="color: blue; font-size: 15px; text-decoration: underline;">GOVT
								& PRIVATE ITIs</h5>
						</div>
						<div style="margin: auto;">
							<canvas id="dashBoardAllSeats"></canvas>
							<span id="totaldashBoardAllSeats"></span>
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span
								id="fillrationdashBoardAllSeats"></span>
						</div>
					</div>
					<div class="col-md-2" style="border-radius: 20px" align="center">
						<div align="center">
							<h5 class="h5"
								style="color: blue; font-size: 15px; text-decoration: underline;">GOVERNMENT
								ITI's</h5>
						</div>
						<div style="margin: auto;">
							<canvas id="govtSeatsPieChart"></canvas>
							<span id="totalseatsgovtitis"></span>
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span
								id="fillrationgovtitis"></span>
						</div>
					</div>
					<div class="col-md-2" style="border-radius: 20px">
						<div align="center">
							<h5 class="h5"
								style="color: blue; font-size: 15px; text-decoration: underline;">PRIVATE
								ITI's</h5>
						</div>
						<div style="margin: auto;" align="center">
							<canvas id="pvtSeatsPieChart"></canvas>
							<span id="totalseatspvtitis"></span>
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span
								id="fillrationpvtitis"></span>
						</div>
					</div>
					<div class="col-md-3" style="border-radius: 20px">
						<div align="center">
							<h5 class="h5"
								style="color: blue; font-size: 15px; text-decoration: underline;">>=
								20% ADMITTED ITIs</h5>
						</div>
						<div style="margin: auto; height: 70%" align="center">
							<canvas id="above20PercentPieChart"></canvas>
							<span id="above20StrengthFill"></span>
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span
								id="above20FillRatio"></span> <span id="above20NoOfItis">
							</span>
						</div>

					</div>


					<div class="col-md-3" style="border-radius: 20px">
						<div align="center">
							<h5 class="h5"
								style="color: blue; font-size: 15px; text-decoration: underline;"><=
								20% ADMITTED ITIs</h5>
						</div>
						<div style="margin: auto; height: 70%" align="center">
							<canvas id="below20PercentPieChart"></canvas>
							<span id="below20StrengthFill"></span>
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span
								id="below20FillRatio"></span> <span id="below20NoOfItis">
							</span>
						</div>
					</div>

				</div>

			</div>

		</div>
	</div>

	<div class="container" id="datadiv">
		<div align="center" id="dataheading"></div>

		<div class="text-center" id="spinnerdiv2">
			<span>Data is Loading...</span>
			<div class="spinner-border" role="status"></div>
		</div>

		<div class="row">
			<div class="col-md-12">
				<div class="col-2">
					<button onclick="return fnExcelReport('reporttable');"
						class="btn btn-info btn-sm mt-4">DOWNLOAD EXCEL</button>
				</div>
				<table class="table table-bordered" id="reporttable">
					<thead>
						<tr>
							<td style="background-color: black; color: white;">SNO</td>
							<td style="background-color: black; color: white;">DISTRICT</td>
							<td style="background-color: black; color: white;">ITI</td>
							<td style="background-color: black; color: white;">TOTAL
								SEATS</td>
							<td style="background-color: black; color: white;">SEATS
								FILLED</td>
							<td style="background-color: black; color: white;">VACANT
								SEATS</td>
							<td style="background-color: black; color: white;">FILL
								RATIO</td>
						</tr>
					</thead>
					<tbody id="tabledata"></tbody>
				</table>
			</div>

		</div>
	</div>

<% } %>


</body>
</html>