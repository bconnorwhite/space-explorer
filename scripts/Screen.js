/* Screen.js
 *
 */
 var WIDTH = 80;
 var HEIGHT = 30;

function Screen(sb) {
  var screen = {
    sandbox: sb,
    elements: document.getElementsByClassName('screen'),
    save: [],
    brightness: 15,
    power: false,
    loaded: false,
    loadImage: [],
    init: function() {
      screen.sandbox.register('power', screen.togglePower);
      screen.sandbox.register('write', screen.write);
      screen.sandbox.register('writeImage', screen.writeImage);
      screen.sandbox.register('setLoad', screen.setLoad);
      screen.sandbox.register('repeatVerticle', screen.repeatVerticle);
      screen.sandbox.register('repeatHorizontal', screen.repeatHorizontal);
      screen.sandbox.register('setClicks', screen.setClicks);
      screen.sandbox.register('loaded', screen.onLoad);
      screen.sandbox.register('clear', screen.clear);
    },
    on: function() { //Turns screen on
      console.log("SCREEN: Power On");
      screen.power = true;
      screen.updateColor(screen.getColor());
      screen.tempFill(screen.loadImage);//Show loading screen
      if(screen.loaded){
        screen.onLoad();
      } else {
        screen.setTransition(5);
        console.log("SCREEN: Loading...");
      }
    },
    onLoad: function(){
      screen.setTransition(0.5);
      screen.loaded = true;
      if(screen.power){
        screen.refresh();
        screen.register();
      }
    },
    register: function(){
      screen.sandbox.register('brighten', screen.brighten);
      screen.sandbox.register('dim', screen.dim);
      screen.sandbox.on();
    },
    off: function() { //Turns screen off
      console.log("SCREEN: Power Off");
      screen.updateColor('#000000');
      screen.power = false;
      if(screen.loaded)
        screen.deregister();
      else
        screen.setTransition(0.5);
    },
    deregister: function(){//Deregister key functions when power is off.
      screen.sandbox.deregister('brighten', screen.brighten);
      screen.sandbox.deregister('dim', screen.dim);
      screen.sandbox.off();
    },
    setTransition: function(time){
      elements = document.getElementsByClassName('screen');
      for(var e=0; e<elements.length; e++)
        elements[e].style.transition = "color " + time + "s ease";
    },
    getColor: function() {
      return "#" + (screen.brightness * 1118481).toString(16);
    },
    updateColor: function(color) {
      if(screen.power)
        for (var i = 0; i < screen.elements.length; i++)
          screen.elements[i].style.color = color;
    },
    togglePower: function(){ //Toggles power
      if(screen.power)
        screen.off();
      else
        screen.on();
    },
    brighten: function() {
      if(screen.brightness < 15)
        screen.brightness++;
      screen.updateColor(screen.getColor());
    },
    dim: function() {
      if(screen.brightness > 1){
        screen.brightness--;
        screen.updateColor(screen.getColor());
      }
    },
    setLoad: function(image){
      console.log("SCREEN: Setting load");
      screen.load = true;
      screen.loadImage = image;
    },
    clear: function(){
      screen.repeatHorizontal(" ", 0, 0, WIDTH-2);//First row has one less column.
      for(var r=1; r<screen.elements.length; r++)
        screen.repeatHorizontal(" ", r, 0, WIDTH-1);
    },
    tempFill: function(image){
      for(var r=0; r<screen.elements.length; r++)
        screen.save[r] = screen.elements[r].innerHTML;
      screen.clear();
      screen.writeImage(image, 0, 0, HEIGHT-1, WIDTH-1, "center");
    },
    refresh: function(){
      for(var r=0; r<screen.elements.length; r++)
        screen.elements[r].innerHTML = screen.save[r];
    },
    repeatVerticle: function(string, startRow, endRow, col){
      for(var r=startRow; r<=endRow; r++)
        screen.write(string, r, col);
    },
    repeatHorizontal: function(string, row, startCol, endCol){
      var output = "";
      for(var c=startCol; c<=endCol; c++)
        output += string;
      screen.write(output, row, startCol);
    },
    setClicks: function(theClass, func, params){
      var elements = document.getElementsByClassName(theClass);
      var clickFunc = function(fn, p){
        return function(){fn.apply(this, p);};
      };
      for(var e=0; e<elements.length; e++){
        elements[e].onclick = clickFunc(func, params);
      }
    },
    write: function(string, row, startCol, theClass){
      if(string !== '' && string !== undefined){//Make sure there is actually something to write
        var element = screen.elements[row];
        if(element === undefined){
          console.error("SCREEN: Cannot write to invalid row: " + row);
          console.trace();
        } else {
          screen.writeElement(string, element, startCol, theClass);
        }
      } else {
        console.warn("SCREEN: Attempted to write blank string. row: " + row + " col: " + startCol + " class: " +  theClass);
        console.trace();
      }
    },
    writeElement: function(string, element, startCol, theClass){
      if(element === undefined){
        console.error("SCREEN: Cannot write undefined element");
        console.trace();
      } else {
        var nodes = element.childNodes;
        screen.writeNode(string, nodes, startCol, theClass);
      }
    },
    writeNode: function(string, nodes, startCol, theClass){
      //Get nodes that overlap with string, starting from startCol
      var overlapping = screen.getOverlappingNodes(startCol, string.length, nodes);
      //Combine overlapping nodes
      var combinedNode = screen.combineNodes(overlapping.nodes);
      //Recursively call this function OR begin writing
      if(combinedNode.childNodes.length > 0){//Still contains more child nodes, keep going...
        console.warn("Recursive writeNode(): Haven't tested this yet might want to pay attention");
        writeNode(string, combinedNode.childNodes, startCol-overlapping.start, theClass);
      } else {//Down to a single text node. Insert new node with string
        var left = document.createTextNode(combinedNode.textContent.substring(0, startCol-overlapping.start));
        var right = document.createTextNode(combinedNode.textContent.substring(startCol-overlapping.start + string.length));
        var middle;
        var stringNode;
        var strings = string.split("");//Adjust for  extra width
        if(strings.length > 1){//Did contain 
          stringNode = document.createElement("SPAN");
          for(var s=0; s<strings.length; s++){
            stringNode.appendChild(document.createTextNode(strings[s]));
            if(s < strings.length-1){//If not last string in strings
              var appleNode = document.createElement("SPAN");
              appleNode.className = "apple";
              appleNode.appendChild(document.createTextNode(""));
              stringNode.appendChild(appleNode);
            }
          }
        } else {
          stringNode = document.createTextNode(string);
        }
        if(theClass !== undefined){//There is a class, use A element
          middle = document.createElement("a");
          middle.className = theClass;
          middle.appendChild(stringNode);
        } else {
          middle = stringNode;
        }
        //Actually insert new node into document
        var parent = overlapping.nodes[0].parentNode;
        parent.insertBefore(left, overlapping.nodes[0]);
        parent.insertBefore(middle, overlapping.nodes[0]);
        parent.insertBefore(right, overlapping.nodes[0]);
        screen.removeNodes(overlapping.nodes, parent);
      }
    },
    /* getOverlappingNodes(startCol, count, nodes)
     * Input: startCol: starting column
              count: number of characters to count
              nodes: list of nodes
     * Return: Object containing 'nodes' and 'start'
              nodes: list of nodes which are overlapped by counting 'count' chars starting at 'startCol'
              start: first column of first node
    */
    getOverlappingNodes: function(startCol, chars, nodes){
      var overlapping = [];
      var counter = 0;//Marks beginning of current node
      var start = -1;//Marks beginning of first overlapping node
      for(var n=0; n<nodes.length; n++){//Run past each node
        var nodeLength = nodes[n].textContent.length;
        if(startCol<counter+nodeLength && startCol>=counter){//If startCol is in the current node
          overlapping.push(nodes[n]);
          var charsInThisNode = nodes[n].textContent.substring(startCol-counter, chars).length;//Number of characters in current node, up to 'chars'
          startCol += charsInThisNode;//Set startCol to end of string or node, whichever is first
          chars -= charsInThisNode;//'chars' is now the number of chars left in future nodes
          if(start < 0)
            start = counter;
        }
        counter += nodeLength;//Set counter to beginning of next node
      }
      var data = {
        nodes: overlapping,
        start: start
      };
      return data;
    },
    /* getOverlappingNodes(nodes)
     * Input: nodes: list of nodes
     * Return: single node combined from list of nodes
    */
    combineNodes: function(nodes){
      if(nodes.length > 1){
        var combinedNode = document.createTextNode("");
        for(var n=0; n<nodes.length; n++){
          combinedNode.textContent += nodes[n].textContent;
        }
        return combinedNode;
      } else {
        return nodes[0];
      }
    },
    //Removes all nodes in 'nodes' from 'parent'
    removeNodes: function(nodes, parent){
      for(var n=0; n<nodes.length; n++){
        parent.removeChild(nodes[n]);
      }
    },
    writeImage: function(image, row, col, height, width, align, theClass){
      var startRow, startCol;
      var imageWidth = screen.getImageWidth(image);
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
      for(var r=0; r<image.length && r<=(row+height-startRow); r++)
        if(image[r] !== '' && image[r] !== undefined)
          screen.write(image[r], startRow+r, startCol, theClass);
    },
    getImageWidth: function(image){
      var width = 0;
      for(var i=0; i<image.length; i++)
        if(screen.lengthIgnoreTags(image[i]) > width)
          width = screen.lengthIgnoreTags(image[i]);
      return width;
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
