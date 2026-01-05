<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@page import="java.util.Date"%>
<%@page import="java.text.SimpleDateFormat"%>
      <%
String placementEntryJwtToken = (String) session.getAttribute("jwtToken");
System.out.println("placementEntryJwtToken=>" + placementEntryJwtToken);

String placementEntryInsCode = (String) session.getAttribute("insCode");
System.out.println("placementEntryInsCode=>" + placementEntryInsCode);

String placementEntryapisUrl = (String) session.getAttribute("apisUrl");
System.out.println("placementEntryapisUrl=>" + placementEntryapisUrl);


%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Placements Entry</title>
<link href="./bootstrap-5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
<script src="./bootstrap-5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<script src="./js/jquery-3.7.1.min.js"></script>
<script src="./js/siteScript.js"></script>
<script src="./js/CustomJs/plcmtsJs/placementEntryJs.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.17.0/xlsx.full.min.js"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
<script>
var jwtToken = 'Bearer '+'<%=placementEntryJwtToken%>';
var insCode =  '<%=placementEntryInsCode%>';
var baseUrl =  '<%=placementEntryapisUrl%>';
</script>
<style>
.container-fluid{
    border: 2px solid black !important;
    padding: 5px !important;
    background-color: #e4eeb9 !important; 
}

.h3{
    text-decoration: underline !important;
}
input{
    width: 150% !important;
}


/*for admission number finding*/
/* The Modal (background) */
.modal1 {
    display: none; /* Hidden by default */
    position: fixed; /* Stay in place */
    z-index: 1; /* Sit on top */
    padding-top: 220px; /* Location of the box */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow-y:  scroll; /* Enable scroll if needed */
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}

/* Modal Content */
.modal-content1 {
    background-color: #fefefe;
    margin: auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;

}

/* The Close Button */
.close1 {
    color: #aaaaaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
}

.close1:hover,
.close1:focus {
    color: #000;
    text-decoration: none;
    cursor: pointer;
}

.modal-content1{
    background-color: #e4eeb9;
    border: 2px solid black;
}


#scrollbar {
    width: 800px;
    height: 300px;
    overflow-x: hidden;
    overflow-y: auto;
    text-align:justify;
}


/*Modal for Alert Messages*/
/* The Modal (background) */
.modalalert {
    display: none; /* Hidden by default */
    position: fixed; /* Stay in place */
    z-index: 1; /* Sit on top */
    padding-top: 220px; /* Location of the box */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow-y:  scroll; /* Enable scroll if needed */
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}

/* Modal Content */
.modal-contentalert {
    background-color: #fefefe;
    margin: auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
    

}

/* The Close Button */
.alert-close {
    color: #aaaaaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
}

.alert-close:hover,
.alert-close:focus {
    color: #000;
    text-decoration: none;
    cursor: pointer;
}

.modal-contentalert{
    background-color: #e4eeb9;
    border: 2px solid black;
}

 

.required{
    color: red;
    font-weight: bolder;
}




/*COPY CODE*/
#namespan, #adm_numspan, #yearspan{
    color: blue;
    
}

.editanchor{
    border: 1px solid black;
    background: lightgoldenrodyellow;
    font-weight: bolder;
    padding: 2px;
   
}
.deleteanchor{
    border: 1px solid black;
    background: lightcoral;
    font-weight: bolder;
    padding: 2px;
}
 


/*for alert errors*/
/* The Modal (background) */
.modalErroralert {
    display: none; /* Hidden by default */
    position: fixed; /* Stay in place */
    z-index: 1; /* Sit on top */
    padding-top: 220px; /* Location of the box */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow-y:  scroll; /* Enable scroll if needed */
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}

/* Modal Content */
.modal-contenterroralert {
    background-color: #fefefe;
    margin: auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;

}

/* The Close Button */
.alertError-close {
    color: #aaaaaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
}

.alertError-close:hover,
.alertError-close:focus {
    color: #000;
    text-decoration: none;
    cursor: pointer;
}

.modal-contenterroralert{
    background-color: #e4eeb9;
    border: 2px solid black;
}


#alertError{
    font-weight: bolder;
    color: red;
    font-size: larger;
}



