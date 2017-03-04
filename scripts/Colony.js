/* Colony.js
 *
 */

 function Colony() {
     var colony = {
         init: function(game) {
             colony.game = game;
             colony.format();
         },
         format: function(){
           colony.game.displaySideBar();
           colony.game.displayTitleBox(colony.game.explorer.location.colony.name);
           //colony.game.displaySideBarIcon(colony.game.explorer.location.colony.image);
           colony.game.displayCreditBox(colony.game.explorer.credits);
           colony.game.displayBottomBar();
         }
     };
     return colony;
 }
