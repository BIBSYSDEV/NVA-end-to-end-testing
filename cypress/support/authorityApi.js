import Axios from 'axios';
import { StatusCode, API_URL, AuthorityPaths, FEIDE_ID_QUALIFIER } from './constants';

Axios.defaults.baseURL = API_URL;
Axios.defaults.headers.common = {
  Accept: 'application/json',
};
Axios.defaults.headers.post['Content-Type'] = 'application/json';
Axios.defaults.headers.put['Content-Type'] = 'application/json';

export const getAuthorities = async (name) => {
  const url = encodeURI(`${AuthorityPaths.PERSON}?name=${name}`);

  try {
    // remove when Authorization headers are set for all requests
    const idToken = await getIdToken();
    const headers = {
      Authorization: `Bearer ${idToken}`,
    };

    const response = await Axios.get(url, { headers });

    if (response.status === StatusCode.OK) {
      return response.data;
    } else {
      return { error };
    }
  } catch (error) {
    if (!Axios.isCancel(error)) {
      return { error };
    }
  }
};

export const createAuthority = async (firstName, lastName, feideId) => {
  const url = AuthorityPaths.PERSON;

  try {
    // remove when Authorization headers are set for all requests
    const idToken = await getIdToken();
    const headers = {
      Authorization: `Bearer ${idToken}`,
    };

    const response = await Axios.post(url, { invertedname: `${lastName}, ${firstName}` }, { headers });
    if (response.status === StatusCode.OK) {
      if (feideId) {
        const systemControlNumber = response.data.systemControlNumber;
        const updatedAuthority = await addQualifierIdForAuthority(systemControlNumber, FEIDE_ID_QUALIFIER, feideId);
        if (updatedAuthority) {
          return updatedAuthority;
        }
      } else {
        return response.data;
      }
    } else {
      return { error };
    }
  } catch {
    return { error };
  }
};
