import axios from 'axios';

const util = {
  /**
   * Helper function that takes API endpoint and uses axios to get data from Webster API
   * @param {*} endpoint created using the endpointFn()
   * @returns res.data on success. err on error
   */
  fetchWord: async endpoint => {
    try {
      const data = await axios(endpoint).then(res => {
        if (res.data.length === 0) {
          throw new Error('No results found');
        }
        return res.data;
      });
      return data;
    } catch (err) {
      return err;
    }
  },

  /**
   * Helper function to create endpoints based on gradelevel
   * @param {*} gradeLevel 0 is for elementry. 1 is for intermediate
   * @param {*} userWord This is the headword used for query
   * @returns endpoint
   */
  endpointFn: (gradeLevel, userWord) => {
    switch (gradeLevel) {
      case 0:
        return (
          'https://www.dictionaryapi.com/api/v3/references/sd2/json/' +
          userWord +
          '?key=' +
          process.env.REACT_APP_ELEMENTRY_APIKEY
        );
      case 1:
        return (
          'https://www.dictionaryapi.com/api/v3/references/sd3/json/' +
          userWord +
          '?key=' +
          process.env.REACT_APP_INTERMEDIATE_APIKEY
        );
      default:
        break;
    }
  },

  /**
   * Checks if first record includes query in headword
   * @param {*} data Array from fetchWord()
   * @param {*} userWord Query word
   * @returns
   */
  hwChecker: (data, userWord) => {
    if (data[0]?.meta?.id?.includes(userWord)) {
      return true;
    } else {
      return false;
    }
  },

  /**
   * Checks if query is not empty string and not more than 1 word
   * @param {*} userWord Query word
   * @returns boolean
   */
  currentWordChecker: userWord => {
    if (userWord !== '' && userWord.split(' ').length === 1) {
      return true;
    } else {
      return false;
    }
  },
  /**
   * This trims and sets the query string to lowercase
   * @param {*} userWord 
   * @returns returns trimmed and lowercased string of userWord
   */
  userWordFormatter: userWord => {
    return userWord.toLowerCase(userWord.trim);
  },

  /**
   * Takes the audioId from first element in data array and plays the mp3
   * @param {*} audioId
   * @param {*} prefix the return from prefixSetter()
   * @returns void
   */
  playAudio: async (audioId, prefix) => {
    // end point definition
    const audioEndpoint =
      'https://media.merriam-webster.com/audio/prons/en/us/mp3/' +
      prefix +
      '/' +
      audioId +
      '.mp3';
    const audioPlay = new Audio(audioEndpoint);

    try {
      await audioPlay.play();
    } catch (err) {
      return err;
    }
  },

  /**
   * Takes the audioId and generates prefix for audio string endpoint
   * @param {*} audioId
   * @returns string of 'bix', 'gg', 'number', or first letter of audioId
   */
  prefixSetter: audioId => {
    if (audioId.substring(0, 2) === 'bix') {
      return 'bix';
    } else if (audioId.substring(0, 1) === 'gg') {
      return 'gg';
    } else if (audioId.substring(0, 0) === (/^[0-9]/ || /^[^\w\s\n\t]/)) {
      return 'number';
    } else {
      const firstLetter = audioId[0];
      return firstLetter;
    }
  },

  /**
   * Filters data and finds elements that have same headword
   * @param {*} data
   * @param {*} userWord
   * @returns Array of filtered elements
   */
  filterFn: (data, userWord) => {
    return data.filter(obj => {
      const splitStr = obj?.hwi.hw.split('*');
      const joinStr = splitStr.join('');
      return joinStr === userWord;
    });
  },

  /**
   * Uses WebSpeech SpeechSynthesis API to speak
   * @param {*} wordToSpeak string to speak
   */
  synthSpeak: wordToSpeak => {
    let utterance = new SpeechSynthesisUtterance(wordToSpeak);
    const synth = window.speechSynthesis;
    synth.speak(utterance);
  },

  newHwChecker: (data, userWord) => {
    data.filter(element => {
      return element.hwi.hw === userWord;
    });
  },
};

export default util;
