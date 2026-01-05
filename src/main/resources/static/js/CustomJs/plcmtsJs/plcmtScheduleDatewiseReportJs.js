/**
 * 
 */
 let plcmtsdata = null;
 $(document).ready(function(){
	//alert('ready function');
	$("#loadmsg").empty();
	$("#reportdiv").hide();
	$("#formdiv").show();
});

function getData(){
	//alert('getdata');
	
	var fromDate = $("#fromDate").val();
	var toDate = $("#toDate").val();
	var ptype = $("#ptype").val();
	
	if(fromDate == null || fromDate == ''){
		alert('Schedule From Date is required.');
		$("#fromDate").focus();
		return false;
	}
	if(toDate == null || toDate == ''){
		alert('Schedule To Date is required.');
		$("#toDate").focus();
		return false;
	}
	var fromDateValue = new Date(fromDate);
    var toDateValue = new Date(toDate);
    
    // Check if the From Date is after the To Date
    if (fromDateValue > toDateValue) {
        alert('Invalid dates from date should not greater than to date.');
        return false;
    }
	if(ptype == null || ptype == ''){
		alert('Schedule Type is required.');
		$("#ptype").focus();
		return false;
	}
	
	// get data from the server
	getDataFromServer(fromDate,toDate,ptype);
}

