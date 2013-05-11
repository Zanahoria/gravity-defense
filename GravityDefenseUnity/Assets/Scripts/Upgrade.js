#pragma strict

static public var SelectedObject : Upgrade;
public static var ORIGINAL : int = 0;
public static var BOUNCY : int = 1;
public static var DESTRUCTION : int = 2;
public static var LASER : int = 3;
public var TypePlanet : int = ORIGINAL;
public static var BOUNCY_COST = 300;
public static var DESTRUCTION_COST = 300;
public static var LASER_COST = 300;
public var isUpgradable : boolean;

function Start () {
 SelectedObject = null;
 TypePlanet = ORIGINAL;
}

function Update () {
}

function UpgradeObject(type : int)
{
	if (type == DESTRUCTION)
	{
		if (MineralResources.nbResources >= DESTRUCTION_COST)
		{
			TypePlanet = DESTRUCTION;
			Upgrade.SelectedObject.gameObject.GetComponent(Shield).maxShield = 8;
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
		}
		else
			IngameGUI.LackRessources = 1;
	}
	else if (type == LASER)
	{
		if (MineralResources.nbResources >= LASER_COST)
		{
			TypePlanet = LASER;
		}
		else
			IngameGUI.LackRessources = 1;
	}
}

function OnMouseDown()
{
	this.SelectedObject = this;
}