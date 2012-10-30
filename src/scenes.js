/**
 * loading
 *
 * This scene should be called before every new level.
 */

Crafty.scene("loading", function () {
    //load takes an array of assets and a callback when complete
    // Crafty.load(["sprite.png"], function () {
    //     Crafty.scene("main"); //when everything is loaded, run the main scene
    // });

    //black background with some loading text
    Crafty.background("#000");
    Crafty.e("2D, DOM, Text").attr({ w: 100, h: 20, x: 150, y: 120 })
            .text("Loading")
            .css({ "text-align": "center", "color": "#FFF"});
});



/**
 * about
 *
 * Show information about the game and developers.
 */
Crafty.scene("about", function () {

});



/**
 * main_menu
 *
 * Shows the main menu, where the user can select to start a new game, view the about or ranking.
 */
Crafty.scene("main_menu", function () {

});


