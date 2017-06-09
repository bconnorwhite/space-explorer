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
       factory.game.displayUpgradeSideBar(factory.game.explorer.location.factory);
       factory.game.displayBottomBar();
       factory.game.displayViewCorners();
     }
   };
   return factory;
 }
