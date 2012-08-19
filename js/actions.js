$(document).ready(function() {

	var boardContainer = $(".board"),
	    equationTemplate = $("#equation-template").html();
	var board;
	$(".play_button").on("click", function() {
		var self = $(this);
		self.animate({
			opacity: 0,
		}, 600, function() {
			self.remove();
    		boardContainer.animate({
    			height:"+=420"
    		}, 600, function () {
    			board = new Board(boardContainer, equationTemplate);
    			board.start();
    			assignKeyListener();
    		} );
		});
	});

	function assignKeyListener() {
		console.log(board);
		$('body').keydown(function(event) {
			var keyString = String.fromCharCode(event.keyCode);
			var intValue = +keyString;
			if (!isNaN(intValue)) {
				board.keyPressed(intValue);
			}
		});
}

 });
