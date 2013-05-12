#pragma strict

var message : String = "default";

function OnGUI ()
{
	var position3D = this.transform.position;
	var position3DRight = this.transform.position + this.transform.localScale;
	var position = Camera.mainCamera.WorldToScreenPoint(position3D);
	var positionRight = Camera.mainCamera.WorldToScreenPoint(position3DRight);
	var dist = (position - positionRight).magnitude;
	position.y = Screen.height - position.y;
	GUI.Label(Rect (position.x + dist, position.y - 50 / 4, 200, 50), message);
}
