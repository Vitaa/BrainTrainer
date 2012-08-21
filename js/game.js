var ENTER_KEY_CODE = 13;
var BACKSPACE_KEY_CODE = 8;
var ACCEPTABLE_ANSWER_LENGTH = 3;

var Game = Class.extend({

	init : function (canvas, mistakes, enterField) {
		this.board = new Board(canvas, this);
    	this.board.start();
    	this.assingKeyListener();
    	this.mistakes = mistakes;
    	this.mistakesCount = 0;
    	this.enterField = enterField;
	},

	assingKeyListener : function() {
		var self = this;
		$('body').keydown(function(event) {
			var code = event.keyCode,
			    currentText = self.enterField.text();
			 
			if (currentText.length > 0) {
				if (code == ENTER_KEY_CODE) {

					self.board.checkAnswer(+currentText);
					self.enterField.text("");
					return;
				}
				else if (code == BACKSPACE_KEY_CODE) {
					currentText = currentText.substring(0, currentText.length - 1);
					self.enterField.text(currentText);
					return;
				}
			}
			
			var keyString = String.fromCharCode(code);
			var intValue = +keyString;
			if (!isNaN(intValue)) {
				if (currentText.length < ACCEPTABLE_ANSWER_LENGTH) {
					self.enterField.text(currentText + keyString);
				}
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