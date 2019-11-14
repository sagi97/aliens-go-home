import {
  createInterval, monstersStarterYAxis, maxSpaceships, maxAliens,
  monstersStarterPositions, maxMonsters
} from '../../utils/constants';

export default state => {
  if ( ! state.gameState.started) return state; // game not running

  const now = (new Date()).getTime();
  const { lastObjectCreatedAt, flyingObjects } = state.gameState;
  const createNewObject = (
    now - (lastObjectCreatedAt).getTime() > createInterval &&
    flyingObjects.length < maxMonsters
  );

  if ( ! createNewObject) return state; // no need to create objects now

  const id = (new Date()).getTime();
  const predefinedPosition = Math.floor(Math.random() * maxSpaceships);
  const flyingObjectPosition = monstersStarterPositions[predefinedPosition];
  let createSpaceship = true;
  let createAlien = true;
  if (flyingObjects.filter(monster => monster.type === 'alien').length >= maxAliens) createAlien = false;
  if (flyingObjects.filter(monster => monster.type === 'spaceship').length >= maxSpaceships) createSpaceship = false;

  const newFlyingObject = {
    position: {
      x: flyingObjectPosition,
      y: monstersStarterYAxis,
    },
    createdAt: (new Date()).getTime(),
    id,
    type: createSpaceship && createAlien ? 
      ['alien', 'spaceship'][Math.round(Math.random())] 
      : createAlien ? 'alien' 
      : 'spaceship'
  };

  return {
    ...state,
    gameState: {
      ...state.gameState,
      flyingObjects: [
        ...state.gameState.flyingObjects,
        newFlyingObject
      ],
      lastObjectCreatedAt: new Date(),
    }
  }
}