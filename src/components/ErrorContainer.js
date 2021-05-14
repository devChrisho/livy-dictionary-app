import styled from 'styled-components';
import * as Icons from '@material-ui/icons';

const StyledContainer = styled.div`
  position: fixed;
  top: 0;
  height: 100%;
  width: 100vw;

  backdrop-filter: blur(3px) brightness(40%) grayscale(50%);

  > div {
    display: flex;
    flex-direction: column;
    align-items: center;

  
    top: 50vh;
    left: 50vw;
    transform: translate(-50%, -50%);
    z-index: 1000;

    padding: 2.5rem 2rem;
    width: 80%;

    border-radius: 1rem;
    box-shadow: inset 3px 3px 20px rgba(255, 255, 255, 0.455),
      3px 3px 10px rgba(0, 0, 0, 0.297);
    background-image: linear-gradient(45deg, palevioletred, pink);
    color: var(--ncol500);
    backdrop-filter: blur(5px);
    transition: all 0.5s ease;
    h2 {
      font-size: 3rem;
      font-family: var(--ff2);
      .emoji {
        font-size: 3rem;
      }
    }
    .panda-img {
      border-radius: 5px;
      margin-top: 1rem;
    }
    h3 {
      margin-top: 2rem;
      font-family: var(--ff1);
    }

    @media screen and (min-width: 600px) {
      width: 600px;
    }
  }
`;

const StyledCloseIcon = styled(Icons.Close)`
  position: absolute;
  top: 1rem;
  right: 1rem;

  font-size: 3rem !important;

  color: palevioletred;
  cursor: pointer;
`;

const ErrorContainer = ({ errorMsg, isErrorOpen, setIsErrorOpen }) => {
  const closeClickHandler = () => {
    setIsErrorOpen(false);
  };

  if (isErrorOpen) {
    return (
      <StyledContainer onClick={closeClickHandler}>
        <div>
          <StyledCloseIcon onClick={closeClickHandler} />
          <h2>
            Oops! <span className='emoji'>🤭</span>
          </h2>
          <img
            className='panda-img'
            src='https://media.giphy.com/media/14aUO0Mf7dWDXW/giphy.gif'
            alt='facepalm panda'
          />

          <h3>{errorMsg}</h3>
        </div>
      </StyledContainer>
    );
  } else {
    return null;
  }
};

export default ErrorContainer;
