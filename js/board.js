function Board (container, equationTemplate){
	this.container = container;
	this.equationTemplate = equationTemplate;
	this.equations = [];
	this.boardSize = {width: container.width(), height:container.height()};
}

Board.prototype.addEquationToBoard = function(equation) {
	this.equations.push(equation);
	equation.addToBoard();
};

Board.prototype.generateEquation = function () {
	var firstOperand = getRandomInt(0,10);
	var secondOperand = getRandomInt(0,10);

	return new Equation({id:"equation"+this.equations.length,
								 board:this.container,
								 boardSize:this.boardSize,
								 template:this.equationTemplate,
								 equation: {first:firstOperand, second:secondOperand, operation:"+"}});
}

Board.prototype.start = function () {
	var equation = this.generateEquation();
	this.addEquationToBoard(equation);
	equation.startFalling();
}