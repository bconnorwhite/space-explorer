/* Core.js
 * -Uses Base.js to initialize explorer
 * -Initializes Screen
 * -Starts modules, passing screen
 * -Uses Base.js to manage window
 */

function initExplorer(exp){
  explorer = exp;
}

//(function(){
  //Initialize Explorer
  var explorer;
  ajaxGetJSON("GetExplorer.php", initExplorer);

  //Initialize Window
  var sandbox = Sandbox();

  //Initialize Keyboard
  var keyboard = Keyboard(sandbox);
  keyboard.init();


//})();
