var statusMenu = {
	
	preload: function () {
		/*CARGAMOS LA IMAGENES*/
		play.load.image('button', 'assets/sprites/btn.png');
		play.load.image('background', 'assets/sprites/background-day.png');
		play.load.image('base', 'assets/sprites/base.png');
		play.load.image('logo', 'assets/sprites/logo.png');
	},

	create: function(){
		/*AÑADIMOS LAS IMAGENES CARGADAS Y CREAMOS EL BOTON*/
		var background = play.add.tileSprite(0, 0, 370, 500, 'background');
		var base = play.add.tileSprite(0, 500, 370, 100, 'base');
		var button = this.add.button(play.width/2, play.height/2, 'button', this.startGame, this);
		button.anchor.setTo(0.5);
		var logo = play.add.tileSprite(play.width/2, play.height/2-200, 300, 80, 'logo');
		logo.anchor.setTo(0.5);
	},

	startGame: function(){
		this.state.start('Game');
	}
};
