export const canRotate = (object) => {
    const rotate = (angle) => {
        object.rotation += angle;
    };
    return { rotate };
};
