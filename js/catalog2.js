	$(document).ready(function()
	{
		
		var order_list =[],order_display=[];total_order = "",up = "up",down = "down";
		

		$('#test').magnificPopup({
			type: "image",
			closeBtnInside: true /* No effect in comparison to not setting it when set to true */
		});
		
		$('.open-popup-link').magnificPopup({
		  type:'inline',
		  midClick: true // Allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source in href.
		});
		
	function setQuantityUp() 
	{
		var quantity = document.getElementById('qty');
		var upordown = "up";
		if (quantity.value > 1) {
			if (upordown == 'up'){++document.getElementById('qty').value;}
			else if (upordown == 'down'){--document.getElementById('qty').value;}}
		else if (quantity.value == 1) {
			if (upordown == 'up'){++document.getElementById('qty').value;}}
		else
			{document.getElementById('qty').value=1;}
	}
	
	function setQuantityDown()
	{
		var quantity = document.getElementById('qty');
		if (quantity.value > 1) 
		{
			--document.getElementById('qty').value;
		}
		else if (quantity.value == 1) 
		{
			document.getElementById('qty').value=1;
		}
	}
	
		
		function setQuantity(upordown) 
	{
		var quantity = document.getElementById('qty');

		if (quantity.value > 1) {
			if (upordown == 'up'){++document.getElementById('qty').value;}
			else if (upordown == 'down'){--document.getElementById('qty').value;}}
		else if (quantity.value == 1) {
			if (upordown == 'up'){++document.getElementById('qty').value;}}
		else
			{document.getElementById('qty').value=1;}
	}
	
		
		
	function add_new_item(product_id)
	{
		var qty = $('#qty').val();
		var menu_name = '';
		order_list.push(product_id,qty);
		$.ajax
		({
			type: "POST",
			url : "http://tapas.ifabula.com/tapas_controller/display_prod_detail/"+product_id,
			data : "ProductUUID="+product_id,
			//contentType: "application/json;charset=utf-8",
			dataType: "json",
			success: function(result_item)
			{
				for (var prod_item in result_item)
				{
					order_display.push('<li><h4>'+result_item[prod_item].product_name.toString()+'</h4><p><span>'+qty+'</span> x '+result_item[prod_item].price.toString()+' <input type="button" class="plus" /> <input type="button" class="minus" /></p><div class="price">30</div></li>');
					menu_name = result_item[prod_item].product_name.toString();
				}
			}
		});
		alert(menu_name +' has been added to order list !');
		document.getElementById("order_list").innerHTML = order_display.join('');
		//alert("test" + qty);
	}

		
		
		$(document).on('click', '.open-popup-link',function()
		{
			var product_id = $(this).attr('id');
			var  side_dish = [];
			side_dish_id = '73abac22-78d7-421f-a26d-4023596770cf';
			$.ajax
			({
				type: "POST",
				url : "http://tapas.ifabula.com/tapas_controller/display_prod_detail/"+product_id,
				data : "ProductUUID="+product_id,
				//contentType: "application/json;charset=utf-8",
				dataType: "json",
				success: function(result_item)
				{
					for (var prod_item in result_item)
					{
						var popupSRC = $(this).parent('li').next('div.popup-product');
						 var popupSRC = $(this).parent('li').next('div.popup-product');
						if( result_item[prod_item].CategoryUUID.toString() == '26b4551c-656a-413d-b2a1-bf6710fd9f2d')
					{
						  $.magnificPopup.open({
						  items: 
						  {
						 src: '<div id="popup-product'+result_item[prod_item].ProductUUID.toString()+'" class="popup-product"><div class="popup-product-img"><img src="http://tapas.ifabula.com/'+result_item[prod_item].image_thumbnail.toString()+'"/><h1>'+result_item[prod_item].product_name.toString()+'</h1></div><p class="popup-product-description">'+result_item[prod_item].description.toString()+'</p><div class="popup-product-option tombol-button">QUANTITY &nbsp;  <input id="down" onClick="setQuantityDown()" type="button" class="minus"  /> <input id="qty" type="text" value="1" min="0" /><select name="pasta_type" id="pasta_type"><option  value="Linguini">Linguini</option><option value="Spaghetti">Spaghetti</option><option value="Penne">Penne</option></select> &nbsp<input id="up"  type="button" class="plus" onclick="setQuantityUp()" /> <input type="submit" value="ORDER" onclick="add_new_item(\''+result_item[prod_item].ProductUUID.toString()+'\')" /></div></div>',
						  },
						  type: 'inline'
						   });
					  }
					  
					  else if( result_item[prod_item].CategoryUUID.toString() == '1a4bf4f1-459f-49c0-b8ef-12810ae93560' && result_item[prod_item].is_gluttonfree.toString() == '0'  )
					  {
						  
						 
						 	 $.ajax
							({
								type: "POST",
								url : "http://tapas.ifabula.com/tapas_controller/display_child_item/"+side_dish_id,
								data : "CategoryUUID="+side_dish_id,
								//contentType: "application/json;charset=utf-8",
								dataType: "json",
								success: function(result_side)
								{
									for (var prod_side in result_side)
									{
										side_dish.push('<option value="'+result_side[prod_side].ProductUUID.toString()+'">'+result_side[prod_side].product_name.toString()+' | '+numberWithCommas(result_side[prod_side].price.toString())+'</option>');
									}
									$.magnificPopup.open
									({
									  items: 
									  {
											src: '<div id="popup-product'+result_item[prod_item].ProductUUID.toString()+'" class="popup-product"><div class="popup-product-img"><img src="http://tapas.ifabula.com/'+result_item[prod_item].image_thumbnail.toString()+'"/><h1>'+result_item[prod_item].product_name.toString()+'</h1></div><p class="popup-product-description">'+result_item[prod_item].description.toString()+'</p><div class="popup-product-option tombol-button">QUANTITY &nbsp;  <input id="down" onClick="setQuantityDown()" type="button" class="minus"  /> <input id="qty"  readonly type="text" value="1" min="0" /> &nbsp<input id="up"  type="button" class="plus" onclick="setQuantityUp()" />  &nbsp;  <select name="menu_type" id="menu_type"><option  value="Glutten">Glutten with sauce</option><option value="Glutten Free">Glutten Free</option></select>  <br><br> SIDE DISH  &nbsp  &nbsp<select name="side_dish" id="side_dish">'+side_dish.join("")+'</select> <br> <input type="submit" value="ORDER" onclick="add_new_item(\''+result_item[prod_item].ProductUUID.toString()+'\')" /></div></div>',
									  },
									  type: 'inline'
									 });
								}
							})
							
							
						  
					  }
					   else if( result_item[prod_item].CategoryUUID.toString() == '1a4bf4f1-459f-49c0-b8ef-12810ae93560' && result_item[prod_item].is_gluttonfree.toString() == '1'  )
					  {
						  
						 
						 	 $.ajax
							({
								type: "POST",
								url : "http://tapas.ifabula.com/tapas_controller/display_child_item/"+side_dish_id,
								data : "CategoryUUID="+side_dish_id,
								//contentType: "application/json;charset=utf-8",
								dataType: "json",
								success: function(result_side)
								{
									for (var prod_side in result_side)
									{
										side_dish.push('<option value="'+result_side[prod_side].ProductUUID.toString()+'">'+result_side[prod_side].product_name.toString()+' | '+numberWithCommas(result_side[prod_side].price.toString())+'</option>');
									}
									$.magnificPopup.open
									({
									  items: 
									  {
											src: '<div id="popup-product'+result_item[prod_item].ProductUUID.toString()+'" class="popup-product"><div class="popup-product-img"><img src="http://tapas.ifabula.com/'+result_item[prod_item].image_thumbnail.toString()+'"/><h1>'+result_item[prod_item].product_name.toString()+'</h1></div><p class="popup-product-description">'+result_item[prod_item].description.toString()+'</p><div class="popup-product-option tombol-button">QUANTITY &nbsp;  <input id="down" onClick="setQuantityDown()" type="button" class="minus"  /> <input id="qty"  readonly type="text" value="1" min="0" /> &nbsp<input id="up"  type="button" class="plus" onclick="setQuantityUp()" />  &nbsp;  <br><br> SIDE DISH  &nbsp  &nbsp<select name="side_dish" id="side_dish">'+side_dish.join("")+'</select> <br> <input type="submit" value="ORDER" onclick="add_new_item(\''+result_item[prod_item].ProductUUID.toString()+'\')" /></div></div>',
									  },
									  type: 'inline'
									 });
								}
							})
							
							
						  
					  }
				  else  if( result_item[prod_item].CategoryUUID.toString() == '8ccbf96d-aa7f-4f91-9359-03138080f531'  )
				  {
						
					  $.magnificPopup.open({
					  items: 
					  {
						src: '<div id="popup-product'+result_item[prod_item].ProductUUID.toString()+'" class="popup-product"><div class="popup-product-img"><img src="http://tapas.ifabula.com/'+result_item[prod_item].image_thumbnail.toString()+'"/><h1>'+result_item[prod_item].product_name.toString()+'</h1></div><p class="popup-product-description">'+result_item[prod_item].description.toString()+'</p><div class="popup-product-option tombol-button">QUANTITY &nbsp; <select name="qty" id="qty"><option  value="2">2 pax</option><option value="4">4 Pax </option></select> &nbsp <input type="submit" value="ORDER" onclick="add_new_item(\''+result_item[prod_item].ProductUUID.toString()+'\')" /></div></div>',
					  },
					  type: 'inline'
					   });
				  }
					
					  else
					  {
						
						  $.magnificPopup.open({
						  items: 
						  {
							src: '<div id="popup-product'+result_item[prod_item].ProductUUID.toString()+'" class="popup-product"><div class="popup-product-img"><img src="http://tapas.ifabula.com/'+result_item[prod_item].image_thumbnail.toString()+'"/><h1>'+result_item[prod_item].product_name.toString()+'</h1></div><p class="popup-product-description">'+result_item[prod_item].description.toString()+'</p><div class="popup-product-option">QUANTITY &nbsp;  <input id="down" onClick="setQuantityDown()" type="button" class="minus"  /> <input id="qty"  readonly type="text" value="1" min="0" /> <input id="up"  type="button" class="plus" onclick="setQuantityUp()" /> <input type="submit" value="ORDER" onclick="add_new_item(\''+result_item[prod_item].ProductUUID.toString()+'\')" /></div></div>',
						  },
						  type: 'inline'
					  });
					  }
					}
				}
			});
		});
		
		$('.test-popup-link').magnificPopup({ 
		  type: 'image'
			// other options
		});
	
		var category_name = [],CategoryUUID=[],ParentUUID=[],child_name=[],j=0,x=0,popup_product=[],z=0,popup_product1=[],
		child_category_name=[],child_category_id=[],category_id,prod_display=[],product_item=[],product_name=[],prod_thumb=[],product_desc=[],product_price=[];
		
		//alert("Username "+sessionStorage.username+"User UUID "+sessionStorage.UserUUID+" table no "+sessionStorage.table_no);
		$("#emp_name").html(sessionStorage.CustomerName);
		$("#customer_email").html(sessionStorage.CustomerEmail);
		$("#table_no").html(sessionStorage.table_no);
		//$("#test").html("<li>"+sessionStorage.CustomerEmail+"</li>");
		$("#log_out").click(function() // function searching button
		{
			sessionStorage.clear();
			window.location.replace("login.html");
		});
		
		function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
		



	

			$.ajax({
			type: "POST",
			url : "http://tapas.ifabula.com/tapas_controller/display_parent_category",
			//contentType: "application/json;charset=utf-8",
			dataType: "json",
			success: function(result)
			{
				
				for (var item in result)
				{
					z = z+1;
					if(result[item].CategoryUUID.toString() == '847e46b6-5ee0-4282-85d9-cdca4896727f')
					{
						category_name.push('<li id ="'+result[item].CategoryUUID.toString()+'" class="active"><a href="#?id='+result[item].CategoryUUID.toString()+'" onclick="reload_child_category(\''+result[item].CategoryUUID.toString()+'\');return false;" >'+result[item].category_name.toString()+'</a></li>');
					}
					else 
					{
						category_name.push('<li id ="'+result[item].CategoryUUID.toString()+'" ><a href="#?id='+result[item].CategoryUUID.toString()+'" onclick="reload_child_category(\''+result[item].CategoryUUID.toString()+'\');" >'+result[item].category_name.toString()+'</a></li>');					
					}
					CategoryUUID.push(result[item].CategoryUUID.toString());
					//ParentUUID.push(result[item].ParentUUID.toString());
					category_id = '847e46b6-5ee0-4282-85d9-cdca4896727f';	
					document.getElementById("tab").innerHTML = category_name.join('');
					
					
					j = j+1;
				}
				
				var default_cat = '';
				$.ajax({
				type: "POST",
				url : "http://tapas.ifabula.com/tapas_controller/display_child_category/"+category_id,
				data : "CategoryUUID="+category_id,
				//contentType: "application/json;charset=utf-8",
				dataType: "json",
				success: function(result_child)
				{
					var i = 0;
					for (var item_child in result_child)
					{
						i = i+1;
						if(i != 1)
						{
							child_category_name.push('<li><a href="#'+result_child[item_child].CategoryUUID.toString()+'" onclick="reload_child_item(\''+result_child[item_child].CategoryUUID.toString()+'\',\''+result_child[item_child].ParentUUID.toString()+'\');">'+result_child[item_child].category_name.toString()+'</a></li>');
							child_category_id.push(result_child[item_child].CategoryUUID.toString());
							child_name.push(result_child[item_child].category_name.toString());
						}
						else if(i == 1)
						{
							default_cat = result_child[item_child].CategoryUUID.toString();
							child_category_name.push('<li class="active"><a href="#'+result_child[item_child].CategoryUUID.toString()+'" onclick="reload_child_item(\''+result_child[item_child].CategoryUUID.toString()+'\',\''+result_child[item_child].ParentUUID.toString()+'\');">'+result_child[item_child].category_name.toString()+'</a></li>');
							child_category_id.push(result_child[item_child].CategoryUUID.toString());
							child_name.push(result_child[item_child].category_name.toString());
							
							$.ajax({
						type: "POST",
						url : "http://tapas.ifabula.com/tapas_controller/display_child_item/"+default_cat,
						data : "CategoryUUID="+default_cat,
						//contentType: "application/json;charset=utf-8",
						dataType: "json",
						success: function(result_item)
						{
							for (var prod_item in result_item)
							{
								x = x+1;
								if(x == 1)
								{
									//alert(i);
									//prod_display.push('<div id='+result_child[item_child].CategoryUUID.toString()+'>');
									prod_display.push('<h1>'+child_name[0]+'</h1>');
									prod_display.push('<ul>');
									//document.getElementById("prod_item").innerHTML = prod_display.join('');
									if(result_item[prod_item].is_gluttonfree.toString() == "0" && result_item[prod_item].is_vegetarian.toString() == "0" && result_item[prod_item].is_chef.toString() == "0")
									{
										prod_display.push('<li><a id="'+result_item[prod_item].ProductUUID.toString()+'" class="open-popup-link" href="#popup-product"><img border:1px solid #694306; width="110px" height="110px" src="http://tapas.ifabula.com/'+result_item[prod_item].image_thumbnail.toString()+'"/><div class="icon" style="height:43px">&nbsp;</div><p class="price">'+numberWithCommas(parseInt(result_item[prod_item].price.toString())/1000)+'</p><h2>'+result_item[prod_item].product_name.toString()+'</h2></a></li>');										
									}
									else
									{
										
										prod_display.push('<li><a id="'+result_item[prod_item].ProductUUID.toString()+'" class="open-popup-link" href="#popup-product"><img border:1px solid #694306; width="110px" height="110px" src="http://tapas.ifabula.com/'+result_item[prod_item].image_thumbnail.toString()+'"/>');	
										prod_display.push('<div class="icon">')
										
										if(result_item[prod_item].is_gluttonfree.toString() == "1")
										{
											prod_display.push('<img src="images/glutenfree35.png"/>');
										}
										
										
										if(result_item[prod_item].is_vegetarian.toString() == "1")
										{
											prod_display.push('<img src="images/vegan1.png"/>');
										}
										
										if(result_item[prod_item].is_chef.toString() == "1")
										{
											prod_display.push('<img src="images/chef_recom.png" /> ');
										}
										
										
										prod_display.push('</div><p class="price">'+numberWithCommas(parseInt(result_item[prod_item].price.toString())/1000)+'</p><h2>'+result_item[prod_item].product_name.toString()+'</h2></a></li>')
									}
									popup_product.push('<div id="popup-product'+result_item[prod_item].ProductUUID.toString()+'" class="popup-product"><div class="popup-product-img"><img src="http://tapas.ifabula.com/'+result_item[prod_item].image_thumbnail.toString()+'"/><h1>'+result_item[prod_item].product_name.toString()+'</h1></div><p class="popup-product-description">'+result_item[prod_item].description.toString()+'</p><div class="popup-product-option">QUANTITY &nbsp; <input id="down"  type="button" class="minus" /> <input id="quantity" type="text" value="1" min="0" /> <input id="up"  type="button" class="plus" /> <input type="submit" value="ORDER" /></div></div>');
									
								}
								else if(x != 1)
								{
									if(result_item[prod_item].is_gluttonfree.toString() == "0" && result_item[prod_item].is_vegetarian.toString() == "0" && result_item[prod_item].is_chef.toString() == "0")
									{
										prod_display.push('<li><a id="'+result_item[prod_item].ProductUUID.toString()+'" class="open-popup-link" href="#popup-product"><img border:1px solid #694306; width="110px" height="110px" src="http://tapas.ifabula.com/'+result_item[prod_item].image_thumbnail.toString()+'"/><div class="icon" style="height:43px">&nbsp;</div><p class="price">'+numberWithCommas(parseInt(result_item[prod_item].price.toString())/1000)+'</p><h2>'+result_item[prod_item].product_name.toString()+'</h2></a></li>');										
									}
									else
									{
										
										prod_display.push('<li><a id="'+result_item[prod_item].ProductUUID.toString()+'" class="open-popup-link" href="#popup-product"><img border:1px solid #694306; width="110px" height="110px" src="http://tapas.ifabula.com/'+result_item[prod_item].image_thumbnail.toString()+'"/>');	
										prod_display.push('<div class="icon">')
										
										if(result_item[prod_item].is_gluttonfree.toString() == "1")
										{
											prod_display.push('<img src="images/glutenfree35.png"/>');
										}
										
										
										if(result_item[prod_item].is_vegetarian.toString() == "1")
										{
											prod_display.push('<img src="images/vegan1.png"/>');
										}
										
										if(result_item[prod_item].is_chef.toString() == "1")
										{
											prod_display.push('<img src="images/chef_recom.png" /> ');
										}
										
										
										prod_display.push('</div><p class="price">'+numberWithCommas(parseInt(result_item[prod_item].price.toString())/1000)+'</p><h2>'+result_item[prod_item].product_name.toString()+'</h2></a></li>')
									}
								}
								
								
							
								
							}
							prod_display.push('</ul>');
						
							document.getElementById("prod_item_display").innerHTML = prod_display.join('');
						}
						})
						}
						
						
						
						
						
						document.getElementById("tab_child").innerHTML = child_category_name.join('');
						
						
					}
				},
				 error: function(data, errorThrown)
				  {
					  alert('request failed :'+errorThrown);
				  }				
				})

			},
			 error: function(data, errorThrown)
			  {
				  alert('request failed :'+errorThrown);
			  }				
		})
		
	//	loadjscssfile("magnific-popup.css", "css"); 
	//prod_display.push('<ul><li><a class="open-popup-link" href="#popup-product"><img src="http://tapas.ifabula.com//img/prod_gallery/Aglio_Salmon_thumb.jpg"><h2>Aglio Salmon LOH</h2><p class="price">70,000</p></a></li>');
	//document.getElementById("prod_item_display").innerHTML = prod_display.join('');	
	});
	
	