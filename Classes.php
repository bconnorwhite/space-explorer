<?php
	include 'DBManager.php';

	function getUpgradeBlueprint($lvl, $type, $bps){
		foreach($bps as $bp){
			if($bp["Level"] == $lvl+1 && $bp["Type"] == $type){
				return $bp;
			}
		}
	}

	class Explorer {
		public $credits, $location;

		public function __construct($id) {
			$expArr = getRow("ID", $id, "Explorers");

			$this->credits = $expArr["Credits"];
			$this->location = new Location($id, $expArr["Location"]);
		}
	}

	class Location {
		public $body, $type, $view, $missionControl, $launcher, $observatory, $factory, $mine, $colony;

		public function __construct($eid, $lid){
			$locArr = getRow("ID", $lid, "Locations");
			$expLocArr = getRow(["ExplorerID", "LocationID"], [$eid, $lid], "ExplorerLocations");

			$this->body = new Body($locArr["Body"]);
			$this->type = $locArr["Type"];
			$this->greenhouseEffect = $locArr["GreenhouseEffect"];
			$this->view = explode("\r\n", htmlspecialchars($locArr["Image"]));

			$missionControlBPs = getRows(array("ExplorerID", "TableName"), array($eid, "MissionControls"), "BuildingBlueprints");
			$launcherBPs = getRows(array("ExplorerID", "TableName"), array($eid, "Launchers"), "BuildingBlueprints");
			$observatoryBPs = getRows(array("ExplorerID", "TableName"), array($eid, "Observatories"), "BuildingBlueprints");
			$factoryBPs = getRows(array("ExplorerID", "TableName"), array($eid, "Factories"), "BuildingBlueprints");
			$mineBPs = getRows(array("ExplorerID", "TableName"), array($eid, "Mines"), "BuildingBlueprints");
			$colonyBPs = getRows(array("ExplorerID", "TableName"), array($eid, "Colonies"), "BuildingBlueprints");

			$this->missionControl = new MissionControl($expLocArr["MissionControl"], $this->type, $lid, $missionControlBPs);
			$this->launcher = new Launcher($expLocArr["Launcher"], $this->type, $lid, $launcherBPs);
			$this->observatory = new Observatory($expLocArr["Observatory"], $this->type, $observatoryBPs);
			$this->factory = new Factory($expLocArr["Factory"], $this->type, $factoryBPs);
			$this->mine = new Mine($expLocArr["Mine"], $this->type, $expLocArr["EnergyInvestment"], $expLocArr["FuelInvestment"], $expLocArr["OreInvestment"], $expLocArr["FoodInvestment"], $expLocArr["EnergySource"], $mineBPs);
			$this->colony = new Colony($expLocArr["Colony"], $this->type, $expLocArr["Population"], $colonyBPs);
		}
	}

	class Body {
		public $name, $parent, $type;

		public function __construct($id){
			$bodyArr = getRow("Name", "'$id'", "Bodies");

			$this->name = $id;
			$this->type = $bodyArr["Type"];
			if($bodyArr["Type"] == "System")
				$this->luminosity = $bodyArr["Luminosity"];
			else if($bodyArr["Type"] == "Planet" || $bodyArr["Type"] == "Moon")
					$this->albedo = $bodyArr["Albedo"];
			if($bodyArr["Parent"] != null){
				$this->parent = new Body($bodyArr["Parent"]);
				$this->distance = $bodyArr["Distance"];
			}
		}
	}

	class MissionControl {
		public $level, $name, $image, $missions;

		public function __construct($lvl, $type, $loc, $bps){
			$mcArr = getRow(array("Level","Type"), array($lvl,$type), "MissionControls");
			if($mcArr == null)
				$mcArr = getRow("Level", $lvl, "MissionControls");
			$misArr = getRows("Location", $loc, "Missions");

			$this->level = $lvl;
			$this->name = $mcArr["Name"];
			$this->image = explode("\r\n", $mcArr["Image"]);
			$this->missions = $misArr;
		}
	}

	class Launcher {
		public $level, $name, $image, $capacity, $rockets;

		public function __construct($lvl, $type, $loc, $bps){
			$launchArr = getRow(array("Level","Type"), array($lvl,$type), "Launchers");
			if($launchArr == null)
				$launchArr = getRow("Level", $lvl, "Launchers");
			$rocketArr = getRows("Location", $loc, "Rockets");

			$this->level = $lvl;
			$this->name = $launchArr["Name"];
			$this->image = explode("\r\n", $launchArr["Image"]);
			$this->capacity = $launchArr["Capacity"];
			for($r=0; $r<count($rocketArr); $r++)
				$this->rockets[] = new Rocket($rocketArr[$r]["Size"], $rocketArr[$r]["Fairing"], $rocketArr[$r]["Fuselage"], $rocketArr[$r]["Engine"]);
		}
	}

	class Observatory {
		public $level, $name, $image;

		public function __construct($lvl, $type, $bps){
			$obArr = getRow(array("Level","Type"), array($lvl,$type), "Observatories");
			if($obArr == null)
				$obArr = getRow("Level", $lvl, "Observatories");

			$this->level = $lvl;
			$this->name = $obArr["Name"];
			$this->image = explode("\r\n", htmlspecialchars($obArr["Image"]));
		}
	}

	class Factory {
		public $level, $name, $image;

		public function __construct($lvl, $type, $bps){
			$fArr = getRow(array("Level","Type"), array($lvl,$type), "Factories");
			if($fArr == null)
				$fArr = getRow("Level", $lvl, "Factories");

			$this->level = $lvl;
			$this->name = $fArr["Name"];
			$this->image = explode("\r\n", htmlspecialchars($fArr["Image"]));
		}
	}

	class Mine {
		public $level, $name, $image;

		public function __construct($lvl, $type, $energy, $fuel, $ore, $food, $source, $bps){
			$mArr = getRow(array("Level","Type"), array($lvl,"$type"), "Mines");
			if($mArr == null)
				$mArr = getRow("Level", $lvl, "Mines");

			$this->level = $lvl;
			$this->name = $mArr["Name"];
			$this->image = explode("\r\n", htmlspecialchars($mArr["Image"]));
			$this->energyInvestment = $energy;
			$this->foodInvestment = $food;
			$this->fuelInvestment = $fuel;
			$this->oreInvestment = $ore;
			$this->energySource = $source;

			$bp = getUpgradeBlueprint($lvl, $type, $bps);
			$this->blueprint = new Blueprint($bp);
		}
	}

	class Colony {
		public $level, $name, $image;

		public function __construct($lvl, $type, $pop, $bps){
			$cArr = getRow(array("Level","Type"), array($lvl,$type), "Colonies");
			if($cArr == null)
				$cArr = getRow("Level", $lvl, "Colonies");

			$this->level = $lvl;
			$this->population = $pop;
			$this->name = $cArr["Name"];
			$this->image = explode("\r\n", htmlspecialchars($cArr["Image"]));
		}
	}

	class Blueprint {
		public $name, $image;

		public function __construct($bp){
			$tableName = $bp["TableName"];
			$bpArr = getRow(array("Level", "Type"), array($bp["Level"], $bp["Type"]), $tableName);

			$this->name = $bpArr["Name"];
			$this->image = $bpArr["Image"];
		}
	}

	class Rocket {
		public $size, $fairing, $fuselage, $engine;

		public function __construct($s, $nc, $f, $e){
			$ncArr = getRow(array("Size","Level"), array($s,$nc), "Fairings");
			$fArr = getRow(array("Size", "Level"), array($s,$f), "Fuselages");
			$eArr = getRow(array("Size", "Level"), array($s,$e), "Engines");

			$this->size = $s;
			$this->fairing = new Fairing($nc, $ncArr["Name"], $ncArr["Mass"], $ncArr["Drag"], $ncArr["Image"]);
			$this->fuselage = new Fuselage($s, $f, $fArr["Name"]);
			$this->engine = new Engine($e, $eArr["Name"], $eArr["Mass"], $eArr["ISP"], $eArr["Image"], $eArr["Flames"]);
		}
	}

	class Fairing {
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
