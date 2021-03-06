var Constructor = function()
{
    this.init = function(unit)
    {
        unit.setWeapon1ID("WEP_FAI_ARTY");

        unit.setMinRange(2);
        unit.setMaxRange(3);
        unit.setAmmo1(6);
        unit.setMaxAmmo1(6);

        unit.setFuel(70);
        unit.setMaxFuel(70);
        unit.setBaseMovementPoints(6);
        unit.setVision(1);
    };
    // called for loading the main sprite
    this.loadSprites = function(unit)
    {
        // load sprites
        unit.loadSprite("FAI_SUPP_SPARTY", false);
        unit.loadSprite("FAI_SUPP_SPARTY+mask", true);
    };
    this.canAttackStealthedUnit = function(attacker, defender) 
    {
        var defenderID = defender.getUnitID()
        if (defenderID != "FAI_SHIP_SUBMARINE")
        {
            return true;
        }
        return false;
    };
    this.doWalkingAnimation = function(action)
    {
        var unit = action.getTargetUnit();
        var animation = GameAnimationFactory.createWalkingAnimation(unit, action);
        var unitID = unit.getUnitID().toLowerCase();
        animation.loadSprite(unitID + "+mask", true, 1);
        animation.loadSprite(unitID, false, 1);
        animation.setSound("ifv.wav", -2, "mods/CW4X/sounds/");
        return animation;
    };
    this.getMovementType = function()
    {
        return "MOVE_FAI_TREAD";
    };
    this.getBaseCost = function()
    {
        return 7000;
    };
    this.getName = function()
    {
        return qsTr("Mobile Artillery")
    };
    this.canMoveAndFire = function()
    {
        return false;
    };
    this.getDescription = function()
    {
        return qsTr("Need to shoot from a distance while still maintaining mobility? Self-Propelled Artillery units got you covered! They pack a good gun for firing from a distance, but are defenceless up close...");
    };
    this.getUnitType = function()
    {
        return GameEnums.UnitType_Ground;
    };
}

Constructor.prototype = UNIT;
var FAI_SUPP_SPARTY = new Constructor();
