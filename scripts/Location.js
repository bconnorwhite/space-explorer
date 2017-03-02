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
            location.gamebox.displayViewIcons(location.getViewIcons(location.gamebox.explorer.location));
            location.gamebox.displayTitleBox("SPACE EXPLORER");
            location.gamebox.displayStatus(location.getStatus(location.gamebox.explorer.location));
            location.gamebox.displaySideBarButtons(location.getButtons(location.gamebox.explorer.location), 10);
            location.gamebox.displayCreditBox(location.gamebox.explorer.credits);
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
        },
        getButtons: function(expLoc) {
            return [{
                title: expLoc.missionControl.name,
                class: "mission-control"
            }, {
                title: expLoc.launcher.name,
                class: "launcher"
            }, {
                title: expLoc.observatory.name,
                class: "observatory"
            }, {
                title: expLoc.factory.name,
                class: "factory"
            }, {
                title: expLoc.mine.name,
                class: "mine"
            }, {
                title: expLoc.colony.name,
                class: "colony"
            }];
        },
        getViewIcons: function(expLoc) {
            return [{
                image: expLoc.colony.image,
                align: "center",
                class: "colony"
            }, {
                image: expLoc.observatory.image,
                align: "center",
                class: "observatory"
            }, {
                image: expLoc.launcher.image,
                align: "center",
                class: "launcher"
            }, {
                image: expLoc.mine.image,
                align: "center",
                class: "mine"
            },{
                image: expLoc.missionControl.image,
                align: "center",
                class: "mission-control"
            },{
                image: expLoc.factory.image,
                align: "center",
                class: "factory"
            }];
        }
    };
    return location;
}
