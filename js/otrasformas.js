//otra forma de interactuar con el teclado
keyRight = play.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
if(keyRight.isDown){
	bird.position.x += 5;
}