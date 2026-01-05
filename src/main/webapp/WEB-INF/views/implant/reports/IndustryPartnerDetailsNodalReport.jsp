<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
String industryPartnerDetailsNodalReportJwtToken = (String) session.getAttribute("jwtToken");
String industryPartnerDetailsNodalReportApisUrl = (String) session.getAttribute("apisUrl");
%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Industry Partner Details Nodal Report</title>
    
    <!-- Bootstrap and jQuery -->
    <link href="./bootstrap-5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="./js/jquery-3.7.1.min.js"></script>
    <script src="./bootstrap-5.3.3/dist/js/bootstrap.bundle.min.js"></script>

    <!-- DataTables CSS and JS (Ensure correct version and loading order) -->
<!--     <link href="https://cdn.datatables.net/v/bs5/dt-1.11.5/datatables.min.css" rel="stylesheet"> -->
<!--     <script src="https://cdn.datatables.net/v/bs5/dt-1.11.5/datatables.min.js"></script> -->
    <link href="./css/datatables.min.css" rel="stylesheet">
    <script src="./js/datatables.min.js"></script>

    <script>
        var jwtToken = 'Bearer ' + '<%=industryPartnerDetailsNodalReportJwtToken%>';
        var baseUrl = '<%=industryPartnerDetailsNodalReportApisUrl%>';
    </script>
</head>
<body>
<%@include file="/WEB-INF/views/public/banner.jsp"%>
<%@include file="/WEB-INF/views/userpages/userInfoNavbar.jsp"%>

<div class="container border p-2 mt-2 shadow-lg" style="border-radius: 5px;">
    <div align="center" style="text-decoration: underline; color: fuchsia;">
        Industry Partner Details Nodal Report
    </div>

    <table id="myTable" class="display">
        <thead>
            <tr>
                <th>SNO</th>
                <th>DIST</th>
                <th>ITI</th>
                <th>REVISED LEAD SECTOR</th>
                <th>PROPOSED NEW TRADE</th>
                <th>REVISED LEAD INDUSTRY PARTNER</th>
                <th>ACTIONS</th>
            </tr>
        </thead>
        <tbody id="tabledata"></tbody>
    </table>
</div>

<script type="text/javascript">
$(document).ready(function() {
    $.ajax({
        type: 'GET',
        url: baseUrl + 'implant/getAllIndustryPartnerDetails',
        headers: { 'Authorization': jwtToken },
        cache: false,
        timeout: 600000,
        success: function(resp) {
            $("#tabledata").empty();
            var count = 0;

            resp.forEach(bean => {
                count += 1;
                let distName = bean.oldDistMasterEntity?.dist_name || 'N/A';
                let itiName = bean.itiEntity?.itiName || 'N/A';
                let itiCode = bean.itiEntity?.itiCode || '';
                let revisedLeadSector = bean.revisedLeadSector || 'N/A';
                let proposedNewTrade = bean.proposedNewTrade || 'N/A';
                let revisedLeadIndustryPartner = bean.revisedLeadIndustryPartner || 'N/A';

                $("#tabledata").append(`
                    <tr>
                        <td>${count}</td>
                        <td>${distName}</td>
                        <td>${itiName} (${itiCode})</td>
                        <td>${revisedLeadSector}</td>
                        <td>${proposedNewTrade}</td>
                        <td>${revisedLeadIndustryPartner}</td>
                        <td>
                            <div class="d-flex">
                                <button class="btn btn-sm btn-info m-1" onclick="return editData('${bean.pid}')">EDIT</button>
                                <button class="btn btn-sm btn-danger m-1" onclick="return deleteData('${bean.pid}')">DELETE</button>
                            </div>
                        </td>
                    </tr>
                `);
            });

            // Check if DataTables is loaded, and then initialize
            if ($.fn.DataTable) {
                if ($.fn.DataTable.isDataTable("#myTable")) {
                    $('#myTable').DataTable().clear().destroy();
                }

                $('#myTable').DataTable({
                    pageLength: 10,
                    lengthMenu: [5, 10, 20],
                    ordering: true,
                    search: true
                });
            } else {
                alert("DataTables library is not loaded correctly.");
                console.error("DataTables library is not loaded.");
            }
        },
        error: function(resp) {
            alert('Industry Partner Details are not loaded. Please check the server response.');
        }
    });
});
</script>
</body>
</html>
