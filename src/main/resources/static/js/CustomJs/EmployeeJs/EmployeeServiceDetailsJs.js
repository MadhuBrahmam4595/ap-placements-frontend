
 
 $(document).ready(function(){
	//alert('ready function');
	getTrades(insCode);
	getDesignations();
	
	$("#serverErr").empty();
	
	

});


function getTrades(insCode){
	//alert('getTrades->insCode->'+insCode);
	
	$.ajax({
		type: 'get',
		url: baseUrl+'masterdata/tradesInIti?iticode='+insCode,
		cache: false,
		timeout: 600000,
		success: function(resp){
			//alert('success->'+JSON.stringify(resp));
			$("#tradeName").empty();
			$("#tradeName").append('<option value="">-SELECT-</option>');
			resp.forEach(bean=>{
	$("#tradeName").append('<option value="'+bean.strCol1+'">'+bean.strCol2+'</option>');	

			});
		},
		error: function(resp){
			alert('Trades are not loaded for you ITI');
		}
	});
}





//Function to call designations
function getDesignations(){
	$.ajax({
		type: 'GET',
		url: baseUrl + 'hrm/designations/all', // Update with correct endpoint
		cache: false,
		timeout: 600000,
		success: function(resp){
			respPromo = resp;
			//alert('success->'+JSON.stringify(resp));
			//console.log('Caste Categories Loaded:', resp);
			$("#designation").empty();  // Clear existing options
			$("#designation").append('<option value="">-SELECT-</option>');
			

			// Loop through response and add options dynamically
			resp.forEach(bean => {
				$("#designation").append('<option value="'+bean.desigCode+'">'+bean.designation+'</option>');	
					
					
				
			});
		},
		error: function(resp){
			alert('Designations could not be loaded.');
		}
	});
}


// Function to remove the item row, ensuring at least one remains



$(document).ready(function() {
    $("#serverErr").empty();

    $('#labForm').submit(function(event) {
        event.preventDefault(); // Prevent default form submission

        var formData = new FormData(this);

        // Debugging - Print each key-value pair
        formData.forEach((value, key) => {
            console.log("Key:", key, "Value:", value);
        });

//      alert("jwtToken--->"+jwtToken);

        $.ajax({
            type: 'POST',
            url: baseUrl + 'hrm/saveEmployeeTransfer',  
            headers: { 'Authorization': jwtToken },
            
            data: formData,
            processData: false, 
            contentType: false,
            success: function(response) {
                $('#labForm')[0].reset();
//                $("#serverErr").append('<span style="color: green;font-weight: bolder;">' + response + '</span>');
				$("#successMessage").text(response); // Set success message
    			$("#successModal").modal("show"); // Show modal popup
            },
            error: function(response) {
                $("#serverErr").append('<span style="color: red;font-weight: bolder;">SOMETHING WENT WRONG TRY AGAIN</span>');
            }
        });
    });
   
});



//$(document).ready(function () {
//    $('#benchmarkDisability').change(function () {
//        var selectedValue = $(this).val();
//
//        if (selectedValue === 'Yes') {
//            // Enable PwBD Category and Certificate
//            $('#pbdCategory').prop('disabled', false).attr('required', true);
//            $('#pbdCertificate').prop('disabled', false).attr('required', true);
//        } else {
//            // Disable and reset PwBD Category and Certificate
//            $('#pbdCategory').val('').prop('disabled', true).removeAttr('required');
//            $('#pbdCertificate').val('').prop('disabled', true).removeAttr('required');
//        }
//    });
//});

$(document).ready(function () {
    // Reusable function to handle enable/disable logic
    function toggleCertificateField(dropdownId, fileInputId) {
        const selectedValue = $(dropdownId).val();
        if (selectedValue === 'Yes') {
            $(fileInputId).prop('disabled', false).attr('required', true);
        } else {
            $(fileInputId).val('').prop('disabled', true).removeAttr('required');
        }
    }

    // PwBD
    $('#benchmarkDisability').change(function () {
    // Enable/disable Certificate field using existing function
    toggleCertificateField('#benchmarkDisability', '#pbdCertificate');

    // Enable/disable PwBD Category
    const isPwBD = $(this).val() === 'Yes';
    $('#pbdCategory').prop('disabled', !isPwBD);
    $('#pwdPercentage').prop('disabled', !isPwBD);

    if (!isPwBD) {
        $('#pbdCategory').val('').removeAttr('required');
        $('#pwdPercentage').val('').removeAttr('required');
    } else {
        $('#pbdCategory').attr('required', true);
        $('#pwdPercentage').attr('required', true);
    }
});


    // Widow Case
    $('#widowCase').change(function () {
        toggleCertificateField('#widowCase', '#widowCertificate');
    });

    // Medical Grounds
    $('#medicalGrounds').change(function () {
        toggleCertificateField('#medicalGrounds', '#medicalCertificate');
    });

    // Challenged Children
    $('#challengedChildren').change(function () {
        toggleCertificateField('#challengedChildren', '#challengedChildrenCert');
    });

    // Office Bearer Terms (assumed Yes/No dropdown exists, else adjust accordingly)
    $('#officeBearerYears').change(function () {
        let years = parseInt($(this).val());
        if (years && years > 0) {
            $('#officeBearerCert').prop('disabled', false).attr('required', true);
        } else {
            $('#officeBearerCert').val('').prop('disabled', true).removeAttr('required');
        }
    });
    
     // ✅ Spouse Working - newly added
    $('#spouseWorkingPlace').change(function () {
        toggleCertificateField('#spouseWorkingPlace', '#spouseCertificate');
    });


});

    
    document.addEventListener("DOMContentLoaded", function () {
    const dobInput = document.querySelector('input[name="dob"]');
    const dorInput = document.querySelector('input[name="dor"]');

    dobInput.addEventListener("change", function () {
        const dob = new Date(dobInput.value);
        if (!isNaN(dob)) {
            const retirementAge = 62;
            const dor = new Date(dob.setFullYear(dob.getFullYear() + retirementAge));
            dorInput.valueAsDate = dor;
        }
    });
});







