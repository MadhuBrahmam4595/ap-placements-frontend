/**
 * 
 */


let allData = null;
let plcmtDetailsByAdmnum = null;

$(document).ready(function() {

	$("#placementdiv").hide();
	$("#plcmt_detailstab").hide();
	$("#plcmt_detailstabheading").hide();

	$("#admdetailsheading").hide();
	$("#admissiondetails").hide();
	getMastersDataData();
	plcmtYearDropdown();
	generateCaptcha('mainCaptcha');
});

function plcmtYearDropdown() {
	var currentYear = new Date().getFullYear();
	$("#plcmtYear").append('<option value="">-SELECT-</option>');
	for (var year = 2000; year <= currentYear; year++) {
		$("#plcmtYear").append('<option value="' + year + '">' + year + '</option>');
	}
}

//For Admission Number popup
function findByNames() {
	//alert("findByNames");

	var modal1 = document.getElementById("myModal1");
	var span = document.getElementsByClassName("close1")[0];
	modal1.style.display = "block";
	span.onclick = function() {
		modal1.style.display = "none";
	};
	$('#admnumtable').hide();
}

function findByName() {

	//alert("findByName");
	var findName = $('#findName').val();

	if (findName === "" || findName === null) {
		alert("Please Enter Name");
		$('#findName').focus();
		return false;
	}

	if (!findName.match('^[a-zA-Z ]{3,50}$')) {
		alert("Name should contain Alphabets Only with More than Three character");
		$('#findName').val('');
		$('#findName').focus();
		return false;
	}

	$.ajax({
		type: "POST",
		contentType: "application/json",
		url: baseUrl + "api/plcmt/getCandAdmInfoByLikeName?name=" + findName,
		headers: {'Authorization': jwtToken },
		cache: false,
		timeout: 600000,
		success: function(data) {
			// alert("success"+JSON.stringify(data.length));
			// alert(JSON.stringify(data));
			$('#admnumtablebody').empty();
			$('#admnumtable').show();
			for (i = 0, len = data.length; i < len; ++i) {
				var record = data[i];
				$('#admnumtablebody').append('<tr>'
					+ '<td>' + record.name + '</td>'
					+ '<td>' + record.fname + '</td>'
					+ '<td><a href="javascript:addAdmnum(\'' + record.admNum + '\')">' + record.admNum + '</a></td>'
					+ '</tr>');
			}
		},
		error: function(data) {
			alert("Finding Names are not Loaded");
			alert("No Data Found with Given Name");
			$('#findName').val('');
			$('#findName').focus();
			return false;
		}
	});
}

function findAdmnum() {

	//CheckValidCaptcha();

	//alert("onclick");
	//stop submit the form, we will post it manually.
	event.preventDefault();
	$("#plcmt_detailsbody").empty();

	$("#passmonth").val('');
	$("#passyear").val('');
	$("#type").val('');

	var adm_numm = $("#adm_num").val();
	//alert("adm_numm "+adm_numm);
	if (adm_numm === null || adm_numm === "") {
		$('#alertError').html("Admission Number is Requires, Please fill that.");
		openModelAlert();
		$("#adm_num").val('');
		return false;
	}
	if (!adm_numm.match('^[0-9]{4}[A-Z]{2}[0-9]{5,10}$')) {
		$('#alertError').html("Given Admission Number is Invalid, Enter a valid Admission Number");
		openModelAlert();
		$("#adm_num").val('');
		return false;
	}
	                
//	                var txtInput = $("#txtInput").val();
//	                var mainCaptcha = $("#mainCaptcha").val();
//	                //alert("txtInput"+txtInput);
//	                if (txtInput === null || txtInput === "") {
//	                    $('#alertError').html("Captcha is Required Please Fill that.");
//	                    openModelAlert();
//	                    return false;
//	                }
//	                if(txtInput !== mainCaptcha){
//	                    $('#alertError').html("Entered Captcha is NOT MATCHED.");
//	                    openModelAlert();
//	                    $("#txtInput").val('');
//	                    return false;
//	                }
	                
	                
	fire_ajax_submit();
}

function fire_ajax_submit() {

	var admNum = $("#adm_num").val();

	$.ajax({
		type: "POST",
		contentType: "application/json",
		url: baseUrl + "api/plcmt/getByAdmNum?admNum=" + admNum,
		headers: {'Authorization': jwtToken},
		cache: false,
		timeout: 600000,
		success: function(data) {
			//alert("data=> "+JSON.stringify(data.result));
			
			$("#formdiv").hide();

			$("#txtInput").val('');
			generateCaptcha('mainCaptcha');

			$("#admdetailsheading").show();
			$("#namerow").show();
			$("#distrow").show();
			$("#traderow").show();
			//$("#admissiondetailsdiv").show();
			$("#admissiondetails").show();

			allData = data;

			$('#name').html(data.result.name).css("color", "blue");

			$('#iti_namespan').html(data.result.iti_name).css("color", "blue");
			$('#iti_name').val(data.result.iti_name);
			$('#iti_code').val(data.result.iti_code);

			$('#dist_namespan').html(data.result.dist_name).css("color", "blue");
			$('#dist_name').val(data.result.dist_name);
			$('#dist_code').val(data.result.dist_code);

			$('#year_of_admission').html(data.result.year_of_admission).css("color", "blue");

			$('#trade_codespan').html(data.result.trade_name).css("color", "blue");
			$('#trade_code').val(data.result.trade_code);
			$('#trade_name').val(data.result.trade_name);

			$('#name').val(data.result.name);
			$('#dist_name').val(data.result.dist_name);
			$('#iti_name').val(data.result.iti_name);
			$('#year_of_admission').val(data.result.year_of_admission);
			$('#trade_code').val(data.result.trade_code);
			$('#trade_name').val(data.result.trade_name);

			$("#plcmt_detailsbody").empty();
			getPlacementDetails();
			$("#plcmt_detailstab").show();
			$("#plcmt_detailstabheading").show();

			$("#placementdiv").hide();
		},
		error: function(data) {
			alert("Admission Number Not Found");

			var modal1 = document.getElementById("admnotfound");
			var span = document.getElementsByClassName("notfoundclose")[0];
			modal1.style.display = "block";
			span.onclick = function() {
				modal1.style.display = "none";
			};

			//$("#admissiondetailsdiv").hide();
			$("#admissiondetails").hide();
			$("#placementdiv").hide();
			$("#plcmt_detailstab").hide();
			$("#plcmt_detailstabheading").hide();

			$("#admdetailsheading").hide();
			$("#namerow").hide();
			$("#distrow").hide();
			$("#traderow").hide();

			document.getElementById("adm_num").value = "";
			document.getElementById("adm_num").focus();
			return false;
		}
	});
}

