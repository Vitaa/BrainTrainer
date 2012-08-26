var Equation = Class.extend({
	init: function(config) {
		var firstOperand = getRandomInt(config.conditions.min, config.conditions.max);
		var secondOperand = getRandomInt(config.conditions.min, config.conditions.max);

		switch (config.conditions.operation) {
			case "-": {
				firstOperand = firstOperand + secondOperand;
				break;
			}
			case "/": {
				if (secondOperand == 0) {
					secondOperand = getRandomInt(1, config.conditions.max);
				}
				firstOperand = firstOperand * secondOperand;
				break;
			}
		}
		this.equation = { operation : config.conditions.operation,
						  first : firstOperand,
						  second : secondOperand, };

		this.boardSize = config.boardSize;
		this.position = {x:0, y:30};
	},

	check : function (answer) {
		switch (this.equation.operation) {
			case "+": {
				return (this.equation.first + this.equation.second === answer);
			}
			case "-": {
				return (this.equation.first - this.equation.second === answer);
			}
			case "*": {
				return (this.equation.first * this.equation.second === answer);
			}
			case "/": {
				return (this.equation.first / this.equation.second === answer);	
			}

		}
	},

	toString : function() {
		return (this.equation.first + " " + this.equation.operation + " " + this.equation.second);
	},	
});