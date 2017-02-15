function Game(){//Creates explorer, window, and start initial window render.
	var explorer;
	var window;
	var events;
	var brightness = 0;
	var power = true;
	var screen = [];
	var timeouts = [];
	var load = ["                                                                               ",
				"                                                                                ",
				"                                                                                ",
				"                                                                                ",
				"                                                                                ",
				"                                                                                ",
				"      .``                                                                       ",
				"      --::::--.``                                                               ",
				"         ``.-:::/::-..`                                                         ",
				"               ``.-:://::-.``                                                   ",
				"                    `.-::////:-.``                `.:::::::::::                 ",
				"                          `.-:////::-.`         .:sdddddddhyo:                  ",
				"                            ``.:://///:-.`   `-oysdddddddd/.                    ",
				"                                 `.-://////:-../oyhdddds/.                      ",
				"                                    `-://////::-.-/s+-`                         ",
				"                                     `-:--:///////:-.`                          ",
				"                                  ./shhyo:.-:///////:-`                         ",
				"                                .:shhhhdddhs.`.-////////:.`                     ",
				"                            `:ohhhddddhhs:.    `-:///////:-`                    ",
				"                         `-oyhhdddddhs/.         `.:////////:.                  ",
				"                        .osyyyyyyys/.`              .-::::::::.                 ",
				"                         `                                                      ",
				"                                                                                ",
				"                                                                                ",
				"                                                                                ",
				"                                                                                ",
				"                                                                                ",
				"                                                                                ",
				"                                                                                ",
				"                                                                                "];

	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
			 explorer = JSON.parse(xmlhttp.responseText);
			 game.intro(true);
		}
	};
	xmlhttp.open("GET", "GetExplorer.php", true);
	xmlhttp.send();

	this.intro = function(skip){
		if(skip){
			window = new LocationWindow(explorer);
			document.getElementById("intro").style.display = "none";
			this.flipPower();
			document.getElementById("main").style.display = "block";
		}
		else{
			updateCredits(0);
			var unlocked = 0;
			var step = 0;
			var books = document.getElementById("books");
			var talked = document.getElementById('talked');
			timeouts.push(setTimeout( function(){ books.innerHTML = "a couple";}, 4000));
			timeouts.push(setTimeout( function(){ talked.innerHTML = "a couple";
									unlock();}, 8000));
			timeouts.push(setTimeout( function(){ books.innerHTML = "a few";}, 7000));
			timeouts.push(setTimeout( function(){ talked.innerHTML = "a few";
									unlock();}, 12000));
			timeouts.push(setTimeout( function(){ books.innerHTML = "more than a few";}, 16000));
			timeouts.push(setTimeout( function(){ talked.innerHTML = "more than a few";
									unlock();}, 20000));
			timeouts.push(setTimeout( function(){ books.innerHTML = "a lot";}, 24000));
			timeouts.push(setTimeout( function(){ talked.innerHTML = "a lot";
									unlock();}, 32000));
			timeouts.push(setTimeout( function(){ books.innerHTML = "lots";}, 40000));
			timeouts.push(setTimeout( function(){ talked.innerHTML = "lots";
									unlock();}, 48000));

			var button = document.getElementById('button');
			timeouts.push(setTimeout( function(){	button.style.display = "unset";}, 8000));
			button.onclick = function(){
				if(step == 0 && unlocked > 0){
					step ++;
					if(unlocked == step)
						lock();
					updateCredits(-28000);
					button.innerHTML = "Sell your company (UnZip3)";
				} else if(step == 1 && unlocked > 1){
					step ++;
					if(unlocked == step)
						lock();
					updateCredits(22000000);
					button.innerHTML = "Start another company (Y.com)";
				} else if(step == 2 && unlocked > 2){
					step++;
					if(unlocked == step)
						lock();
					button.innerHTML = "Sell that company too (Y.com)";
				} else if(step == 3 && unlocked > 3){
					step++;
					if(unlocked == step)
						lock();
					updateCredits(165000000);
					button.innerHTML = "Start SpiceX (Australian aerospace startup)";
				} else if(step == 4 && unlocked > 4){
					step++;
					if(unlocked == step)
						lock();
					window = new LocationWindow(explorer);
					document.getElementById("intro").style.display = "none";
					flipPower();
					document.getElementById("main").style.display = "block";
				}
			};
			function updateCredits(c){
				explorer.credits = parseInt(explorer.credits) + c;
				var credits = document.getElementsByClassName("credits");
				for(var i=0; i<credits.length; i++)
					credits[i].innerHTML = explorer.credits;
			};
			function unlock(){
				unlocked++;
				button.style.backgroundColor = "#fff";
				button.style.cursor = "pointer";
			};
			function lock(){
				button.style.backgroundColor = "#888";
				button.style.cursor = "unset";
			};
		}
	};
	this.flipPower = function(){
		var screenElements = document.getElementsByClassName("screen");
		if(power == true){//turn off
			power = false;
			var t=0;
			for(var b=brightness; b>=0; b--){
				window.fade(b, t);
				t+=500/16;
			}
			screen = [];
			for(var s=0; s<screenElements.length; s++)
				screen.push(screenElements[s].innerHTML);//save screen
			timeouts.push(setTimeout(function(){window.clearClasses("screen");}, 1000));
		} else {//turn on
			power = true;
			var t=0;
			for(var b=1; b<16; b++){
				window.fade(b, t);
				t+=1000/16;
			}
			for(var s=0; s<screenElements.length; s++)
				screenElements[s].innerHTML = load[s];
			timeouts.push(setTimeout(function(){	for(var s=0; s<screenElements.length; s++)
										screenElements[s].innerHTML = screen[s]; }, 2000));
		}
	};
	this.render = function(){
		window.render();
	}
	this.switchTo = function(className, id){
		switch(className){
			case "location":
				window.clearTimeouts();
				window = new LocationWindow(explorer);
				break;
			case "missionControl":
				window.clearTimeouts();
				window = new MissionControlWindow(explorer);
				break;
			case "launcher":
				window.clearTimeouts();
				window = new LauncherWindow(explorer);
				break;
			case "observatory":
				window.clearTimeouts();
				window = new ObservatoryWindow(explorer);
				break;
			case "factory":
				window.clearTimeouts();
				window = new FactoryWindow(explorer);
				break;
			case "mine":
				window.clearTimeouts();
				window = new MineWindow(explorer);
				break;
			case "colony":
				window.clearTimeouts();
				window = new ColonyWindow(explorer);
				break;
			case "mission":
				window.showMissionDescription(parseInt(id.substring(8), 10));//id is in the form 'mission-#', so substring(8) will isolate the #.
				break;
			case "enter":
				window.enter();
				break;
			case "destination":
				break;
			case "test":
				window.fireRocket();
				break;
			case "launch":
				var rocketNum = window.rocketNum;
				var missionNum = window.missionNum;
				window = new LocationWindow(explorer);
				window.launch(rocketNum, missionNum);
				break;
			case "bright":
				if(brightness < 15)
					brightness++;
				window.updateBrightness();
				break;
			case "dim":
				if(brightness > 0)
					brightness--;
				window.updateBrightness();
				break;
			case "power":
				window.clearTimeouts();
				this.flipPower();
				break;
		}
	}

	function Window(){
		this.clearTimeouts = function(){
			for(var t=0; t<timeouts.length; t++)
				clearTimeout(timeouts[t]);
		}
		this.updateBrightness = function(b){
			if(b != null)
				brightness = b;
			var screen = document.getElementsByClassName("screen");
			for(var r=0; r<screen.length; r++){
				if(brightness != 0)
					screen[r].style.color = "#" + (brightness * 1118481).toString(16);
				else
					screen[r].style.color = "#000000";
			}
		}
		this.fade = function(b, t){
			timeouts.push(setTimeout( function(){	window.updateBrightness(b);}, t));
		};
		this.erase = function(id, string){//Erases element of id 'id' replacing with 'string'
				string = matchLengthErase(string, document.getElementById(id).textContent);//match 'string' to length of old string
				document.getElementById(id).innerHTML = string;//set old string to 'string'
		};
		this.over = function(id, string){//Erases element of id 'id' replacing with 'string'
			string = matchLengthOver(string, document.getElementById(id).textContent);//match 'string' to length of old string
			document.getElementById(id).innerHTML = string;//set old string to 'string'
		};
		this.eraseAfter = function(id, string, x){//Erases element of id 'id' after char at position 'x' with 'string'
			for(var c=0; c<x; c++)
				string = " " + string;
			this.erase(id, string);
		};
		this.overAfter = function(id, string, x){//Erases element of id 'id' after char at position 'x' with 'string'
			var element = document.getElementById(id);
			if(element != null){
				string = substringIgnoreTags(element.textContent,0,x) + string;//match 'string' to length of old string, starting after x
				this.over(id, string);
			}
		};
		this.eraseClass = function(id, string, className){//Erases element of id 'id' replacing with 'string', drawing class 'className'
			string = matchLengthErase(string, document.getElementById(id).textContent);//match 'string' to length of old string
			document.getElementById(id).innerHTML = string;//set old string to 'string'
			document.getElementById(id).className = className;
		};
		function matchLengthErase(a, b){//matches the length of 'a' to 'b' by drawing spaces to 'a'
			while(lengthIgnoreTags(a) < lengthIgnoreTags(b))//If 'a' is shorter than 'b' draw spaces
				a += " ";
			a = substringIgnoreTags(a, 0, lengthIgnoreTags(b));//If 'a' is longer than 'b' trim to the length of 'b'
			return a;
		};
		function matchLengthOver(a, b){//matches the length of 'a' to 'b' by drawing spaces to 'a'
			aLength = lengthIgnoreTags(a);
			bLength = lengthIgnoreTags(b);
			a += substringIgnoreTags(b,aLength,bLength);//If 'a' is shorter than 'b' draw the rest of 'b' to 'a'
			a = substringIgnoreTags(a, 0, bLength);//If 'a' is longer than 'b' trim to the length of 'b'
			return a;
		};
		this.drawView = function(view){//Draws an array of strings on the view section of the window
			for(var r=0; r<26; r++){//Draw each row of the view
				if(r<view.length)
					this.erase("window-" + (r), view[r]);
				else
					this.erase("window-" + (r), "");
			}
			drawOverIgnoreTags("window-0", "/", 0);
			drawOverIgnoreTags("window-0", "\\", 57);
			drawOverIgnoreTags("window-25", "\\", 0);
			drawOverIgnoreTags("window-25", "/", 57);
		};
		this.clearView = function(){
			this.drawView("");
		};
		this.clear = function(id){
			this.erase(id, "");
		}
		this.clearClasses = function(className){
			var classes = document.getElementsByClassName(className);
			for(var c=0; c<classes.length; c++){
				var element = classes[c];
				var string = matchLengthErase("", element.textContent);//match 'string' to length of old string
				element.innerHTML = string;
			}
		}
		this.drawBuilding = function(image, className, x, y){//Draws a array of strings on the view section at 'x', 'y' with class 'className'
			for(var r=0; r<image.length; r++)
				drawOverIgnoreTags('window-' + (y+r), "<a class='" + className + "'>" + image[r] + "</a>", x);
		};
		function drawOverIgnoreTags(id, string, x){
			var oldString = document.getElementById(id).innerHTML;
			string = substringIgnoreTags(oldString, 0, x) + string;//Insert string after x characters (ignoring tags)
			string = substringIgnoreTags(string, 0, lengthIgnoreTags(oldString));//Limit string to number of characters (ignoring tags) in oldString
			string = string + substringIgnoreTags(oldString, lengthIgnoreTags(string), lengthIgnoreTags(oldString));//fill string to match length of oldString
			document.getElementById(id).innerHTML = string;
		};
		function substringIgnoreTags(string, a, b){
			var locA = 0;
			var tag = false;

			for(var let=0; let < a && locA < string.length; locA++){//Skip over 'a' characters
				if(string.charAt(locA) == '<')//start tag
					tag = true;
				else if(tag && string.charAt(locA) == '>')//end tag
					tag = false;
				else if(!tag)
					let++;
			}

			var locB = locA;
			tag = false;
			for(var let=a; let < b && locB < string.length; locB++){//Count b-a characters
				if(string.charAt(locB) == '<')//start tag
					tag = true;
				else if(tag && string.charAt(locB) == '>')//end tag
					tag = false;
				else if(!tag)
					let++;
			}
			return string.substring(locA,locB);
		};
		function lengthIgnoreTags(string){//Returns number of characters (ignoring tags)
			var let = 0;
			var tag = false;
			for(var loc=0; loc < string.length; loc++){
				if(string.charAt(loc) == '<')//start tag
					tag = true;
				else if(tag && string.charAt(loc) == '>')//end tag
					tag = false;
				else if(!tag)
					let++;
			}
			return let;
		};
		this.setStatus = function(img){
			for(var r=0; r<6; r++){
				if(r<img.length)
					this.erase("status-" + (r+1), img[r]);
				else
					this.erase("status-" + (r+1), "");
			}
		}
		this.drawStore = function(){
			this.erase("store-1", "STORE");
			this.drawStoreBar([2,11]);
			this.erase("store-3", "");
			this.erase("store-4", "");
			this.erase("store-5", "");
			this.erase("store-6", "");
			this.erase("store-7", "");
			this.erase("store-8", "");
			this.erase("store-9", "");
			this.erase("store-10", "");
			this.erase("store-12", "");
			this.drawButton(16, "Back", "location");
			this.erase("credits", explorer.credits);
		}
		this.drawStoreBar = function(spots){
			var storeBar = "__________________";
			for(var s=0; s<spots.length; s++)
				if(spots[s]<=16)
					this.erase("store-" + spots[s], storeBar);
		}
		this.drawButton = function(storeRow, buttonName, className){
			if(storeRow >=0 && storeRow <= 16)//if in range
				this.erase("store-" + storeRow, " <a class='" + className + "'>" + buttonName + "</a>");
		}
		this.drawDButton = function(x, w){
			this.overAfter("dBarTop", "+", x);
			this.overAfter("dBarTop", "+", x+w+1);
			this.overAfter("dBarBottom", "+", x);
			this.overAfter("dBarBottom", "+", x+w+1);
		}
		this.clearDBar = function(){
			this.erase("dBarTop", "==========================================================");
			this.clear("description");
			this.erase("dBarBottom", "==========================================================");
		}
		this.drawLeftArrow = function(y){
			this.overAfter("window-" + (y-1), "/", 3);
			this.overAfter("window-" + y, "/", 2);
			this.overAfter("window-" + (y+1), "\\", 2);
			this.overAfter("window-" + (y+2), "\\", 3);
		}
		this.drawRightArrow = function(y){
			this.overAfter("window-" + (y-1), "\\", 54);
			this.overAfter("window-" + y, "\\", 55);
			this.overAfter("window-" + (y+1), "/", 55);
			this.overAfter("window-" + (y+2), "/", 54);
		}
		this.drawRocket = function(rNum, x, y, fire){
			var rocket = explorer.location.launcher.rockets[rNum];
			var x = x - Math.floor((rocket.size-1) / 2);
			var fuselageY = y - rocket.fuselage.image.length;
			var noseconeY = fuselageY - rocket.noseCone.image.length;
			var engineY = y + 1;
			var flamesY = y + rocket.engine.image.length;

			for(var r=0; r<rocket.noseCone.image.length; r++)//for each row of the nosecone
				this.overAfter("window-" + (noseconeY+r), rocket.noseCone.image[r], x);
			for(var r=0; r<rocket.fuselage.image.length; r++)//for each row of the fuselage
				this.overAfter("window-" + (fuselageY+r), rocket.fuselage.image[r], x);
			for(var r=0; r<rocket.engine.image.length; r++)//for each row of the engine
				this.overAfter("window-" + (engineY+r), rocket.engine.image[r], x);
			if(fire == true)
				for(var r=0; r<rocket.engine.flames.length; r++)
					this.overAfter("window-" + (flamesY+r), rocket.engine.flames[r], x);
		}
		this.EventHandler = function(bind){
			var classes = ["location", "missionControl", "launcher", "observatory", "factory", "mine", "colony", "mission", "enter", "destination", "test", "launch", "bright", "dim", "power"];
			for(var c=0; c<classes.length; c++){
				var list = document.getElementsByClassName(classes[c]);
				for(var l=0; l<list.length; l++){
					if(bind){
						list[l].onclick = function(){
							game.switchTo(this.className, this.id);
						};
					}
					else
						list[l].onclick = null;
				}
			}
		}
	};

	//Location Window---------------------------------------------------------------------
	function LocationWindow(explorer){
		this.EventHandler(false);

		this.render = function(){
			//Draw Sidebar
			this.erase("title", "SPACE EXPLORER");
			var status = [	" " + explorer.location.body.parent.type.toUpperCase() + ":",
						 	" " + explorer.location.body.parent.name,
							" " + explorer.location.body.type.toUpperCase() + ":",
							" " + explorer.location.body.name, " LOCATION:",
							" " + explorer.location.type
						];
			this.setStatus(status);
			this.drawStoreBar([2,5,8,11,14]);
			this.drawButton(1, explorer.location.missionControl.name, "missionControl");
			this.drawButton(4, explorer.location.launcher.name, "launcher");
			this.drawButton(7, explorer.location.observatory.name, "observatory");
			this.drawButton(10, explorer.location.factory.name, "factory");
			this.drawButton(13, explorer.location.mine.name, "mine");
			this.drawButton(16, explorer.location.colony.name, "colony");
			this.erase("credits", explorer.credits);
			//Draw View
			this.drawView(explorer.location.view);
			this.drawBuilding(explorer.location.observatory.image, "observatory", 1, 14);
			this.drawBuilding(explorer.location.missionControl.image, "missionControl", 20, 14);
			this.drawBuilding(explorer.location.launcher.image, "launcher", 39, 14);
			//Draw DBar
			this.clearDBar();
			//Events
			this.EventHandler(true);
		};
		this.launch = function(rocketNum, mNum){
			//Launch Calculations
			var rocket = explorer.location.launcher.rockets[rocketNum];
			var numEngines = [1, 1, 3, 5, 9, 12, 16, 20];//Calculate Mass
			var mass = parseFloat(rocket.noseCone.mass) + parseFloat(explorer.location.missionControl.missions[mNum].Payload);
			for(var b=0; b<rocket.fuselage.boosters.length; b++){//Add boosters and engines for each stage
				mass += parseFloat(rocket.fuselage.boosters[b].Mass);
				mass += numEngines[(rocket.fuselage.boosters.length-b-1) + parseInt(rocket.size)] * parseFloat(rocket.engine.mass);
			}
			var deltaV = 0;//Calculate Delta V
			for(var b=0; b<rocket.fuselage.boosters.length; b++){//For each stage's burn
				deltaV += parseFloat(rocket.engine.isp) * 9.81 * Math.log(mass/(mass - parseFloat(rocket.fuselage.boosters[b].Fuel))) * parseFloat(rocket.noseCone.drag);//Add delta V
				mass -= parseFloat(rocket.fuselage.boosters[b].Mass);//Update mass after dropping booster
				mass -= numEngines[(rocket.fuselage.boosters.length-b-1) + parseInt(rocket.size)] * parseFloat(rocket.engine.mass);
			}
			if(deltaV > 9400)//Set string 'status'
				status = "SUCCESS";
			else
				status = "FAILURE";
			result = "Delta V: " + deltaV;//Set string 'result'
			//Animation
			var rocketY = 18;
			window.drawRocket(rocketNum, 47, rocketY);
			window.eraseAfter("description", "3", 28);
			timeouts.push(setTimeout(function(){ window.eraseAfter("description", "2", 28) }, 1000));
			timeouts.push(setTimeout(function(){ window.eraseAfter("description", "1", 28) }, 2000));
			for(var s=0; s<rocketY+6; s++){//For each step 's'
				var t=0;//'t' = wait time
				for(var u=1; u<(s+1); u++)
					t += (1000/u);
				animateRocket(20-s, t+3000);
				if(s == rocketY+5)//At end of animation, show result
					showResult(status, result, t+4000);
			}
			function animateRocket(y, t){
				timeouts.push(setTimeout(function(){	window.render();
										window.eraseAfter("description", "LIFTOFF", 25);
										window.drawRocket(rocketNum, 47, y, true); }, t));
			}
			function showResult(status, result, t){
				timeouts.push(setTimeout(	function(){	window.eraseAfter("description", "Mission: " + status, 2);
										window.overAfter("description", result, 29); }, t));
			}
		};
		this.render();
	};
	LocationWindow.prototype = new Window();
	LocationWindow.prototype.constructor = LocationWindow;

	//Mission Control Window--------------------------------------------------------------
	function MissionControlWindow(explorer){
		var missionSelected;
		this.EventHandler(false);

		this.render = function(){
			//Draw Sidebar
			this.erase("title", explorer.location.missionControl.name);
			this.setStatus(explorer.location.missionControl.image);
			this.drawStore();
			//Draw View
			this.clearView();
			this.eraseAfter("window-1", "Missions:", 2);
			this.overAfter("window-1", "Pay:", 40);
			for(var m=0; m<explorer.location.missionControl.missions.length; m++){
				this.eraseAfter("window-" + ((2*m)+3), explorer.location.missionControl.missions[m].Pay, 42);
				this.overAfter("window-" + ((2*m)+3), "<a class='mission' id='mission-" + m + "'>" + explorer.location.missionControl.missions[m].Name + "</a>", 4);
			}
			this.clearDBar();
			//Events
			this.EventHandler(true);
		};
		this.showMissionDescription = function(missionNum){
			missionSelected = missionNum;
			this.render();
			this.eraseAfter("description", explorer.location.missionControl.missions[missionSelected].Instructions, 2);
			this.overAfter("window-" + ((2*missionSelected)+3), ">", 2);
		};
		this.enter = function(){
			if(missionSelected != null){
				window.clearTimeouts();
				window = new LauncherWindow(explorer, missionSelected);
			}
		}
		this.render();
	};
	MissionControlWindow.prototype = new Window();
	MissionControlWindow.prototype.constructor = MissionControlWindow;

	//Launcher Window---------------------------------------------------------------------
	function LauncherWindow(explorer, mNum){
		this.rocketNum = 0;
		this.missionNum = mNum;
		this.EventHandler(false);

		this.render = function(){
			//Draw Sidebar
			this.erase("title", explorer.location.launcher.name);
			this.setStatus(explorer.location.launcher.image);
			this.drawStore();
			//Draw View
			this.clearView();
			this.overAfter("window-1", "Choose Rocket:", 2);
			if(this.rocketNum > 0)
				this.drawLeftArrow(20);
			if(explorer.location.launcher.rockets != null && this.rocketNum + 1 < explorer.location.launcher.rockets.length)
				this.drawRightArrow(20);
			this.drawRocket(this.rocketNum, 28,20);
			//Mission Box
			for(var r=0; r<6; r++)
				this.eraseAfter("window-" + r, "|", 40);
			this.overAfter("window-1", "Destination:", 42);
			var destinationString;
			if(this.missionNum != null)
				destinationString = explorer.location.missionControl.missions[this.missionNum].Location;
			else
				destinationString = "<a class='destination'>(choose)</a>";
			this.overAfter("window-2", destinationString, 43);
			this.overAfter("window-3", "Payload:", 42);
			var payload;
			if(this.missionNum != null)
				payload = explorer.location.missionControl.missions[this.missionNum].payload;
			else
				payload = "-";
			this.overAfter("window-4", payload, 43);
			this.overAfter("window-5", "__________________", 41);
			//Description Bar
			this.drawDButton(36,10);
			var fuselageName = explorer.location.launcher.rockets[this.rocketNum].fuselage.name.split(" ");
			var rocketName = fuselageName[0] + " " + fuselageName[1] + " " + fuselageName[2] + " Rocket";
			this.eraseAfter("description", rocketName, 2);
			this.overAfter("description", "|<a class='test'>   TEST   </a>|<a class='launch'>  LAUNCH  </a>", 36);
			//Events
			this.EventHandler(true);
		};
		this.fireRocket = function(){//Test rocket
			this.drawRocket(this.rocketNum, 28, 20, true);
			timeouts.push(setTimeout(function(){ game.render(); }, 3000));
		}
		this.render();
	};
	LauncherWindow.prototype = new Window();
	LauncherWindow.prototype.constructor = LauncherWindow;

	//Observatory Window------------------------------------------------------------------
	function ObservatoryWindow(explorer){
		this.EventHandler(false);

		this.render = function(){//Split into panel/main/viewport/etc?
			this.erase("title", explorer.location.observatory.name);
			this.setStatus(explorer.location.observatory.image);
			this.drawStore();
			this.drawView("");
			this.clearDBar();
			this.EventHandler(true);
		};
		this.render();
	};
	ObservatoryWindow.prototype = new Window();
	ObservatoryWindow.prototype.constructor = ObservatoryWindow;

	function FactoryWindow(explorer){
		this.EventHandler(false);

		this.render = function(){//Split into panel/main/viewport/etc?
			this.erase("title", explorer.location.factory.name);
			this.setStatus(explorer.location.factory.image);
			this.drawStore();
			this.drawView("");
			this.clearDBar();
			this.EventHandler(true);
		};
		this.render();
	};
	FactoryWindow.prototype = new Window();
	FactoryWindow.prototype.constructor = FactoryWindow;

	function MineWindow(explorer){
		this.EventHandler(false);

		this.render = function(){//Split into panel/main/viewport/etc?
			this.erase("title", explorer.location.mine.name);
			this.setStatus(explorer.location.mine.image);
			this.drawStore();
			this.drawView("");
			this.clearDBar();
			this.EventHandler(true);
		};
		this.render();
	};
	MineWindow.prototype = new Window();
	MineWindow.prototype.constructor = MineWindow;

	function ColonyWindow(explorer){
		this.EventHandler(false);

		this.render = function(){//Split into panel/main/viewport/etc?
			this.erase("title", explorer.location.colony.name);
			this.setStatus(explorer.location.colony.image);
			this.drawStore();
			this.drawView("");
			this.clearDBar();
			this.EventHandler(true);
		};
		this.render();
	};
	ColonyWindow.prototype = new Window();
	ColonyWindow.prototype.constructor = ColonyWindow;
};

var game = new Game();
