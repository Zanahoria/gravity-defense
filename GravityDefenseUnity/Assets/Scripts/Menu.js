#pragma strict

public var Asteroid : GameObject;
public var timeSince : float;

function Start () {
timeSince = Time.timeSinceLevelLoad;
Time.timeScale = 1;
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
	if (GUI.Button(Rect (Screen.width / 2 - 90 / 2, Screen.height / 2 - 65, 90, 40), "Level 1"))
	{
			LevelDescriptor.scriptName = "Level1";
			Application.LoadLevel("gravitydefense");
	}
	else if (GUI.Button(Rect (Screen.width / 2 - 90 / 2, Screen.height / 2 - 20, 90, 40), "Level 2"))
	{
			LevelDescriptor.scriptName = "Level2";
			Application.LoadLevel("gravitydefense");
	}
	else if (GUI.Button(Rect (Screen.width / 2 - 90 / 2, Screen.height / 2 + 25, 90, 40), "Quit"))
			Application.Quit();
}