/* MissionControl.js
 *
 */

 function MissionControl() {
     var missionControl = {
         init: function(gb) {
             missionControl.gamebox = gb;
             missionControl.format();
         },
         format: function(){
           missionControl.gamebox.displaySideBar();
           missionControl.gamebox.displayTitleBox(missionControl.gamebox.explorer.location.missionControl.name);
           //missionControl.gamebox.displaySideBarIcon(missionControl.gamebox.explorer.location.missionControl.image);
           missionControl.gamebox.displayCreditBox(missionControl.gamebox.explorer.credits);
           missionControl.gamebox.displayBottomBar();
         }
     };
     return missionControl;
 }
