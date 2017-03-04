/* Launcher.js
 *
 */

 function Launcher() {
     var launcher = {
         init: function(gb) {
             launcher.gamebox = gb;
             launcher.format();
         },
         format: function(){
           launcher.gamebox.displaySideBar();
           launcher.gamebox.displayTitleBox(launcher.gamebox.explorer.location.launcher.name);
           //launcher.gamebox.displaySideBarIcon(launcher.gamebox.explorer.location.launcher.image);
           launcher.gamebox.displayCreditBox(launcher.gamebox.explorer.credits);
           launcher.gamebox.displayBottomBar();
         }
     };
     return launcher;
 }
