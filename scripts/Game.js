/* Game.js
 *
 */

function Game(sb) {
    var game = {
        sandbox: sb,
        init: function(exp){
          game.explorer = exp;
        }
    };
    return game;
}
