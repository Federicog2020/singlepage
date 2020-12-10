$.fn.isInViewport = function() {
  var elementTop = $(this).offset().top;
  var elementBottom = elementTop + $(this).outerHeight();

  var viewportTop = $(window).scrollTop();
  var viewportBottom = viewportTop + $(window).height();

  return elementBottom > viewportTop && elementTop < viewportBottom;
};


let moveToSection = function(section_name) {
	let offset = 80;

	if($('.navbar').height() < 60) {
		offset = 50;
	}

	$('html, body').animate({
        scrollTop: $(section_name).offset().top - offset
    }, 800);
};

$(window).on('resize scroll', function() {
  $('.team').each(function() {
    if ($(this).isInViewport()) {
      $(this).addClass('flipInY');
    } else {
      $(this).removeClass('flipInY');
    }
  });

	if (this.document.body.scrollTop > 80 || this.document.documentElement.scrollTop > 80) {
    	$('nav.navbar').css({'height': '50px', 'transition': '0.8s'});
    	$('#btn-top').css({'visibility': 'visible', 'opacity': '1'});
  	} else {
    	$('nav.navbar').css({'height': '80px', 'transition': '0.8s'});
    	$('#btn-top').css({'visibility': 'hidden', 'opacity': '0', 'transition': 'visibility 0.8s linear,opacity 0.8s linear'});
  	}
});

$('a').on('click',function(e) {
	switch(this.hash) {
		case '#start':
		case '#team':
		case '#services':
		case '#portfolio':
		case '#about':
		case '#contact':
			moveToSection(this.hash);
			break;
		default:
			break;
	}
});

$('#portfolioModal').on('show.bs.modal', function (event) {
  var button = $(event.relatedTarget) // Button that triggered the modal
  let title = button.data('title');
  let image = button.data('img');
  let description = button.data('description');

  var modal = $(this);
  
  modal.find('.modal-title').text(title);
  modal.find('#image-selected').attr('src', image);
  modal.find('#image-description').text(description);
});

$('#contactForm').submit(function(e){
	e.preventDefault();
	var form = $(this);

	var form_control = form.find('.form-control');

	for (var i=0; i<form_control.length;i++) {
		var ctrl = $('#'+form_control[i].id);
		if (ctrl.val().trim() == '') {
			$('#error-'+form_control[i].id).text(ctrl.data('validation-required-message'));
			$('#error-'+form_control[i].id).css({'visibility': 'visible', 'opacity': '1', 'transition': 'visibility 0.8s linear,opacity 0.8s linear'});
			$('#error-'+form_control[i].id).css({'height': '20px', 'transition': '0.8s'});
		}
		else {
			$('#error-'+form_control[i].id).css({'visibility': 'hidden', 'opacity': '0', 'transition': 'visibility 0.8s linear,opacity 0.8s linear'});
			$('#error-'+form_control[i].id).css({'height': '0px', 'transition': '0.8s'});
		}
	}
});
 
/*$("#nav-team").click(function() {
    var offset = 20; //Offset of 20px

    moveToSection("#team");
    $('html, body').animate({
        scrollTop: $("#team").offset().top
    }, 800);
});

$('#nav-services').on('click', function(){
	moveToSection("#services");
});*/