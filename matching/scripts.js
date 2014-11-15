function renderBoard(num) {

 	for (i = 1; i <= num; i++) {
 		// create X number of divs
 		// each has an individual ID
 		$('#board').append(
			"<div class='card' id=\'card" + i + "\'>" +
			"<div class='front'></div>" +
      "<div class='back'></div>" +
			"</div>"
		);
 	}
}

$(document).ready(function () {
	renderBoard(4);
});