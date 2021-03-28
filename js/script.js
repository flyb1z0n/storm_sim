var ctx
var borderSize = 0;
var hasZip = false;

document.body.onkeyup = function(e){
    if(e.keyCode == 32){
        clean();
    }
}

function clean()
{
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    printBorder();
}

function printBorder()
{
    ctx.beginPath();
    ctx.moveTo(borderSize, borderSize);
    ctx.lineTo(ctx.canvas.width - borderSize, borderSize)
    ctx.lineTo(ctx.canvas.width - borderSize, ctx.canvas.height - borderSize)
    ctx.lineTo(borderSize, ctx.canvas.height - borderSize)
    ctx.lineTo(borderSize, borderSize)
    ctx.closePath();
    ctx.stroke();
}

function clickHandler() 
{
    hasZip = true;   
   
  
    render();

}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function printZip() 
{   
    var maxIteration = 1;
    var maxOffset = 100;

    ///

    var pos_x = ctx.canvas.width /2;
    var pos_y = ctx.canvas.height /2;

    var points = [];

    points.push({ x : pos_x, y : pos_y,})
    points.push({ x : pos_x, y : 0,})

    printLine(points)

    function normal(x1,y1,x2,y2,x3,y3)
    {
        k = ((y2-y1) * (x3-x1) - (x2-x1) * (y3-y1)) / ((y2-y1)*(y2-y1) + (x2-x1)*(x2-x1));
        console.log(k)
        x4 = x3 - k * (y2-y1);
        y4 = y3 + k * (x2-x1);
        return {x : x4, y: y4}
    }

    for (var i = 0; i < maxIteration; i++)
    {
        var result = [];
        for(var idx = 0; idx < points.length - 1; idx++ )
        {
            var mid_pos_x = (points[idx].x  + points[idx+1].x) / 2;
            var mid_pos_y = (points[idx].y  + points[idx+1].y) / 2;
            // should find a normal vector and point that has random ofseest
            var normal = normal(points[idx].x, points[idx].y,  points[idx+1].x,  points[idx+1].y, mid_pos_x , mid_pos_y)
            console.log(normal)
            console.log({x : mid_pos_x, y : mid_pos_y})
            result.push(points[idx])
            result.push({x : mid_pos_x, y : mid_pos_y})
            result.push(points[idx +1 ])
            console.log({x : mid_pos_x, y:  mid_pos_y})
        }
        points = result;
        printLine(points)
    }



    


    // print stroke:
   





    // bad generation for zip ot the right corner
    // ctx.beginPath();
    // ctx.moveTo(pos_x, pos_y);
    // // ctx.lineTo(0, 200)
    // // ctx.lineTo(200, 0)
    // while (pos_x > borderSize && pos_x < ctx.canvas.width - borderSize && 
    //       pos_y > borderSize && pos_y < ctx.canvas.height)
    // {
    //     var dest_post_x = getRandomInt(pos_x - 5, pos_x + 10);
    //     var dest_post_y = getRandomInt(pos_y - 5, pos_y + 10);
    //     console.log({x : dest_post_x, y : dest_post_y})
    //     ctx.lineTo(dest_post_x, dest_post_y)
    //     pos_x = dest_post_x;
    //     pos_y = dest_post_y;
    // }
    // ctx.stroke();
    console.log('Zip')
}

function printLine(points)
{
    ctx.beginPath();
    ctx.moveTo(points[0].x,points[0].y)
    points.forEach(el => {
        ctx.lineTo(el.x, el.y);
    });
    ctx.stroke()
}


function render(){
    console.log("render")
    printBorder()

    if(hasZip)
    {
        printZip() 
    }    
    hasZip = false;

}

function init() {
    canvasEl = document.getElementById('main');
    ctx = canvasEl.getContext('2d');

    canvasEl.addEventListener('click', clickHandler);

    function resizeCanvas() {
        console.log('resize')
        canvasEl.style.width = window.innerWidth + "px";
        canvasEl.width = window.innerWidth;
        canvasEl.style.height = window.innerHeight + "px";
        canvasEl.height = window.innerHeight;
        render();
    };
    window.onresize = resizeCanvas;
    resizeCanvas();

  
    // setInterval(render, 1000);
    
}

init()


