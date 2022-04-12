class Player {
    constructor(id, x, y, color, key, ctx, name) {
        this.ctx = ctx
        this.id = id
        this.name = name
        this.x = x
        this.y = y
        this.color = color
        this.key = key
        this.isClicked = false
        this.position = []
        this.stepX = 1
        this.stepY = 0
        this.Einkreisung = 0
        this.r = 5
        this.alfa = 0
        this.defeat = false
    }

    draw() {
        this.ctx.beginPath()
        this.ctx.moveTo(this.x, this.y);
        // this.ctx.lineCap = "round";
        this.ctx.strokeStyle = "rgba(" + this.color[0] + "," + this.color[1] + "," + this.color[2] + ", 1)"
        this.ctx.lineTo(this.x += this.stepX, this.y)
        this.ctx.stroke()
    }

    move() {

        for (let i = 0; i < this.position.length; i++) {

            this.ctx.beginPath()
            this.ctx.moveTo(this.position[i].x, this.position[i].y);
            this.ctx.strokeStyle = "rgba(" + this.color[0] + "," + this.color[1] + "," + this.color[2] + "," + this.position[i].alpha + ")"

            // if (this.position[i].alpha - 0.01 > 0.1) {
            this.position[i].alpha = this.position[i].alpha - 0.01
            // }

            this.ctx.lineTo(this.position[i].x + this.position[i].stepX, this.position[i].y + this.position[i].stepY);
            this.ctx.stroke()
        }

        this.stepX = this.r * Math.cos(this.alfa * Math.PI / 180)
        this.stepY = this.r * Math.sin(this.alfa * Math.PI / 180)
        this.x += this.stepX;
        this.y += this.stepY;
        this.ctx.stroke()

        // this.Einkreisung = parseInt(Math.abs(this.alfa) / 360)

        this.ctx.beginPath()
        this.ctx.rect(390, 270, 5, 122)
        this.ctx.closePath()

        if (this.ctx.isPointInPath(this.x, this.y)) {
            console.log("+ jedno okrążenie dla Ciebie ;-)")
            this.Einkreisung++
            console.log(this.Einkreisung)
            update("Einkreisung", this.id - 1, 4 - this.Einkreisung)
        }


        // motocykl - rotacja

        this.ctx.save()

        this.ctx.translate(this.x, this.y)
        this.ctx.rotate(this.alfa * Math.PI / 180)
        this.ctx.drawImage(document.getElementById("img" + this.id), -50, -27, 60, 50);

        this.ctx.restore()

        this.position.push({ x: this.x, y: this.y, stepX: this.stepX, stepY: this.stepY, alpha: 1 })

        this.ctx.beginPath()
        this.ctx.arc(200, 200, 189, 1 / 2 * Math.PI, 3 / 2 * Math.PI)
        this.ctx.arc(600, 200, 189, 3 / 2 * Math.PI, 1 / 2 * Math.PI)
        this.ctx.closePath()

        if (!this.ctx.isPointInPath(this.x, this.y)) {
            console.log("KOLIZJA")
            this.defeat = true;
        }

        this.ctx.beginPath()
        this.ctx.arc(200, 200, 74, 1 / 2 * Math.PI, 3 / 2 * Math.PI)
        this.ctx.arc(600, 200, 74, 3 / 2 * Math.PI, 1 / 2 * Math.PI)
        this.ctx.closePath()

        if (this.ctx.isPointInPath(this.x, this.y)) {
            console.log("KOLIZJA TRAWA")
            this.defeat = true;
        }

    }

    changeVector() {
        this.alfa -= this.r
    }
}