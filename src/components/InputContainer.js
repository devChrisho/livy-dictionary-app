import styled from 'styled-components';
import React from 'react';
import * as Icons from '@material-ui/icons';

// !exp custom helper functions
import {
  fetchWord,
  endpointFn,
  prefixSetter,
  playAudio,
  filterFn,
  hwChecker,
} from '../util';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  width: 100%;
  margin-top: 2rem;

  input {
    width: 50%;
    height: 4rem;

    border-radius: 20px 0 0 20px;
    border: none;
    outline: none;

    font-size: 1.6rem;
    text-align: center;
    color: var(--ncol150);

    background-color: rgba(255, 255, 255, 0.551);

    transition: all 0.5s ease;

    &:focus {
      width: 100%;
      background-color: rgb(247, 247, 247);
    }
    @media screen and (min-width: 600px) {
      width: 25%;
      &:focus {
        width: 50%;
      }
    }
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;

    height: 4rem;

    outline: none;
    cursor: pointer;

    padding: 0 2rem;
    border-radius: 0 20px 20px 0;
    border: none;

    font-size: 1.6rem;

    color: var(--ncol150);
    background-image: linear-gradient(45deg, var(--col400), var(--col300));

    &:active {
      background-color: var(--col450);
    }
  }
`;

const StyledFindIcon = styled(Icons.SearchRounded)`
  font-size: 2rem !important;
  color: var(--ncol150);
`;

const InputContainer = ({
  userWord,
  setUserWord,
  setApiData,
  setErrorMsg,
  setIsErrorOpen,
}) => {
  const inputEl = React.useRef(null);

  // !exp web speech speechsynthesis API
  const synthSpeak = wordToSpeak => {
    let utterance = new SpeechSynthesisUtterance(wordToSpeak);
    const synth = window.speechSynthesis;
    synth.speak(utterance);
  };

  const clickHandler = async () => {
    
    if (userWord !== '' && userWord.split(' ').length === 1) {
      try {
        // !exp fetch raw data

        const data = await fetchWord(endpointFn(0, userWord));

        console.log('Checking if meta id includes headword');
        if (hwChecker(data, userWord)) {
          console.log('Meta id includes search word. Running filter');
          const filteredData = filterFn(data, userWord);

          console.log('filteredData: ', filteredData);
          setApiData(filteredData);

          console.log('Getting audioId...');
          const audioId = filteredData[0].hwi?.prs[0]?.sound?.audio;
          if (audioId) {
            console.log('AudioId exists. Playing mp3');
            const prefix = prefixSetter(audioId);

            await playAudio(audioId, prefix);
          } else {
            console.log(
              "AudioId doesn't exist. Using Web Speech Synthesis API."
            );
            synthSpeak(userWord);
          }
        } else {
          console.log("can't find the word");
          setErrorMsg(`Can't find the word: "${userWord}"`);
          setIsErrorOpen(true);
        }
      } catch (err) {
        return err;
      }
    } else {
      setApiData([]);
    }
  };

  const changeHandler = e => {
    // setUserWord(e.target.value);
  };

  return (
    <StyledContainer>
      <input
        type='text'
        placeholder='enter a word here'
        onChange={changeHandler}
        autoComplete='off'
        ref={inputEl}
      />
      <button onClick={clickHandler}>
        <StyledFindIcon />
        Find
      </button>
    </StyledContainer>
  );
};

export default InputContainer;
