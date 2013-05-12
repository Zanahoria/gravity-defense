#pragma strict

public var planet : PlanetDragNDrop;
public var planetGhost : Transform;
public var planetTab = List.<PlanetDragNDrop>();
public static var orbitTab = List.<PickingOrbit>();
public static var planetGhostInstance : Transform;
public static var currentOrbitHover : PickingOrbit;

function Start () {
	for (var orbit in orbitTab)
	{
		if (orbit == null)
		{
			orbitTab.Clear();
			break;
		}
	}
	orbitTab.Add(this);
}

function isTouchingPlanet(position : Vector3)
{
	for (var planet : PlanetDragNDrop in planetTab)
	{
		var dist : float = (position - planet.transform.position).magnitude;
		if (dist < planet.transform.localScale.x)
			return true;
	}
	return false;
}

function Update ()
{
    var hit: RaycastHit;
    var ray = Camera.main.ScreenPointToRay(Input.mousePosition);
    if (Physics.Raycast(ray, hit) && hit.transform.GetInstanceID() == this.transform.GetInstanceID())
    {
		var length = hit.point.magnitude;
		hit.point *= this.transform.localScale.x * 0.89;
		hit.point /= length;
		if (!isTouchingPlanet(hit.point))
		{
			if (!planetGhostInstance)
			{
				planetGhostInstance = Instantiate(planetGhost, hit.point, Quaternion.identity);
				currentOrbitHover = this;
			}
			else
				planetGhostInstance.position = hit.point;
		}
		if (Input.GetMouseButtonDown(0) && planetGhostInstance)
		{
			var cost = planet.gameObject.GetComponent(PlanetCost).cost;
			if (MineralResources.nbResources >= cost) {
				MineralResources.nbResources -= cost;
				var newPlanet = Instantiate(planet, planetGhostInstance.position, Quaternion.identity);
				planetTab.Add(newPlanet);
				newPlanet.orbit = this;
			}
        }
    }
}