function getStatesDropdown(allData) {
	$('#pstate').empty();
	$('#pstate').append("<option value=''>-select-</option>");
	for (var i = 0, len = allData.states.length; i < len; ++i) {
		var user = allData.states[i];
		$('#pstate').append("<option value=\"" + user.statecode + "\">" + user.statename + "</option>");
	}
}

function getDistrictsDropdown() {
	var pstate = $('#pstate').val();
	//alert("asdf "+pstate);

	$('#pdistrict').empty();
	$('#pdistrict').append("<option value=''>-select-</option>");
	for (var i = 0, len = allData.dists.length; i < len; ++i) {
		var user = allData.dists[i];
		if (pstate === user.statecode) {
			$('#pdistrict').append("<option value=\"" + user.distcode + "\">" + user.distname + "</option>");
		}
	}

}
////placements districts, states and Trades
function getMastersDataData() {
	$.ajax({
		type: "get",
		contentType: "application/json",
		url: baseUrl + "masterdata/getMastersData",
		cache: false,
		timeout: 600000,
		success: function(data) {
			//alert("MasterData=>"+JSON.stringify(data));
			getMastersData = data;
		},
		error: function(data) {
			alert("Admission Number Not Found");

		}
	});
}
function divs() {
	//alert("divs");

	var type = document.getElementById("type").value;

	var passmonth = $("#passmonth").val();
	var passyear = $("#passyear").val();

	var ins_code = insCode;

	if (passmonth === "" || passmonth === null) {
		$('#alertError').html("MONTH OF PASS is Requires, Please choose that.");
		openModelAlert();
		document.getElementById("type").value = "";
		return false;
	}
	if (passyear === "" || passyear === null) {
		$('#alertError').html("YEAR OF PASS is Requires, Please choose that.");
		openModelAlert();
		document.getElementById("type").value = "";
		return false;
	}

	allinputsvaluesnull();

	if (type === "") {

		$("#nameofcompanydivlabel").hide();
		$("#nameofcompanydiv").hide();
		$("#pdistrictlabel").hide();
		$("#pdistrictdiv").hide();
		$("#paddresslabel").hide();
		$("#paddressdiv").hide();
		$("#postdivlabel").hide();
		$("#postdiv").hide();
		$("#psalarylabel").hide();
		$("#psalarydiv").hide();
		$("#phrnolabel").hide();
		$("#phrnodiv").hide();
		$("#pstatelabel").hide();
		$("#pstatediv").hide();

		$("#pstipendamtlabel").hide();
		$("#pstipendamtdiv").hide();
		$("#paaprstartdatelabel").hide();
		$("#paaprstartdatediv").hide();
		$("#paaprenddatelabel").hide();
		$("#paaprenddatediv").hide();
		$("#pcoursenamelabel").hide();
		$("#pcoursenamediv").hide();
		$("#pclgnamelabel").hide();
		$("#pclgnamediv").hide();
		$("#pselfemplabel").hide();
		$("#pselfempdiv").hide();
		$("#pmonthincomelabel").hide();
		$("#pmonthincomediv").hide();

		$("#ptradelabel").hide();

		$("#scheduleIdlable").hide();
		$("#scheduleIddiv").hide();


	}

	if (type === 'Job') {

		// alert("Jobbbbbbbbbb");

		$.ajax({
			type: "POST",
			contentType: "application/json",
			url: baseUrl + "api/plcmt/getAllByPlcmtType?scheduleType=" + type + "&ins_code=" + insCode,
			headers: {'Authorization': jwtToken},
			cache: false,
			timeout: 600000,
			success: function(data) {
				//alert("data=> "+JSON.stringify(data));
				if (data.length === 0 || data.length < 0) {
					$('#scheduleId').empty();
					alert("Your DCP NEED TO ADD SCHEDULE FOR JOB OR APPRENTISHIP MELA for Entering Placements Data");
				} else {

					$('#scheduleId').empty();
					$('#scheduleId').append("<option value=''>-select-</option>");
					for (var i = 0, len = data.length; i < len; ++i) {
						var user = data[i];

						var description = user.scheduleType + '-' + user.scheduleDate + '-' + user.scheduleLocation + '-' + user.scheduleDesc;
						$('#scheduleId').append("<option value=\"" + user.plcmtId + "\">" + description + "</option>");
					}

					$("#nameofcompanydivlabel").show();
					$("#nameofcompanydiv").show();
					$("#pdistrictlabel").show();
					$("#pdistrictdiv").show();
					$("#paddresslabel").show();
					$("#paddressdiv").show();
					$("#postdivlabel").show();
					$("#postdiv").show();
					$("#psalarylabel").show();
					$("#psalarydiv").show();
					$("#phrnolabel").show();
					$("#phrnodiv").show();
					$("#pstatelabel").show();
					$("#pstatediv").show();
					$("#scheduleIdlable").show();
					$("#scheduleIddiv").show();

					$("#ptradelabel").hide();
					$("#ptradediv").hide();
					$("#pstipendamtlabel").hide();
					$("#pstipendamtdiv").hide();
					$("#paaprstartdatelabel").hide();
					$("#paaprstartdatediv").hide();
					$("#paaprenddatelabel").hide();
					$("#paaprenddatediv").hide();
					$("#pcoursenamelabel").hide();
					$("#pcoursenamediv").hide();
					$("#pclgnamelabel").hide();
					$("#pclgnamediv").hide();
					$("#pselfemplabel").hide();
					$("#pselfempdiv").hide();
					$("#pmonthincomelabel").hide();
					$("#pmonthincomediv").hide();

					$("#ptrade").val('');
					$("#pstipendamt").val('');
					$("#paaprstartdate").val('');
					$("#paaprenddate").val('');
					$("#pcoursename").val('');
					$("#pclgname").val('');
					$("#pselfemp").val('');
					$("#pmonthincome").val('');

				}

			},
			error: function(data) {
				alert("Something went wrong");
				alert("error=>" + JSON.stringify(data));
			}
		});



	}
	if (type === 'OJ') {

		//alert("other than job");

		$("#nameofcompanydivlabel").show();
		$("#nameofcompanydiv").show();
		$("#pdistrictlabel").show();
		$("#pdistrictdiv").show();
		$("#paddresslabel").show();
		$("#paddressdiv").show();
		$("#postdivlabel").show();
		$("#postdiv").show();
		$("#psalarylabel").show();
		$("#psalarydiv").show();
		$("#phrnolabel").show();
		$("#phrnodiv").show();
		$("#pstatelabel").show();
		$("#pstatediv").show();

		$("#scheduleIdlable").hide();
		$("#scheduleIddiv").hide();
		$("#ptradelabel").hide();
		$("#ptradediv").hide();
		$("#pstipendamtlabel").hide();
		$("#pstipendamtdiv").hide();
		$("#paaprstartdatelabel").hide();
		$("#paaprstartdatediv").hide();
		$("#paaprenddatelabel").hide();
		$("#paaprenddatediv").hide();
		$("#pcoursenamelabel").hide();
		$("#pcoursenamediv").hide();
		$("#pclgnamelabel").hide();
		$("#pclgnamediv").hide();
		$("#pselfemplabel").hide();
		$("#pselfempdiv").hide();
		$("#pmonthincomelabel").hide();
		$("#pmonthincomediv").hide();

		$("#ptrade").val('');
		$("#pstipendamt").val('');
		$("#paaprstartdate").val('');
		$("#paaprenddate").val('');
		$("#pcoursename").val('');
		$("#pclgname").val('');
		$("#pselfemp").val('');
		$("#pmonthincome").val('');
		$("#scheduleId").val('');
	}
	if (type === 'Apprenticeship') {
		//alert("Apprenticeship");

		$.ajax({
			type: "POST",
			contentType: "application/json",
			url: baseUrl + "api/plcmt/getAllByPlcmtType?scheduleType=" + type + "&ins_code=" + insCode,
			headers: {'Authorization': jwtToken},
			cache: false,
			timeout: 600000,
			success: function(data) {
				//alert("data=> "+JSON.stringify(data));

				if (data.length === 0 || data.length < 0) {
					$('#scheduleId').empty();
					alert("Your DCP NEED TO ADD SCHEDULE FOR JOB OR APPRENTISHIP MELA for Entering Placements Data");

				} else {
					$('#scheduleId').empty();
					$('#scheduleId').append("<option value=''>-select-</option>");
					for (var i = 0, len = data.length; i < len; ++i) {
						var user = data[i];

						var description = user.scheduleType + '-' + user.scheduleDate + '-' + user.scheduleLocation + '-' + user.scheduleDesc;
						$('#scheduleId').append("<option value=\"" + user.plcmtId + "\">" + description + "</option>");
					}

					$('#ptrade').append("<option value=''>-select-</option>");
					//alert(JSON.stringify(allData.trades));
					for (var i = 0, len = allData.trades.length; i < len; ++i) {
						
						var user = allData.trades[i];
						$('#ptrade').append("<option value=\"" + user.tradeShort + "\">" + user.tradeName + "</option>");
					}

					$("#ptradelabel").show();
					$("#ptradediv").show();


					$("#nameofcompanydivlabel").show();
					$("#nameofcompanydiv").show();
					$("#pdistrictlabel").show();
					$("#pdistrictdiv").show();
					$("#paddresslabel").show();
					$("#paddressdiv").show();
					$("#phrnolabel").show();
					$("#phrnodiv").show();
					$("#pstatelabel").show();
					$("#pstatediv").show();
					$("#paaprstartdatelabel").show();
					$("#paaprstartdatediv").show();
					$("#paaprenddatelabel").show();
					$("#paaprenddatediv").show();
					$("#pstipendamtlabel").show();
					$("#pstipendamtdiv").show();
					$("#scheduleIdlable").show();
					$("#scheduleIddiv").show();

					$("#pcoursenamelabel").hide();
					$("#pcoursenamediv").hide();
					$("#pclgnamelabel").hide();
					$("#pclgnamediv").hide();
					$("#pselfemplabel").hide();
					$("#pselfempdiv").hide();
					$("#pmonthincomelabel").hide();
					$("#pmonthincomediv").hide();
					$("#psalarylabel").hide();
					$("#psalarydiv").hide();
					$("#postdivlabel").hide();
					$("#postdiv").hide();


					$("#ppostname").val('');
					$("#psalary").val('');
					$("#pcoursename").val('');
					$("#pclgname").val('');
					$("#pselfemp").val('');
					$("#pmonthincome").val('');
				}

			},
			error: function(data) {
				alert("Admission Number Not Found");

			}
		});




	}
	if (type === 'OA') {
		//alert("Apprenticeship");

		$('#ptrade').append("<option value=''>-select-</option>");
		//alert(JSON.stringify(allData.trades));
		for (var i = 0, len = allData.trades.length; i < len; ++i) {
			var user = allData.trades[i];
			$('#ptrade').append("<option value=\"" + user.tradeShort + "\">" + user.tradeName + "</option>");
		}

		$("#ptradelabel").show();
		$("#ptradediv").show();

		$("#nameofcompanydivlabel").show();
		$("#nameofcompanydiv").show();
		$("#pdistrictlabel").show();
		$("#pdistrictdiv").show();
		$("#paddresslabel").show();
		$("#paddressdiv").show();
		$("#phrnolabel").show();
		$("#phrnodiv").show();
		$("#pstatelabel").show();
		$("#pstatediv").show();
		$("#paaprstartdatelabel").show();
		$("#paaprstartdatediv").show();
		$("#paaprenddatelabel").show();
		$("#paaprenddatediv").show();
		$("#pstipendamtlabel").show();
		$("#pstipendamtdiv").show();

		$("#scheduleIdlable").hide();
		$("#scheduleIddiv").hide();
		$("#pcoursenamelabel").hide();
		$("#pcoursenamediv").hide();
		$("#pclgnamelabel").hide();
		$("#pclgnamediv").hide();
		$("#pselfemplabel").hide();
		$("#pselfempdiv").hide();
		$("#pmonthincomelabel").hide();
		$("#pmonthincomediv").hide();
		$("#psalarylabel").hide();
		$("#psalarydiv").hide();
		$("#postdivlabel").hide();
		$("#postdiv").hide();


		$("#ppostname").val('');
		$("#psalary").val('');
		$("#pcoursename").val('');
		$("#pclgname").val('');
		$("#pselfemp").val('');
		$("#pmonthincome").val('');
		$("#scheduleId").val('');

	}
	if (type === 'HigherEducation') {

		$("#nameofcompanydivlabel").hide();
		$("#nameofcompanydiv").hide();
		$("#phrnolabel").hide();
		$("#phrnodiv").hide();
		$("#ptradelabel").hide();
		$("#ptradediv").hide();
		$("#paaprstartdatelabel").hide();
		$("#paaprstartdatediv").hide();
		$("#paaprenddatelabel").hide();
		$("#paaprenddatediv").hide();
		$("#pstipendamtlabel").hide();
		$("#pstipendamtdiv").hide();
		$("#pselfemplabel").hide();
		$("#pselfempdiv").hide();
		$("#pmonthincomelabel").hide();
		$("#pmonthincomediv").hide();
		$("#psalarylabel").hide();
		$("#psalarydiv").hide();
		$("#postdivlabel").hide();
		$("#postdiv").hide();
		$("#scheduleIdlable").hide();
		$("#scheduleIddiv").hide();

		$("#pcoursenamelabel").show();
		$("#pcoursenamediv").show();
		$("#pclgnamelabel").show();
		$("#pclgnamediv").show();
		$("#pstatelabel").show();
		$("#pstatediv").show();
		$("#pdistrictlabel").show();
		$("#pdistrictdiv").show();
		$("#paddresslabel").show();
		$("#paddressdiv").show();

		$("#pname_of_company").val('');
		$("#ppostname").val('');
		$("#psalary").val('');
		$("#phrno").val('');
		$("#ptrade").val('');
		$("#pstipendamt").val('');
		$("#paaprstartdate").val('');
		$("#paaprenddate").val('');
		$("#pselfemp").val('');
		$("#pmonthincome").val('');
		$("#scheduleIdlable").val('');
		$("#scheduleIddiv").val('');


	}
	if (type === 'SelfEmployment') {
		$("#nameofcompanydivlabel").hide();
		$("#nameofcompanydiv").hide();
		$("#phrnolabel").hide();
		$("#phrnodiv").hide();
		$("#ptradelabel").hide();
		$("#ptradediv").hide();
		$("#paaprstartdatelabel").hide();
		$("#paaprstartdatediv").hide();
		$("#paaprenddatelabel").hide();
		$("#paaprenddatediv").hide();
		$("#pstipendamtlabel").hide();
		$("#pstipendamtdiv").hide();
		$("#psalarylabel").hide();
		$("#psalarydiv").hide();
		$("#postdivlabel").hide();
		$("#postdiv").hide();
		$("#pcoursenamelabel").hide();
		$("#pcoursenamediv").hide();
		$("#pclgnamelabel").hide();
		$("#pclgnamediv").hide();
		$("#scheduleIdlable").hide();
		$("#scheduleIddiv").hide();

		$("#pselfemplabel").show();
		$("#pselfempdiv").show();
		$("#pstatelabel").show();
		$("#pstatediv").show();
		$("#pdistrictlabel").show();
		$("#pdistrictdiv").show();
		$("#paddresslabel").show();
		$("#paddressdiv").show();
		$("#pmonthincomelabel").show();
		$("#pmonthincomediv").show();

		$("#pname_of_company").val('');
		$("#ppostname").val('');
		$("#psalary").val('');
		$("#phrno").val('');
		$("#ptrade").val('');
		$("#pstipendamt").val('');
		$("#paaprstartdate").val('');
		$("#paaprenddate").val('');
		$("#pcoursename").val('');
		$("#pclgname").val('');
		$("#scheduleIdlable").val('');
		$("#scheduleIddiv").val('');
	}
	$("#submit").show();
}

