var Board = Class.extend({
	init: function(canvas){
		this.context = canvas.getContext("2d");
		this.context.font = "30pt Calibri";
        this.context.fillStyle = "white";
		
		this.boardSize = {width: 600, height:620};

		this.equations = [];
		this.answers = [];

		this.newEquationInterval = 1000 * 8;
	},
  
    addEquationToBoard : function(equation) {
		this.equations.push(equation);
	},

	generateEquation : function() {
		var firstOperand = getRandomInt(0,10);
		var secondOperand = getRandomInt(0,10);

		return new Equation({boardSize:this.boardSize,
							 equation: {first:firstOperand, second:secondOperand, operation:"+"}});
	},

	popEquation : function(equation) {
		removeItem(this.equations, equation);
	},

	addNewEquation : function() {
		var equation = this.generateEquation();
		this.addEquationToBoard(equation);
	},

	
	start: function () {
		this.addNewEquation();
		this.draw();
		// var self = this;
		// setTimeout( function() { self.start(); } , self.newEquationInterval);

	},

	keyPressed: function(number) {
		this.answers.push(number);
		var currentEquation = this.equations[this.equations.length-1],
			answersLen = this.answers.length;

		for (var i=1; i<answersLen+1; i++) {
			var answer = this.answers.slice(answersLen-i, answersLen).join("");
			if (currentEquation.check(+answer)) {

				this.answers = [];
				this.popEquation(currentEquation);
				this.addNewEquation();
			}
		}
	},

	missedEquation: function (equation) {
		this.popEquation(equation);
		this.addNewEquation();
	},


	// canvas
	clear : function() {
  		this.context.clearRect(0, 0, this.boardSize.width, this.boardSize.height);
	},

	draw : function() {
		this.clear();
		
		for (var i = 0; i < this.equations.length; i++) {
			var equation = this.equations[i];

			this.context.fillText(equation.toString(), equation.position.x, equation.position.y);

			equation.position.y += 1;

			if (equation.position.y >= this.boardSize.height) {
				this.missedEquation(equation);
			}
		}

		var self = this;
		setTimeout( function() { self.draw(); } , 50);
	}
});