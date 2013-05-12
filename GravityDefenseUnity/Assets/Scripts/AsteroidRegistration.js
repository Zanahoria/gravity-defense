#pragma strict

public var type : String = "default";
public var prefab : GameObject = null;

function Start()
{
	if (!LevelDescriptor.asteroidTypes.ContainsKey(type))
		LevelDescriptor.asteroidTypes.Add(type, prefab);
}
