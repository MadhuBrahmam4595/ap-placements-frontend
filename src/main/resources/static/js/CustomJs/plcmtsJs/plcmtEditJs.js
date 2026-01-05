/**
 * 
 */
 $(document).ready(function(){
		//alert(pid);
		//alert(jwtToken);
		//alert(baseUrl);
		getDataForEdit(pid);
	});
	
	function getDataForEdit(pid){
		alert('getDataForEdit->pid->'+pid);
		
		$.ajax({
			type: 'get',
			url: baseUrl+'api/plcmt/getPlcmtsById?pid='+pid,
			headers: { 'Authorization': jwtToken },
			cache: false,
			timeout: 600000,
			success: function(resp){
				alert('getPlcmtsById->success->'+resp);
				
				var ptype = resp.ptype;
				alert('ptype->'+ptype);
				
				
			},
			error: function(resp){
				alert('getPlcmtsById->error->'+resp.responseText);
			}
		});
		
	}