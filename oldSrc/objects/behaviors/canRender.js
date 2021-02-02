import Canvas from "../Canvas.js";
import Vector from "../vector/Vector.js";

export const canRender = (object, drawingFunction) => {
    const renderOffsets = [
        new Vector(-Canvas.width, -Canvas.height),
        new Vector(0, -Canvas.height),
        new Vector(Canvas.width, -Canvas.height),
        new Vector(-Canvas.width, 0),
        new Vector(0, 0),
        new Vector(Canvas.width, 0),
        new Vector(-Canvas.width, Canvas.height),
        new Vector(0, Canvas.height),
        new Vector(Canvas.width, Canvas.height),
    ];
    object.render = () => {
        renderOffsets.map(offsetVector => {
            let offsetPosition = Vector.add(object.position, offsetVector);
            drawingFunction({ ...object, position: offsetPosition });
        });
    };
};
