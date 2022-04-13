// 回到顶部
// 获取到回到顶部div
var gotop = document.querySelector('#gotop');

onscroll = function() {
    var h = this.scrollY;
    if (h > 800) {
        gotop.style.display = 'block';
    } else {
        gotop.style.display = 'none';
    }
}
gotop.onclick = function() {
    var h = window.scrollY;
    var timer = setInterval(function() {
        h -= 100;
        window.scrollTo(0, h);
        if (h <= 0) {
            clearInterval(timer);
        }

    }, 200)








}