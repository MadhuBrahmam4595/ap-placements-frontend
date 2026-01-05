  
  
  $(document).ready(function(){
	//alert('ready function');
	getEmployeeInfo();
	
});

function getEmployeeInfo(){
	
	$.ajax({
		type: 'get',
		url: baseUrl+'hrm/getAllEmployees',
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
				
				$("#tablebody").append('<tr>'
				+'<td>'+count+'</td>'
				+'<td>'+bean.itiEntity.itiName+'</td>'
				+'<td>'+bean.employeeName+'</td>'
				+'<td><a href="#" class="employee-code" data-employee-code="' + bean.employeeCode + '">' + bean.employeeCode + '</a></td>'
				+'<td>'+bean.designationMaster.designation+'</td>'
				+'<td>'+bean.ddoCode+'</td>'
				+'<td>'+bean.contactNumber+'</td>'
				+'<td>'+bean.itiTradeMasterEntity.tradeName+'</td>'
				+'<td>'+bean.dob+'</td>'
				+'<td>'+bean.dor+'</td>'
				+'<td>'+bean.postSanctioningGoNo+'</td>'
				+'<td>'+bean.qualMast.qualification+'</td>'
				+'<td>'+bean.qualMast2.qualification+'</td>'
				+'<td>'+bean.casteMaster.casteCategory+'</td>'
				+'<td>'+bean.subCasteMaster.subCaste+'</td>'
				+'<td>'+bean.designationMaster2.designation+'</td>'
				+'<td>'+bean.dateOfInitialAppointment+'</td>'
				+'<td>'+bean.dateOfReportingPresentStation+'</td>'
				+'</tr>');
			});
			
			// Attach click event after table is populated
            $(".employee-code").on("click", function (e) {
                e.preventDefault();
                var employeeCode = $(this).data("employee-code");
                fetchEmployeeDetails(employeeCode);
            });
        
			
		},
		error: function(resp){
			alert('something went wrong while getting labs data.');
		}
	});
	
}

function fetchEmployeeDetails(employeeCode) {
    $.ajax({
        type: 'get',
        url: baseUrl + 'hrm/employeeFindById',
        headers: { 'Authorization': jwtToken },
        data: { employeeCode: employeeCode },
        cache: false,
        timeout: 600000,
        success: function (resp) {
			//alert('success->'+JSON.stringify(resp));
            //console.log("Employee Details:", resp);

            var modalTableBody = $("#modalTableBody");
            var modalTableBody2 = $("#modalTableBody2");
            
             //  Clear previous data completely before adding new records
            modalTableBody.html("");  
            modalTableBody2.html(""); 

            if (resp.employeePromotionDetails.length > 0 || resp.deptTests.length > 0) {
                resp.employeePromotionDetails.forEach(promotion => {
                    modalTableBody.append('<tr>'
                        + '<td>' + (promotion.designationMaster.designation || "N/A") + '</td>'
                        + '<td>' + (promotion.reportingDate || "N/A") + '</td>'
                        + '<td>' + (promotion.placeOfReporting || "N/A") + '</td>'
                       
                        + '</tr>');
                });

                resp.deptTests.forEach(test => {
                    modalTableBody2.append('<tr>'
                      
                        + '<td>' + (test.deptTestMaster.testName || "N/A") + '</td>'
                        + '<td>' + (test.passDate || "N/A") + '</td>'
                        + '</tr>');
                });
            } else {
                modalTableBody.append("<tr><td colspan='3'>No records found</td></tr>");
                modalTableBody2.append("<tr><td colspan='2'>No records found</td></tr>");
            }

            $("#employeeDetailsModal").modal("show");
        },
        error: function (resp) {
            alert("Error fetching employee details.");
        }
    });
}



$(document).ready(function () {
    // Employee Details Table - Excel Download
    $("#downloadEmployeeExcel").click(function () {
        exportTableToExcel("reporttable", "Employee_Details");
    });

    // Promotion Details Table - Excel Download
    $("#downloadPromotionExcel").click(function () {
        exportTableToExcel("promotionTable", "Promotion_Details");
    });

    // Department Test Table - Excel Download
    $("#downloadDeptTestExcel").click(function () {
        exportTableToExcel("deptTestTable", "Department_Test_Details");
    });
});

// Function to Export Table Data to Excel
function exportTableToExcel(tableId, filename) {
    var table = document.getElementById(tableId);
    var sheet = XLSX.utils.table_to_sheet(table);
    var workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, sheet, "Sheet1");

    XLSX.writeFile(workbook, filename + ".xlsx");
}




