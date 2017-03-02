<?php
	include 'DBManager.php';

	class Explorer {
		public $credits, $location;

		public function __construct($id) {
			$expArr = getRow("ID", $id, "Explorers");

			$this->credits = $expArr["Credits"];
			$this->location = new Location($expArr["Location"]);
		}
	}

	class Location {
		public $body, $type, $view, $missionControl, $launcher, $observatory, $factory, $mine, $colony;

		public function __construct($id){
			$locArr = getRow("ID", $id, "Locations");

			$this->body = new Body($locArr["Body"]);
			$this->type = $locArr["Type"];
			$this->view = explode("\r\n", htmlspecialchars($locArr["Image"]));
			$this->missionControl = new MissionControl($locArr["MissionControl"], $this->type, $id);
			$this->launcher = new Launcher($locArr["Launcher"], $this->type, $id);
			$this->observatory = new Observatory($locArr["Observatory"], $this->type);
			$this->factory = new Factory($locArr["Factory"], $this->type);
			$this->mine = new Mine($locArr["Mine"], $this->type);
			$this->colony = new Colony($locArr["Colony"], $this->type);
		}
	}

	class Body {
		public $name, $parent, $type;

		public function __construct($id){
			$bodyArr = getRow("Name", "'$id'", "Bodies");

			$this->name = $id;
			$this->type = $bodyArr["Type"];
			if($bodyArr["Parent"] != null)
				$this->parent = new Body($bodyArr["Parent"]);
		}
	}

	class MissionControl {
		public $level, $name, $image, $missions;

		public function __construct($lvl, $type, $loc){
			$mcArr = getRow(array("Level","Type"), array($lvl,"'$type'"), "MissionControls");
			$misArr = getRows("Location", $loc, "Missions");

			$this->level = $lvl;
			$this->name = $mcArr["Name"];
			$this->image = explode("\r\n", $mcArr["Image"]);
			$this->missions = $misArr;
		}
	}

	class Launcher {
		public $level, $name, $image, $capacity, $rockets;

		public function __construct($lvl, $type, $loc){
			$launchArr = getRow(array("Level","Type"), array($lvl,"'$type'"), "Launchers");
			$rocketArr = getRows("Location", $loc, "Rockets");

			$this->level = $lvl;
			$this->name = $launchArr["Name"];
			$this->image = explode("\r\n", $launchArr["Image"]);
			$this->capacity = $launchArr["Capacity"];
			for($r=0; $r<count($rocketArr); $r++)
				$this->rockets[] = new Rocket($rocketArr[$r]["Size"], $rocketArr[$r]["NoseCone"], $rocketArr[$r]["Fuselage"], $rocketArr[$r]["Engine"]);
		}
	}

	class Observatory {
		public $level, $name, $image;

		public function __construct($lvl, $type){
			$obArr = getRow(array("Level","Type"), array($lvl,"'$type'"), "Observatories");

			$this->level = $lvl;
			$this->name = $obArr["Name"];
			$this->image = explode("\r\n", htmlspecialchars($obArr["Image"]));
		}
	}

	class Factory {
		public $level, $name, $image;

		public function __construct($lvl, $type){
			$fArr = getRow(array("Level","Type"), array($lvl,"'$type'"), "Factories");

			$this->level = $lvl;
			$this->name = $fArr["Name"];
			$this->image = explode("\r\n", htmlspecialchars($fArr["Image"]));
		}
	}

	class Mine {
		public $level, $name, $image;

		public function __construct($lvl, $type){
			$mArr = getRow(array("Level","Type"), array($lvl,"'$type'"), "Mines");

			$this->level = $lvl;
			$this->name = $mArr["Name"];
			$this->image = explode("\r\n", htmlspecialchars($mArr["Image"]));
		}
	}

	class Colony {
		public $level, $name, $image;

		public function __construct($lvl, $type){
			$cArr = getRow(array("Level","Type"), array($lvl,"'$type'"), "Colonies");

			$this->level = $lvl;
			$this->name = $cArr["Name"];
			$this->image = explode("\r\n", htmlspecialchars($cArr["Image"]));
		}
	}

	class Rocket {
		public $size, $noseCone, $fuselage, $engine;

		public function __construct($s, $nc, $f, $e){
			$ncArr = getRow(array("Size","Level"), array($s,$nc), "NoseCones");
			$fArr = getRow(array("Size", "Level"), array($s,$f), "Fuselages");
			$eArr = getRow(array("Size", "Level"), array($s,$e), "Engines");

			$this->size = $s;
			$this->noseCone = new NoseCone($nc, $ncArr["Name"], $ncArr["Mass"], $ncArr["Drag"], $ncArr["Image"]);
			$this->fuselage = new Fuselage($s, $f, $fArr["Name"]);
			$this->engine = new Engine($e, $eArr["Name"], $eArr["Mass"], $eArr["ISP"], $eArr["Image"], $eArr["Flames"]);
		}
	}

	class NoseCone {
		public $level, $name, $mass, $drag, $image;

		public function __construct($lvl, $n, $m, $dr, $img){
			$this->level = $lvl;
			$this->name = $n;
			$this->mass = $m;
			$this->drag = $dr;
			$this->image = $img;
		}
	}

	class Fuselage {
		public $level, $name, $boosters, $image;

		public function __construct($size, $lvl, $n){
			for($b=1; $b<=$lvl; $b++){
				$booster = getRow(array("Size", "Stage"), array($size, $b), "Boosters");
				$this->boosters[] = $booster;
				$this->image .= htmlspecialchars($booster["Image"]);
				if($b != $lvl)
					$this->image .= "/n";
			}

			$this->level = $lvl;
			$this->name = $n;
		}
	}

	class Engine {
		public $level, $name, $mass, $isp, $image, $flames;

		public function __construct($lvl, $n, $m, $i, $img, $f){
			$this->level = $lvl;
			$this->name = $n;
			$this->mass = $m;
			$this->isp = $i;
			$this->image = htmlspecialchars($img);
			$this->flames = htmlspecialchars($f);
		}
	}
