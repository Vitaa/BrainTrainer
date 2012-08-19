var Board = Class.extend({
	
	init: function(canvas){
		this.context = canvas.getContext("2d");
		this.context.font = "28pt Calibri";
        this.context.fillStyle = "white";
		
		this.boardSize = {width: 600, height:620};

		this.equations = [];
		this.answers = [];

		this.newEquationInterval = 1000 * 2;
	},

	generateEquation : function() {
		var firstOperand = getRandomInt(0,10);
		var secondOperand = getRandomInt(0,10);
		var equation = new Equation({boardSize:this.boardSize,
							 equation: {first:firstOperand, second:secondOperand, operation:"+"}});

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

	
	start: function () {
		this.addNewEquation();
		this.draw();
	},

	keyPressed: function(number) {
		this.answers.push(number);
		var currentEquation = this.equations[0],
			answersLen = this.answers.length;

		for (var i=1; i<answersLen+1; i++) {
			var answer = this.answers.slice(answersLen-i, answersLen).join("");
			if (currentEquation.check(+answer)) {

				this.answers = [];
				this.popEquation(currentEquation);
			}
		}
	},

	missedEquation: function (equation) {
		this.popEquation(equation);

		// TODO: decrease "life" count
	},


	// canvas
	clear : function() {
  		this.context.clearRect(0, 0, this.boardSize.width, this.boardSize.height);
	},

	draw : function() {
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
		}

		var self = this;
		setTimeout( function() { self.draw(); } , 40);
	}
});