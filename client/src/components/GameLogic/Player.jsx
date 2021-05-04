/*
Player class, similar to obstacle class, but easier geometry.
If acceleration were included, we would have velocity properties.
*/

class Player {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fillStyle = 'yellow';
    ctx.fill();
  }
}

export default Player;
