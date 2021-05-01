import styled from 'styled-components';
import React from 'react';


import SearchBar from './SearchBar'
import SearchBarButton from './SearchBarButton';

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
    setUserWord(e.target.value);
  };

  return (
    <StyledContainer>
      <SearchBar
        type='text'
        placeholder='enter a word here'
        onChange={changeHandler}
        autoComplete='off'
        ref={inputEl}
      />
      <SearchBarButton onClick={clickHandler}>
        
        Find
      </SearchBarButton>
    </StyledContainer>
  );
};

export default InputContainer;
