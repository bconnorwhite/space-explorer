/* View.js
 *
 */

function View(sb){
    var view = {
        sandbox: sb,
        element: document.getElementById('view'),
        show: function(img){
            for(var r=0; r<img.length; r++){
              view.element.innerHTML = img[r] + "\n";
            }
        },
        expand: function(string, ratio){//Expands string by doubling each character, except stars.
            var expandedString = "";
            for(var c=0; c<string.length; c++){
                for(var n=0; n<ratio; n++){
                  expandedString += (string.charAt(c) + "");
                }
            }
            for(var r=0; r<ratio; r++){
                expandedString = expandedString+r
            }
        }
    };
    return view;
}
