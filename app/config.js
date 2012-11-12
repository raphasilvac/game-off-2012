config = function() {
	return ({
		/**
		 * Configure init here
		 */
		init: function() {
			Crafty.init(600, 500);
			this.canvas();
			this.sprite();
		},

		/**
		 * Configure canvas here
		 */
		canvas: function() {
			Crafty.canvas();
		},

		/**
		 * Configure sprites here
		 */
		sprite: function() {
			//turn the sprite map into usable components
			Crafty.sprite(16, "img/lumberjack_sheet.png", {
				grass1: [0,0],
				grass2: [1,0],
				grass3: [2,0],
				grass4: [3,0],
				flower: [0,1],
				bush1: [0,2],
				bush2: [1,2],
				player: [0,0]
			});

			Crafty.sprite(256, "img/Tree1.png", {
				tree: [0,0]
			});

			Crafty.sprite(64, "img/lumberjack_sheet.png", {
				lumberJack: [0, 0]
			});

			Crafty.sprite(64, "img/pidgeot.png", {
				pidgeon: [0, 0]
			});

			Crafty.sprite(20, "img/strawberry.png", {
				strawberry: [0, 0]
			});
		}
	})
}

Config = new config();