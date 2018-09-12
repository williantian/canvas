var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

autoSetCanvasSize(canvas)//调整视高视宽

/*****/
listenToMouse(canvas)//监听鼠标



function drawLine(x1, y1, x2, y2) {
    context.beginPath();
    context.moveTo(x1, y1)
    context.lineWidth = 3
    context.lineTo(x2, y2)
    context.stroke()
    context.closePath()
}
var eraserEnable = false
eraser.onclick = function () {
    eraserEnable = true
    actions.className = 'actions x'
}
brush.onclick = function () {
    eraserEnable = false
    actions.className = 'actions'
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

function listenToMouse(canvas) {


    function drawCircle(x, y, radius) {
        context.beginPath()
        context.arc(x, y, radius, 0, Math.PI * 2);
        context.fill()
    }//画圆
    var paiting = false
    var lastPoint = { x: undefined, y: undefined }
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