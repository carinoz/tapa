		// We use an "Immediate Function" to initialize the application to avoid leaving anything behind in the global scope
(function () {

    /* ---------------------------------- Local Variables ---------------------------------- */
    HomeView.prototype.template = Handlebars.compile($("#home-tpl").html());
	EmployeeListView.prototype.template = Handlebars.compile($("#employee-list-tpl").html());
	EmployeeView.prototype.template = Handlebars.compile($("#employee-tpl").html());
	LoginView.prototype.template = Handlebars.compile($("#login-tpl").html());

	var slider = new PageSlider($('body'));

	var service = new EmployeeService();

    service.initialize().done(function () {
	  router.addRoute('', function() {
		 slider.slidePage(new LoginView(service).render().$el);
	  });
		
	
	  router.addRoute('', function() 
	  {
		$("#button").click(function() // function searching button
		{	
			alert("hahaah");
		})
	
	  });
	
	
	  router.addRoute('employees/:id', function(id) {
		  service.findById(parseInt(id)).done(function(employee) {
			  slider.slidePage(new EmployeeView(employee).render().$el);
		  });
	  });

	  router.start();
	});


    /* --------------------------------- Event Registration -------------------------------- */
  
	



    /* ---------------------------------- Local Functions ---------------------------------- */
  

	

}());