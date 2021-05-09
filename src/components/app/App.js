import styled from 'styled-components';
import Container from './components/Container'

const StyledDiv = styled.div`
  background-color: #191623;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function App() {
  return (
    <StyledDiv>
      <Container/>
    </StyledDiv>
  );
}

export default App;
