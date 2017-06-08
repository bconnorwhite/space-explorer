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
var viewIconStartRow = 13;
var iconHeight = 6;
var iconWidth = 18;

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
        "===============================================================================",
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
    colony: Colony(),
    mine: Mine(),
    factory: Factory(),
    observatory: Observatory(),
    missionControl: MissionControl(),
    launcher: Launcher(),
    init: function(){ //Register sandbox functions
      game.sandbox.setLoad(game.spiceXLogo);
      game.sandbox.register('getExplorer', game.getExplorer);
      game.sandbox.register('on', game.register);
      game.sandbox.register('off', game.deregister);
      game.sandbox.requestExplorer();
    },
    getExplorer: function(exp){ //Sets explorer to 'exp'
      console.log("GAME: Explorer: ");
      console.log(exp);
      game.explorer = exp;
      game.initBuildings();//Maybe use observer pattern here?
      game.sandbox.loaded();
      game.onLoad();
    },
    initBuildings: function(){
      game.location.init(game);
      game.colony.init(game);
      game.mine.init(game);
      game.factory.init(game);
      game.observatory.init(game);
      game.missionControl.init(game);
      game.launcher.init(game);
    },
    onLoad: function(){ //Function to be called when game is loaded (after SpiceX Logo)
      game.switchTo("location");
    },
    register: function(){
      game.sandbox.register('escape', game.escape);
    },
    deregister: function(){
      game.sandbox.deregister('escape', game.escape);
    },
    escape: function(){
      game.switchTo('location');
    },
    runLocation: function(){
      game.location.run();
    },
    runMissionControl: function(){
      game.missionControl.run();
    },
    runObservatory: function(){
      game.observatory.run();
    },
    runLauncher: function(){
      game.launcher.run();
    },
    runFactory: function(){
      game.factory.run();
    },
    runMine: function(){
      game.mine.run();
    },
    runColony: function(){
      game.colony.run();
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
    setTitle: function(title, subtitle){
      game.sandbox.write(title, titleRow, windowFirstCol+1);
      if(subtitle !== undefined)
        game.sandbox.write(subtitle, titleRow+1, windowFirstCol+1);
    },
    displayTitleBox: function(title, image, subtitle){
      var rows;
      if(subtitle === undefined)
        rows = 1;
      else
        rows = 2;
      game.drawSideBarBar("_", titleRow+rows);
      game.setTitle(title, subtitle);
      if(image !== undefined)
        game.displaySideBarIcon(image, titleRow+rows+1);
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
    displaySideBarIcon: function(image, row){ //Display an icon on the sidebar
      game.sandbox.writeImage(image, row, windowFirstCol, iconHeight, sideBarLastCol-windowFirstCol, "center");
      game.sandbox.repeatHorizontal("_", row+iconHeight, windowFirstCol, sideBarLastCol);
    },
    displaySideBarButton: function(title, row, theClass){
      game.displaySideBarText(title, row, theClass);
      game.sandbox.repeatHorizontal("_", row+2, windowFirstCol, sideBarLastCol);
    },
    displaySideBarLabel: function(string, row){
      game.displaySideBarText(string, row);
      game.sandbox.repeatHorizontal("_", row+2, windowFirstCol, sideBarLastCol);
    },
    displaySideBarText: function(string, row, theClass){
      if(string !== '')
        game.sandbox.write(string, row+1, windowFirstCol+1, theClass);
    },
    displayUpgradeDetails: function(blueprint){
      game.displaySideBarText(blueprint.name, 13);
      game.displaySideBarText("= $", 14); //TODO: add blueprint.cost
      game.displaySideBarButton("> Upgrade", 15, 'upgrade');
    },
    displayUpgrade: function(blueprint){
      game.displaySideBarLabel("STORE", 10);
      game.displayUpgradeDetails(blueprint);
      game.displaySideBarIcon(blueprint.image, 18);
    },
    displayBackButton: function(){
      game.sandbox.repeatHorizontal("_", 24, windowFirstCol, sideBarLastCol);
      game.sandbox.write("> Back", 26, windowFirstCol+1, "back");
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
      if(icons.length > 6)
        console.error("GAME: Too many view icons");
      else
        for(var i=0; i<icons.length; i++)
          game.sandbox.writeImage(icons[i].image, viewIconStartRow+((iconHeight+1)*(1-(i%2))), (viewFirstCol+1+((iconWidth+1)*(Math.floor(i/2)))), iconHeight, iconWidth, icons[i].align, icons[i].class);
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
          game.runLocation();
          break;
        case "mission-control":
          game.runMissionControl();
          break;
        case "observatory":
          game.runObservatory();
          break;
        case "launcher":
          game.runLauncher();
          break;
        case "colony":
          game.runColony();
          break;
        case "mine":
          game.runMine();
          break;
        case "factory":
          game.runFactory();
          break;
      }
    }
  };
  return game;
}
