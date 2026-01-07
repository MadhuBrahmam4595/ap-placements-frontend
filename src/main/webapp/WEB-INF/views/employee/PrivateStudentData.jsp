<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>

<%
    String privateStudentRegistrationJwtToken = (String) session.getAttribute("jwtToken");
    System.out.println("privateStudentRegistrationJwtToken=>" + privateStudentRegistrationJwtToken);

    String privateStudentRegistrationInsCode = (String) session.getAttribute("insCode");
    System.out.println("privateStudentRegistrationInsCode=>" + privateStudentRegistrationInsCode);

    String privateStudentRegistrationapisUrl = (String) session.getAttribute("apisUrl");
    System.out.println("privateStudentRegistrationapisUrl=>" + privateStudentRegistrationapisUrl);
%>


<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Private Candidate AITT Under CTS </title>
    <link href="./bootstrap-5.3.3/dist/css/bootstrap.min.css"
          rel="stylesheet">
    <script src="./bootstrap-5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <script src="./js/jquery-3.7.1.min.js"></script>
    <script src="./js/siteScript.js"></script>
    <%--    <script src="./js/CustomJs/EmployeeJs/EmployeRegistrationJs.js"></script>--%>
    <script
            src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.17.0/xlsx.full.min.js"></script>
    <link rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <script>
        var jwtToken = 'Bearer ' + '<%=privateStudentRegistrationJwtToken%>';
        var insCode = '<%=privateStudentRegistrationInsCode%>';
        var baseUrl = '<%=privateStudentRegistrationapisUrl%>';
    </script>


    <script>
        document.addEventListener("DOMContentLoaded", function () {

            const casteSelect = document.getElementById("casteSelect");

            fetch(baseUrl + "masterdata/getAllByOrderByCasteCategoryAsc")
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Failed to fetch caste list");
                    }
                    return response.json();
                })
                .then(data => {
                    data.forEach(item => {
                        const option = document.createElement("option");
                        option.value = item.casteId;              // value = casteId
                        option.textContent = item.casteCategory; // text = casteCategory
                        casteSelect.appendChild(option);
                    });
                })
                .catch(error => {
                    console.error("Error loading caste data:", error);
                });

        });
    </script>
    <script>
        document.addEventListener("DOMContentLoaded", function () {

            const casteSelect = document.getElementById("casteSelect");
            const subCasteSelect = document.getElementById("subCasteSelect");

            casteSelect.addEventListener("change", function () {

                const casteId = this.value;

                // Reset Sub-Caste dropdown
                subCasteSelect.innerHTML = '<option value="">--SELECT--</option>';

                if (!casteId) {
                    return; // no caste selected
                }

                const url = baseUrl + "masterdata/getByCasteMasterCasteIdOrderBySubCasteAsc?casteId=" + casteId;

                fetch(url)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error("Failed to fetch sub caste list");
                        }
                        return response.json();
                    })
                    .then(data => {
                        data.forEach(item => {
                            const option = document.createElement("option");
                            option.value = item.subCasteId;   // value = subCasteId
                            option.textContent = item.subCaste; // text = subCaste name
                            subCasteSelect.appendChild(option);
                        });
                    })
                    .catch(error => {
                        console.error("Error loading sub caste data:", error);
                    });
            });

        });
    </script>
    <script>
        document.addEventListener('DOMContentLoaded', function () {
            const pwdFlag = document.getElementById('pwdFlag');
            const pwdCategory = document.getElementById('pwdCategory');

            // Initial state
            pwdFlag.value = 'No';
            pwdCategory.disabled = true;
            pwdCategory.value = '';

            // On change
            pwdFlag.addEventListener('change', function () {
                if (this.value === 'Yes') {
                    pwdCategory.disabled = false;
                } else {
                    pwdCategory.disabled = true;
                    pwdCategory.value = '';
                }
            });
        });
    </script>
    <script>

        document.addEventListener("DOMContentLoaded", function () {
            document.getElementById("submitBtn").addEventListener("click", function () {
                submitApplication();
            });
        });

        function submitApplication() {

            event?.preventDefault();

            if (!validateInputs()) {
                return;
            }

            qualifications = collectQualifications();

            const experienceList = [];

            document.querySelectorAll(".experience-row").forEach(row => {

                const industryName = row.querySelector(".industryName").value.trim();

                // skip empty rows
                if (!industryName) return;

                experienceList.push({
                    industryName: industryName,
                    designation: row.querySelector(".designation").value,
                    fromDate: row.querySelector(".fromDate").value,
                    toDate: row.querySelector(".toDate").value,
                    yearsMonths: row.querySelector(".yearsMonths").value
                });
            });

            var form = document.getElementById("labForm1");
            var formData = new FormData();

            // Build JSON object
            var data = {
                // =======PERSONAL DETAILS ====
                category: form.category.value,
                applicantName: form.applicantName.value,
                fatherName: form.fatherName.value,
                fatherOccupation: form.fatherOccupation.value,
                motherName: form.motherName.value,
                dob: form.dob.value,
                age: form.age.value,
                gender: form.gender.value,
                casteId: form.caste.value,
                subCasteId: form.subcaste.value,
                pwdFlag: form.pwdFlag.value,
                pwdCategory: form.pwdCategory.value,
                ewsFlag: form.ewsFlag.value,

                // ===== ADDRESS & CONTACT DETAILS =====
                permanentAddress: form.permanentAddress.value,
                correspondenceAddress: form.correspondenceAddress.value,
                mobile: form.mobile.value,
                aadhar: form.aadhar.value,
                email: form.email.value,
                tradeApplied: form.tradeApplied.value,   // AE, AW, etc.

                // ========= EDUCATIONAL & TECHNICAL QUALIFICATIONS
                qualifications: collectQualifications(),

                // ===== PRESENT WORKING DETAILS =====
                officeAddress: form.officeAddress.value,
                employeeIdNumber: form.employeeIdNumber.value,
                employerMobile: form.employerMobile.value,
                employerEmail: form.employerEmail.value,
                industryRegistrationDetails: form.industryRegistrationDetails.value,

                // ===== ESTABLISHMENT & STATUTORY DETAILS =====
                atsRegistered: form.atsRegistered.value,
                msmeRegistered: form.msmeRegistered.value,
                factoriesAct: form.factoriesAct.value,
                shopsAct: form.shopsAct.value,

                apprenticeActDate: form.apprenticeActDate.value,

                experienceCert: form.experienceCert.value,
                characterCert: form.characterCert.value,

                gpfEpfNo: form.gpfEpfNo.value,
                gpfEpfDate: form.gpfEpfDate.value,

                esiNo: form.esiNo.value,
                esiDate: form.esiDate.value,
                workExperiences: experienceList

            };

            // Append JSON as Blob
            formData.append(
                "data",
                new Blob([JSON.stringify(data)], {type: "application/json"})
            );

            // Append photo file
            var photoFile = form.photo.files[0];
            if (photoFile) {
                formData.append("photo", photoFile);
            }

            const submitBtn = document.getElementById("submitBtn");
            submitBtn.disabled = true;
            submitBtn.textContent = "Submitting...";


            // jQuery AJAX call
            $.ajax({
                type: "POST",
                url: baseUrl + "api/applicants",
                headers: {
                    'Authorization': jwtToken
                },
                data: formData,
                processData: false,   // DO NOT REMOVE
                contentType: false,   // DO NOT REMOVE
                cache: false,
                timeout: 600000,
                success: function (id) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = "Submit Application";

                    showMessageModal(
                        "Application Submitted",
                        "Applicant saved successfully.<br><strong>Application ID:</strong> " + id,
                        true
                    );
                    form.reset();
                },
                error: function (xhr, status, error) {

                    submitBtn.disabled = false;
                    submitBtn.textContent = "Submit Application";

                    let errorMsg = "Error while saving application";

                    if (xhr.responseText) {
                        errorMsg += "<br><small>" + xhr.responseText + "</small>";
                    }

                    showMessageModal(
                        "Submission Failed",
                        errorMsg,
                        false
                    );
                }

            });
        }
    </script>
    <script>
        document.addEventListener("DOMContentLoaded", function () {

            const tradeSelect = document.getElementById("tradeSelect");

            fetch(baseUrl + "masterdata/getAllTrades", {
                method: "GET",
                headers: {
                    "Authorization": jwtToken,
                    "Content-Type": "application/json"
                }
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Failed to fetch trade list");
                    }
                    return response.json();
                })
                .then(data => {
                    data.forEach(item => {
                        const option = document.createElement("option");
                        option.value = item.tradeShort;   // AE, AW, etc.
                        option.textContent = item.tradeName; // Advanced Welder
                        tradeSelect.appendChild(option);
                    });
                })
                .catch(error => {
                    console.error("Error loading trade data:", error);
                });

        });
    </script>
    <script>
        function allowOnlyNumbers(event) {
            event.target.value = event.target.value.replace(/\D/g, '');
        }
    </script>
    <script>
        function validateInputs() {

            const mobile = document.getElementById("mobile").value.trim();
            const aadhar = document.getElementById("aadhar").value.trim();
            const email = document.getElementById("email").value.trim();

            const mobileRegex = /^[6-9]\d{9}$/;
            const aadharRegex = /^\d{12}$/;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!mobileRegex.test(mobile)) {
                alert("Please enter a valid 10-digit mobile number");
                return false;
            }

            if (!aadharRegex.test(aadhar)) {
                alert("Aadhaar number must be exactly 12 digits");
                return false;
            }

            if (!emailRegex.test(email)) {
                alert("Please enter a valid email address");
                return false;
            }

            return true;
        }
    </script>

    <script>
        function addQualification() {

            const container = document.getElementById("qualificationRows");

            const row = document.createElement("div");
            row.className = "row m-1 border p-2 qualification-row";

            row.innerHTML = `
        <div class="col-md-2">
            <input placeholder="From Year" class="form-control fromYear">
        </div>
        <div class="col-md-2">
            <input placeholder="To Year" class="form-control toYear">
        </div>
        <div class="col-md-3">
            <input placeholder="Institute" class="form-control instituteName">
        </div>
        <div class="col-md-2">
            <input placeholder="Trade" class="form-control tradeName">
        </div>
        <div class="col-md-2">
            <input placeholder="Exam" class="form-control examName">
        </div>
        <div class="col-md-1">
            <button type="button" class="btn btn-danger" onclick="this.closest('.qualification-row').remove()">✕</button>
        </div>
        <div class="col-md-2 mt-1">
            <input placeholder="Marks / GPA" class="form-control sscMarks">
        </div>
    `;
            container.appendChild(row);
        }

        function collectQualifications() {

            const rows = document.querySelectorAll(".qualification-row");
            const qualifications = [];

            rows.forEach(row => {
                qualifications.push({
                    fromYear: row.querySelector(".fromYear").value,
                    toYear: row.querySelector(".toYear").value,
                    instituteName: row.querySelector(".instituteName").value,
                    tradeName: row.querySelector(".tradeName").value,
                    examName: row.querySelector(".examName").value,
                    sscMarks: row.querySelector(".sscMarks").value
                });
            });

            return qualifications;
        }


    </script>

    <script>
        function addExperience() {

            const row = document.createElement("div");
            row.className = "row m-1 border p-2 experience-row";

            row.innerHTML = `
        <div class="col-md-3">
            <input class="form-control industryName" placeholder="Industry Name">
        </div>

        <div class="col-md-2">
            <input class="form-control designation" placeholder="Designation">
        </div>

        <div class="col-md-2">
            <input type="date" class="form-control fromDate">
        </div>

        <div class="col-md-2">
            <input type="date" class="form-control toDate">
        </div>

        <div class="col-md-2">
            <input class="form-control yearsMonths" placeholder="Y/M">
        </div>

        <div class="col-md-1">
            <button type="button"
                    class="btn btn-danger"
                    onclick="this.closest('.experience-row').remove()">
                X
            </button>
        </div>
    `;

            document.getElementById("experienceContainer").appendChild(row);
        }
    </script>
    <script>
        function showMessageModal(title, message, isSuccess = true) {
            const modalTitle = document.getElementById("messageModalTitle");
            const modalBody = document.getElementById("messageModalBody");

            modalTitle.textContent = title;
            modalBody.innerHTML = message;

            // Optional color handling
            modalTitle.className = isSuccess
                ? "modal-title text-success"
                : "modal-title text-danger";

            const modal = new bootstrap.Modal(
                document.getElementById("messageModal")
            );
            modal.show();
        }

    </script>



