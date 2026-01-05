/**
 * 
 */
 
 $(document).ready(function(){
	//alert('ready');
	$("#serverResp").empty();
	generateDistDropdown('distCode');
	getIndustryPartnerDetails();
	$("#submitbtn").append('<button class="btn btn-sm btn-success" onclick="return saveData();">SUBMIT</button>');
	
});

function getItis(value){
	//alert('value->'+value);
	
	$("#serverResp").empty();
	$.ajax({
		type: 'get',
		url: baseUrl+'masterdata/getItisInADist?distCode='+value,
		cache: false,
		timeout: 600000,
		success: function(resp){
			//alert('getItisInADist=>'+JSON.stringify(resp));
			$("#itiCode").empty();
			$("#itiCode").append('<option value="">-SELECT-</option>');
			resp.forEach(bean=>{
				$("#itiCode").append('<option value="'+bean.itiCode+'">'+bean.itiName+'('+bean.itiCode+')</option>');	
			});
		},
		error: function(resp){
			alert('ITIs are not loaded');
		}
	});
}

function getItisForSelectedDist(distCode, itiCode){
	//alert('value->'+value);
	
	$("#serverResp").empty();
	$.ajax({
		type: 'get',
		url: baseUrl+'masterdata/getItisInADist?distCode='+distCode,
		cache: false,
		timeout: 600000,
		success: function(resp){
			//alert('getItisInADist=>'+JSON.stringify(resp));
			$("#itiCode").empty();
			$("#itiCode").append('<option value="">-SELECT-</option>');
			resp.forEach(bean=>{
				
				if(bean.itiCode == itiCode){
					//alert('ddddddddddddddddddddd');
					$("#itiCode").append('<option value="'+bean.itiCode+'" selected>'+bean.itiName+'('+bean.itiCode+')</option>');
				}else{
					$("#itiCode").append('<option value="'+bean.itiCode+'">'+bean.itiName+'('+bean.itiCode+')</option>');
				}
				
					
			});
		},
		error: function(resp){
			alert('ITIs are not loaded');
		}
	});
}

function saveData(){
	//alert('savedata');
	
	var distCode = $("#distCode").val();
	var itiCode = $("#itiCode").val();
	var revisedLeadSector = $("#revisedLeadSector").val();
	var proposedNewTrade = $("#proposedNewTrade").val();
	var revisedLeadIndustryPartner = $("#revisedLeadIndustryPartner").val();
	
	if(distCode == "" || distCode == null){
		alert('DISTRICT is required please fill that.');
		return false;
	}
	
	if(itiCode == "" || itiCode == null){
		alert('ITI is required please fill that.');
		return false;
	}
	
	if(revisedLeadSector == "" || revisedLeadSector == null){
		alert('REVISED LEAD SECTOR is required please fill that.');
		return false;
	}
	
	if(proposedNewTrade == "" || proposedNewTrade == null){
		alert('PROPOSED NEW TRADE is required please fill that.');
		return false;
	}
	
	if(revisedLeadIndustryPartner == "" || revisedLeadIndustryPartner == null){
		alert('REVISED LEAD INDUSTRY PARTNER is required please fill that.');
		return false;
	}
	
	var industryPartnerDetailsModel = {};
	industryPartnerDetailsModel['itiCode'] = itiCode;
	industryPartnerDetailsModel['distCode'] = distCode;
	industryPartnerDetailsModel['revisedLeadSector'] = revisedLeadSector;
	industryPartnerDetailsModel['revisedLeadIndustryPartner'] = revisedLeadIndustryPartner;
	industryPartnerDetailsModel['proposedNewTrade'] = proposedNewTrade;
	
	$("#serverResp").empty();
	$.ajax({
		type: 'post',
		url: baseUrl+'implant/saveIndustryPartnerDetails',
		headers: { 'Authorization': jwtToken},
		contentType: 'application/json',
		data: JSON.stringify(industryPartnerDetailsModel),
		cache: false,
		timeout: 600000,
		success: function(resp){
			//alert('getItisInADist=>'+JSON.stringify(resp));
			
			$("#distCode").val('');
			$("#itiCode").val('');
			$("#revisedLeadSector").val('');
	 		$("#proposedNewTrade").val('');
	 		$("#revisedLeadIndustryPartner").val('');
	 		
	 		$("#serverResp").empty();
	 		$("#serverResp").append('<h5 class="h5 text-success">'+resp+'</h5>');
	 		
	 		getIndustryPartnerDetails();
			 
		},
		error: function(resp){
			//alert('Something went wrong while saving Industry Partner Details '+resp.responseText);
			$("#serverResp").empty();
			$("#serverResp").append('<h5 class="h5 text-success">Something went wrong while saving Industry Partner Details '+resp.responseText+'</h5>');
		}
	});
}

