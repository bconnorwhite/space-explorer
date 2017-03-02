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
        init: function(exp) {
            //Initialize gamebox
            game.gamebox.init(exp);
            //Register functions with gamebox
            game.gamebox.register('displaySideBar', game.displaySideBar);
            game.gamebox.register('displayBottomBar', game.displayBottomBar);
            game.gamebox.register('displayView', game.displayView);
            game.gamebox.register('displayViewIcons', game.displayViewIcons);
            game.gamebox.register('displayTitleBox', game.displayTitleBox);
            game.gamebox.register('displayCreditBox', game.displayCreditBox);
            game.gamebox.register('setCredits', game.setCredits);
            game.gamebox.register('setTitle', game.setTitle);
            game.gamebox.register('displayStatus', game.displayStatus);
            game.gamebox.register('setStatus', game.setStatus);
            game.gamebox.register('displaySideBarButtons', game.displaySideBarButtons);
            //Load screen
            game.sandbox.setLoad(game.load);
            //Init location
            game.location.init(game.gamebox);
        },
        displaySideBar: function() {
            game.sandbox.repeatVerticle("||", windowFirstRow, windowLastRow, sideBarLastCol + 1);
        },
        displayBottomBar: function() {
            game.sandbox.repeatHorizontal("-", viewLastRow + 1, viewFirstCol, windowLastCol);
        },
        displayView: function(view) {
            for (var r = 1; r <= viewLastRow; r++)
                if (view[r - 1] !== undefined)
                    game.sandbox.write(view[r - 1], r, viewFirstCol);
            game.displayViewCorners();
        },
        displayViewCorners: function() {
            game.sandbox.write("/", windowFirstRow, viewFirstCol);
            game.sandbox.write("\\", windowFirstRow, windowLastCol);
            game.sandbox.write("\\", viewLastRow, viewFirstCol);
            game.sandbox.write("/", viewLastRow, windowLastCol);
        },
        displayViewIcons: function(icons){
            for(var i=0; i<icons.length && i < 6; i++){
                game.sandbox.writeImage(icons[i].image, 13+(7*(Math.floor(i/3))), (1+viewFirstCol+(19*(i%3))), 6, 18, icons[i].align);
            }
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
        displaySideBarButtons: function(buttons, startRow) { //Buttons have [id, title]
            for (var b = 0; b < buttons.length; b++){
                game.sandbox.write("<a id='" + buttons[b].id + "'>" + buttons[b].title + "</a>", startRow+(b * 3)+1, windowFirstCol + 1);
                game.sandbox.repeatHorizontal("_", startRow+(b*3)+2, windowFirstCol, sideBarLastCol);
            }
        }
    };
    return game;
}
