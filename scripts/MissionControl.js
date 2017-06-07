/* MissionControl.js
 *
 */

 function MissionControl(g) {
   var missionControl = {
     game: g,
     init: function() {
       missionControl.format();
     },
     format: function(){
       missionControl.game.displaySideBar();
       missionControl.game.displayTitleBox(missionControl.game.explorer.location.missionControl.name);
       //missionControl.game.displaySideBarIcon(missionControl.game.explorer.location.missionControl.image);
       missionControl.game.displayCreditBox(missionControl.game.explorer.credits);
       missionControl.game.displayBottomBar();
     }
   };
   return missionControl;
 }
