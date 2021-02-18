import Obstacle from './Obstacle';

const randomNum = (max, min = 1) => (Math.floor(Math.random() * (max - min) + min));

const starterVals = (edge, boardWidth, boardHeight, radius) => {
  let x = randomNum(Math.floor(boardWidth * (2 / 3)), Math.floor(boardWidth / 3));
  let y = randomNum(Math.floor(boardHeight * (2 / 3)), Math.floor(boardHeight / 3));
  if (edge === 0) { y = radius + 1; }
  if (edge === 2) { y = boardHeight - radius + 1; }
  if (edge === 1) { x = boardWidth - radius + 1; }
  if (edge === 3) { x = radius + 1; }
  const velX = randomNum(10);
  const velY = randomNum(10);
  return [x, y, velX, velY];
};

const gameFuncs = {
  handleKeyPress(key, player, boardWidth, boardHeight) {
    const mover = player;
    const stepSize = Math.round(player.radius * 0.6);
    if ((key === 'ArrowUp' || key === 'i')
      && mover.y > player.radius + stepSize) { mover.y -= stepSize; }
    if ((key === 'ArrowDown' || key === 'k')
      && mover.y < boardHeight - player.radius - stepSize) { mover.y += stepSize; }
    if ((key === 'ArrowRight' || key === 'l')
      && mover.x < boardWidth - player.radius - stepSize) { mover.x += stepSize; }
    if ((key === 'ArrowLeft' || key === 'j')
      && mover.x > player.radius + stepSize) { mover.x -= stepSize; }
  },
  newObstacles(obstacles, number, boardWidth, boardHeight, radius) {
    for (let i = 0; i < number; i += 1) {
      const starters = starterVals(0, boardWidth, boardHeight, radius);
      obstacles.push(new Obstacle(...starters, radius));
    }
  },
};

export default gameFuncs;
