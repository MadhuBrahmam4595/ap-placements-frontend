<%@ page contentType="text/html;charset=UTF-8" %>
<html>
<head>
    <title>AITT Private Candidate Report</title>

    <link rel="stylesheet" href="bootstrap-5.3.3/dist/css/bootstrap.min.css">
    <script src="js/jquery-3.7.1.min.js"></script>
</head>

<body class="container mt-4">

<h3 class="mb-4">AITT Private Candidate Report</h3>

<div class="row mb-3">
    <div class="col-md-4">
        <input type="number" id="candidateId"
               class="form-control"
               placeholder="Enter Candidate ID">
    </div>
    <div class="col-md-2">
        <button class="btn btn-primary" onclick="fetchReport()">
            Fetch Report
        </button>
    </div>
</div>

<hr/>

<div id="reportSection" style="display:none">

    <div class="row mb-3">
        <div class="col-md-9">
            <table class="table table-bordered">
                <tr><th>Applicant Name</th><td id="applicantName"></td></tr>
                <tr><th>Father Name</th><td id="fatherName"></td></tr>
                <tr><th>Mother Name</th><td id="motherName"></td></tr>
                <tr><th>DOB</th><td id="dob"></td></tr>
                <tr><th>Age</th><td id="age"></td></tr>
                <tr><th>Gender</th><td id="gender"></td></tr>
                <tr><th>Category</th><td id="category"></td></tr>
                <tr><th>Caste</th><td id="caste"></td></tr>
                <tr><th>Sub Caste</th><td id="subCaste"></td></tr>
                <tr><th>PWD</th><td id="pwd"></td></tr>
                <tr><th>EWS</th><td id="ews"></td></tr>
            </table>
        </div>

        <div class="col-md-3 text-center">
            <img id="photo"
                 class="img-thumbnail"
                 style="width:200px;height:220px"
                 alt="Photo"/>
        </div>
    </div>

</div>

<script>
    function fetchReport() {

        const id = $("#candidateId").val();

        if (!id) {
            alert("Please enter candidate ID");
            return;
        }

        $.ajax({
            url: "http://localhost:8086/placementsbe/api/applicants/report/" + id,
            type: "GET",
            success: function (res) {

                $("#reportSection").show();

                $("#applicantName").text(res.applicantName);
                $("#fatherName").text(res.fatherName);
                $("#motherName").text(res.motherName);
                $("#dob").text(res.dob);
                $("#age").text(res.age);
                $("#gender").text(res.gender);
                $("#category").text(res.category);
                $("#caste").text(res.casteName);
                $("#subCaste").text(res.subCasteName);
                $("#pwd").text(res.pwdFlag + " " + (res.pwdCategory || ""));
                $("#ews").text(res.ewsFlag);

                if (res.photoBase64) {
                    $("#photo").attr(
                        "src",
                        "data:" + res.photoContentType + ";base64," + res.photoBase64
                    );
                } else {
                    $("#photo").attr("src", "");
                }
            },
            error: function () {
                alert("Candidate not found");
                $("#reportSection").hide();
            }
        });
    }
</script>

</body>
</html>
