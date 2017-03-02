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
            screen.sandbox.register('writeImage', screen.writeImage);
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
        write: function(string, row, startCol, theClass){
          var oldString = screen.elements[row].innerHTML;
          var left = screen.substringIgnoreTags(oldString, 0, startCol);
          var right = screen.substringIgnoreTags(oldString, startCol + screen.lengthIgnoreTags(string), screen.lengthIgnoreTags(oldString));
          if(theClass !== undefined)
            string = "<a class=" + theClass + ">" + string + "</a>";
          screen.elements[row].innerHTML = screen.substringIgnoreTags(left + string + right, 0, screen.lengthIgnoreTags(oldString));//Limit length to same as original
        },
        writeImage: function(image, row, col, height, width, align, theClass){
          var startRow, startCol, imageWidth=0;
          //Get width of Image
          for(var i=0; i<image.length; i++){
            if(screen.lengthIgnoreTags(image[i]) > imageWidth){
              imageWidth = screen.lengthIgnoreTags(image[i]);
            }
          }
          //Choose start row & col based on alignment
          switch(align){
            case "top-left":
              startRow = row;
              startCol = col;
              break;
            case "center":
              startRow = row + Math.round((height-image.length)/2);
              startCol = col + Math.round((width-imageWidth)/2);
              break;
            case "lower-left":
              startRow = row + height - image.length;
              startCol = col;
              break;
            default:
              startRow = row;
              startCol = col;
              break;
          }
          //Write image
          for(var r=0; r<image.length && r<=(row+height-startRow); r++){
            screen.write(image[r], startRow+r, startCol, theClass);
          }
        },
        substringIgnoreTags: function(string, a, b){//Returns substring of string from a to b, ignoring tags
          var start = screen.indexIgnoreTags(string, a);
          var end = screen.indexIgnoreTags(string, b);
          return string.substring(start,end);
        },
        lengthIgnoreTags: function(string){//Returns number of characters (ignoring tags)
          return screen.indexIgnoreTags(string, string.length);
        },
        indexIgnoreTags: function(string, letters){//Returns index of 'letters'-ith char, ignoring tags
          var tag = false;
          for(var index=0; index<string.length; index++){
            if(letters === 0)
              return index;
            else if(string.charAt(index) == '<')//Open tag
              tag = true;
            else if(tag && string.charAt(index) == '>')//End tag
              tag = false;
            else if(!tag){
              if(string.substring(index, index+4) == '&lt;' || string.substring(index, index+4) == '&gt;'){
                letters-=1;
                index+=3;
              } else{
                letters-=1;
              }
            }
          }
          return string.length - letters;//If letters = string.length, returns # of chars
        }
    };
    return screen;
}
