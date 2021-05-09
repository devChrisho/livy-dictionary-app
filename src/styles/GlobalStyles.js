import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
:root{
  --col100: hsl(163, 50%, 73%);
  --col150: hsl(163, 50%, 78%);
  --col200: hsl(93, 50%, 84%);
  --col250: hsl(93, 50%, 89%);
  --col300: hsl(25, 100%, 85%);
  --col350: hsl(25, 100%, 90%);
  --col375: hsl(25, 100%, 95%);
  --col400: hsl(2, 100%, 83%);
  --col450: hsl(2, 100%, 88%);
  --col500: hsl(245, 100%, 77%);
  --col550: hsl(245, 100%, 82%);

  --ncol100: hsl(0, 0%, 20%);
  --ncol150: hsl(0, 0%, 30%);
  --ncol200: hsl(0, 0%, 40%);
  --ncol300: hsl(0, 0%, 60%);
  --ncol400: hsl(0, 0%, 80%);
  --ncol500: hsl(0, 0%, 90%);

  --ff1:'Quicksand', sans-serif;
  --ff2: 'Fredoka One', cursive;
  --ff3: 'Fredericka the Great', cursive;
  --ff4: 'Crafty Girls', cursive;
}

* {
box-sizing: border-box;
margin: 0;
padding: 0;

}

html {
font-size: 62.5%;
min-height: 100vh;
}

body {
font-size: 1.2rem;
height: 100%;
font-family: var(--ff1);
}

input, button, select {
  font-family: var(--ff1);
}

h1,h2,h3, h4, h5,h6{
  font-family: var(--ff2);
  letter-spacing: 2px;
  text-align: center;
}
`;

export default GlobalStyles;
