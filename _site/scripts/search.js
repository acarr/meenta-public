
function searchSubmit(el) {
	event.preventDefault();
	var input = $(el).find('input[name=q]');

	if (window.location.hostname === 'training.meenta.io') {
		window.location = 'https://demo.meenta.io/search?q=' + input.val();
	} else {
		window.location = 'https://app.meenta.io/search?q=' + input.val();
	}
}