function getDataFromServer(fromDate,toDate,ptype){
	//alert('getDataFromServer->fromDate='+fromDate+',toDate='+toDate+',ptype='+ptype);
	
	var rbody = {};
	rbody['fromDate'] = fromDate;
	rbody['toDate'] = toDate;
	rbody['ptype'] = ptype;
	
	$("#loadmsg").append('<span>Data is Loading...</span><div class="spinner-border" role="status"></div>');
	
	$.ajax({
		type: 'post',
		url: baseUrl+'api/plcmt/plcmtScheduleDatewiseReport',
		data: JSON.stringify(rbody),
		contentType: 'application/json',
		headers: { 'Authorization': jwtToken },
		cache: false,
		timeout: 600000,
		success: function(resp){
			//alert('success->'+JSON.stringify(resp));
			plcmtsdata = resp;
			$("#loadmsg").empty();
			$("#reportdiv").show();
			$("#formdiv").hide();
			if(resp.length <= 0){
				//alert('no data found');
				$("#tablediv").append('<div align="center"><h5 class="h5 text-danger">NO DATA FOUND</h5></div>');
			}else{
				
				$("#tablediv").append('<div id="scrollbar">'
											+'<div id="content">'
												+'<table class="table table-bordered" id="reporttable">'
												+'<thead id="reportthead"></thead>'
												+'<tbody id="reportbody"></tbody>'
												+'</table>'
											+'</div>'
										+'</div>');
				
				if(ptype == 'Job'){
					//alert('ptype is Job');
					
					$("#reportthead").empty();
                	$("#reportthead").append('<tr>'
                            +'<th style="background-color: black;color: white;">SNO</th>'
                            +'<th style="background-color: black;color: white;">DISTRICT</th>'
                            +'<th style="background-color: black;color: white;">ITI</th>'
                            +'<th style="background-color: black;color: white;">ADMISSION NUMBER</th>'
                            +'<th style="background-color: black;color: white;">TRAINEE NAME</th>'
                            +'<th style="background-color: black;color: white;">PLACEMENT YEAR</th>'
                            +'<th style="background-color: black;color: white;">COMPANY NAME</th>'
                            +'<th style="background-color: black;color: white;">POST NAME</th>'
                            +'<th style="background-color: black;color: white;">SALARY</th>'
                            +'<th style="background-color: black;color: white;">HR MOBILE NO</th>'
                            +'<th style="background-color: black;color: white;">STATE NAME</th>'
                            +'<th style="background-color: black;color: white;">DIST NAME</th>'
                            +'<th style="background-color: black;color: white;">ADDRESS</th>'
                            +'<th style="background-color: black;color: white;">SCHEDULE INFO</th>'
                    +'</tr>');
                    var count = 0;
                    resp.forEach(bean=>{
						count = count + 1;
						var plcmtyear = bean.plcmtYear == null ? "":bean.plcmtYear;
						var schedule = bean.plcmtScheduleEntryEntity.scheduleDate+'-'+bean.plcmtScheduleEntryEntity.itiEntity.itiName+'-'+bean.plcmtScheduleEntryEntity.scheduleDesc;
						
						$("#reportbody").append('<tr>'
                                +'<td>'+count+'</td>'
                                +'<td>'+bean.itiEntity.distMaster.dist_name+'</td>'
                                +'<td>'+bean.itiEntity.itiName+'</td>'
                                +'<td>'+bean.adm_num+'</td>'
                                +'<td>'+bean.name+'</td>'
                                +'<td>'+plcmtyear+'</td>'
                                +'<td>'+bean.pname_of_company+'</td>'
                                +'<td>'+bean.ppostname+'</td>'
                                +'<td>'+bean.psalary+'</td>'
                                +'<td>'+bean.phrno+'</td>'
                                +'<td>'+bean.statesMastEntity.statename+'</td>'
                                +'<td>'+bean.distsStatewise.distname+'</td>'
                                +'<td>'+bean.paddress+'</td>'
                                +'<td>'+schedule+'</td>'
                                +'</tr>');
					});
                    
				}
				if(ptype == 'Apprenticeship'){
							//alert('Apprenticeship');
							$("#reportthead").empty();
                            $("#reportthead").append('<tr>'
                            +'<th style="background-color: black;color: white;">SNO</th>'
                            +'<th style="background-color: black;color: white;">DISTRICT</th>'
                            +'<th style="background-color: black;color: white;">ITI</th>'
                            +'<th style="background-color: black;color: white;">ADMISSION NUMBER</th>'
                            +'<th style="background-color: black;color: white;">TRAINEE NAME</th>'
                            +'<th style="background-color: black;color: white;">PLACEMENT YEAR</th>'
                            +'<th style="background-color: black;color: white;">COMPANY NAME</th>'
                            +'<th style="background-color: black;color: white;">TRADE NAME</th>'
                            +'<th style="background-color: black;color: white;">STIPHEND AMOUNT</th>'
                            +'<th style="background-color: black;color: white;">HR MOBILE NO</th>'
                            +'<th style="background-color: black;color: white;">APPRENTICESHIP START DATE</th>'
                            +'<th style="background-color: black;color: white;">APPRENTICESHIP END DATE</th>'
                            +'<th style="background-color: black;color: white;">STATE NAME</th>'
                            +'<th style="background-color: black;color: white;">DIST NAME</th>'
                            +'<th style="background-color: black;color: white;">ADDRESS</th>'
                            +'<th style="background-color: black;color: white;">SCHEDULE INFO</th>'
                            +'</tr>');
                            
                     		$("#reportbody").empty();
                     		var count = 0;
                    resp.forEach(beann=>{
						count = count + 1;
						var plcmtyear = beann.plcmtYear == null ? "":beann.plcmtYear;
						var schedule = beann.plcmtScheduleEntryEntity.scheduleDate+'-'+beann.plcmtScheduleEntryEntity.itiEntity.itiName+'-'+beann.plcmtScheduleEntryEntity.scheduleDesc;
						
						$("#reportbody").append('<tr>'
						  		+'<td>'+count+'</td>'
						  		+'<td>'+beann.itiEntity.distMaster.dist_name+'</td>'
                                +'<td>'+beann.itiEntity.itiName+'</td>'
                                +'<td>'+beann.adm_num+'</td>'
                                +'<td>'+beann.name+'</td>'
                                +'<td>'+plcmtyear+'</td>'
                                +'<td>'+beann.pname_of_company+'</td>'
                                +'<td>'+beann.itiTradeMasterEntity.tradeName+'</td>'
                                +'<td>'+beann.pstipendamt+'</td>'
                                +'<td>'+beann.phrno+'</td>'
                                +'<td>'+beann.paaprstartdate+'</td>'
                                +'<td>'+beann.paaprenddate+'</td>'
                                +'<td>'+beann.distsStatewise.statename+'</td>'
                                +'<td>'+beann.distsStatewise.distname+'</td>'
                                +'<td>'+beann.paddress+'</td>'
                                +'<td>'+schedule+'</td>'
                                +'</tr>');
					});
				}
				findUniqueDists(resp);
				getITIDropDown(resp);
			}
			
			
		},
		error: function(resp){
			$("#loadmsg").empty();
			alert('error->'+resp.responseText);
			
		}
	});
}

function findUniqueDists(resp){
	//alert('resp length->'+resp.length);
	
	const distcodes = resp.map(bean=> bean.itiEntity.distCode);
	const uniqueDistCodes = [...new Set(distcodes)];
	
	$("#distcode").empty();
	$("#distcode").append('<option value="">-select-</option>');
	
	uniqueDistCodes.forEach(distcode=>{
		var distName = getDistName(distcode);
		//alert('distname=>'+distName);
		$("#distcode").append('<option value="'+distcode+'">'+distName+'</option>');
	});
}

