$(function() {

    "use strict";
	
	// REMOVE # FROM URL
	$( 'a[href="#"]' ).click( function(e) {
		e.preventDefault();
	});
	
	// CAMERA SLIDER
	$("#camera_wrap_1").camera({
		alignment: 'center',
		autoAdvance: true,
		mobileAutoAdvance: true,
		barDirection: 'leftToRight',
		barPosition: 'bottom',
		loader: 'bar',
		cols: 12,
		height: '40%',
		playPause: false,
		pagination: false,
		imagePath: '../images/'
	});
	
	// ACCORDION
	var $active = $("#accordion .panel-collapse.in")
					.prev()
					.addClass("active");
					
	$active
		.find("a")
		.append("<span class=\"fa fa-arrow-circle-right pull-right\"></span>");
		
	$("#accordion .panel-heading")
		.not($active)
		.find('a')
		.prepend("<span class=\"fa fa-arrow-circle-down pull-right\"></span>");
	
	$("#accordion").on("show.bs.collapse", function (e) {	
		$("#accordion .panel-heading.active")
			.removeClass("active")
			.find(".fa")
			.toggleClass("fa-arrow-circle-down fa-arrow-circle-right");				
		$(e.target)
			.prev()
			.addClass("active")
			.find(".fa")
			.toggleClass("fa-arrow-circle-down fa-arrow-circle-right");		
	});
	
	$("#accordion").on("hide.bs.collapse", function (e) {
		$(e.target)
			.prev()
			.removeClass("active")
			.find(".fa")
			.removeClass("fa-arrow-circle-right")
			.addClass("fa-arrow-circle-down");
	});
	
	// Gallery FILTERS
	var $grid = $('#gallery-grid');
	$grid.shuffle({
		itemSelector: '.gallery-grid', // the selector for the items in the grid
		speed: 500 // Transition/animation speed (milliseconds)
	});
	/* reshuffle when user clicks a filter item */
	$('#gallery-filter li a').click(function (e) {
		// set active class
		$('#gallery-filter li a').removeClass('active');
		$(this).addClass('active');
		// get group name from clicked item
		var groupName = $(this).attr('data-group');
		// reshuffle grid
		$grid.shuffle('shuffle', groupName );
	});
	
	//AJAX CONTACT FORM
	$(".contact-form").submit(function() {
		var rd = this;
		var url = "sendemail.php"; // the script where you handle the form input.
		$.ajax({
			type: "POST",
			url: url,
			data: $(".contact-form").serialize(), // serializes the form's elements.
			success: function(data) {
				$(rd).prev().text(data.message).fadeIn().delay(3000).fadeOut();
			}
		});
		return false; // avoid to execute the actual submit of the form.
	});
	
	// GOOGLE MAP
	function initialize($) {
		var mapOptions = {	
			zoom: 8,
			center: new google.maps.LatLng(-36.1627, 86.7816),
			disableDefaultUI: true
		};
		var map = new google.maps.Map(document.querySelector('.map'), mapOptions);
	}
	google.maps.event.addDomListener(window, 'load', initialize);
	
});
