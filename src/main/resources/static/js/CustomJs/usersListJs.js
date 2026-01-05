/**
 * 
 */
 $(document).ready(function(){
	//alert('ready');
	$("#tablebody").empty();
	getUsersList();
});

function getUsersList(){
	
	$.ajax({
		type: 'get',
		url: baseUrl+'services/getAllUsers',
		headers: {'Authorization': jwtToken},
		cache: false,
		timeout: 600000,
		success: function(resp){
			//alert('resp->'+JSON.stringify(resp));
			$("#tablebody").empty();
			var count = 0;
			resp.forEach(bean => {
				count = count + 1;
    			let rolesFullName = bean.roles.map(role => role.fullName).join(', '); // Get fullName(s) from roles array
    			$("#tablebody").append('<tr><td>' + count + '</td><td>' + bean.username + '</td><td>' + rolesFullName + '</td><td>' + bean.user_id + '</td></tr>');
			});

		},
		error: function(error){
			alert('users data is not loaded');
		}
	});
}