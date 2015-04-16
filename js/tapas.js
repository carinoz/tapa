	$(document).ready(function()
	{
		
		//alert("Username "+sessionStorage.username+"User UUID "+sessionStorage.UserUUID+" table no "+sessionStorage.table_no);
		$("#emp_name").html(sessionStorage.username);
		$("#log_out").click(function() // function searching button
		{
			sessionStorage.clear();
			window.location.replace("index.html");
		});
		
		$("#button").click(function() // function searching button
		{	
		
		})
	
		
	});
	
	