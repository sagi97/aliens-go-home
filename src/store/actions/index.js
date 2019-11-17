export const LEADERBOARD_LOADED = 'LEADERBOARD_LOADED';
export const LOGGED_IN = 'LOGGED_IN';
export const MOVE_OBJECTS = 'MOVE_OBJECTS';
export const START_GAME = 'START_GAME';
export const SHOOT = 'SHOOT';

export const moveObjects = mousePosition => ({
  type: MOVE_OBJECTS,
  mousePosition
});

export const startGame = () => ({
  type: START_GAME
});

export const shoot = mousePosition => ({
  type: SHOOT,
  mousePosition
});
