export const State = _ => {
    let state = false;
    const get = _ => state;
    const set = bool => state = bool;
    const on = _ => set(true);
    const off = _ => set(false);
    return {
        get,
        on,
        off,
    };
};
