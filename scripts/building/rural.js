var Constructor = function()
{
    // called for loading the main sprite
    this.loadSprites = function(building, neutral)
    {
        building.loadSprite("farmland", false);
        if (building.getOwnerID() >= 0 && !neutral)
        {
            building.loadSprite("no-own+mask", true);
        }
    };
    this.getName = function()
    {
        return qsTr("Rural");
    };

    this.getDescription = function()
    {
        return "";
    };
    this.startOfTurn = function(building)
    {
    };
    this.getTerrainAnimationForeground = function(unit, terrain)
    {
        return "fore_farm";
    };

    this.getTerrainAnimationBackground = function(unit, terrain)
    {
        return "back_plains";
    };
    
}

Constructor.prototype = BUILDING;
var RURAL = new Constructor();
