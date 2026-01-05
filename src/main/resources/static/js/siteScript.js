/**
 * 
 *//**
 * 
 */
 
	function generateCaptcha(mainCaptcha)
    {
        //var alpha = new Array('A','B','C','D','E','F','G','H','I','J','K','L','M','N','P','Q','R','S','T','U','V','W','X','Y','Z');
        var alpha = new Array('1','2','3','4','5','6','7','8','9','0');
        var i;
        for (i=0;i<4;i++){
          var a = alpha[Math.floor(Math.random() * alpha.length)];
          var b = alpha[Math.floor(Math.random() * alpha.length)];
          var c = alpha[Math.floor(Math.random() * alpha.length)];
          var d = alpha[Math.floor(Math.random() * alpha.length)];
         }
       var code = a + '' + b + '' + '' + c + '' + d;
       document.getElementById(mainCaptcha).value = code;
     }
	
	
	function getDists(){
		var dists = [
			{"statecode":"28","dist_code":"11","dist_name":"Srikakulam","itidist_code":"12","new_dist":null},
			{"statecode":"28","dist_code":"12","dist_name":"Vizianagaram","itidist_code":"13","new_dist":null},
			{"statecode":"28","dist_code":"13","dist_name":"Visakhapatnam","itidist_code":"11","new_dist":null},
			{"statecode":"28","dist_code":"14","dist_name":"East Godavari","itidist_code":"14","new_dist":null},
			{"statecode":"28","dist_code":"15","dist_name":"West Godavari","itidist_code":"15","new_dist":null},
			{"statecode":"28","dist_code":"16","dist_name":"Krishna","itidist_code":"16","new_dist":null},
			{"statecode":"28","dist_code":"17","dist_name":"Guntur","itidist_code":"17","new_dist":null},
			{"statecode":"28","dist_code":"18","dist_name":"Prakasam","itidist_code":"19","new_dist":null},
			{"statecode":"28","dist_code":"19","dist_name":"Nellore","itidist_code":"18","new_dist":null},
			{"statecode":"28","dist_code":"21","dist_name":"Kurnool","itidist_code":"22","new_dist":null},
			{"statecode":"28","dist_code":"22","dist_name":"Anantapur","itidist_code":"23","new_dist":null},
			{"statecode":"28","dist_code":"23","dist_name":"Chittoor","itidist_code":"20","new_dist":null},
			{"statecode":"28","dist_code":"20","dist_name":"YSR","itidist_code":"21","new_dist":null},
			{"statecode":"28","dist_code":"36","dist_name":"Tirupati","itidist_code":"36","new_dist":"1"},
			{"statecode":"28","dist_code":"24","dist_name":"Anakapalli","itidist_code":"24","new_dist":"1"},
			{"statecode":"28","dist_code":"26","dist_name":"Parvathipuram-Manyam","itidist_code":"26","new_dist":"1"},
			{"statecode":"28","dist_code":"27","dist_name":"Kakinada","itidist_code":"27","new_dist":"1"},
			{"statecode":"28","dist_code":"28","dist_name":"Konaseema","itidist_code":"28","new_dist":"1"},
			{"statecode":"28","dist_code":"29","dist_name":"Eluru","itidist_code":"29","new_dist":"1"},
			{"statecode":"28","dist_code":"30","dist_name":"NTR","itidist_code":"30","new_dist":"1"},
			{"statecode":"28","dist_code":"31","dist_name":"Palnadu","itidist_code":"31","new_dist":"1"},
			{"statecode":"28","dist_code":"32","dist_name":"Bapatla","itidist_code":"32","new_dist":"1"},
			{"statecode":"28","dist_code":"33","dist_name":"Annamayya","itidist_code":"33","new_dist":"1"},
			{"statecode":"28","dist_code":"34","dist_name":"Nandyal","itidist_code":"34","new_dist":"1"},
			{"statecode":"28","dist_code":"35","dist_name":"Sri Satyasai","itidist_code":"35","new_dist":"1"},
			{"statecode":"28","dist_code":"25","dist_name":"Alluri Sitaramaraju","itidist_code":"25","new_dist":"1"}];
		return dists;
	}
	
	function generateDistDropdown(a){
		var dists = getDists();
		$("#"+a).empty();
		$("#"+a).append('<option value="">-SELECT-</option>');
		for(var i=0;i<dists.length;i++){
			var bean = dists[i];
			$("#"+a).append('<option value="'+bean.dist_code+'">'+bean.dist_name+'</option>');
		}
	}
	
	function generateDistDropdownWithSelectedDist(a,distCode){
		//alert('generateDistDropdownWithSelectedDist=>'+a);
		var dists = getDists();
		$("#"+distCode).empty();
		$("#"+distCode).append('<option value="">-SELECT-</option>');
		for(var i=0;i<dists.length;i++){
			var bean = dists[i];
			if(bean.dist_code == a){
				//alert('bean.dist_code == a');
				$("#"+distCode).append('<option value="'+bean.dist_code+'" selected>'+bean.dist_name+'</option>');
			}else{
				$("#"+distCode).append('<option value="'+bean.dist_code+'">'+bean.dist_name+'</option>');
			}
			
			
		}
	}
	
	function getDistName(distCode){
		//alert("getDistName=>"+distCode);
		var dists = getDists();
		var distName = '';
		for(var i=0; i < dists.length; i++){
			var bean = dists[i];
			if(bean.dist_code == distCode){
				distName = bean.dist_name;
			}
		}
		return distName;
	}
	
	function getAllSSCBoards(){
		//alert("getallsscboards");
		var sscboards = [
			{"boardCode":"51","boardName":"CBSE","trno":null,"displayOrder":2},
			{"boardCode":"52","boardName":"ICSE","trno":null,"displayOrder":3},
			{"boardCode":"28","boardName":"Andhra Pradesh State Board (SSC)","trno":null,"displayOrder":1},
			{"boardCode":"33","boardName":"Tamil nadu State Board","trno":null,"displayOrder":4},
			{"boardCode":"29","boardName":"Karnataka State Board","trno":null,"displayOrder":5},
			{"boardCode":"32","boardName":"Kerala State Board","trno":null,"displayOrder":6},
			{"boardCode":"34","boardName":"Pondicherry State Board","trno":null,"displayOrder":7},
			{"boardCode":"21","boardName":"Orissa State Board","trno":null,"displayOrder":8},
			{"boardCode":"23","boardName":"Madhya Pradesh State Board","trno":null,"displayOrder":9},
			{"boardCode":"22","boardName":"Chhattisgarh State Board","trno":null,"displayOrder":10},
			{"boardCode":"27","boardName":"Maharashtra State Board","trno":null,"displayOrder":11},
			{"boardCode":"60","boardName":"Other","trno":null,"displayOrder":99},
			{"boardCode":"35","boardName":"Andman & Nicobar Islands State Board","trno":null,"displayOrder":null},
			{"boardCode":"53","boardName":"AP-OSSC","trno":null,"displayOrder":null},
			{"boardCode":"54","boardName":"AP-OSC","trno":null,"displayOrder":null},
			{"boardCode":"10","boardName":"Bihar State Board","trno":null,"displayOrder":null},
			{"boardCode":"11","boardName":"Sikkim State Board","trno":null,"displayOrder":null},
			{"boardCode":"12","boardName":"Arunachal Pradesh State Board","trno":null,"displayOrder":null},
			{"boardCode":"13","boardName":"Nagaland State Board","trno":null,"displayOrder":null},
			{"boardCode":"14","boardName":"Manipur State Board","trno":null,"displayOrder":null},
			{"boardCode":"15","boardName":"Mizoram State Board","trno":null,"displayOrder":null},
			{"boardCode":"16","boardName":"Tripura State Board","trno":null,"displayOrder":null},
			{"boardCode":"17","boardName":"Meghalaya State Board","trno":null,"displayOrder":null},
			{"boardCode":"18","boardName":"Assam State Board","trno":null,"displayOrder":null},
			{"boardCode":"19","boardName":"West Bengal State Board","trno":null,"displayOrder":null},
			{"boardCode":"20","boardName":"Jharkhand State Board","trno":null,"displayOrder":null},
			{"boardCode":"24","boardName":"Gujarat State Board","trno":null,"displayOrder":null},
			{"boardCode":"25","boardName":"Daman & Diu State Board","trno":null,"displayOrder":null},
			{"boardCode":"26","boardName":"Dadra & Nagar Haveli State Board","trno":null,"displayOrder":null},
			{"boardCode":"30","boardName":"Goa State Board","trno":null,"displayOrder":null},
			{"boardCode":"31","boardName":"Lakshadweep State Board","trno":null,"displayOrder":null},
			{"boardCode":"36","boardName":"Telangana","trno":null,"displayOrder":36},
			{"boardCode":"1","boardName":"Jammu & Kashmir State Board","trno":null,"displayOrder":null},
			{"boardCode":"2","boardName":"Himachal Pradesh State Board","trno":null,"displayOrder":null},
			{"boardCode":"3","boardName":"Punjab State Board","trno":null,"displayOrder":null},
			{"boardCode":"4","boardName":"Chandigarh State Board","trno":null,"displayOrder":null},
			{"boardCode":"5","boardName":"Uttarakhand State Board","trno":null,"displayOrder":null},
			{"boardCode":"6","boardName":"Haryana State Board","trno":null,"displayOrder":null},
			{"boardCode":"7","boardName":"Delhi State Board","trno":null,"displayOrder":12},
			{"boardCode":"8","boardName":"Rajasthan State Board","trno":null,"displayOrder":13},
			{"boardCode":"9","boardName":"Utter Pradesh State Board","trno":null,"displayOrder":14}];
		
		return sscboards;
	}
	function getBoardName(boardCode){
		var boardName = "";
		var getAllSSCBoards = getAllSSCBoards();
		for(var i=0; i < getAllSSCBoards.length; i++){
			var bean = getAllSSCBoards[i];
			if(bean.boardCode == boardCode){
				boardName = bean.boardName;
			}
		}
		return boardName;
	}
	
	function getAllCastes(){
		//alert("getallcastes");
		var allCastes = [
			{"category_code":"BC-A","category_name":"BC-A","category_order":7,"meta_category_name":"BC","category":"Other Backward Class"},
			{"category_code":"BC-AW","category_name":"BC-AW","category_order":8,"meta_category_name":"BC","category":"Other Backward Class"},
			{"category_code":"BC-B","category_name":"BC-B","category_order":9,"meta_category_name":"BC","category":"Other Backward Class"},
			{"category_code":"BC-BW","category_name":"BC-BW","category_order":10,"meta_category_name":"BC","category":"Other Backward Class"},
			{"category_code":"BC-C","category_name":"BC-C","category_order":11,"meta_category_name":"BC","category":"Other Backward Class"},
			{"category_code":"BC-CW","category_name":"BC-CW","category_order":12,"meta_category_name":"BC","category":"Other Backward Class"},
			{"category_code":"BC-D","category_name":"BC-D","category_order":13,"meta_category_name":"BC","category":"Other Backward Class"},
			{"category_code":"BC-DW","category_name":"BC-DW","category_order":14,"meta_category_name":"BC","category":"Other Backward Class"},
			{"category_code":"BC-E","category_name":"BC-E","category_order":15,"meta_category_name":"BC","category":"Other Backward Class"},
			{"category_code":"BC-EW","category_name":"BC-EW","category_order":16,"meta_category_name":"BC","category":"Other Backward Class"},
			{"category_code":"OC","category_name":"OC","category_order":1,"meta_category_name":"OC","category":"General"},
			{"category_code":"OC-W","category_name":"OC-W","category_order":2,"meta_category_name":"OC","category":"General"},
			{"category_code":"SC","category_name":"SC","category_order":3,"meta_category_name":"SC","category":"Schedule Castes"},
			{"category_code":"SC-W","category_name":"SC-W","category_order":4,"meta_category_name":"SC","category":"Schedule Castes"},
			{"category_code":"ST","category_name":"ST","category_order":5,"meta_category_name":"ST","category":"Schedule Tribes"},
			{"category_code":"ST-W","category_name":"ST-W","category_order":6,"meta_category_name":"ST","category":"Schedule Tribes"},
			{"category_code":"SP","category_name":"SP","category_order":22,"meta_category_name":"SP","category":"General"},
			{"category_code":"SP-W","category_name":"SP-W","category_order":23,"meta_category_name":"SP","category":"General"},
			{"category_code":"EWS","category_name":"EWS","category_order":24,"meta_category_name":"EW","category":"General"},
			{"category_code":"EWS-W","category_name":"EWS-W","category_order":25,"meta_category_name":"EW","category":"General"},
			{"category_code":"IM","category_name":"IM","category_order":21,"meta_category_name":"IM","category":"General"},
			{"category_code":"PH","category_name":"PH","category_order":17,"meta_category_name":"PH","category":"General"},
			{"category_code":"PH-W","category_name":"PH-W","category_order":18,"meta_category_name":"PH","category":"General"},
			{"category_code":"EX-SW","category_name":"EX-SW","category_order":20,"meta_category_name":"EX","category":"General"},
			{"category_code":"EX-S","category_name":"EX-S","category_order":19,"meta_category_name":"EX","category":"General"}];
		return allCastes;
	}
	function getCastesName(category_code){
		var category_name = "";
		var getAllCastes = getAllCastes();
		for(var i=0; i < getAllCastes.length; i++){
			var bean = getAllCastes[i];
			if(bean.category_code == category_code){
				category_name = bean.category_name;
			}
		}
		return category_name;
	}
	
	function changeDateFormat(date){
		var convertedDate = '';
		 	var parts = date.split('-');
	        var year = parts[0];
	        var month = parts[1];
	        var day = parts[2];

	        convertedDate = day + '-' + month + '-' + year;
	        
		return convertedDate;
	}
	
	function formatDateString(originalDateString) {
	    // Parse the original date string
	    const originalDate = new Date(originalDateString);

	    // Extract date components
	    const day = originalDate.getDate().toString().padStart(2, '0');
	    const month = (originalDate.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
	    const year = originalDate.getFullYear();
	    const hours = originalDate.getHours().toString().padStart(2, '0');
	    const minutes = originalDate.getMinutes().toString().padStart(2, '0');
	    const seconds = originalDate.getSeconds().toString().padStart(2, '0');

	    // Format the date as "DD-MM-YYYY HH:mm:ss"
	    const formattedDate = `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;

	    return formattedDate;
	}
	
	function getBase64FromFile(file, callback) {
	    const reader = new FileReader();
	    reader.onloadend = function () {
	        callback(reader.result.split(',')[1]);
	    };
	    reader.readAsDataURL(file);
	}
	
function encodeBase64(data) {
	return btoa(data);  // 'btoa' encodes data into Base64
}
	
	
