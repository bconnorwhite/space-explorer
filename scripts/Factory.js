/* Factory.js
 *
 */

 function Factory() {
     var factory = {
         init: function(game) {
             factory.game = game;
             factory.format();
         },
         format: function(){
           factory.game.displaySideBar();
           factory.game.displayTitleBox(factory.game.explorer.location.factory.name);
           //factory.game.displaySideBarIcon(factory.game.explorer.location.factory.image);
           factory.game.displayCreditBox(factory.game.explorer.credits);
           factory.game.displayBottomBar();
         }
     };
     return factory;
 }
