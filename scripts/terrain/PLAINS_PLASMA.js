PLAINS_PLASMA.getName = function()
{
    return qsTr("Scorched");
};
PLAINS_PLASMA.getTerrainAnimationForeground = function(unit, terrain)
{
    return "fore_scorched";
};
PLAINS_PLASMA.getTerrainAnimationBackground = function(unit, terrain)
{
    return "back_scorched";
};
PLAINS_PLASMA.init = function (terrain)
{
    terrain.setTerrainName(PLAINS_PLASMA.getName());
    terrain.setVisionHigh(0);
};