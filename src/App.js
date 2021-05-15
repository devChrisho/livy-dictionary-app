import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import * as FaIcons from 'react-icons/fa';

const StyledDiv = styled.div`
  background-color: #191623;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  color: var(--ncol700);

  .errorContainer {
    position: fixed;
    height: 100vh;
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: center;

    background-color: rgba(0, 0, 0, 0.488);
    backdrop-filter: blur(2px);
    .errorModal {
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;

      height: 50%;
      width: 90%;
      border-radius: 1rem;

      background-image: linear-gradient(45deg, #ee9ca7, #ffdde1);

      .closeIcon {
        font-size: 3rem;
        color: #e95757;

        border-radius: 30px;
        padding: 3px;
        position: absolute;
        top: 10px;
        right: 10px;
        cursor: pointer;

        &:hover {
          transition: 0.5s ease all;
          background-color: #ffadad;
          color: #fdf2ff;
        }
      }
      .errorTitle {
        display: block;
        width: 80%;
        padding: 1rem;
        border-radius: 5px;
        margin-top: 3rem;

        color: var(--ncol500);
        background-color: rgba(255, 255, 255, 0.493);
      }

      .pandaImg {
        margin-top: 2rem;
        padding: 1rem;
        background-color: rgba(255, 255, 255, 0.5);
        border-radius: 5px;
      }
    }
  }

  .container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    height: 100vh;
    width: 100%;

    border-radius: 2rem;

    background-image: linear-gradient(
      342deg,
      var(--col100) 9%,
      var(--col200) 15%,
      var(--col100) 20%,
      var(--col200) 24%,
      var(--col100) 27%,
      var(--col200) 29%,
      var(--col100) 30%,
      var(--col200) 31%,
      var(--col100) 33%,
      var(--col200) 36%,
      var(--col100) 40%,
      var(--col200) 45%,
      var(--col100) 51%,
      var(--col200) 58%,
      var(--col100) 66%,
      var(--col200) 75%
    );
    background-size: 400%;

    /* animation */
    animation: movingBg 70s infinite alternate linear;
    @keyframes movingBg {
      from {
        background-position: left;
      }
      to {
        background-position: right;
      }
    }

    @media screen and (min-width: 600px) {
      width: 600px;
      height: 90vh;
    }

    .header {
      .title {
        margin: 1rem;
        font-family: var(--ff4);
        font-size: 3.2rem;
        text-align: center;
      }
    }
  }
`;

function App() {
  const [errorOpen, setErrorOpen] = React.useState(false);

  const handleErrorClose = () => {
    setErrorOpen(false);
  };

  const ErrorRef = useRef(null);

  useEffect(() => {
    
    const handleEvent = e => {
      console.log(e.target);
      if (e.target.className.includes('errorContainer' | 'closeIcon')) {
        handleErrorClose();
    };

    document.addEventListener('mousedown', handleEvent);

    return () => {
      document.removeEventListener('mousedown', handleEvent);
    };
      
  });

  return (
    <StyledDiv>
      {errorOpen ? (
        <div className="errorContainer">
          <div ref={ErrorRef} className="errorModal">
            <FaIcons.FaTimes className="closeIcon" onClick={handleErrorClose }/>
            <h1 className="errorTitle">Error</h1>
            <img
              className="pandaImg"
              src="https://media.giphy.com/media/14aUO0Mf7dWDXW/giphy.gif"
              alt="facepalm panda"
            />
          </div>
        </div>
      ) : null}

      <div className="container">
        <div className="header">
          <h1 className="title">Elivia's Little Dictionary</h1>
          <button
            onClick={() => {
              setErrorOpen(true);
            }}
          >
            click
          </button>
        </div>
        <div className="body">
          <h1>body</h1>
        </div>
        <div className="footer">
          <h1>footer</h1>
        </div>
      </div>
    </StyledDiv>
  );
}

export default App;
