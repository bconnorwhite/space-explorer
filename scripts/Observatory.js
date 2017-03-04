/* Observatory.js
 *
 */

 function Observatory() {
     var observatory = {
         init: function(gb) {
             observatory.gamebox = gb;
             observatory.format();
         },
         format: function(){
           observatory.gamebox.displaySideBar();
           observatory.gamebox.displayTitleBox(observatory.gamebox.explorer.location.observatory.name);
           //observatory.gamebox.displaySideBarIcon(observatory.gamebox.explorer.location.observatory.image);
           observatory.gamebox.displayCreditBox(observatory.gamebox.explorer.credits);
           observatory.gamebox.displayBottomBar();
         }
     };
     return observatory;
 }
