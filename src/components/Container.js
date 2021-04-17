import styled from 'styled-components';
// import * as Icons from '@material-ui/icons';
import * as React from 'react';
import axios from 'axios';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 3rem;

  position: relative;
  width: 100%;
  background-image: linear-gradient(
    -15deg,
    var(--col100) 58%,
    var(--col200) 60%
  );
  border-radius: 2rem;
  box-shadow: inset 2px 2px 4px rgba(255, 255, 255, 0.544),
    inset -2px -2px 4px rgba(42, 42, 42, 0.243);

  color: var(--ncol100);

  > h1 {
    font-family: var(--ff4);
    font-size: 3.6rem;
  }

  .input-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-top: 2rem;
    width: 100%;
    input {
      font-size: 1.6rem;
      height: 4rem;
      border-radius: 20px 0 0 20px;
      outline: none;
      text-align: center;
      border: none;
      width: 25%;
      transition: all 0.5s ease;
      &:focus {
        width: 50%;
      }
    }
    button {
      font-size: 1.6rem;
      height: 4rem;
      padding: 0 2rem;
      border-radius: 0 20px 20px 0;
      background-image: linear-gradient(45deg, var(--col400), var(--col300));
      /* background-color: var(--col400); */
      outline: none;
      border: none;
      &:active {
        background-color: var(--col450);
      }
    }
  }

  .output-container {
    padding: 2rem;
    border-radius: 10px;
    margin-top: 2rem;
    width: 90%;
    background-color: var(--col375);
    > h1 {
      span {
        color: var(--col500);
        cursor: pointer;
      }
    }
    .results-container {
      margin-top: 2rem;
      div {
        margin-top: 1.5rem;
        h3 {
          font-size: 1.8rem;
          margin-top: 1rem;
          text-align: left;
        }
        div {
          margin-top: 0.5rem;
          p {
            margin-top: 0.3rem;
            font-size: 1.6rem;
          }
        }
      }
    }
  }

  .rotating {
    animation-play-state: running;
  }

  @keyframes rotating {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  @media screen and (min-width: 600px) {
    width: 50%;
    border-radius: 3rem;
  }
`;

// const StyledSettingsIcon = styled(Icons.Settings)`
//   color: var(--ncol200);
//   font-size: 2.5rem !important;
//   position: absolute;
//   top: 1rem;
//   right: 1rem;
//   cursor: pointer;
//   animation: rotating 10s infinite linear forwards;
//   animation-play-state: paused;

//   @media screen and (min-width: 600px) {
//     top: 2rem;
//     right: 2rem;
//     font-size: 3.5rem !important;
//   }
// `;

const Container = () => {
  // !var States
  // const [isSettingsOpen, setIsSettingsOpen] = React.useState(false);
  const [isButtonClicked, setIsButtonClicked] = React.useState(false);
  const [userInput, setUserInput] = React.useState('');
  const [meanings, setMeanings] = React.useState([]);
  const [resultsList, setResultsList] = React.useState([]);
  const [prounounciation, setPronounciation] = React.useState('');

  // !var Refs
  const inputEl = React.useRef(null);
  const audioEl = React.useRef(null);

  // !exp Event handlers
  // const settingsClickHandler = () => {
  //   setIsSettingsOpen(!isSettingsOpen);
  // };

  const buttonClickHandler = () => {
    setIsButtonClicked(true);
    const input = inputEl.current.value;
    const inputVal = input.toLowerCase();
    findMeaning(inputVal);
    setUserInput(inputVal);
    inputEl.current.value = '';
    inputEl.current.focus();
  };

  const spanClickHandler = () => {
    audioEl.current.play();
  };

  const keypressHandler = e => {
    if (e.key === 'Enter') {
      setIsButtonClicked(true);
      const input = inputEl.current.value;
      const inputVal = input.toLowerCase();
      findMeaning(inputVal);
      setUserInput(inputVal);
      inputEl.current.value = '';
      inputEl.current.focus();
    }
  }

  // !exp Call API
  const findMeaning = async word => {
    const api = 'https://api.dictionaryapi.dev/api/v2/entries/en_US/';
    const endpoint = api + word;
    const res = await axios(endpoint);

    const data = res.data[0];
    const meanings = data.meanings;
    const pronounciations = data.phonetics[0].audio;
    setMeanings(meanings);
    setPronounciation(pronounciations);
  };

  // !exp UseEffect
  React.useEffect(() => {
    if (meanings.length !== 0) {
      const mappedResults = meanings.map(item => {
        const example = item.definitions[0].example;
        const definition = item.definitions[0].definition;
        const partOfSpeech = item.partOfSpeech;

        return (
          <div key={partOfSpeech}>
            <h3>{partOfSpeech}</h3>
            <div>
              <p>
                <strong>Meaning: </strong> {definition}
              </p>
              <p>
                <strong>Example: </strong> {example}
              </p>
            </div>
          </div>
        );
      });

      setResultsList(mappedResults);
    }
  }, [meanings]);

  return (
    <StyledContainer>
      {/* <StyledSettingsIcon
        onClick={settingsClickHandler}
        className={isSettingsOpen ? 'rotating' : ''}
      /> */}
      <h1>My Little Dictionary</h1>
      <div className='input-container'>
        <input type='text' placeholder='enter a word here' ref={inputEl}  onKeyPress={keypressHandler} />
        <button onClick={buttonClickHandler}>Find</button>
      </div>

      {/* Output container */}
      {isButtonClicked ? (
        <div className='output-container'>
          <h1>
            Here's the meaning of{' '}
            <span onClick={spanClickHandler}>"{userInput}"</span>
            <audio src={prounounciation} ref={audioEl}></audio>
          </h1>
          <div className='results-container'>{resultsList}</div>
        </div>
      ) : (
        ''
      )}
    </StyledContainer>
  );
};

export default Container;
