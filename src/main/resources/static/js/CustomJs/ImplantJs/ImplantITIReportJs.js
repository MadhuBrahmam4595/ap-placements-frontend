/**
 * 
 */
 let implantdata = null;
	
	$(document).ready(function(){
		
		$("#inputrow").hide();
		$("#reporttable").hide();
		$("#emptydatamsg").hide();
		
		//alert("jwtToken"+jwtToken);
		jwtToken = 'Bearer '+jwtToken;
		
		$.ajax({
			type:'get',
			url: baseUrl+'implant/implantITIReport',
			headers: {
				'Authorization': jwtToken
			},
			cache: false,
			timeout: 600000,
			success:function(resp){
				//alert("resp=>"+JSON.stringify(resp));
				implantdata = resp
				$("#tablebody").empty();
				
				if(resp.length<=0){
					$("#inputrow").hide();
					$("#reporttable").hide();
					$("#emptydatamsg").show();
				}else{
					$("#inputrow").show();
					$("#reporttable").show();
					$("#emptydatamsg").hide();
					var count= 0;
					for(var i=0;i<resp.length;i++){
					var bean = resp[i];
					
					var fromDateParts = bean.fromDate.split('-');
					var formattedDate = fromDateParts[2]+'-'+fromDateParts[1]+'-'+fromDateParts[0];
					
					var toDateParts = bean.toDate.split('-');
					var toDatePartsDate = toDateParts[2]+'-'+toDateParts[1]+'-'+toDateParts[0];
					
					var tradename = bean.itiTradeMaster == null ? '' : bean.itiTradeMaster.tradeName;
					
					count= count + 1;
					$("#tablebody").append('<tr>'
							+'<td>'+count+'</td>'
							+'<td>'+bean.implantId+'</td>'
							+'<td>'+bean.industriesEntity.industryName+'</td>'
							+'<td>'+bean.facultyName+'</td>'
							+'<td>'+tradename+'</td>'
							+'<td>'+bean.industryAddress+'</td>'
							+'<td>'+bean.hrNo+'</td>'
							+'<td style="white-space: nowrap;">'+formattedDate+'</td>'
							+'<td style="white-space: nowrap;">'+toDatePartsDate+'</td>'
							+'<td>'+bean.noOfDays+'</td>'
							+'<td>'+bean.noOfStudents+'</td>'
							+'<td>'+bean.distsStatewise.statename+'</td>'
							+'<td>'+bean.distsStatewise.distname+'</td>'
							+'<td>'+bean.location+'</td>'
							+'<td>'+bean.description+'</td>'
							+'</tr>');
				}
				getIndustryDropDown();
				}
			},
			error:function(resp){
				alert("Something went wrong while getting Implants Data for your ITI");
			}
		});
	});
function getIndustryDropDown(){
	const uniqueIndustries = new Map();
	
	if(implantdata.length > 0){
		implantdata.forEach(implant=>{
			uniqueIndustries.set(implant.slno, implant.industriesEntity.industryName);
		});
		$("#industryId").append('<option value="">-SELECT-</option>');
		uniqueIndustries.forEach((industryNamee, industryName)=>{
			const option = document.createElement('option');
			option.value = industryName;
			option.textContent = `${industryNamee}(${industryNamee})`;
			document.getElementById('industryId').appendChild(option);
		});
	}else{
		$("#industryId").append('<option value="">-NO INDUSTRIES FOUND FROM THE DATA-</option>');
	}
	
	
}

function filterData(){
	
	var industryId = $("#industryId").val();
	//alert('distcode=>'+distcode+",iticode=>"+iticode+",industryId=>"+industryId)
	
	const filterDataa = implantdata.filter(implant=>{
		//alert('in filter='+distcode+'='+implant.distId);
		return (industryId === "" || implant.slno == industryId);
	});
	//alert('after filter data'+JSON.stringify(filterDataa))
	updateTable(filterDataa);
}

function updateTable(filterData){
	 
	$("#tablebody").empty();
		var count= 0;
		filterData.forEach(implant=>{
		var fromDateParts = implant.fromDate.split('-');
		var formattedDate = fromDateParts[2]+'-'+fromDateParts[1]+'-'+fromDateParts[0];
				
		var toDateParts = implant.toDate.split('-');
		var toDatePartsDate = toDateParts[2]+'-'+toDateParts[1]+'-'+toDateParts[0];
		
		var tradename = implant.itiTradeMaster == null ? '' : implant.itiTradeMaster.tradeName;
				
				count= count + 1;
				$("#tablebody").append('<tr>'
							+'<td>'+count+'</td>'
							+'<td>'+implant.implantId+'</td>'
							+'<td>'+implant.industriesEntity.industryName+'</td>'
							+'<td>'+implant.facultyName+'</td>'
							+'<td>'+tradename+'</td>'
							+'<td>'+implant.industryAddress+'</td>'
							+'<td>'+implant.hrNo+'</td>'
							+'<td style="white-space: nowrap;">'+formattedDate+'</td>'
							+'<td style="white-space: nowrap;">'+toDatePartsDate+'</td>'
							+'<td>'+implant.noOfDays+'</td>'
							+'<td>'+implant.noOfStudents+'</td>'
							+'<td>'+implant.distsStatewise.statename+'</td>'
							+'<td>'+implant.distsStatewise.distname+'</td>'
							+'<td>'+implant.location+'</td>'
							+'<td>'+implant.description+'</td>'
							+'</tr>');
	});
}

function fnExcelReport(a) {
    var table = document.getElementById(a);
    var wb = XLSX.utils.table_to_book(table, { sheet: "Sheet1" });

    // Generate Excel file
    XLSX.writeFile(wb, 'Report.xlsx');
}

