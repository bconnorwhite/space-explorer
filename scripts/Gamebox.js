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
     displayView: function(view){
       gamebox.channels.displayView(view);
     },
     displayViewIcons: function(icons){
       gamebox.channels.displayViewIcons(icons);
     },
     displayCreditBox: function(credits){
       gamebox.channels.displayCreditBox(credits);
     },
     setCredits: function(credits){
       gamebox.channels.setCredits(credits);
     },
     setTitle: function(title){
       gamebox.channels.setTitle(title);
     },
     displayStatus: function(image){
       gamebox.channels.displayStatus(image);
     },
     setStatus: function(image){
       gamebox.channels.setStatus(image);
     },
     displaySideBarButton: function(button, startRow){
       gamebox.channels.displaySideBarButton(button, startRow);
     },
     switchTo: function(string){
       gamebox.channels.switchTo(string);
     }
   };
   return gamebox;
 }
