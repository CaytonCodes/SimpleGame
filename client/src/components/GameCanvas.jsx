import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import Obstacle from './Obstacle';

const Canv = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
`;

const GameCanvas = (props) => {
  const { boardWidth, boardHeight } = props;
  const canvasRef = useRef(null);
  const obstacle = new Obstacle(0, 0, 2, 5);

  const draw = (ctx) => {
    ctx.clearRect(0, 0, boardWidth, boardHeight);
    obstacle.draw(ctx);
    obstacle.x += obstacle.vx;
    obstacle.y += obstacle.vy;
    // raf = window.requestAnimationFrame(render);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    let raf;

    const render = () => {
      draw(context);
      raf = window.requestAnimationFrame(render);
    };
    render();

    return () => {
      window.cancelAnimationFrame(raf);
    };
  }, [draw]);

  return (
    <Canv id="GameBoard" width={boardWidth} height={boardHeight} ref={canvasRef}>
      <span>If you&apos;re seeing this, try updating your browser!</span>
    </Canv>
  );
};

export default GameCanvas;
