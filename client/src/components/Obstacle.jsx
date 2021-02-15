class Obstacle {
  constructor(x, y, vx, vy) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, 20, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fillStyle = 'blue';
    ctx.fill();
  }
}


// import React from 'react';
// import styled, { keyframes } from 'styled-components';

// // const move = keyframes`
// //   0%, 100% {
// //     transform: translateY(0);
// //   }
// //   50% {
// //     transform: translateY(30px);
// //   }
// // `;

// const move = keyframes`
//   from {  }
//   to {
//     top: 30px;
//   }
// `;

// const ObstacleContainer = styled.div`
//   height: 20px;
//   width: 20px;
//   position: absolute;
//   background: red;
//   border-radius: 50%;
//   top: 30px;
//   left: 30px;
//   animation: ${move} 2s linear infinite
// `;



// class Obstacle extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       speed: 5,
//       boardHeight: 0,
//       boardWidth: 0,
//     };
//   }

//   componentDidMount() {
//     const boardHeight = document.getElementById('Board').clientHeight;
//     const boardWidth = document.getElementById('Board').clientWidth;
//     this.setState({ boardHeight, boardWidth });
//   }

//   render() {
//     return (
//       <ObstacleContainer className="Obstacle" />
//     );
//   }
// }

export default Obstacle;
