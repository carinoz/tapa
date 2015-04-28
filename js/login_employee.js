	$(document).ready(function()
	{
		$("#button").click(function() // function searching button
		{	
			var username =  $("#username").val()
			var password = $("#password").val();
			
			var element = document.getElementById("table_no");
			var table_no = element.value;
			
			
			var datas = {
				"username": username,
				"password": password
			};
			
			
			
		$.ajax({
				type: "POST",
				url : "http://tapas.ifabula.com/tapas_controller/login_employee/"+username,
				data : "username="+username+"&password="+password+"&table_no="+table_no,
				//contentType: "application/json",
				dataType: "text json",
				success: function(msg,string,jqXHR)
				{						
					if(msg.password !='0')
					{
						alert(msg.name);
					}
					else if(msg.password == '0')
					{
						var name = new SessionUser(msg.username, msg.UserUUID, msg.table_no);
						sessionStorage.setItem('EmployeeSession', JSON.stringify(name));
						var temp = sessionStorage.getItem('EmployeeSession');
						var viewName = $.parseJSON(temp);
						//alert(viewName.UserUUID);
						
						sessionStorage.UserUUID = msg.UserUUID;
						sessionStorage.username = msg.username;
						sessionStorage.table_no = msg.table_no;
						window.location.replace("login.html");
					}
							
				},
				 error: function(data, errorThrown)
				  {
					  alert('request failed :'+errorThrown);
				  }				
			})
		})
		
		function SessionUser(username, UserUUID, table_no){
        this.username = username;
        this.UserUUID = UserUUID;
        this.table_no = table_no;
        }
    
		
	});
	
	