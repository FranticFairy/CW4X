var Constructor = function()
{
    this.getMaxUnitCount = function()
    {
        return 1;
    };

    this.loadStandingAnimation = function(sprite, unit, defender, weapon)
    {
        sprite.loadSprite("FAI_LAUNCHER_WMD",  false, BATTLEANIMATION_FAI_LAUNCHER_WMD.getMaxUnitCount(), Qt.point(25, 15));
        sprite.loadSprite("FAI_LAUNCHER_WMD+mask",  true, BATTLEANIMATION_FAI_LAUNCHER_WMD.getMaxUnitCount(), Qt.point(25, 15));
    };

    this.loadFireAnimation = function(sprite, unit, defender, weapon)
    {
        BATTLEANIMATION_FAI_LAUNCHER_WMD.loadStandingAnimation(sprite, unit, defender, weapon);
        sprite.loadSound("fire-nuke-explode.wav", 1, "mods/CW4X/sounds/", 0);
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
var BATTLEANIMATION_FAI_LAUNCHER_WMD = new Constructor();
