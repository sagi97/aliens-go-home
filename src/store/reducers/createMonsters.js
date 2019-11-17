import {
  createInterval,
  monstersStarterYAxis,
  maxSpaceships,
  maxAliens,
  monstersStarterPositions,
  maxMonsters
} from '../../utils/constants';

export default state => {
  if (!state.gameState.started) return state; // game not running

  const now = new Date().getTime();
  const { lastObjectCreatedAt, monsters } = state.gameState;
  const createNewObject =
    now - lastObjectCreatedAt.getTime() > createInterval && monsters.length < maxMonsters;

  if (!createNewObject) return state; // no need to create objects now

  const id = new Date().getTime();
  const predefinedPosition = Math.floor(Math.random() * maxSpaceships);
  const monsterPosition = monstersStarterPositions[predefinedPosition];
  let createSpaceship = true;
  let createAlien = true;
  if (monsters.filter(monster => monster.type === 'alien').length >= maxAliens) createAlien = false;
  if (monsters.filter(monster => monster.type === 'spaceship').length >= maxSpaceships)
    createSpaceship = false;

  let monsterType;

  if (createSpaceship && createAlien) {
    monsterType = ['alien', 'spaceship'][Math.round(Math.random())];
  } else if (createAlien) {
    monsterType = 'alien';
  } else {
    monsterType = 'spaceship';
  }

  const newMonster = {
    position: {
      x: monsterPosition,
      y: monstersStarterYAxis
    },
    createdAt: new Date().getTime(),
    id,
    type: monsterType
  };

  if (newMonster.type === 'alien') newMonster.lives = 1;
  if (newMonster.type === 'spaceship') newMonster.lives = 2;

  return {
    ...state,
    gameState: {
      ...state.gameState,
      monsters: [...state.gameState.monsters, newMonster],
      lastObjectCreatedAt: new Date()
    }
  };
};
