/**
 * 
 */
 
 
  $(document).ready(function () {
        
            $("#myModalErroralert").hide();
            
            $("#myModalSuccess").hide();
            getPlcmtScheduleDetails();
            
            $.ajax({
                type: "get",
                contentType: "application/json",
                url: baseUrl+"masterdata/getAllGovtItisInDist?dist_code="+insCode,
                cache: false,
                timeout: 600000,
                success: function (data) {
                   // alert("success" + JSON.stringify(data));
                    //alert("length=>" + data.length);

                    for (var i = 0, len = data.length; i < len; ++i) {
                        var iti = data[i];
                        //alert("itiCode=>"+iti.itiCode);
                        //alert("itiName=>"+iti.itiName);
                        $('#scheduleLocation').append("<option value=\"" + iti.itiCode + "\">" + iti.itiCode + "-" + iti.itiName + "</option>");
                    //alert("itiName2=>"+iti.itiName);            
                }
                },
                error: function (data) {
                    alert("All Govt Itis in Your District is not Loaded");
                }
            });
        });

        function getPlcmtScheduleDetails() {
            //alert("getPlcmtScheduleDetails=>"+ins_code);
            
            $.ajax({
                type: "get",
                contentType: "application/json",
                url: baseUrl+"api/plcmt/getDistPlcmtSchedules?distCode="+insCode,
                cache: false,
                timeout: 600000,
                success: function (data) {
                    //alert("getPlcmtScheduleDetails=>success" + JSON.stringify(data));

                    for (i = 0, len = data.length; i < len; ++i) {
                        var bean = data[i];
                        
                        var dob = bean.schedule_date;
                        // Parse the original date
                        var parts = dob.split('-');
                        var year = parts[0];
                        var month = parts[1];
                        var day = parts[2];

                        // Construct the new date string in the desired format
                        var convertedDate = day + '-' + month + '-' + year;
                        
                            $("#schedulebody").append("\n\
                                <tr><td>" + bean.plcmt_id + "</td>\n\
                                <td>" + bean.iti_name + "</td>\n\
                                <td style='white-space: nowrap;'>" + convertedDate + "</td>\n\
                                <td>" + bean.schedule_type + "</td>\n\
                                <td>" + bean.schedule_desc + "</td></tr>\n\
                            ");
                    }
                },
                error: function (data) {
                    alert("Placement Schedules are not Loaded");
                }
            });
        }

                function validate() {
                    //alert("validate");
                    //alert($("#scheduleDate").val());
                    //alert($("#scheduleDesc").val());

                    //scheduleType
                    var scheduleType = document.getElementById("scheduleType").value;
                    if (scheduleType === null || scheduleType === "") {
                        alert("Schedule Type is Requires, Please fill that.");
                        $("#scheduleType").focus();
                        return false;
                    }
                    //scheduleDate
                    var scheduleDate = document.getElementById("scheduleDate").value;
                    if (scheduleDate === null || scheduleDate === "") {
                        alert("Schedule Date is Requires, Please fill that.");
                        $("#scheduleDate").focus();
                        return false;
                    }
                    //scheduleLocation
                    var scheduleLocation = document.getElementById("scheduleLocation").value;
                    if (scheduleLocation === null || scheduleLocation === "") {
                        alert("Schedule scheduleLocation is Requires, Please fill that.");
                        $("#scheduleLocation").focus();
                        return false;
                    }
                    //scheduleDesc
                    var scheduleDesc = document.getElementById("scheduleDesc").value;

                    if (scheduleDesc === "" || scheduleDesc === null) {
                        if (confirm("Schedule Description will help you, while entering placement Entry, Are you sure data saving without Schedule Description")) {
                            sendData();
                            return true;
                        } else {
                            return false;
                        }
                    } else {
                        sendData();
                        return true;
                    }

                }

                function sendData() {
                    
                    var data = {};
                    
                    data["scheduleType"] = $("#scheduleType").val();
                    data["scheduleDate"] = $("#scheduleDate").val();
                    data["scheduleLocation"] = $("#scheduleLocation").val();
                    data["scheduleDesc"] = $("#scheduleDesc").val();
                    data["dist_code"] = insCode;

                    $.ajax({
                        type: "POST",
                        contentType: "application/json",
                        url: baseUrl+"api/plcmt/savePlcmtScheduleEntry",
                        headers: { 'Authorization': jwtToken},
                        data: JSON.stringify(data),
                        dataType: 'json',
                        cache: false,
                        timeout: 600000,
                        success: function (data) {
                            //alert("sendData=>success" +data);
                            $("#successmsg").html(data.msg);

                            var modal1 = document.getElementById("myModalSuccess");
                            var span = document.getElementsByClassName("successclose")[0];

                            modal1.style.display = "block";
                            span.onclick = function () {
                                modal1.style.display = "none";
                                window.location.reload();
                                getPlcmtScheduleDetails();
                            };

                        },
                        error: function (data) {
                            alert("Problem Accured While Saving Placement Schedule Entry Details");
                        }
                    });
                }

                function openModelAlert() {
                    var modal1 = document.getElementById("myModalErroralert");
                    var span = document.getElementsByClassName("alertError-close")[0];

                    modal1.style.display = "block";
                    span.onclick = function () {
                        modal1.style.display = "none";
                    };
                }