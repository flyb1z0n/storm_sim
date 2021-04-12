var ctx
var borderSize = 0;
var hasZip = false;

document.body.onkeyup = function (e) {
    if (e.keyCode == 32) {
        clean();
    }
}

function clean() {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    printBorder();
}

function printBorder() {
    ctx.beginPath();
    ctx.moveTo(borderSize, borderSize);
    ctx.lineTo(ctx.canvas.width - borderSize, borderSize)
    ctx.lineTo(ctx.canvas.width - borderSize, ctx.canvas.height - borderSize)
    ctx.lineTo(borderSize, ctx.canvas.height - borderSize)
    ctx.lineTo(borderSize, borderSize)
    ctx.closePath();
    ctx.stroke();
}

function clickHandler() {
    hasZip = true;

    clean();
    render();

}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateZip(initSegment)
{
    var maxIteration = 7;
    var chanceToBranch = 30;
    var segments = [];

 
    segments.push(
        initSegment
    )

    for (var i = 0; i < maxIteration; i++) {
        var result = [];
        for (var idx = 0; idx < segments.length; idx++) {
            var currSeg = segments[idx];
            var length = Math.sqrt((currSeg.start.x - currSeg.end.x) * (currSeg.start.x - currSeg.end.x) + (currSeg.start.y - currSeg.end.y) * (currSeg.start.y - currSeg.end.y))
            var maxOffset = length / 4;
            var mid_point = {
                x: (currSeg.start.x + currSeg.end.x) / 2,
                y: (currSeg.start.y +  currSeg.end.y) / 2
            };

           

            /*
            Чтобы получить вектор 2D, перпендикулярный другому вектору 2D, вы можете просто поменять местами компоненты X и Y и отрицать новую компоненту Y. Таким образом, { x, y } становится { y | - x }.
            */
            var normal = {
                x: (currSeg.end.y - mid_point.y),
                y: -1 * (currSeg.end.x - mid_point.x)
            };
            // normalization
            var normal_len = Math.sqrt(normal.x * normal.x + normal.y * normal.y)
            normal = {
                x: normal.x / normal_len,
                y: normal.y / normal_len
            };

            var offset = getRandomInt(-1 * maxOffset, maxOffset)
            mid_point = {
                x: mid_point.x + offset * normal.x,
                y: mid_point.y + offset * normal.y,
            }

            result.push({
                start: currSeg.start,
                end: mid_point,
                isBranch : currSeg.isBranch
            })

            result.push({
                start: mid_point,
                end: currSeg.end,
                isBranch : currSeg.isBranch
            })
            
            if(i != maxIteration -1  && Math.random() < (chanceToBranch/100))
            {
                var direction = {
                    x :  mid_point.x - currSeg.start.x,
                    y : mid_point.y  -  currSeg.start.y
                }

                var directionLength = Math.sqrt(direction.x * direction.x + direction.y * direction.y)
                direction = {
                    x: direction.x / directionLength,
                    y: direction.y / directionLength
                };

                var branch = Object.assign({}, mid_point)


                branch = {
                    x: branch.x + length * direction.x / 2,
                    y: branch.y + length * direction.y / 2,
                }

                result.push({
                    start: mid_point,
                    end: branch,
                    isBranch: true
                })
            }
            
        }
        segments = result;
    }
    return segments;
}

function printZip() {
    var pos_x = ctx.canvas.width / 2;
    var pos_y = ctx.canvas.height / 2;
    var initialSegment =   {
        start: { x: pos_x, y: 0 },
        end: { x: pos_x, y: ctx.canvas.height }
    }
    var segments1 = generateZip(
        initialSegment
    );

    var segments2 = generateZip(
        initialSegment
    );
   
    printSegments(segments1)
    printSegments(segments2)
}

function printSegments(segments)
{
   
    segments.forEach(seg => {
        ctx.beginPath();
        ctx.strokeStyle = 'white';
        ctx.moveTo(seg.start.x, seg.start.y);
        ctx.lineTo(seg.end.x, seg.end.y);
        ctx.lineWidth = seg.isBranch ? 1 : 2;
        ctx.stroke()
    });
   
}

function printLine(points) {
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y)
    points.forEach(el => {
        ctx.lineTo(el.x, el.y);
    });
    ctx.lineWidth = 2;
    ctx.stroke()
}


function render() {
    console.log("render")
    printBorder()

    if (hasZip) {
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


    setInterval(clickHandler, 200);

}

init()


