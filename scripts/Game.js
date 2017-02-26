/* Game.js
 *
 */

function Game(sb) {
    var game = {
        sandbox: sb,
        load:["                                                                               ",
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
        gamebox: Gamebox(),
        init: function(exp){
          gamebox.init(exp);
          gamebox.register('updateScreen', game.updateScreen);
          game.sandbox.setLoad(game.load);
        },
        updateScreen: function(){
          //game.sandbox.
        }
    };
    return game;
}
