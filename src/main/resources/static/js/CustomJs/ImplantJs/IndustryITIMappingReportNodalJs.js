/**
 * 
 */

let industriesdata = null;

 $(document).ready(function(){
	//alert('ready');
	
	$.ajax({
		type: 'get',
		url:baseUrl+'implant/getAllIndustries',
		headers: {'Authorization': 'Bearer '+jwtToken},
		cache: false,
		timeout: 600000,
		success:function(resp){
			//alert(JSON.stringify(resp));
			industriesdata = resp;
			
			getDistDropDown();
			
			var count = 0;
			resp.forEach(bean=>{
				count = count + 1;
				var industryType = bean.industryType == null?'':bean.industryType;
				var tradeName = bean.tradeName == null?'':bean.tradeName;
				$("#tabledata").append('<tr><td>'+count+'</td><td>'+bean.slno+'</td><td>'+bean.distName+'</td><td>'+bean.itiName+'</td><td>'+bean.industryName+'</td><td>'+industryType+'</td><td>'+tradeName+'</td></tr>')
			});
		},
		error:function(error){
			alert('Something went wrong while getting data.');
		}
	});
	
 });
 
 function getDistDropDown(){
	const uniqueDists = new Map();
	industriesdata.forEach(industries=>{
		if(!uniqueDists.has(industries.distCode)){
			uniqueDists.set(industries.distCode, industries.distName)
		}
	});	
	//alert('dists=>'+JSON.stringify(uniqueDists));
	$("#distcode").empty();
	if(uniqueDists == 0){
		$("#distcode").append('<option>-NO DISTs FOUND</option>');
	}else{
		$("#distcode").append('<option value="">-SELECT-</option>');
		uniqueDists.forEach((distname,distcode)=>{
			const option = document.createElement('option');
			option.value = distcode; option.textContent=distname;
			document.getElementById('distcode').appendChild(option);
		});
	}
}

function filterData(value){
	
	if(value == 'dist'){
		$("#iticode").val('');
		$("#industryId").val('');
		var distcode = $("#distcode").val();
		
		const distIndustries = industriesdata.filter(industry=>{ return (distcode === '' || industry.distCode == distcode); })
		//alert('distItis->'+JSON.stringify(distIndustries));
		
		const uniqueItis = new Map();
		distIndustries.forEach(industry=>{
			if(!uniqueItis.has(industry.itiCode)){
				uniqueItis.set(industry.itiCode,industry.itiName);
			}
		})
		$("#iticode").empty();
		$("#iticode").append('<option value="">-SELECT-</option>');
		uniqueItis.forEach((itiname, iticode)=>{
		const option = document.createElement('option');
		option.value = iticode;
		option.textContent = `${itiname}(${iticode})`;
		document.getElementById('iticode').appendChild(option);
	});
	getDistData(distcode);
	}
	
	if(value == 'iti'){
		$("#industryId").val('');
		var iticode = $("#iticode").val();
		
		const filterIndustries = industriesdata.filter(industry=>{
			return (iticode == '' || industry.itiCode == iticode);
		});
		//alert('filterIndustries=>'+JSON.stringify(filterIndustries));
		const uniqueIndustries = new Map();
		filterIndustries.forEach(industry=>{
			if(!uniqueIndustries.has(industry.industryId)){
				uniqueIndustries.set(industry.industryId, industry.industryName);
			}
		});
		//alert('uniqueIndustries=>'+uniqueIndustries.size);
		$("#industryId").empty();
		$("#industryId").append('<option value="">-SELECT-</option>');
		uniqueIndustries.forEach((industryname, industryid)=>{
			const option = document.createElement('option');
			option.value = industryid;
			option.textContent = `${industryname}(${industryid})`;
			document.getElementById('industryId').appendChild(option);
		});
		getItiData(iticode);
	}
	
	if(value == 'industry'){
		var iticode = $("#iticode").val();
		var industryId = $("#industryId").val();
		const filterData = industriesdata.filter(data=>{
			return (iticode == ''|| data.itiCode == iticode ) && (industryId == '' || data.industryId == industryId);
		});
		//alert('filterData=>'+JSON.stringify(filterData));
		$("#tabledata").empty();
		var count = 0;
		filterData.forEach(bean=>{
			count = count + 1;
			var industryType = bean.industryType == null?'':bean.industryType;
			var tradeName = bean.tradeName == null?'':bean.tradeName;
			$("#tabledata").append('<tr><td>'+count+'</td><td>'+bean.slno+'</td><td>'+bean.distName+'</td><td>'+bean.itiName+'</td><td>'+bean.industryName+'</td><td>'+industryType+'</td><td>'+tradeName+'</td></tr>')
		});
	}
	
}

function getDistData(distcode){
	 const filterData = industriesdata.filter(data=>{
		return (distcode == '' || data.distCode == distcode);
	});
	//alert('filterData=>'+JSON.stringify(filterData));
	$("#tabledata").empty();
	var count = 0;
			filterData.forEach(bean=>{
				count = count + 1;
				var industryType = bean.industryType == null?'':bean.industryType;
				var tradeName = bean.tradeName == null?'':bean.tradeName;
				$("#tabledata").append('<tr><td>'+count+'</td><td>'+bean.slno+'</td><td>'+bean.distName+'</td><td>'+bean.itiName+'</td><td>'+bean.industryName+'</td><td>'+industryType+'</td><td>'+tradeName+'</td></tr>')
			});
	
}
function getItiData(iticode){
	const filterData = industriesdata.filter(data=>{
		return (iticode == '' || data.itiCode == iticode);
	});
	//alert('filterData=>'+JSON.stringify(filterData));
	$("#tabledata").empty();
	var count = 0;
			filterData.forEach(bean=>{
				count = count + 1;
				var industryType = bean.industryType == null?'':bean.industryType;
				var tradeName = bean.tradeName == null?'':bean.tradeName;
				$("#tabledata").append('<tr><td>'+count+'</td><td>'+bean.slno+'</td><td>'+bean.distName+'</td><td>'+bean.itiName+'</td><td>'+bean.industryName+'</td><td>'+industryType+'</td><td>'+tradeName+'</td></tr>')
			});
}

function fnExcelReport(a) {
    var table = document.getElementById(a);
    var wb = XLSX.utils.table_to_book(table, { sheet: "Sheet1" });

    // Generate Excel file
    XLSX.writeFile(wb, 'Report.xlsx');
}