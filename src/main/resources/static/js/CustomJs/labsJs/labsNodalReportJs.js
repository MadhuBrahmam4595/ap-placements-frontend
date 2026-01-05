/**
 * 
 */
 let labsdata = null;
  $(document).ready(function(){
	//alert('ready function');
	getLabInfo();
});

function getLabInfo(){
	
	$.ajax({
		type: 'get',
		url: baseUrl+'labs/getAllLabItems',
		headers: { 'Authorization': jwtToken},
		cache: false,
		timeout: 600000,
		success: function(resp){
			//alert('success->'+JSON.stringify(resp));
			$("#spinnerdiv").hide();
			labsdata = resp;
			$("#tablebody").empty();
			var count = 0;
			resp.forEach(bean=>{
				count= count + 1;
				var description = bean.labEntity.description==null?'':bean.labEntity.description;
				var distname = getDistName(bean.labEntity.itiEntity.distCode);
				
				$("#tablebody").append('<tr>'
				+'<td>'+count+'</td>'
				+'<td>'+distname+'</td>'
				+'<td>'+bean.labEntity.itiEntity.itiName+'</td>'
				+'<td>'+bean.labEntity.industryName+'</td>'
				+'<td>'+bean.labEntity.itiTradeMasterEntity.tradeName+'</td>'
				+'<td>'+description+'</td>'
				+'<td>'+bean.itemName+'</td>'
				+'<td>'+bean.itemCost+'</td>'
				+'<td><img src="data:image/jpeg;base64,' + bean.itemPhoto+'" alt="Photo" width="20%" height="10%" /></td>'
				+'</tr>');
			});
			findUniqueDists(resp);
			getITIDropDown(resp);
			getIndustryDropDown(resp);
		},
		error: function(resp){
			alert('something went wrong while getting labs data.');
		}
	});
	
}

function findUniqueDists(resp){
	//alert('resp length->'+resp.length);
	const uniqueDists = new Map();
	resp.forEach(bean=>{
		//alert('distcode->'+bean.labEntity.itiEntity.distCode);
		if(!uniqueDists.has(bean.labEntity.itiEntity.distCode)){
			uniqueDists.set(bean.labEntity.itiEntity.distMaster.dist_code, bean.labEntity.itiEntity.distMaster.dist_name);
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
	
	 
	
//	const distcodes = resp.map(bean=> bean.labEntity.itiEntity.distCode);
//	const uniqueDistCodes = [...new Set(distcodes)];
//	
//	uniqueDistCodes.forEach(distcode=>{
//		var distName = getDistName(distcode);
//		//alert('distname=>'+distName);
//		$("#distcode").empty();
//		$("#distcode").append('<option value="">-select-</option>');
//		$("#distcode").append('<option value="'+distcode+'">'+distName+'</option>');
//	});
}

function filterData(changingInput){
	
	var distcode = $("#distcode").val();
	var iticode = $("#iticode").val();
	var industryId = $("#industryId").val();
	//alert('distcode=>'+distcode+",iticode=>"+iticode+",industryId=>"+industryId)
	
	const filterDataa = labsdata.filter(bean=>{
		//alert('in filter='+distcode+'='+implant.distId);
		return 		(distcode === "" || bean.labEntity.itiEntity.distCode == distcode)
				&& (iticode === "" || bean.labEntity.itiEntity.itiCode == iticode) 
				&& (industryId === "" || bean.labEntity.industryName == industryId);
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
			filterDataa.forEach(bean=>{
				if(!uniqueItis.has(bean.labEntity.itiEntity.itiCode)){
					uniqueItis.set(bean.labEntity.itiEntity.itiCode, bean.labEntity.itiEntity.itiName);
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
			filterDataa.forEach(bean=>{
				if(!uniqueIndustries.has(bean.labEntity.industryName)){
					uniqueIndustries.set(bean.labEntity.industryName, bean.labEntity.industryName);
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

function getITIDropDown(resp){
	const uniqueItis = new Map();
	
	resp.forEach(bean=>{
		if(!uniqueItis.has(bean.labEntity.itiEntity.itiCode)){
			uniqueItis.set(bean.labEntity.itiEntity.itiCode, bean.labEntity.itiEntity.itiName);
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

function getIndustryDropDown(resp){
	const uniqueIndustries = new Map();
	
	resp.forEach(bean=>{
		if(!uniqueIndustries.has(bean.labEntity.industryName)){
			uniqueIndustries.set(bean.labEntity.industryName, bean.labEntity.industryName);
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

function updateTable(resp){
	$("#tablebody").empty();
			var count = 0;
			resp.forEach(bean=>{
				count= count + 1;
				var description = bean.labEntity.description==null?'':bean.labEntity.description;
				var distname = getDistName(bean.labEntity.itiEntity.distCode);
				
				$("#tablebody").append('<tr>'
				+'<td>'+count+'</td>'
				+'<td>'+distname+'</td>'
				+'<td>'+bean.labEntity.itiEntity.itiName+'</td>'
				+'<td>'+bean.labEntity.industryName+'</td>'
				+'<td>'+bean.labEntity.itiTradeMasterEntity.tradeName+'</td>'
				+'<td>'+description+'</td>'
				+'<td>'+bean.itemName+'</td>'
				+'<td>'+bean.itemCost+'</td>'
				+'<td><img src="data:image/jpeg;base64,' + bean.itemPhoto+'" alt="Photo" width="20%" height="10%" /></td>'
				+'</tr>');
			});
}


function fnExcelReport2(a) {
    var table = document.getElementById(a);
    var wb = XLSX.utils.table_to_book(table, { sheet: "Sheet1" });

    // Generate Excel file
    XLSX.writeFile(wb, 'Report.xlsx');
}

function fnExcelReport(a) {
    // Use ExcelJS to create the workbook
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Sheet1');

    var table = document.getElementById(a);
    var rows = table.rows;

    // Add table headers
    var headerRow = worksheet.addRow();
    for (var i = 0; i < rows[0].cells.length; i++) {
        headerRow.getCell(i + 1).value = rows[0].cells[i].innerText;
    }

    // Add data rows and images
    for (var i = 1; i < rows.length; i++) {
        var row = worksheet.addRow();
        for (var j = 0; j < rows[i].cells.length; j++) {
            var cell = rows[i].cells[j];

            if (j === 5) { // Assuming the 6th column is where the image is
                var imgElement = cell.querySelector('img');
                if (imgElement) {
                    // Extract the Base64 string
                    var imgBase64 = imgElement.src.split(',')[1];

                    // Convert Base64 string to binary (Uint8Array)
                    var binaryString = atob(imgBase64);
                    var length = binaryString.length;
                    var uint8Array = new Uint8Array(length);

                    for (var k = 0; k < length; k++) {
                        uint8Array[k] = binaryString.charCodeAt(k);
                    }

                    // Add the image to the workbook
                    var imageId = workbook.addImage({
                        buffer: uint8Array,
                        extension: 'jpeg'
                    });

                    // Insert the image into the cell
                    worksheet.addImage(imageId, {
                        tl: { col: j, row: i },
                        ext: { width: 50, height: 50 }
                    });
                }
            } else {
                row.getCell(j + 1).value = cell.innerText;
            }
        }
    }

    // Generate the Excel file and trigger the download
    workbook.xlsx.writeBuffer().then(function(data) {
        var blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        var url = window.URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = 'Report.xlsx';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    });
}


