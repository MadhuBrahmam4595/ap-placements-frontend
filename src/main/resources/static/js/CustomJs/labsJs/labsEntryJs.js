/**
 * 
 */
 
 $(document).ready(function(){
	//alert('ready function');
	getTrades(insCode);
	$("#serverErr").empty();
});

function getTrades(insCode){
	//alert('getTrades->insCode->'+insCode);
	
	$.ajax({
		type: 'get',
		url: baseUrl+'masterdata/tradesInIti?iticode='+insCode,
		cache: false,
		timeout: 600000,
		success: function(resp){
			//alert('success->'+JSON.stringify(resp));
			$("#tradeShort").empty();
			$("#tradeShort").append('<option value="">-SELECT-</option>');
			resp.forEach(bean=>{
				$("#tradeShort").append('<option value="'+bean.strCol1+'">'+bean.strCol2+'</option>');	
			});
		},
		error: function(resp){
			alert('Trades are not loaded for you ITI');
		}
	});
}

 // Function to add more items
        function addMoreItems() {
            var itemContainer = document.getElementById("itemContainer");

            // Create a div element to hold new item inputs
            var newItemDiv = document.createElement("div");
            newItemDiv.classList.add("row", "mb-3");

            // Add item name input
            newItemDiv.innerHTML = `
                <div class="col-md-3">
                    <input type="text" class="form-control" name="itemNames[]" placeholder="Item Name" required>
                </div>
                <div class="col-md-3">
                    <input type="text" class="form-control" name="itemCosts[]" placeholder="Item Cost" required>
                </div>
                <div class="col-md-3">
                    <input type="file" class="form-control" name="itemPhotos[]" accept="image/*">
                </div>
                <div class="col-md-3">
                    <button type="button" class="btn btn-danger" onclick="removeItem(this)">Remove</button>
                </div>
            `;

            // Append the new item div to the container
            itemContainer.appendChild(newItemDiv);
        }

        // Function to remove the item row
        function removeItem(button) {
            var itemDiv = button.parentElement.parentElement;
            itemDiv.remove();
        }
        
        
        $(document).ready(function() {
	
	$("#serverErr").empty();
    $('#labForm').submit(function(event) {
        event.preventDefault(); // Prevent the default form submission

        // Create FormData object to hold form inputs and files
        var formData = new FormData(this);
$("#serverErr").empty();
        // Send an AJAX request
        $.ajax({
            type: 'POST',
            url: baseUrl+'labs/save',  // Update with your correct API URL
            headers: { 'Authorization': jwtToken},
            data: formData,
            processData: false, // Prevent jQuery from automatically transforming the data into a query string
            contentType: false, // Tell jQuery not to set contentType
            success: function(response) {
                //alert('Success: ' + response);
                // You can redirect to another page or clear the form here
                $('#labForm')[0].reset();
                $("#serverErr").append('<span style="color: green;font-weight: bolder;">'+response+'</span>');
            },
            error: function(response) {
                //alert('Error: ' + response.responseText);
                $("#serverErr").append('<span style="color: red;font-weight: bolder;">SOMETHING WENT WRONG TRY AGAIN</span>');
            }
        });
    });
});

 

