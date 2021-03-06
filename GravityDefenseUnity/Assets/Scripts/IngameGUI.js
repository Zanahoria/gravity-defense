#pragma strict

static var speed = 1;
static var LackRessources : int = 0;
static var buttonPushed : boolean = false;

public var objectSelectedInfosStyle : GUIStyle;
public var lackresourcesStyle : GUIStyle;
public var centerTextStyle : GUIStyle;
public var globalInfosStyle : GUIStyle;
public var windowStyle : GUIStyle;
public var scoreStyle : GUIStyle;
public var scoreOperationStyle : GUIStyle;

public var nbEnnemiesDestruct : int = -1;

static var upgradeRect : Rect = Rect (Screen.width - 200, 10, 210, 244);

function Start () {
	nbEnnemiesDestruct = -1;
	LackRessources = 0;
}

function Update () {
    if (Input.GetKeyDown(UnityEngine.KeyCode.Escape) && !Sun.isDead &&
    	LevelDescriptor.state != LevelDescriptor.ISFINISHED)
    {
    	Sun.sun.GetComponent(Life).currentLife = 0;
    }
}

function OnGUI ()
{
	// speed setting button
	if (speed == 1) {
		if (GUI.Button(Rect (10, 70, 90, 50), "Speed x4")) {
			speed = 4;
			Time.timeScale = 4;
			ignoreEvent();
		}
	}
	else {
		if (GUI.Button(Rect (10, 70, 90, 50), "Speed x1")) {
			speed = 1;
			Time.timeScale = 1;
			ignoreEvent();
		}
	}
	
	// global infos display (resources, life, rounds)
	GUI.Label(Rect (110, 10, 100, 50), "Resources: " + MineralResources.nbResources, globalInfosStyle);
	if (!Sun.isDead)
		GUI.Label(Rect (110, 30, 100, 50), "Sun: " + Sun.sun.gameObject.GetComponent(Life).currentLife + "HP", globalInfosStyle);
	else
		GUI.Label(Rect (110, 30, 100, 50), "Sun: " + 0 + "HP", globalInfosStyle);

	GUI.Label(Rect (110, 50, 100, 50), "Round " + (LevelDescriptor.roundId + 1) + "/" + LevelDescriptor.rounds.Count, globalInfosStyle);
	if (LevelDescriptor.roundId < LevelDescriptor.rounds.Count)
		GUI.Label(Rect (Screen.width / 2.0 - 50, 10, 100, 50), LevelDescriptor.rounds[LevelDescriptor.roundId].name, centerTextStyle);
	
	if (LevelDescriptor.state == LevelDescriptor.ISWAITING)
	{
		// next wave button
		if (!Sun.isDead && GUI.Button(Rect (10,10,90,50), "Next wave !"))
		{
			LevelDescriptor.setState(LevelDescriptor.ISROUNDING);
			ignoreEvent();
    	}
   	}
	
	// life and upgrades bought display
	if (Upgrade.SelectedObject != null)
	{
		var nameDefinition = Upgrade.SelectedObject.gameObject.GetComponent(NameDefinition);
		var name : String = "";
		if (nameDefinition)
			name = nameDefinition.objectName + " - ";
	}
	
	// need more resources display
	if (LackRessources >= 1)
	{
		GUI.Label(Rect (250, 10, 200, 50), "You need more ressources", lackresourcesStyle);
		if (LackRessources == 1)
			WaitForIt();
		LackRessources = 2;
	}
	
	// retry game button and score display
	
	if (Sun.isDead || LevelDescriptor.state == LevelDescriptor.ISFINISHED)
	{
		if (nbEnnemiesDestruct == -1)
			nbEnnemiesDestruct = StatInfos.nbAsteroidDestroyed;
		var sunLife = 0;
		if(!Sun.isDead)
			sunLife = Sun.sun.GetComponent(Life).currentLife;
		GUI.Label(Rect (Screen.width / 2 - 100 / 2, Screen.height / 2 - 12 / 2 - 50 / 2 - 10, 100, 12), "" + nbEnnemiesDestruct +
			" asteroids destroyed + 10 * " + (LevelDescriptor.roundId + 1) + " rounds + 100 * " + sunLife + " HP", scoreOperationStyle);
		GUI.Label(Rect (Screen.width / 2 - 100 / 2, Screen.height / 2 - 50 / 2, 100, 50), "" + (nbEnnemiesDestruct + 10 * (LevelDescriptor.roundId + 1) + 100 * sunLife), scoreStyle);
		if (GUI.Button(Rect (Screen.width / 2 - 110 / 2, Screen.height / 2 - 40 / 2 + 70, 110, 40), "Retry"))
			Application.LoadLevel("gravitydefense");
		else if (GUI.Button(Rect (Screen.width / 2 - 110 / 2, Screen.height / 2 - 40 / 2 + 70 + 42, 110, 40), "Back to menu"))
			Application.LoadLevel("Menu");
	}

	// debug button to give resources
//	if (GUI.Button(Rect (10, Screen.height - 60, 90, 50), "Add 100\nRessources"))
//	{
//		MineralResources.nbResources += 100;
//		ignoreEvent();
//	}
		
	// create upgrade window
	if (Upgrade.SelectedObject != null)
		GUI.Window(0, upgradeRect, DoMyUpgradeWindow, "");
}

