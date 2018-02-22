var statusGameOver={
	preload: function() {
		play.load.image('button', 'assets/sprites/btn.png');
		play.load.image('background', 'assets/sprites/background-day.png');
		play.load.image('base', 'assets/sprites/base.png');
		play.load.image('gameover', 'assets/sprites/gameover.png');
		play.load.image('logo', 'assets/sprites/logo.png');
	},

	create: function() {
		var background = play.add.tileSprite(0, 0, 370, 500, 'background');
		var base = play.add.tileSprite(0, 500, 370, 100, 'base');
		var button = this.add.button(play.width/2, play.height/2, 'button', this.startGame, this);
		button.anchor.setTo(0.5);
		var logo = play.add.tileSprite(play.width/2, play.height/2-200, 300, 80, 'logo');
		logo.anchor.setTo(0.5);
		var gameover = play.add.tileSprite(play.width/2, play.height/2-120, 192, 42, 'gameover');
		gameover.anchor.setTo(0.5);
		var txtPoints = play.add.text(play.width/2-50, play.height/2+100, "POINTS: ", {font: "bold 24px sans-serif", fill:"black", align: "center"});
		txtPoints.anchor.setTo(0.5);
		if(points < 0)
			points++;
		var nPoints = play.add.text(play.width/2+50, play.height/2+100, points.toString(), {font: "bold 24px sans-serif", fill:"black", align: "center"});
		nPoints.anchor.setTo(0.5);

	},

	startGame: function(){
		this.state.start('Game');
	}
};