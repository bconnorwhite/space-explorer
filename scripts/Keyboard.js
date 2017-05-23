/* Keyboard.js
 *
 */

function Keyboard(sb) {
    var keyboard = {
        sandbox: sb,
        escapeKey: EscapeKey(sb),
        dimKey: DimKey(sb),
        brightKey: BrightKey(sb),
        powerKey: PowerKey(sb),
        enterKey: EnterKey(sb),
        init: function() {
            keyboard.escapeKey.init();
            keyboard.dimKey.init();
            keyboard.brightKey.init();
            keyboard.powerKey.init();
            keyboard.enterKey.init();
        }
    };
    return keyboard;
}

function Key(sb) {
    var key = {
        sandbox: sb,
        element: null,
        init: function() {
            if (key.element !== null) {
                key.element.onclick = function() {
                    key.clicked();
                };
            }
        }
    };
    return key;
}

function EscapeKey(sb) {
    var escapeKey = Key(sb);
    escapeKey.element = document.getElementById('escape');
    escapeKey.clicked = function() {
        sb.escape();
    };
    return escapeKey;
}

function DimKey(sb) {
    var dimKey = Key(sb);
    dimKey.element = document.getElementById('dim');
    dimKey.clicked = function() {
        sb.dim();
    };
    return dimKey;
}

function BrightKey(sb) {
    var brightKey = Key(sb);
    brightKey.element = document.getElementById('bright');
    brightKey.clicked = function() {
        sb.bright();
    };
    return brightKey;
}

function PowerKey(sb) {
    var powerKey = Key(sb);
    powerKey.element = document.getElementById('power');
    powerKey.clicked = function() {
        sb.power();
    };
    return powerKey;
}

function EnterKey(sb) {
    var enterKey = Key(sb);
    enterKey.element = document.getElementById('enter');
    enterKey.clicked = function() {
        sb.enter();
    };
    return enterKey;
}
