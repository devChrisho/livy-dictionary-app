import React from "react";
import styled from "styled-components";
import Title from "./Title";

const StyledHeader = styled.div``;
const title = "Elivia's Spelling Tester";
const Header = () => {
  return (
    <StyledHeader>
      <Title title={title} />
    </StyledHeader>
  );
};

export default Header;
