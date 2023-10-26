// map tile 或者是 tile 是地图瓦片
/**
 * 函数接受三个参数：纬度、经度和缩放级别。函数内部使用了公式将经纬度转换为瓦片行列号，并返回一个包含两个元素的数组，分别表示瓦片的列号和行号。
 * @param latitude 纬度
 * @param longitude 经度
 * @param zoom 缩放级别
 * @returns [列号, 行号]
 */
export function latlon_to_tile(latitude, longitude, zoom) {
  const n = Math.pow(2, zoom);
  const xtile = Math.floor(((longitude + 180) / 360) * n);
  const ytile = Math.floor(
    ((1 -
      Math.log(
        Math.tan((latitude * Math.PI) / 180) +
          1 / Math.cos((latitude * Math.PI) / 180)
      ) /
        Math.PI) /
      2) *
      n
  );
  return [xtile, ytile];
}

/**
 * 瓦片行列号和缩放级别转换为经纬度的 TypeScript 代码示例
 * 瓦片的列号、行号和缩放级别。函数内部使用了公式将瓦片行列号转换为经纬度，并返回一个包含两个元素的数组，分别表示纬度和经度
 * @param xtile 瓦片列号
 * @param ytile 瓦片行号
 * @param zoom 缩放级别
 * @returns [纬度, 经度]
 */
export function tile_to_latlon(xtile, ytile, zoom) {
  const n = Math.pow(2, zoom);
  const lon_deg = (xtile / n) * 360 - 180;
  const lat_rad = Math.atan(Math.sinh(Math.PI * (1 - (2 * ytile) / n)));
  const lat_deg = (lat_rad * 180) / Math.PI;
  return [lat_deg, lon_deg];
}
