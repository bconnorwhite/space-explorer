/* Screen.js
 *
 */

const WIDTH = 80;

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
        write: function(row, col, string){
          var old = screen.elements[row].innerHTML;
          var left = (old.substring(0,col) + string).substring(0,WIDTH);
          var right = old.substring(left.length, 82);
          screen.elements[row].innerHTML = left + right;
        },
        print: function(string, line){
            screen.write(line, 2, string);
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
        }
    };
    return screen;
}
