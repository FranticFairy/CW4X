var Constructor = function()
{
    // called for loading the main sprite
    this.loadSprites = function(building, neutral)
    {
        building.loadSprite("fire", false);
        if (building.getOwnerID() >= 0 && !neutral)
        {
            building.loadSprite("no-own+mask", true);
        }
    };
    
    this.getBaseTerrain = function(building)
    {
        return ["FOREST"];
    };
    this.getName = function()
    {
        return qsTr("Fire");
    };

    this.getDescription = function()
    {
        return "";
    };
    this.startOfTurn = function(building)
    {
        ACTION_HANDLER_FIRE.perform(building);
    };

    this.getTerrainAnimationForeground = function(unit, terrain)
    {
        return "fore_scorched";
    };
    this.getTerrainAnimationBackground = function(unit, terrain)
    {
        return "back_scorched";
    };

    this.getMiniMapIcon = function()
    {
        return "minimap_fire";
    };
    
}

Constructor.prototype = BUILDING;
var BURNING = new Constructor();
