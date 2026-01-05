 
            
            $(document).ready(function () {
                //alert("get ready");
                //alert("alert=>"+jwtToken);
                $("#datadiv").hide();
                $("#spinnersdiv").hide();

                $.ajax({
                    type: "post",
                    url: baseUrl+"api/plcmt/getPlcmtYearWiseReport",
                    headers: { 'Authorization': jwtToken},
                    cache: false,
                    success: function (resp) {
                        //alert("resp=>"+resp.length);
                        // alert("resp=>"+JSON.stringify(resp));

                        let jobTotal = 0, otherthanjobTotal = 0;
                                let apprTotal = 0, otherthanapprTotal = 0;
                                let higherTotal = 0;
                                let selfTotal = 0;
                                var count=0;
                                for (var i = 0; i < resp.length; i++) {
                            var bean = resp[i];

                            jobTotal = jobTotal + parseInt(bean.job);
                            apprTotal = apprTotal + parseInt(bean.apprenticeship);
                            higherTotal = higherTotal + parseInt(bean.higherEducation);
                            selfTotal = selfTotal + parseInt(bean.selfEmployment);
                            otherthanjobTotal = otherthanjobTotal + parseInt(bean.oj);
                            otherthanapprTotal = otherthanapprTotal + parseInt(bean.oa);
                            count = count + 1;
                            $("#tbodyyy").append('<tr>'
                                    + '<td style="color: black; font-weight: bolder;">' + count + '</td>'
                                    + '<td style="color: black; font-weight: bolder;">' + bean.passyear + '</td>'
                                    + '<td style="text-align: right;"><a href="javascript:getData(\'' + bean.passyear + '\',\'Job\',\'' + bean.job + '\')">' + bean.job + '</a></td>'
                                    + '<td style="text-align: right;"><a href="javascript:getData(\'' + bean.passyear + '\',\'OJ\',\'' + bean.oj + '\')">' + bean.oj + '</a></td>'
                                    + '<td style="text-align: right;"><a href="javascript:getData(\'' + bean.passyear + '\',\'Apprenticeship\',\'' + bean.apprenticeship + '\')">' + bean.apprenticeship + '</a></td>'
                                    + '<td style="text-align: right;"><a href="javascript:getData(\'' + bean.passyear + '\',\'OA\',\'' + bean.oa + '\')">' + bean.oa + '</a></td>'
                                    + '<td style="text-align: right;"><a href="javascript:getData(\'' + bean.passyear + '\',\'HigherEducation\',\'' + bean.higherEducation + '\')">' + bean.higherEducation + '</a></td>'
                                    + '<td style="text-align: right;"><a href="javascript:getData(\'' + bean.passyear + '\',\'SelfEmployment\',\'' + bean.selfEmployment + '\')">' + bean.selfEmployment + '</a></td>'
                                    + '<td style="text-align: right;">' + bean.total + '</td>'
                                    + '</tr>');

                        }
                    },
                    error: function (resp) {
//                        alert("error");
//                        alert(JSON.stringify(resp));
                    }
                });
            });

            function getData(passyear, ptype, count) {
                //alert("passyear=>"+passyear+",ptype=>"+ptype+",count=>"+count);
                $("#datadiv").show();
                $("#containertable").hide();

                if (count <= 0) {
                    alert("No data available for showing.");
                } else {
                    //alert("else");
                    if (ptype === 'Job') {
                        $("#reportthead").empty();
                        document.getElementById('datainfo').innerHTML = 'Pass Year - <b>' + passyear + '<b>&nbsp;&nbsp;&nbsp;Placement Type - <b>Job</b>&nbsp;&nbsp;&nbsp;No of Records - ' + count;
                        $("#reportthead").append('<tr>'
                        + '<td style="background-color: black;color: white;" rowspan="2">S.NO</td>'
                        + '<td style="background-color: black;color: white;" align="center" colspan="8" >ADMISSION DETAILS</td>'
                        + '<td style="background-color: black;color: white;" align="center"></td>'
                        + '<td style="background-color: black;color: white;" align="center" colspan="12" >PLACEMENTS DETAILS</td>'
                        + '</tr>');
                        $("#reportthead").append('<tr>'
                                + '<td style="background-color: black;color: white;">DISTRICT</td>'
                                + '<td style="background-color: black;color: white;">ITI</td>'
                                + '<td style="background-color: black;color: white;">NAME</td>'
                                + '<td style="background-color: black;color: white;">ADMISSION NUMBER</td>'
                                + '<td style="background-color: black;color: white;">TRADE</td>'
                                + '<td style="background-color: black;color: white;">YEAR OF ADMISSION</td>'
                                + '<td style="background-color: black;color: white;">PASS YEAR</td>'
                                + '<td style="background-color: black;color: white;">PASS MONTH</td>'
                        
                                + '<td style="background-color: black;color: white;"></td>'
                        
                                + '<td style="background-color: black;color: white;">DISTRICT</td>'
                                + '<td style="background-color: black;color: white;">ITI</td>'
                                + '<td style="background-color: black;color: white;">ID</td>'
                                + '<td style="background-color: black;color: white;">PLACEMENT YEAR</td>'
                                + '<td style="background-color: black;color: white;">COMPANY NAME</td>'
                                + '<td style="background-color: black;color: white;">POST NAME</td>'
                                + '<td style="background-color: black;color: white;">SALARY</td>'
                                + '<td style="background-color: black;color: white;">HR MOBILE NO</td>'
                                + '<td style="background-color: black;color: white;">STATE NAME</td>'
                                + '<td style="background-color: black;color: white;">DIST NAME</td>'
                                + '<td style="background-color: black;color: white;">ADDRESS</td>'
                                + '<td style="background-color: black;color: white;">SCHEDULE INFO</td>'
                                + '</tr>');
                        $("#spinnersdiv").show();
                        $.ajax({
                            type: 'get',
                            url: baseUrl+'api/plcmt/getPlcmtsByPtypeAndPassyear?ptype=' + ptype + '&passyear=' + passyear,
                            headers: { 'Authorization': jwtToken},
                            cache: false,
                            timeout: 600000,
                            success: function (resp) {
                                // alert("success=>" + resp[0]);
                                //alert("resp=>"+JSON.stringify(resp));
                                $("#reportbody").empty();
                                $("#spinnersdiv").hide();
                                var count = 0;
                                for (var i = 0; i < resp.length; i++) {
                                    var bean = resp[i];
                                    count = count + 1;
                                    $("#reportbody").append('<tr>'
                                            + '<td>' + count + '</td>'
                                            + '<td>' + bean.dist_name + '</td>'
                                            + '<td>' + bean.iti_name + '</td>'
                                            + '<td>' + bean.name + '</td>'
                                            + '<td>' + bean.adm_num + '</td>'
                                            + '<td>' + bean.trade_name + '</td>'
                                            + '<td>' + bean.year_of_admission + '</td>'
                                            + '<td>' + bean.passyear + '</td>'
                                            + '<td>' + bean.passmonth + '</td>'
                                            
                                            +'<td></td>'
                                            
                                            + '<td>' + bean.entry_distcode + '</td>'
                                            + '<td>' + bean.entry_by + '</td>'
                                            + '<td>' + bean.pid + '</td>'
                                            + '<td>' + bean.plcmtYear + '</td>'
                                            + '<td>' + bean.pname_of_company + '</td>'
                                            + '<td>' + bean.ppostname + '</td>'
                                            + '<td>' + bean.psalary + '</td>'
                                            + '<td>' + bean.phrno + '</td>'
                                            + '<td>' + bean.pstate + '</td>'
                                            + '<td>' + bean.distsStatewise.distname + '</td>'
                                            + '<td>' + bean.paddress + '</td>'
                                            + '<td>' + bean.scheduleId + '</td>'
                                            + '</tr>');
                                }
                            },
                            error: function (error) {
                                alert('Something went wrong while getting Job related data.');
                            }

                        });
                    }
                    if (ptype === 'OJ') {
                        $("#reportthead").empty();
                        document.getElementById('datainfo').innerHTML = 'Pass Year - <b>' + passyear + '<b>&nbsp;&nbsp;&nbsp;Placement Type - <b>Other than Job</b>&nbsp;&nbsp;&nbsp;No of Records - ' + count;
                        $("#reportthead").append('<tr>'
                        + '<td style="background-color: black;color: white;" rowspan="2">S.NO</td>'
                        + '<td style="background-color: black;color: white;" align="center" colspan="8" >ADMISSION DETAILS</td>'
                        + '<td style="background-color: black;color: white;" align="center"></td>'
                        + '<td style="background-color: black;color: white;" align="center" colspan="12" >PLACEMENTS DETAILS</td>'
                        + '</tr>');
                        $("#reportthead").append('<tr>'
                                + '<td style="background-color: black;color: white;">DISTRICT</td>'
                                + '<td style="background-color: black;color: white;">ITI</td>'
                                + '<td style="background-color: black;color: white;">NAME</td>'
                                + '<td style="background-color: black;color: white;">ADMISSION NUMBER</td>'
                                + '<td style="background-color: black;color: white;">TRADE</td>'
                                + '<td style="background-color: black;color: white;">YEAR OF ADMISSION</td>'
                                + '<td style="background-color: black;color: white;">PASS YEAR</td>'
                                + '<td style="background-color: black;color: white;">PASS MONTH</td>'
                        
                                + '<td style="background-color: black;color: white;"></td>'
                        
                                + '<td style="background-color: black;color: white;">DISTRICT</td>'
                                + '<td style="background-color: black;color: white;">ITI</td>'
                                + '<td style="background-color: black;color: white;">ID</td>'
                                + '<td style="background-color: black;color: white;">PLACEMENT YEAR</td>'
                                + '<td style="background-color: black;color: white;">COMPANY NAME</td>'
                                + '<td style="background-color: black;color: white;">POST NAME</td>'
                                + '<td style="background-color: black;color: white;">SALARY</td>'
                                + '<td style="background-color: black;color: white;">HR MOBILE NO</td>'
                                + '<td style="background-color: black;color: white;">STATE NAME</td>'
                                + '<td style="background-color: black;color: white;">DIST NAME</td>'
                                + '<td style="background-color: black;color: white;">ADDRESS</td>'
                                + '<td style="background-color: black;color: white;">SCHEDULE INFO</td>'
                                + '</tr>');
                        $("#spinnersdiv").show();
                        $.ajax({
                            type: 'get',
                            url: baseUrl+'api/plcmt/getPlcmtsByPtypeAndPassyear?ptype=' + ptype + '&passyear=' + passyear,
                            headers: { 'Authorization': jwtToken},
                            cache: false,
                            timeout: 600000,
                            success: function (resp) {
                                //alert("success=>" + JSON.stringify(resp));
                                $("#reportbody").empty();
                                $("#spinnersdiv").hide();
                                var count = 0;
                                for (var i = 0; i < resp.length; i++) {
                                    var bean = resp[i];
                                    count = count + 1;
                                    $("#reportbody").append('<tr>'
                                            + '<td>' + count + '</td>'
                                    
                                            + '<td>' + bean.dist_name + '</td>'
                                            + '<td>' + bean.iti_name + '</td>'
                                            + '<td>' + bean.name + '</td>'
                                            + '<td>' + bean.adm_num + '</td>'
                                            + '<td>' + bean.trade_name + '</td>'
                                            + '<td>' + bean.year_of_admission + '</td>'
                                            + '<td>' + bean.passyear + '</td>'
                                            + '<td>' + bean.passmonth + '</td>'
                                    
                                            +'<td></td>'
                                    
                                            + '<td>' + bean.entry_distcode + '</td>'
                                            + '<td>' + bean.entry_by + '</td>'
                                            + '<td>' + bean.pid + '</td>'
                                            + '<td>' + bean.plcmtYear + '</td>'
                                            + '<td>' + bean.pname_of_company + '</td>'
                                            + '<td>' + bean.ppostname + '</td>'
                                            + '<td>' + bean.psalary + '</td>'
                                            + '<td>' + bean.phrno + '</td>'
                                            + '<td>' + bean.pstate + '</td>'
                                            + '<td>' + bean.distsStatewise.distname + '</td>'
                                            + '<td>' + bean.paddress + '</td>'
                                            + '<td>' + bean.scheduleId + '</td>'
                                            + '</tr>');
                                }
                            },
                            error: function (error) {
                                alert('Something went wrong while getting Job related data.');
                            }

                        });
                    }
                    if (ptype === 'Apprenticeship') {

                        $("#reportthead").empty();
                        document.getElementById('datainfo').innerHTML = 'Pass Year - <b>' + passyear + '<b>&nbsp;&nbsp;&nbsp;Placement Type - <b>Apprenticeship</b>&nbsp;&nbsp;&nbsp;No of Records - ' + count;
                        $("#spinnersdiv").show();
                        $("#reportthead").append('<tr>'
                        + '<td style="background-color: black;color: white;" rowspan="2">S.NO</td>'
                        + '<td style="background-color: black;color: white;" align="center" colspan="8" >ADMISSION DETAILS</td>'
                        + '<td style="background-color: black;color: white;" align="center"></td>'
                        + '<td style="background-color: black;color: white;" align="center" colspan="12" >PLACEMENTS DETAILS</td>'
                        + '</tr>');
                        $("#reportthead").append('<tr>'
                                + '<td style="background-color: black;color: white;">DISTRICT</td>'
                                + '<td style="background-color: black;color: white;">ITI</td>'
                                + '<td style="background-color: black;color: white;">NAME</td>'
                                + '<td style="background-color: black;color: white;">ADMISSION NUMBER</td>'
                                + '<td style="background-color: black;color: white;">TRADE</td>'
                                + '<td style="background-color: black;color: white;">YEAR OF ADMISSION</td>'
                                + '<td style="background-color: black;color: white;">PASS YEAR</td>'
                                + '<td style="background-color: black;color: white;">PASS MONTH</td>'
                        
                                + '<td style="background-color: black;color: white;"></td>'
                        
                                + '<td style="background-color: black;color: white;">DISTRICT</td>'
                                + '<td style="background-color: black;color: white;">ITI</td>'
                                + '<td style="background-color: black;color: white;">ID</td>'
                                + '<td style="background-color: black;color: white;">PLACEMENT YEAR</td>'
                                + '<td style="background-color: black;color: white;">COMPANY NAME</td>'
                                + '<td style="background-color: black;color: white;">PLACEMENT TRADE NAME</td>'
                                + '<td style="background-color: black;color: white;">STIPHEND AMOUNT</td>'
                                + '<td style="background-color: black;color: white;">HR MOBILE NO</td>'
                                + '<td style="background-color: black;color: white;">APPRENTICESHIP START DATE</td>'
                                + '<td style="background-color: black;color: white;">APPRENTICESHIP END DATE</td>'
                                + '<td style="background-color: black;color: white;">STATE NAME</td>'
                                + '<td style="background-color: black;color: white;">DIST NAME</td>'
                                + '<td style="background-color: black;color: white;">ADDRESS</td>'
                                + '<td style="background-color: black;color: white;">SCHEDULE INFO</td>'
                                + '</tr>');
                        $.ajax({
                            type: 'get',
                            url: baseUrl+'api/plcmt/getPlcmtsByPtypeAndPassyear?ptype=' + ptype + '&passyear=' + passyear,
                            headers: { 'Authorization': jwtToken},
                            cache: false,
                            timeout: 600000,
                            success: function (resp) {
                                //alert("success=>"+JSON.stringify(resp));
                                $("#reportbody").empty();
                                $("#spinnersdiv").hide();
                                var count = 0;
                                for (var j = 0; j < resp.length; j++) {
                                    var beann = resp[j];
                                   // alert("bean=>"+JSON.stringify(beann));
                                    count = count + 1;
                                    $("#reportbody").append('<tr>'
                                    
                                    + '<td>' + count + '</td>'
                                    
                                            + '<td>' + beann.dist_name + '</td>'
                                            + '<td>' + beann.iti_name + '</td>'
                                            + '<td>' + beann.name + '</td>'
                                            + '<td>' + beann.adm_num + '</td>'
                                            + '<td>' + beann.trade_name + '</td>'
                                            + '<td>' + beann.year_of_admission + '</td>'
                                            + '<td>' + beann.passyear + '</td>'
                                            + '<td>' + beann.passmonth + '</td>'
                                    
                                            +'<td></td>'
                                    
                                            + '<td>' + beann.entry_distcode + '</td>'
                                            + '<td>' + beann.entry_by + '</td>'
                                            + '<td>' + beann.pid + '</td>'
                                            + '<td>' + beann.plcmtYear + '</td>'
                                            + '<td>' + beann.pname_of_company + '</td>'
                                            + '<td>' + beann.trade_name + '</td>'
                                            + '<td>' + beann.pstipendamt + '</td>'
                                            + '<td>' + beann.phrno + '</td>'
                                            + '<td>' + beann.paaprstartdate + '</td>'
                                            + '<td>' + beann.paaprenddate + '</td>'
                                            + '<td>' + beann.pstate + '</td>'
                                            + '<td>' + beann.distsStatewise.distname + '</td>'
                                            + '<td>' + beann.paddress + '</td>'
                                            + '<td>' + beann.scheduleId + '</td>'
                                            + '</tr>');
                                }
                            },
                            error: function (error) {
                                alert('Something went wrong while getting Apprenticeship related data.');
                            }

                        });
                    }
                    if (ptype === 'OA') {
                        $("#reportthead").empty();
                        document.getElementById('datainfo').innerHTML = 'Pass Year - <b>' + passyear + '<b>&nbsp;&nbsp;&nbsp;Placement Type - <b>Apprenticeship</b>&nbsp;&nbsp;&nbsp;No of Records - ' + count;
                        $("#spinnersdiv").show();
                        $("#reportthead").append('<tr>'
                                + '<td style="background-color: black;color: white;">S.NO</td>'
                                + '<td style="background-color: black;color: white;">ADMISSION NUMBER</td>'
                                + '<td style="background-color: black;color: white;">TRAINEE NAME</td>'
                                + '<td style="background-color: black;color: white;">ITI TRADE</td>'
                                + '<td style="background-color: black;color: white;">PLACEMENT YEAR</td>'
                                + '<td style="background-color: black;color: white;">COMPANY NAME</td>'
                                + '<td style="background-color: black;color: white;">PLACEMENT TRADE NAME</td>'
                                + '<td style="background-color: black;color: white;">STIPHEND AMOUNT</td>'
                                + '<td style="background-color: black;color: white;">HR MOBILE NO</td>'
                                + '<td style="background-color: black;color: white;">APPRENTICESHIP START DATE</td>'
                                + '<td style="background-color: black;color: white;">APPRENTICESHIP END DATE</td>'
                                + '<td style="background-color: black;color: white;">STATE NAME</td>'
                                + '<td style="background-color: black;color: white;">DIST NAME</td>'
                                + '<td style="background-color: black;color: white;">ADDRESS</td>'
                                + '<td style="background-color: black;color: white;">SCHEDULE INFO</td>'
                                + '</tr>');
                        $.ajax({
                            type: 'get',
                            url: baseUrl+'api/plcmt/getPlcmtsByPtypeAndPassyear?ptype=' + ptype + '&passyear=' + passyear,
                            headers: { 'Authorization': jwtToken},
                            cache: false,
                            timeout: 600000,
                            success: function (resp) {
                                //alert("success=>"+JSON.stringify(resp));
                                $("#reportbody").empty();
                                $("#spinnersdiv").hide();
                                var count = 0;
                                for (var j = 0; j < resp.length; j++) {
                                    var beann = resp[j];
                                    //alert("bean=>"+JSON.stringify(bean));
                                    count = count + 1;
                                    $("#reportbody").append('<tr>'
                                            + '<td>' + count + '</td>'
                                            + '<td>' + beann.adm_num + '</td>'
                                            + '<td>' + beann.name + '</td>'
                                            + '<td>' + beann.stdTradeName + '</td>'
                                            + '<td>' + beann.plcmtYear + '</td>'
                                            + '<td>' + beann.pname_of_company + '</td>'
                                            + '<td>' + beann.trade_name + '</td>'
                                            + '<td>' + beann.pstipendamt + '</td>'
                                            + '<td>' + beann.phrno + '</td>'
                                            + '<td>' + beann.paaprstartdate + '</td>'
                                            + '<td>' + beann.paaprenddate + '</td>'
                                            + '<td>' + beann.pstate + '</td>'
                                            + '<td>' + beann.distsStatewise.distname + '</td>'
                                            + '<td>' + beann.paddress + '</td>'
                                            + '<td>' + beann.scheduleId + '</td>'
                                            + '</tr>');
                                }
                            },
                            error: function (error) {
                                alert('Something went wrong while getting Apprenticeship related data.');
                            }

                        });
                    }
                    if (ptype === 'HigherEducation') {
                        $("#reportthead").empty();
                        document.getElementById('datainfo').innerHTML = 'Pass Year - <b>' + passyear + '<b>&nbsp;&nbsp;&nbsp;Placement Type - <b>Higher Education</b>&nbsp;&nbsp;&nbsp;No of Records - ' + count;
                        $("#spinnersdiv").show();
                        $("#reportthead").empty();
                        $("#reportthead").append('<tr>'
                                + '<td style="background-color: black;color: white;">S.NO</td>'
                                + '<td style="background-color: black;color: white;">ADMISSION NUMBER</td>'
                                + '<td style="background-color: black;color: white;">TRAINEE NAME</td>'
                                + '<td style="background-color: black;color: white;">ITI TRADE</td>'
                                + '<td style="background-color: black;color: white;">ITI CODE</td>'
                                + '<td style="background-color: black;color: white;">COURSE NAME</td>'
                                + '<td style="background-color: black;color: white;">COLLEGE NAME</td>'
                                + '<td style="background-color: black;color: white;">STATE NAME</td>'
                                + '<td style="background-color: black;color: white;">DIST NAME</td>'
                                + '<td style="background-color: black;color: white;">ADDRESS</td>'
                                + '</tr>');
                        $("#reportbody").empty();
                        $.ajax({
                            type: 'get',
                            url: baseUrl+'api/plcmt/getPlcmtsByPtypeAndPassyear?ptype=' + ptype + '&passyear=' + passyear,
                            headers: { 'Authorization': jwtToken},
                            cache: false,
                            timeout: 600000,
                            success: function (resp) {
                                //alert("success=>"+JSON.stringify(resp));
                                $("#spinnersdiv").hide();
                                var count = 0;
                                for (var j = 0; j < resp.length; j++) {
                                    var beann = resp[j];
                                    //alert("bean=>"+JSON.stringify(bean));
                                    count = count + 1;
                                    $("#reportbody").append('<tr>'
                                            + '<td>' + count + '</td>'
                                            + '<td>' + beann.adm_num + '</td>'
                                            + '<td>' + beann.name + '</td>'
                                            + '<td>' + beann.stdTradeName + '</td>'
                                            + '<td>' + beann.scheduleId + '</td>'
                                            + '<td>' + beann.pcoursename + '</td>'
                                            + '<td>' + beann.pclgname + '</td>'
                                            + '<td>' + beann.pstate + '</td>'
                                            + '<td>' + beann.distsStatewise.distname + '</td>'
                                            + '<td>' + beann.paddress + '</td>'
                                            + '</tr>');
                                }
                            },
                            error: function (error) {
                                alert('Something went wrong while getting Higher Education related data.');
                            }
                        });
                    }
                    if (ptype === 'SelfEmployment') {
                        $("#reportthead").empty();
                        document.getElementById('datainfo').innerHTML = 'Pass Year - <b>' + passyear + '<b>&nbsp;&nbsp;&nbsp;Placement Type - <b>Self Employment</b>&nbsp;&nbsp;&nbsp;No of Records - ' + count;
                        $("#spinnersdiv").show();
                        $("#reportthead").empty();
                        $("#reportthead").append('<tr>'
                                + '<td style="background-color: black;color: white;">S.NO</td>'
                                + '<td style="background-color: black;color: white;">ADMISSION NUMBER</td>'
                                + '<td style="background-color: black;color: white;">TRAINEE NAME</td>'
                                + '<td style="background-color: black;color: white;">ITI TRADE</td>'
                                + '<td style="background-color: black;color: white;">ITI CODE</td>'
                                + '<td style="background-color: black;color: white;">SELF EMPLOYEE NAME</td>'
                                + '<td style="background-color: black;color: white;">MONTHLY INCOME</td>'
                                + '<td style="background-color: black;color: white;">STATE NAME</td>'
                                + '<td style="background-color: black;color: white;">DIST NAME</td>'
                                + '<td style="background-color: black;color: white;">ADDRESS</td>'
                                + '</tr>');
                        $.ajax({
                            type: 'get',
                            url: baseUrl+'api/plcmt/getPlcmtsByPtypeAndPassyear?ptype=' + ptype + '&passyear=' + passyear,
                            headers: { 'Authorization': jwtToken},
                            cache: false,
                            timeout: 600000,
                            success: function (resp) {
                                //alert("success=>"+JSON.stringify(resp));

                                $("#reportbody").empty();
                                var count=0;
                                for (var j = 0; j < resp.length; j++) {
                                    var beann = resp[j];
                                    count = count + 1;
                                    $("#spinnersdiv").hide();
                                    $("#reportbody").append('<tr>'
                                            + '<td>' + count + '</td>'
                                            + '<td>' + beann.adm_num + '</td>'
                                            + '<td>' + beann.name + '</td>'
                                            + '<td>' + beann.stdTradeName + '</td>'
                                            + '<td>' + beann.scheduleId + '</td>'
                                            + '<td>' + beann.pselfemp + '</td>'
                                            + '<td>' + beann.pmonthincome + '</td>'
                                            + '<td>' + beann.pstate + '</td>'
                                            + '<td>' + beann.distsStatewise.distname + '</td>'
                                            + '<td>' + beann.paddress + '</td>'
                                            + '</tr>');
                                }
                            },
                            error: function (error) {
                                alert('Something went wrong while getting Self Employment related data.');
                            }
                        });
                    }

                }
            }
            
            function fnExcelReport(a) {
    var table = document.getElementById(a);
    var wb = XLSX.utils.table_to_book(table, { sheet: "Sheet1" });

    // Generate Excel file
    XLSX.writeFile(wb, 'Report.xlsx');
}

            function reload() {
                location.reload();
            }