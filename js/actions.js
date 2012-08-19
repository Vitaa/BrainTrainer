$(document).ready(function() {

	var boardContainer = $(".board"),
		animationDuration = 600;

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
    			var game = new Game(canvas, [$(".mistake1"), $(".mistake2"), $(".mistake3")]);
    		} );
		});
	});

});
