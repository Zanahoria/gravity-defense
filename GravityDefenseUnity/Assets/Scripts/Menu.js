#pragma strict

public var Asteroid : GameObject;
public var timeSince : float;
public var titleStyle : GUIStyle;

function Start () {
timeSince = Time.timeSinceLevelLoad;
Time.timeScale = 1;
	var asteroidTab = LevelDescriptor.asteroidTab;
	for (var asteroid in asteroidTab)
	{
		if (asteroid == null)
		{
			asteroidTab.Clear();
			break;
		}
	}
}

function Update () {
	if (Time.timeSinceLevelLoad - timeSince > 0.5)
	{
 	var angle : float = Random.value * (2 * 3.14);
 	var Dist : float = Random.Range(40, 70);
	var asteroid = Instantiate(Asteroid, Vector3(Dist * Mathf.Cos(angle), 0,
   	Dist * Mathf.Sin(angle)),  Quaternion.identity);
   	asteroid.GetComponent(Gravity).gravityMultiplier = 1;

	var size = Random.Range(4, 16);
   	asteroid.GetComponent(Life).maxLife = size;
	asteroid.GetComponent(Life).currentLife = size;
	asteroid.transform.localScale *= size;
	//asteroid.GetComponent(AsteroidSettings).initialVelocity = Random.Range(3, 10);
	//asteroid.GetComponent(AsteroidSettings).DIST_DESPAWN = 80;
	Destroy(asteroid.GetComponent(RegisterLastVelocity));
	timeSince = Time.timeSinceLevelLoad;
	}
}	

function OnGUI()
{
	GUI.Label(Rect (Screen.width / 2 - 100 / 2, 10, 100, 50), "Gravity Defense", titleStyle);

	if (GUI.Button(Rect (Screen.width / 2 - 200 / 2, Screen.height / 2 - 65, 200, 40), "Level 1"))
	{
			LevelDescriptor.scriptName = "Level1";
			Application.LoadLevel("gravitydefense");
	}
	else if (GUI.Button(Rect (Screen.width / 2 - 200 / 2, Screen.height / 2 - 20, 200, 40), "Level 2"))
	{
			LevelDescriptor.scriptName = "Level2";
			Application.LoadLevel("gravitydefense");
	}
	else if (GUI.Button(Rect (Screen.width / 2 - 200 / 2, Screen.height / 2 + 25, 200, 40), "Quit"))
			Application.Quit();
}