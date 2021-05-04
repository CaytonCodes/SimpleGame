/*
The obstacle class.
Has position (x, y), velocity (vx, vy), radius, and some other geometric properties to help draw.

Draw method accepts context and draws obstacle at its x,y position.
*/
class Obstacle {
  constructor(x, y, vx, vy, radius) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.radius = radius;
    this.spikeEdge = (Math.floor(this.radius / 3) || 1);
    this.spikeStep = this.spikeEdge * 0.707;
    this.dx = this.radius * 0.707;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fillStyle = 'blue';
    ctx.fill();
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.moveTo(this.x + this.radius, this.y);
    ctx.lineTo(this.x + this.radius + this.spikeStep, this.y - this.spikeStep);
    ctx.lineTo(this.x + this.radius + this.spikeStep, this.y + this.spikeStep);
    ctx.moveTo(this.x, this.y + this.radius);
    ctx.lineTo(this.x + this.spikeStep, this.y + this.radius + this.spikeStep);
    ctx.lineTo(this.x - this.spikeStep, this.y + this.radius + this.spikeStep);
    ctx.moveTo(this.x - this.radius, this.y);
    ctx.lineTo(this.x - this.radius - this.spikeStep, this.y + this.spikeStep);
    ctx.lineTo(this.x - this.radius - this.spikeStep, this.y - this.spikeStep);
    ctx.moveTo(this.x, this.y - this.radius);
    ctx.lineTo(this.x + this.spikeStep, this.y - this.radius - this.spikeStep);
    ctx.lineTo(this.x - this.spikeStep, this.y - this.radius - this.spikeStep);
    ctx.moveTo(this.x + this.dx, this.y + this.dx);
    ctx.lineTo(this.x + this.dx + this.spikeEdge, this.y + this.dx);
    ctx.lineTo(this.x + this.dx, this.y + this.dx + this.spikeEdge);
    ctx.moveTo(this.x + this.dx, this.y - this.dx);
    ctx.lineTo(this.x + this.dx + this.spikeEdge, this.y - this.dx);
    ctx.lineTo(this.x + this.dx, this.y - this.dx - this.spikeEdge);
    ctx.moveTo(this.x - this.dx, this.y + this.dx);
    ctx.lineTo(this.x - this.dx - this.spikeEdge, this.y + this.dx);
    ctx.lineTo(this.x - this.dx, this.y + this.dx + this.spikeEdge);
    ctx.moveTo(this.x - this.dx, this.y - this.dx);
    ctx.lineTo(this.x - this.dx - this.spikeEdge, this.y - this.dx);
    ctx.lineTo(this.x - this.dx, this.y - this.dx - this.spikeEdge);
    ctx.fill();
  }
}

export default Obstacle;
