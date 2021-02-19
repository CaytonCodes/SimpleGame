import React, { useState } from 'react';
import styled from 'styled-components';

const Modal = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: black;
  z-index: 100;
`;

function PlayerModal(props) {
  const { updatePlayer } = props;
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    updatePlayer(name);
  };

  const inputChange = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  return (
    <Modal id="PlayerModal">
      <h3>Choose a Name to Track Your Score</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Player Name:
          <input type="text" value={name} onChange={inputChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </Modal>
  );
}

export default PlayerModal;
