/* Mine.js
 *
 */
var modHeight = 6;
var firstModRow = 2;

var minInvestment = 1;

var Adjust = {
  INVEST: 0,
  DIVEST: 1,
};

function Mine() {
 var mine = {
   init: function(g) {
     mine.game = g;
     mine.modules = {
       energy: new Module(mine.game.explorer.location.mine.energyModule),
       food: new Module(mine.game.explorer.location.mine.foodModule),
       fuel: new Module(mine.game.explorer.location.mine.fuelModule),
       ore: new Module(mine.game.explorer.location.mine.oreModule)
     };
   },
   run: function(){
     mine.format();
     mine.displayView();
   },
   format: function(){
     mine.game.displaySideBar();
     mine.game.displayTitleBox(mine.game.explorer.location.mine.name, mine.game.explorer.location.mine.image);
     mine.game.displayUpgrade(mine.game.explorer.location.mine.blueprint, mine.upgrade());
     mine.game.displayBackButton();
     mine.game.displayCreditBox(mine.game.explorer.credits);
     mine.game.displayBottomBar();
     mine.game.displayViewCorners();
   },
   displayView: function(){
     var slot = 0;
     for(var mod in mine.modules){
       mine.drawMod(mine.modules[mod], slot);
       slot++;
     }
   },
   refresh: function(){
     var slot = 0;
     for(var mod in mine.modules){
       mine.refreshMod(mine.modules[mod], slot);
       slot++;
     }
   },
   upgrade: function(){
     //TODO
   },
   clearMod: function(mod, slot){
     for(var r=0; r<4; r++)
      mine.game.clearViewRow((slot*modHeight)+firstModRow+r);
   },
   drawMod: function(mod, slot){
     mine.game.displayViewLine(mod.name + ":", (slot*modHeight)+firstModRow, 1);
     mine.game.displayViewLine("Production Rate : " + mod.getProductionString(), (slot*modHeight)+firstModRow+1, 2);
     mine.game.displayViewLine("Consumption Rate: " + mod.getConsumptionString(), (slot*modHeight)+firstModRow+2, 2);
     mine.game.displayViewLine("Investment Rate : " + mod.investment + " C/year", (slot*modHeight)+firstModRow+3, 2);
     mine.game.displayViewLine("Adjust", (slot*modHeight)+firstModRow+3, 9, undefined, "right");
     mine.game.displayViewLine("+ ", (slot*modHeight)+firstModRow+3, 11, "invest-"+slot, "right");
     mine.game.displayViewLine(" -", (slot*modHeight)+firstModRow+3, 3, "divest-"+slot, "right");
     document.getElementsByClassName("invest-"+slot)[0].onclick = function(){mod.adjust(Adjust.INVEST); mine.refresh();};
     document.getElementsByClassName("divest-"+slot)[0].onclick = function(){mod.adjust(Adjust.DIVEST); mine.refresh();};
   },
   refreshMod: function(mod, slot){
     mine.clearMod(mod, slot);
     mine.drawMod(mod, slot);
   }
 };
 return mine;
}

/* Mine.js
 *
 */

function Module(p){//Might need investment to be a function
  var mod = p;
  mod.consumption = 0;//TODO: change to function getting from colony
  mod.adjust = function(adjustment){
    switch(adjustment){
      case Adjust.INVEST:
       mod.investment = parseInt(mod.investment) + minInvestment;
       break;
      case Adjust.DIVEST:
       if(parseInt(mod.investment) >= minInvestment){
         mod.investment = parseInt(mod.investment) - minInvestment;
       }
       break;
    }
  };
  mod.getProduction = function(){
    return mod.investment / mod.costPerUnit;
  };
  mod.getProductionString = function(){
    return mod.getProduction() + " " + mod.units + "/year";
  };
  mod.getConsumptionString = function(){
    return mod.consumption + " " + mod.units + "/year";//TODO: Again, get mod.consumption from colony
  };
  return mod;
}
