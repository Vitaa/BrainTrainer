var Board = Class.extend({
	init: function(container, equationTemplate){
		this.container = container;
		this.equationTemplate = equationTemplate;
		this.boardSize = {width: container.width(), height:container.height()};

		this.equations = [];
		this.answers = [];
	},
  
    addEquationToBoard : function(equation) {
		this.equations.push(equation);
		equation.addToBoard();
	},

	generateEquation : function() {
		var firstOperand = getRandomInt(0,10);
		var secondOperand = getRandomInt(0,10);

		return new Equation({id:"equation"+this.equations.length,
									 board:this,
									 container:this.container,
									 boardSize:this.boardSize,
									 template:this.equationTemplate,
									 equation: {first:firstOperand, second:secondOperand, operation:"+"}});
	},

	popEquation : function(equation) {
		removeItem(this.equations, equation);
		equation.remove();
	},

	addNewEquation : function() {
		var equation = this.generateEquation();
		this.addEquationToBoard(equation);
		equation.startFalling();
	},

	
	start: function () {
		this.addNewEquation();
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
	}
});