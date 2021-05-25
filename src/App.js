import React from "react";
import styled from "styled-components";

import Container from "./components/Container";

const StyledDiv = styled.div`
  background-color: #191623;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  color: var(--ncol700);
`;

function App() {
  return (
    <StyledDiv>
      <Container />
    </StyledDiv>
  );
}

export default App;
