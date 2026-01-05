/**
 * 
 */
 
 
 $(document).ready(function () {
	populateYearDropdown();
    });
 
  function populateYearDropdown(){
        var plcmtYear = document.getElementById('plcmtYear');
        plcmtYear.innerHTML = '';
        
        var selectoption = document.createElement('option');
        selectoption.value = "";
        selectoption.text = "-ALL-";
        plcmtYear.appendChild(selectoption);
        
        var startYear = 2000;
        var currentYear = new Date().getFullYear();
        
        for (var year = startYear; year <= currentYear; year++) {
                var option = document.createElement('option');
                option.value = year;
                option.text = year;
                plcmtYear.appendChild(option);
            }
    }

    function fnExcelReport() {
        // alert("sdffffffffffffffff");
        var tab_text = "<table border='1px'><tr bgcolor='#87AFC6'>";
        var textRange;
        var j = 0;
        tab = document.getElementById('reporttable'); // id of table

        for (j = 0; j < tab.rows.length; j++) {
            tab_text = tab_text + tab.rows[j].innerHTML + "</tr>";
        }

        tab_text = tab_text + "</table>";
        tab_text = tab_text.replace(/<A[^>]*>|<\/A>/g, "");
        tab_text = tab_text.replace(/<img[^>]*>/gi, "");
        tab_text = tab_text.replace(/<input[^>]*>|<\/input>/gi, "");

        var ua = window.navigator.userAgent;
        var msie = ua.indexOf("MSIE ");

        if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
            txtArea1.document.open("txt/html", "replace");
            txtArea1.document.write(tab_text);
            txtArea1.document.close();
            txtArea1.focus();
            sa = txtArea1.document.execCommand("SaveAs", true, "Say Thanks to Sumit.xls");
        } else {
            sa = window.open('data:application/vnd.ms-excel,' + encodeURIComponent(tab_text));
        }
        return (sa);
    }
 function getData(){
                //alert('getData');
                
                var ptype = $("#ptype").val();
                //alert('ptype=>'+ptype);
                
                if(ptype === null || ptype === ''){
                   $('#ptypeErr').append('Placement Type is required.');
                   $('#ptypeErr').css('color','red');
                }else{
                    var plcmtYear = $("#plcmtYear").val();
                        getPlcmtTypeAndYearData(ptype,plcmtYear);
                }
                
               
            }
            function getPlcmtTypeAndYearData(ptype,plcmtYear){
                //alert('getPlcmtTypeData ptype->'+ptype);
               // alert('getPlcmtTypeData plcmtYear->'+plcmtYear);
                
                $("#reportdiv").append('');
                
                if(ptype === 'Job' || ptype === 'OJ'){
                    
                    $("#reportthead").empty();
                    $("#reportthead").append('<tr>'
                            +'<td style="background-color: black;color: white;">ADMISSION NUMBER</td>'
                            +'<td style="background-color: black;color: white;">TRAINEE NAME</td>'
                            +'<td style="background-color: black;color: white;">PLACEMENT YEAR</td>'
                            +'<td style="background-color: black;color: white;">COMPANY NAME</td>'
                            +'<td style="background-color: black;color: white;">POST NAME</td>'
                            +'<td style="background-color: black;color: white;">SALARY</td>'
                            +'<td style="background-color: black;color: white;">HR MOBILE NO</td>'
                            +'<td style="background-color: black;color: white;">STATE NAME</td>'
                            +'<td style="background-color: black;color: white;">DIST NAME</td>'
                            +'<td style="background-color: black;color: white;">ADDRESS</td>'
                            +'<td style="background-color: black;color: white;">SCHEDULE INFO</td>'
                            +'<td style="background-color: black;color: white;">ACTIONS</td>'
                    +'</tr>');
                    
                    $.ajax({
                        type: 'get',
                        url: baseUrl+'api/plcmt/getItiReportJob?ptype='+ptype+'&entryBy='+insCode+'&plcmtYear='+plcmtYear,
                        cache: false,
                        timeout: 600000,
                        success: function(resp){
                           // alert("success=>"+JSON.stringify(resp));
                            $("#reportbody").empty();
                            
                            for(var i=0;i<resp.length;i++){
                                var bean = resp[i];
                                
                                var plcmtyear = '';
                                if(bean.plcmt_year == null){ plcmtyear = ''; }
                                else{ plcmtyear = bean.plcmt_year; }
                                
                                var schedule = '';
                                if(bean.schedule == null){ schedule = ''; }
                                else{ schedule = bean.schedule; }
                                
                                $("#reportbody").append('<tr>'
                                +'<td>'+bean.adm_num+'</td>'
                                +'<td>'+bean.name+'</td>'
                                +'<td>'+plcmtyear+'</td>'
                                +'<td>'+bean.pname_of_company+'</td>'
                                +'<td>'+bean.ppostname+'</td>'
                                +'<td>'+bean.psalary+'</td>'
                                +'<td>'+bean.phrno+'</td>'
                                +'<td>'+bean.statename+'</td>'
                                +'<td>'+bean.distname+'</td>'
                                +'<td>'+bean.paddress+'</td>'
                                +'<td>'+schedule+'</td>'
                                +'<td><div class="d-flex">'
//                                +'<button class="btn btn-sm btn-info m-1" onclick="return editData(\''+bean.pid+'\')">EDIT</button>'
                                +'<button class="btn btn-sm btn-danger m-1" onclick="return deleteData(\''+bean.pid+'\')">DELETE</button>'
                                +'</div></td>'
                                +'</tr>');
                            }
                        },
                        error: function(error){
                            alert('Something went wrong while getting Job related data.');
                        }
                        
                    });
                }
                if(ptype === 'Apprenticeship' || ptype === 'OA'){
                    $.ajax({
                        type: 'get',
                        url: baseUrl+'api/plcmt/getItiReportAppr?entryBy='+insCode+'&ptype='+ptype+'&plcmtYear='+plcmtYear,
                        cache: false,
                        timeout: 600000,
                        success: function(resp){
                            //alert("success=>"+JSON.stringify(resp));
                            $("#reportthead").empty();
                            $("#reportthead").append('<tr>'
                            +'<td style="background-color: black;color: white;">ADMISSION NUMBER</td>'
                            +'<td style="background-color: black;color: white;">TRAINEE NAME</td>'
                            +'<td style="background-color: black;color: white;">PLACEMENT YEAR</td>'
                            +'<td style="background-color: black;color: white;">COMPANY NAME</td>'
                            +'<td style="background-color: black;color: white;">TRADE NAME</td>'
                            +'<td style="background-color: black;color: white;">STIPHEND AMOUNT</td>'
                            +'<td style="background-color: black;color: white;">HR MOBILE NO</td>'
                            +'<td style="background-color: black;color: white;">APPRENTICESHIP START DATE</td>'
                            +'<td style="background-color: black;color: white;">APPRENTICESHIP END DATE</td>'
                            +'<td style="background-color: black;color: white;">STATE NAME</td>'
                            +'<td style="background-color: black;color: white;">DIST NAME</td>'
                            +'<td style="background-color: black;color: white;">ADDRESS</td>'
                            +'<td style="background-color: black;color: white;">SCHEDULE INFO</td>'
                            +'<td style="background-color: black;color: white;">ACTIONS</td>'
                            +'</tr>');
                            
                            $("#reportbody").empty();
                            for(var j=0;j<resp.length;j++){
                                var beann = resp[j];
//                                alert("bean=>"+JSON.stringify(beann));
                                var plcmtyearr = '';
                                if(beann.plcmt_year === null){ plcmtyearr = ''; }
                                else{ plcmtyearr = beann.plcmt_year; }
                                
                                var schedulee = '';
                                if(beann.schedule === null){ schedulee = ''; }
                                else{ schedulee = beann.schedule; }
                                
                                $("#reportbody").append('<tr>'
                                +'<td>'+beann.adm_num+'</td>'
                                +'<td>'+beann.name+'</td>'
                                +'<td>'+plcmtyearr+'</td>'
                                +'<td>'+beann.pname_of_company+'</td>'
                                +'<td>'+beann.trade_name+'</td>'
                                +'<td>'+beann.pstipendamt+'</td>'
                                +'<td>'+beann.phrno+'</td>'
                                +'<td>'+beann.paaprstartdate+'</td>'
                                +'<td>'+beann.paaprenddate+'</td>'
                                +'<td>'+beann.statename+'</td>'
                                +'<td>'+beann.distname+'</td>'
                                +'<td>'+beann.paddress+'</td>'
                                +'<td>'+schedulee+'</td>'
                                +'<td><div class="d-flex">'
                               // +'<button class="btn btn-sm btn-info m-1" onclick="return editData(\''+beann.pid+'\')">EDIT</button>'
                                +'<button class="btn btn-sm btn-danger m-1" onclick="return deleteData(\''+beann.pid+'\')">DELETE</button>'
                                +'</div></td>'
                                +'</tr>');
                            }
                        },
                        error: function(error){
                            alert('Something went wrong while getting Apprenticeship related data.');
                        }
                        
                    });
                }
                if(ptype === 'HigherEducation'){
                    $.ajax({
                        type: 'get',
                       url: baseUrl+'api/plcmt/getItiReportHighEdu?iticode='+insCode+'&ptype='+ptype+'&plcmtYear='+plcmtYear,
                        cache: false,
                        timeout: 600000,
                        success: function(resp){
                            //alert("success=>"+JSON.stringify(resp));
                            $("#reportthead").empty();
                            $("#reportthead").append('<tr>'
                            +'<td style="background-color: black;color: white;">ADMISSION NUMBER</td>'
                            +'<td style="background-color: black;color: white;">TRAINEE NAME</td>'
                            //+'<td style="background-color: black;color: white;">PLACEMENT YEAR</td>'
                            +'<td style="background-color: black;color: white;">COURSE NAME</td>'
                            +'<td style="background-color: black;color: white;">COLLEGE NAME</td>'
                            +'<td style="background-color: black;color: white;">STATE NAME</td>'
                            +'<td style="background-color: black;color: white;">DIST NAME</td>'
                            +'<td style="background-color: black;color: white;">ADDRESS</td>'
                            +'<td style="background-color: black;color: white;">ACTIONS</td>'
                            +'</tr>');
                            $("#reportbody").empty();
                            for(var j=0;j<resp.length;j++){
                                var beann = resp[j];
                                //alert("bean=>"+JSON.stringify(bean));
                                //var plcmtyearr = '';
                                //if(beann.plcmt_year === null){ plcmtyearr = ''; }
                                //else{ plcmtyearr = beann.plcmt_year; }
                                
                                $("#reportbody").append('<tr>'
                                +'<td>'+beann.adm_num+'</td>'
                                +'<td>'+beann.name+'</td>'
                               // +'<td>'+plcmtyearr+'</td>'
                                +'<td>'+beann.pcoursename+'</td>'
                                +'<td>'+beann.pclgname+'</td>'
                                +'<td>'+beann.statename+'</td>'
                                +'<td>'+beann.distname+'</td>'
                                +'<td>'+beann.paddress+'</td>'
                                +'<td><div class="d-flex">'
                                //+'<button class="btn btn-sm btn-info m-1" onclick="return editData(\''+beann.pid+'\')">EDIT</button>'
                                +'<button class="btn btn-sm btn-danger m-1" onclick="return deleteData(\''+beann.pid+'\')">DELETE</button>'
                                +'</div></td>'
                                +'</tr>');
                            }
                        },
                        error: function(error){
                            alert('Something went wrong while getting Higher Education related data.');
                        }
                    });
                }
                if(ptype === 'SelfEmployment'){
                    $.ajax({
                        type: 'get',
                        url: baseUrl+'api/plcmt/getItiReportSelfEmp?iticode='+insCode+'&ptype='+ptype+'&plcmtYear='+plcmtYear,
                        cache: false,
                        timeout: 600000,
                        success: function(resp){
                            //alert("success=>"+JSON.stringify(resp));
                            $("#reportthead").empty();
                            $("#reportthead").append('<tr>'
                            +'<td style="background-color: black;color: white;">ADMISSION NUMBER</td>'
                            +'<td style="background-color: black;color: white;">TRAINEE NAME</td>'
                            //+'<td style="background-color: black;color: white;">PLACEMENT YEAR</td>'
                            +'<td style="background-color: black;color: white;">SELF EMPLOYEE NAME</td>'
                            +'<td style="background-color: black;color: white;">MONTHLY INCOME</td>'
                            +'<td style="background-color: black;color: white;">STATE NAME</td>'
                            +'<td style="background-color: black;color: white;">DIST NAME</td>'
                            +'<td style="background-color: black;color: white;">ADDRESS</td>'
                            +'<td style="background-color: black;color: white;">ACTIONS</td>'
                            +'</tr>');
                            $("#reportbody").empty();
                            for(var j=0;j<resp.length;j++){
                                var beann = resp[j];
                                //alert("bean=>"+JSON.stringify(bean));
                                //var plcmtyearr = '';
                                //if(beann.plcmt_year === null){ plcmtyearr = ''; }
                                //else{ plcmtyearr = beann.plcmt_year; }
                                
                                $("#reportbody").append('<tr>'
                                +'<td>'+beann.adm_num+'</td>'
                                +'<td>'+beann.name+'</td>'
                               // +'<td>'+plcmtyearr+'</td>'
                                +'<td>'+beann.pselfemp+'</td>'
                                +'<td>'+beann.pmonthincome+'</td>'
                                +'<td>'+beann.statename+'</td>'
                                +'<td>'+beann.distname+'</td>'
                                +'<td>'+beann.paddress+'</td>'
                                +'<td><div class="d-flex">'
                               // +'<button class="btn btn-sm btn-info m-1" onclick="return editData(\''+beann.pid+'\')">EDIT</button>'
                                +'<input type="button" class="btn btn-sm btn-danger m-1" value="DELETE" onclick="return deleteData(\''+beann.pid+'\')" />'
                                +'</div></td>'
                                +'</tr>');
                            }
                        },
                        error: function(error){
                            alert('Something went wrong while getting Self Employment related data.');
                        }
                    });
                }
            }
             
            
            function doErrNull(a){
                //alert(a)
                document.getElementById(a).innerHTML = '';
            }
            
            
function deleteData(pid){
	alert('deleteData->pid->'+pid);
	
	if(confirm('Are you sure about to delete the data.')){
		//alert('if');
		var encodePid = encodeBase64(pid);
		//alert('encodePid->pid->'+encodePid);
		
		$.ajax({
			type: 'delete',
			url: baseUrl+'api/plcmt/deletePlcmts?pid='+encodePid,
			headers: { 'Authorization' : jwtToken},
			cache: false,
			timeout: 600000,
			success: function(resp){
				alert('deletePlcmts->success->'+JSON.stringify(resp));
				//alert(resp);
				getData();
			},
			error: function(resp){
				alert('deletePlcmts->error->'+JSON.stringify(resp));
				//alert(resp.responseText);
			}
		});
		return false;
	}else{
		//alert('else');
	}
}

function editData(pid){
	//alert('industryId=>'+industryId);
	let base64String = encodeBase64(pid);
		//alert('base64String=>'+base64String);
	 	document.forms[0].action=`./editPlcmts?pid=${base64String}`;
		document.forms[0].submit();
}