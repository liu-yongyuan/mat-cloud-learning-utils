/**
 * 函数返回给定缩放级别下的经度范围，即最小值和最大值。
 * @param {*} zoom 
 * @returns 
 */
function tileLngRange(zoom) {
  const lngMin = -180.0;
  const lngMax = 180.0;
  return [lngMin, lngMax];
}

/**
 * 函数返回给定缩放级别下的纬度范围，即最小值和最大值。
 * @param {*} zoom 
 * @returns 
 */
function tileLatRange(zoom) {
  const latMin = -90.0;
  const latMax = 90.0;
  return [latMin, latMax];
}

/**
 * 函数接受瓦片的行和列索引以及缩放级别，并返回该瓦片的经纬度范围，即最小经度、最小纬度、最大经度和最大纬度。
 * 
 * 当我们使用地图服务时，经常需要知道每个瓦片的经纬度范围（边界框），以便进行地图渲染、数据查询或其他地理空间计算。tileBbox 函数用于计算给定瓦片的经纬度范围。
具体来说，tileBbox 函数接受瓦片的行和列索引以及缩放级别作为输入，并返回该瓦片的经纬度范围，即最小经度、最小纬度、最大经度和最大纬度。
这个函数的用处在于：
地图渲染：在地图上显示瓦片时，需要知道每个瓦片的经纬度范围，以便正确地将其放置在地图上的相应位置。通过调用 tileBbox 函数，可以获取每个瓦片的经纬度范围，并将其用于地图渲染算法。
数据查询：当我们需要从地图服务中查询特定经纬度范围内的数据时，可以使用 tileBbox 函数计算出目标区域的经纬度范围。然后，我们可以将这些范围作为查询条件，从数据库或其他数据源中检索符合条件的数据。
空间分析：在进行地理空间分析时，有时需要将地图划分为瓦片，并对每个瓦片进行处理。通过 tileBbox 函数，我们可以获取每个瓦片的经纬度范围，并将其作为输入用于空间分析算法。
总之，tileBbox 函数的主要用途是计算地图瓦片的经纬度范围。它在地图渲染、数据查询和空间分析等场景中非常有用，能够帮助我们准确处理地理空间数据和操作。
 * @param {*} x 
 * @param {*} y 
 * @param {*} zoom 
 * @returns 
 */
function tileBbox(x, y, zoom) {
  const [lngMin, lngMax] = tileLngRange(zoom);
  const [latMin, latMax] = tileLatRange(zoom);

  const n = Math.pow(2, zoom);
  const lngSpan = (lngMax - lngMin) / n;
  const latSpan = (latMax - latMin) / n;

  const lngTileMin = lngMin + x * lngSpan;
  const lngTileMax = lngMin + (x + 1) * lngSpan;

  const latTileMin = latMin + y * latSpan;
  const latTileMax = latMin + (y + 1) * latSpan;

  return [lngTileMin, latTileMin, lngTileMax, latTileMax];
}

/**
 * 根据 zoom 迭代出每个瓦片的具体坐标
 */
const zoom = 16;
// 2的 zoom 次方
for (let x = 0; x < Math.pow(2, zoom); x++) {
  for (let y = 0; y < Math.pow(2, zoom); y++) {
    const bbox = tileBbox(x, y, zoom);
    console.log(`Tile (${x}, ${y}): ${bbox}`);
  }
}
