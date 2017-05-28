/* Mine.js
 *
 */
var minInvestment = 1;

var solarCost = 0.0847;//Credits per Joule
var foodCost = 1;//Credits per Joule
var fuelCost = 1;//Credits per Joule
var oreCost = 1;//Credits per kg

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
     //TODO: mine.game.displayUpgrade(name, cost, upgrade function, image) - should call from game.js
     //TODO: mine.game.displayBackButton() - should call from game.js
     mine.game.displayCreditBox(mine.game.explorer.credits);
     mine.game.displayBottomBar();
     mine.game.displayViewCorners();
   },
   populateView: function(){
     mine.refreshEnergy();
     mine.refreshFood();
     mine.refreshFuel();
     mine.refreshOre();
   },
   refreshEnergy: function(){
     mine.addResource(mine.game.explorer.location.mine.energySource, "J", mine.getEnergyProduction(), 0, mine.game.explorer.location.mine.energyInvestment, 0, mine.adjustEnergy);
   },
   refreshFood: function(){
     mine.addResource("Food", "J", mine.getFoodProduction(), 0, mine.game.explorer.location.mine.foodInvestment, 1, mine.adjustFood);
   },
   refreshFuel: function(){
     mine.addResource("Fuel", "J", mine.getFuelProduction(), 0, mine.game.explorer.location.mine.fuelInvestment, 2, mine.adjustFuel);
   },
   refreshOre: function(){
     mine.addResource("Ore", "kg", mine.getOreProduction(), 0, mine.game.explorer.location.mine.oreInvestment, 3, mine.adjustOre);
   },
   addResource: function(resource, units, production, consumption, investment, slot, adjustFunc){
     mine.game.clearViewRow((slot*6)+2);
     mine.game.clearViewRow((slot*6)+3);
     mine.game.clearViewRow((slot*6)+4);
     mine.game.clearViewRow((slot*6)+5);
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
        mine.game.explorer.location.mine.energyInvestment = parseInt(mine.game.explorer.location.mine.energyInvestment) + minInvestment;
        mine.refreshEnergy();
        break;
       case Adjust.DIVEST:
        if(parseInt(mine.game.explorer.location.mine.energyInvestment) >= minInvestment){
          mine.game.explorer.location.mine.energyInvestment = parseInt(mine.game.explorer.location.mine.energyInvestment) - minInvestment;
          mine.refreshEnergy();
        }
        break;
     }
   },
   adjustFood: function(adjust){
     switch(adjust){
       case Adjust.INVEST:
        mine.game.explorer.location.mine.foodInvestment = parseInt(mine.game.explorer.location.mine.foodInvestment) + minInvestment;
        mine.refreshFood();
        break;
       case Adjust.DIVEST:
        if(parseInt(mine.game.explorer.location.mine.foodInvestment) >= minInvestment){
         mine.game.explorer.location.mine.foodInvestment = parseInt(mine.game.explorer.location.mine.foodInvestment) - minInvestment;
         mine.refreshFood();
        }
        break;
     }
   },
   adjustFuel: function(adjust){
     switch(adjust){
       case Adjust.INVEST:
        mine.game.explorer.location.mine.fuelInvestment = parseInt(mine.game.explorer.location.mine.fuelInvestment) + minInvestment;
        mine.refreshFuel();
        break;
       case Adjust.DIVEST:
        if(parseInt(mine.game.explorer.location.mine.fuelInvestment) >= minInvestment){
         mine.game.explorer.location.mine.fuelInvestment = parseInt(mine.game.explorer.location.mine.fuelInvestment) - minInvestment;
         mine.refreshFuel();
        }
        break;
     }
   },
   adjustOre: function(adjust){
     switch(adjust){
       case Adjust.INVEST:
        mine.game.explorer.location.mine.oreInvestment = parseInt(mine.game.explorer.location.mine.oreInvestment) + minInvestment;
        mine.refreshOre();
        break;
       case Adjust.DIVEST:
        if(parseInt(mine.game.explorer.location.mine.oreInvestment) >= minInvestment){
          mine.game.explorer.location.mine.oreInvestment = parseInt(mine.game.explorer.location.mine.oreInvestment) - minInvestment;
          mine.refreshOre();
        }
        break;
     }
   },
   getEnergyProduction: function(){//Calculates energy production rate in Joules/year given credits invested/year
     return mine.game.explorer.location.mine.energyInvestment / solarCost;
   },
   getFoodProduction: function(){
     return mine.game.explorer.location.mine.foodInvestment / foodCost;
   },
   getFuelProduction: function(){
     return mine.game.explorer.location.mine.fuelInvestment / fuelCost;
   },
   getOreProduction: function(){
     return mine.game.explorer.location.mine.oreInvestment / oreCost;
   }
 };
 return mine;
}


function Unit(){
  var unit = {

  };
  return unit;
}
