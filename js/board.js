var Board = Class.extend({

	init: function(canvas, game){
		this.game = game;
		this.context = canvas.getContext("2d");
		this.context.font = "28pt Calibri";
        this.context.fillStyle = "white";
		
		this.boardSize = {width: 600, height:620};

		this.equations = [];

		this.newEquationInterval = 1000 * 2;

		this.currentDifficulty = 0;
		this.settings = difficulty[this.currentDifficulty];

		this.stopped = false;
	},

	generateEquation : function() {
		var firstOperand = getRandomInt(this.settings.min, this.settings.max);
		var secondOperand = getRandomInt(this.settings.min, this.settings.max);
		var equation = new Equation({boardSize:this.boardSize,
							 equation: {first:firstOperand, second:secondOperand, operation:this.settings.operation}});

		var text = equation.toString();
		var textWidth = this.context.measureText(text).width;
		equation.position.x = getRandomInt(0, this.boardSize.width - textWidth);
		
		this.equations.push(equation);
	},

	popEquation : function(equation) {
		removeItem(this.equations, equation);
	},

	addNewEquation : function() {
		this.generateEquation();
		var self = this;
		setTimeout( function() { self.addNewEquation(); } , self.newEquationInterval);
	},

	increaseDifficulty : function() {
		this.settings = difficulty[this.currentDifficulty];
		if (this.currentDifficulty + 1 < difficulty.length)
			this.currentDifficulty++;
		var self = this;
		setTimeout( function() { self.increaseDifficulty(); } , self.settings.interval);
	},

	
	start: function () {
		this.addNewEquation();
		this.draw();
		this.increaseDifficulty();
	},

	checkAnswer: function(number) {
		
		var toDelete = [];

		for (var i in this.equations) {
			var equation = this.equations[i];
			if (equation.check(number)) {
				toDelete.push(equation);
			}
		}

		for (var i in toDelete) {
			var equation = toDelete[i];
			this.popEquation(equation);
		}
	},

	missedEquation: function (equation) {
		this.popEquation(equation);

		// TODO: decrease "life" count
	},

	stop: function() {
		this.stopped = true;
	},

	// canvas
	clear : function() {
  		this.context.clearRect(0, 0, this.boardSize.width, this.boardSize.height);
	},

	draw : function() {
		if (this.stopped)
			return;

		this.clear();
		
		var toDelete = [];
		for (var i in this.equations) {
			var equation = this.equations[i];

			this.context.fillText(equation.toString(), equation.position.x, equation.position.y);

			equation.position.y += 1;

			if (equation.position.y >= this.boardSize.height) {
				toDelete.push(equation);
			}			
		}

		for (var i = 0; i < toDelete.length; i++) {
			var equation = toDelete[i];
			this.missedEquation(equation);

			this.game.madeMistake();
		}

		var self = this;
		setTimeout( function() { self.draw(); } , 40);
	}
});