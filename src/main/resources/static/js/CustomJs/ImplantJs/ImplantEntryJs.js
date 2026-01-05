/**
 * 
 */

let distsStatewise = null;
let industriesByItiCode = null;
let getAllTrades = null;

function getReady(){
	getDistsDropDown();
	getTrades();
	getIndustries();
}
function getIndustries(){

	$.ajax({
		type: 'get',
		url: baseUrl+'implant/industriesByItiCode?itiCode='+insCode,
		headers: {
			'Authorization': 'Bearer '+jwtToken
		},
		cache: false,
		timeout: 600000,
		success:function(resp){
			//alert("resp=>"+JSON.stringify(resp));
			industriesByItiCode = resp;
			$("#industryName").empty();
			$("#industryName").append('<option value="">-SELECT-</option>');
			for(var i=0; i < resp.length; i++){
				var bean = resp[i];
				
				var tradedatalist = getAllTrades.filter(obj=> obj.tradeShort == bean.tradeShort);
				var tradename = '';
				tradedatalist.forEach(trade=> {
					tradename = trade.tradeName;
				});
				
				$("#industryName").append('<option value="'+bean.slno+'">'+bean.industryName+'('+tradename+')</option>');
			}
		},
		error:function(error){
			//alert("error=>"+JSON.stringify(error));
			alert("Industries are not loaded or don't have industries");
		}
	});
}
function getTrades(){
	$.ajax({
		type: 'get',
		url: baseUrl+'masterdata/getAllTrades',
		cache: false,
		timeout: 600000,
		success:function(resp){
			//alert("resp=>"+JSON.stringify(resp));
			getAllTrades = resp;
//			$("#implantTrade").empty();
//			$("#implantTrade").append('<option value="">-SELECT-</option>');
//			for(var i=0; i < resp.length; i++){
//				var bean = resp[i];
//				$("#implantTrade").append('<option value="'+bean.tradeShort+'">'+bean.tradeName+'</option>');
//			}
		},
		error:function(error){
			//alert("error=>"+JSON.stringify(error));
			alert("Trades are not Loaded");
		}
	});
}
function getDistsDropDown(){
	
 	$.ajax({
		type: 'get',
		url: baseUrl+'masterdata/getDistsStatewise',
		cache: false,
		timeout: 600000,
		success:function(resp){
			//alert('resp=>'+JSON.stringify(resp));
			distsStatewise = resp;
			getstatesdropdown();
			
		},
		error:function(error){
			alert('Something went wrong while getting dists state wise');
		}
	});
}

function getstatesdropdown() {
	//alert('getstatesdropdown');
	const uniqueStates = new Map();
	distsStatewise.forEach(bean => {
		if (!uniqueStates.has(bean.statecode)) {
			uniqueStates.set(bean.statecode, bean.statename);
		}
	});
	//alert('uniqueState=>' + uniqueStates.size);
	 
	
	$("#implantState").empty();
	$("#implantState").append('<option value="">-SELECT-</option>');
	uniqueStates.forEach((statename, statecode)=>{
		const option = document.createElement('option');
		option.value = statecode;
		option.textContent = statename;
		document.getElementById('implantState').appendChild(option);
	});
}

