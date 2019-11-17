import { calculateAngle } from '../../utils/formulas';
import createMonsters from './createMonsters';
import moveBalls from './moveCannonBalls';
import checkCollisions from './checkCollisions';

function moveObjects(state, action) {
  if (!state.gameState.started) return state;

  let cannonBalls = moveBalls(state.gameState.cannonBalls);

  const mousePosition = action.mousePosition || {
    x: 0,
    y: 0,
  };

  const newState = createMonsters(state);

  const now = (new Date()).getTime();
  let monsters = newState.gameState.monsters.filter(object => (
    (now - object.createdAt) < 4000
  ));

  const lostLife = state.gameState.monsters.length > monsters.length;
  let lives = state.gameState.lives;
  if (lostLife) {
    lives--;
  }

  const started = lives > 0;
  if (!started) {
    monsters = [];
    cannonBalls = [];
    lives = 3;
  }

  const { x, y } = mousePosition;
  const angle = calculateAngle(0, 0, x, y);

  const { objectsDestroyed, newMonsters } = checkCollisions(cannonBalls, monsters);
  const cannonBallsDestroyed = objectsDestroyed.filter(object => object.type === 'cannonBall').map(cannonBall => cannonBall.id);
  const monstersDestroyed = objectsDestroyed.filter(object => object.type === 'monster').map(monster => monster.id);

  cannonBalls = cannonBalls.filter(cannonBall => (cannonBallsDestroyed.indexOf(cannonBall.id)));
  monsters = newMonsters.filter(monster => (monstersDestroyed.indexOf(monster.id)));

  const kills = state.gameState.kills + monstersDestroyed.length;

  return {
    ...newState,
    gameState: {
      ...newState.gameState,
      monsters,
      cannonBalls,
      lives,
      started,
      kills
    },
    angle,
  };
}

export default moveObjects;