/**
 * 
 */
 
 $(document).ready(function(){
 	//alert('ready');
 	getCountsReport();
 	
 });
 
function getCountsReport(){
	//alert('getCountsReport');
	
	$.ajax({
		type: 'get',
		url: baseUrl+'implant/getDistinctCount',
		headers: { 'Authorization': jwtToken },
		cache: false,
		timeout: 600000,
		success: function(resp){
			//alert('resp=>'+JSON.stringify(resp));
			$("#noOfItis").append(resp.noOfDistinctItis);
			$("#noOfIndustries").append(resp.noOfDistinctIndustries);
			$("#noOfTrades").append(resp.noOfDistinctTrades);
			$("#noOfTrainees").append(resp.noOfTrainees);
		},
		error: function(resp){
			alert('counts data not loaded');
			
		}
	});
}

function getReportItis(){
	//alert('getReportItis');
	
	$.ajax({
		type: 'get',
		url: baseUrl+'implant/getTraineesReportItiwise',
		headers: { 'Authorization': jwtToken },
		cache: false,
		timeout: 600000,
		success: function(resp){
			//alert('resp=>'+JSON.stringify(resp));
			$("#dataHeading").empty();
			$("#dataHeading").append('ITI WISE TRAINEE DATA');
			
			$("#datadiv").empty();
			$("#datadiv").append('<table class="table table-bordered" id="reporttable">'
												+'<thead id="reportthead"></thead>'
												+'<tbody id="reportbody"></tbody>'
												+'</table>');
			$("#reportthead").empty();
			$("#reportthead").append('<tr>'
										+'<th style="background-color: black;color: white;">SNO</th>'
										+'<th style="background-color: black;color: white;">DISTRICT</th>'
										+'<th style="background-color: black;color: white;">ITI</th>'
										+'<th style="background-color: black;color: white;">NO OF INDUSTRIES</th>'
										+'<th style="background-color: black;color: white;">NO OF TRADES</th>'
										+'<th style="background-color: black;color: white;">NO OF TRAINEES</th></tr>');
			
			$("#reportbody").empty();
			var count = 0;
			resp.forEach(bean=>{
				count = count + 1;
				$("#reportbody").append('<tr>'
										+'<td>'+count+'</td>'
										+'<td>'+bean.dist_name+'</td>'
										+'<td>'+bean.iti_name+'('+bean.iti_code+')</td>'
										+'<td><a href="javascript:getItiIndustries(\''+bean.iti_code+'\')">'+bean.noOfIndustries+'</a></td>'
										+'<td><a href="javascript:getItiIndustries(\''+bean.iti_code+'\')">'+bean.noOfTrades+'</a></td>'
										+'<td>'+bean.sumOfTrainees+'</td>'
										+'</tr>');
			});
			 
		},
		error: function(resp){
			alert('iti wise trainee data not loaded');
			
		}
	});
	
}
function getReportIndustries(){
	//alert('getReportIndustries');
	
	$.ajax({
		type: 'get',
		url: baseUrl+'implant/getTraineesReportIndustrieswise',
		headers: { 'Authorization': jwtToken },
		cache: false,
		timeout: 600000,
		success: function(resp){
			//alert('resp=>'+JSON.stringify(resp));
			$("#dataHeading").empty();
			$("#dataHeading").append('ITI WISE INDUSTRIES DATA');
			
			$("#datadiv").empty();
			$("#datadiv").append('<table class="table table-bordered" id="reporttable">'
												+'<thead id="reportthead"></thead>'
												+'<tbody id="reportbody"></tbody>'
												+'</table>');
			$("#reportthead").empty();
			$("#reportthead").append('<tr>'
										+'<th style="background-color: black;color: white;">SNO</th>'
										+'<th style="background-color: black;color: white;">INDUSTRY ID</th>'
										+'<th style="background-color: black;color: white;">INDUSTRY NAME</th>'
										+'<th style="background-color: black;color: white;">NO OF TRADES</th></tr>');
			
			$("#reportbody").empty();
			var count = 0;
			resp.forEach(bean=>{
				count = count + 1;
				$("#reportbody").append('<tr>'
										+'<td>'+count+'</td>'
										+'<td>'+bean.industry_id+'</td>'
										+'<td><a href="javascript:getInplantInudstries(\''+bean.industry_id+'\')">'+bean.industry_name+'</a></td>'
										+'<td>'+bean.noOfTrades+'</td>'
										+'</tr>');
			});
			 
		},
		error: function(resp){
			alert('iti wise trainee data not loaded');
			
		}
	});
}
function getReportTrades(){
	//alert('getReportTrades');
	
	$.ajax({
		type: 'get',
		url: baseUrl+'implant/getTraineesReportTrades',
		headers: { 'Authorization': jwtToken },
		cache: false,
		timeout: 600000,
		success: function(resp){
			//alert('resp=>'+JSON.stringify(resp));
			$("#dataHeading").empty();
			$("#dataHeading").append('TRADE WISE INDUSTRIES DATA');
			
			$("#datadiv").empty();
			$("#datadiv").append('<table class="table table-bordered" id="reporttable">'
												+'<thead id="reportthead"></thead>'
												+'<tbody id="reportbody"></tbody>'
												+'</table>');
			$("#reportthead").empty();
			$("#reportthead").append('<tr>'
										+'<th style="background-color: black;color: white;">SNO</th>'
										+'<th style="background-color: black;color: white;">TRADE NAME</th>'
										+'<th style="background-color: black;color: white;">No.Of.Industries</th>'
										+'<th style="background-color: black;color: white;">No.Of.Students</th>'
										+'</tr>');
			
			$("#reportbody").empty();
			var count = 0;
			resp.forEach(bean=>{
				count = count + 1;
				$("#reportbody").append('<tr>'
										+'<td>'+count+'</td>'
										+'<td><a href="javascript:getInplantTrades(\''+bean.trade_short+'\')">'+bean.trade_name+'</a></td>'
										+'<td>'+bean.slno+'</td>'
										+'<td>'+bean.noOfStudents+'</td>'
										+'</tr>');
			});
			 
		},
		error: function(resp){
			alert('iti wise trainee data not loaded');
			
		}
	});
}
function getReportTrainees(){
	alert('getReportTrainees');
}


