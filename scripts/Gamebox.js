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
     displayCreditBox: function(credits){
       gamebox.channels.displayCreditBox(credits);
     },
     setCredits: function(){
       gamebox.channels.setCredits(gamebox.explorer.credits);
     },
     setTitle: function(title){
       gamebox.channels.setTitle(title);
     },
     displayStatus: function(image){
       gamebox.channels.displayStatus(image);
     },
     setStatus: function(image){
       gamebox.channels.setStatus(image);
     }
   };
   return gamebox;
 }
