	$(document).ready(function()
	{
		//alert("Username "+sessionStorage.username+"User UUID "+sessionStorage.UserUUID+" table no "+sessionStorage.table_no);
		$("#emp_name").html(sessionStorage.username);
		$("#customer_email").html(sessionStorage.CustomerEmail);
		//$("#test").html("<li>"+sessionStorage.CustomerEmail+"</li>");
		$("#log_out").click(function() // function searching button
		{
			sessionStorage.clear();
			window.location.replace("login.html");
		});
		
		function numberWithCommas(x) {
			return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		}
		
		function load_parent_category()
		{
			alert('test');
		}
		
	

		$.ajax({
			type: "POST",
			url : "http://127.0.0.1/tapas/tapas_controller/display_parent_category",
			//contentType: "application/json;charset=utf-8",
			dataType: "json",
			success: function(result)
			{
			
				var category_name = [],CategoryUUID=[],ParentUUID=[],child_name=[],j=0,x=0,popup_product=[],
				child_category_name=[],child_category_id=[],category_id,prod_display=[],product_item=[],product_name=[],prod_thumb=[],product_desc=[],product_price=[];
				for (var item in result)
				{
					category_name.push('<li><a href="#'+result[item].CategoryUUID.toString()+'">'+result[item].category_name.toString()+'</a></li>');
					CategoryUUID.push(result[item].CategoryUUID.toString());
					//ParentUUID.push(result[item].ParentUUID.toString());
					category_id = result[item].CategoryUUID.toString();
			
					document.getElementById("tab").innerHTML = category_name.join('');
					
					$.ajax({
					type: "POST",
					url : "http://localhost/tapas/tapas_controller/display_child_category/"+category_id,
					data : "CategoryUUID="+category_id,
					//contentType: "application/json;charset=utf-8",
					dataType: "json",
					success: function(result_child)
					{
						var i = 0;
						child_category_name.push('<ul>');
						for (var item_child in result_child)
						{
							i = i+1;
							if(i != 1)
							{
								child_category_name.push('<li><a href="#'+result_child[item_child].CategoryUUID.toString()+'" onclick="load_parent_category();return false;">'+result_child[item_child].category_name.toString()+'</a></li>');
								child_category_id.push(result_child[item_child].CategoryUUID.toString());
								child_name.push(result_child[item_child].category_name.toString());
							}
							else if(i == 1)
							{
								child_category_name.push('<li class="active"><a href="#'+result_child[item_child].CategoryUUID.toString()+'" onclick="load_parent_category();return false;">'+result_child[item_child].category_name.toString()+'</a></li>');
								child_category_id.push(result_child[item_child].CategoryUUID.toString());
								child_name.push(result_child[item_child].category_name.toString());
							}
							
							$.ajax({
							type: "POST",
							url : "http://localhost/tapas/tapas_controller/display_child_item/"+child_category_id[item_child],
							data : "CategoryUUID="+child_category_id,
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
										prod_display.push('<li><a  class="open-popup-link" href="#popup-product"><img src="http://localhost/tapas/'+result_item[prod_item].image_thumbnail.toString()+'"/><h2>'+result_item[prod_item].product_name.toString()+'</h2><p class="price">'+numberWithCommas(result_item[prod_item].price.toString())+'</p></a></li>');										
										popup_product.push('<div id="popup-product'+result_item[prod_item].ProductUUID.toString()+'" class="popup-product mfp-hide"><div class="popup-product-img"><img src="images/img-product.jpg" /> <h1>Bread with Tomato Sauce & Iberico Ham</h1></div><p class="popup-product-description">Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante.</p><div class="popup-product-option">		QUANTITY &nbsp; <input id="down"  type="button" class="minus" /> <input id="quantity" type="text" value="1" min="0" /> <input id="up"  type="button" class="plus" /> <input type="submit" value="ORDER" /></div></div>');		
									}
									else if(x != 1)
									{
										prod_display.push('<li><a  class="open-popup-link" href="#popup-product" class="open-popup-link"><img src="http://localhost/tapas/'+result_item[prod_item].image_thumbnail.toString()+'"/><h2>'+result_item[prod_item].product_name.toString()+'</h2><p class="price">'+numberWithCommas(result_item[prod_item].price.toString())+'</p></a></li>');										
										popup_product.push('<div id="popup-product'+result_item[prod_item].ProductUUID.toString()+'" class="popup-product mfp-hide"><div class="popup-product-img"><img src="images/img-product.jpg" /> <h1>Bread with Tomato Sauce & Iberico Ham</h1></div><p class="popup-product-description">Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante.</p><div class="popup-product-option">		QUANTITY &nbsp; <input id="down"  type="button" class="minus" /> <input id="quantity" type="text" value="1" min="0" /> <input id="up"  type="button" class="plus" /> <input type="submit" value="ORDER" /></div></div>');							
										
									}
									
								}
								prod_display.push('</ul>');
								//prod_display.push('</div>');
								popup_product.push('<div id="popup-product" class="popup-product mfp-hide"><div class="popup-product-img"><img src="images/img-product.jpg" /> <h1>Bread with Tomato Sauce & Iberico Ham</h1></div><p class="popup-product-description">Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante.</p><div class="popup-product-option">		QUANTITY &nbsp; <input id="down"  type="button" class="minus" /> <input id="quantity" type="text" value="1" min="0" /> <input id="up"  type="button" class="plus" /> <input type="submit" value="ORDER" /></div></div>');							
										
								document.getElementById("prod_item_display").innerHTML = prod_display.join('');
								document.getElementById("popup_item").innerHTML = popup_product.join('');
							}
							})
							
						}
						child_category_name.push('</ul>');
						document.getElementById("tab_child").innerHTML = child_category_name.join('');
					},
					 error: function(data, errorThrown)
					  {
						  alert('request failed :'+errorThrown);
					  }				
					})
					j = j+1;
				}

			},
			 error: function(data, errorThrown)
			  {
				  alert('request failed :'+errorThrown);
			  }				
		})
		
	
		
	});
	
	