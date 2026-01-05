/**
 * 
 */


let implantdata = null;

$(document).ready(function(){
	
	implantdata = null;
	
	//alert("jwtToken"+jwtToken);
	$.ajax({
		type: 'get',
		url: baseUrl+'implant/implantNodalReport',
		headers: {
			'Authorization': jwtToken
		},
		cache: false,
		timeout: 600000,
		success:function(resp){
			//alert("resp=>"+JSON.stringify(resp));
			$("#spinnerdiv").hide();
			implantdata = resp;
			
			$("#tablebody").empty();
			var count= 0;
			for(var i=0;i<resp.length;i++){
				var bean = resp[i];
				
				var fromDateParts = bean.from_date.split('-');
				var formattedDate = fromDateParts[2]+'-'+fromDateParts[1]+'-'+fromDateParts[0];
				
				var toDateParts = bean.to_date.split('-');
				var toDatePartsDate = toDateParts[2]+'-'+toDateParts[1]+'-'+toDateParts[0];
				
				count= count + 1;
				$("#tablebody").append('<tr>'
						+'<td>'+count+'</td>'
						+'<td>'+bean.itidistname+'</td>'
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
			//generateDistDropdown('distcode');
			getDistDropDown();
		},
		error:function(resp){
			alert("Something went wrong while getting implant details");
		}
	});
});
function fnExcelReport(a) {
    var table = document.getElementById(a);
    var wb = XLSX.utils.table_to_book(table, { sheet: "Sheet1" });

    // Generate Excel file
    XLSX.writeFile(wb, 'Report.xlsx');
}

function getDistDropDown(){
	const uniqueDists = new Map();
	implantdata.forEach(implant=>{
		if(!uniqueDists.has(implant.itidistcode)){
			uniqueDists.set(implant.itidistcode, implant.itidistname)
		}
	});	
	//alert('dists=>'+JSON.stringify(uniqueDists));
	if(uniqueDists == 0){
		$("#distcode").append('<option>-NO DISTs FOUND</option>');
	}else{
		$("#distcode").append('<option value="">-ALL-</option>');
		uniqueDists.forEach((distname,distcode)=>{
			const option = document.createElement('option');
			option.value = distcode; option.textContent=distname;
			document.getElementById('distcode').appendChild(option);
		});
	}
}
 
function getITIDropDown(){
	const uniqueItis = new Map();
	
	implantdata.forEach(iti=>{
		if(!uniqueItis.has(iti.iti_code)){
			uniqueItis.set(iti.iti_code, iti.iti_name);
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

function getIndustryDropDown(){
	const uniqueIndustries = new Map();
	
	implantdata.forEach(implant=>{
		uniqueIndustries.set(implant.slno, implant.industry_name);
	});
	$("#industryId").append('<option value="">-ALL-</option>');
	uniqueIndustries.forEach((industryNamee, industryName)=>{
		const option = document.createElement('option');
		option.value = industryName;
		option.textContent = `${industryNamee}(${industryNamee})`;
		document.getElementById('industryId').appendChild(option);
	});
}

function filterData(changingInput){
	
	var distcode = $("#distcode").val();
	var iticode = $("#iticode").val();
	var industryId = $("#industryId").val();
	//alert('distcode=>'+distcode+",iticode=>"+iticode+",industryId=>"+industryId)
	
	const filterDataa = implantdata.filter(implant=>{
		//alert('in filter='+distcode+'='+implant.distId);
		return 	(distcode === "" || implant.itidistcode == distcode) && 
				(iticode === "" || implant.iti_code == iticode) && 
				(industryId === "" || implant.slno == industryId);
	});
	//alert('after filter data'+JSON.stringify(filterDataa))
	updateTable(filterDataa);
	updateDropDowns(changingInput,filterDataa);
	 
}

function updateDropDowns(changingInput,filterDataa){
	
	var distcode = $("#distcode").val();
	var iticode = $("#iticode").val();
	
	if(changingInput == 'changedistcode'){
		
		$("#iticode").empty();
		$("#iticode").append('<option value="">-ALL-</option>');
		
		$("#industryId").empty();
		$("#industryId").append('<option value="">-ALL-</option>');
		
		if(distcode != ''){
			$("#iticode").empty();
			const uniqueItis = new Map();
			filterDataa.forEach(iti=>{
				if(!uniqueItis.has(iti.iti_code)){
					uniqueItis.set(iti.iti_code, iti.iti_name);
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
	if(changingInput == 'changeiticode'){
		$("#industryId").empty();
		$("#industryId").append('<option value="">-ALL-</option>');
		
		if(iticode != ''){
			$("#industryId").empty();
			const uniqueIndustries = new Map();
			filterDataa.forEach(implant=>{
				if(!uniqueIndustries.has(implant.slno)){
					uniqueIndustries.set(implant.slno, implant.industry_name);
				}
			});
			$("#industryId").append('<option value="">-ALL-</option>');
			uniqueIndustries.forEach((industryNamee, industryName)=>{
				const option = document.createElement('option');
				option.value = industryName;
				option.textContent = `${industryNamee}(${industryNamee})`;
				document.getElementById('industryId').appendChild(option);
			});
		}
	}
	
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
						+'<td>'+implant.itidistname+'</td>'
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

 


