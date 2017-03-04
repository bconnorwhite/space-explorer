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
        load: ["                                                                               ",
            "                                                                                ",
            "                                                                                ",
            "                                                                                ",
            "                                                                                ",
            "                                                                                ",
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
            "                                                                                ",
            "                                                                                ",
            "                                                                                ",
            "                                                                                ",
            "                                                                                ",
            "                                                                                ",
            "                                                                                ",
            "                                                                                "
        ],
        windowBorder: ["================================================================================",
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
        gamebox: Gamebox(),
        location: Location(),
        missionControl: MissionControl(),
        observatory: Observatory(),
        launcher: Launcher(),
        factory: Factory(),
        mine: Mine(),
        colony: Colony(),
        init: function(exp) {
            //Load screen
            game.sandbox.setLoad(game.load);
            game.sandbox.register('loaded', game.loaded);
            //Initialize gamebox
            game.gamebox.init(exp);
            //Register functions with gamebox
            game.gamebox.register('displaySideBar', game.displaySideBar);
            game.gamebox.register('displaySideBarIcon', game.displaySideBarIcon);
            game.gamebox.register('displayBottomBar', game.displayBottomBar);
            game.gamebox.register('displayView', game.displayView);
            game.gamebox.register('displayViewIcons', game.displayViewIcons);
            game.gamebox.register('displayTitleBox', game.displayTitleBox);
            game.gamebox.register('displayCreditBox', game.displayCreditBox);
            game.gamebox.register('setCredits', game.setCredits);
            game.gamebox.register('setTitle', game.setTitle);
            game.gamebox.register('displayStatus', game.displayStatus);
            game.gamebox.register('setStatus', game.setStatus);
            game.gamebox.register('displaySideBarButton', game.displaySideBarButton);
            game.gamebox.register('displaySideBarLabel', game.displaySideBarLabel);
            game.gamebox.register('switchTo', game.switchTo);
        },
        loaded: function(){
            game.switchTo("location");
        },
        initLocation: function(){
            game.location.init(game.gamebox);
        },
        initMissionControl: function(){
            game.missionControl.init(game.gamebox);
        },
        initObservatory: function(){
            game.observatory.init(game.gamebox);
        },
        initLauncher: function(){
            game.launcher.init(game.gamebox);
        },
        initFactory: function(){
            game.factory.init(game.gamebox);
        },
        initMine: function(){
            game.mine.init(game.gamebox);
        },
        initColony: function(){
            game.colony.init(game.gamebox);
        },
        displaySideBar: function() {
            game.sandbox.repeatVerticle("||", windowFirstRow, windowLastRow, sideBarLastCol + 1);
        },
        displaySideBarIcon: function(image, row, height){
            game.sandbox.writeImage(image, row, windowFirstCol, height, sideBarLastCol-windowFirstCol, "center");
            game.sandbox.repeatHorizontal("_", row+height, windowFirstCol, sideBarLastCol);
        },
        displayBottomBar: function() {
            game.sandbox.repeatHorizontal("-", viewLastRow + 1, viewFirstCol, windowLastCol);
        },
        displayView: function(view) {
            game.sandbox.writeImage(view, windowFirstRow, viewFirstCol, viewLastRow-windowFirstRow, windowLastCol-viewFirstCol, "top-left");
            game.displayViewCorners();
        },
        displayViewCorners: function() {
            game.sandbox.write("/", windowFirstRow, viewFirstCol);
            game.sandbox.write("\\", windowFirstRow, windowLastCol);
            game.sandbox.write("\\", viewLastRow, viewFirstCol);
            game.sandbox.write("/", viewLastRow, windowLastCol);
        },
        displayViewIcons: function(icons){
            for(var i=0; i<icons.length && i < 6; i++)
                game.sandbox.writeImage(icons[i].image, 13+(7*(Math.floor(i/3))), (1+viewFirstCol+(19*(i%3))), 6, 18, icons[i].align, icons[i].class);
        },
        displayTitleBox: function(title) {
            game.drawSideBarBar("_", titleRow + 1);
            game.setTitle(title);
        },
        setTitle: function(title) {
            game.sandbox.write(title, titleRow, windowFirstCol + 1, windowLastCol);
        },
        displayCreditBox: function(credits) {
            game.drawSideBarBar("_", creditRow - 1);
            game.setCredits(credits);
        },
        setCredits: function(credits) {
            game.sandbox.write("C: $" + credits, creditRow, windowFirstCol + 1, windowLastCol);
        },
        displayStatus: function(image) {
            game.statusLastRow = image.length + statusRow;
            game.setStatus(image);
            game.drawSideBarBar("_", game.statusLastRow);
        },
        setStatus: function(image) {
            for (var r = 0; r < image.length; r++) {
                game.sandbox.write(image[r], statusRow + r, windowFirstCol + 1, sideBarLastCol);
            }
        },
        drawSideBarBar: function(char, row) {
            game.sandbox.repeatHorizontal(char, row, windowFirstCol, sideBarLastCol);
        },
        displaySideBarButton: function(button, startRow) { //Buttons have [id, title]
            game.sandbox.write(button.title, startRow+1, windowFirstCol+1, button.class);
            game.sandbox.repeatHorizontal("_", startRow+2, windowFirstCol, sideBarLastCol);
        },
        displaySideBarLabel: function(string, row){
            game.sandbox.write(string, row+1, windowFirstCol+1);
            game.sandbox.repeatHorizontal("_", row+2, windowFirstCol, sideBarLastCol);
        },
        switchTo: function(string){
          game.sandbox.writeImage(game.windowBorder, 0, 0, windowLastRow+1, windowLastCol+1, "top-left");
          switch(string){
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
