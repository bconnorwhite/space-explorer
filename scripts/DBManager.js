/* DBManager.js
 * -Handles AJAX
 */

function DBManager(){
  var dbManager = {
    getJSON: function(filename, callback, params){
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.onreadystatechange = function(){
        if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
          callback(JSON.parse(xmlhttp.responseText));
        }
      };
      xmlhttp.open("POST", filename, true);
      xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      console.log(filename + "?q=" + params);
      xmlhttp.send(params);
    }
  };
  return dbManager;
}
