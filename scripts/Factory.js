/* Factory.js
 *
 */

 function Factory() {
     var factory = {
         init: function(gb) {
             factory.gamebox = gb;
             factory.format();
         },
         format: function(){
           factory.gamebox.displaySideBar();
           factory.gamebox.displayTitleBox(factory.gamebox.explorer.location.factory.name);
           //factory.gamebox.displaySideBarIcon(factory.gamebox.explorer.location.factory.image);
           factory.gamebox.displayCreditBox(factory.gamebox.explorer.credits);
           factory.gamebox.displayBottomBar();
         }
     };
     return factory;
 }
