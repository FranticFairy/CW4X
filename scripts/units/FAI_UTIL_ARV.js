var Constructor = function()
{
    this.init = function(unit)
    {
        unit.setAmmo1(1);
        unit.setMaxAmmo1(1);
        unit.setWeapon1ID("");

        unit.setFuel(80);
        unit.setMaxFuel(80);
        unit.setBaseMovementPoints(6);
        unit.setVision(1)
    };
    // called for loading the main sprite
    this.loadSprites = function(unit)
    {
        // load sprites
        unit.loadSprite("FAI_UTIL_ARV", false);
        unit.loadSprite("FAI_UTIL_ARV+mask", true);
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
    this.getActions = function()
    {
        // returns a string id list of the actions this unit can perform
        return "ACTION_BUILD_INFRA_STREET,ACTION_BUILD_INFRA_BRIDGE,ACTION_BUILD_INFRA_RAILWAY,ACTION_BUILD_INFRA_RAILCROSS,ACTION_BUILD_INFRA_RAILBRIDGE,ACTION_BUILD_TEMP_AIRPORT,ACTION_BUILD_TEMP_HARBOUR,ACTION_PLACE_LANDMINE,ACTION_JOIN,ACTION_LOAD,ACTION_UNLOAD,ACTION_WAIT";
    };
    this.getMovementType = function()
    {
        return "MOVE_FAI_TREAD";
    };
    this.getBaseCost = function()
    {
        return 5500;
    };
    this.getName = function()
    {
        return qsTr("Engineering Vehicle")
    };
    this.canMoveAndFire = function()
    {
        return true;
    };
    this.getDescription = function()
    {
        return qsTr("Engineer teams are reliable non-combat troops that can build roads, railroads, airstrips and docks.");
    };
    this.getUnitType = function()
    {
        return GameEnums.UnitType_Ground;
    };
}

Constructor.prototype = UNIT;
var FAI_UTIL_ARV = new Constructor();
