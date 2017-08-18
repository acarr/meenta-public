
function searchSubmit(el) {
	event.preventDefault();
	var input = $(el).find('input[name=q]');
	window.location = 'https://app.meenta.io/#/main/?q=' + input.val();
}