function ignoreEvent()
{
	buttonPushed = true;
	if (Event.current.type != EventType.Layout && Event.current.type != EventType.Repaint)
	    Event.current.Use ();
}

function DoMyUpgradeWindow (windowID : int)
{
	GUI.Label(Rect (10, 0, 190, 16), Upgrade.SelectedObject.gameObject.GetComponent(NameDefinition).objectName, globalInfosStyle);
	GUI.Label(Rect (0, 0, 190, 16), Upgrade.SelectedObject.gameObject.GetComponent(Life).currentLife + "HP", objectSelectedInfosStyle);

	if (Upgrade.SelectedObject.TypePlanet == Upgrade.BOUNCY)
	{
		GUI.Label(Rect (10, 22, 190, 16), "Bouncy Shield", globalInfosStyle);
		GUI.Label(Rect (0, 22, 190, 16), Upgrade.SelectedObject.gameObject.GetComponent(Shield).currentShield + "HP", objectSelectedInfosStyle);
	}
	else if (Upgrade.SelectedObject.TypePlanet == Upgrade.DESTRUCTION)
	{
		GUI.Label(Rect (10, 22, 190, 16), "Destruction Shield", globalInfosStyle);
		GUI.Label(Rect (0, 22, 190, 16), Upgrade.SelectedObject.gameObject.GetComponent(Shield).currentShield + "HP", objectSelectedInfosStyle);
	}
	else if (Upgrade.SelectedObject.TypePlanet == Upgrade.LASER)
	{
		GUI.Label(Rect (10, 22, 190, 16), "Laser Activated", globalInfosStyle);
	}
	if (LevelDescriptor.state == LevelDescriptor.ISWAITING)
	{
		if (Upgrade.SelectedObject.isUpgradable && Upgrade.SelectedObject.TypePlanet == Upgrade.ORIGINAL)
		{
			if (GUI.Button(Rect (1, 46 + 50, 198, 50), "Add destruction\nShield  300 RES"))
			{
				Upgrade.SelectedObject.UpgradeObject(Upgrade.DESTRUCTION);
				ignoreEvent();
			}
			if (GUI.Button(Rect (1, 46 + 100, 198, 50), "Add bouncy\nShield  300 RES"))
			{
				Upgrade.SelectedObject.UpgradeObject(Upgrade.BOUNCY);
				ignoreEvent();
			}
			if (GUI.Button(Rect (1, 46 + 150, 198, 50), "Add Lasers\n150 RES"))
			{
				Upgrade.SelectedObject.UpgradeObject(Upgrade.LASER);
				ignoreEvent();
			}
		}
		if (Upgrade.SelectedObject.isSalable && GUI.Button(Rect (1, 46, 198, 50), "Sell"))
		{
			Upgrade.SelectedObject.gameObject.GetComponent(Life).currentLife = 0;
			ignoreEvent();
		}
	}
}

function WaitForIt()
{
	yield WaitForSeconds(5 * speed);
	LackRessources = 0;
}
