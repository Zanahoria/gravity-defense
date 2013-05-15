#pragma strict

var target1 : GameObject;
var target2 : GameObject;

function Update ()
{
	if (target1 && target2)
	{
		var linerd : LineRenderer = this.GetComponent(LineRenderer);
		linerd.SetPosition(0, target1.transform.position);
		linerd.SetPosition(1, target2.transform.position);
	}
}