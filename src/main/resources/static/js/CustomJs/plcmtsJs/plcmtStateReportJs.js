/**
 * 
 */
 $(document).ready(function () {
                $("#tbodyyy").empty();
                $("#distdiv").hide();
                $.ajax({
                    type: 'get',
                    url: baseUrl+'api/plcmt/getPlcmtNodalDistLevelCountReport',
                    headers: { 'Authentication': jwtToken },
                    cache: false,
                    timeout: 600000,
                    success: function (resp) {
                        //alert('resp=>'+JSON.stringify(resp));
                        var count = 0;
                        for (var i = 0; i < resp.length; i++) {
                            var bean = resp[i];
                            count = count + 1;
                            if (bean.dist_name === 'TOTAL') {
                                $("#tbodyyy").append('<tr>'
                                        + '<td>' + count + '</td>'
                                        + '<td>' + bean.dist_name + '</td>'
                                        + '<td> ' + bean.job + ' </td>'
                                        + '<td> ' + bean.oj + ' </td>'
                                        + '<td> ' + bean.apprenticeship + ' </td>'
                                        + '<td> ' + bean.oa + ' </td>'
                                        + '<td> ' + bean.selfemployment + ' </td>'
                                        + '<td> ' + bean.highereducation + ' </td>'
                                        + '<td>' + bean.horizontal_sum + '</td>'
                                        + '</tr>');
                            } else {
                                $("#tbodyyy").append('<tr>'
                                        + '<td>' + count + '</td>'
                                        + '<td>' + bean.dist_name + '</td>'
                                        + '<td><a href="javascript:getDistData(\'' + bean.dist_code + '\',\'' + bean.dist_name + '\',\'Job\',\'' + bean.job + '\')">' + bean.job + '</a></td>'
                                        + '<td><a href="javascript:getDistData(\'' + bean.dist_code + '\',\'' + bean.dist_name + '\',\'OJ\',\'' + bean.oj + '\')">' + bean.oj + '</a></td>'
                                        + '<td><a href="javascript:getDistData(\'' + bean.dist_code + '\',\'' + bean.dist_name + '\',\'Apprenticeship\',\'' + bean.apprenticeship + '\')">' + bean.apprenticeship + '</a></td>'
                                        + '<td><a href="javascript:getDistData(\'' + bean.dist_code + '\',\'' + bean.dist_name + '\',\'OA\',\'' + bean.oa + '\')">' + bean.oa + '</a></td>'
                                        + '<td><a href="javascript:getDistData(\'' + bean.dist_code + '\',\'' + bean.dist_name + '\',\'SelfEmployment\',\'' + bean.selfemployment + '\')">' + bean.selfemployment + '</a></td>'
                                        + '<td><a href="javascript:getDistData(\'' + bean.dist_code + '\',\'' + bean.dist_name + '\',\'HigherEducation\',\'' + bean.highereducation + '\')">' + bean.highereducation + '</a></td>'
                                        + '<td>' + bean.horizontal_sum + '</td>'
                                        + '</tr>');
                            }

                        }
                    },
                    error: function (error) {
                        alert("Something went wrong while getting report getPlcmtNodalDistLevelCountReport");
                    }
                });
            });

            function getDistData(distcode, distname, ptype, count) {
                if (count <= 0) {
                    alert("No data available for showing data.");
                } else {
                    $("#statediv").hide();
                    $("#distdiv").show();

                    $("#distname").html(distname.toUpperCase());
                    if(ptype === 'Job'){  $("#ptypename").html('JOB'); }
                    if(ptype === 'OJ'){  $("#ptypename").html('OTHER THAN JOB'); }
                    if(ptype === 'Apprenticeship'){  $("#ptypename").html('APPRENTICESHIP'); }
                    if(ptype === 'OA'){  $("#ptypename").html('OTHER THAN APPRENTICESHIP'); }
                    if(ptype === 'HigherEducation'){  $("#ptypename").html('HIGHER EDUCATION'); }
                    if(ptype === 'SelfEmployment'){  $("#ptypename").html('SELF EMPLOYMENT'); }

                    populateYearDropdown();
                    populateItiDropdown(distcode);

                    $("#distcodee").val(distcode);
                    $("#ptypee").val(ptype);

                    var iticode = $("#iticode").val();
                    var plcmtYear = $("#plcmtYear").val();

                    getDistLevelPlcmtReport(ptype, distcode, plcmtYear, iticode);

                }
            }
            function getDistLevelPlcmtReport(ptype, insCode, plcmtYear, iti_code) {
                //alert('getDistLevelPlcmtReport-ptype->' + ptype + ',insCode->' + insCode);

                if (ptype === 'Job' || ptype === 'OJ') {
                    $("#reportthead").empty();
                    $("#reportthead").append('<tr>'
                            + '<td style="background-color: black;color: white;">S.NO</td>'
                            + '<td style="background-color: black;color: white;">ADMISSION NUMBER</td>'
                            + '<td style="background-color: black;color: white;">TRAINEE NAME</td>'
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

                    $.ajax({
                        type: 'get',
                        url: baseUrl+'api/plcmt/getDistReportJobAndOJ?distCode='+insCode+'&ptype='+ptype+'&plcmtYear='+plcmtYear+'&itiCode='+iti_code,
                        headers: { 'Authentication': jwtToken },
                        cache: false,
                        timeout: 600000,
                        success: function (resp) {
                            //alert("success=>" + JSON.stringify(resp));
                            $("#reportbody").empty();
                            var count = 0;
                            for (var i = 0; i < resp.length; i++) {
                                var bean = resp[i];
                                count = count + 1;
                                var plcmtyear = '';
                                if (bean.plcmt_year == null) {
                                    plcmtyear = '';
                                } else {
                                    plcmtyear = bean.plcmt_year;
                                }

                                var schedule = '';
                                if (bean.schedule == null) {
                                    schedule = '';
                                } else {
                                    schedule = bean.schedule;
                                }

                                $("#reportbody").append('<tr>'
                                        + '<td>' + count + '</td>'
                                        + '<td>' + bean.adm_num + '</td>'
                                        + '<td>' + bean.name + '</td>'
                                        + '<td>' + plcmtyear + '</td>'
                                        + '<td>' + bean.pname_of_company + '</td>'
                                        + '<td>' + bean.ppostname + '</td>'
                                        + '<td>' + bean.psalary + '</td>'
                                        + '<td>' + bean.phrno + '</td>'
                                        + '<td>' + bean.statename + '</td>'
                                        + '<td>' + bean.distname + '</td>'
                                        + '<td>' + bean.paddress + '</td>'
                                        + '<td>' + schedule + '</td>'
                                        + '</tr>');
                            }
                        },
                        error: function (error) {
                            alert('Something went wrong while getting Job related data.');
                        }

                    });
                }
                if (ptype === 'Apprenticeship' || ptype === 'OA') {
                    $.ajax({
                        type: 'get',
                        url: baseUrl+'api/plcmt/getDistReportAppreAndOA?distCode='+insCode+'&ptype='+ptype+'&plcmtYear='+plcmtYear+'&itiCode='+iti_code,
                        headers: { 'Authentication': jwtToken },
                        cache: false,
                        timeout: 600000,
                        success: function (resp) {
                            //alert("success=>"+JSON.stringify(resp));
                            $("#reportthead").empty();
                            $("#reportthead").append('<tr>'
                                    + '<td style="background-color: black;color: white;">S.NO</td>'
                                    + '<td style="background-color: black;color: white;">ADMISSION NUMBER</td>'
                                    + '<td style="background-color: black;color: white;">TRAINEE NAME</td>'
                                    + '<td style="background-color: black;color: white;">PLACEMENT YEAR</td>'
                                    + '<td style="background-color: black;color: white;">COMPANY NAME</td>'
                                    + '<td style="background-color: black;color: white;">TRADE NAME</td>'
                                    + '<td style="background-color: black;color: white;">STIPHEND AMOUNT</td>'
                                    + '<td style="background-color: black;color: white;">HR MOBILE NO</td>'
                                    + '<td style="background-color: black;color: white;">APPRENTICESHIP START DATE</td>'
                                    + '<td style="background-color: black;color: white;">APPRENTICESHIP END DATE</td>'
                                    + '<td style="background-color: black;color: white;">STATE NAME</td>'
                                    + '<td style="background-color: black;color: white;">DIST NAME</td>'
                                    + '<td style="background-color: black;color: white;">ADDRESS</td>'
                                    + '<td style="background-color: black;color: white;">SCHEDULE INFO</td>'
                                    + '</tr>');

                            $("#reportbody").empty();
                            var count = 0;
                            for (var j = 0; j < resp.length; j++) {
                                var beann = resp[j];
                                //alert("bean=>"+JSON.stringify(bean));
                                var plcmtyearr = '';
                                if (beann.plcmt_year === null) {
                                    plcmtyearr = '';
                                } else {
                                    plcmtyearr = beann.plcmt_year;
                                }

                                var schedulee = '';
                                if (beann.schedule === null) {
                                    schedulee = '';
                                } else {
                                    schedulee = beann.schedule;
                                }
                                count = count + 1;
                                $("#reportbody").append('<tr>'
                                        + '<td>' + count + '</td>'
                                        + '<td>' + beann.adm_num + '</td>'
                                        + '<td>' + beann.name + '</td>'
                                        + '<td>' + plcmtyearr + '</td>'
                                        + '<td>' + beann.pname_of_company + '</td>'
                                        + '<td>' + beann.trade_name + '</td>'
                                        + '<td>' + beann.pstipendamt + '</td>'
                                        + '<td>' + beann.phrno + '</td>'
                                        + '<td>' + beann.paaprstartdate + '</td>'
                                        + '<td>' + beann.paaprenddate + '</td>'
                                        + '<td>' + beann.statename + '</td>'
                                        + '<td>' + beann.distname + '</td>'
                                        + '<td>' + beann.paddress + '</td>'
                                        + '<td>' + schedulee + '</td>'
                                        + '</tr>');
                            }
                        },
                        error: function (error) {
                            alert('Something went wrong while getting Apprenticeship related data.');
                        }

                    });
                }
                if (ptype === 'HigherEducation') {
                    $.ajax({
                        type: 'get',
                        url: baseUrl+'api/plcmt/getDistReportHighEdu?itiCode='+iti_code+'&ptype='+ptype+'&plcmtYear='+plcmtYear+'&distCode='+insCode,
                        headers: { 'Authentication': jwtToken },
                        cache: false,
                        timeout: 600000,
                        success: function (resp) {
                            //alert("success=>"+JSON.stringify(resp));
                            $("#reportthead").empty();
                            $("#reportthead").append('<tr>'
                                    + '<td style="background-color: black;color: white;">S.NO</td>'
                                    + '<td style="background-color: black;color: white;">ADMISSION NUMBER</td>'
                                    + '<td style="background-color: black;color: white;">TRAINEE NAME</td>'
                                    //+'<td style="background-color: black;color: white;">PLACEMENT YEAR</td>'
                                    + '<td style="background-color: black;color: white;">COURSE NAME</td>'
                                    + '<td style="background-color: black;color: white;">COLLEGE NAME</td>'
                                    + '<td style="background-color: black;color: white;">STATE NAME</td>'
                                    + '<td style="background-color: black;color: white;">DIST NAME</td>'
                                    + '<td style="background-color: black;color: white;">ADDRESS</td>'
                                    + '</tr>');
                            $("#reportbody").empty();
                            var count = 0;
                            for (var j = 0; j < resp.length; j++) {
                                var beann = resp[j];
                                //alert("bean=>"+JSON.stringify(bean));
                                //var plcmtyearr = '';
                                //if(beann.plcmt_year === null){ plcmtyearr = ''; }
                                //else{ plcmtyearr = beann.plcmt_year; }
                                count = count + 1;
                                $("#reportbody").append('<tr>'
                                        + '<td>' + count + '</td>'
                                        + '<td>' + beann.adm_num + '</td>'
                                        + '<td>' + beann.name + '</td>'
                                        // +'<td>'+plcmtyearr+'</td>'
                                        + '<td>' + beann.pcoursename + '</td>'
                                        + '<td>' + beann.pclgname + '</td>'
                                        + '<td>' + beann.statename + '</td>'
                                        + '<td>' + beann.distname + '</td>'
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
                    $.ajax({
                        type: 'get',
                        url: baseUrl+'api/plcmt/getDistReportSelfEmp?itiCode='+iti_code+'&ptype='+ptype+'&plcmtYear='+plcmtYear+'&distCode='+insCode,
                        headers: { 'Authentication': jwtToken },
                        cache: false,
                        timeout: 600000,
                        success: function (resp) {
                            //alert("success=>"+JSON.stringify(resp));
                            $("#reportthead").empty();
                            $("#reportthead").append('<tr>'
                                    + '<td style="background-color: black;color: white;">S.NO</td>'
                                    + '<td style="background-color: black;color: white;">ADMISSION NUMBER</td>'
                                    + '<td style="background-color: black;color: white;">TRAINEE NAME</td>'
                                    //+'<td style="background-color: black;color: white;">PLACEMENT YEAR</td>'
                                    + '<td style="background-color: black;color: white;">SELF EMPLOYEE NAME</td>'
                                    + '<td style="background-color: black;color: white;">MONTHLY INCOME</td>'
                                    + '<td style="background-color: black;color: white;">STATE NAME</td>'
                                    + '<td style="background-color: black;color: white;">DIST NAME</td>'
                                    + '<td style="background-color: black;color: white;">ADDRESS</td>'
                                    + '</tr>');
                            $("#reportbody").empty();
                            var count = 0;
                            for (var j = 0; j < resp.length; j++) {
                                var beann = resp[j];
                                //alert("bean=>"+JSON.stringify(bean));
                                //var plcmtyearr = '';
                                //if(beann.plcmt_year === null){ plcmtyearr = ''; }
                                //else{ plcmtyearr = beann.plcmt_year; }
                                count = count + 1;
                                $("#reportbody").append('<tr>'
                                        + '<td>' + count + '</td>'
                                        + '<td>' + beann.adm_num + '</td>'
                                        + '<td>' + beann.name + '</td>'
                                        // +'<td>'+plcmtyearr+'</td>'
                                        + '<td>' + beann.pselfemp + '</td>'
                                        + '<td>' + beann.pmonthincome + '</td>'
                                        + '<td>' + beann.statename + '</td>'
                                        + '<td>' + beann.distname + '</td>'
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
            
            function filterData(){
                //alert('filterData');
                var distcodee = $("#distcodee").val();
                var ptypee = $("#ptypee").val();
                var iticode = $("#iticode").val();
                var plcmtYear = $("#plcmtYear").val();
                getDistLevelPlcmtReport(ptypee, distcodee, plcmtYear, iticode);
            }
             function fnExcelReport2(table) {
                // alert("sdffffffffffffffff");
                var tab_text = "<table border='1px'><tr bgcolor='#87AFC6'>";
                var textRange;
                var j = 0;
                tab = document.getElementById(table); // id of table

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
            function populateYearDropdown() {
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
            function populateItiDropdown(distcode) {
                $("#iticode").empty();
                $("#iticode").append('<option value="">-ALL-</option>');
                $.ajax({
                    type: 'get',
                    url: baseUrl+'masterdata/getItisInADist?distCode=' + distcode,
                    cache: false,
                    timeout: 600000,
                    success: function (resp) {
                       // alert('resp=>'+JSON.stringify(resp));

                        for (var i = 0; i < resp.length; i++) {
                            var bean = resp[i];

                            $("#iticode").append('<option value="' + bean.itiCode + '">' + bean.itiName + ' - (' + bean.itiCode + ')</option>');
                        }
                    },
                    error: function (error) {
                        alert("Problem occured while getting ITIs in selected dist.");
                    }
                });
            }
            function reload(){
                location.reload();
            }