var Constructor = function()
{
    this.init = function(unit)
    {
        unit.setMinRange(1);
        unit.setMaxRange(1);

        unit.setAmmo1(10);
        unit.setMaxAmmo1(10);
        unit.setWeapon1ID("WEP_FAI_AAGUN");

        unit.setAmmo2(1);
        unit.setMaxAmmo2(1);
        unit.setWeapon2ID("");

        unit.setFuel(70);
        unit.setMaxFuel(70);
        unit.setBaseMovementPoints(4);
        unit.setVision(2)
    };
    // called for loading the main sprite
    this.loadSprites = function(unit)
    {
        // load sprites
        unit.loadSprite("FAI_SHIP_CARRIER", false);
        unit.loadSprite("FAI_SHIP_CARRIER+mask", true);
    };

    this.startOfTurn = function(unit)
    {
        // pay unit upkeep
        var fuelCosts = 1 + unit.getFuelCostModifier(Qt.point(unit.getX(), unit.getY()), 1);
        if (fuelCosts < 0)
        {
            fuelCosts = 0;
        }
        unit.setFuel(unit.getFuel() - fuelCosts);
        if(unit.getFuel() < 0) {
            unit.setFuel(0);
        }
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
    this.createExplosionAnimation = function(x, y, unit)
    {
        var animation = GameAnimationFactory.createAnimation(x, y);
        animation.addSprite("explosion+water", -map.getImageSize() / 2, -map.getImageSize(), 0, 1.5);
        audio.playSound("explosion+water.wav");
        return animation;
    };
    this.doWalkingAnimation = function(action)
    {
        var unit = action.getTargetUnit();
        var animation = GameAnimationFactory.createWalkingAnimation(unit, action);
        var unitID = unit.getUnitID().toLowerCase();
        animation.loadSprite(unitID + "+mask", true, 1);
        animation.loadSprite(unitID, false, 1);
        animation.setSound("moveship.wav", -2);
        return animation;
    };
    this.getTerrainAnimationBase = function(unit, terrain)
    {
        return "base_air";
    };

    this.getTerrainAnimationForeground = function(unit, terrain)
    {
        return "fore_sea";
    };

    this.getTerrainAnimationBackground = function(unit, terrain)
    {
        return "back_sea";
    };
    this.getMovementType = function()
    {
        return "MOVE_FAI_SHIP";
    };
    this.getBaseCost = function()
    {
        return 15000;
    };
    this.getName = function()
    {
        return qsTr("Carrier")
    };
    this.canMoveAndFire = function()
    {
        return true;
    };
    this.getActions = function()
    {
        // returns a string id list of the actions this unit can perform
        return "ACTION_FIRE,ACTION_BUILD_FIGHTER,ACTION_BUILD_NAVJET,ACTION_JOIN,ACTION_LOAD,ACTION_UNLOAD,ACTION_WAIT,ACTION_CO_UNIT_0,ACTION_CO_UNIT_1";
    },
    this.getLoadingPlace = function()
    {
        return 2;
    };
    this.getTransportUnits = function()
    {
        return ["FAI_PLANE_FIGHTER","FAI_PLANE_NAVJET","FAI_PLANE_SEAPLANE","FAI_HELI_GUNSHIP","FAI_HELI_VHC","FAI_PLANE_TANKBUSTER","FAI_PLANE_STEALTHFIGHTER"];
    };
    this.getDescription = function()
    {
        return qsTr("For bringing your planes with you across the sea! Carriers can carry up to two non-bomber air units, but are only armed with puny anti-aircraft guns...");
    };
    this.getUnitType = function()
    {
        return GameEnums.UnitType_Naval;
    };
}

Constructor.prototype = UNIT;
var FAI_SHIP_CARRIER = new Constructor();
