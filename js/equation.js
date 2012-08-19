function Equation (config) {
	this.equation = config.equation;
	this.template = config.template;
	this.boardSize = config.boardSize;
	this.board = config.board;
	this.id = config.id;
}

Equation.prototype.addToBoard = function() {
	var template = Handlebars.compile( this.template );
	var html = template($.extend({id:this.id}, this.equation));
	this.board.append(html);

	this.$element = $("#"+this.id);
	this.$element.css("margin-left", getRandomInt(0, this.boardSize.width - this.$element.innerWidth()) + "px");
};

Equation.prototype.startFalling = function () {
	this.$element.animate({ 'marginTop': this.boardSize.height + 'px'}, 10000);
};