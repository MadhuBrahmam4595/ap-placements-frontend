/**
 * 
 */
 let industries = null;
 let trades = null;
 let editIndustries = null;
 
 $(document).ready(function(){
	//alert('slno=>'+slno);
	getIndusties(slno);
	
});
function getIndustryMasters(){
	
	$.ajax({
		type: 'get',
		url: baseUrl+'masterdata/getAllIndustryMaster',
		cache: false,
		timeout: 600000,
		success: function(resp){
			//alert('industries=>'+JSON.stringify(resp));
			industries = resp;
			$("#industryName").empty();
			$("#industryName").append('<option value="">-SELECT-</option>');
			//alert(JSON.stringify(editIndustries));
			//alert(editIndustries.industryId);
			resp.forEach(bean=>{
				const option = document.createElement('option');
				option.value = bean.industryId;
				option.text = bean.industryName;
				if(editIndustries.industryId == bean.industryId){
					option.selected = true;
				}
				document.getElementById('industryName').appendChild(option);
			});
			getTrades();
		},
		error: function(resp){
			alert('Inudstries are not loaded');
		}
	});
}
function getTrades(){
	
	$.ajax({
		type: 'get',
		url: baseUrl+'masterdata/getAllTrades',
		cache: false,
		timeout: 600000,
		success: function(resp){
			//alert('trades=>'+JSON.stringify(resp));
			trades = resp;
			$("#tradeName").empty();
			$("#tradeName").append('<option value="">-SELECT-</option>');
			
			resp.forEach(bean=>{
				const option = document.createElement('option');
				option.value = bean.tradeShort;
				option.text = bean.tradeName;
				
				if(editIndustries.tradeShort == bean.tradeShort){
					option.selected = true;
				}
				$("#tradeName").append(option);
			});
		},
		error: function(resp){
			alert('Trades are not loaded');
		}
	});
}
function getIndusties(slno){
	$.ajax({
		type: 'get',
		url: baseUrl + 'implant/getIndustriesById?slno=' + slno,
		headers: { 'Authorization': jwtToken },
		cache: false,
		timeout: 600000,
		success: function(resp){
			//alert('getIndusties=>'+JSON.stringify(resp));
			editIndustries = resp;
			getIndustryMasters();
		},
		error: function(resp){
			alert('Trades are not loaded');
		}
	});
}

function updateIndustry(){
	//alert('update');
	
	var industryName  = $("#industryName").val();
	//alert('industryName->'+industryName);
	
	var tradeName  = $("#tradeName").val();
	//alert('tradeName->'+tradeName);
	
	if(industryName == '' || industryName == null){
		alert('Industry Name is required.');
		$("#industryName").val('');
		return false;
	}
	if(tradeName == '' || tradeName == null){
		alert('Trade Name is required.');
		$("#tradeName").val('');
		return false;
	}
	
	updatajax(industryName, tradeName);
	
}

function updatajax(industryName,tradeName){
	//alert('updatajax');
	var bean = {};
	bean['slno'] = editIndustries.slno;
	bean['industryId'] = industryName;
	bean['tradeShort'] = tradeName;
	//alert(JSON.stringify(bean));
	$.ajax({
		type: 'post',
		url: baseUrl + 'implant/updateIndustries',
		data: JSON.stringify(bean),
		contentType: 'application/json',
		headers: {'Authorization': jwtToken},
		cache: false,
		timeout: 600000,
		success:function(resp){
			//alert('success->'+JSON.stringify(resp));
			window.location.href = './saveIndustries';
		},
		error:function(resp){
			//alert('error->'+JSON.stringify(resp));
			$('#serverErrorMsg').append(resp);
		}
	});
	
}
 