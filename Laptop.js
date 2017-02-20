/* Laptop.js
 *
 */

function Laptop(sb) {
    var laptop = {
        sandbox: sb,
        opened: false,
        openerElement: document.getElementById("opener"),
        closerElement: document.getElementById("closer"),
        lidElement: document.getElementById("lid"),
        insideElements: document.getElementsByClassName("inside"),
        insideSwapElements: document.getElementsByClassName("inside-swap"),
        backlightElements: document.getElementsByClassName("backlight"),
        closedHinge: document.getElementById("closed-hinge"),
        openedHinge: document.getElementById("opened-hinge"),
        init: function() {
            laptop.close();
        },
        open: function() {
            laptop.opened = true;
            laptop.lidElement.style.visibility = 'visible';
            for (var i = 0; i < laptop.insideElements.length; i++)
                laptop.insideElements[i].style.visibility = 'visible';
            for (var j = 0; j < laptop.insideSwapElements.length; j++)
                laptop.insideSwapElements[j].style.display = 'initial';
            for (var k = 0; k < laptop.backlightElements.length; k++)
                laptop.backlightElements[k].style.display = 'none';
            laptop.closedHinge.style.display = 'none';
            laptop.openedHinge.style.display = 'initial';
            laptop.openerElement.style.cursor = 'default';
            laptop.openerElement.onclick = null;
            laptop.closerElement.onclick = function() {
                laptop.close();
            };
        },
        close: function() {
            laptop.opened = false;
            laptop.lidElement.style.visibility = 'hidden';
            for (var i = 0; i < laptop.insideElements.length; i++)
                laptop.insideElements[i].style.visibility = 'hidden';
            for (var j = 0; j < laptop.insideSwapElements.length; j++)
                laptop.insideSwapElements[j].style.display = 'none';
            for (var k = 0; k < laptop.backlightElements.length; k++)
                laptop.backlightElements[k].style.display = 'initial';
            laptop.closedHinge.style.display = 'initial';
            laptop.openedHinge.style.display = 'none';
            laptop.openerElement.style.cursor = 'pointer';
            laptop.openerElement.onclick = function() {
                laptop.open();
            };
            laptop.closerElement.onclick = null;
        }
    };
    return laptop;
}
