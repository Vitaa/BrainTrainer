var Equation = Class.extend({
	init: function(config) {
		this.equation = config.equation;
		this.boardSize = config.boardSize;
		this.position = {x:0, y:20};
	},

	check : function (answer) {
		return (this.equation.first + this.equation.second === answer);
	},

	toString : function() {
		return (this.equation.first + " " + this.equation.operation + " " + this.equation.second);
	},	
});