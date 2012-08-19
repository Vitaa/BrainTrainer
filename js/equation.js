var Equation = Class.extend({
	init: function(config) {
		this.equation = config.equation;
		this.boardSize = config.boardSize;
		this.position = {x: getRandomInt(0, this.boardSize.width - 100) , y:40};
	},

	check : function (answer) {
		return (this.equation.first + this.equation.second === answer);
	},

	toString : function() {
		return (this.equation.first + " " + this.equation.operation + " " + this.equation.second);
	}	
});