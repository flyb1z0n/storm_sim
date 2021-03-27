var ctx

function render(){
    console.log("render")
    console.log(ctx)
    ctx.beginPath();
    ctx.moveTo(10, 10);

    // finish printing border
    ctx.lineTo(ctx.canvas.width - 10, ctx.canvas.width - 10)
    ctx.lineTo(10,  ctx.height - 10)
    // ctx.lineTo(10, 10);
    ctx.closePath();
    ctx.stroke();
}

function init() {
    canvasEl = document.getElementById('main');
    ctx = canvasEl.getContext('2d');

    function resizeCanvas() {
        console.log('resize')
        canvasEl.style.width = window.innerWidth + "px";
        canvasEl.width = window.innerWidth;
        canvasEl.style.height = window.innerHeight + "px";
        canvasEl.height = window.innerHeight;
    };
    window.onresize = resizeCanvas;
    resizeCanvas();

    setInterval(render, 1000);
    
}

init()


