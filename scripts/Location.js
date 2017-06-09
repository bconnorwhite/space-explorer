/* LocationWindow.js
 *
 */

function Location() {
  var buttonStartRow = 10;
  var location = {
    buildings: [],
    init: function(g) {
      location.game = g;
      location.buildings = {
        colony: Building(location.game.explorer.location.colony),
        mine: Building(location.game.explorer.location.mine),
        factory: Building(location.game.explorer.location.factory),
        observatory: Building(location.game.explorer.location.observatory),
        missionControl: Building(location.game.explorer.location.missionControl),
        launcher: Building(location.game.explorer.location.launcher)
      };
    },
    run: function(){
      location.format();
      location.displayView();
    },
    format: function(){
      location.game.displaySideBar();
      location.game.displayTitleBox("SPACE EXPLORER");
      location.game.displayStatus(location.getStatus(location.game.explorer.location));
      location.displaySideBarButtons();
      location.game.displayCreditBox(location.game.explorer.credits);
    },
    displaySideBarButtons: function(){
      var buttonNum = 0;
      for(var b in location.buildings){
        location.game.displaySideBarButton(location.buildings[b].name, buttonStartRow+(3*buttonNum), b);
        buttonNum++;
      }
    },
    displayView: function(){
      location.game.displayView(location.game.explorer.location.view);
      location.displayViewIcons();
      location.setBuildingClicks();
      location.game.displayBottomBar();
    },
    displayViewIcons: function(){
      var icons = [];
      for(var b in location.buildings)
        icons.push(location.buildings[b].getViewIcon("center", b));
      location.game.displayViewIcons(icons);
    },
    setBuildingClicks: function(){
      for(var b in location.buildings)
        location.game.setClicks(b);
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

function Building(b){
  var building = b;
  building.getViewIcon = function(a, c){
    return {
      image: building.image,
      align: a,
      class: c
    };
  };
  return building;
}
