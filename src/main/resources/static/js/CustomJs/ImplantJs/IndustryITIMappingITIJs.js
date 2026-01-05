/**
 * 
 */
 

let itis = null;
let industries = null;

$(document).ready(function(){
	//alert('ready'+baseUrl);
	$("#servermsg").empty();
	getIndustries();
	getAllTrades();
	getIndustriesInITI();
});

function getIndustries(){
	
	$.ajax({
		type: 'get',
		url: baseUrl+'implant/getAllIndustryMaster',
		headers: { 'Authorization':  jwtToken },
		cache: false,
		timeout: 600000,
		success: function(resp){
			//alert(JSON.stringify(resp));
			industries = resp;
			//alert('industries=>'+JSON.stringify(industries));
			$("#industryName").empty();
			$("#industryName").append('<option value="">-SELECT-</option>');
			resp.forEach(bean=>{
				$("#industryName").append('<option value="'+bean.industryId+'">'+bean.industryName+','+bean.industryAddress+' ('+bean.industryId+')</option>');
			});
			 
		},
		error: function(error){
			alert(JSON.stringify(error));
			 
		}
	});
	
}

function getAllTrades(){
	$.ajax({
		type: 'get',
		url: baseUrl+'masterdata/getAllTrades',
		cache: false,
		timeout: 600000,
		success: function(resp){
			//alert(JSON.stringify(resp));
			
			$("#tradeName").empty();
			$("#tradeName").append('<option value="">-SELECT-</option>');
			resp.forEach(bean=>{
				$("#tradeName").append('<option value="'+bean.tradeShort+'">'+bean.tradeName+'</option>');
			});
		}
	});
}

function getIndustriesInITI(){
	$.ajax({
		type: 'get',
		url: baseUrl+'implant/industriesByItiCode',
		headers: {'Authorization': jwtToken},
		cache: false,
		timeout: 600000,
		success: function(resp){
			//alert(JSON.stringify(resp[0]));
			
			resp.forEach(bean=>{
				//alert(bean.itiTradeMasterEntity);
				if(bean.itiTradeMasterEntity == 'null' || bean.itiTradeMasterEntity == null
				|| bean.itiTradeMasterEntity == ''){
					$("#industrydata").append('<tr><td>'+bean.industryId+'</td><td>'+bean.industryName+'</td><td>'+bean.industryType+'</td><td></td>'
				+'<td><div class="d-fles"><button class="btn btn-sm btn-info m-1" onclick="return editData(\''+bean.slno+'\');">EDIT</button>'
				+'<input type="button" value="Delete" class="btn btn-sm btn-danger m-1" onclick="return deleteData(\''+bean.slno+'\');" /></div></td></tr>');
				}else{
					$("#industrydata").append('<tr><td>'+bean.industryId+'</td><td>'+bean.industryName+'</td><td>'+bean.industryType+'</td><td>'+bean.itiTradeMasterEntity.tradeName+'</td>'
				+'<td><div class="d-fles"><button class="btn btn-sm btn-info m-1" onclick="return editData(\''+bean.slno+'\');">EDIT</button>'
				+'<input type="button" value="Delete" class="btn btn-sm btn-danger m-1" onclick="return deleteData(\''+bean.slno+'\');" /></div></td></tr>');
				}
			});
		}
	});
}

function editData(slno){
	//alert('edit->'+slno);
	
	let base64String = encodeBase64(slno);
	//alert('base64String=>'+base64String);
	document.forms[0].action=`./editIndustries?slno=${base64String}`;
	document.forms[0].submit();
}


function savedData(){
	//alert('save data');
	$("#servermsg").empty();
	//industryName
	var industryName = $("#industryName").val();
	if(industryName == "" || industryName == null){
		alert('Industry Name is required');
		$("#industryName").focus();
		return false;
	}
	 
	//tradeName
	var tradeName = $("#tradeName").val();
	if(tradeName == "" || tradeName == null){
		alert('Trade Name is required');
		$("#tradeName").focus();
		return false;
	}
	
	var industriesEntity = {};
	industriesEntity["industryId"] = industryName;
	industriesEntity["itiCode"] = insCode;
	industriesEntity["tradeShort"] = tradeName;
	//industriesEntity["noOfTrades"] = noOfTrades;
	//industriesEntity["noOfUnits"] = noOfUnits;
	
	$.ajax({
		type: 'post',
		url: baseUrl+'implant/saveIndustries',
		contentType: 'application/json',
		data: JSON.stringify(industriesEntity),
		headers: {'Authorization':  jwtToken},
		cache:false,
		timeout: 600000,
		success:function(resp){
			//alert(resp);
			$("#industryName").val('');
			$("#itiName").val('');
			$("#tradeName").val('');
			$("#noOfTrades").val('');
			$("#noOfUnits").val('');
			
			$("#servermsg").empty();
			$("#servermsg").append('<span style="color: green;">'+resp+'</span>');
			$("#industrydata").empty();
			getIndustriesInITI();
		},
		error:function(error){
			//alert(error.responseText)
			$("#servermsg").append('<span style="color: red;">'+error.responseText+'</span>');
		}
	});
	
}

function deleteData(slno){
	//alert('delete->slno->'+slno);
	
	if(confirm('Are you sure you want to delete this record?')){
		//alert('yes');
		
		 $.ajax({
            url: baseUrl + 'implant/deleteIndustries', // Replace baseUrl with your actual API base URL
            type: 'DELETE',
            data: { slno: slno }, // Pass the slno as a parameter
            headers: {
                'Authorization': jwtToken // Add authorization token if required
            },
            success: function(response) {
				//alert(JSON.stringify(response));
                alert(response);
                // Perform actions after successful deletion, like reloading the page or updating the UI
                location.reload(); // Reload the page or update UI as needed
            },
            error: function(response) {
                alert("Error: " + response.responseText);
            }
        });
		
	}else{
		//alert('no');
	}
}