function getAllDists(statecode){
	//alert('getAllDists=>'+statecode);
	const filterDists = distsStatewise.filter(bean=>{
		return (statecode == "" || bean.statecode == statecode);
	});
	$("#implantDist").empty();
	$("#implantDist").append('<option value="">-SELECT-</option>');
	//alert('filter dists'+filterDists.length);
	filterDists.forEach(bean=>{
		const option = document.createElement('option');
		option.value = bean.distcode;
		option.textContent = bean.distname;
		document.getElementById('implantDist').appendChild(option);
	});
}
function saveImplant(){
	//alert('saveImplant');
	var facultyName = $("#facultyName").val();
	if(facultyName == "" || facultyName == null){
		alert("Faculty Name is required."); 
		$("#facultyName").val('');
		$("#facultyName").focus();
		return false;
	}
	var location = $("#location").val();
	if(location == "" || location == null){
		alert("Location is required.");
		$("#location").val('');
		$("#location").focus();
		return false;
	}
//	var implantTrade = $("#implantTrade").val();
//	if(implantTrade == "" || implantTrade == null){
//		alert("Trade is required."); 
//		$("#implantTrade").val('');
//		$("#implantTrade").focus();
//		return false;
//	}
	var industryName = $("#industryName").val();
	if(industryName == "" || industryName == null){
		alert("Industry Name / Firm Name is required."); 
		$("#industryName").val('');
		$("#industryName").focus();
		return false;
	}
	var industryAddress = $("#industryAddress").val();
	if(industryAddress == "" || industryAddress == null){
		alert("Industry Address is required."); 
		$("#industryAddress").val('');
		$("#industryAddress").focus();
		return false;
	}
	var hrNo = $("#hrNo").val();
	if(hrNo == "" || hrNo == null){
		alert("HR Contact Number is required."); 
		$("#hrNo").val('');
		$("#hrNo").focus();
		return false;
	}
	if (!hrNo.match('^[6789]{1}[0-9]{9}$')) {
		alert("Invalid HR Contact Number."); 
        $("#hrNo").val('');
        $("#hrNo").focus();
        return false;
    }
	var fromDate = $("#fromDate").val();
	if(fromDate == "" || fromDate == null){
		alert("From Date is required."); 
		$("#fromDate").val('');
		$("#fromDate").focus();
		return false;
	}
	var toDate = $("#toDate").val();
	if(toDate == "" || toDate == null){
		alert("To Date is required."); 
		$("#toDate").val('');
		$("#toDate").focus();
		return false;
	}
	
	var fromDateObj = new Date(fromDate);
    var toDateObj = new Date(toDate);

    // Compare the dates
    if (fromDateObj > toDateObj) {
        alert("From Date should not be after To Date.");
        return false;
    } 
    
    // Check if the dates are equal
	if (fromDateObj.getTime() === toDateObj.getTime()) {
		alert("From Date and To Date should not be the same.");
		return false;
	}
    
 	// Calculate the difference in time
    var timeDifference = toDateObj - fromDateObj;

    // Calculate the number of days (convert from milliseconds)
    var noOfDays = timeDifference / (1000 * 3600 * 24);
    //alert("noOfDays => "+noOfDays);

	
	var noOfStudents = $("#noOfStudents").val();
	if(noOfStudents == "" || noOfStudents == null){
		alert("Number of Student U.T is required."); 
		$("#noOfStudents").val('');
		$("#noOfStudents").focus();
		return false;
	}
	if (!noOfStudents.match('^[0-9]{1,9}$')) {
		alert("Invalid Number of Student U.T."); 
        $("#noOfStudents").val('');
        $("#noOfStudents").focus();
        return false;
    }
	var implantState = $("#implantState").val();
	if(implantState == "" || implantState == null){
		alert("State is required."); 
		$("#implantState").val('');
		$("#implantState").focus();
		return false;
	}
	var implantDist = $("#implantDist").val();
	if(implantDist == "" || implantDist == null){
		alert("District is required."); 
		$("#implantDist").val('');
		$("#implantDist").focus();
		return false;
	}
	var description = $("#description").val();
	
	jwtToken = 'Bearer '+jwtToken;

	var implantEntity = {};
	implantEntity["facultyName"] = facultyName;
	implantEntity["location"] = location;
//	implantEntity["tradeShort"] = implantTrade;
	implantEntity["slno"] = industryName;
	implantEntity["industryAddress"] = industryAddress;
	implantEntity["hrNo"] = hrNo;
	implantEntity["fromDate"] = fromDate;
	implantEntity["toDate"] = toDate;
	implantEntity["noOfStudents"] = noOfStudents;
	implantEntity["distcode"] = implantDist;
	implantEntity["description"] = description;
	implantEntity["noOfDays"] = noOfDays;
	implantEntity["noOfDays"] = noOfDays;
	implantEntity["itiCode"] = insCode;
	//alert(JSON.stringify(implantEntity));
	//console.log(JSON.stringify(implantEntity));
	$.ajax({
		type: 'post',
		url: baseUrl+'implant/saveImplant',
		contentType: "application/json",
		data:  JSON.stringify(implantEntity),
		headers: {'Authorization': jwtToken},
		cache: false,
		timeout: 600000,
		success:function(resp){
			//alert("resp=>"+JSON.stringify(resp));
			$("#facultyName").val('');
			$("#location").val('');
//			$("#implantTrade").val('');
			$("#industryName").val('');
			$("#industryAddress").val('');
			$("#hrNo").val('');
			$("#fromDate").val('');
			$("#toDate").val('');
			$("#noOfStudents").val('');
			$("#implantDist").val('');
			$("#description").val('');
			
			$("#servermsg").empty();
			$("#servermsg").append('<span style="color: green;">Implant Trainig Program details are saved successfully with ID:'+resp.implantId+'</span>');
			
		},
		error:function(error){
			//alert("error=>"+JSON.stringify(error));
			$("#servermsg").empty();
			$("#servermsg").append('<span style="color: red;">Something went wrong while saving Implant Trainig Program  details.</span>');
		}
	});
}