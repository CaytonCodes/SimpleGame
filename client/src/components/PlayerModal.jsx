import React, { useState } from 'react';
import styled from 'styled-components';

const Modal = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 100;
  text-align: center;
`;

const Submit = styled.input`
  font-size: 1.25rem;
  font-weight: 700;
  margin: 50px;
`;

function PlayerModal(props) {
  const { updatePlayer } = props;
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name === '') {
      updatePlayer('anonymous');
      return;
    }
    updatePlayer(name);
  };

  const inputChange = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  return (
    <Modal id="PlayerModal">
      <h3>Choose a Name to Track Your Score</h3>
      <p>Leave blank to play anonymously.</p>
      <form onSubmit={handleSubmit}>
        <label>
          Player Name:
          <input type="text" value={name} onChange={inputChange} />
        </label>
        <br />
        <Submit type="submit" value="Submit" />
      </form>
    </Modal>
  );
}

export default PlayerModal;