function getITIDropDown(resp){
	const uniqueItis = new Map();
	
	resp.forEach(bean=>{
		if(!uniqueItis.has(bean.itiEntity.itiCode)){
			uniqueItis.set(bean.itiEntity.itiCode, bean.itiEntity.itiName);
		}
	});
	$("#iticode").append('<option value="">-ALL-</option>');
	uniqueItis.forEach((itiname, iticode)=>{
		const option = document.createElement('option');
		option.value = iticode;
		option.textContent = `${itiname}(${iticode})`;
		document.getElementById('iticode').appendChild(option);
	});
}

function fnExcelReport(a) {
    var table = document.getElementById(a);
    var wb = XLSX.utils.table_to_book(table, { sheet: "Sheet1" });

    // Generate Excel file
    XLSX.writeFile(wb, 'Report.xlsx');
}

function filterData(changingInput){
	
	var distcode = $("#distcode").val();
	var iticode = $("#iticode").val();
	var ptype = $("#ptype").val();
	//alert('distcode=>'+distcode+",iticode=>"+iticode)
	
	const filterDataa = plcmtsdata.filter(bean=>{
		//alert('in filter='+distcode+'='+implant.distId);
		return 		(distcode === "" || bean.itiEntity.distCode == distcode)
				&& (iticode === "" || bean.itiEntity.itiCode == iticode); 
				 
	});
	//alert('after filter data'+JSON.stringify(filterDataa))
	updateTable(filterDataa,ptype);
	updateDropDowns(changingInput,filterDataa);
	 
}

