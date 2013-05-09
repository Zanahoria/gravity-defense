#pragma strict

public var duration : float = 2.0;
private var time : float;

function Start () {
	time = Time.timeSinceLevelLoad;
}

function Update () {
	if (Time.timeSinceLevelLoad > time + duration)
		Destroy(gameObject);
}