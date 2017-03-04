/* Launcher.js
 *
 */

 function Launcher() {
     var launcher = {
         init: function(game) {
             launcher.game = game;
             launcher.format();
         },
         format: function(){
           launcher.game.displaySideBar();
           launcher.game.displayTitleBox(launcher.game.explorer.location.launcher.name);
           //launcher.game.displaySideBarIcon(launcher.game.explorer.location.launcher.image);
           launcher.game.displayCreditBox(launcher.game.explorer.credits);
           launcher.game.displayBottomBar();
         }
     };
     return launcher;
 }
