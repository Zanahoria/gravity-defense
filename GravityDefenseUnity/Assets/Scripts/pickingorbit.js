#pragma strict

//var orbit1 = 1.0;
//var orbit2 = 2.0;
//var orbit3 = 3.0;
public var planetPush : dragndrop;
public var planetPull : dragndrop;
public var gui : IngameGUI;
public var planetTab = List.<dragndrop>();
public static var orbitTab = List.<pickingorbit>();

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
			var length = hit.point.magnitude;
			hit.point *= this.transform.localScale.x * 0.89;
			hit.point /= length;
			var selectedPlanet : dragndrop;
			if (IngameGUI.selectedPlanet == 0)
				selectedPlanet = planetPush;
			else if (IngameGUI.selectedPlanet == 1)
				selectedPlanet = planetPull;
			var life = selectedPlanet.gameObject.GetComponent(Life);
			var cost = life.cost;
			if (gui && gui.RemoveResource(cost)) {
				var newPlanet = Instantiate(selectedPlanet, hit.point, Quaternion.identity);
				planetTab.Add(newPlanet);
				newPlanet.orbit = this;
			}
        }
    }
}
