
let create = (canvas = document.getElementById("canvas"), fill = "black", stroke = "rgb(0,255,0)") => {
  let ctx    = canvas.getContext("2d")

  //bind canvas dimensions to the context for convenience
  ctx.width  = canvas.width
  ctx.height = canvas.height
  
  //sets canvas fill and stroke styles

  ctx.translate(0.5, 0.5)            //an attempt to remove anti-aliasing
  ctx.imageSmoothingEnabled = false  //an attempt to remove anti-aliasing
  ctx.fillStyle = fill            //space is black
  ctx.strokeStyle = stroke   //lines are green

  return ctx
}



const Context = {
  create,
}

export default Context