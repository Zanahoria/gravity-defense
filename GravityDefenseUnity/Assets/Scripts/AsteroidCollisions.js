#pragma strict

function Start () {

}

function getDamage(life : Life, shield : Shield, type : Upgrade)
{
	if (type.TypePlanet == Upgrade.BOUNCY && shield.currentShield)
		return 1;
	else
		return life.currentLife + shield.currentShield;
}

function OnCollisionEnter(collision : Collision)
{
	var life1 : Life = this.gameObject.GetComponent(Life);
	var life2 : Life = collision.gameObject.GetComponent(Life);
	var shield1 : Shield = this.gameObject.GetComponent(Shield);
	var shield2 : Shield = collision.gameObject.GetComponent(Shield);
	var type1 : Upgrade = this.gameObject.GetComponent(Upgrade);
	var type2 : Upgrade = collision.gameObject.GetComponent(Upgrade);
	var DMGto1 : int = 0;
	var DMGto2 : int = 0;

	if (type1.TypePlanet != Upgrade.BOUNCY && type2.TypePlanet != Upgrade.BOUNCY)
	{
		var regist1 = this.GetComponent(RegisterLastVelocity);
		var regist2 = collision.gameObject.GetComponent(RegisterLastVelocity);
		if (regist1)
			regist1.SetToLastVelocity();
		if (regist2)
			regist2.SetToLastVelocity();
	}

	DMGto2 = getDamage(life1, shield1, type1);
	DMGto1 = getDamage(life2, shield2, type2);
	
	var tmp : int = shield1.currentShield - DMGto1;
	shield1.AddRemoveShield(-DMGto1);
	if (tmp < 0)
		life1.AddRemoveLife(tmp);

	tmp = shield2.currentShield - DMGto2;
	shield2.AddRemoveShield(-DMGto2);
	if (tmp < 0)
		life2.AddRemoveLife(tmp);
}

function Update () {

}