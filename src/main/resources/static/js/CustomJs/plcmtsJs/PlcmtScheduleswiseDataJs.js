/**
 * 
 */
 
 
            //on page load
            $(document).ready(function(){
                $("#itiwisediv").hide();
                $("#plcmtsdatadiv").hide();
            $.ajax({
                type:'get',
                url: baseUrl+'api/plcmt/getSchedulesCountDistwise',
                headers: {
					'Authorization': jwtToken
				},
                cache:false,
                timeout:600000,
                success:function(resp){
                    //alert("resp=>"+JSON.stringify(resp));
                    
                    var schedulesTotal = 0, jobSchedulesTotal=0, apprSchedulesTotal=0,count=0;
                    for(var i=0;i<resp.length;i++)
                    {
                                var bean = resp[i];
                                schedulesTotal = schedulesTotal + bean.longCol1;
                                jobSchedulesTotal = jobSchedulesTotal + bean.longCol2;
                                apprSchedulesTotal = apprSchedulesTotal + bean.longCol3;
                                count = count + 1;
                                $("#distwisedata").append('<tr>'
                                +'<td>' + count + '</td>'
                                +'<td>' + bean.strCol2 + '</td>'
                                +'<td><a href="javascript:getSchedulesDistData(\'' + bean.strCol1 + '\',\'Job\',\'' + bean.strCol2 + '\')">' + bean.longCol2 + '</a></td>'
                                +'<td><a href="javascript:getSchedulesDistData(\'' + bean.strCol1 + '\',\'Apprenticeship\',\'' + bean.strCol2 + '\')">' + bean.longCol3 + '</a></td>'
                                +'<td>' + bean.longCol1 + '</td>'
                                +'</tr>');
                            }
                            $("#distwisedata").append('<tr style="background-color: black;color: white;"><td colspan="2">TOTAL</td><td>' + schedulesTotal + '</td><td>' + jobSchedulesTotal + '</td>' + apprSchedulesTotal + '<td>' + apprSchedulesTotal + '</td></tr>');
                        },
                        error: function (resp) {
                            //alert("resp=>"+JSON.stringify(resp));
                            alert("Something went wrong while getting data.");
                        }
                    });

                });
            
            
            function downloadExcel(tableid)  
            {
                //alert("In Excel");
                var table = document.getElementById(tableid);
                var tableData = [];
                for (var i = 0, row; row = table.rows[i]; i++) {
                var rowData = [];
                for (var j = 0, cell; cell = row.cells[j]; j++) {
                    var input = cell.querySelector('input');
                    if (input) {
                        rowData.push(input.value);
                    } else {
                        rowData.push(cell.textContent);
                    }
                }
                tableData.push(rowData);
                }
                var ws = XLSX.utils.aoa_to_sheet(tableData);
                var wb = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(wb, ws, 'distwise');
                XLSX.writeFile(wb, tableid+'.xlsx');
            }
            
            
            function getSchedulesDistData(distcode,datatype,distname){
                //alert("distcode=>"+distcode+",datatype"+datatype);
                
                $.ajax({
                    type: 'get',
                    url: baseUrl+'api/plcmt/getPlcmtSchedulesInDist?distCode='+distcode+'&scheduleType='+datatype,
                    headers: {
						'Authorization': jwtToken
					},
                    cache:false,
                    timeout: 600000,
                    success:function(resp){
                        //alert("resp=>"+JSON.stringify(resp));
                        $("#distwisediv").hide();
                        $("#itiwisediv").show();
                        document.getElementById('itinamespan').innerHTML = distname.toUpperCase();
                                var count = 0;
                                for (var i = 0; i < resp.length; i++) {
                                    var bean = resp[i];
                                    count = count + 1;
                                    var noOfVacancies = bean.noOfVacancies === null ? "": bean.noOfVacancies;
                                    var noOfAttendedCandidates = bean.noOfAttendedCandidates === null ? "": bean.noOfAttendedCandidates;
                                    var noOfSelectedCandidates = bean.noOfSelectedCandidates === null ? "": bean.noOfSelectedCandidates;
                                    
                                    var date = bean.scheduleDate.split('-');
                                    var newdate = date[2]+'-'+date[1]+'-'+date[0];
                                    
                                    var anchortag = '';
                                    if(bean.plcmtsCount == 0){
                                        anchortag = '0'
                                    }else{
                                        anchortag='<a href="javascript:getDataByScheduleId(\''+bean.plcmtId+'\',\''+bean.scheduleType+'\',\''+bean.itiName+'\')">' + bean.plcmtsCount + '</a>';
                                    }
                                    
                                    $("#itiwisedata").append('<tr>'
                                            + '<td>' + count + '</td>'
                                            + '<td>' + bean.plcmtId + '</td>'
                                            + '<td>' + bean.itiName + '</td>'
                                            + '<td>' + bean.scheduleType + '</td>'
                                            + '<td>' + newdate + '</td>'
                                            + '<td>' + bean.scheduleDesc + '</td>'
                                            + '<td>' + noOfVacancies + '</td>'
                                            + '<td>' + noOfAttendedCandidates + '</td>'
                                            + '<td>' + noOfSelectedCandidates + '</td>'
                                            + '<td>'+anchortag+'</td>'
                                            + '</tr>');
                                }
                            },
                            error: function (resp) {
                                alert('Something went wrong while getting data.');
                            }

                        });
            }
            function reload(){
                location.reload();
            }
            function getDataByScheduleId(scheduleId, scheduleType,itiName){
               // alert("getDataByScheduleId=>scheduleId=>"+scheduleId+",scheduleType=>"+scheduleType);
               document.getElementById('plcmtsdataheading').innerHTML = 'AVAILABLE PLACEMENTS DETAILS FOR '+scheduleType.toUpperCase()+' IN ITI '+itiName.toUpperCase();
               if(scheduleType === 'Apprenticeship'){
                   $.ajax({
                       type: 'get',
                       url: baseUrl+'api/plcmt/getPlcmtsByPlcmtId?scheduleId='+scheduleId+'&ptype='+scheduleType,
                       headers: {
							'Authorization': jwtToken
						},
                       cache: false,
                       timeout: 600000,
                       success:function(resp){
                           //alert("resp=>"+JSON.stringify(resp));
                           
                           $("#itiwisediv").hide();
                           $("#plcmtsdatadiv").show();
                           
                           $("#plcmtsdatadataheader").empty();
                            $("#plcmtsdatadataheader").append('<tr>'
                            +'<td style="background-color: black;color: white;">S.NO</td>'
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
                            
                            $("#plcmtsdatadata").empty();
                            var count =0;
                            for(var j=0;j<resp.length;j++){
                                var beann = resp[j];
                                //alert("bean=>"+JSON.stringify(bean));
                                var plcmtyearr = '';
                                if(beann.plcmt_year === null){ plcmtyearr = ''; }
                                else{ plcmtyearr = beann.plcmt_year; }
                                
                                var schedulee = '';
                                if(beann.schedule === null){ schedulee = ''; }
                                else{ schedulee = beann.schedule; }
                                count = count + 1;
                                $("#plcmtsdatadata").append('<tr>'
                                +'<td>'+count+'</td>'
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
                       }
                   });
               }
               if(scheduleType === 'Job'){
                   
                   $("#itiwisediv").hide();
                   $("#plcmtsdatadiv").show();
                   
                   $("#plcmtsdatadataheader").empty();
                   $("#plcmtsdatadataheader").append('<tr>'
                            +'<td style="background-color: black;color: white;">S.NO</td>'
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
                        url: baseUrl+'api/plcmt/getPlcmtsByPlcmtId?scheduleId='+scheduleId+'&ptype='+scheduleType,
                        headers: {
							'Authorization': jwtToken
						},
                        cache: false,
                        timeout: 600000,
                        success: function(resp){
                           // alert("success=>"+JSON.stringify(resp));
                            $("#plcmtsdatadata").empty();
                            var count =0;
                            for(var i=0;i<resp.length;i++){
                                var bean = resp[i];
                                count = count + 1;
                                var plcmtyear = '';
                                if(bean.plcmt_year == null){ plcmtyear = ''; }
                                else{ plcmtyear = bean.plcmt_year; }
                                
                                var schedule = '';
                                if(bean.schedule == null){ schedule = ''; }
                                else{ schedule = bean.schedule; }
                                
                                $("#plcmtsdatadata").append('<tr>'
                                +'<td>'+count+'</td>'
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
                
                
            }
            function showtable2(){
                $("#distwisediv").hide();
                $("#itiwisediv").show();
                $("#plcmtsdatadiv").hide();
                
            }
        
        