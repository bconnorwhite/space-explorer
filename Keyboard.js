/* Keyboard.js
 *
 */

 function Keyboard(sb){
   var keyboard = {
     sandbox: sb,
     escapeKey: EscapeKey(sb),
     dimKey: DimKey(sb),
     brightKey: BrightKey(sb),
     powerKey: PowerKey(sb),
     enterKey: EnterKey(sb)
   };
   keyboard.init = function(){
     keyboard.escapeKey.init();
     keyboard.dimKey.init();
     keyboard.brightKey.init();
     keyboard.powerKey.init();
     keyboard.enterKey.init();
   };
   return keyboard;
 }

 function EscapeKey(sb){
   var escapeKey = {
     sandbox: sb,
     element: document.getElementById('escape')
   };
   escapeKey.init = function(){
      escapeKey.element.onclick = function(){
        escapeKey.clicked();
      };
   };
   escapeKey.clicked = function(){
     sandbox.escape();
   };
   return escapeKey;
 }

 function DimKey(sb){
   var dimKey = {
     sandbox: sb,
     element: document.getElementById('dim')
   };
   dimKey.init = function(){
      dimKey.element.onclick = function(){
        dimKey.clicked();
      };
   };
   dimKey.clicked = function(){
     sandbox.dim();
   };
   return dimKey;
 }

 function BrightKey(sb){
   var brightKey = {
     sandbox: sb,
     element: document.getElementById('bright')
   };
   brightKey.init = function(){
      brightKey.element.onclick = function(){
        brightKey.clicked();
      };
   };
   brightKey.clicked = function(){
     sandbox.bright();
   };
   return brightKey;
 }

 function PowerKey(sb){
   var powerKey = {
     sandbox: sb,
     element: document.getElementById('power')
   };
   powerKey.init = function(){
      powerKey.element.onclick = function(){
        powerKey.clicked();
      };
   };
   powerKey.clicked = function(){
     sandbox.power();
   };
   return powerKey;
 }

 function EnterKey(sb){
   var enterKey = {
     sandbox: sb,
     element: document.getElementById('enter')
   };
   enterKey.init = function(){
      enterKey.element.onclick = function(){
        enterKey.clicked();
      };
   };
   enterKey.clicked = function(){
     sandbox.enter();
   };
   return enterKey;
 }
