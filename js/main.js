/*WIDTH, HEIGHT, COMPILADOR(RENDER), DIV HTML*/
var play = new Phaser.Game(370,600, Phaser.CANVAS, 'container');
/* nombre, objeto*/
play.state.add('Menu', statusMenu);
play.state.add('Game', statusGame);
play.state.add('GameOver', statusGameOver);

play.state.start('Menu');

