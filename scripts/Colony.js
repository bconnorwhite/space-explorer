/* Colony.js
 *
 */

function Colony() {
 var colony = {
   init: function(g) {
     colony.game = g;
   },
   run: function(){
     colony.format();
     colony.displayView();
   },
   format: function(){
     colony.game.displaySideBar();
     colony.game.displayTitleBox(colony.game.explorer.location.body.name, colony.game.explorer.location.colony.image, colony.game.explorer.location.colony.name);
     //TODO: date
     colony.game.displaySideBarText("Population:", 13);
     //TODO: population
     colony.game.displaySideBarText("Food:", 15);
     //TODO: food amount
     colony.game.displaySideBarText("Food Prod. Rate:", 17);
     colony.game.displaySideBarText(" " + colony.game.mine.modules.food.getProductionString(), 18);
     colony.game.displaySideBarText("Energy:", 19);
     //TODO: energy amount
     colony.game.displaySideBarText("Energy Prod. Rate:", 21);
     colony.game.displaySideBarText(" " + colony.game.mine.modules.energy.getProductionString(), 22);
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
