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
       location.gamebox.displayCreditBox();
     }
   };
   return location;
 }
