import Projectile from "../Projectile.js";
import Vector from "../vector/Vector.js";

export const canFireProjectile = (object) => {
    const fireProjectile = () => {
        if (object.activeProjectiles.size < 3) {
            object.activeProjectiles.add(new Projectile(object.position, Vector.fromDegreesAndMagnitude(object.rotation, 1)));
        }
    };
    const decrementActiveProjectiles = ([projectile]) => {
        object.activeProjectiles.delete(projectile);
    };
    return { fireProjectile, decrementActiveProjectiles };
};
