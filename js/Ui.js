function clear(ctx) {

    // widownia

    ctx.beginPath();
    ctx.strokeStyle = "#000"
    // var pat = ctx.createPattern(document.getElementById("audiencePattern"), "repeat")
    var pat = ctx.createPattern(document.getElementById("grassPattern"), "repeat")
    ctx.fillStyle = pat
    ctx.fillRect(0, 0, 800, 400);

    // ctx.beginPath()
    // ctx.save()
    // ctx.translate(400, 200)
    // ctx.rotate(Math.PI)
    // ctx.translate(-400, -200)
    // ctx.fillRect(0, 0, 800, 200);
    // ctx.restore()

    // tor

    ctx.beginPath();
    ctx.fillStyle = "#fff"
    ctx.lineWidth = "8"
    ctx.arc(200, 200, 190, 1 / 2 * Math.PI, 3 / 2 * Math.PI)
    ctx.arc(600, 200, 190, 3 / 2 * Math.PI, 1 / 2 * Math.PI)
    ctx.closePath()
    ctx.stroke()
    ctx.fill();

    // trawa

    ctx.beginPath();
    var pat = ctx.createPattern(document.getElementById("grassPattern"), "repeat")
    ctx.fillStyle = pat
    ctx.arc(200, 200, 70, 1 / 2 * Math.PI, 3 / 2 * Math.PI)
    ctx.arc(600, 200, 70, 3 / 2 * Math.PI, 1 / 2 * Math.PI)
    ctx.closePath()
    ctx.stroke()
    ctx.fill();

    // zawodnik

    ctx.lineWidth = 3
}


function update(type, id, value) {

    console.log(type)
    if (type == "Einkreisung" && value <= 0) {
        alert("Wygrana");
        location.reload();
    }
    else
        document.getElementsByClassName(type)[id].innerHTML = value

    // var table = document.getElementById("table")
    // var round = document.getElementsByClassName("Einkreisung")
    // console.log(round.length)

    // round.innerHTML = parseInt(round + 1)


}