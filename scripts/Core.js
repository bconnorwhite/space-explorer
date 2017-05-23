/* Core.js
 * -Uses DBManager to interact with database
 * -Initializes Sandbox, passing DBManager
 * -Initializes modules, inside Sandbox
 */

(function(){
  //Initialize DBManager
  var dbManager = DBManager();

  //Initialize Sandbox
  var sandbox = Sandbox(dbManager);
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
  //Initialize Game
  var game = Game(sandbox);
  game.init();

})();
