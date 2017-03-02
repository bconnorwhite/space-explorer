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
        write: function(string, row, startCol, endCol) {
          sandbox.channels.write(string, row, startCol, endCol);
        },
        writeImage: function(image, row, col, height, width, align){
          sandbox.channels.writeImage(image, row, col, height, width, align);
        },
        print: function(string, line){
          sandbox.channels.print(string, line);
        },
        runSpaceExplorer: function(){
          sandbox.channels.runSpaceExplorer();
        },
        setLoad: function(image){
          sandbox.channels.setLoad(image);
        },
        repeatVerticle: function(string, startRow, endRow, col){
          sandbox.channels.repeatVerticle(string, startRow, endRow, col);
        },
        repeatHorizontal: function(string, row, startCol, endCol){
          sandbox.channels.repeatHorizontal(string, row, startCol, endCol);
        }
    };
    return sandbox;
}
