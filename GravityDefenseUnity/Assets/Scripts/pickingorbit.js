#pragma strict

public var planet : PlanetDragNDrop;
public var planetTab = List.<PlanetDragNDrop>();
public static var orbitTab = List.<PickingOrbit>();

function Start () {
	orbitTab.Add(this);
}

function Update ()
{
    if (Input.GetMouseButtonDown(0))
    {
        var hit: RaycastHit;
        var ray = Camera.main.ScreenPointToRay(Input.mousePosition);
        if (Physics.Raycast(ray, hit) && hit.transform.GetInstanceID() == this.transform.GetInstanceID())
        {
			var cost = planet.gameObject.GetComponent(PlanetCost).cost;
			if (MineralResources.nbResources >= cost) {
				MineralResources.nbResources -= cost;
				var length = hit.point.magnitude;
				hit.point *= this.transform.localScale.x * 0.89;
				hit.point /= length;
				var newPlanet = Instantiate(planet, hit.point, Quaternion.identity);
				planetTab.Add(newPlanet);
				newPlanet.orbit = this;
			}
        }
    }
}
