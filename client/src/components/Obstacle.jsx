import React from 'react';
import styled from 'styled-components';

const ObstacleContainer = styled.div`
  height: 30px;
  width: 30px;
  position: absolute;
  background: red;
  top: 30px;
  left: 30px;
  transform: translateX(100px);
`;

// const Obstacle = style.div`

// `;

class Obstacle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      speed: 5,
    };
  }

  render() {
    return (
      <ObstacleContainer className="Obstacle" />
    );
  }
}

export default Obstacle;
