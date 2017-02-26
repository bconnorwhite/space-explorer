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
        init: function(exp){
          game.explorer = exp;
          game.sandbox.setLoad(game.load);
        }
    };
    return game;
}
