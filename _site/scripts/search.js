
function searchSubmit(el) {
	event.preventDefault();
	var inputs = $('#searchForm :input')
	var values = [];
  inputs.each(function() {
		values.push( this.name + '=' + $(this).val());
  });
	var qstr = values.join('&');

	window.location.href = '/app/#!/search?' + qstr;
}
