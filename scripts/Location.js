/* LocationWindow.js
 *
 */

function Location() {
  var location = {
    buildings: [],
    init: function(game) {
      location.game = game;
      location.format();
      location.build();
      location.displayViewIcons();
      location.displaySideBarButtons(10);
      location.initBuildings();
    },
    format: function(){
      location.game.displaySideBar();
      location.game.displayTitleBox("SPACE EXPLORER");
      location.game.displayStatus(location.getStatus(location.game.explorer.location));
      location.game.displayCreditBox(location.game.explorer.credits);
      location.game.displayBottomBar();
      location.game.displayView(location.game.explorer.location.view);
    },
    build: function(){
      location.buildings[0] = Building(location.game.explorer.location.colony, "colony", location.game);
      location.buildings[1] = Building(location.game.explorer.location.mine, "mine", location.game);
      location.buildings[2] = Building(location.game.explorer.location.factory, "factory", location.game);
      location.buildings[3] = Building(location.game.explorer.location.observatory, "observatory", location.game);
      location.buildings[4] = Building(location.game.explorer.location.missionControl, "mission-control", location.game);
      location.buildings[5] = Building(location.game.explorer.location.launcher, "launcher", location.game);
    },
    displayViewIcons: function(align){
      icons = [];
      for(var b=0; b<location.buildings.length; b++)
        icons[b] = location.buildings[b].getViewIcon("center");
      location.game.displayViewIcons(icons);
    },
    displaySideBarButtons: function(startRow){
      for(var b=0; b<location.buildings.length; b++)
        location.game.displaySideBarButton(location.buildings[b].getButton().title, startRow+(3*b), location.buildings[b].getButton().class);
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

function Building(b, theClass, g){
  var building = {
    game: g,
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
      building.game.setClicks(building.class, building.class);
    }
  };
  return building;
}
