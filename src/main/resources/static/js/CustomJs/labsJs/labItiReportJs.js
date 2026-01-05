/**
 * 
 */
 
  $(document).ready(function(){
	//alert('ready function');
	getLabInfo();
});

function getLabInfo(){
	
	$.ajax({
		type: 'get',
		url: baseUrl+'labs/getLabsItemsByIticode',
		headers: { 'Authorization': jwtToken},
		cache: false,
		timeout: 600000,
		success: function(resp){
			//alert('success->'+JSON.stringify(resp));
			$("#spinnerdiv").hide();
			$("#tablebody").empty();
			var count = 0;
			resp.forEach(bean=>{
				count= count + 1;
				var description = bean.labEntity.description==null?'':bean.labEntity.description;
				
				$("#tablebody").append('<tr>'
				+'<td>'+count+'</td>'
				+'<td>'+bean.labEntity.industryName+'</td>'
				+'<td>'+bean.labEntity.itiTradeMasterEntity.tradeName+'</td>'
				+'<td>'+description+'</td>'
				+'<td>'+bean.itemName+'</td>'
				+'<td>'+bean.itemCost+'</td>'
				+'<td><img src="data:image/jpeg;base64,' + bean.itemPhoto+'" alt="Photo" width="10%" height="10%" /></td>'
				+'</tr>');
			});
		},
		error: function(resp){
			alert('something went wrong while getting labs data.');
		}
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


