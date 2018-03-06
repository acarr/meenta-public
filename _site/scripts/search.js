
function searchSubmit(el) {
	event.preventDefault();
	var inputs = $('#searchForm :input')
	var values = [];
  inputs.each(function() {
		values.push( this.name + '=' + $(this).val());
  });
	var qstr = values.join('&');

	alert('asdfasdf');

	window.location.href = '/search?' + qstr;

	// if (window.location.hostname === 'training.meenta.io') {
	// 	window.location = 'https://demo.meenta.io/search?' + qstr;
	// } else {
	// 	window.location = 'https://app.meenta.io/search?' + qstr;
	// }

}
