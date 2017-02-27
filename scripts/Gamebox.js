/* Gamebox.js
 *
 */

 function Gamebox(){
   var gamebox = {
     channels: {},
     register: function(channel, fn){
       gamebox.channels[channel] = fn;
     },
     init: function(exp){
       gamebox.explorer = exp;
     },
     displaySideBar: function(){
       gamebox.channels.displaySideBar();
     },
     displayBottomBar: function(){
       gamebox.channels.displayBottomBar();
     },
     displayTitleBox: function(title){
       gamebox.channels.displayTitleBox(title);
     },
     displayView: function(){
       gamebox.channels.displayView(gamebox.explorer.location.view);
     },
     displayCreditBox: function(){
       gamebox.channels.displayCreditBox();
       gamebox.setCredits();
     },
     setCredits: function(){
       gamebox.channels.setCredits(gamebox.explorer.credits);
     },
     setTitle: function(title){
       gamebox.channels.setTitle(title);
     },
   };
   return gamebox;
 }