function senddata() {

	var passmonth = $("#passmonth").val();
	var passyear = $("#passyear").val();
	var ptype = $("#type").val();
	var pstate = $("#pstate").val();
	var pdistrict = $("#pdistrict").val();
	var paddress = $("#paddress").val();
	var plcmtYear = $("#plcmtYear").val();
	//alert("pdistrict" + pdistrict);


	if (passmonth === "" || passmonth === null) {
		$('#alertError').html("Candidate MONTH OF PASS is Requires, Please fill that.");
		openModelAlert();
		return false;
	}
	if (passyear === "" || passyear === null) {
		$('#alertError').html("Candidate YEAR OF PASS is Requires, Please fill that.");
		openModelAlert();
		return false;
	}
	if (plcmtYear === "" || plcmtYear === null) {
		$('#alertError').html("Candidate Placement Year is Requires, Please fill that.");
		openModelAlert();
		return false;
	}
	if (ptype === "" || ptype === null) {
		$('#alertError').html("Placement Type  is Requires, Please fill that.");
		openModelAlert();
		return false;
	}
	if (pstate === "" || pstate === null) {
		$('#alertError').html("Placement State is Requires, Please fill that.");
		openModelAlert();
		return false;
	}
	if (pdistrict === "" || pdistrict === null || pdistrict === '-1') {
		$('#alertError').html("Placement District is Requires, Please fill that.");
		openModelAlert();
		return false;
	}
	if (paddress === "" || paddress === null) {
		$('#alertError').html("Placement Address is Requires, Please fill that.");
		openModelAlert();
		return false;
	}

	if (ptype === 'Job') {

		var pname_of_company = $("#pname_of_company").val();
		if (pname_of_company === "" || pname_of_company === null) {
			$('#alertError').html("Name of the Company is Requires, Please fill that.");
			openModelAlert();
			return false;
		}
		if (!pname_of_company.match('^[a-zA-Z ]{3,100}$')) {
			$('#alertError').html("Name of the Company should contain Characters only.");
			openModelAlert();
			$("#pname_of_company").val('');
			return false;

		}
		var ppostname = $("#ppostname").val();
		if (ppostname === "" || ppostname === null) {
			$('#alertError').html("Post Name is Requires.");
			openModelAlert();
			$("#ppostname").val('');
			return false;
		}
		if (!ppostname.match('^[a-zA-Z ]{2,100}$')) {
			$('#alertError').html("Post Name should contain CHARACTERS ONLY.");
			openModelAlert();
			$("#ppostname").val('');
			return false;
		}

		var psalary = $("#psalary").val();
		if (psalary === "" || psalary === null) {
			$('#alertError').html("Salary is Requires, Please fill that.");
			openModelAlert();
			$("#psalary").val('');
			return false;
		}
		if (!psalary.match('^[1-9]{1}[0-9]{1,15}$')) {
			$('#alertError').html("Salary should contains NUMBERS ONLY.");
			openModelAlert();
			$("#psalary").val('');
			return false;
		}

		var phrno = $("#phrno").val();
		if (phrno === "" || phrno === null) {
			$('#alertError').html("HR Contact Number is Requires, Please fill that.");
			openModelAlert();
			$("#phrno").val('');
			return false;
		}
		if (!phrno.match('^[6789]{1}[0-9]{9}$')) {
			$('#alertError').html("HR Contact Number should contains Numbers with size 10 Numbers.");
			openModelAlert();
			$("#phrno").val('');
			return false;
		}

		var scheduleId = $("#scheduleId").val();
		if (scheduleId === "" || scheduleId === null) {
			$('#alertError').html("Schedule is Requires, Please fill that.");
			openModelAlert();
			$("#scheduleId").val('');
			return false;
		}

	}
	if (ptype === 'OJ') {

		var pname_of_company = $("#pname_of_company").val();
		if (pname_of_company === "" || pname_of_company === null) {
			$('#alertError').html("Name of the Company is Requires, Please fill that.");
			openModelAlert();
			return false;
		}
		if (!pname_of_company.match('^[a-zA-Z ]{3,100}$')) {
			$('#alertError').html("Name of the Company should contain Characters only.");
			openModelAlert();
			$("#pname_of_company").val('');
			return false;

		}
		var ppostname = $("#ppostname").val();
		if (ppostname === "" || ppostname === null) {
			$('#alertError').html("Post Name is Requires.");
			openModelAlert();
			$("#ppostname").val('');
			return false;
		}
		if (!ppostname.match('^[a-zA-Z ]{2,100}$')) {
			$('#alertError').html("Post Name should contain CHARACTERS ONLY.");
			openModelAlert();
			$("#ppostname").val('');
			return false;
		}

		var psalary = $("#psalary").val();
		if (psalary === "" || psalary === null) {
			$('#alertError').html("Salary is Requires, Please fill that.");
			openModelAlert();
			$("#psalary").val('');
			return false;
		}
		if (!psalary.match('^[1-9]{1}[0-9]{1,15}$')) {
			$('#alertError').html("Salary should contains NUMBERS ONLY.");
			openModelAlert();
			$("#psalary").val('');
			return false;
		}

		var phrno = $("#phrno").val();
		if (phrno === "" || phrno === null) {
			$('#alertError').html("HR Contact Number is Requires, Please fill that.");
			openModelAlert();
			$("#phrno").val('');
			return false;
		}
		if (!phrno.match('^[6789]{1}[0-9]{9}$')) {
			$('#alertError').html("HR Contact Number should contains Numbers with size 10 Numbers.");
			openModelAlert();
			$("#phrno").val('');
			return false;
		}

	}
	if (ptype === 'Apprenticeship') {
		//alert("app");
		var pname_of_company = $("#pname_of_company").val();
		if (pname_of_company === "" || pname_of_company === null) {
			$('#alertError').html("Name of the Company is Requires. Please fill that");
			openModelAlert();
			$("#pname_of_company").val('');
			return false;
		}
		if (!pname_of_company.match('^[a-zA-Z ]{3,100}$')) {
			$('#alertError').html("Name of the Company should contain Characters only.");
			openModelAlert();
			$("#pname_of_company").val('');
			return false;

		}
		var phrno = $("#phrno").val();
		if (phrno === "" || phrno === null) {
			$('#alertError').html("HR Contact Number is Requires, Please fill that.");
			openModelAlert();
			$("#phrno").val('');
			return false;
		}
		if (!phrno.match('^[6789]{1}[0-9]{9}$')) {
			$('#alertError').html("HR Contact Number should contains Numbers with size 10 Numbers.");
			openModelAlert();
			$("#phrno").val('');
			return false;
		}
		var ptrade = $("#ptrade").val();
		if (ptrade === "" || ptrade === null) {
			$('#alertError').html("Trade is Requires, Please fill that.");
			openModelAlert();
			$("#ptrade").val('');
			return false;
		}
		var pstipendamt = $("#pstipendamt").val();
		//alert("pstipendamt" + pstipendamt);
		if (pstipendamt === "" || pstipendamt === null) {
			$('#alertError').html("Stipend Amount is Requires, Please fill that.");
			openModelAlert();
			$("#pstipendamt").val('');
			return false;
		}
		if (!pstipendamt.match('^[1-9]{1}[0-9]{1,15}$')) {
			$('#alertError').html("Stipend Amount is Invalid, It should contain Numbers only.");
			openModelAlert();
			$("#pstipendamt").val('');
			return false;
		}
		var paaprstartdate = $("#paaprstartdate").val();
		if (paaprstartdate === "" || paaprstartdate === null) {
			$('#alertError').html("Apprenticeship Start Date is Requires, Please fill that.");
			openModelAlert();
			$("#paaprstartdate").val('');
			return false;
		}
		var paaprenddate = $("#paaprenddate").val();
		if (paaprenddate === "" || paaprenddate === null) {
			$('#alertError').html("Apprenticeship End Date is Requires, Please fill that.");
			openModelAlert();
			$("#paaprenddate").val('');
			return false;
		}

		var scheduleId = $("#scheduleId").val();
		if (scheduleId === "" || scheduleId === null) {
			$('#alertError').html("Schedule is Requires, Please fill that.");
			openModelAlert();
			$("#scheduleId").val('');
			return false;
		}
	}
	if (ptype === 'OA') {
		//alert("app");
		var pname_of_company = $("#pname_of_company").val();
		if (pname_of_company === "" || pname_of_company === null) {
			$('#alertError').html("Name of the Company is Requires. Please fill that");
			openModelAlert();
			$("#pname_of_company").val('');
			return false;
		}
		if (!pname_of_company.match('^[a-zA-Z ]{3,100}$')) {
			$('#alertError').html("Name of the Company should contain Characters only.");
			openModelAlert();
			$("#pname_of_company").val('');
			return false;

		}
		var phrno = $("#phrno").val();
		if (phrno === "" || phrno === null) {
			$('#alertError').html("HR Contact Number is Requires, Please fill that.");
			openModelAlert();
			$("#phrno").val('');
			return false;
		}
		if (!phrno.match('^[6789]{1}[0-9]{9}$')) {
			$('#alertError').html("HR Contact Number should contains Numbers with size 10 Numbers.");
			openModelAlert();
			$("#phrno").val('');
			return false;
		}
		var ptrade = $("#ptrade").val();
		if (ptrade === "" || ptrade === null) {
			$('#alertError').html("Trade is Requires, Please fill that.");
			openModelAlert();
			$("#ptrade").val('');
			return false;
		}
		var pstipendamt = $("#pstipendamt").val();
		//alert("pstipendamt" + pstipendamt);
		if (pstipendamt === "" || pstipendamt === null) {
			$('#alertError').html("Stipend Amount is Requires, Please fill that.");
			openModelAlert();
			$("#pstipendamt").val('');
			return false;
		}
		if (!pstipendamt.match('^[1-9]{1}[0-9]{1,15}$')) {
			$('#alertError').html("Stipend Amount is Invalid, It should contain Numbers only.");
			openModelAlert();
			$("#pstipendamt").val('');
			return false;
		}
		var paaprstartdate = $("#paaprstartdate").val();
		if (paaprstartdate === "" || paaprstartdate === null) {
			$('#alertError').html("Apprenticeship Start Date is Requires, Please fill that.");
			openModelAlert();
			$("#paaprstartdate").val('');
			return false;
		}
		var paaprenddate = $("#paaprenddate").val();
		if (paaprenddate === "" || paaprenddate === null) {
			$('#alertError').html("Apprenticeship End Date is Requires, Please fill that.");
			openModelAlert();
			$("#paaprenddate").val('');
			return false;
		}
	}

	if (ptype === 'HigherEducation') {
		var pcoursename = $("#pcoursename").val();
		if (pcoursename === "" || pcoursename === null) {
			$('#alertError').html("Course Name is Requires, Please fill that.");
			openModelAlert();
			$("#pcoursename").val('');
			return false;
		}
		if (!pcoursename.match('^[a-zA-Z ]{3,100}$')) {
			$('#alertError').html("Course Name is Invalid, It should contains CHARACTERS ONLY.");
			openModelAlert();
			$("#pcoursename").val('');
			return false;

		}
		var pclgname = $("#pclgname").val();
		if (pclgname === "" || pclgname === null) {
			$('#alertError').html("College Name is Required, Please fill that.");
			openModelAlert();
			$("#pclgname").val('');
			return false;
		}
		if (!pclgname.match('^[a-zA-Z ]{3,100}$')) {
			$('#alertError').html("College Name is Invalid, It should contains CHARACTERS ONLY.");
			openModelAlert();
			$("#pclgname").val('');
			return false;

		}
	}
	if (ptype === 'SelfEmployment') {
		var pselfemp = $("#pselfemp").val();
		if (pselfemp === "" || pselfemp === null) {
			$('#alertError').html("Name of Self Employment is Requires, Please fill that.");
			openModelAlert();
			$("#pselfemp").val('');
			return false;
		}
		if (!pselfemp.match('^[a-zA-Z ]{3,100}$')) {
			$('#alertError').html("Self Employment is Invalid, It should contains CHARACTERS ONLY.");
			openModelAlert();
			$("#pselfemp").val('');
			return false;

		}
		var pmonthincome = $("#pmonthincome").val();
		if (pmonthincome === "" || pmonthincome === null) {
			$('#alertError').html("Monthly Income is Requires, Please fill that.");
			openModelAlert();
			$("#pmonthincome").val('');
			return false;
		}
		if (!pmonthincome.match('^[1-9]{1}[0-9]{1,15}$')) {
			$('#alertError').html("Monthly Income is Invalid, It should contains NUMBERS ONLY.");
			openModelAlert();
			$("#pmonthincome").val('');
			return false;
		}
	}
	$("#savemsg").html('Are you sure about saving that details you entered?');
	var modal1 = document.getElementById("savingPlcmtModel");
	var span = document.getElementsByClassName("savesuccessclose")[0];
	modal1.style.display = "block";
	span.onclick = function() {
		modal1.style.display = "none";
	};


}

