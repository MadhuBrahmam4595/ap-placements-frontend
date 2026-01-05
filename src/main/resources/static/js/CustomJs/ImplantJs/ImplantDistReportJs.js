/**
 * 
 */
 let implantdata = null;
 
$(document).ready(function(){
	
	//alert("jwtToken"+jwtToken);
	jwtToken = 'Bearer '+jwtToken;
	
	$.ajax({
		type: 'get',
		url: baseUrl+'implant/implantDistReport',
		headers: {
			'Authorization': jwtToken
		},
		cache: false,
		timeout: 600000,
		success:function(resp){
			//alert("resp=>"+JSON.stringify(resp));
			implantdata = resp;
			$("#tablebody").empty();
			var count= 0;
			for(var i=0;i<resp.length;i++){
				var bean = resp[i];
				
				var  fromDateParts = bean.from_date.split('-');
				var formattedDate = fromDateParts[2]+'-'+fromDateParts[1]+'-'+fromDateParts[0];
				
				var  toDateParts = bean.to_date.split('-');
				var toDatePartsDate = toDateParts[2]+'-'+toDateParts[1]+'-'+toDateParts[0];
				
				count= count + 1;
				$("#tablebody").append('<tr>'
						+'<td>'+count+'</td>'
						+'<td>'+bean.iti_name+'</td>'
						+'<td>'+bean.implant_id+'</td>'
						+'<td>'+bean.industry_name+'</td>'
						+'<td>'+bean.faculty_name+'</td>'
						+'<td>'+bean.trade_name+'</td>'
						+'<td>'+bean.industry_address+'</td>'
						+'<td>'+bean.hr_no+'</td>'
						+'<td style="white-space: nowrap;">'+formattedDate+'</td>'
						+'<td style="white-space: nowrap;">'+toDatePartsDate+'</td>'
						+'<td>'+bean.no_of_days+'</td>'
						+'<td>'+bean.no_of_students+'</td>'
						+'<td>'+bean.implant_statename+'</td>'
						+'<td>'+bean.implant_distname+'</td>'
						+'<td>'+bean.location+'</td>'
						+'<td>'+bean.description+'</td>'
						+'</tr>');
			}
			getITIDropDown();
			getIndustryDropDown();
		},
		error:function(resp){
			alert("Something went wrong while getting in-plant details");
		}
	});
});

function fnExcelReport(a) {
    var table = document.getElementById(a);
    var wb = XLSX.utils.table_to_book(table, { sheet: "Sheet1" });

    // Generate Excel file
    XLSX.writeFile(wb, 'Report.xlsx');
}

function getITIDropDown(){
	const uniqueItis = new Map();
	
	implantdata.forEach(iti=>{
		if(!uniqueItis.has(iti.iti_code)){
			uniqueItis.set(iti.iti_code, iti.iti_name);
		}
	});
	$("#iticode").append('<option value="">-SELECT-</option>');
	uniqueItis.forEach((userIdName, userId)=>{
		const option = document.createElement('option');
		option.value = userId;
		option.textContent = `${userIdName}(${userId})`;
		document.getElementById('iticode').appendChild(option);
	});
}

function getIndustryDropDown(){
	const uniqueIndustries = new Map();
	
	implantdata.forEach(implant=>{
		uniqueIndustries.set(implant.slno, implant.industry_name);
	});
	$("#industryId").append('<option value="">-SELECT-</option>');
	uniqueIndustries.forEach((industryNamee, industryName)=>{
		const option = document.createElement('option');
		option.value = industryName;
		option.textContent = `${industryNamee}(${industryNamee})`;
		document.getElementById('industryId').appendChild(option);
	});
}

function filterData(){
	
	var iticode = $("#iticode").val();
	var industryId = $("#industryId").val();
	//alert('distcode=>'+distcode+",iticode=>"+iticode+",industryId=>"+industryId)
	
	const filterDataa = implantdata.filter(implant=>{
		//alert('in filter='+distcode+'='+implant.distId);
		return 	(iticode === "" || implant.iti_code == iticode) && (industryId === "" || implant.slno == industryId);
	});
	//alert('after filter data'+JSON.stringify(filterDataa))
	updateTable(filterDataa);
}

function updateTable(filterData){
	 
	$("#tablebody").empty();
		var count= 0;
		filterData.forEach(implant=>{
		var fromDateParts = implant.from_date.split('-');
		var formattedDate = fromDateParts[2]+'-'+fromDateParts[1]+'-'+fromDateParts[0];
				
		var toDateParts = implant.to_date.split('-');
		var toDatePartsDate = toDateParts[2]+'-'+toDateParts[1]+'-'+toDateParts[0];
				
				count= count + 1;
				$("#tablebody").append('<tr>'
						+'<td>'+count+'</td>'
						+'<td>'+implant.iti_name+'</td>'
						+'<td>'+implant.implant_id+'</td>'
						+'<td>'+implant.industry_name+'</td>'
						+'<td>'+implant.faculty_name+'</td>'
						+'<td>'+implant.trade_name+'</td>'
						+'<td>'+implant.industry_address+'</td>'
						+'<td>'+implant.hr_no+'</td>'
						+'<td style="white-space: nowrap;">'+formattedDate+'</td>'
						+'<td style="white-space: nowrap;">'+toDatePartsDate+'</td>'
						+'<td>'+implant.no_of_days+'</td>'
						+'<td>'+implant.no_of_students+'</td>'
						+'<td>'+implant.implant_statename+'</td>'
						+'<td>'+implant.implant_distname+'</td>'
						+'<td>'+implant.location+'</td>'
						+'<td>'+implant.description+'</td>'
						+'</tr>');
	});
}
