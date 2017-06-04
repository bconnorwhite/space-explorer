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
     //TODO: date
     colony.game.displaySideBarText("Population:", 14);
     //TODO: population
     colony.game.displaySideBarText("Food:", 16);
     //TODO: food
     colony.game.displaySideBarText("Food Prod. Rate:", 18);
     //colony.game.mine.getEnergyProduction(); <- wont work b/c not initialized. Need to find a way for buildings to talk.
      colony.game.displaySideBarText("Energy:", 20);
     //TODO: energy
      colony.game.displaySideBarText("Energy Prod. Rate:", 22);
     //TODO: energy production rate
     colony.game.displayBackButton();
     colony.game.displayCreditBox(colony.game.explorer.credits);
     colony.game.displayBottomBar();
     colony.game.displayViewCorners();
   },
   displayView: function(){
     colony.game.displayViewLine("Research Projects:", 2, 2);
     //TODO: scroller with buildling blueprints
     //TODO: scroller with rocket part blueprints OR maybe 3 scrollers, one for each type of rocket part
   }
 };
 return colony;
}
