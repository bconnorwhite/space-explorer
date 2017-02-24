/* Terminal.js
 *
 */

function Terminal(sb) {
    var terminal = {
        sandbox: sb,
        elements: document.getElementsByClassName('screen'),
        line: 1,
        init: function(){
          terminal.print(terminal.getLogin());
          terminal.print(terminal.getUser());
          //Later, this won't be triggered here...
          terminal.runSpaceExplorer();
        },
        getLogin: function(){
          var d = new Date();
            var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
            var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            return "Last login: " + days[d.getDay()] + " " + months[d.getMonth()] + " " + d.getDate() + " " + (d.getYear()+1900) + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + " on ttys000";
        },
        getUser: function(){
          return "Elons-MacBook-Air:~ Elon$ ";
        },
        print: function(string, line){
          terminal.sandbox.print(string, terminal.line);
          terminal.line++;
        },
        runSpaceExplorer: function(){
          terminal.sandbox.runSpaceExplorer();
        }
    };
    return terminal;
}
