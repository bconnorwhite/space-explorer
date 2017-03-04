/* Colony.js
 *
 */

 function Colony() {
     var colony = {
         init: function(gb) {
             colony.gamebox = gb;
             colony.format();
         },
         format: function(){
           colony.gamebox.displaySideBar();
           colony.gamebox.displayTitleBox(colony.gamebox.explorer.location.colony.name);
           //colony.gamebox.displaySideBarIcon(colony.gamebox.explorer.location.colony.image);
           colony.gamebox.displayCreditBox(colony.gamebox.explorer.credits);
           colony.gamebox.displayBottomBar();
         }
     };
     return colony;
 }
