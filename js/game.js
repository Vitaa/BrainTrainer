var Game = Class.extend({

	init : function (canvas, mistakes) {
		this.board = new Board(canvas, this);
    	this.board.start();
    	this.assingKeyListener();
    	this.mistakes = mistakes;
    	this.mistakesCount = 0;
	},

	assingKeyListener : function() {
		var self = this;
		$('body').keydown(function(event) {
			var keyString = String.fromCharCode(event.keyCode);
			var intValue = +keyString;
			if (!isNaN(intValue)) {
				self.board.keyPressed(intValue);
			}
		});
	},

	madeMistake: function() {
		this.mistakes[this.mistakesCount].attr("src", "../assets/mistake_selected.png");
		this.mistakesCount++;
		if (this.mistakesCount == this.mistakes.length) {
			this.board.stop();
			console.log("Game Over!")
		}
	}
});