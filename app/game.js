window.onload = function() {
	//start crafty
	Config.init();

	
	//method to randomy generate the map
	function generateWorld() {
		//generate the grass along the x-axis
		for(var i = 0; i < 25; i++) {
			//positioning the tree sprite
			Crafty.e("2D, Canvas, tree")
					.attr({x: 180, y: 220});

			Crafty.e("2D, Canvas, pidgeon")
					.attr({x: 180, y: 300});
			Crafty.e("2D, Canvas, pidgeon")
					.attr({x: 250, y: 250});
			Crafty.e("2D, Canvas, pidgeon")
					.attr({x: 320, y: 300});
			Crafty.e("2D, Canvas, pidgeon")
					.attr({x: 380, y: 200});

			//generate the grass along the y-axis
			for(var j = 0; j < 20; j++) {
				// Crafty.e("2D, Canvas, grass1")
				// 	.attr({x: i * 16, y: j * 16});
				
				//1/50 chance of drawing a flower and only within the bushes
				// if(i > 0 && i < 24 && j > 0 && j < 19 && Crafty.randRange(0, 50) > 49) {
				// 	Crafty.e("2D, DOM, flower, Animate")
				// 		.attr({x: i * 16, y: j * 16})
				// 		.animate("wind", 0, 1, 3)
				// 		.bind("enterframe", function() {
				// 			if(!this.isPlaying())
				// 				this.animate("wind", 80);
				// 		});
				// }
			}
		}
		
		//create the bushes along the x-axis which will form the boundaries
		// for(var i = 0; i < 25; i++) {
		// 	Crafty.e("2D, Canvas, wall_top, bush"+Crafty.randRange(1,2))
		// 		.attr({x: i * 16, y: 0, z: 2});
		// 	Crafty.e("2D, DOM, wall_bottom, bush"+Crafty.randRange(1,2))
		// 		.attr({x: i * 16, y: 304, z: 2});
		// }
		
		//create the bushes along the y-axis
		//we need to start one more and one less to not overlap the previous bushes
		// for(var i = 1; i < 19; i++) {
		// 	Crafty.e("2D, DOM, wall_left, bush"+Crafty.randRange(1,2))
		// 		.attr({x: 0, y: i * 16, z: 2});
		// 	Crafty.e("2D, Canvas, wall_right, bush"+Crafty.randRange(1,2))
		// 		.attr({x: 384, y: i * 16, z: 2});
		// }
	}
	
	//the loading screen that will display while our assets load
	Crafty.scene("loading", function() {
		//load takes an array of assets and a callback when complete
		Crafty.load(["img/lumberjack_sheet.png"], function() {
			Crafty.scene("main"); //when everything is loaded, run the main scene
		});
		
		//black background with some loading text
		Crafty.background("#FFF");
		Crafty.e("2D, DOM, Text").attr({w: 100, h: 20, x: 150, y: 120})
			.text("Loading")
			.css({"text-align": "center"});
	});
	
	//automatically play the loading scene
	Crafty.scene("loading");
	
	Crafty.c("asteroid", {
			init: function() {
				this.origin("center");
				this.attr({
					x: 300, //give it random positions, rotation and speed
					y: 300,
					//xspeed: Crafty.randRange(1, 2), 
					xspeed: 0, 
					yspeed: Crafty.randRange(1, 2), 
					rspeed: Crafty.randRange(-5, 5)
				}).bind("enterframe", function() {
					this.x += this.xspeed;
					this.y += this.yspeed;
					this.rotation += this.rspeed;
					
					// if(this._x > Crafty.viewport.width) {
					// 	this.x = -64;
					// }
					// if(this._x < -64) {
					// 	this.x =  Crafty.viewport.width;
					// }
					// if(this._y > Crafty.viewport.height) {
					// 	this.y = -64;
					// }
					// if(this._y < -64) {
					// 	this.y = Crafty.viewport.height;
					// }
				}).collision()
				.onHit("lumberJack", function(e) {
					//if hit by a bullet increment the score
					//player.score += 5;
					//score.text("Score: "+player.score);
					e[0].obj.destroy(); //destroy the bullet
					
					var size;
					//decide what size to make the asteroid
					// if(this.has("big")) {
					// 	this.removeComponent("big").addComponent("medium");
					// 	size = "strawberry";
					// } 
					// else if(this.has("medium")) {
					// 	this.removeComponent("medium").addComponent("small");
					// 	size = "small";
					// } else if(this.has("small")) { //if the lowest size, delete self
					// 	asteroidCount--;
					// 	this.destroy();
					// 	return;
					// }
					
					var oldxspeed = this.xspeed;
					this.xspeed = -this.yspeed;
					this.yspeed = oldxspeed;
					
					//asteroidCount++;
					//split into two asteroids by creating another asteroid
					Crafty.e("2D, DOM, "+size+", Collision, asteroid").attr({x: this._x, y: this._y});
				});
				
			}
		});

	Crafty.scene("main", function() {
		generateWorld();
		
		Crafty.c('CustomControls', {
			__move: {left: false, right: false, up: false, down: false},	
			_speed: 3,
			
			CustomControls: function(speed) {
				if(speed) this._speed = speed;
				var move = this.__move;
				
				this.bind('enterframe', function() {
					//move the player in a direction depending on the booleans
					//only move the player in one direction at a time (up/down/left/right)
					if(this.isDown("RIGHT_ARROW")) this.x += this._speed; 
					else if(this.isDown("LEFT_ARROW")) this.x -= this._speed; 
					else if(this.isDown("A")) this.x = 120;
					else if(this.isDown("S")) this.x = 180;
					else if(this.isDown("D")) this.x = 240;
					else if(this.isDown("F")) this.x = 300;
					else if(this.isDown("Q")) {

						//Crafty.e("2D, DOM, big, Collision, asteroid");
						Crafty.e("2D, DOM, strawberry, Collision, asteroid");
						
					}
					// else if(this.isDown("UP_ARROW")) this.y -= this._speed;
					// else if(this.isDown("DOWN_ARROW")) this.y += this._speed;
				});
				
				return this;
			}
		});
		
		//create our player entity with some premade components
		player = Crafty.e("2D, Canvas, lumberJack, Controls, CustomControls, Animate, Collision")
			.attr({x: 300, y: 430, z: 1})
			.CustomControls(8)
			//.animate("walk_left", 6, 3, 8)
			.animate("walk_left", 0, 1, 3)
			.animate("walk_right", 0, 2, 3)
			.animate("walk_up", 3, 3, 5)
			.animate("walk_down", 0, 3, 2)
			.bind("keyup", function(e) {
				if(e.keyIdentifier == 'Left') {
					this.stop().animate("walk_left", 0);
				}
				else if(e.keyIdentifier == 'Right') {
					this.stop().animate("walk_right", 0);
				}
			})
			.bind("keydown", function(e){
				if(this.isDown("LEFT_ARROW")) {
					if(!this.isPlaying("walk_left"))
						this.stop().animate("walk_left", 10);
				} else if(this.isDown("RIGHT_ARROW")) {
					if(!this.isPlaying("walk_right"))
						this.stop().animate("walk_right", 10);
				}
			})
			.collision()
			.onHit("wall_left", function() {
				this.x += this._speed;
				this.stop();
			}).onHit("wall_right", function() {
				this.x -= this._speed;
				this.stop();
			}).onHit("wall_bottom", function() {
				this.y -= this._speed;
				this.stop();
			}).onHit("wall_top", function() {
				this.y += this._speed;
				this.stop();
			});
	});
};