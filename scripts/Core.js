/* Core.js
 * -Uses Base.js to initialize explorer
 * -Initializes Screen
 * -Starts modules, passing screen
 * -Uses Base.js to manage window
 */

//(function(){
  //Initialize Sandbox
  var sandbox = Sandbox();
  sandbox.register("runSpaceExplorer", initSpaceExplorer);

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
  //var terminal = Terminal(sandbox);
  //terminal.init();
  //Initialize Space explorer
  initSpaceExplorer();

  function initSpaceExplorer(){
    //Initialize Game
    var game = Game(sandbox);

    //Initialize Explorer
    ajaxGetJSON("GetExplorer.php", initExplorer);
    function initExplorer(explorer){
      game.init(explorer);
    }
  }

//})();
