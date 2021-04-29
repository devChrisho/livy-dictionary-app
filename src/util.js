import axios from 'axios';

export const fetchWord = async endpoint => {
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
};

// !exp this function takes either gradelevel 0 or 1, it also needs the userword(word query) to return the API endpoint
export const endpointFn = (gradeLevel, userWord) => {
  if (gradeLevel === 0) {
    const endpoint1 =
      'https://www.dictionaryapi.com/api/v3/references/sd2/json/' +
      userWord +
      '?key=' +
      process.env.REACT_APP_ELEMENTRY_APIKEY;
    return endpoint1;
  } else if (gradeLevel === 1) {
    const endpoint2 =
      'https://www.dictionaryapi.com/api/v3/references/sd3/json/' +
      userWord +
      '?key=' +
      process.env.REACT_APP_INTERMEDIATE_APIKEY;
    return endpoint2;
  }
};

// !exp this function takes the audioId and prefix to return the
export const playAudio = async (audioId, prefix) => {
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
};

export const prefixSetter = audioId => {
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
};

export const filterFn = (data, userWord) => {
  return data.filter(obj => {
    const splitStr = obj?.hwi.hw.split('*');
    const joinStr = splitStr.join('');
    return joinStr === userWord;
  });
};

export const hwChecker = (data, userWord) => {
  if (data[0]?.meta?.id?.includes(userWord)) {
    return true;
  }
};
