#pragma strict


public var orbit : pickingorbit = null;

private var isDragging : boolean = false;
private var lastPoint : Vector3;
private var lastAngle : float;

function Start () {
}

function Update () {
    if (Input.GetMouseButtonDown(0))
    {
        var hit: RaycastHit;
        var ray = Camera.main.ScreenPointToRay(Input.mousePosition);
        if (Physics.Raycast(ray, hit) && hit.transform.GetInstanceID() == this.transform.GetInstanceID())
        {
			var planets = this.orbit.planetTab;
	       	var vec : Vector3 = ray.direction;
	       	vec *= (this.transform.position.y - ray.origin.y) / vec.y;
	       	var pos : Vector3 = ray.origin + vec;
    		lastPoint = pos;
	       	lastAngle = Mathf.Atan2(pos.x, pos.z);
    		isDragging = true;
        }
    }
    else if (isDragging)
    {
        ray = Camera.main.ScreenPointToRay(Input.mousePosition);
       	vec = ray.direction;
       	vec *= (this.transform.position.y - ray.origin.y) / vec.y;
       	pos = ray.origin + vec;
       	var angle = Mathf.Atan2(pos.x, pos.z);
       	var diffAngle = angle - lastAngle;
       	lastAngle = angle;
		planets = this.orbit.planetTab;
    	for (var i : dragndrop in planets)
    	{
    		if (!i) continue;
    		var anglePlanet = Mathf.Atan2(i.transform.position.x, i.transform.position.z);
    		var newPos : Vector3;
    		newPos.x = i.transform.position.magnitude * Mathf.Sin(anglePlanet + diffAngle);
    		newPos.z = i.transform.position.magnitude * Mathf.Cos(anglePlanet + diffAngle);
    		newPos.y = i.transform.position.y;
	 		i.transform.position = newPos;
    	}
    }
    if (isDragging && Input.GetMouseButtonUp(0))
   	{
    	isDragging = false;
    }
}