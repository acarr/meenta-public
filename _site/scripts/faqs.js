
$(document).ready(function() {

	$(document).on('click', '.question', function() {
		// your function here
		$(this).siblings('.answer').toggle();
	});

	$(document).on('click', '.showAll', function() {
		$('.answer').toggle();
		return false;
	});

});
