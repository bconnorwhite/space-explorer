/* Core.js
 * -Uses Base.js to initialize explorer
 * -Initializes Screen
 * -Starts modules, passing screen
 * -Uses Base.js to manage window
 */

//(function(){
  //Initialize Explorer
  var explorer;
  ajaxGetJSON("GetExplorer.php", initExplorer);
  function initExplorer(exp){
    explorer = exp;
  }
  
  //Initialize Sandbox
  var sandbox = Sandbox();

  //Initialize laptop
  var laptop = Laptop(sandbox);
  laptop.init();

  //Initialize Screen
  var screen = Screen(sandbox);
  screen.init();
  //Initialize Keyboard
  var keyboard = Keyboard(sandbox);
  keyboard.init();
  //Initialize Terminal
  var terminal = Terminal(sandbox);
  terminal.init();

//})();
