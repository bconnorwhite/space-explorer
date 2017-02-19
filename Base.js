/* Base.js
 * -Handles AJAX
 */

function ajaxGetJSON(filename, callback){
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function(){
    if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
      callback(JSON.parse(xmlhttp.responseText));
    }
  };
  xmlhttp.open("GET", filename, true);
  xmlhttp.send();
}