function getIndustryPartnerDetails(){
	//alert('getIndustryPartnerDetails');
	
	$.ajax({
		type: 'get',
		url: baseUrl+'implant/getAllIndustryPartnerDetails',
		headers: {'Authorization': jwtToken},
		cache: false,
		timeout: 600000,
		success: function(resp){
			//alert('getItisInADist=>'+JSON.stringify(resp));
			
			$("#tabledata").empty();
			var count = 0;
			resp.forEach(bean=>{
				count = count + 1;
				$("#tabledata").append('<tr>'
					+'<td>'+count+'</td>'
					+'<td>'+bean.oldDistMasterEntity.dist_name+'</td>'
					+'<td>'+bean.itiEntity.itiName+'('+bean.itiCode+')</td>'
					+'<td>'+bean.revisedLeadSector+'</td>'
					+'<td>'+bean.proposedNewTrade+'</td>'
					+'<td>'+bean.revisedLeadIndustryPartner+'</td>'
					+'<td><div class="d-flex">'
                                +'<button class="btn btn-sm btn-info m-1" onclick="return editData(\''+bean.pid+'\')">EDIT</button>'
                                +'<button class="btn btn-sm btn-danger m-1" onclick="return deleteData(\''+bean.pid+'\')">DELETE</button>'
                                +'</div></td>'
				+'</tr>')
			});
		},
		error: function(resp){
			alert('Industry Partner Details are not loaded.');
		}
	});
	
}

function deleteData(pid){
	//alert('deleteData->'+pid);
	
	if(confirm('Are you sure you want to delete this record?')){
		//alert('yes');
		
		$("#serverResp").empty();
		$.ajax({
		type: 'delete',
		url: baseUrl+'implant/deleteIndustryPartnerDetailsById?pid='+pid,
		headers: {'Authorization': jwtToken},
		cache: false,
		timeout: 600000,
		success: function(resp){
			//alert(JSON.stringify(resp));
			getIndustryPartnerDetails();
		},
		error: function(resp){
			alert('something went wrong while deleting details : '+resp.responseText);
		}
	});
	} 
}

function editData(pid){
	//alert('editdata->'+pid);
	
	$("#serverResp").empty();
	$.ajax({
		type: 'get',
		url: baseUrl+'implant/getIndustryPartnerDetailsById?pid='+pid,
		headers: {'Authorization': jwtToken},
		cache: false,
		timeout: 600000,
		success: function(resp){
			//alert(JSON.stringify(resp));
			
			$("#distCode").val('');
			$("#itiCode").val('');
			$("#revisedLeadSector").val('');
	 		$("#proposedNewTrade").val('');
	 		$("#revisedLeadIndustryPartner").val('');
	 		
	 		generateDistDropdownWithSelectedDist(resp.distCode, 'distCode');
	 		getItisForSelectedDist(resp.distCode, resp.itiCode)
			$("#revisedLeadSector").val(resp.revisedLeadSector);
	 		$("#proposedNewTrade").val(resp.proposedNewTrade);
	 		$("#revisedLeadIndustryPartner").val(resp.revisedLeadIndustryPartner);
	 		
	 		$("#submitbtn").empty();
	 		$("#submitbtn").append('<a href="javascript:updateData(\''+resp.pid+'\')" id="myButton" class="btn btn-success">Update</a>');
			
			$("#distCode").focus(); 
		},
		error: function(resp){
			alert('something went wrong while getting details : '+resp.responseText);
		}
	});
	
}

