/**
 *
 * The Game
 * 
 * The basic game loop and some start methods to define the rules of the game.
 *
 */

window.onload = function () {
	Crafty.init(Game.config.screenWidth, Game.config.screenHeight);
	Crafty.canvas.init();

	Crafty.scene('loading');
};