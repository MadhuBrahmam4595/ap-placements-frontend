/**
 * 
 */


            let allData = null;
            let getMastersData = null;
            
            function getMastersDataData() {
                $.ajax({
                    type: "get",
                    contentType: "application/json",
                    url: baseUrl+"masterdata/getMastersData",
                    cache: false,
                    timeout: 600000,
                    success: function (data) {
                       // alert("getMastersData=>"+JSON.stringify(data.trades));
                        getMastersData = data;
                    },
                    error: function (data) {
                        alert("Master Data is not loaded");

                    }
                });
            }

            //getPlacementDetails
            function getPlacementDetails() {
                $.ajax({
                    type: 'POST',
                    contentType: 'application/json',
                    url: baseUrl+"api/plcmt/getAllPlcmts",
                    headers: { 'Authorization': jwtToken},
                    cache: false,
                    timeout: 600000,
                    success: function (data) {
                        //alert("success"+JSON.stringify(data));
                        //alert(JSON.stringify(data));
                        allData = data;
                        for (i = 0; i < data.length; i++) {
                            var bean = data[i];

                            if (bean.ptype === 'HigherEducation' || bean.ptype === 'SelfEmployment') {
                                if (bean.dist_code === ins_code) {
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
                                    
                                    var trade_name;
                                    trade_name = bean.ptrade === null ? "NA" : bean.ptrade;

                                    for (var t = 0, len = getMastersData.trades.length; t < len; ++t) {
                                        var trade = getMastersData.trades[t];
                                        if (bean.ptrade == trade.tradeCode) {
                                            trade_name = trade.tradeName;
                                        }
                                    }

                                    $("#tbody").append('\n\
                                                <tr>\n\
                                                <td>' + bean.name + '</td><td>' + bean.adm_num + '</td><td>' + bean.ptype + '</td>\n\
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
                                                <td>' + bean.paddress + '</td> </tr>                \n\
                                            ');
                                }
                            }
                            if (bean.ptype === 'Job' || bean.ptype === 'Apprenticeship' || bean.ptype === 'OJ' || bean.ptype === 'OA') {
                                if (bean.entry_distcode === ins_code) {

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
                                    
                                    var trade_name;
                                    trade_name = bean.ptrade === null ? "NA" : bean.ptrade;

                                    for (var t = 0, len = getMastersData.trades.length; t < len; ++t) {
                                        var trade = getMastersData.trades[t];
                                        if (bean.ptrade == trade.tradeCode) {
                                            trade_name = trade.tradeName;
                                        }
                                    }
                                    
                                    var ptypee;
                                    if(bean.ptype === 'OA'){
                                        ptypee = 'Other than Apprenticeship';
                                    }
                                    else if(bean.ptype === 'OJ'){
                                        ptypee = 'Other than Job';
                                    }else{
                                        ptypee = bean.ptype;
                                    }

                                    $("#tbody").append('\n\
                                                <tr>\n\
                                                <td>' + bean.name + '</td><td>' + bean.adm_num + '</td><td>' + ptypee + '</td>\n\
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
                                                <td>' + bean.paddress + '</td> </tr>                \n\
                                            ');
                                }
                            }
                        }
                    }
                });
            }


            function itiData() {

                var iti_code = $("#iti_code").val();
                var ins_code = $('#ins_code').val();
                
               // alert("iti_code=>" + iti_code);
                //alert("ins_code=>" + ins_code);
                
                if (iti_code === 'all') {
                    getPlacementDetails();
                }

                $("#tbody").empty();

                for (i = 0; i < allData.length; i++) {

                    var bean = allData[i];

                    if (bean.ptype === 'Job' || bean.ptype === 'Apprenticeship' || 
                            bean.ptype === 'OJ' || bean.ptype === 'OA') {
                        if (bean.entry_by === iti_code && bean.entry_distcode === ins_code) {
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
                            var trade_name;
                            trade_name = bean.ptrade === null ? "NA" : bean.ptrade;
                            for (var t = 0, len = getMastersData.trades.length; t < len; ++t) {
                                var trade = getMastersData.trades[t];
                                if (parseInt(bean.ptrade) === trade.tradeCode) {
                                    trade_name = trade.tradeName;
                                }
                            }
                            
                            var ptypee;
                            if(bean.ptype === 'OA'){
                                ptypee = 'Other than Apprenticeship';
                            }
                            else if(bean.ptype === 'OJ'){
                                ptypee = 'Other than Job';
                            }else{
                                ptypee = bean.ptype;
                            }

                            $("#tbody").append('\n\
                                        <tr>\n\
                                        <td>' + bean.name + '</td><td>' + bean.adm_num + '</td><td>' + ptypee + '</td>\n\
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
                                        <td>' + bean.paddress + '</td> </tr>                \n\
                                    ');
                        }
                    }

                    if (bean.ptype === 'HigherEducation' || bean.ptype === 'SelfEmployment') {
                        if (bean.iti_code === iti_code && bean.dist_code === ins_code) {
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
                            var trade_name;
                            trade_name = bean.ptrade === null ? "NA" : bean.ptrade;
                            for (var t = 0, len = getMastersData.trades.length; t < len; ++t) {
                                var trade = getMastersData.trades[t];
                                if (parseInt(bean.ptrade) === trade.trade_code) {
                                    trade_name = trade.trade_name;
                                }
                            }

                            $("#tbody").append('\n\
                                        <tr>\n\
                                        <td>' + bean.name + '</td><td>' + bean.adm_num + '</td><td>' + bean.ptype + '</td>\n\
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
                                        <td>' + bean.paddress + '</td> </tr>                \n\
                                    ');
                        }
                    }
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
    $(document).ready(function(){
	
		populateYearDropdown();
		
        $.ajax({
            type: 'get',
            url: baseUrl+'masterdata/getItisInADist',
            headers: { 'Authorization': jwtToken},
            cache: false,
            timeout: 600000,
            success: function(resp){
               // alert("resp=>"+JSON.stringify(resp));
                for(var i=0;i<resp.length;i++){
                    var bean = resp[i];
                    $("#iti_code").append('<option value="'+bean.itiCode+'">'+bean.itiName+'('+bean.itiCode+')</option>');
                }
            },
            error: function(resp){
                alert('Problem Occured While getting ITI names in your district.');
            }
        });
    });
    function doErrNull(a){
        //alert(a)
        document.getElementById(a).innerHTML = '';
    }
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
    function getReport(){
       // alert('getReport');
        
        var ptype = $("#ptype").val();
        //alert('ptype=>'+ptype);
        
        var plcmtYear = $("#plcmtYear").val();
        var iti_code = $("#iti_code").val();
                
        if(ptype === null || ptype === ''){
            $('#ptypeErr').append('Placement Type is required.');
            $('#ptypeErr').css('color','red');
        }else{
            getDistLevelPlcmtReport(ptype,insCode,plcmtYear,iti_code);
        }
    }
    function getDistLevelPlcmtReport(ptype,insCode,plcmtYear,iti_code){
       // alert('getDistLevelPlcmtReport-ptype->'+ptype+',insCode->'+insCode);
        
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
                    +'</tr>');
                    
                    $.ajax({
                        type: 'get',
                        url: baseUrl+'api/plcmt/getDistReportJobAndOJ?distCode='+insCode+'&ptype='+ptype+'&plcmtYear='+plcmtYear+'&itiCode='+iti_code,
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
                        url: baseUrl+'api/plcmt/getDistReportAppreAndOA?distCode='+insCode+'&ptype='+ptype+'&plcmtYear='+plcmtYear+'&itiCode='+iti_code,
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
                            +'</tr>');
                            
                            $("#reportbody").empty();
                            for(var j=0;j<resp.length;j++){
                                var beann = resp[j];
                                //alert("bean=>"+JSON.stringify(bean));
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
                        url: baseUrl+'api/plcmt/getDistReportHighEdu?itiCode='+iti_code+'&ptype='+ptype+'&plcmtYear='+plcmtYear+'&distCode='+insCode,
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
                        url: baseUrl+'api/plcmt/getDistReportSelfEmp?itiCode='+iti_code+'&ptype='+ptype+'&plcmtYear='+plcmtYear+'&distCode='+insCode,
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
                                +'</tr>');
                            }
                        },
                        error: function(error){
                            alert('Something went wrong while getting Self Employment related data.');
                        }
                    });
                }
    }
