/**
 * 
 */

$(document).ready(function(){
	//alert('ready');
	$("#servermsg").empty();
});

function saveIndustry(){
	//alert('save industry');
	$("#servermsg").empty();
	
	//industryname
	var industryname = $("#industryname").val();
	if(industryname == null || industryname == ""){
		alert("Industry Name is required"); 
		$("#industryname").focus();
		return false;
	}
	//industrytype
	var industrytype = $("#industrytype").val();
	if(industrytype == null || industrytype == ""){
		alert("Industry Type is required"); 
		$("#industrytype").focus();
		return false;
	}
	//industryaddress
	var industryaddress = $("#industryaddress").val();
	if(industryaddress == null || industryaddress == ""){
		alert("Industry Address is required"); 
		$("#industryaddress").focus();
		return false;
	}
	
	var industryModel = {};
	industryModel["industryName"] = industryname;
	industryModel["industryType"] = industrytype;
	industryModel["industryAddress"] = industryaddress;
	
	$.ajax({
		type: 'post',
		url: baseUrl+'implant/industryMasterEntry',
		contentType: 'application/json',
		data: JSON.stringify(industryModel),
		headers: { 'Authorization': 'Bearer '+jwtToken },
		cache: false,
		timeout: 600000,
		success: function(resp){
			$("#servermsg").empty();
			//alert(resp);
			$("#industryname").val('');
			$("#industrytype").val('');
			$("#industryaddress").val('');
			$("#servermsg").append('<span style="color: green;">'+resp+'</span>');
		},
		error: function(error){
			$("#servermsg").empty();
			//alert(JSON.stringify(error));
			$("#servermsg").append('<span style="color: red;">'+error.responseText+'</span>');
		}
	});
}