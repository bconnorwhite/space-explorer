/* Sandbox.js
 *
 */

function Sandbox() {
    var sandbox = {
        channels: {},
        register: function(channel, fn){
          sandbox.channels[channel] = fn;
        },
        escape: function() {
            alert("ESC");
        },
        dim: function() {
            sandbox.channels.dim();
        },
        bright: function() {
            sandbox.channels.brighten();
        },
        power: function() {
            sandbox.channels.power();
        },
        enter: function() {
            alert("ENTER");
        }
    };
    return sandbox;
}
