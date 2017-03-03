/* Mine.js
 *
 */

 function Mine() {
     var mine = {
         init: function(gb) {
             mine.gamebox = gb;
             mine.format();
         },
         format: function(){
           mine.gamebox.displaySideBar();
           mine.gamebox.displayTitleBox(mine.gamebox.explorer.location.mine.name);
           //mine.gamebox.displaySideBarIcon(mine.gamebox.explorer.location.mine.image);
           mine.gamebox.displayCreditBox(mine.gamebox.explorer.credits);
           mine.gamebox.displayBottomBar();
         }
     };
     return mine;
 }