/*for DELETE MODEL*/
/* The Modal (background) */
.modaldeletealert {
    display: none; /* Hidden by default */
    position: fixed; /* Stay in place */
    z-index: 1; /* Sit on top */
    padding-top: 220px; /* Location of the box */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow-y:  scroll; /* Enable scroll if needed */
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}
/* Modal Content */
.modal-contenterroralert {
    background-color: #fefefe;
    margin: auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;

}
.modal-contentdeletealert{
    background-color: #e4eeb9;
    border: 2px solid black;
}
 


/*for edit popup model*/
/* The Modal (background) */
.modal {
    display: none; /* Hidden by default */
    position: fixed; /* Stay in place */
    z-index: 1; /* Sit on top */
    padding-top: 100px; /* Location of the box */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}

/* Modal Content */
.modal-content {
    background-color: #fefefe;
    margin: auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
}
/*
 The Close Button 
.close {
    float: left;
    padding: 3px;
    width: 50%;
}

.close:hover,
.close:focus {
    color: #000;
    text-decoration: none;
    cursor: pointer;
}*/


/*for success popup model*/
/* The Modal (background) */
.mymodalsuccess {
    display: none; /* Hidden by default */
    position: fixed; /* Stay in place */
    z-index: 1; /* Sit on top */
    padding-top: 220px; /* Location of the box */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}

/* Modal Content */
.successcontent {
    background-color: #fefefe;
    margin: auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
}

 The Close Button 
.successclose {
    float: left;
    padding: 3px;
    width: 50%;
}



/*for saving placement popup model*/
/* The Modal (background) */
.savingplcmtmodel {
    display: none; /* Hidden by default */
    position: fixed; /* Stay in place */
    z-index: 1; /* Sit on top */
    padding-top: 220px; /* Location of the box */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}

/* Modal Content */
.savingplcmtcontent {
    background-color: #fefefe;
    margin: auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
}

/*for admission number not found model*/
/* The Modal (background) */
.admNotFound {
    display: none; /* Hidden by default */
    position: fixed; /* Stay in place */
    z-index: 1; /* Sit on top */
    padding-top: 220px; /* Location of the box */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}

/* Modal Content */
.admnotfound-content {
    background-color: #fefefe;
    margin: auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
}

</style>
</head>
<body>
<%@include file="/WEB-INF/views/public/banner.jsp"%>
<%@include file="/WEB-INF/views/userpages/userInfoNavbar.jsp"%>
 
        <br>
        <%            int start_year = 2010;

            SimpleDateFormat sdf = new SimpleDateFormat("yyyy");
            String year = sdf.format(new Date());
            int current_year = Integer.parseInt(year);

            int start_year2 = 2010;

            SimpleDateFormat sdf2 = new SimpleDateFormat("yyyy");
            String year2 = sdf2.format(new Date());
            int current_year2 = Integer.parseInt(year);

            System.out.println("year & month => " + year);

        %>

        <!--        <form id="search-form" method="post">-->
    <div align="center" style="text-decoration: underline;color: fuchsia;">PLACEMENT ENTRY FORM</div>

    <div class="container  border p-2 mt-2 shadow-lg w-50" style="background-color: white !important; font-weight: bolder; margin: 0 auto; width: 90%;" 
    id="formdiv">
        
        <div class="row">
            <div class="col-md-4"> </div>
            <div class="col-md-4">
                <label for="adm_num">Admission Number</label>
                <input type="text" name="adm_num" class="form-control "  id="adm_num" minlength="10" maxlength="11" />
            </div>
            <div class="col-md-4"> </div>
        </div>
        <div class="row">
            <div class="col-sm-4"> </div>
            <div class="col-sm-4">
                <label>Captcha</label>
                <input type="text" id="txtInput" class="form-control " maxlength="4"/>
            </div>
            <div class="col-sm-4">
                <span id="error" style="color:red"></span>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-4"> </div>
            <div class="col-sm-4">
                <input type="text" id="mainCaptcha"readonly="readonly" class="form-control w-100 mb-1 mt-1" 
                       style='letter-spacing: 30px; font-weight: bolder; color: white; background-color: black;'  />
            </div>
            <div class="col-sm-2">
                <image src="images/refresh_png.png" class="float-left mt-1" alt="refresh" width="50" height="40" id='refresh' onclick="generateCaptchaa();"/>
            </div>
            
             
        </div>
        <div class="row">
            <div class="col-sm-4">
            </div>
            <div class="col-sm-4">
                <button type="button"  class="btn btn-success float-left" id="findAdmbtn" onclick="return findAdmnum()">Get Details</button>
            </div>
            <div class="col-sm-4">
            </div>
        </div>
        <br>
        <div align="center"><a href="javascript:findByNames();">You Can Find Admission Number By Name</a></div>
        
        </div> 
        <br>
