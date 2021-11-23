function DragComponent (id) {
  this.obj = document.getElementById(id)
  this.init()
}
var totalHeight = window.screen.availHeight// 获取屏幕的高度
var totalWidth = window.screen.availWidth// 获取屏幕的宽度

DragComponent.prototype.init = function () {
  if (this.obj !== null) {
    this.obj.addEventListener('touchstart', this.touchStart, false)
    this.obj.addEventListener('touchmove', this.touchMove, false)
    this.obj.addEventListener('touchend', this.touchEnd, false)
  }
}

// 触摸开始
DragComponent.prototype.touchStart = function (event) {
  const ele = event.target
  this.ox = ele.offsetLeft
  this.oy = ele.offsetTop
  this.pagex = event.touches[0].pageX
  this.pagey = event.touches[0].pageY
}

// 触摸滑动
DragComponent.prototype.touchMove = function (event) {
  event.preventDefault()
  const el = event.target
  const mpagex = event.touches[0].pageX - this.pagex
  const mpagey = event.touches[0].pageY - this.pagey
  el.style.left = this.ox + mpagex + 'px'
  el.style.top = this.oy + mpagey + 'px'
}

// 触摸结束
DragComponent.prototype.touchEnd = function (event) {
  var el = event.target
  if (el.offsetTop < 0) {
    el.style.top = '0px'
  } else if (el.offsetTop + el.offsetHeight > totalHeight) {
    el.style.top = (totalHeight - el.offsetHeight) + 'px'
  }
  if (el.offsetLeft < 0) {
    el.style.left = '0px'
  } else if (el.offsetLeft + el.offsetWidth > totalWidth) {
    el.style.left = (totalWidth - el.offsetWidth) + 'px'
  }
}

export default {
  DragComponent
}
