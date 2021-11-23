/**
 * 高德GEO精确定位
 * @param onComplete Function(data) data是具体的定位信息
 * @param onError Function(data) 定位失败的回调
 */
function getCurrentPosition (onComplete, onError) {
  AMap.plugin('AMap.Geolocation', function () {
    var geolocation = new AMap.Geolocation({
      // 是否使用高精度定位，默认：true
      enableHighAccuracy: true,
      // 设置定位超时时间，默认：无穷大
      timeout: 10000,
      // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
      buttonOffset: new AMap.Pixel(10, 20),
      //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
      zoomToAccuracy: true,
      //  定位按钮的排放位置,  RB表示右下
      buttonPosition: 'RB'
    })

    geolocation.getCurrentPosition(function (status, result) {
      if (status === 'complete') {
        onComplete(result)
      } else {
        onError(result)
      }
    })
  })
}

/**
 * 搜索中心点附近兴趣点
 * @param cpoint 中心点坐标
 * @param idx 页码
 * @param searchText 搜索关键字
 * @param radius 半径范围（单位：米）
 * @param onComplete
 * @param onError
 */
function searchNearBy (cpoint, idx, searchText, radius, onComplete, onError) {
  AMap.plugin(['AMap.PlaceSearch'], function () {
    // 构造地点查询类
    var placeSearch = new AMap.PlaceSearch({
      type: '', // 兴趣点类别
      pageSize: 20, // 单页显示结果条数
      pageIndex: 1, // 页码
      // city: "010", // 兴趣点城市
      citylimit: true // 是否强制限制在设置的城市内搜索
      // map: map, // 展现结果的地图实例
      // panel: "panel", // 结果列表将在此容器中进行展示。
      // autoFitView: true // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
    })
    placeSearch.searchNearBy(searchText, cpoint, radius, function (status, result) {
      if (status === 'complete') {
        onComplete(result)
      } else {
        onError(result)
      }
    })
  })
}

/**
 * 返回 p1 到 p2 间的地面距离，单位：米
 * @param p1 [116.434027, 39.941037]
 * @param p2
 */
function getDistance (p1, p2) {
  return AMap.GeometryUtil.distance(p1, p2)
}

export {
  getCurrentPosition,
  searchNearBy,
  getDistance
}
