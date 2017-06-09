/* MissionControl.js
 *
 */

 function MissionControl() {
   var missionControl = {
     init: function(g) {
       missionControl.game = g;
     },
     run: function(){
       missionControl.format();
     },
     format: function(){
       missionControl.game.displayUpgradeSideBar(missionControl.game.explorer.location.missionControl);
       missionControl.game.displayBottomBar();
       missionControl.game.displayViewCorners();
     }
   };
   return missionControl;
 }
