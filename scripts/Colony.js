/* Colony.js
 *
 */

function Colony() {
 var colony = {
   init: function(game) {
     colony.game = game;
     colony.format();
     colony.displayView();
   },
   format: function(){
     colony.game.displaySideBar();
     colony.game.displayTitleBox(colony.game.explorer.location.body.name, colony.game.explorer.location.colony.name);
     colony.game.displaySideBarIcon(colony.game.explorer.location.colony.image, 5, 6);
     //TODO: population
     //TODO: number of explorers
     //TODO: date
     colony.game.displayBackButton();
     colony.game.displayCreditBox(colony.game.explorer.credits);
     colony.game.displayBottomBar();
   },
   displayView: function(){
     colony.game.displayViewLine("Blueprints:", 2, 2);
     //TODO: scroller with buildling blueprints
     //TODO: scroller with rocket part blueprints OR maybe 3 scrollers, one for each type of rocket part
   }
 };
 return colony;
}
