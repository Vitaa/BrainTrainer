var Equation = Class.extend({
	init: function(config) {
		this.equation = config.equation;
		this.template = config.template;
		this.boardSize = config.boardSize;
		this.board = config.board;
		this.container = config.container;
		this.id = config.id;
	},

	addToBoard : function() {
		var template = Handlebars.compile( this.template );
		var html = template($.extend({id:this.id}, this.equation));
		this.container.append(html);

		this.$element = $("#"+this.id);
		this.$element.css("margin-left", getRandomInt(0, this.boardSize.width - this.$element.innerWidth()) + "px");
	},

	startFalling : function () {
		var $self = this.$element;
		var self = this;
		$self.animate(
			{ 
				'marginTop': self.boardSize.height - $self.height() + 'px'
			}, 
			10000,
			function () {
				self.board.missedEquation(self);
			});
	},

	check : function (answer) {
		return (this.equation.first + this.equation.second === answer);
	},

	remove : function () {
		this.$element.stop();
		this.$element.remove();
	}
});