<div class="container-fluid" style=" border: 2px solid black !important;
         background-color: white !important; font-weight: bolder; margin: 0 auto; width: 90%;" id='admissiondetails'>
        <div align="center" style="color: tomato; text-decoration: underline;" id="admdetailsheading">ADMISSION DETAILS</div>
        <div class="row" id="namerow">
            <div class="col-2"><label class="float-right">Name</label></div>
            <div class="col-4">
                <label><span id="name"></span>
                    <input type="hidden" name="name"/></label>
            </div>
            <div class="col-2">
                <label class="float-right">ITI Name</label>
            </div>
            <div class="col-4">
                <label><span id="iti_namespan"></span>
                    <input type="hidden" name="iti_name" id="iti_name"/>
                    <input type="hidden" name="iti_code" id="iti_code" /></label>
            </div>
        </div>
        <div class="row" id="distrow">
            <div class="col-2"><label class="float-right">District Name</label></div>
            <div class="col-4">
                <label><span id="dist_namespan"></span>
                    <input type="hidden" name="dist_name" id="dist_name"/>
                    <input type="hidden" name="dist_code" id="dist_code" /></label>
            </div>
            <div class="col-2">
                <label class="float-right">Admission Year</label>
            </div>
            <div class="col-4">
                <label><span id="year_of_admission"></span>
                    <input type="hidden" name="year_of_admission" /></label>
            </div>
        </div>
        <div class="row" id="traderow">
            <div class="col-2"><label class="float-right">Admitted Trade</label></div>
            <div class="col-4">
                <label><span id="trade_codespan"></span>
                    <input type="hidden" name="trade_code" id="trade_code"/>
                    <input type="hidden" name="trade_name" id="trade_name" /></label>
            </div>
        </div>
</div>
    
    <br> 
    <div align="center" id="plcmt_detailstabheading" style="color: tomato; text-decoration: underline; font-weight: bold;">AVAILABLE PLACEMENT DETAILS OF THE CANDIDATE</div>
    <table border="1" id="plcmt_detailstab" class="table table-striped">
        <thead id="plcmt_detailsthead" class="table-dark">
