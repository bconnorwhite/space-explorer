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
        },
        write: function(row, col, string) {
          sandbox.channels.write(row, col, string);
        },
        print: function(string, line){
          sandbox.channels.print(string, line);
        },
        runSpaceExplorer: function(){
          sandbox.channels.runSpaceExplorer();
        }
    };
    return sandbox;
}
