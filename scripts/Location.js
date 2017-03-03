/* LocationWindow.js
 *
 */

function Location() {
    var location = {
        buildings: [],
        init: function(gb) {
            location.gamebox = gb;
            location.format();
            location.build();
            location.displayViewIcons();
            location.displaySideBarButtons(10);
            location.initBuildings();
        },
        format: function(){
          location.gamebox.displaySideBar();
          location.gamebox.displayTitleBox("SPACE EXPLORER");
          location.gamebox.displayStatus(location.getStatus(location.gamebox.explorer.location));
          location.gamebox.displayCreditBox(location.gamebox.explorer.credits);
          location.gamebox.displayBottomBar();
          location.gamebox.displayView(location.gamebox.explorer.location.view);
        },
        build: function(){
          location.buildings[0] = Building(location.gamebox.explorer.location.observatory, "observatory", location.gamebox);
          location.buildings[1] = Building(location.gamebox.explorer.location.missionControl, "mission-control", location.gamebox);
          location.buildings[2] = Building(location.gamebox.explorer.location.launcher, "launcher", location.gamebox);
          location.buildings[3] = Building(location.gamebox.explorer.location.factory, "factory", location.gamebox);
          location.buildings[4] = Building(location.gamebox.explorer.location.mine, "mine", location.gamebox);
          location.buildings[5] = Building(location.gamebox.explorer.location.colony, "colony", location.gamebox);
        },
        displayViewIcons: function(align){
          icons = [];
          for(var b=0; b<location.buildings.length; b++)
            icons[b] = location.buildings[b].getViewIcon("center");
          location.gamebox.displayViewIcons(icons);
        },
        displaySideBarButtons: function(startRow){
          for(var b=0; b<location.buildings.length; b++)
            location.gamebox.displaySideBarButton(location.buildings[b].getButton(), startRow+(3*b));
        },
        initBuildings: function(){
          for(var b=0; b<location.buildings.length; b++)
            location.buildings[b].init();
        },
        getStatus: function(expLoc) {
            return [
                expLoc.body.parent.type.toUpperCase() + ":",
                " " + expLoc.body.parent.name.toUpperCase(),
                expLoc.body.type.toUpperCase() + ":",
                " " + expLoc.body.name.toUpperCase(),
                "LOCATION:",
                " " + expLoc.type.toUpperCase()
            ];
        }
    };
    return location;
}

function Building(b, theClass, gb){
  var building = {
    gamebox: gb,
    name: b.name,
    image: b.image,
    class: theClass,
    elements: document.getElementsByClassName(theClass),
    getButton: function(){
      return {
        title: building.name,
        class: building.class
      };
    },
    getViewIcon: function(a){
      return {
        image: building.image,
        align: a,
        class: building.class
      };
    },
    init: function(){
      for(var e=0; e<building.elements.length; e++)
        building.setClick(building.elements[e]);
    },
    setClick: function(e){
      e.onclick = function(){
        building.gamebox.switchTo(building.class);
      };
    }
  };
  return building;
}
