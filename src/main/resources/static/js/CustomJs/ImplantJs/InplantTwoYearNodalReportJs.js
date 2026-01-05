$(document).ready(function () {
    $("#datadiv").hide();
    $("#spinnerdiv").hide();
    
    
});
 

function getData(){
	 
	var currentYear=$('#year').val();
	var lastYear=parseInt(currentYear)-1;
	var itiType=$('#itiType').val();
	
	$("#spinnerdiv").show();
	$.ajax({
		type: 'get',
		url: baseUrl+'implant/getInplantTwoYearsDataYearwise?currentYear='+currentYear+'&lastYear='+lastYear+'&itiType='+itiType,
		headers: {
			'Authorization': jwtToken
		},
		cache: false,
		timeout: 600000,
		success:function(resp){
//			alert("resp=>"+JSON.stringify(resp));
			//alert("resp=>"+resp.length);
			
			
			$("#datadiv").show();
			$("#spinnerdiv").hide();
			
			$("#tablebody").empty();
			
			var count= 0;
			for(var i=0;i<resp.length;i++){
				var bean = resp[i];
				//alert("bean=>"+JSON.stringify(bean));
				
				count= count + 1;
				$("#tablebody").append('<tr>'
						+'<td>'+count+'</td>'
						+'<td>'+bean.dist_name+'</td>'
						+'<td>'+bean.iti_name+'</td>'
						+'<td>'+bean.admitted+'</td>'
						+'<td>'+bean.completed+'</td>'
						+'<td>'+bean.underTraining+'</td>'
						+'<td>'+bean.balance+'</td>'
						+'</tr>');
			}
			
		},
		error:function(resp){
			alert("Something went wrong while getting implant details");
		}
	});
	 
	
}

function fnExcelReport(a) {
    	    var table = document.getElementById(a);
    	    var wb = XLSX.utils.table_to_book(table, { sheet: "Sheet1" });

    	    // Generate Excel file
    	    XLSX.writeFile(wb, 'Report.xlsx');
    	}