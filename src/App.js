import styled from 'styled-components';
import InputContainer from './components/InputContainer';

const StyledDiv = styled.div`
  background-color: #191623;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  color: var(--ncol700);

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
        font-family: var(--ff3);
        font-size: 3.2rem;
        text-align: center;
      }
    }
  }
`;

function App() {
  return (
    <StyledDiv>
      <div className="container">
        <div className="header">
          <h1 className="title">Elivia's Little Dictionary</h1>
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
