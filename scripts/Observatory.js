/* Observatory.js
 *
 */

 function Observatory() {
     var observatory = {
         init: function(game) {
             observatory.game = game;
             observatory.format();
         },
         format: function(){
           observatory.game.displaySideBar();
           observatory.game.displayTitleBox(observatory.game.explorer.location.observatory.name);
           //observatory.game.displaySideBarIcon(observatory.game.explorer.location.observatory.image);
           observatory.game.displayCreditBox(observatory.game.explorer.credits);
           observatory.game.displayBottomBar();
         }
     };
     return observatory;
 }
