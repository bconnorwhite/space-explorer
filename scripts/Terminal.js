/* Terminal.js
 *
 */

function Terminal(sb) {
    var terminal = {
        sandbox: sb,
        elements: document.getElementsByClassName("screen"),
        line: 1,
        init: function(){
          terminal.write(terminal.getLogin());
          terminal.write(terminal.getUser());
        },
        getLogin: function(){
          var d = new Date();
            var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
            var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            return "Last login: " + days[d.getDay()] + " " + months[d.getMonth()] + " " + d.getDate() + " " + (d.getYear()+1900) + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + " on ttys000";
        },
        getUser: function(){
          return "Elons-MacBook-Air:~ Elon$ ";
        }
    };
    return terminal;
}
