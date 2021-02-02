import Settings from "./gameLogic/Settings.js"
import Canvas from "./objects/Canvas.js"
import Vector from "./objects/vector/Vector.js"


class GRAPHICS {
    static render(object){
        object?.renderComponent?.render?.()
        object.render?.()

        // Everything below is for debugging
        if (Settings.RENDER_DEBUG){
            GRAPHICS.showCenter(object)
            GRAPHICS.showVelocity(object)
            //Rotation Viewer Hack
            if(object.rotation != undefined) GRAPHICS.drawRay(object.position, Vector.add(object.position, Vector.fromDegreesAndMagnitude(object.rotation, 20)), "aqua")
        }
    
    
    }
    //rotates context at point and rotation
    static rotate({x,y}, rotation) {
        let ctx = Canvas.context
        ctx.translate(x,y)
        ctx.rotate(Math.PI * 2 / 360 * rotation)
        ctx.translate(-x,-y)
    }
    static clear() { 
        let ctx = Canvas.context
        ctx.fillRect(-10, -10, Canvas.width+15, Canvas.height+15)
    }
    static showCenter(object) {
        GRAPHICS.drawCross(object.position, object.radius*2, "rgb(255,0,0)")
    }
    static showVelocity(object) {
        GRAPHICS.drawRay(object.position, Vector.add(object.position, object.velocity.scale(50)))
    }
    static drawCross(position, size, color) {
        let ctx = Canvas.context
        ctx.save()
        ctx.fillStyle = color
        ctx.fillRect(position.x-size/2,position.y,size,1)
        ctx.fillRect(position.x,position.y-size/2,1,size)
        ctx.restore()
    }

    static drawRay(start, end, color = "rgb(255,255,0)") {
        let ctx = Canvas.context
        ctx.save()
        ctx.strokeStyle = color
        ctx.beginPath()
        ctx.moveTo(start.x, start.y)
        ctx.lineTo(end.x, end.y)
        ctx.stroke()
        ctx.restore()
    }

    static drawText(text, x, y, {color = "rgb(0,255,0)", size = "1em"} = {}) {
        let ctx = Canvas.context
        ctx.save()
        ctx.textAlign = "center"
        ctx.textBaseline = "top"
        ctx.font = `${size} sans-serif`
        ctx.fillStyle = color
        ctx.fillText(text,x,y)

        ctx.restore()
    }

}

export default GRAPHICS