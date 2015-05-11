var LoginView = function (service) 
{
	var appLoginView;
	this.render = function() 
	{
		
		this.$el.html(this.template());
		$('.content', this.$el).html(appLoginView.$el);
		return this;
	};

	this.initialize = function () 
	{
		// Define a div wrapper for the view (used to attach events)
		this.$el = $('<div/>');
		this.$el.on('keyup', '.search-key', this.findByName);
		appLoginView = new EmployeeListView();
		this.render();
	};

	

	this.findByName = function() 
	{
		service.findByName($('.search-key').val()).done(function(employees) {
		appLoginView.setEmployees(employees);
		});

	};
	this.initialize();
}
