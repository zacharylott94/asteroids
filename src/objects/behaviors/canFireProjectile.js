import ProjectileFactory from "../Projectile.js";
import Vector from "../vector/Vector.js";

export const canFireProjectile = (object) => {
    object.fireProjectile = () => {
        if (object.activeProjectiles.size < 3) {
            object.activeProjectiles.add(ProjectileFactory(object.position, Vector.fromDegreesAndMagnitude(object.rotation, 1)));
        }
    };
    object.decrementActiveProjectiles = ([projectile]) => {
        object.activeProjectiles.delete(projectile);
    };
};
