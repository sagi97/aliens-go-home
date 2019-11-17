import { checkCollision } from '../../utils/formulas';
import { gameHeight } from '../../utils/constants';

const checkCollisions = (cannonBalls, monsters) => {
  const objectsDestroyed = [];
  const newMonsters = [...monsters];

  newMonsters.forEach((monster, i) => {
    const currentLifeTime = new Date().getTime() - monster.createdAt;
    const calculatedPosition = {
      x: monster.position.x,
      y: monster.position.y + (currentLifeTime / 4000) * gameHeight
    };
    const rectA = {
      x1: calculatedPosition.x - 40,
      y1: calculatedPosition.y - 10,
      x2: calculatedPosition.x + 40,
      y2: calculatedPosition.y + 10
    };
    cannonBalls.forEach(cannonBall => {
      const rectB = {
        x1: cannonBall.position.x - 8,
        y1: cannonBall.position.y - 8,
        x2: cannonBall.position.x + 8,
        y2: cannonBall.position.y + 8
      };
      if (checkCollision(rectA, rectB)) {
        objectsDestroyed.push({
          id: cannonBall.id,
          type: 'cannonBall'
        });
        if (monster.lives === 1) {
          objectsDestroyed.push({
            id: monster.id,
            type: 'monster'
          });
        } else {
          newMonsters[i].lives -= 1;
        }
      }
    });
  });
  return { objectsDestroyed, newMonsters: monsters };
};

export default checkCollisions;
