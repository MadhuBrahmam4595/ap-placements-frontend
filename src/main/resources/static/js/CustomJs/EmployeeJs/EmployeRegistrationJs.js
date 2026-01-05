 // Global variables to store dropdown data
let respTest="";
let respPromo="";
 
 $(document).ready(function(){
	//alert('ready function');
	getTrades(insCode);
	getCasteCategories();
	getQualifications();
	getTechQualifications();
	getDesignations();
	getTests();
	getSubCastes();
	$("#serverErr").empty();
	
	
// Event listener for caste selection change
    $("#reservationCategory").change(function(){
        let selectedCasteId = $(this).val(); // Get selected caste ID
        if (selectedCasteId) {
            getSubCastes(selectedCasteId); // Call getSubCastes function with casteId
        } else {
            $("#sub_caste").empty().append('<option value="">-SELECT-</option>'); // Reset sub-caste dropdown
        }
    });
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

function getCasteCategories(){
	$.ajax({
		type: 'GET',
		url: baseUrl + 'hrm/castes/allCastes', // Update with correct endpoint
		cache: false,
		timeout: 600000,
		success: function(resp){
			//alert('success->'+JSON.stringify(resp));
			//console.log('Caste Categories Loaded:', resp);
			$("#reservationCategory").empty();  // Clear existing options
			$("#reservationCategory").append('<option value="">-SELECT-</option>');

			// Loop through response and add options dynamically
			resp.forEach(bean => {
				$("#reservationCategory").append('<option value="'+bean.casteId+'">'+bean.casteCategory+'</option>');	
			});
		},
		error: function(resp){
			alert('Caste categories could not be loaded.');
		}
	});
}

//Function to call qualifications 
function getQualifications(){
	$.ajax({
		type: 'GET',
		url: baseUrl + 'hrm/qualifications/allQual', // Update with correct endpoint
		cache: false,
		timeout: 600000,
		success: function(resp){
			//alert('success->'+JSON.stringify(resp));
			//console.log('Caste Categories Loaded:', resp);
			$("#academicQualification").empty();  // Clear existing options
			$("#academicQualification").append('<option value="">-SELECT-</option>');

			// Loop through response and add options dynamically
			resp.forEach(bean => {
				$("#academicQualification").append('<option value="'+bean.qualCode+'">'+bean.qualification+'</option>');	
			});
		},
		error: function(resp){
			alert('Qualifications  could not be loaded.');
		}
	});
}

//Function to call Technical Qualification
function getTechQualifications(){
	$.ajax({
		type: 'GET',
		url: baseUrl + 'hrm/qualifications/allQual', // Update with correct endpoint
		cache: false,
		timeout: 600000,
		success: function(resp){
			//alert('success->'+JSON.stringify(resp));
			//console.log('Caste Categories Loaded:', resp);
			$("#technicalQualification").empty();  // Clear existing options
			$("#technicalQualification").append('<option value="">-SELECT-</option>');

			// Loop through response and add options dynamically
			resp.forEach(bean => {
				$("#technicalQualification").append('<option value="'+bean.qualCode+'">'+bean.qualification+'</option>');	
			});
		},
		error: function(resp){
			alert('Technical Qualifications  could not be loaded.');
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
			$("#promotion_post").empty();  // Clear existing options
			$("#promotion_post").empty();  // Clear existing options
			$("#designation").append('<option value="">-SELECT-</option>');
			$("#promotion_post").append('<option value="">-SELECT-</option>');
			$("#initialAppointmentPost").append('<option value="">-SELECT-</option>');

			// Loop through response and add options dynamically
			resp.forEach(bean => {
				$("#designation").append('<option value="'+bean.desigCode+'">'+bean.designation+'</option>');	
				$("#promotion_post").append('<option value="'+bean.desigCode+'">'+bean.designation+'</option>');	
				$("#initialAppointmentPost").append('<option value="'+bean.desigCode+'">'+bean.designation+'</option>');	
				
			});
		},
		error: function(resp){
			alert('Designations could not be loaded.');
		}
	});
}

function getTests(){
	$.ajax({
		type: 'GET',
		url: baseUrl + 'hrm/tests/all', // Update with correct endpoint
		cache: false,
		timeout: 600000,
		success: function(resp){
			respTest=resp;
			//alert('success->'+JSON.stringify(resp));
			//console.log('Caste Categories Loaded:', resp);
			$("#accounts_test").empty();  // Clear existing options
			$("#accounts_test").append('<option value="">-SELECT-</option>');

			// Loop through response and add options dynamically
			resp.forEach(bean => {
				$("#accounts_test").append('<option value="'+bean.testId+'">'+bean.testName+'</option>');	
			});
		},
		error: function(resp){
			alert('Depatrment Tests could not be loaded.');
		}
	});
}


function getSubCastes(){
    let selectedCasteId = $('#reservationCategory').val(); // Get selected caste ID
    
    if (!selectedCasteId) { 
        console.log("No caste selected. Skipping AJAX call."); 
        return; // Exit function if casteId is empty
    }

    $.ajax({
        type: 'GET',
        url: baseUrl + 'hrm/subcastes/caste?casteId=' + selectedCasteId, 
        cache: false,
        timeout: 600000,
        success: function(resp){
            $("#subCaste").empty().append('<option value="">-SELECT-</option>');

            resp.forEach(bean => {
                $("#subCaste").append('<option value="'+bean.subCasteId+'">'+bean.subCaste+'</option>');    
            });
        },
        error: function(resp){
            alert('Sub Castes could not be loaded.');
        }
    });
}





// Function to add more items
function addMoreItems() {
    var itemContainer = document.getElementById("itemContainer");

    // Create a div element to hold new item inputs
    var newItemDiv = document.createElement("div");
    newItemDiv.classList.add("row", "mt-3", "promotion-item" );

    newItemDiv.innerHTML = `
    <div class="row m-1">
        <div class="col-md-3">
            <select name="promotionPost[]" class="form-control promotion-dropdown" id="promotion_post">
					<option value="">-SELECT-</option>
			</select>
        </div>
        <div class="col-md-2">
            <input type="file" name="certificatePath[]" class="form-control" accept=".pdf" required>
        </div>
        <div class="col-md-2">
            <input type="date" name="reportingDate[]" class="form-control" required>
        </div>
        <div class="col-md-3">
            <input type="text" name="placeOfReporting[]" class="form-control" required>
        </div>
        <div class="col-md-1">
            <button type="button" class="btn btn-danger btn-sm" onclick="removeItem(this, 'itemContainer', 'promotion-item')">Remove</button>
        </div>
        </div>
    `;

    itemContainer.appendChild(newItemDiv);
    populateDropdown($(newItemDiv).find(".promotion-dropdown"), respPromo);
}

function addTestItems() {
    var testContainer = document.getElementById("testContainer");

    var newItemDiv = document.createElement("div");
    newItemDiv.classList.add("row", "mt-3", "test-item");

    newItemDiv.innerHTML = `
    <div class="row m-1">
        <div class="col-md-5">
            <select class="form-select test-dropdown " id="accounts_test" name="testName[]">
					<option value="">-SELECT-</option>
				</select>
        </div>
        <div class="col-md-5">
            <input type="date" name="passDate[]" class="form-control" required>
        </div>
        <div class="col-md-1">
            <button type="button" class="btn btn-danger btn-sm" onclick="removeItem(this, 'testContainer', 'test-item')">Remove</button>
        </div>
        </div>
    `;

    testContainer.appendChild(newItemDiv);
        populateDropdown($(newItemDiv).find(".test-dropdown"), respTest);

}

function populateDropdown(selector, data) {
	//alert("data--->"+data);
    $(selector).empty().append('<option value="">-SELECT-</option>');
    data.forEach(bean => {
        $(selector).append('<option value="' + (bean.desigCode || bean.testId) + '">' + (bean.designation || bean.testName) + '</option>');
    });
}


// Function to remove the item row, ensuring at least one remains

function removeItem(button, addTestItems, testContainer) {
    var container = document.getElementById(addTestItems);
    var items = container.getElementsByClassName(testContainer);

    if (items.length > 0) {
        button.parentElement.parentElement.remove();
    } else {
        alert("At least one item must be present.");
    }
}

$(document).ready(function() {
    $("#serverErr").empty();

    $('#labForm').submit(function(event) {
        event.preventDefault(); // Prevent default form submission

        var formData = new FormData(this);

        // Debugging - Print each key-value pair
        formData.forEach((value, key) => {
            console.log("Key:", key, "Value:", value);
        });

        // Convert FormData to JSON
        var formDataObj = Object.fromEntries(formData.entries());
        //alert("Form Data: " + JSON.stringify(formDataObj));
        //alert("jwtToken--->"+jwtToken);

        $.ajax({
            type: 'POST',
            url: baseUrl + 'hrm/saveEmployee',  
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