<!--             <tr> -->
<!--                 <th colspan="17" style="text-align: center; background-color: #e4eeb9; font-weight: bolder; padding: 4px;"> -->
<!--                     Name: <span id="namespan"></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; -->
<!--                     Admission Number: <span id="adm_numspan"></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; -->
<!--                    Year of Pass: <span id="yearspan"></span>--> 
<!--                 </th> -->
<!--             </tr> -->
            <tr>
                <th class="text-white">Year of Pass</th>
                <th class="text-white">Placement Type</th>
                <th class="text-white">Name of the Company</th>
                <th class="text-white">Post Name</th>
                <th class="text-white">Salary</th>
                <th class="text-white">Trade</th>
                <th class="text-white">Stipend Amount</th>
                <th class="text-white">Apprenticeship Start Date</th>
                <th class="text-white">Apprenticeship End Date</th>
                <th class="text-white">HR Contact Number</th>
                <th class="text-white">Name of the Course</th>
                <th class="text-white">Name of the College</th>
                <th class="text-white">Name of the Self Employment</th>
                <th class="text-white">Monthly Income</th>
                <!--            <td>District</td>
                            <td>State</td>-->
                <th class="text-white">Address</th>
            </tr>
        </thead>
        <tbody id="plcmt_detailsbody">

        </tbody>
    </table>

    <div class="container-fluid" 
         style="border: 2px solid black !important;
         background-color: #e4eeb9 !important; font-weight: bolder; margin: 0 auto; width: 90%;" 
         id="placementdiv">
        <div align="center" style="color: tomato; text-decoration: underline;">ENTER PLACEMENT DETAILS</div>

        <div class="row" id="monthofpassyeardiv">
            <div class="col-2" id="passmonthlabel"><label class="float-right">Trainee Pass Month&nbsp;&nbsp;<span class="required">*</span></label></div>
            <div class="col-4" id="passmonthdiv">
                <label><select name="passmonth" id="passmonth" 
                               class="custom-select form-control"
                               style="width:340px;" >
                        <option value="">-SELECT-</option>
                        <option value="January">January</option><option value="February">February</option><option value="March">March</option><option value="April">April</option><option value="May">May</option><option value="June">June</option>
                        <option value="July">July</option><option value="August">August</option><option value="September">September</option><option value="October">October</option><option value="November">November</option><option value="December">December</option>
                    </select>
                </label>
            </div>
            <div class="col-2" id="passyearlabel"><label class="float-right">Trainee Pass Year&nbsp;&nbsp;<span class="required">*</span></label></div>
            <div class="col-4" id="passyeardiv"><label>  
                    <select name="passyear" id="passyear" class="custom-select form-control"
                            style="width:340px;">
                        <option value="">-SELECT-</option>
                        <%                                
                            for (int i = start_year; i < current_year; i++) {
                                start_year++;
                        %>
                        <option value='<%=start_year%>'><%=start_year%></option>
                        <% }%>
                    </select>
                </label>
            </div>
        </div>

        <div class="row" id="plcmttypediv">
            
           <div class="col-2" id="plcmtYearLabel"><label class="float-right">Placement Year&nbsp;&nbsp;<span class="required">*</span></label></div>
           <div class="col-4" id="plcmtYearDiv"><label>  
                    
                    <select name="plcmtYear" id="plcmtYear" class="custom-select form-control"
                            style="width:340px;">
                        
                    </select>
                </label>
            </div>
            
            <div class="col-2" id="typelabel"><label class="float-right">Placement Type&nbsp;&nbsp;<span class="required">*</span></label></div>
            <div class="col-4" id="typediv">
                <label>
                    <select name="ptype" onchange="return divs()" id="type" class="custom-select form-control" style="width:340px;">
                        <option value="">-SELECT-</option>
                        <option value="Job">Job</option>
                        <option value="OJ">Other than Job Mela</option>
                        <option value="Apprenticeship">Apprenticeship</option>
                        <option value="OA">Other than Apprenticeship Mela</option>
                        <option value="HigherEducation">Higher Education</option> 
                        <option value="SelfEmployment">Self Employment</option>
                    </select>
                </label>
            </div>
            
            
