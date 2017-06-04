/* Game.js
 *
 */

var windowFirstRow = 1;
var windowLastRow = 29;
var windowFirstCol = 1;
var windowLastCol = 78;
var sideBarLastCol = 19;
var viewFirstCol = 22;
var viewLastRow = 26;
var titleRow = 1;
var creditRow = 28;
var statusRow = 3;

function Game(sb) {
  var game = {
    sandbox: sb,
    spiceXLogo: [
        "      .``                                                                       ",
        "      --::::--.``                                                               ",
        "         ``.-:::/::-..`                                                         ",
        "               ``.-:://::-.``                                                   ",
        "                    `.-::////:-.``                `.:::::::::::                 ",
        "                          `.-:////::-.`         .:sdddddddhyo:                  ",
        "                            ``.:://///:-.`   `-oysdddddddd/.                    ",
        "                                 `.-://////:-../oyhdddds/.                      ",
        "                                    `-://////::-.-/s+-`                         ",
        "                                     `-:--:///////:-.`                          ",
        "                                  ./shhyo:.-:///////:-`                         ",
        "                                .:shhhhdddhs.`.-////////:.`                     ",
        "                            `:ohhhddddhhs:.    `-:///////:-`                    ",
        "                         `-oyhhdddddhs/.         `.:////////:.                  ",
        "                        .osyyyyyyys/.`              .-::::::::.                 ",
        "                         `                                                      ",
    ],
    spaceExplorerLogo: [
        "  ___                         ____            _",
        " / _ \\                       |  __|          | |",
        " \\ \\\\_\\_ __   __ _  ___ ___  | |____  ___ __ | | ___  _ __ ___ _ __",
        "__\\ \\ | '_ \\ / _` |/ __/ _ \\ |  __\\ \\/ / ‘_ \\| |/ _ \\| ‘__/ _ \\ ‘__/",
        "\\ \\\\ \\| |_) | (_| | (_|  __/ | |__|&gt;  &lt;| |_) | | (_) | | |  __/ |",
        " \\___/| .__/ \\__,_|\\___\\___| |____/_/\\_\\ .__/|_|\\___/|_|  \\___|_|",
        "      | |                              | |",
        "      |_|                              |_|",
    ],
    windowBorder: [
        "================================================================================",
        "|                                                                              |",
        "|                                                                              |",
        "|                                                                              |",
        "|                                                                              |",
        "|                                                                              |",
        "|                                                                              |",
        "|                                                                              |",
        "|                                                                              |",
        "|                                                                              |",
        "|                                                                              |",
        "|                                                                              |",
        "|                                                                              |",
        "|                                                                              |",
        "|                                                                              |",
        "|                                                                              |",
        "|                                                                              |",
        "|                                                                              |",
        "|                                                                              |",
        "|                                                                              |",
        "|                                                                              |",
        "|                                                                              |",
        "|                                                                              |",
        "|                                                                              |",
        "|                                                                              |",
        "|                                                                              |",
        "|                                                                              |",
        "|                                                                              |",
        "|                                                                              |",
        "|______________________________________________________________________________|"
    ],
    location: Location(),
    missionControl: MissionControl(),
    observatory: Observatory(),
    launcher: Launcher(),
    factory: Factory(),
    mine: Mine(),
    colony: Colony(),
    init: function(){ //Register sandbox functions
      game.sandbox.register('getExplorer', game.getExplorer);
      game.sandbox.register('power', game.run);
      game.sandbox.register('loaded', game.loaded);
      game.sandbox.requestExplorer();
    },
    getExplorer: function(exp){ //Sets explorer to 'exp'
      console.log("GAME: Explorer: ");
      console.log(exp);
      game.explorer = exp;
    },
    run: function(){
      console.log("GAME: Running game");
      game.loadGame();
    },
    loadGame: function(){ //Displays SpiceX Logo and registers 'loaded' and 'escape'
      game.sandbox.setLoad(game.spiceXLogo);
    },
    loaded: function(){ //Function to be called when game is loaded (after SpiceX Logo)
      game.switchTo("location");
      game.sandbox.register('escape', game.escape);//Register escape, which returns to location screen
    },
    escape: function(){
      game.switchTo('location');
    },
    initLocation: function(){
      game.location.init(game);
    },
    initMissionControl: function(){
      game.missionControl.init(game);
    },
    initObservatory: function(){
      game.observatory.init(game);
    },
    initLauncher: function(){
      game.launcher.init(game);
    },
    initFactory: function(){
      game.factory.init(game);
    },
    initMine: function(){
      game.mine.init(game);
    },
    initColony: function(){
      game.colony.init(game);
    },
    clear: function(row, startCol, endCol){//Clears a row (fills with spaces)
      game.sandbox.repeatHorizontal(" ", row, startCol, endCol);
    },
    displaySideBar: function(){ //Display a blank sidebar on the screen
      game.sandbox.repeatVerticle("||", windowFirstRow, windowLastRow, sideBarLastCol + 1);
    },
    drawSideBarBar: function(char, row){
      game.sandbox.repeatHorizontal(char, row, windowFirstCol, sideBarLastCol);
    },
    setTitle: function(title){
      game.sandbox.write(title, titleRow, windowFirstCol + 1);
    },
    displayTitleBox: function(title){
      game.drawSideBarBar("_", titleRow + 1);
      game.setTitle(title);
    },
    setStatus: function(image){//Set location status
      for(var r = 0; r < image.length; r++)
          game.sandbox.write(image[r], statusRow + r, windowFirstCol + 1);
    },
    displayStatus: function(image){//Display location staus
      game.statusLastRow = image.length + statusRow;
      game.setStatus(image);
      game.drawSideBarBar("_", game.statusLastRow);
    },
    displaySideBarIcon: function(image, row, height){ //Display an icon on the sidebar
      game.sandbox.writeImage(image, row, windowFirstCol, height, sideBarLastCol-windowFirstCol, "center");
      game.sandbox.repeatHorizontal("_", row+height, windowFirstCol, sideBarLastCol);
    },
    displaySideBarButton: function(button, startRow){ //Buttons have [id, title]
      game.sandbox.write(button.title, startRow+1, windowFirstCol+1, button.class);
      game.sandbox.repeatHorizontal("_", startRow+2, windowFirstCol, sideBarLastCol);
    },
    displaySideBarLabel: function(string, row){
      game.sandbox.write(string, row+1, windowFirstCol+1);
      game.sandbox.repeatHorizontal("_", row+2, windowFirstCol, sideBarLastCol);
    },
    displayUpgradeBox: function(blueprint){
      //TODO: display upgrade box  (use blueprint.name), format in scratchpad.txt
    },
    displayUpgrade: function(blueprint){
      game.displaySideBarLabel("STORE", 11);
      game.displayUpgradeBox(blueprint);
      //TODO: display upgrade image (use blueprint.image), format in scratchpad.txt
    },
    displayBackButton: function(){
      //TODO: display back button, get format in scratchpad.txt for startRow and startCol
      game.sandbox.write("> Back", 26, windowFirstCol+1, "back");
      //TODO: link onclick of back button to switchTo("location");
      game.sandbox.setClicks("back", game.switchTo, ["location"]);
    },
    displayCreditBox: function(credits){
      game.drawSideBarBar("_", creditRow - 1);
      game.setCredits(credits);
    },
    setCredits: function(credits){
      game.sandbox.write("C: $" + credits, creditRow, windowFirstCol + 1);
    },
    displayBottomBar: function(){ //Display a blank bottom bar on the screen
      game.sandbox.repeatHorizontal("-", viewLastRow + 1, viewFirstCol, windowLastCol);
    },
    displayView: function(view, alignment){ //Displays a view window on the screen, with background image 'view'
      if(alignment === undefined)
        alignment = "top-left";
      game.sandbox.writeImage(view, windowFirstRow, viewFirstCol, viewLastRow-windowFirstRow, windowLastCol-viewFirstCol, alignment);
      game.displayViewCorners();
    },
    displayViewLine: function(string, row, col, theClass, float){
      if(float == "right"){
        game.sandbox.write(string, row, windowLastCol-col, theClass);
      } else {
        game.sandbox.write(string, row, col+viewFirstCol, theClass);
      }
    },
    clearViewRow: function(row){//Clears a view row
      game.clear(row, viewFirstCol, windowLastCol);
    },
    displayViewCorners: function(){
      game.sandbox.write("/", windowFirstRow, viewFirstCol);
      game.sandbox.write("\\", windowFirstRow, windowLastCol);
      game.sandbox.write("\\", viewLastRow, viewFirstCol);
      game.sandbox.write("/", viewLastRow, windowLastCol);
    },
    displayViewIcons: function(icons){ //For icons on location view
      for(var i=0; i<icons.length && i < 6; i++)
        game.sandbox.writeImage(icons[i].image, 13+(7*(Math.floor(i/3))), (1+viewFirstCol+(19*(i%3))), 6, 18, icons[i].align, icons[i].class);
    },
    displayViewRightArrow: function(){
      game.sandbox.write("\\", 13,windowLastCol - 2,"view-right-arrow");
      game.sandbox.write("\\", 14,windowLastCol - 1,"view-right-arrow");
      game.sandbox.write("/", 15,windowLastCol - 1,"view-right-arrow");
      game.sandbox.write("/", 16,windowLastCol - 2,"view-right-arrow");
    },
    displayViewLeftArrow: function(){
      game.sandbox.write("/", 13,viewFirstCol + 2,"view-left-arrow");
      game.sandbox.write("/", 14,viewFirstCol + 1,"view-left-arrow");
      game.sandbox.write("\\", 15,viewFirstCol + 1,"view-left-arrow");
      game.sandbox.write("\\", 16,viewFirstCol + 2,"view-left-arrow");
    },
    setClicks: function(theClass, context){
      game.sandbox.setClicks(theClass, game.switchTo, [context]);
    },
    switchTo: function(context){ //Switch to a new context
      console.log("GAME: Switching to " + context);
      game.sandbox.writeImage(game.windowBorder, 0, 0, windowLastRow+1, windowLastCol+1, "top-left");
      switch(context){
        case "location":
          game.initLocation();
          break;
        case "mission-control":
          game.initMissionControl();
          break;
        case "observatory":
          game.initObservatory();
          break;
        case "launcher":
          game.initLauncher();
          break;
        case "colony":
          game.initColony();
          break;
        case "mine":
          game.initMine();
          break;
        case "factory":
          game.initFactory();
          break;
      }
    }
  };
  return game;
}