//Placement Details of the Admission Number
function getPlacementDetails() {
	// alert("getPlacementDetails");
	var adm_numm = $("#adm_num").val();

	$.ajax({
		type: "POST",
		contentType: "application/json",
		url: baseUrl + "api/plcmt/getCandPlcmtDetails?admNum=" + adm_numm,
		headers: {'Authorization': jwtToken},
		cache: false,
		timeout: 600000,
		success: function(response) {
			//alert("FFFFFFFF"+JSON.stringify(response));
			$("#plcmt_detailsbody").empty();
			getPlcmtDetails(response);
			plcmtDetailsByAdmnum = response;

		},
		error: function(response) {
			alert("Candidate Placement Details are Not Loaded");
		}

	});

}

function getPlcmtDetails(response) {

	for (i = 0; i < response.length; i++) {
		var bean = response[i];

		var ncompany = bean.pname_of_company === null ? "NA" : bean.pname_of_company;
		var postName = bean.ppostname === null ? "NA" : bean.ppostname;
		var sal = bean.psalary === null ? "NA" : bean.psalary;
		var pstipendamt = bean.pstipendamt === null ? "NA" : bean.pstipendamt;
		var paaprstartdate = bean.paaprstartdate === null ? "NA" : bean.paaprstartdate;
		var paaprenddate = bean.paaprenddate === null ? "NA" : bean.paaprenddate;
		var phrno = bean.phrno === null ? "NA" : bean.phrno;
		var pcoursename = bean.pcoursename === null ? "NA" : bean.pcoursename;
		var pclgname = bean.pclgname === null ? "NA" : bean.pclgname;
		var pselfemp = bean.pselfemp === null ? "NA" : bean.pselfemp;
		var pmonthincome = bean.pmonthincome === null ? "NA" : bean.pmonthincome;

		var ptypee;
		if (bean.ptype === 'OA') {
			ptypee = 'Other than Apprenticeship';
		}
		else if (bean.ptype === 'OJ') {
			ptypee = 'Other than Job';
		} else {
			ptypee = bean.ptype;
		}

		//        var trade_name;
		//        trade_name = bean.ptrade === null ? "NA" : bean.ptrade;
		var trade_name;
		trade_name = bean.ptrade === null ? "NA" : bean.ptrade;

		for (var t = 0, len = getMastersData.trades.length; t < len; ++t) {
			var trade = getMastersData.trades[t];
			if (bean.ptrade == trade.tradeCode) {
				trade_name = trade.tradeName;
			}
		}

		for (j = 0, len = allData.dists.length; j < len; ++j) {
			var distname;
			var districts = allData.dists[j];
			if (bean.pdistrict === districts.distcode) {
				distname = districts.distname;
			}
		}
		for (s = 0, len = allData.states.length; s < len; ++s) {
			var statename;
			var states = allData.states[s];
			if (bean.pstate === states.statecode) {
				statename = states.statename;
			}
		}


		//        for (var t = 0, len = allData.trades.length; t < len; ++t) {
		//
		//            var trade = allData.trades[t];
		//            if (parseInt(bean.ptrade) === trade.trade_code) {
		//                trade_name = trade.trade_name;
		//            }
		//        }

		//$('#namespan').html(bean.name);
		//$('#adm_numspan').html(bean.adm_num);
		//$('#yearspan').html(bean.passyear);

		$("#plcmt_detailsbody").append(
			'<tr>\n\
<td>'+ bean.passyear + '</td>\n\
<td>' + ptypee + '</td>\n\
<td>' + ncompany + '</td>\n\
<td>' + postName + '</td>\n\
<td>' + sal + '</td>\n\
<td>' + trade_name + '</td>\n\
<td>' + pstipendamt + '</td>\n\
<td>' + paaprstartdate + '</td>\n\
<td>' + paaprenddate + '</td>\n\
<td>' + phrno + '</td>\n\
<td>' + pcoursename + '</td>\n\
<td>' + pclgname + '</td>\n\
<td>' + pselfemp + '</td>\n\
<td>' + pmonthincome + '</td>\n\
<td>' + bean.paddress + '</td>\n\
\n\
</tr>'
		);

	}
	$("#plcmt_detailsbody").append(
		'<tr><td align= "center" colspan="15" id="addplcmttd">\n\
<button type="button" class="btn btn-success" onclick="return AddPlcmt()">ADD MORE</button>\n\
<button type="button" class="btn btn-info" onclick="return goback()">GO BACK</button>\n\
</td></tr>'
	);
}
function addAdmnum(a) {
	// alert("admission number "+a);
	$('#myModal1').hide();
	document.getElementById("adm_num").value = a;

	//$("#admissiondetailsdiv").hide();
	$("#admissiondetails").hide();
	$("#placementdiv").hide();
	$("#plcmt_detailstab").hide();
	$("#plcmt_detailstabheading").hide();

	$("#pstate").val('');
	$("#pdistrict").val('');
	$("#paddress").val('');
	$("#pname_of_company").val('');
	$("#ppostname").val('');
	$("#psalary").val('');
	$("#phrno").val('');
	$("#ptrade").val('');
	$("#pstipendamt").val('');
	$("#paaprstartdate").val('');
	$("#paaprenddate").val('');
	$("#pcoursename").val('');
	$("#pclgname").val('');
	$("#pselfemp").val('');
	$("#pmonthincome").val('');

	$("#namerow").hide();
	$("#distrow").hide();
	$("#traderow").hide();

}
function AddPlcmt() {
	//alert("AddPlcmt");

	$("#addplcmttd").hide();

	$("#placementdiv").show();
	$("#monthofpassyeardiv").show();
	$("#plcmttypediv").show();

	allinputshide();
	allinputsvaluesnull();

	//            //states dropdown
	getStatesDropdown(allData);
	//            //districts dropdown
	getDistrictsDropdown();

}
function allinputshide() {
	$("#nameofcompanydivlabel").hide();
	$("#nameofcompanydiv").hide();
	$("#pdistrictlabel").hide();
	$("#pdistrictdiv").hide();
	$("#paddresslabel").hide();
	$("#paddressdiv").hide();
	$("#postdivlabel").hide();
	$("#postdiv").hide();
	$("#psalarylabel").hide();
	$("#psalarydiv").hide();
	$("#phrnolabel").hide();
	$("#phrnodiv").hide();
	$("#pstatelabel").hide();
	$("#pstatediv").hide();
	$("#pstipendamtlabel").hide();
	$("#pstipendamtdiv").hide();
	$("#paaprstartdatelabel").hide();
	$("#paaprstartdatediv").hide();
	$("#paaprenddatelabel").hide();
	$("#paaprenddatediv").hide();
	$("#pcoursenamelabel").hide();
	$("#pcoursenamediv").hide();
	$("#pclgnamelabel").hide();
	$("#pclgnamediv").hide();
	$("#pselfemplabel").hide();
	$("#pselfempdiv").hide();
	$("#pmonthincomelabel").hide();
	$("#pmonthincomediv").hide();
	$("#ptradelabel").hide();
	$('#ptradediv').hide();
	$("#scheduleIdlable").hide();
	$('#scheduleIddiv').hide();
}
function allinputsvaluesnull() {
	$("#scheduleId").val('');
	$("#pstate").val('');
	$("#pdistrict").val('');
	$("#paddress").val('');
	$("#pname_of_company").val('');
	$("#ppostname").val('');
	$("#psalary").val('');
	$("#phrno").val('');
	$("#ptrade").val('');
	$("#pstipendamt").val('');
	$("#paaprstartdate").val('');
	$("#paaprenddate").val('');
	$("#pcoursename").val('');
	$("#pclgname").val('');
	$("#pselfemp").val('');
	$("#pmonthincome").val('');
}
function openModelAlert() {
	var modal1 = document.getElementById("myModalErroralert");
	var span = document.getElementsByClassName("alertError-close")[0];
	modal1.style.display = "block";
	span.onclick = function() {
		modal1.style.display = "none";
	};
}

