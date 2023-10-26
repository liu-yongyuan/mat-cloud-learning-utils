/**
 * 接受缩放级别 zoom、瓦片的 X 坐标 x 和 Y 坐标 y 作为参数。函数内部根据给定的地理范围和缩放级别计算出瓦片的经纬度范围，并以数组形式返回。
 * @param zoom 缩放
 * @param x 瓦片 x 坐标
 * @param y 瓦片 y 坐标
 * @returns
 */
export function calculateTileBounds(zoom, x, y) {
  /* 在该函数中，minLat、maxLat、minLng 和 maxLng 这些变量分别表示地图范围的最小纬度、最大纬度、最小经度和最大经度。

这些变量用于确定地图的边界范围。通过指定这些边界值，函数可以根据给定的缩放级别、瓦片的坐标来计算该瓦片的经纬度范围。

具体来说，minLat 和 maxLat 决定了地图范围的纬度范围，即从最南端的纬度到最北端的纬度。minLng 和 maxLng 决定了地图范围的经度范围，即从最西端的经度到最东端的经度。

在函数内部，通过将地图范围划分为网格，并根据缩放级别和瓦片的坐标计算每个瓦片的宽度和高度，然后根据这些值计算出瓦片的具体经纬度范围。

总结起来，minLat、maxLat、minLng 和 maxLng 这些变量在函数中起到了定义地图范围边界的作用，以便计算特定瓦片的经纬度范围。 */
  const minLat = 34.0522; // 最小纬度
  const maxLat = 40.7128; // 最大纬度
  const minLng = -118.2437; // 最小经度
  const maxLng = -74.006; // 最大经度

  const n = Math.pow(2, zoom);
  const tileWidth = (maxLng - minLng) / n;
  const tileHeight = (maxLat - minLat) / n;

  const lng1 = minLng + tileWidth * x;
  const lat1 = maxLat - tileHeight * (y + 1);
  const lng2 = minLng + tileWidth * (x + 1);
  const lat2 = maxLat - tileHeight * y;

  return [lng1, lat1, lng2, lat2];
}
