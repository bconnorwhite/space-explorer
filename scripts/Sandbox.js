/* Sandbox.js
 *
 */

function Sandbox(dbm) {
  var sandbox = {
    channels: {},
    dbManager: dbm,
    register: function(channel, fn){
      sandbox.channels[channel] = fn;
    },
    escape: function() {
      sandbox.channels.escape();
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
    loaded: function(){
      sandbox.channels.loaded();
    },
    enter: function() {
      alert("ENTER");
    },
    write: function(string, row, startCol, theClass) {
      sandbox.channels.write(string, row, startCol, theClass);
    },
    writeImage: function(image, row, col, height, width, align, theClass){
      sandbox.channels.writeImage(image, row, col, height, width, align, theClass);
    },
    print: function(string, line){
      sandbox.channels.print(string, line);
    },
    runSpaceExplorer: function(){
      sandbox.channels.runSpaceExplorer();
    },
    getExplorer: function(){
      sandbox.dbManager.getJSON("GetExplorer.php", sandbox.channels.getExplorer());
    },
    saveExplorer: function(exp){
      sandbox.dbManager.sendJSON('SaveExplorer.php', exp);
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