</head>
<body>
<%@include file="/WEB-INF/views/public/banner.jsp" %>
<%@include file="/WEB-INF/views/userpages/userInfoNavbar.jsp" %>
<div class="container border p-2 mt-2 shadow-lg"
     style="border-radius: 5px;">
    <div align="center" style="text-decoration: underline; color: fuchsia; font-weight: bolder;">APPLICATION FORM FOR
        APPEARING AITT UNDER CTS AS PRIVATE CANDIDATE -2026
    </div>
    <%--    <form id="labForm1" enctype="multipart/form-data" method="aittForm">--%>
    <form id="labForm1" enctype="multipart/form-data" method="post">

        <!-- ================= PERSONAL DETAILS ================= -->
        <div class="card mb-4 shadow-sm">
            <div class="card-header bg-success text-white">
                <h5 class="mb-0">PERSONAL DETAILS</h5>
            </div>

            <div class="card-body">

                <div class="row m-1">
                    <div class="col-md-4">
                        <label>Category</label>
                        <select name="category" class="form-select">
                            <option value="">--SELECT--</option>
                            <option>Allied Trade</option>
                            <option>CoE</option>
                            <option>SCVT</option>
                            <option>Others</option>
                        </select>
                    </div>

                    <div class="col-md-4">
                        <label>Applicant Full Name</label>
                        <input type="text" name="applicantName" class="form-control">
                    </div>

                    <div class="col-md-4">
                        <label>Photo</label>
                        <input type="file" name="photo" class="form-control" accept="image/*">
                    </div>
                </div>

                <div class="row m-1">
                    <div class="col-md-4">
                        <label>Father’s Name</label>
                        <input type="text" name="fatherName" class="form-control">
                    </div>

                    <div class="col-md-4">
                        <label>Father’s Occupation</label>
                        <input type="text" name="fatherOccupation" class="form-control">
                    </div>

                    <div class="col-md-4">
                        <label>Mother’s Name</label>
                        <input type="text" name="motherName" class="form-control">
                    </div>
                </div>

                <div class="row m-1">
                    <div class="col-md-4">
                        <label>Date of Birth</label>
                        <input type="date" name="dob" class="form-control">
                    </div>

                    <div class="col-md-2">
                        <label>Age</label>
                        <input type="number"
                               name="age"
                               id="age"
                               class="form-control"
                               min="14"
                               max="100"
                               step="1"
                               required>

                    </div>

                    <div class="col-md-3">
                        <label>Gender</label>
                        <select name="gender" class="form-select">
                            <option value="">--SELECT--</option>
                            <option>Male</option>
                            <option>Female</option>
                            <option>Other</option>
                        </select>
                    </div>

                    <div class="col-md-3">
                        <label>Caste</label>
                        <select name="caste" id="casteSelect" class="form-select">
                            <option value="">--SELECT--</option>
                        </select>
                    </div>

                </div>

                <div class="row m-1">

                    <div class="col-md-3">
                        <label>Sub Caste</label>
                        <select name="subcaste" id="subCasteSelect" class="form-select">
                            <option value="">--SELECT--</option>
                        </select>
                    </div>

                    <div class="col-md-3">
                        <label for="pwdFlag">PWD</label>
                        <select id="pwdFlag" name="pwdFlag" class="form-select">
                            <option value="No" selected>No</option>
                            <option value="Yes">Yes</option>
                        </select>
                    </div>

                    <div class="col-md-3">
                        <label for="pwdCategory">PWD Category</label>
                        <select id="pwdCategory" name="pwdCategory" class="form-select" disabled>
                            <option value="">None</option>
                            <option value="1">Blind</option>
                            <option value="2">Deaf</option>
                            <option value="3">Motor Disability</option>
                            <option value="4">Mental Disability</option>
                        </select>
                    </div>


                    <div class="col-md-3">
                        <label>EWS</label>
                        <select name="ewsFlag" class="form-select">
                            <option>No</option>
                            <option>Yes</option>
                        </select>
                    </div>
                </div>

            </div>
        </div>

        <!-- ================= ADDRESS & CONTACT ================= -->
        <div class="card mb-4 shadow-sm">
            <div class="card-header bg-success text-white">
                <h5 class="mb-0">ADDRESS & CONTACT DETAILS</h5>
            </div>

            <div class="card-body">

                <div class="row m-1">
                    <div class="col-md-6">
                        <label>Permanent Address</label>
                        <textarea name="permanentAddress" class="form-control"></textarea>
                    </div>

                    <div class="col-md-6">
                        <label>Correspondence Address</label>
                        <textarea name="correspondenceAddress" class="form-control"></textarea>
                    </div>
                </div>

                <div class="row m-1">
                    <div class="col-md-3">
                        <label>Mobile No</label>
                        <input type="text"
                               name="mobile"
                               id="mobile"
                               class="form-control"
                               maxlength="10"
                               pattern="[6-9][0-9]{9}"
                               title="Enter a valid 10-digit Indian mobile number"
                               required
                               oninput="allowOnlyNumbers(event)">

                    </div>

                    <div class="col-md-3">
                        <label>Aadhar No</label>
                        <input type="text"
                               name="aadhar"
                               id="aadhar"
                               class="form-control"
                               maxlength="12"
                               pattern="[0-9]{12}"
                               title="Aadhaar number must be exactly 12 digits"
                               required
                               oninput="allowOnlyNumbers(event)"
                               onpaste="return false;">

                    </div>

                    <div class="col-md-3">
                        <label>Email ID</label>
                        <input type="email"
                               name="email"
                               id="email"
                               class="form-control"
                               maxlength="100"
                               required>

                    </div>

                    <div class="col-md-3">
                        <label>Trade Applying For</label>
                        <select name="tradeApplied" id="tradeSelect" class="form-select">
                            <option value="">--SELECT--</option>
                        </select>
                    </div>

                </div>

            </div>
        </div>

        <!-- ================= QUALIFICATIONS ================= -->
        <div class="card mb-4 shadow-sm">
            <div class="card-header bg-success text-white">
                <h5 class="mb-0">EDUCATIONAL & TECHNICAL QUALIFICATIONS</h5>
            </div>

            <div class="card-body">
                <div id="qualificationContainer">

                    <div class="row m-1 border p-2 qualification-row">
                        <div class="col-md-4">
                            <label>From Year</label>
                            <input class="form-control fromYear">
                        </div>

                        <div class="col-md-4">
                            <label>To Year</label>
                            <input class="form-control toYear">
                        </div>

                        <div class="col-md-4">
                            <label>Institute Name</label>
                            <input class="form-control instituteName">
                        </div>

                        <div class="col-md-4 mt-2">
                            <label>Trade</label>
                            <input class="form-control tradeName">
                        </div>

                        <div class="col-md-4 mt-2">
                            <label>Exam</label>
                            <input class="form-control examName">
                        </div>

                        <div class="col-md-3 mt-2">
                            <label>SSC Marks / GPA</label>
                            <input class="form-control sscMarks">
                        </div>

                        <div class="col-md-1 mt-4">
                            <button type="button"
                                    class="btn btn-info"
                                    onclick="addQualification()">
                                Add
                            </button>
                        </div>
                    </div>
                </div>

                <div id="qualificationRows"></div>

            </div>
        </div>

        <!-- ================= PRESENT WORKING DETAILS ================= -->
        <div class="card mb-4 shadow-sm">
            <div class="card-header bg-success text-white"><h5>PRESENT WORKING DETAILS</h5></div>
            <div class="card-body">

                <div class="row m-1">
                    <div class="col-md-12">
                        <label>Office / Establishment Name & Address</label>
                        <textarea name="officeAddress" class="form-control"></textarea>
                    </div>
                </div>

                <div class="row m-1">
                    <div class="col-md-4">
                        <label>Employee ID Number</label>
                        <input name="employeeIdNumber" class="form-control">
                    </div>
                    <div class="col-md-4">
                        <label>Employer Mobile Number</label>
                        <input name="employerMobile" class="form-control">
                    </div>
                    <div class="col-md-4">
                        <label>Employer Email ID</label>
                        <input name="employerEmail" class="form-control">
                    </div>
                </div>

                <div class="row m-1">
                    <div class="col-md-12">
                        <label>Industry / Establishment Registration Details</label>
                        <textarea name="industryRegistrationDetails" class="form-control"></textarea>
                    </div>
                </div>

            </div>
        </div>
        <div class="card mb-4 shadow-sm">
            <div class="card-header bg-success text-white">
                <h5 class="mb-0">WORK EXPERIENCE DETAILS</h5>
            </div>

            <div class="card-body">

                <div id="experienceContainer">

                    <!-- FIRST ROW (treated same as dynamic rows) -->
                    <div class="row m-1 border p-2 experience-row">

                        <div class="col-md-3">
                            <label>Industry Name</label>
                            <input class="form-control industryName">
                        </div>

                        <div class="col-md-2">
                            <label>Designation</label>
                            <input class="form-control designation">
                        </div>

                        <div class="col-md-2">
                            <label>From</label>
                            <input type="date" class="form-control fromDate">
                        </div>

                        <div class="col-md-2">
                            <label>To</label>
                            <input type="date" class="form-control toDate">
                        </div>

                        <div class="col-md-2">
                            <label>Experience (Y/M)</label>
                            <input class="form-control yearsMonths">
                        </div>

                        <div class="col-md-1 mt-4">
                            <button type="button"
                                    class="btn btn-info"
                                    onclick="addExperience()">
                                Add
                            </button>
                        </div>

                    </div>
                </div>

            </div>
        </div>

        <!-- ================= ESTABLISHMENT & STATUTORY DETAILS ================= -->
        <div class="card mb-4 shadow-sm">
            <div class="card-header bg-success text-white">
                <h5 class="mb-0">ESTABLISHMENT & STATUTORY DETAILS</h5>
            </div>

            <div class="card-body">

                <!-- ===== Point 26 ===== -->
                <h6 class="fw-bold"> Whether the Establishment is covered under any of the following (Yes / No):</h6>

                <table class="table table-bordered">
                    <tr>
                        <td>a) Implementing Apprenticeship Training Scheme (ATS) and registered under Apprenticeship
                            Portal
                        </td>
                        <td>
                            <input type="radio" name="atsRegistered" value="Yes"> Yes
                            <input type="radio" name="atsRegistered" value="No"> No
                        </td>
                    </tr>
                    <tr>
                        <td>b) Registered MSMEs</td>
                        <td>
                            <input type="radio" name="msmeRegistered" value="Yes"> Yes
                            <input type="radio" name="msmeRegistered" value="No"> No
                        </td>
                    </tr>
                    <tr>
                        <td>c) Registered with Govt / Local Authorities / covered under Factories Act, 1948</td>
                        <td>
                            <input type="radio" name="factoriesAct" value="Yes"> Yes
                            <input type="radio" name="factoriesAct" value="No"> No
                        </td>
                    </tr>
                    <tr>
                        <td>d) Shops and Establishments Act applicable for the State</td>
                        <td>
                            <input type="radio" name="shopsAct" value="Yes"> Yes
                            <input type="radio" name="shopsAct" value="No"> No
                        </td>
                    </tr>
                </table>

                <!-- ===== Point 27 ===== -->
                <div class="row m-1">
                    <div class="col-md-6">
                        <label>If Yes, from which date implementing Apprentice Act:</label>
                        <input type="date" name="apprenticeActDate" class="form-control">
                    </div>
                </div>

                <!-- ===== Point 28 ===== -->
                <div class="row m-1">
                    <div class="col-md-6">
                        <label>Experience Certificate from Employer Enclosed:</label><br>
                        <input type="radio" name="experienceCert" value="Yes"> Yes
                        <input type="radio" name="experienceCert" value="No"> No
                    </div>
                </div>

                <!-- ===== Point 29 ===== -->
                <div class="row m-1">
                    <div class="col-md-6">
                        <label>29. Character Certificate from Employer Enclosed:</label><br>
                        <input type="radio" name="characterCert" value="Yes"> Yes
                        <input type="radio" name="characterCert" value="No"> No
                    </div>
                </div>

                <!-- ===== Point 30 ===== -->
                <div class="row m-1">
                    <div class="col-md-6">
                        <label>30. GPF / EPF Number</label>
                        <input type="text" name="gpfEpfNo" class="form-control">
                    </div>
                    <div class="col-md-6">
                        <label>Date of Commencement</label>
                        <input type="date" name="gpfEpfDate" class="form-control">
                    </div>
                    <!--             <div class="col-md-4"> -->
                    <!--                 <label>Upload Proof (Self-attested)</label> -->
                    <!--                 <input type="file" name="gpfEpfProof" class="form-control"> -->
                    <!--             </div> -->
                </div>

                <!-- ===== Point 31 ===== -->
                <div class="row m-1">
                    <div class="col-md-6">
                        <label>31. ESI Number</label>
                        <input type="text" name="esiNo" class="form-control">
                    </div>
                    <div class="col-md-6">
                        <label>Date of Commencement</label>
                        <input type="date" name="esiDate" class="form-control">
                    </div>
                    <!--             <div class="col-md-4"> -->
                    <!--                 <label>Upload Proof (Self-attested)</label> -->
                    <!--                 <input type="file" name="esiProof" class="form-control"> -->
                    <!--             </div> -->
                </div>

                <!-- ===== Declaration ===== -->
                <div class="row m-3">
                    <div class="col-md-12">
                        <input type="checkbox" name="declaration" required>
                        <strong>
                            I certify that the information furnished by me in this Application is true and correct
                            to the best of my knowledge. If anything is found false in future, necessary action
                            may be initiated as deemed fit.
                        </strong>
                    </div>
                </div>

            </div>
        </div>


        <!-- ================= DECLARATION ================= -->
        <button type="button"
                id="submitBtn"
                class="btn btn-success px-5">
            Submit Application
        </button>


    </form>
</div>

<!-- Global Message Modal -->
<div class="modal fade" id="messageModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">

            <div class="modal-header">
                <h5 class="modal-title" id="messageModalTitle">Message</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <div class="modal-body" id="messageModalBody">
                <!-- Message injected via JS -->
            </div>

            <div class="modal-footer">
                <button type="button"
                        class="btn btn-primary"
                        data-bs-dismiss="modal">
                    OK
                </button>
            </div>

        </div>
    </div>
</div>


</body>
</html>