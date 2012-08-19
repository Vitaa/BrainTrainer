$(document).ready(function() {

	var boardContainer = $(".board"),
	    equationTemplate = $("#equation-template").html();
	
	$(".play_button").on("click", function() {
		var self = $(this);
		self.animate({
			opacity: 0,
		}, 600, function() {
			self.remove();
    		boardContainer.animate({
    			height:"+=420"
    		}, 600, function () {
    			var board = new Board(boardContainer, equationTemplate);
    			board.start();
    		} );
		});
	});

 });
