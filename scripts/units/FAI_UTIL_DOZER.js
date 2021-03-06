var Constructor = function()
{
    this.init = function(unit)
    {
        unit.setAmmo1(1);
        unit.setMaxAmmo1(1);
        unit.setWeapon1ID("");
        unit.setWeapon2ID("WEP_FAI_MINE");
        unit.setAmmo2(1);
        unit.setMaxAmmo2(1);
        
        unit.setFuel(80);
        unit.setMaxFuel(80);
        unit.setBaseMovementPoints(5);
        unit.setVision(1)
    };
    // called for loading the main sprite
    this.loadSprites = function(unit)
    {
        // load sprites
        unit.loadSprite("FAI_UTIL_DOZER", false);
        unit.loadSprite("FAI_UTIL_DOZER+mask", true);
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
        return "ACTION_BUILD_BUILDING_FACTORY,ACTION_BUILD_BUILDING_AIRPORT,ACTION_BUILD_BUILDING_HARBOUR,ACTION_BUILD_BUILDING_STATION,ACTION_BUILD_BUILDING_INDUSTRY,ACTION_BUILD_BUILDING_TRADEHUB,ACTION_BUILD_BUILDING_CANAL,ACTION_JOIN,ACTION_LOAD,ACTION_UNLOAD,ACTION_WAIT";
    };
    this.getMovementType = function()
    {
        return "MOVE_FAI_LIGHT_TREAD";
    };
    this.getBaseCost = function()
    {
        return 5500;
    };
    this.getName = function()
    {
        return qsTr("Dozer")
    };
    this.canMoveAndFire = function()
    {
        return true;
    };
    this.getDescription = function()
    {
        return qsTr("For building up your empire, dedicated construction teams are your best bet. They can build anything from Canals to Factories and everything in-between.");
    };
    this.getUnitType = function()
    {
        return GameEnums.UnitType_Ground;
    };
}

Constructor.prototype = UNIT;
var FAI_UTIL_DOZER = new Constructor();
