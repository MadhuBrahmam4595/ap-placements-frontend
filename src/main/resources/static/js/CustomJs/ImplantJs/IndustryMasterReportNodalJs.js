/**
 * 
 */

$(document).ready(function() {
	$.ajax({
		type: 'get',
		url: baseUrl + 'implant/getAllIndustryMaster',
		headers: { 'Authorization': 'Bearer ' + jwtToken },
		cache: false,
		timeout: 600000,
		success: function(resp) {
			//alert(JSON.stringify(resp));
			var count = 0;
			var industryAddress = '';
			resp.forEach(bean => {
				count = count + 1;
				industryAddress = bean.industryAddress != null ? bean.industryAddress : "";
				$("#tabledata").append('<tr><td>' + count + '</td><td>' + bean.industryId + '</td><td>' + bean.industryName + '</td><td>' + bean.industryType + '</td><td>' + industryAddress + '</td>'
//					+ '<td></td></tr>');
					+'</tr>');
			});

		},
		error: function(error) {
			alert(JSON.stringify(error));

		}
	});
	 
});

function fnExcelReport(a) {
    	    var table = document.getElementById(a);
    	    var wb = XLSX.utils.table_to_book(table, { sheet: "Sheet1" });

    	    // Generate Excel file
    	    XLSX.writeFile(wb, 'Report.xlsx');
    	}

//function editdata(industryId) {
//	//alert('editdata=>'+industryId);
//	
//	 	let base64String = encodeBase64(industryId);
//		//alert('base64String=>'+base64String);
//	 	document.forms[0].action=`./editIndustryMaster?industryId=${base64String}`;
//		document.forms[0].submit();
//}
//
//function deletedata(industryId){
//	//alert('industryId=>'+industryId);
//	let base64String = encodeBase64(industryId);
//		//alert('base64String=>'+base64String);
//	 	document.forms[0].action=`./deleteIndustryMaster?industryId=${base64String}`;
//		document.forms[0].submit();
//}

 

 