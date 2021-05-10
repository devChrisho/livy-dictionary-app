import styled from 'styled-components';
import React from 'react';

import SearchBarButton from './SearchBarButton';

// !exp custom helper functions
import util from '../util';

const StyledContainer = styled.form`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  width: 100%;
  margin-top: 2rem;
`;

const StyledSearchBar = styled.input`
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
`;

// const InputContainer = ({
//   userWord,
//   setUserWord,
//   setApiData,
//   setErrorMsg,
//   setIsErrorOpen,
// }) => {
//   const keypressHandler = e => {
//     setUserWord(e.target.value);
//     console.log(userWord)
//   };
//   const clickHandler = () => {};

//   //   if (util.currentWordChecker(currentWord)) {
//   //     try {
//   //       const endpoint = util.endpointFn(0, currentWord);
//   //       const data = await util.fetchWord(endpoint);
//   //       console.log(data);

//   //       console.log('Checking if meta id includes headword');
//   //       if (util.hwChecker(data, currentWord)) {
//   //         console.log('Meta id includes search word. Running filter');
//   //         const filteredData = util.filterFn(data, currentWord);

//   //         console.log('filteredData: ', filteredData);
//   //         setApiData(filteredData);

//   //         console.log('Getting audioId...');
//   //         const audioId = filteredData[0].hwi?.prs[0]?.sound?.audio;
//   //         if (audioId) {
//   //           console.log('AudioId exists. Playing mp3');
//   //           const prefix = util.prefixSetter(audioId);

//   //           await util.playAudio(audioId, prefix);
//   //         } else {
//   //           console.log(
//   //             "AudioId doesn't exist. Using Web Speech Synthesis API."
//   //           );
//   //           util.synthSpeak(currentWord);
//   //           setUserWord(currentWord);
//   //         }
//   //       } else {
//   //         console.log("can't find the word");
//   //         setErrorMsg(`Can't find the word: "${currentWord}"`);
//   //         setIsErrorOpen(true);
//   //       }
//   //     } catch (err) {
//   //       return err;
//   //     }
//   //   } else {
//   //     setErrorMsg('Please enter only 1 word');
//   //     setIsErrorOpen(true);
//   //   }
//   // };

// };

const InputContainer = ({ setSubmittedWord }) => {

  const [userWord, setUserWord] = React.useState('');
  // !exp this makes the input text a controlled component
  const keypressHandler = e => {
    setUserWord(e.target.value);
  };

  // !exp Submit event handler 
  const submitHandler = e => {
    e.preventDefault();
    setSubmittedWord(userWord);
  };

  return (
    <StyledContainer onSubmit={submitHandler}>
      <StyledSearchBar
        type="text"
        placeholder="enter a word here"
        autoComplete="off"
        onChange={keypressHandler}
        value={userWord}
      />

      <SearchBarButton type="submit">Find</SearchBarButton>
     
    </StyledContainer>
  );
};

export default InputContainer;
