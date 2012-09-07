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
		this.solved = 0;

		this.stopped = false;
		this.totalEquationsCount = 0;
	},

	generateEquation : function() {
		var conditions = this.settings.conditions;
		var equation = new Equation({boardSize:this.boardSize, conditions: conditions[getRandomInt(0, conditions.length-1)]});

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
		// var self = this;
		// setTimeout( function() { self.addNewEquation(); } , self.newEquationInterval);
	},

	rearrangeNewEquationWithInterval : function () {
		clearTimeout(this.newEquationTimeout);
		this.newEquationWithInterval();
	},

	newEquationWithInterval : function() {
		var self = this;
		self.newEquationTimeout = setTimeout( function() { self.addNewEquation(); self.newEquationWithInterval(); } , self.settings.interval);
	},

	increaseDifficulty : function() {
		this.solved = 0;
		this.settings = difficulty[this.currentDifficulty];
		if (this.currentDifficulty + 1 < difficulty.length) 
			this.currentDifficulty++;
		this.rearrangeNewEquationWithInterval();
	},

	
	start: function () {
		this.increaseDifficulty();
		this.addNewEquation();
		this.draw();
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

		if (toDelete.length) {
			this.addNewEquation();
			this.rearrangeNewEquationWithInterval();
		}
		this.solved += toDelete.length;
		this.totalEquationsCount += toDelete.length;
		if (this.solved >= this.settings.solved) {
			this.increaseDifficulty();
		}
	},

	stop: function() {
		this.stopped = true;
	},

	// canvas
	clear : function() {
  		this.context.clearRect(0, 0, this.boardSize.width, this.boardSize.height);
	},

	draw : function() {
		this.clear();

		if (this.stopped)
			return;
		
		var missed = [];
		for (var i in this.equations) {
			var equation = this.equations[i];

			this.context.fillText(equation.toString(), equation.position.x, equation.position.y);

			equation.position.y += 1;

			if (equation.position.y >= this.boardSize.height) {
			missed.push(equation);
			}			
		}

		if (missed.length > 0) {
			this.game.madeMistake();
			this.equations = [];
			this.addNewEquation();
			this.rearrangeNewEquationWithInterval();
		}

		var self = this;
		setTimeout( function() { self.draw(); } , this.settings.speed);
	}
});