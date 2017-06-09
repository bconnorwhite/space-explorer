/* Launcher.js
 *
 */

 function Launcher() {
   var launcher = {
     init: function(g) {
       launcher.game = g;
     },
     run: function(){
       launcher.format();
       launcher.displayView();
     },
     format: function(){
       launcher.game.displayUpgradeSideBar(launcher.game.explorer.location.launcher);
       launcher.game.displayBottomBar();
       launcher.game.displayViewCorners();
     },
     displayView: function(){//Do all the view related stuff in here
       //launcher.game.displayView(rocketImage);
       //launcher.game.explorer.location.launcher.rockets;
       //if(launcher.game.explorer.location.launcher.rockets[]<rockets.length){
        launcher.game.displayViewRightArrow();
       //}
       //if(launcher.game.explorer.location.launcher.rockets[]>=0){
         launcher.game.displayViewLeftArrow();
       //}
     }
   };
   return launcher;
 }
