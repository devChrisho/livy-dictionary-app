import styled from "styled-components";
import React from "react";
import Header from "./Header/Header";
import Body from "./Body/Body";
import Footer from "./Footer/Footer";

// !exp Custom components

const StyledContainer = styled.div`
  position: relative;
  /* flex settings */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  /* position and size */
  height: 100vh;
  width: 100%;

  /* border, shadows and spacing */
  border-radius: 2rem;
  padding: 3rem;
  box-shadow: inset 2px 2px 4px rgba(255, 255, 255, 0.544),
    inset -2px -2px 4px rgba(42, 42, 42, 0.243);

  /* colors */
  color: var(--ncol150);

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

  > h1 {
    margin-top: 2rem;
    font-family: var(--ff4);
    font-size: 3rem;
    font-weight: 900;
  }

  /* bigger mobile phone*/
  @media screen and (min-width: 600px) {
    justify-content: center;
    width: 50%;
    border-radius: 3rem;
  }
`;

const Container = () => {
  // !var States

  return (
    <StyledContainer>
      <Header />
      <Body />
      <Footer />
    </StyledContainer>
  );
};

export default Container;
