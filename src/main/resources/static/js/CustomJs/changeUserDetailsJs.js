/**
 * 
 */
 let userolddata = null;
 $(document).ready(function(){
 	//alert('ready');
 	getUserDetails();
 });
 
 function getUserDetails(){
	$.ajax({
		type: 'get',
		url: baseUrl+'services/getUserInfo',
		headers: {'Authorization': jwtToken },
		cache: false,
		timeout: 600000,
		success: function(resp){
			//alert('resp->'+JSON.stringify(resp));
			//console.log(JSON.stringify(resp));
			populateForm(resp);
			userolddata = resp;
		},
		error: function(resp){
			alert('Something went wrong while getting userInfo');
		}
	});
}

// Function to populate the form with the JSON data
function populateForm(userData) {
//    $('#user_id').val(userData.user_id);
    $('#username').val(userData.username);
    $('#password').val(userData.password);
//    $('#insCode').val(userData.insCode);
    //$('#role').val(userData.roles[0].fullName); // Assuming one role in the roles array
}

// Call the function to populate the form when the page loads
$(document).ready(function () {
   // getUserDetails();

/**
    // Handle form submission
    $('#userUpdateForm').on('submit', function (e) {
        e.preventDefault();
		//console.log(userolddata.username);
        // Get the updated form data
        var formData = {
                username: userolddata.username,
                password: $("#password").val(),
            };

        // Send the updated data via AJAX
        $.ajax({
            type: 'POST',
            url: baseUrl+'services/editUserDetails',   
            headers: { 'Authorization': jwtToken },
            contentType: 'application/json',
            data: JSON.stringify(formData),
            success: function (response) {
                alert('User data updated successfully!');
            },
            error: function (err) {
				alert('error');
                console.error('Error updating user data:', err);
            }
        });
    });
    
     */
});
