/* Observatory.js
 *
 */

 function Observatory() {
   var observatory = {
     init: function(g) {
       observatory.game = g;
     },
     run: function(){
       observatory.format();
     },
     format: function(){
       observatory.game.displayUpgradeSideBar(observatory.game.explorer.location.observatory);
     }
   };
   return observatory;
 }
