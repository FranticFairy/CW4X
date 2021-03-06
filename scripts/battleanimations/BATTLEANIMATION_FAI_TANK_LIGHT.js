var Constructor = function()
{
    this.getMaxUnitCount = function()
    {
        return 5;
    };

    this.loadStandingAnimation = function(sprite, unit, defender, weapon)
    {
        var player = unit.getOwner();
        var armyName = player.getArmy().toLowerCase();
        var identifier = "";
        if (armyName === "ge" || armyName === "ac")
        {
            identifier = "+1";
        } else if (armyName === "yc" || armyName === "bd") {
            identifier = "+2";
        } else if (armyName === "bh") {
            identifier = "+3";
        } else if (armyName === "ma" || armyName === "bg") {
            identifier = "+4";
        } else if (armyName === "dm") {
            identifier = "+5";
        }

        sprite.loadSprite("FAI_TANK_LIGHT" + identifier,  false, BATTLEANIMATION_FAI_TANK_LIGHT.getMaxUnitCount(), Qt.point(-5, 5));
        sprite.loadSprite("FAI_TANK_LIGHT" + identifier + "+mask",  true, BATTLEANIMATION_FAI_TANK_LIGHT.getMaxUnitCount(), Qt.point(-5, 5));
    };

    this.loadFireAnimation = function(sprite, unit, defender, weapon)
    {
        BATTLEANIMATION_FAI_TANK_LIGHT.loadStandingAnimation(sprite, unit, defender, weapon);
        // if (weapon === 0) {
        //     // // gun
    
        //     sprite.loadSound("tank_shot.wav", 1, "mods/fai_total_overhaul/sounds/", 0);
        // } else {
        //     // mg
        //     sprite.loadSound("hmg.wav", 1, "mods/fai_total_overhaul/sounds/", 0);
    
        // }
    };

    this.getFireDurationMS = function()
    {
        // the time will be scaled with animation speed inside the engine
        return 500;
    };
};

Constructor.prototype = BATTLEANIMATION;
var BATTLEANIMATION_FAI_TANK_LIGHT = new Constructor();
