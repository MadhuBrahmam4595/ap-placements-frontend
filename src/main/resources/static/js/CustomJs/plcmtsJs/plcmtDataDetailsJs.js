$(document).ready(function () {
    $("#datadiv").hide();
    $("#spinnerdiv").hide();
    
    
});
 

function getData(){
	 
	var year=$('#year').val();
	var itiType=$('#itiType').val();
	
	 if (!year) {
        alert("Please select a year.");
        return;
    }
	
	$("#spinnerdiv").show();
	
	// Update table headers dynamically
    $("#admitted1YearHeader").text((year - 1) + " - 1 Year Trades");
    $("#admitted2YearHeader").text((year - 2) + " - 2 Year Trades");
	
	$.ajax({
		type: 'get',
		url: baseUrl+'api/plcmt/getCurrentAndSeniorsData?year='+year+'&itiType='+itiType,
		//url: baseUrl+'placementsbe/masterdata/getCurrentAndSeniorsData?year='+year+'&itiType='+itiType,
		headers: {
			'Authorization': jwtToken
		},
		cache: false,
		timeout: 600000,
		success:function(resp){
			//alert("resp=>"+JSON.stringify(resp));
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
						+'<td>'+bean.district+'</td>'
						+'<td>'+bean.iti_name+'</td>'
						+'<td>'+bean.mis_code+'</td>'
						+'<td>'+bean.admitted1Year+'</td>'
						+'<td>'+bean.admitted2Year+'</td>'
						+'<td>'+bean.totalAppeared+'</td>'
						+'<td>'+bean.joJ+'</td>'
						+'<td>'+bean.aoa+'</td>'
						+'<td>'+bean.selfEmployment+'</td>'
						+'<td>'+bean.higherEducation+'</td>'
						+'<td>'+bean.totalPlacement+'</td>'
						+'</tr>');
			}
			
		},
		error:function(resp){
			alert("Something went wrong while getting placement details");
		}
	});
	 
	
}

function fnExcelReport(a) {
    	    var table = document.getElementById(a);
    	    var wb = XLSX.utils.table_to_book(table, { sheet: "Sheet1" });

    	    // Generate Excel file
    	    XLSX.writeFile(wb, 'Report.xlsx');
    	}