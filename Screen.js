/* Screen.js
 *
 */

function Screen(sb) {
    var screen = {
        sandbox: sb,
        elements: document.getElementsByClassName('screen'),
        brightness: 15,
        pow: false,
        init: function() {
            screen.sandbox.register('power', screen.power);
            screen.sandbox.register('brighten', screen.brighten);
            screen.sandbox.register('dim', screen.dim);
        },
        on: function() { //Turns screen on
            screen.pow = true;
            screen.updateColor(screen.getColor());
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
        }
    };
    return screen;
}
