#pragma strict

public var explosionPrefab : Transform = null;

private var life : Life;

function Start () {
	life = this.gameObject.GetComponent(Life);
}

function Update () {
	if (life.currentLife == 0)
		{
			if (explosionPrefab)
			    Instantiate(explosionPrefab, this.transform.position, Quaternion.identity);

			var planetList = this.transform.GetComponent(PlanetDragNDrop).orbit.planetTab;
			for (var i = 0; i < planetList.Count; ++i)
			{
				if (planetList[i].transform.GetInstanceID() == this.transform.GetInstanceID())
				{
					planetList.RemoveAt(i);
					break;
				}
			}
			Destroy(this.gameObject);
		}
}