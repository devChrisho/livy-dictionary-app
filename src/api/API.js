import axios from 'axios';

/**
 * API function that will fetch from
 * @param {*} endpoint created using the endpointFn()
 * @returns res.data on success. err on error
 */
const fetchWord = async endpoint => {
  try {
      const data = await axios(endpoint);
      return data;
  } catch (err) {
    return err;
  }
};

export default fetchWord
