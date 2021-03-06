var Constructor = function()
{
    this.init = function(unit)
    {
        unit.setWeapon1ID("WEP_FAI_NAVAL_MED");
        unit.setWeapon2ID("WEP_FAI_AAGUN_HVY");

        unit.setMinRange(1);
        unit.setMaxRange(2);
        unit.setAmmo2(10);
        unit.setMaxAmmo2(10);
        unit.setAmmo1(5);
        unit.setMaxAmmo1(5);

        unit.setFuel(70);
        unit.setMaxFuel(70);
        unit.setBaseMovementPoints(5);
        unit.setVision(6)
    };
    // called for loading the main sprite
    this.loadSprites = function(unit)
    {
        // load sprites
        unit.loadSprite("FAI_SHIP_CRUISER", false);
        unit.loadSprite("FAI_SHIP_CRUISER+mask", true);
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
        return 14000;
    };
    this.getName = function()
    {
        return qsTr("Cruiser")
    };
    this.canMoveAndFire = function()
    {
        return true;
    };
    this.getDescription = function()
    {
        return qsTr("The Older Brother of the Destroyer. Stronger against ships than it's younger sibling, it's also the best anti-air ship available. It doesn't have the anti-submarine capabilities of the Destroyer, however...");
    };
    this.getUnitType = function()
    {
        return GameEnums.UnitType_Naval;
    };
}

Constructor.prototype = UNIT;
var FAI_SHIP_CRUISER = new Constructor();
