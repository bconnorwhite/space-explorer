/* Launcher.js
 *
 */

 function Launcher() {
   var launcher = {
     init: function(game) {
       launcher.game = game;
       launcher.format();
       launcher.displayView();
     },
     format: function(){
       launcher.game.displaySideBar();
       launcher.game.displayTitleBox(launcher.game.explorer.location.launcher.name);
       //launcher.game.displaySideBarIcon(launcher.game.explorer.location.launcher.image);
       launcher.game.displayCreditBox(launcher.game.explorer.credits);
       launcher.game.displayBottomBar();
       launcher.game.displayViewCorners();
       launcher.game.displaySideBarLabel("STORE",11);
       launcher.game.displaySideBarIcon(launcher.game.explorer.location.launcher.image,4,6);
       launcher.game.drawSideBarBar("_",17);
       launcher.game.drawSideBarBar("_",24);
     },
     displayView: function(){//Do all the view related stuff in here
       launcher.game.displayView(rocketImage);
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
