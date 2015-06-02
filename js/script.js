window.onload=function() {

    var oUl = document.getElementById('toolPic');
    var aLi = oUl.getElementsByTagName('li');
    var oDiv = document.getElementById('toolName');
    var aDiv = oDiv.getElementsByTagName('div');
    var Up = document.getElementById('toUp');
    var oShrink = document.getElementById('toShrink');
    var oToLeft = document.getElementById('toNext');
    var oToRight = document.getElementById('toPre');
    var oRefresh = document.getElementById('refresh');
    var oImg = document.getElementById('img');
    var i = 0;

    //switch picture
    for (i = 0; i < aLi.length; i++) {
        aLi[i].index = i;
        aLi[i].onmouseover = function () {

            for (i = 0; i < aLi.length; i++) {
                aDiv[i].style.display = "none";
            }
            aDiv[this.index].style.display = "block";
        }
    }


    //switch picture operate
    //1
    Up.onclick = function () {

        startMove(oImg, {width: parseInt(oImg.offsetWidth + oImg.offsetWidth * 0.15), height: parseInt(oImg.offsetHeight + oImg.offsetHeight * 0.15)})

    }
    //2
    oShrink.onclick = function () {
        startMove(oImg, {width: parseInt(oImg.offsetWidth - oImg.offsetWidth * 0.15), height: parseInt(oImg.offsetHeight - oImg.offsetHeight * 0.15)})

    }
    //3.scroll
    var scrollChange = function (e) {

        e = e || window.event;
        if (e.wheelDelta) {  //判断谷歌和IE的滑轮事件
            if (e.wheelDelta > 0) { //当滑轮向上滚动时
                startMove(oImg, {width: parseInt(oImg.offsetWidth + oImg.offsetWidth * 0.15), height: parseInt(oImg.offsetHeight + oImg.offsetHeight * 0.15)})

            }
            if (e.wheelDelta < 0) { //当滑轮向下滚动时
                startMove(oImg, {width: parseInt(oImg.offsetWidth - oImg.offsetWidth * 0.15), height: parseInt(oImg.offsetHeight - oImg.offsetHeight * 0.15)})

            }
        } else if (e.detail) {  //判断火狐的滑轮事件
            if (e.detail > 0) { //当滑轮向上滚动时
                startMove(oImg, {width: parseInt(oImg.offsetWidth + oImg.offsetWidth * 0.15), height: parseInt(oImg.offsetHeight + oImg.offsetHeight * 0.15)})

            }
            if (e.detail < 0) { //当滑轮向下滚动时
                startMove(oImg, {width: parseInt(oImg.offsetWidth - oImg.offsetWidth * 0.15), height: parseInt(oImg.offsetHeight - oImg.offsetHeight * 0.15)})

            }
        }
    }
    //给当前页面设置滑轮滚动事件监听器
    if (document.addEventListener) {//符合W3C标准的设置方式
        document.addEventListener('DOMMouseScroll', scrollChange, false);
    }
    //滚动滑轮触发scrollChange方法  //符合IE，谷歌
    window.onmousewheel = document.onmousewheel = scrollChange;

    //4.drag
    //1.按下鼠标点击图片，获取鼠标点击坐标与图片左边框与上边框之间的固定距离设为disX，disY
    oImg.onmousedown = function (e) {

        var ev = e || event;
        //获取图片左端与鼠标点击处的固定距离
        //console.log(imageSize.offsetLeft);
        var disX = ev.clientX - oImg.offsetLeft;
        var a = oImg.offsetLeft;
        var b = oImg.offsetTop;
        //获取图片上端与鼠标点击处的固定距离
        var disY = ev.clientY - oImg.offsetTop;
        //2.按住鼠标对图像进行拖动，图像的左边距和上边距等于鼠标的左边减去固定距离disX，a,disY,b
        document.onmousemove = function (e) {//当设置为imageSize时，如果拖拽过快，将不会触发此事件，所以选择document.onmousemove
            var ev = e || event;
            //console.log(imageSize.offsetLeft);
            //console.log(ev.clientX-a);
            oImg.style.left = (ev.clientX - a - disX) + 'px';
            oImg.style.top = (ev.clientY - b - disY) + 'px';
            //console.log(imageSize.style.left)
        }
        //3.当鼠标松开时，停止拖拽
        document.onmouseup = function () {
            document.onmousemove = null;//将鼠标移动事件清空，若设为imageSize.onmousemove，则只能拖动一次图片
            document.onmousedown = null;//将鼠标按下事件清空
        }
        return false;//解决默认事件问题，在火狐3.6版本以上，第二次拖动空div会出现bug，拖不动
    }

    //5
    oToLeft.onclick = function () {
        operate(this);
    }
    //6
    oToRight.onclick = function () {
        operate(this);
    }
    //7.re
    oRefresh.onclick = function resetImage() {
        location.reload(false);//刷新页面以使图片回到初始化状态，location.reload()设为false表示如果文档未改变，将从缓存中装载文档
    }

    function operate(name) {

        alert(1);
    }
}