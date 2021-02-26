import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import Player from './Player';
import draw from './Draw';
import gameFuncs from './GameFuncs';

const { handleKeyPress, newObstacles } = gameFuncs;

const Canv = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
`;

const GameCanvas = (props) => {
  const { boardWidth, boardHeight, gameChange } = props;

  const canvasRef = useRef();
  const frameRef = useRef();
  const obstacles = [];
  const startTime = Date.now();
  let obstacleCount = 4;
  let lastEntry = startTime;

  const radius = Math.max(Math.floor(Math.max(boardWidth, boardHeight) / 67), 10);
  newObstacles(obstacles, obstacleCount, boardWidth, boardHeight, radius);
  const player = new Player(Math.floor(boardWidth / 2), Math.floor(boardHeight / 2), radius);

  const keyListener = (e) => {
    e.preventDefault();
    const { key } = e;
    handleKeyPress(key, player, boardWidth, boardHeight);
  };

  const gameEnd = () => {
    const gameLength = parseFloat(((Date.now() - startTime) / 1000).toFixed(2));
    gameChange(2, gameLength);
  };

  const render = (context) => {
    const thisTime = Date.now();
    const currentRun = thisTime - lastEntry;
    if (currentRun > 15000) {
      lastEntry = thisTime;
      obstacleCount += 1;
      newObstacles(obstacles, obstacleCount, boardWidth, boardHeight, radius);
    }
    frameRef.current = window.requestAnimationFrame(render.bind(null, context));
    draw(context, boardWidth, boardHeight, obstacles, player, gameEnd);
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
