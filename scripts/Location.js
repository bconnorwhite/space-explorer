/* LocationWindow.js
 *
 */

 function Location(gb){
   var location = {
     gamebox: gb,
     init: function(){
       location.gamebox.displaySideBar();
       location.gamebox.displayBottomBar();
       location.gamebox.displayView();
       location.gamebox.displayTitleBox("SPACE EXPLORER");
       location.gamebox.displayCreditBox(location.gamebox.explorer.credits);
       location.gamebox.displayStatus([ location.gamebox.explorer.location.body.parent.type.toUpperCase() + ":",
                                    " " + location.gamebox.explorer.location.body.parent.name.toUpperCase(),
                                    location.gamebox.explorer.location.body.type.toUpperCase() + ":",
                                    " " + location.gamebox.explorer.location.body.name.toUpperCase(),
                                    "LOCATION:",
                                    " " + location.gamebox.explorer.location.type.toUpperCase()]);
     }
   };
   return location;
 }