<!--            <div class="col-2">
                <label class="float-right"></label>
            </div>
            <div class="col-4">
                <label> </label>
            </div>-->
            <!--        </div>
            
                    <div class="row">-->
            <div class="col-2" id="scheduleIdlable">
                <label class="float-right">Schedule&nbsp;&nbsp;<span class="required">*</span></label>
            </div>
            <div class="col-4" id="scheduleIddiv">
                <label>
                    <select name="scheduleId"   id="scheduleId" class="custom-select form-control" >
                    </select>
                </label>
            </div>
            <div class="col-6"></div>
            <div class="col-2" id="nameofcompanydivlabel"><label class="float-right">Company Name&nbsp;&nbsp;<span class="required">*</span></label></div>
            <div class="col-4" id="nameofcompanydiv">
                <label><input type="text" name="pname_of_company" id="pname_of_company" class="form-control" onchange="return name_of_company()" />
                </label>
            </div>
            <div class="col-2" id="postdivlabel">
                <label class="float-right" >Post Name&nbsp;&nbsp;<span class="required">*</span></label>
            </div>
            <div class="col-4" id="postdiv">
                <label><input type="text" name="ppostname" id="ppostname" class="form-control"/>
                </label>
            </div>
            <!--        </div> 
            
                    <div class="row">-->

            <!--        </div>
            
                    <div class="row">-->
            <div class="col-2" id="psalarylabel"><label class="float-right">Salary&nbsp;&nbsp;<span class="required">*</span></label></div>
            <div class="col-4" id="psalarydiv">
                <label><input type="text" name="psalary" id="psalary" class="form-control" maxlength="10"/>
                </label>
            </div>

            <!--        </div>
            
                    <div class="row">-->
            <div class="col-2" id="ptradelabel"><label class="float-right">Apprenticeship Trade&nbsp;&nbsp;<span class="required">*</span></label></div>
            <div class="col-4" id="ptradediv">
                <label><select name="ptrade" id="ptrade" class="custom-select form-control"
                               style="width:340px;">
                    </select>
                </label>

            </div>
            <div class="col-2" id="pstipendamtlabel">
                <label class="float-right">Stipend Amount&nbsp;&nbsp;<span class="required">*</span></label>
            </div>
            <div class="col-4" id="pstipendamtdiv">
                <label><input type="text" name="pstipendamt" id="pstipendamt" class="form-control"/>
                </label>
            </div>
            <!--        </div> 
            
                    <div class="row">-->
            <div class="col-2" id="phrnolabel">
                <label class="float-right">HR Contact Number&nbsp;&nbsp;<span class="required">*</span></label>
            </div>
            <div class="col-4" id="phrnodiv">
                <label><input type="text" name="phrno" id="phrno" class="form-control" maxlength="10"/>
                </label>
            </div> 

            <div class="col-2" id="paaprstartdatelabel"><label class="float-right">Apprenticeship Start Date&nbsp;&nbsp;<span class="required">*</span></label></div>
            <div class="col-4" id="paaprstartdatediv">
                <label>
                    <input type="date" name="paaprstartdate" id="paaprstartdate"
                           class="form-control" style="width:360px;"/> </label>
            </div>
            <div class="col-2" id="paaprenddatelabel">
                <label class="float-right">Apprenticeship End Date&nbsp;&nbsp;<span class="required">*</span></label>
            </div>
            <div class="col-4" id="paaprenddatediv">
                <label><input type="date" name="paaprenddate" 
                              id="paaprenddate" class="form-control" style="width:340px;"/> </label>
            </div>
            <!--       </div>
            
                    <div class="row">-->
            <div class="col-2" id="pcoursenamelabel"><label class="float-right">Course Name&nbsp;&nbsp;<span class="required">*</span></label></div>
            <div class="col-4" id="pcoursenamediv">
                <label><input type="text" name="pcoursename" id="pcoursename" class="form-control"/> </label>
            </div>
            <div class="col-2" id="pclgnamelabel">
                <label class="float-right">College Name&nbsp;&nbsp;<span class="required">*</span></label>
            </div>
            <div class="col-4" id="pclgnamediv">
                <label><input type="text" name="pclgname" id="pclgname" class="form-control" /> </label>
            </div>
            <!--        </div>
            
                    <div class="row">-->
            <div class="col-2" id="pselfemplabel"><label class="float-right">Self Employment Name&nbsp;&nbsp;<span class="required">*</span></label></div>
            <div class="col-4" id="pselfempdiv">
                <label><input type="text" name="pselfemp" id="pselfemp" class="form-control"/> </label>
            </div>
            <div class="col-2" id="pmonthincomelabel">
                <label class="float-right">Monthly Income&nbsp;&nbsp;<span class="required">*</span></label>
            </div>
            <div class="col-4" id="pmonthincomediv">
                <label><input type="text" name="pmonthincome" id="pmonthincome" class="form-control"/> </label>
            </div>
            <!--        </div>
            
                    <div class="row">-->


            <div class="col-2">
                <label class="float-right" id="pstatelabel">State&nbsp;&nbsp;<span class="required">*</span></label>
            </div>
            <div class="col-4" id="pstatediv">
                <label><select name="pstate" id="pstate" onchange="return getDistrictsDropdown()" class="custom-select form-control"
                               style="width:340px;">
                        <option value="">-select-</option>
                    </select>
                </label>
            </div>
            <div class="col-2" id="pdistrictlabel"><label class="float-right">District&nbsp;&nbsp;<span class="required">*</span></label></div>
            <div class="col-4" id="pdistrictdiv">
                <label><select name="pdistrict" id="pdistrict" class="custom-select form-control"
                               style="width:340px;">
                        <option value="">-select-</option>
                    </select>
                </label>
            </div>

            <div class="col-2" id="paddresslabel"><label class="float-right">Address&nbsp;&nbsp;<span class="required">*</span></label></div>
            <div class="col-4" id="paddressdiv">
                <label><textarea name="paddress" id="paddress" rows="4" cols="50" class="form-control"></textarea> </label>
            </div>
        </div>
        <div class="row">
            <div class="col-4"></div>
            <div class="col-4">
                <input type="button" class="btn btn-success w-100" value="Submit" id="submit" onclick="return senddata();"/>
            </div>
            <div class="col-4"> </div>
        </div>
        <div class="row">
            <div class="col-8">Note:<span class="required">* means mandatory field</span></div>
            <div class="col-4">
            </div>
        </div>
    </div>

    <!--       ============================Model for Admission Numbers Serach============-->
    <div id="myModal1" class="modal1">
        <div class="modal-content1">
            <span class="close1" style="color: red; font-weight: bold;">&#9746;</span>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <div align="center">
                <h5 class="h5" style="margin: 0 auto; color: blueviolet;">Find Admission Number By Using Canidate Name</h5>
                <div class="container-fluid" style="background-color: #e4eeb9 !important; font-weight: bolder; margin: 0 auto; width: 80%;" id="formdiv">
                    <div class="row">
                        <div class="col-4">
                            <label class="float-right">Candidate Name</label>
                        </div>
                        <div class="col-4">
                            <input type="text" name="message" id="findName" class="form-control w-100" />
                        </div>
                        <div class="col-4"></div>
                    </div>
                    <div class="row">
                        <div class="col-4"></div>
                        <div class="col-4">
                            <button type="button" class="btn btn-info float-left mt-1" onclick="return findByName();" id="admnumtablesubmitbtn">Search</button>
                        </div>
                    </div>

                </div>
                <br>
                <div id="scrollbar">
                    <table id="admnumtable" border="1" style="height: 100%;" 
                           class="table table-bordered table-info">
                        <thead id="admnumtableheader" class="table-dark">
                        <th class="admnumtableth text-white pl-4">Name</th>
                        <th class="admnumtableth text-white pl-4">Father Name</th>
                        <th class="admnumtableth text-white pl-4">Admission Number</th>
                        </thead>
                        <tbody id="admnumtablebody">

                        </tbody>
                    </table>
                </div>
            </div>
            <br>


        </div>
    </div>
    <!--Model for Alert Messages============-->
    <div id="myModalalert" class="modalalert">
        <div class="modal-contentalert">
            <div align="center">
                <button type="button" class="btn btn-success alert-close">&#x2716;</button>
                <span id="saveplcmtsuccessmsg"></span>
            </div>
        </div>
    </div>
    <!--Modal for Error Alerts-->
    <div id="myModalErroralert" class="modalErroralert">
        <div class="modal-contenterroralert">
            <div align="center">
                <button type="button" class="btn btn-success alertError-close">&#x2716;</button>
                <span id="alertError"></span><br>
                <img src="./images/error.jpg" width="40%" height="40%" alt="ERROR"/>
            </div>
        </div>
    </div>

   

    <!--Operation Succes Model-->
    <div id="myModalSuccess" class="mymodalsuccess">
        <div class="successcontent">
            <button type="button" class="btn btn-warning successclose" style="margin-left: 90%;">&#x2716;</button><br><br>
            <div align="center">
                <img src="./images/approve.jpg" width="20%" height="20%" alt="DELETE"/><br>
                <h3 style="color: red; font-weight: bolder; font-size: x-large">
                    <span id="successmsg"></span>
                </h3><br>

            </div>
        </div>
    </div>

    <!--    Saving Placement Confirmation Model-->
    <div id="savingPlcmtModel" class="savingplcmtmodel">
        <div class="savingplcmtcontent">
            <!--            <button type="button" class="btn btn-warning savesuccessclose" style="margin-left: 90%;">&#x2716;</button><br><br>-->
            <div align="center">
                <img src="./images/savefile.jpg" width="20%" height="20%" alt="SAVING"/>
                <h3 style="color: red; font-weight: bolder; font-size: x-large">
                    <span id="savemsg"></span>
                </h3><br>
                <button type="button" class="btn btn-success" onclick="return savePlacement();">SAVE</button>
                <button type="button" class="btn btn-warning savesuccessclose">CANCEL</button><br><br>
            </div>
        </div>
    </div>

    <!--    Admission Data Not Found Model-->
    <div id="admnotfound" class="admNotFound">
        <div class="admnotfound-content">
            <button type="button" class="btn btn-warning notfoundclose" style="margin-left: 90%;">&#x2716;</button><br>
            <div align="center">

                <h3 style="color: red; font-weight: bolder; font-size: x-large">
                    <span>Given Admission Number is not Found</span>
                </h3><br>
                <img src="./images/nodata.jpg" width="20%" height="20%" alt="SAVING"/>
            </div>
        </div>
    </div>
</body>
</html>