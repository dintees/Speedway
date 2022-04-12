document.addEventListener("DOMContentLoaded", function () {

    console.log("Załadowano");


    var game = {
        data: [],
        number: 1,
        count: 0,
        posY: [290, 320, 350, 380],
        colors: [[255, 0, 0], [0, 255, 0], [0, 0, 255], [255, 0, 255]],
        nameColors: ["red", "green", "blue", "magenta"],
        keys: ["a", "s", "d", "f"],
    }


    var canvas = document.querySelector("canvas")
    var ctx = canvas.getContext("2d");

    clear(ctx)

    do {
        game.number = parseInt(prompt("Ile? (1-4)"))
    } while (game.number < 1 || game.number > 4 || isNaN(game.number))


    var table = document.getElementById("table")

    for (let i = 0; i < game.number; i++) {
        var player = new Player(i + 1, 400, game.posY[i], game.colors[i], game.keys[i], ctx, "Player" + i);
        game.data.push(player)
        player.draw()

        var tr = document.createElement("tr")
        var td = document.createElement("td")
        td.innerHTML = i + 1
        td.classList.add("id")
        tr.appendChild(td)

        var td = document.createElement("td")
        td.innerHTML = game.nameColors[i]
        td.classList.add("color")
        tr.appendChild(td)

        var td = document.createElement("td")
        td.innerHTML = game.data[i].key
        td.classList.add("key")
        tr.appendChild(td)

        var td = document.createElement("td")
        td.innerHTML = 4
        td.classList.add("Einkreisung")
        tr.appendChild(td)

        var td = document.createElement("td")
        var button = document.createElement("button")
        // button.innerText = "Veränderung"
        button.innerText = "Change Key"

        button.onclick = function () {
            // document.getElementById("error").innerHTML = "Ich warte auf einen Schlüssel"
            document.getElementById("error").innerHTML = "I am waiting for key..."

            function read(e) {
                game.data[i].key = e.key
                update("key", i, e.key)
                removeEventListener("keydown", read)
                document.getElementById("error").innerHTML = ""
            }
            addEventListener("keydown", read)
        }
        td.appendChild(button)
        tr.appendChild(td)

        table.append(tr)

    }

    document.addEventListener("keydown", function (e) {
        for (let i = 0; i < game.data.length; i++) {
            if (e.key == game.data[i].key) {
                game.data[i].isClicked = true
            }
        }
    })

    document.addEventListener("keyup", function (e) {
        for (let i = 0; i < game.data.length; i++) {
            if (e.key == game.data[i].key) {
                game.data[i].isClicked = false
            }
        }
    })

    setTimeout(function () {
        clear(ctx)
    }, 100)

    // setInterval(function () {

    //     clear(ctx)

    //     for (let i = 0; i < game.number; i++) {
    //         if (game.data[i].isClicked == true) game.data[i].changeVector()
    //         if (game.data[i].defeat == false) game.data[i].move();
    //         // console.log(game.data[i].isClicked)
    //     }

    // }, 40)


    function start() {

        clear(ctx)

        game.count = 0;
        for (let i = 0; i < game.number; i++) {
            if (game.data[i].defeat == false) {
                game.count++;
            }
        }

        for (let i = 0; i < game.number; i++) {
            if (game.data[i].defeat == false) {
                if (game.count == 1 && game.number > 1) {
                    alert("Wygrał gracz: " + game.data[i].name);
                    location.reload();
                } else {
                    if (game.data[i].isClicked == true) game.data[i].changeVector()
                    game.data[i].move();
                }
            }
            // console.log(game.data[i].isClicked)
        }

    }

    document.getElementById("start").onclick = function () {
        setInterval(start, 30)
        this.disabled = true
    }



})