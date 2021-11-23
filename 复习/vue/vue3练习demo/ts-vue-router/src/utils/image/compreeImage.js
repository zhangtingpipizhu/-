import EXIF from './exif'
// 需要先引入exif.js文件（下载地址：https://fapiao.glority.cn/dist/js/exif.js）
// 将大小大于500kb的图片进行压缩，将图片最短边调整成1280，压缩质量比是0.98
function ImageCompress (file) {
  return new Promise((resolve, reject) => {
    var reader = new FileReader()
    reader.readAsDataURL(file)
    var image = new Image()
    // var needCompress = false
    var type = null
    console.log(file, 'file')
    var name = file.name
    if (name) {
      type = (name.substr(name.lastIndexOf('.'))).toLowerCase()
    } else {
      type = 'jpeg'
    }
    if (type !== '.jpg' && type !== '.png' && type !== '.jpeg' && type !== '.pdf') {
      resolve(file)
    }
    var fileSize = file.size
    console.log('fileSize', fileSize)

    if (file && type !== '.pdf') {
      var Orientation = null
      EXIF.getData(file, function () {
        Orientation = EXIF.getTag(this, 'Orientation')
        console.log('Orientation', Orientation)
      })
      reader.onload = function (ev) {
        console.log('ev', ev)
        image.src = ev.target.result
        image.onload = function () {
          var imgWidth = this.width
          var imgHeight = this.height
          // 控制上传图片的宽高
          if (imgWidth > imgHeight && imgHeight > 1280) {
            imgWidth = 1280
            imgHeight = Math.ceil(1280 * this.height / this.width)
          } else if (imgWidth < imgHeight && imgWidth > 1280) {
            imgWidth = Math.ceil(1280 * this.width / this.height)
            imgHeight = 1280
          }
          var canvas = document.createElement('canvas')
          var ctx = canvas.getContext('2d')
          canvas.width = imgWidth
          canvas.height = imgHeight
          if (Orientation && Orientation !== 1) {
            switch (Orientation) {
              case 6: // 旋转90度
                console.log('旋转90度')
                canvas.width = imgHeight
                canvas.height = imgWidth
                ctx.rotate(Math.PI / 2)
                // (0,-imgHeight) 从旋转原理图那里获得的起始点
                ctx.drawImage(this, 0, -imgHeight, imgWidth, imgHeight)
                break
              case 3: // 旋转180度
                console.log('旋转180度')
                ctx.rotate(Math.PI)
                ctx.drawImage(this, -imgWidth, -imgHeight, imgWidth, imgHeight)
                break
              case 8: // 旋转-90度
                console.log('旋转-90度')
                canvas.width = imgHeight
                canvas.height = imgWidth
                ctx.rotate(3 * Math.PI / 2)
                ctx.drawImage(this, -imgWidth, 0, imgWidth, imgHeight)
                break
            }
          } else {
            ctx.drawImage(this, 0, 0, imgWidth, imgHeight)
          }
          var ndata
          // console.log('是否需要压缩-->需要')
          ndata = canvas.toDataURL('image/jpeg', 1) // 压缩质量为0.98
          var blob = dataURItoBlob(ndata)
          console.log('blob', blob)
          resolve(blob)
        }
      }
    } else {
      resolve(file)
    }
  })
}

function dataURItoBlob (dataurl) {
  var arr = dataurl.split(',')
  var mime = arr[0].match(/:(.*?);/)[1]
  var bstr = atob(arr[1])
  var n = bstr.length
  var u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new Blob([u8arr], {type: mime})
}

export {
  ImageCompress
}
