/* Sandbox.js
 *
 */

function Sandbox(dbm) {
  var sandbox = {
    channels: {},
    dbManager: dbm,
    register: function(channel, fn){//Register a function with a channel
      if(sandbox.channels[channel] === undefined)
        sandbox.channels[channel] = [];
      sandbox.channels[channel].push(fn);
    },
    broadcast: function(channel, params){//Call all functions registered with a channel
      if(sandbox.channels[channel]===undefined)
        console.error("SANDBOX: Missing channel");
      else
        for(var f=0; f<sandbox.channels[channel].length; f++)
          sandbox.channels[channel][f].apply(this, params);
    },
    runSpaceExplorer: function(){
      sandbox.broadcast('runSpaceExplorer');
    },
    requestExplorer: function(){//Requests explorer from GetExplorer.php, setting callback function to sandbox.getExplorer
      sandbox.dbManager.getJSON("GetExplorer.php", sandbox.getExplorer);
    },
    getExplorer: function(exp){//Receives explorer from GetExplorer.php
      sandbox.broadcast('getExplorer', [exp]);
    },
    escape: function() {
      sandbox.broadcast('escape');
    },
    dim: function() {
      sandbox.broadcast('dim');
    },
    brighten: function() {
      sandbox.broadcast('brighten');
    },
    power: function() {
      sandbox.broadcast('power');
    },
    loaded: function(){
      sandbox.broadcast('loaded');
    },
    enter: function() {
      //No use for enter right now, might use later
    },
    write: function(string, row, startCol, theClass) {
      sandbox.broadcast('write', [string, row, startCol, theClass]);
    },
    setClicks: function(theClass, func, params){
      sandbox.broadcast('setClicks', [theClass, func, params]);
    },
    writeImage: function(image, row, col, height, width, align, theClass){
      sandbox.broadcast('writeImage', [image, row, col, height, width, align, theClass]);
    },
    setLoad: function(image){
      sandbox.broadcast('setLoad', [image]);
    },
    repeatVerticle: function(string, startRow, endRow, col){
      sandbox.broadcast('repeatVerticle', [string, startRow, endRow, col]);
    },
    repeatHorizontal: function(string, row, startCol, endCol){
      sandbox.broadcast('repeatHorizontal', [string, row, startCol, endCol]);
    }
  };
  return sandbox;
}
