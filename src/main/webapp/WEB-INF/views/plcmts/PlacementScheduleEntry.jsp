<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
    <%
String placementScheduleEntryJwtToken = (String) session.getAttribute("jwtToken");
System.out.println("placementScheduleEntryJwtToken=>" + placementScheduleEntryJwtToken);

String placementScheduleEntryInsCode = (String) session.getAttribute("insCode");
System.out.println("placementScheduleEntryInsCode=>" + placementScheduleEntryInsCode);

String placementScheduleEntryRoleId = (String) session.getAttribute("roleId");
System.out.println("placementScheduleEntryRoleId=>" + placementScheduleEntryRoleId);

String placementScheduleEntryapisUrl = (String) session.getAttribute("apisUrl");
System.out.println("placementScheduleEntryapisUrl=>" + placementScheduleEntryapisUrl);


%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Placement Schedule Entry</title>
<link href="./bootstrap-5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
<script src="./bootstrap-5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<script src="./js/jquery-3.7.1.min.js"></script>
<script src="./js/siteScript.js"></script>
<script src="./js/CustomJs/plcmtsJs/placementScheduleEntryJs.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.17.0/xlsx.full.min.js"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
<script>
var jwtToken = 'Bearer '+'<%=placementScheduleEntryJwtToken%>';
var insCode =  '<%=placementScheduleEntryInsCode%>';
var roleId = '<%=placementScheduleEntryRoleId%>';
var baseUrl = '<%=placementScheduleEntryapisUrl%>';
</script>
<style>
.required{
    color: red;
    
}

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
</style>
</head>
<body>
<%@include file="/WEB-INF/views/public/banner.jsp"%>
<%@include file="/WEB-INF/views/userpages/userInfoNavbar.jsp"%>
<br>
<div align="center" class="text-info font-weight-bolder"> PLACEMENT SCHEDULE ENTRY FORM </div>

    <div class="container inline-grid" style=" border: 2px solid black !important;
         background-color: #e4eeb9 !important; font-weight: bolder;
         margin: 0 auto; width: 90%;" id="formdiv"><br>

        <div class="row">
            <div class="col-sm-2 mt-1">Schedule Type</div>
            <div class="col-sm-2"><select name="scheduleType" id="scheduleType" class="custom-select form-control w-100"
                                          style="width:340px;" >
                    <option value="">-select-</option>
                    <option value="Job">JOB</option>
                    <option value="Apprenticeship">APPRENTICESHIP</option>
                </select></div>
            <div class="col-sm-2 mt-1">Schedule Date</div>
            <div class="col-sm-2"><input type="date" name="scheduleDate" id="scheduleDate" 
                                         class="form-control w-100" style="width:340px;"/></div>
            <div class="col-sm-2 mt-1">Schedule Location</div>
            <div class="col-sm-2 text-primary"><select name="scheduleLocation" class="custom-select form-control w-100"
                                                       id="scheduleLocation"
                                                       style="width:340px;" >
                    <option value="">-select-</option>
                </select></div>
        </div>
        <div class="row">
            <div class="col-sm-2">Event Description</div>
            <div class="col-sm-2 mt-1"><textarea id="scheduleDesc" name="scheduleDesc" rows="2" cols="50"></textarea></div>
        </div>
        <div class="row">
            <div class="col-sm-2"></div>
            <div class="col-sm-2"></div>
            <div class="col-sm-4">
                <input type="button" class="btn btn-success mb-1 mt-1 w-50"
                       value="Submit" id="submit" onclick="return validate();"/>
            </div>
            <div class="col-sm-2"> </div>
        </div>

    </div>

    <!--Operation Succes Model-->
    <div id="myModalSuccess" class="mymodalsuccess">
        <div class="successcontent">
            <button type="button" class="btn btn-warning successclose" style="margin-left: 90%;">&#x2716;</button><br><br>
            <div align="center">
                <img src="./images/approve.jpg" width="20%" height="20%" alt="DELETE"/><br>
                <h3 style="color: green; font-weight: bolder; font-size: x-large">
                    <span id="successmsg"></span>
                </h3><br>

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


    <div align="center" class="text-info font-weight-bolder mt-2">AVAILABLE PLACEMENT SCHEDULES</div>

    <table class="table table-striped m-1">
        <thead class="table-dark">
        <tr>
        <th class="text-white">ID</th>
        <th class="text-white">LOCATION</th>
        <th class="text-white">DATE</th>
        <th class="text-white">TYPE</th>
        <th class="text-white">DESCRIPTION</th>
        </tr>
    </thead>
    <tbody id='schedulebody'>

    </tbody>
</table>
</body>
</html>