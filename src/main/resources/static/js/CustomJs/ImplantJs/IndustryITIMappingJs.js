/**
 * 
 */


let itis = null;

$(document).ready(function(){
	//alert('ready');
	$("#servermsg").empty();
	getIndustries();
	getItis();
	getAllTrades();
	generateDistDropdown('dist');
});

function getIndustries(){
	
	$.ajax({
		type: 'get',
		url: baseUrl+'implant/getAllIndustryMaster',
		headers: { 'Authorization': 'Bearer '+jwtToken },
		cache: false,
		timeout: 600000,
		success: function(resp){
			//alert(JSON.stringify(resp));
			$("#industryName").empty();
			$("#industryName").append('<option value="">-SELECT-</option>');
			resp.forEach(bean=>{
				$("#industryName").append('<option value="'+bean.industryId+'">'+bean.industryName+'('+bean.industryId+')</option>');
			});
			 
		},
		error: function(error){
			alert(JSON.stringify(error));
			 
		}
	});
	
}

function getItis(){
	$.ajax({
		type: 'get',
		url: baseUrl+'masterdata/getAllItis',
		cache: false,
		timeout: 600000,
		success: function(resp){
			//alert(JSON.stringify(resp));
			itis = resp;
//			$("#itiName").empty();
//			$("#itiName").append('<option value="">-SELECT-</option>');
//			resp.forEach(bean=>{
//				$("#itiName").append('<option value="'+bean.itiCode+'">'+bean.itiName+'('+bean.itiCode+')</option>');
//			});
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

function getnItis(a){
	//alert('getItis=>'+a);
	$("#itiName").empty();
	$("#itiName").append('<option value="">-SELECT-</option>');
	if(a == "" || a == null){
		alert('you need to choose a district for getting itis.');
		return false;
	}else{
		const filterItis = itis.filter(iti=>{
			return (iti.distCode == a );
		});
		//alert('filterItis=>'+filterItis.length);
		filterItis.forEach(bean=>{
				$("#itiName").append('<option value="'+bean.itiCode+'">'+bean.itiName+'('+bean.itiCode+')</option>');
			});
	}
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
	//itiName
	var itiName = $("#itiName").val();
	if(itiName == "" || itiName == null){
		alert('ITI Name is required');
		$("#itiName").focus();
		return false;
	}
	//tradeName
	var tradeName = $("#tradeName").val();
	if(tradeName == "" || tradeName == null){
		alert('Trade Name is required');
		$("#tradeName").focus();
		return false;
	}
	//noOfTrades
//	var noOfTrades = $("#noOfTrades").val();
//	if(noOfTrades == "" || noOfTrades == null){
//		alert('No Of Trades is required');
//		$("#noOfTrades").focus();
//		return false;
//	}
//	if (!noOfTrades.match('^[0-9]{1,9}$')) {
//		alert("Invalid No Of Trades"); 
//        $("#noOfTrades").val('');
//        $("#noOfTrades").focus();
//        return false;
//    }
	//noOfUnits
//	var noOfUnits = $("#noOfUnits").val();
//	if(noOfUnits == "" || noOfUnits == null){
//		alert('No Of Units is required');
//		$("#noOfUnits").focus();
//		return false;
//	}
//	if (!noOfUnits.match('^[0-9]{1,9}$')) {
//		alert("Invalid No Of Units"); 
//        $("#noOfUnits").val('');
//        $("#noOfUnits").focus();
//        return false;
//    }
	
	var industriesEntity = {};
	industriesEntity["industryId"] = industryName;
	industriesEntity["itiCode"] = itiName;
	industriesEntity["tradeShort"] = tradeName;
	//industriesEntity["noOfTrades"] = noOfTrades;
	//industriesEntity["noOfUnits"] = noOfUnits;
	
	$.ajax({
		type: 'post',
		url: baseUrl+'implant/saveIndustries',
		contentType: 'application/json',
		data: JSON.stringify(industriesEntity),
		headers: {'Authorization': 'Bearer '+jwtToken},
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
		},
		error:function(error){
			//alert(error.responseText)
			$("#servermsg").append('<span style="color: red;">'+error.responseText+'</span>');
		}
	});
	
}