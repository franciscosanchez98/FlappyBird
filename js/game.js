var background = base = tubes = bird = jump = timer = points = txtPoints = musicJump = musicHit = musicPoint = musicDie = "";

var statusGame = {
	preload: function () {
		/*CARGAMOS IMAGENES Y AUDIO*/
		play.load.image('background', 'assets/sprites/background-day.png');
		play.load.image('base', 'assets/sprites/base.png');
		play.load.spritesheet('bird', 'assets/sprites/birds.png', 43, 30);
		play.load.image('tube', 'assets/sprites/tubo.png');
		play.load.audio('jump', 'assets/audio/wing.ogg');
		play.load.audio('hit', 'assets/audio/hit.ogg');
		play.load.audio('point', 'assets/audio/point.ogg');
		play.load.audio('die', 'assets/audio/die.ogg');
		//optimiza el juego
		play.forceSingleUpdate = true;
	},

	create: function () {
		/*CREAMOS IMAGENES, AUDIO, FISICAS, ANIMACIONES, GRAVEDAD*/ 
		background = play.add.tileSprite(0, 0, 370, 500, 'background');
		base = play.add.tileSprite(0, 500, 370, 100, 'base');
		play.physics.startSystem(Phaser.Physics.ARCADE);
		tubes = play.add.group();
		tubes.enableBody = true;
		tubes.createMultiple(20, 'tube');
		txtPoints = play.add.text(play.width-50, 20, "0", {font:"30px Arial", fill: "white"});
		points = -1;

		musicJump = play.add.audio('jump'); 
		musicHit = play.add.audio('hit');
		musicPoint = play.add.audio('point');
		musicDie = play.add.audio('die');

		bird = play.add.sprite(100, 245, 'bird');
		bird.frame = 1;
		bird.animations.add('fly', [0,1,2], 10, true);
		play.physics.arcade.enable(bird);
		bird.body.gravity.y = 1200;
		bird.anchor.setTo(0, 0.5);
		jump = play.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		jump.onDown.add(this.jumping, this);
		timer = play.time.events.loop(1500, this.createCol, this);
	},

	update: function () {
		if(bird.alive !=false){
			background.tilePosition.x -=1;
			base.tilePosition.x -=1;
		}
		if(bird.inWorld == false){
			bird.alive = false;
			musicDie.play();
			this.state.start('GameOver');
		}else if(bird.position.y >= 490){
			musicDie.play();
			bird.alive = false;
			tubes.forEachAlive(function (cTube) {
				cTube.body.velocity.x = 0;
			}, this);
			this.state.start('GameOver');
		}
		play.physics.arcade.overlap(bird, tubes, this.GameOver);

		bird.animations.play('fly');
		if(bird.angle < 20){
			bird.angle +=1;
		}
		
	},

	jumping: function(){
		if(bird.alive != false){
			bird.body.velocity.y = -380;
			play.add.tween(bird).to({angle: -20}, 100).start();
			musicJump.play();
		}
	},

	createCol: function(){
		var space = Math.floor(Math.random() * 5)+1;
		for (var i = 0; i < 9; i++) {
			if(i != space && i != space+1){
				this.createTube(370, i*55);
			}
		}
		/*this.createTube(370, -space);
		this.createTube(370, (play.height-space)-160);*/
		points++;
		txtPoints.text = points;
		if(points > 0)
			musicPoint.play();
	},

	createTube: function(x, y, type){
		var tube = tubes.getFirstDead();
		tube.reset(x, y);
		tube.body.velocity.x = -180;

		tube.checkWorldBounds = true;
		tube.outOfBoundsKill = true;
	},

	GameOver: function () {
		if(bird.alive == false){
			return;
		}
		musicHit.play();
		bird.alive = false;
		play.time.events.remove(timer);
		tubes.forEachAlive(function (cTube) {
			cTube.body.velocity.x = 0;
		}, this);
		background.tilePosition.x =0;
		base.tilePosition.x =0;
	},
};

