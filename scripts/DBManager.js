/* DBManager.js
 * -Handles AJAX
 */

function DBManager(){
  var dbManager = {
    getJSON: function(filename, callback){
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.onreadystatechange = function(){
        if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
          callback(JSON.parse(xmlhttp.responseText));
        }
      };
      xmlhttp.open("GET", filename, true);
      xmlhttp.send();
    },
    saveJSON: function(filename, json){
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.onreadystatechange = function(){
        if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
          return 0;
        }
      };
      xmlhttp.open("GET", filename, true);
      xmlhttp.send(JSON.strigify(json));
    }
  };
  return dbManager;
}
