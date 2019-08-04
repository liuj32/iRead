/**
 * 图片懒加载
 */
export function  lazyload(viewHeight) {
  let eles = document.querySelectorAll("img[lazyload]");
  let _this = this
  Array.prototype.forEach.call(eles, function(item, index) {
    var rect;
    if (item.dataset.original === "") return;
    rect = item.getBoundingClientRect(); // 用于获得页面中某个元素的左，上，右和下分别相对浏览器视窗的位置
    if (rect.bottom >= 0 && rect.top < viewHeight) {
      !(function() {
        var img = new Image();
        img.src = item.dataset.original;
        img.onload = function() {
          setTimeout(function() {
            item.src = img.src;
          }, 200);
        };
        item.removeAttribute("data-original"); //移除属性，下次不再遍历
        item.removeAttribute("lazyload");
      })();
    }
  });
}
