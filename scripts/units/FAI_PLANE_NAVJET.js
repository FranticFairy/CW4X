var Constructor = function()
{
    this.init = function(unit)
    {
        unit.setMinRange(1);
        unit.setMaxRange(1);
        unit.setWeapon1ID("WEP_FAI_AIM");
        unit.setWeapon2ID("WEP_FAI_ASM");

        unit.setAmmo1(3);
        unit.setMaxAmmo1(3);
        unit.setAmmo2(2);
        unit.setMaxAmmo2(2);
        unit.setFuel(50);
        unit.setMaxFuel(50);
        unit.setBaseMovementPoints(6);
        unit.setVision(2);
        unit.setVisionHigh(50);
    };
    // called for loading the main sprite
    this.loadSprites = function(unit)
    {
        // load sprites
        unit.loadSprite("FAI_PLANE_NAVJET", false);
        unit.loadSprite("FAI_PLANE_NAVJET+mask", true);
    };
    this.getMovementType = function()
    {
        return "MOVE_FAI_AIR";
    };
    this.getBaseCost = function()
    {
        return 13500;
    };
    this.getName = function()
    {
        return qsTr("Naval Jet")
    };
    this.startOfTurn = function(unit)
    {
        // pay unit upkeep
        var fuelCosts = 3 + unit.getFuelCostModifier(Qt.point(unit.getX(), unit.getY()), 5);
        if (fuelCosts < 0)
        {
            fuelCosts = 0;
        }
        unit.setFuel(unit.getFuel() - fuelCosts);
    };
    this.createExplosionAnimation = function(x, y, unit)
    {
        var animation = GameAnimationFactory.createAnimation(x, y);
        animation.addSprite("explosion+air", -map.getImageSize() / 2, -map.getImageSize(), 0, 1.5);
        audio.playSound("explosion+air.wav");
        return animation;
    };
    this.doWalkingAnimation = function(action)
    {
        var unit = action.getTargetUnit();
        var animation = GameAnimationFactory.createWalkingAnimation(unit, action);
        var unitID = unit.getUnitID().toLowerCase();
        animation.loadSprite(unitID + "+mask", true, 1);
        animation.loadSprite(unitID, false, 1);
        animation.setSound("jet.wav", -2, "mods/CW4X/sounds/");
        return animation;
    };
    this.canMoveAndFire = function()
    {
        return true;
    };
    this.useTerrainDefense = function()
    {
        return false;
    };

    this.getTerrainAnimationBase = function(unit, terrain)
    {
        return "base_air";
    };

    this.getTerrainAnimationForeground = function(unit, terrain)
    {
        return "";
    };

    this.getTerrainAnimationBackground = function(unit, terrain)
    {
        return "";
    };
    this.getDescription = function()
    {
        return qsTr("Smaller than regular fighters, Naval Fighters are equipped with ASMs in addition to AIMs, but are rather vulnerable to anti-aircraft weapons.");
    };
    this.getUnitType = function()
    {
        return GameEnums.UnitType_Air;
    };
}

Constructor.prototype = UNIT;
var FAI_PLANE_NAVJET = new Constructor();
