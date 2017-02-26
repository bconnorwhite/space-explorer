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
     displaySidebar: function(){

     },
     displayView: function(){

     },
     displayCredits: function(){

     },
     setTitle: function(title){
       
     },
   };
   return gamebox;
 }
