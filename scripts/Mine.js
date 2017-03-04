/* Mine.js
 *
 */

 function Mine() {
     var mine = {
         init: function(game) {
             mine.game = game;
             mine.format();
         },
         format: function(){
           mine.game.displaySideBar();
           mine.game.displayTitleBox(mine.game.explorer.location.mine.name);
           mine.game.displaySideBarIcon(mine.game.explorer.location.mine.image, 4, 6);
           mine.game.displaySideBarLabel("STORE", 11);
           mine.game.displayCreditBox(mine.game.explorer.credits);
           mine.game.displayBottomBar();
         }
     };
     return mine;
 }