function updateTable(resp,ptype){
	//alert('updateTable'+resp.length);
		
		$("#loadmsg").empty();
		$("#reportdiv").show();
		
			if(resp.length <= 0){
				//alert('no data found');
				$("#tablediv").append('<div align="center"><h5 class="h5 text-danger">NO DATA FOUND</h5></div>');
			}else{
				
				$("#tablediv").append('<div id="scrollbar">'
											+'<div id="content">'
												+'<table class="table table-bordered" id="reporttable">'
												+'<thead id="reportthead"></thead>'
												+'<tbody id="reportbody"></tbody>'
												+'</table>'
											+'</div>'
										+'</div>');
				
				if(ptype == 'Job'){
					//alert('ptype is Job');
					
					$("#reportthead").empty();
					$("#reportbody").empty();
					
                	$("#reportthead").append('<tr>'
                            +'<th style="background-color: black;color: white;">SNO</th>'
                            +'<th style="background-color: black;color: white;">DISTRICT</th>'
                            +'<th style="background-color: black;color: white;">ITI</th>'
                            +'<th style="background-color: black;color: white;">ADMISSION NUMBER</th>'
                            +'<th style="background-color: black;color: white;">TRAINEE NAME</th>'
                            +'<th style="background-color: black;color: white;">PLACEMENT YEAR</th>'
                            +'<th style="background-color: black;color: white;">COMPANY NAME</th>'
                            +'<th style="background-color: black;color: white;">POST NAME</th>'
                            +'<th style="background-color: black;color: white;">SALARY</th>'
                            +'<th style="background-color: black;color: white;">HR MOBILE NO</th>'
                            +'<th style="background-color: black;color: white;">STATE NAME</th>'
                            +'<th style="background-color: black;color: white;">DIST NAME</th>'
                            +'<th style="background-color: black;color: white;">ADDRESS</th>'
                            +'<th style="background-color: black;color: white;">SCHEDULE INFO</th>'
                    +'</tr>');
                    var count = 0;
                    resp.forEach(bean=>{
						count = count + 1;
						var plcmtyear = bean.plcmtYear == null ? "":bean.plcmtYear;
						var schedule = bean.plcmtScheduleEntryEntity.scheduleDate+'-'+bean.plcmtScheduleEntryEntity.itiEntity.itiName+'-'+bean.plcmtScheduleEntryEntity.scheduleDesc;
						
						$("#reportbody").append('<tr>'
                                +'<td>'+count+'</td>'
                                +'<td>'+bean.itiEntity.distMaster.dist_name+'</td>'
                                +'<td>'+bean.itiEntity.itiName+'</td>'
                                +'<td>'+bean.adm_num+'</td>'
                                +'<td>'+bean.name+'</td>'
                                +'<td>'+plcmtyear+'</td>'
                                +'<td>'+bean.pname_of_company+'</td>'
                                +'<td>'+bean.ppostname+'</td>'
                                +'<td>'+bean.psalary+'</td>'
                                +'<td>'+bean.phrno+'</td>'
                                +'<td>'+bean.statesMastEntity.statename+'</td>'
                                +'<td>'+bean.distsStatewise.distname+'</td>'
                                +'<td>'+bean.paddress+'</td>'
                                +'<td>'+schedule+'</td>'
                                +'</tr>');
					});
                    
				}
				if(ptype == 'Apprenticeship'){
							//alert('Apprenticeship');
							$("#reportthead").empty();
							$("#reportbody").empty();
							
                            $("#reportthead").append('<tr>'
                            +'<th style="background-color: black;color: white;">SNO</th>'
                            +'<th style="background-color: black;color: white;">DISTRICT</th>'
                            +'<th style="background-color: black;color: white;">ITI</th>'
                            +'<th style="background-color: black;color: white;">ADMISSION NUMBER</th>'
                            +'<th style="background-color: black;color: white;">TRAINEE NAME</th>'
                            +'<th style="background-color: black;color: white;">PLACEMENT YEAR</th>'
                            +'<th style="background-color: black;color: white;">COMPANY NAME</th>'
                            +'<th style="background-color: black;color: white;">TRADE NAME</th>'
                            +'<th style="background-color: black;color: white;">STIPHEND AMOUNT</th>'
                            +'<th style="background-color: black;color: white;">HR MOBILE NO</th>'
                            +'<th style="background-color: black;color: white;">APPRENTICESHIP START DATE</th>'
                            +'<th style="background-color: black;color: white;">APPRENTICESHIP END DATE</th>'
                            +'<th style="background-color: black;color: white;">STATE NAME</th>'
                            +'<th style="background-color: black;color: white;">DIST NAME</th>'
                            +'<th style="background-color: black;color: white;">ADDRESS</th>'
                            +'<th style="background-color: black;color: white;">SCHEDULE INFO</th>'
                            +'</tr>');
                            
                     		$("#reportbody").empty();
                     		var count = 0;
                    resp.forEach(beann=>{
						count = count + 1;
						var plcmtyear = beann.plcmtYear == null ? "":beann.plcmtYear;
						var schedule = beann.plcmtScheduleEntryEntity.scheduleDate+'-'+beann.plcmtScheduleEntryEntity.itiEntity.itiName+'-'+beann.plcmtScheduleEntryEntity.scheduleDesc;
						
						$("#reportbody").append('<tr>'
						  		+'<td>'+count+'</td>'
						  		+'<td>'+beann.itiEntity.distMaster.dist_name+'</td>'
                                +'<td>'+beann.itiEntity.itiName+'</td>'
                                +'<td>'+beann.adm_num+'</td>'
                                +'<td>'+beann.name+'</td>'
                                +'<td>'+plcmtyear+'</td>'
                                +'<td>'+beann.pname_of_company+'</td>'
                                +'<td>'+beann.itiTradeMasterEntity.tradeName+'</td>'
                                +'<td>'+beann.pstipendamt+'</td>'
                                +'<td>'+beann.phrno+'</td>'
                                +'<td>'+beann.paaprstartdate+'</td>'
                                +'<td>'+beann.paaprenddate+'</td>'
                                +'<td>'+beann.distsStatewise.statename+'</td>'
                                +'<td>'+beann.distsStatewise.distname+'</td>'
                                +'<td>'+beann.paddress+'</td>'
                                +'<td>'+schedule+'</td>'
                                +'</tr>');
					});
				}
			}
}
 
 function updateDropDowns(changingInput,filterDataa){
	
	var distcode = $("#distcode").val();
	var iticode = $("#iticode").val();
	
	if(changingInput == 'changedistcode'){
		
		$("#iticode").empty();
		$("#iticode").append('<option value="">-ALL-</option>');
		
		if(distcode != ''){
			$("#iticode").empty();
			const uniqueItis = new Map();
			filterDataa.forEach(bean=>{
				if(!uniqueItis.has(bean.itiEntity.itiCode)){
					uniqueItis.set(bean.itiEntity.itiCode, bean.itiEntity.itiName);
				}
			});
			$("#iticode").append('<option value="">-ALL-</option>');
			uniqueItis.forEach((itiname, iticode)=>{
				const option = document.createElement('option');
				option.value = iticode;
				option.textContent = `${itiname}(${iticode})`;
				document.getElementById('iticode').appendChild(option);
			});
		}
	}
}

function reloadpage(){
	window.location.reload();
}