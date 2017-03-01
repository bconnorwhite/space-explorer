/* Screen.js
 *
 */

 var WIDTH = 82;

function Screen(sb) {
    var screen = {
        sandbox: sb,
        elements: document.getElementsByClassName('screen'),
        save: [],
        brightness: 15,
        pow: false,
        load: false,
        loadImage: [],
        init: function() {
            screen.sandbox.register('power', screen.power);
            screen.sandbox.register('brighten', screen.brighten);
            screen.sandbox.register('dim', screen.dim);
            screen.sandbox.register('write', screen.write);
            screen.sandbox.register('print', screen.print);
            screen.sandbox.register('setLoad', screen.setLoad);
            screen.sandbox.register('repeatVerticle', screen.repeatVerticle);
            screen.sandbox.register('repeatHorizontal', screen.repeatHorizontal);
        },
        on: function() { //Turns screen on
            screen.pow = true;
            screen.updateColor(screen.getColor());
            if(screen.load === true){
                screen.tempFill(screen.loadImage);
                setTimeout(function(){screen.refresh();}, 2000);
            }
        },
        off: function() { //Turns screen off
            screen.updateColor('#000000');
            screen.pow = false;
        },
        getColor: function() {
            return "#" + (screen.brightness * 1118481).toString(16);
        },
        updateColor: function(color) {
            if (screen.pow)
                for (var i = 0; i < screen.elements.length; i++)
                    screen.elements[i].style.color = color;
        },
        power: function() { //Toggles power
            if (screen.pow)
                screen.off();
            else
                screen.on();
        },
        brighten: function() {
            if (screen.pow && screen.brightness < 15)
                screen.brightness++;
            screen.updateColor(screen.getColor());
        },
        dim: function() {
            if (screen.brightness > 1){
                screen.brightness--;
                screen.updateColor(screen.getColor());
            }
        },
        print: function(string, line){
            screen.write(string, line, 2);
        },
        setLoad: function(image){
            screen.load = true;
            screen.loadImage = image;
        },
        tempFill: function(image){
            for(var r=0; r<screen.elements.length; r++){
              screen.save[r] = screen.elements[r].innerHTML;
              screen.elements[r].innerHTML = image[r];
            }
        },
        refresh: function(){
            for(var r=0; r<screen.elements.length; r++){
              screen.elements[r].innerHTML = screen.save[r];
            }
        },
        repeatVerticle: function(string, startRow, endRow, col){
            for(var r=startRow; r<=endRow; r++){
              screen.write(string, r, col);
            }
        },
        repeatHorizontal: function(string, row, startCol, endCol){
            for(var c=startCol; c<=endCol; c++){
              screen.write(string, row, c);
            }
        },
        write: function(string, row, startCol){
          var oldString = screen.elements[row].innerHTML;
          var left = screen.substringIgnoreTags(oldString, 0, startCol);
          var right = screen.substringIgnoreTags(oldString, startCol + screen.lengthIgnoreTags(string), screen.lengthIgnoreTags(oldString));
          screen.elements[row].innerHTML = screen.substringIgnoreTags(left + string + right, 0, screen.lengthIgnoreTags(oldString));//Limit length to same as original
        },
        substringIgnoreTags: function(string, a, b){//Returns substring of string from a to b, ignoring tags
          var locA = 0;
          var tag = false;
          for(var letter=0; letter < a && locA < string.length; locA++){//Skip over 'a' characters
            if(string.charAt(locA) == '<')//start tag
              tag = true;
            else if(tag && string.charAt(locA) == '>')//end tag
              tag = false;
            else if(!tag)
              letter++;
          }
          var locB = locA;
          tag = false;
          for(var letter=a; letter < b && locB < string.length; locB++){//Count b-a characters
            if(string.charAt(locB) == '<')//start tag
              tag = true;
            else if(tag && string.charAt(locB) == '>')//end tag
              tag = false;
            else if(!tag)
              letter++;
          }
          return string.substring(locA,locB);
        },
        lengthIgnoreTags: function(string){//Returns number of characters (ignoring tags)
          var letter = 0;
          var tag = false;
          for(var loc=0; loc < string.length; loc++){
            if(string.charAt(loc) == '<')//start tag
              tag = true;
            else if(tag && string.charAt(loc) == '>')//end tag
              tag = false;
            else if(!tag)
              letter++;
          }
          return letter;
        },
    };
    return screen;
}
