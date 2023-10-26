/**
 * @param {*} centerLat 纬度
 * @param {*} centerLng 经度
 * @param {*} screenWidth 屏幕宽度
 * @param {*} screenHeight 屏幕高度
 * @param {*} zoomLevel 缩放比
 * @returns 
 */
function calculateZoomedBoundsByScreen(
  centerLat,
  centerLng,
  screenWidth,
  screenHeight,
  zoomLevel
) {
  // 计算每个瓦片的宽度和高度
  var tileWidth = 256 * Math.pow(0.5, zoomLevel);
  var tileHeight = 256 * Math.pow(0.5, zoomLevel);

  // 计算屏幕上可见的瓦片数量
  var visibleHorizontalTiles = Math.ceil(screenWidth / tileWidth);
  var visibleVerticalTiles = Math.ceil(screenHeight / tileHeight);

  // 计算经度和纬度的缩放比例
  var lngScale = 360 / (tileWidth * visibleHorizontalTiles);
  var latScale = 360 / (tileHeight * visibleVerticalTiles);

  // 计算经过缩放后的经度范围和纬度范围
  var zoomedLngRange = lngScale * screenWidth;
  var zoomedLatRange = latScale * screenHeight;

  // 计算经过缩放后的经度和纬度范围的起始点和结束点
  var zoomedLngStart = centerLng - zoomedLngRange / 2;
  var zoomedLngEnd = centerLng + zoomedLngRange / 2;
  var zoomedLatStart = centerLat - zoomedLatRange / 2;
  var zoomedLatEnd = centerLat + zoomedLatRange / 2;

  return {
    lngStart: zoomedLngStart,
    lngEnd: zoomedLngEnd,
    latStart: zoomedLatStart,
    latEnd: zoomedLatEnd,
  };
}

// 示例用法
var centerLat = 39.916345; // 故宫中心点纬度
var centerLng = 116.397155; // 故宫中心点经度
var screenWidth = 1920; // 屏幕宽度
var screenHeight = 1080; // 屏幕高度
var zoomLevel = 16; // 缩放级别

var zoomedBounds = calculateZoomedBoundsByScreen(
  centerLat,
  centerLng,
  screenWidth,
  screenHeight,
  zoomLevel
);

console.log(
  "经过缩放后的经度范围:",
  zoomedBounds.lngStart,
  zoomedBounds.lngEnd
);
console.log(
  "经过缩放后的纬度范围:",
  zoomedBounds.latStart,
  zoomedBounds.latEnd
);
