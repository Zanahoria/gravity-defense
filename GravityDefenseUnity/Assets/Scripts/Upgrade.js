#pragma strict

static public var SelectedObject : Upgrade = null;
public static var ORIGINAL : int = 0;
public static var BOUNCY : int = 1;
public static var DESTRUCTION : int = 2;
public static var LASER : int = 3;
public var TypePlanet : int = ORIGINAL;
public static var BOUNCY_COST = 300;
public static var DESTRUCTION_COST = 300;
public static var LASER_COST = 150;
public var isUpgradable : boolean;
public var isSalable : boolean;

function Start () {
 TypePlanet = ORIGINAL;
}

function UpgradeObject(type : int)
{
	if (type == DESTRUCTION)
	{
		if (MineralResources.nbResources >= DESTRUCTION_COST)
		{
			TypePlanet = DESTRUCTION;
			Upgrade.SelectedObject.gameObject.GetComponent(Shield).maxShield = 8;
			MineralResources.nbResources -= DESTRUCTION_COST;
		}
		else
			IngameGUI.LackRessources = 1;
	}
	else if (type == BOUNCY)
	{
		if (MineralResources.nbResources >= BOUNCY_COST)
		{
			TypePlanet = BOUNCY;
			Upgrade.SelectedObject.gameObject.GetComponent(Shield).maxShield = 4;
			MineralResources.nbResources -= BOUNCY_COST;
		}
		else
			IngameGUI.LackRessources = 1;
	}
	else if (type == LASER)
	{
		if (MineralResources.nbResources >= LASER_COST)
		{
			TypePlanet = LASER;
			Upgrade.SelectedObject.gameObject.GetComponent(Laser).activated = true;
			MineralResources.nbResources -= LASER_COST;
		}
		else
			IngameGUI.LackRessources = 1;
	}
}

function OnMouseUp()
{
	var dragNDrop = this.gameObject.GetComponent(PlanetDragNDrop);
	if (dragNDrop == null || !dragNDrop.hasBeenMoved)
		this.SelectedObject = this;
}