function getItiIndustries(iticode){
	//alert('getItiIndustries=>iticode=>'+iticode);
	
	$.ajax({
		type: 'get',
		url: baseUrl+'masterdata/getTraineesReportItiIndustries?iti_code='+iticode,
		//headers: { 'Authorization': jwtToken },
		cache: false,
		timeout: 600000,
		success: function(resp){
			//alert('resp=>'+JSON.stringify(resp));
			$("#dataHeading").empty();
			$("#dataHeading").append('ITI WISE INDUSTRIES INFO');
			
			$("#datadiv").empty();
			$("#datadiv").append('<table class="table table-bordered" id="reporttable">'
												+'<thead id="reportthead"></thead>'
												+'<tbody id="reportbody"></tbody>'
												+'</table>');
			$("#reportthead").empty();
			$("#reportthead").append('<tr>'
										+'<th style="background-color: black;color: white;">SNO</th>'
										+'<th style="background-color: black;color: white;">DISTRICT</th>'
										+'<th style="background-color: black;color: white;">ITI</th>'
										+'<th style="background-color: black;color: white;">INDUSTRY ID</th>'
										+'<th style="background-color: black;color: white;">INDUSTRY NAME</th>'
										+'<th style="background-color: black;color: white;">TRADE NAME</th>'
										+'<th style="background-color: black;color: white;">NO OF STUDENTS</th>'
										+'</tr>');
			
			$("#reportbody").empty();
			var count = 0;
			resp.forEach(bean=>{
				count = count + 1;
				$("#reportbody").append('<tr>'
										+'<td>'+count+'</td>'
										+'<td>'+bean.dist_name+'</td>'
										+'<td>'+bean.iti_name+'('+bean.iti_code+')</td>'
										+'<td>'+bean.industry_id+'</td>'
										+'<td>'+bean.industry_name+'</td>'
										+'<td>'+bean.trade_name+'</td>'
										+'<td>'+bean.noOfTrainees+'</td>'
										+'</tr>');
			});
			 
		},
		error: function(resp){
			alert('iti wise trainee data not loaded');
			
		}
	});
}

