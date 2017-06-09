/* Factory.js
 *
 */

 function Factory() {
   var factory = {
     init: function(g) {
       factory.game = g;
     },
     run: function(){
       factory.format();
     },
     format: function(){
       factory.game.displaySideBar();
       factory.game.displayTitleBox(factory.game.explorer.location.factory.name, factory.game.explorer.location.factory.image);
       factory.game.displayUpgrade(factory.game.explorer.location.factory.blueprint);
       factory.game.displayBackButton();
       factory.game.displayCreditBox(factory.game.explorer.credits);
       factory.game.displayBottomBar();
     }
   };
   return factory;
 }
