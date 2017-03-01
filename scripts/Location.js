/* LocationWindow.js
 *
 */

function Location() {
    var location = {
        init: function(gb) {
            location.gamebox = gb;
            location.gamebox.displaySideBar();
            location.gamebox.displayBottomBar();
            location.gamebox.displayView(location.gamebox.explorer.location.view);
            location.gamebox.displayTitleBox("SPACE EXPLORER");
            location.gamebox.displayStatus(location.getStatus(location.gamebox.explorer.location));
            location.gamebox.displaySideBarButtons(location.getButtons(location.gamebox.explorer.location), 10);
            location.gamebox.displayCreditBox(location.gamebox.explorer.credits);
        },
        getStatus: function(expLoc){
          return [
            expLoc.body.parent.type.toUpperCase() + ":",
            " " + expLoc.body.parent.name.toUpperCase(),
            expLoc.body.type.toUpperCase() + ":",
            " " + expLoc.body.name.toUpperCase(),
            "LOCATION:",
            " " + expLoc.type.toUpperCase()
          ];
        },
        getButtons: function(expLoc){
          return [
            {title: expLoc.missionControl.name, id: "mission-control-button"},
            {title: expLoc.launcher.name, id: "launcher-button"},
            {title: expLoc.observatory.name, id: "observatory-button"},
            {title: expLoc.factory.name, id: "factory-button"},
            {title: expLoc.mine.name, id: "mine-button"},
            {title: expLoc.colony.name, id: "colony-button"}
          ];
        }
    };
    return location;
}