function getInplantInudstries(industry_id){
	//alert('getInplantInudstries=>industry_id=>'+industry_id);
	
	$.ajax({
		type: 'get',
		url: baseUrl+'masterdata/getImplantIndustriesTraineesData?industryId='+industry_id,
		//headers: { 'Authorization': jwtToken },
		cache: false,
		timeout: 600000,
		success: function(resp){
			//alert('resp=>'+JSON.stringify(resp));
			$("#dataHeading").empty();
			$("#dataHeading").append('IMPLANT INDUSTRIES INFO');
			
			$("#datadiv").empty();
			$("#datadiv").append('<table class="table table-bordered" id="reporttable">'
												+'<thead id="reportthead"></thead>'
												+'<tbody id="reportbody"></tbody>'
												+'</table>');
			$("#reportthead").empty();
			$("#reportthead").append('<tr>'
										+'<th style="background-color: black;color: white;">SNO</th>'
										+'<th style="background-color: black;color: white;">DISTRICT</th>'
										+'<th style="background-color: black;color: white;">ITI</th>'
										+'<th style="background-color: black;color: white;">INDUSTRY ID</th>'
										+'<th style="background-color: black;color: white;">INDUSTRY NAME</th>'
										+'<th style="background-color: black;color: white;">TRADE NAME</th>'
										+'<th style="background-color: black;color: white;">NO OF TRAINEES</th>'
										+'</tr>');
			
			$("#reportbody").empty();
			var count = 0;
			resp.forEach(bean=>{
				count = count + 1;
				$("#reportbody").append('<tr>'
										+'<td>'+count+'</td>'
										+'<td>'+bean.dist_name+'</td>'
										+'<td>'+bean.iti_name+'('+bean.iti_code+')</td>'
										+'<td>'+bean.industry_id+'</td>'
										+'<td>'+bean.industry_name+'</td>'
										+'<td>'+bean.trade_name+'</td>'
										+'<td>'+bean.noOfTrainees+'</td>'
										+'</tr>');
			});
			 
		},
		error: function(resp){
			alert('iti wise trainee data not loaded');
			
		}
	});
	
}

function getInplantTrades(trade_short){
	//alert('getInplantTrades=>trade_short=>'+trade_short);
	
	$.ajax({
		type: 'get',
		url: baseUrl+'masterdata/getImplantTradesData?trade_short='+trade_short,
		//headers: { 'Authorization': jwtToken },
		cache: false,
		timeout: 600000,
		success: function(resp){
			//alert('resp=>'+JSON.stringify(resp));
			$("#dataHeading").empty();
			$("#dataHeading").append('IMPLANT TRADES INFO');
			
			$("#datadiv").empty();
			$("#datadiv").append('<table class="table table-bordered" id="reporttable">'
												+'<thead id="reportthead"></thead>'
												+'<tbody id="reportbody"></tbody>'
												+'</table>');
			$("#reportthead").empty();
			$("#reportthead").append('<tr>'
										+'<th style="background-color: black;color: white;">SNO</th>'
										+'<th style="background-color: black;color: white;">DISTRICT</th>'
										+'<th style="background-color: black;color: white;">ITI</th>'
										+'<th style="background-color: black;color: white;">INDUSTRY ID</th>'
										+'<th style="background-color: black;color: white;">INDUSTRY NAME</th>'
										+'<th style="background-color: black;color: white;">TRADE NAME</th>'
										+'<th style="background-color: black;color: white;">NO OF TRAINEES</th>'
										+'</tr>');
			
			$("#reportbody").empty();
			var count = 0;
			resp.forEach(bean=>{
				count = count + 1;
				$("#reportbody").append('<tr>'
										+'<td>'+count+'</td>'
										+'<td>'+bean.dist_name+'</td>'
										+'<td>'+bean.iti_name+'('+bean.iti_code+')</td>'
										+'<td>'+bean.industry_id+'</td>'
										+'<td>'+bean.industry_name+'</td>'
										+'<td>'+bean.trade_name+'</td>'
										+'<td>'+bean.noOfTrainees+'</td>'
										+'</tr>');
			});
			 
		},
		error: function(resp){
			alert('iti wise trainee data not loaded');
			
		}
	});
	
}