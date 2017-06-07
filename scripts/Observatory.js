/* Observatory.js
 *
 */

 function Observatory(g) {
   var observatory = {
     game: g,
     init: function() {
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