function savePlacement() {

	var modal1 = document.getElementById("savingPlcmtModel");
	modal1.style.display = "none";

	var data = {};
	data["adm_num"] = $("#adm_num").val();
	data["name"] = $("#name").val();
	data["dist_name"] = $("#dist_name").val();
	data["dist_code"] = $("#dist_code").val();
	data["iti_name"] = $("#iti_name").val();
	data["iti_code"] = $("#iti_code").val();
	data["year_of_admission"] = $("#year_of_admission").val();
	data["passmonth"] = $("#passmonth").val();
	data["passyear"] = $("#passyear").val();
	data["ptype"] = $("#type").val();
	data["pname_of_company"] = $("#pname_of_company").val();
	data["pstate"] = $("#pstate").val();
	data["pdistrict"] = $("#pdistrict").val();
	data["paddress"] = $("#paddress").val();
	data["ppostname"] = $("#ppostname").val();
	data["psalary"] = $("#psalary").val();
	data["phrno"] = $("#phrno").val();
	data["ptrade"] = $("#ptrade").val();
	data["pstipendamt"] = $("#pstipendamt").val();
	data["paaprstartdate"] = $("#paaprstartdate").val();
	data["paaprenddate"] = $("#paaprenddate").val();
	data["pcoursename"] = $("#pcoursename").val();
	data["pclgname"] = $("#pclgname").val();
	data["pselfemp"] = $("#pselfemp").val();
	data["pmonthincome"] = $("#pmonthincome").val();
	data["trade_code"] = $("#trade_code").val();
	data["trade_name"] = $("#trade_name").val();
	data["scheduleId"] = $("#scheduleId").val();
	data["entry_by"] = insCode;
	data["plcmtYear"] = $("#plcmtYear").val();

	$.ajax({
		type: "POST",
		contentType: "application/json",
		url: baseUrl + "api/plcmt/savePlcmtDetails",
		headers: {'Authorization': jwtToken},
		data: JSON.stringify(data),
		dataType: 'json',
		cache: false,
		timeout: 600000,
		success: function(response) {
			//alert(response.msg);
			$('#passmonth').val('');
			$('#passyear').val('');
			$('#type').val('');

			allinputsvaluesnull();
			$("#placementdiv").hide();

			getPlacementDetails();

			$("#successmsg").html(response.msg);

			var modal1 = document.getElementById("myModalSuccess");
			var span = document.getElementsByClassName("successclose")[0];
			modal1.style.display = "block";
			span.onclick = function() {
				modal1.style.display = "none";
			};

			$("#passmonth").val('');
			$("#passyear").val('');
			$("#type").val('');

		},
		error: function(data) {
			//alert("error" + data);
			alert("Something Went Wrong while Saving Placement Details");
			return false;
		}


	});
}

//function generateCaptchaa() {
//	var alpha = new Array('a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 
//	'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z');
//	var i;
//	for (i = 0; i < 4; i++) {
//		var a = alpha[Math.floor(Math.random() * alpha.length)];
//		var b = alpha[Math.floor(Math.random() * alpha.length)];
//		var c = alpha[Math.floor(Math.random() * alpha.length)];
//		var d = alpha[Math.floor(Math.random() * alpha.length)];
//	}
//	var code = a + '' + b + '' + '' + c + '' + d;
//	document.getElementById("mainCaptcha").value = code;
//}

function goback(){
	//alert('goback');
	location.reload();
}
