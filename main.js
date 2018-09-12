var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var lineWidth = 5

autoSetCanvasSize(canvas)//调整视高视宽

/*****/
listenToUser(canvas)//监听用户



function drawLine(x1, y1, x2, y2) {
    context.beginPath();
    context.moveTo(x1, y1)
    context.lineWidth = lineWidth
    context.lineTo(x2, y2)
    context.stroke()
    context.closePath()
}
var eraserEnable = false
pen.onclick = function(){
    eraserEnable = false
    pen.classList.add('active')
    eraser.classList.remove('active')
}
eraser.onclick = function(){
    eraserEnable = true
    eraser.classList.add('active')
    pen.classList.remove('active')
}
red.onclick = function(){
    context.strokeStyle = 'red'
    context.fillStyle = 'red'
    red.classList.add('active')
    green.classList.remove('active')
    blue.classList.remove('active')
}
green.onclick = function(){
    context.strokeStyle = 'green'
    context.fillStyle = 'green'
    green.classList.add('active')
    red.classList.remove('active')
    blue.classList.remove('active')
}
blue.onclick = function(){
    context.strokeStyle = 'blue'
    context.fillStyle = 'blue'
    blue.classList.add('active')
    green.classList.remove('active')
    red.classList.remove('active')
}
thin.onclick = function(){
    lineWidth = 5
}
thick.onclick = function(){
    lineWidth = 10
}
clear.onclick = function(){
    context.clearRect(0, 0, canvas.width, canvas.height);
}
download.onclick = function{
    var url = canvas.toDataURL("image/png")
    var a = document.createElement('a')
    document.body.appendChild(a)
    a.href = url
    a.download = '我的图画'
    a.target = '_blank'
    a.click()
}
/*****/
function autoSetCanvasSize(canvas) {
    setCanvasSize()

    window.onresize = function () {
        setCanvasSize()
    }

    function setCanvasSize() {
        var pageWidth = document.documentElement.clientWidth
        var pageHeight = document.documentElement.clientHeight
        canvas.width = pageWidth
        canvas.height = pageHeight
    }
}

/*******/

function listenToUser(canvas) {


    function drawCircle(x, y, radius) {
        context.beginPath()
        context.arc(x, y, radius, 0, Math.PI * 2);
        context.fill()
    }//画圆
    var using = false
    var lastPoint = { x: undefined, y: undefined }

    //检测特性
    if (document.body.ontouchstart !== undefined) {
        //说明是触屏设备
        canvas.ontouchstart = function (aaa) {
            var x = aaa.touches[0].clientX
            var y = aaa.touches[0].clientY
            using = true
            drawCircle(x, y, 1)//取消了之后点击的第一下画板上会没有显示
            if (eraserEnable) {
                context.clearRect(x - 5, y - 5, 10, 10)
            } else {
                lastPoint = { 'x': x, 'y': y }
            }
        }
        canvas.ontouchmove = function (aaa) {
            var x = aaa.touches[0].clientX
            var y = aaa.touches[0].clientY
            if (!using) {
                return
            }
            if (eraserEnable) {
                context.clearRect(x - 5, y - 5, 10, 10)
            } else {
                var newPoint = { 'x': x, 'y': y } 
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                lastPoint = newPoint
            }
        }
        canvas.ontouchend = function () {
            using = false
        }
    } else {
        //说明是非触屏设备
        canvas.onmousedown = function (aaa) {
            var x = aaa.clientX
            var y = aaa.clientY
            using = true
            drawCircle(x, y, 1)//取消了之后点击的第一下画板上会没有显示
            if (eraserEnable) {
                context.clearRect(x - 5, y - 5, 10, 10)
            } else {
                lastPoint = { 'x': x, 'y': y }
            }
        }
        canvas.onmousemove = function (aaa) {
            var x = aaa.clientX
            var y = aaa.clientY
            if (!using) {
                return
            }
            if (eraserEnable) {
                context.clearRect(x - 5, y - 5, 10, 10)
            } else {
                var newPoint = { 'x': x, 'y': y }
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                lastPoint = newPoint
            }
        }
        canvas.onmouseup = function (aaa) {
            using = false
        }
    }
}