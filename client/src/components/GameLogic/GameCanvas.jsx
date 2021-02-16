import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import Obstacle from './Obstacle';
import Player from './Player';

const Canv = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
`;

const draw = (ctx, boardWidth, boardHeight, obstacles, player, gameChange) => {
  ctx.clearRect(0, 0, boardWidth, boardHeight);
  obstacles.forEach((object) => {
    const obstacle = object;
    obstacle.draw(ctx);
    if (obstacle.y + obstacle.vy + 20 > boardHeight || obstacle.y + obstacle.vy - 20 < 0) {
      obstacle.vy = -obstacle.vy;
    }
    if (obstacle.x + obstacle.vx + 20 > boardWidth || obstacle.x + obstacle.vx - 20 < 0) {
      obstacle.vx = -obstacle.vx;
    }
    obstacle.x += (Math.floor(obstacle.vx / 3) || 1);
    obstacle.y += (Math.floor(obstacle.vy / 3) || 1);

    // collision check
    const dx = obstacle.x - player.x;
    const dy = obstacle.y - player.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < obstacle.radius + player.radius) {
      gameChange(0);
    }
  });
  player.draw(ctx);
};

const randomNum = (max, min = 1) => (Math.floor(Math.random() * (max - min) + min));

const starterVals = (edge, boardWidth, boardHeight) => {
  let x = randomNum(Math.floor(boardWidth * (2 / 3)), Math.floor(boardWidth / 3));
  let y = randomNum(Math.floor(boardHeight * (2 / 3)), Math.floor(boardHeight / 3));
  if (edge === 0) { y = 21; }
  if (edge === 2) { y = boardHeight - 21; }
  if (edge === 1) { x = boardWidth - 21; }
  if (edge === 3) { x = 21; }
  const velX = randomNum(10);
  const velY = randomNum(10);
  return [x, y, velX, velY];
};

const handleKeyPress = (e, player, boardWidth, boardHeight) => {
  const mover = player;
  e.preventDefault();
  const { key } = e;
  console.log(key);
  if ((key === 'ArrowUp' || key === 'i')
    && mover.y > 25) { mover.y -= 8; }
  if ((key === 'ArrowDown' || key === 'k')
    && mover.y < boardHeight - 25) { mover.y += 8; }
  if ((key === 'ArrowRight' || key === 'l')
    && mover.x < boardWidth - 25) { mover.x += 8; }
  if ((key === 'ArrowLeft' || key === 'j')
    && mover.x > 25) { mover.x -= 8; }
};

const GameCanvas = (props) => {
  const { boardWidth, boardHeight, gameChange } = props;
  const canvasRef = useRef(null);
  const frameRef = useRef();
  const obstacles = [];
  for (let i = 0; i < 4; i += 1) {
    const starters = starterVals(0, boardWidth, boardHeight);
    obstacles.push(new Obstacle(...starters, 20));
  }
  const player = new Player(Math.floor(boardWidth / 2), Math.floor(boardHeight / 2), 20);

  const render = (context) => {
    frameRef.current = window.requestAnimationFrame(render.bind(null, context));
    draw(context, boardWidth, boardHeight, obstacles, player, gameChange);
  };

  const keyListener = (e) => {
    handleKeyPress(e, player, boardWidth, boardHeight);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    window.addEventListener('keydown', keyListener);
    frameRef.current = window.requestAnimationFrame(render.bind(null, context));

    return () => {
      window.removeEventListener('keydown', keyListener);
      window.cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <Canv id="GameBoard" width={boardWidth} height={boardHeight} ref={canvasRef}>
      <span>If you&apos;re seeing this, try updating your browser!</span>
    </Canv>
  );
};

export default GameCanvas;
