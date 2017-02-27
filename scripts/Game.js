/* Game.js
 *
 */

const windowFirstRow = 1;
const windowLastRow = 29;
const windowFirstCol = 1;
const windowLastCol = 78;
const sideBarLastCol = 19;
const viewFirstRow = 22;
const viewBottomRow = 26;
const titleRow = 1;
const creditRow = 28;

function Game(sb) {
    var game = {
        sandbox: sb,
        load:     [ "                                                                               ",
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
                    "                                                                                "],
      windowBorder:[ "================================================================================",
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
                     "|______________________________________________________________________________|" ],
        gamebox: Gamebox(),
        init: function(exp){
          //Initialize gamebox
          game.gamebox.init(exp);
          //Register functions with gamebox
          game.gamebox.register('displaySideBar', game.displaySideBar);
          game.gamebox.register('displayBottomBar', game.displayBottomBar);
          game.gamebox.register('displayView', game.displayView);
          game.gamebox.register('displayTitleBox', game.displayTitleBox);
          game.gamebox.register('displayCreditBox', game.displayCreditBox);
          game.gamebox.register('setCredits', game.setCredits);
          game.gamebox.register('setTitle', game.setTitle);
          //Load screen
          game.sandbox.setLoad(game.load);
          //Init location
          game.location = Location(game.gamebox);
          game.location.init();
        },
        displaySideBar: function(){
          game.sandbox.repeatVerticle("||", windowFirstRow, windowLastRow, sideBarLastCol+1);
        },
        displayBottomBar: function(){
          game.sandbox.repeatHorizontal("-", viewBottomRow+1, viewFirstRow, windowLastCol);
        },
        displayView: function(view){
          for(var r=1; r>viewBottomRow; r++){
            game.sandbox.write(view[r-1], r, viewFirstCol);
          }
        },
        displayTitleBox: function(title){
          game.sandbox.repeatHorizontal("_", titleRow+1, windowFirstRow, sideBarLastCol);
          game.setTitle(title);
        },
        displayCreditBox: function(){
          game.sandbox.repeatHorizontal("_", creditRow-1, windowFirstCol, sideBarLastCol);
        },
        setCredits: function(credits){
          game.sandbox.write("C: $" + credits, creditRow, windowFirstCol+1);
        },
        setTitle: function(title){
          game.sandbox.write(title, titleRow, windowFirstCol+1);
        }
    };
    return game;
}
