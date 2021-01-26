export const canRotate = (object) => {
    object.rotate = (angle) => {
        object.rotation += angle;
    };
};
