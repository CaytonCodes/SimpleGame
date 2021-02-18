const draw = (ctx, boardWidth, boardHeight, obstacles, player, gameEnd) => {
  ctx.clearRect(0, 0, boardWidth, boardHeight);
  obstacles.forEach((object) => {
    const obstacle = object;
    obstacle.draw(ctx);
    if (obstacle.y + obstacle.vy + obstacle.radius > boardHeight
      || obstacle.y + obstacle.vy - obstacle.radius < 0) {
      obstacle.vy = -obstacle.vy;
    }
    if (obstacle.x + obstacle.vx + obstacle.radius > boardWidth
      || obstacle.x + obstacle.vx - obstacle.radius < 0) {
      obstacle.vx = -obstacle.vx;
    }
    obstacle.x += (Math.floor(obstacle.vx / 3) || 1);
    obstacle.y += (Math.floor(obstacle.vy / 3) || 1);

    // collision check
    const dx = obstacle.x - player.x;
    const dy = obstacle.y - player.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < obstacle.radius + player.radius) {
      gameEnd(0);
    }
  });
  player.draw(ctx);
};

export default draw;
