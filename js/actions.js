$(document).ready(function() {

	var boardContainer = $(".board"),
		animationDuration = 600,
	    board;

	$(".play_button").on("click", function() {
		var self = $(this);
		self.animate({
			opacity: 0,
		}, 
		animationDuration, 
		function() {
			self.remove();
    		boardContainer.animate({
    			height:"+=420"
    		}, 
    		animationDuration, 
    		function () {
    			var canvas = $("#boardCanvas").show().get(0);
    			board = new Board(canvas);
    			board.start();
    			assignKeyListener();
    		} );
		});
	});

	function assignKeyListener() {
		$('body').keydown(function(event) {
			var keyString = String.fromCharCode(event.keyCode);
			var intValue = +keyString;
			if (!isNaN(intValue)) {
				board.keyPressed(intValue);
			}
		});
	}
});
