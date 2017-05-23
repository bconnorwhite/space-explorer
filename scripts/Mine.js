/* Mine.js
 *
 */
var solarCost = 0.0847;

var Adjust = {
  INVEST: 0,
  DIVEST: 1,
};

function Mine() {
   var mine = {
       init: function(game) {
         mine.game = game;
         mine.format();
         mine.populateView();
       },
       format: function(){
         mine.game.displaySideBar();
         mine.game.displayTitleBox(mine.game.explorer.location.mine.name);
         mine.game.displaySideBarIcon(mine.game.explorer.location.mine.image, 4, 6);
         mine.game.displaySideBarLabel("STORE", 11);
         mine.game.displayCreditBox(mine.game.explorer.credits);
         mine.game.displayBottomBar();
         mine.game.displayViewCorners();

         mine.game.displayViewLine(mine.game.explorer.location.mine.energySource + ":", 2, 1);
         mine.game.displayViewLine("Production Rate :", 3, 2);
         mine.game.displayViewLine("Consumption Rate:", 4, 2);
         mine.game.displayViewLine("Investment Rate :", 5, 2);
       },
       populateView: function(){
         mine.addResource(mine.game.explorer.location.mine.energySource, "J", mine.getEnergyProduction(), 0, mine.game.explorer.location.mine.energyInvestment, 0, mine.adjustEnergy);
         mine.addResource("Food", "J", -1, 0, mine.game.explorer.location.mine.foodInvestment, 1, mine.adjustEnergy);
         mine.addResource("Fuel", "J", -1, 0, mine.game.explorer.location.mine.fuelInvestment, 2, mine.adjustEnergy);
         mine.addResource("Ore", "kg", -1, 0, mine.game.explorer.location.mine.oreInvestment, 3, mine.adjustEnergy);
       },
       addResource: function(resource, units, production, consumption, investment, slot, adjustFunc){
         mine.game.displayViewLine(resource + ":", (slot*6)+2, 1);
         mine.game.displayViewLine("Production Rate : " + production + " " + units + "/year", (slot*6)+3, 2);
         mine.game.displayViewLine("Consumption Rate: " + consumption + " " + units + "/year", (slot*6)+4, 2);
         mine.game.displayViewLine("Investment Rate : " + investment + " C/year", (slot*6)+5, 2);
         mine.game.displayViewLine("Adjust", (slot*6)+5, 9, undefined, "right");
         mine.game.displayViewLine("+ ", (slot*6)+5, 11, "invest-"+slot, "right");
         mine.game.displayViewLine(" -", (slot*6)+5, 3, "divest-"+slot, "right");
         document.getElementsByClassName("invest-"+slot)[0].onclick = function(){adjustFunc(Adjust.INVEST);};
         document.getElementsByClassName("divest-"+slot)[0].onclick = function(){adjustFunc(Adjust.DIVEST);};
       },
       adjustEnergy: function(adjust){
         //To adjust energy: adjust investment rate AND save to database. Should be done through sandbox.
         switch(adjust){
           case Adjust.INVEST:
            mine.game.adjustEnergy(Adjust.INVEST);
            break;
           case Adjust.DIVEST:
            console.log("DIVESTING");
            break;
         }
       },
       getEnergyProduction: function(){//Calculates energy production rate in Joules/year given credits invested/year
         return mine.game.explorer.location.mine.energyInvestment / solarCost;
       }
   };
   return mine;
}