function updateData(pid){
	//alert('updateData=>'+pid);
	
	var distCode = $("#distCode").val();
	var itiCode = $("#itiCode").val();
	var revisedLeadSector = $("#revisedLeadSector").val();
	var proposedNewTrade = $("#proposedNewTrade").val();
	var revisedLeadIndustryPartner = $("#revisedLeadIndustryPartner").val();
	
	if(distCode == "" || distCode == null){
		alert('DISTRICT is required please fill that.');
		return false;
	}
	
	if(itiCode == "" || itiCode == null){
		alert('ITI is required please fill that.');
		return false;
	}
	
	if(revisedLeadSector == "" || revisedLeadSector == null){
		alert('REVISED LEAD SECTOR is required please fill that.');
		return false;
	}
	
	if(proposedNewTrade == "" || proposedNewTrade == null){
		alert('PROPOSED NEW TRADE is required please fill that.');
		return false;
	}
	
	if(revisedLeadIndustryPartner == "" || revisedLeadIndustryPartner == null){
		alert('REVISED LEAD INDUSTRY PARTNER is required please fill that.');
		return false;
	}
	
	var industryPartnerDetailsModel = {};
	industryPartnerDetailsModel['pid'] = pid;
	industryPartnerDetailsModel['itiCode'] = itiCode;
	industryPartnerDetailsModel['distCode'] = distCode;
	industryPartnerDetailsModel['revisedLeadSector'] = revisedLeadSector;
	industryPartnerDetailsModel['revisedLeadIndustryPartner'] = revisedLeadIndustryPartner;
	industryPartnerDetailsModel['proposedNewTrade'] = proposedNewTrade;
	
	$("#serverResp").empty();
	$.ajax({
		type: 'post',
		url: baseUrl+'implant/updateIndustryPartnerDetails',
		headers: { 'Authorization': jwtToken},
		contentType: 'application/json',
		data: JSON.stringify(industryPartnerDetailsModel),
		cache: false,
		timeout: 600000,
		success: function(resp){
			//alert('getItisInADist=>'+JSON.stringify(resp));
			
			$("#distCode").val('');
			$("#itiCode").val('');
			$("#revisedLeadSector").val('');
	 		$("#proposedNewTrade").val('');
	 		$("#revisedLeadIndustryPartner").val('');
	 		
	 		$("#serverResp").empty();
	 		$("#serverResp").append('<h5 class="h5 text-success">'+resp+'</h5>');
	 		
	 		getIndustryPartnerDetails();
			 
		},
		error: function(resp){
			//alert('Something went wrong while saving Industry Partner Details '+resp.responseText);
			$("#serverResp").empty();
			$("#serverResp").append('<h5 class="h5 text-success">Something went wrong while saving Industry Partner Details '+resp.responseText+'</h5>');
		}
	});
	
}

function fnExcelReport2(a) {
    var table = document.getElementById(a);
    var wb = XLSX.utils.table_to_book(table, { sheet: "Sheet1" });

    // Generate Excel file
    XLSX.writeFile(wb, 'Report.xlsx');
}

//function fnExcelReport(a) {
//    // Use ExcelJS to create the workbook
//    const workbook = new ExcelJS.Workbook();
//    const worksheet = workbook.addWorksheet('Sheet1');
//
//    var table = document.getElementById(a);
//    var rows = table.rows;
//
//    // Add table headers
//    var headerRow = worksheet.addRow();
//    for (var i = 0; i < rows[0].cells.length; i++) {
//        headerRow.getCell(i + 1).value = rows[0].cells[i].innerText;
//    }
//
//    // Add data rows and images
//    for (var i = 1; i < rows.length; i++) {
//        var row = worksheet.addRow();
//        for (var j = 0; j < rows[i].cells.length; j++) {
//            var cell = rows[i].cells[j];
//
//            if (j === 5) { // Assuming the 6th column is where the image is
//                var imgElement = cell.querySelector('img');
//                if (imgElement) {
//                    // Extract the Base64 string
//                    var imgBase64 = imgElement.src.split(',')[1];
//
//                    // Convert Base64 string to binary (Uint8Array)
//                    var binaryString = atob(imgBase64);
//                    var length = binaryString.length;
//                    var uint8Array = new Uint8Array(length);
//
//                    for (var k = 0; k < length; k++) {
//                        uint8Array[k] = binaryString.charCodeAt(k);
//                    }
//
//                    // Add the image to the workbook
//                    var imageId = workbook.addImage({
//                        buffer: uint8Array,
//                        extension: 'jpeg'
//                    });
//
//                    // Insert the image into the cell
//                    worksheet.addImage(imageId, {
//                        tl: { col: j, row: i },
//                        ext: { width: 50, height: 50 }
//                    });
//                }
//            } else {
//                row.getCell(j + 1).value = cell.innerText;
//            }
//        }
//    }
//
//    // Generate the Excel file and trigger the download
//    workbook.xlsx.writeBuffer().then(function(data) {
//        var blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
//        var url = window.URL.createObjectURL(blob);
//        var a = document.createElement('a');
//        a.href = url;
//        a.download = 'Report.xlsx';
//        document.body.appendChild(a);
//        a.click();
//        document.body.removeChild(a);
//    });
//}